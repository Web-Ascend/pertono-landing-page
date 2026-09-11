// Nachbearbeitung des Astro-Builds: jede dist/**/index.html wird zu index.php.
//
//   astro build && node scripts/wrap-php.mjs      (npm run build)
//
// Warum PHP für eine Seite ohne Client-JavaScript: Beim Hoster (Checkdomain)
// steht nginx vor Apache und liefert vorhandene .html-Dateien direkt aus —
// ohne Apache, ohne .htaccess, ohne die darin gesetzten Security-Header.
// Gemessen am 2. September 2026: pertono.com/ trug keinen der Header aus
// public/.htaccess (ETag im nginx-Format), Antworten durch Apache trugen alle.
// Eine .php-Datei geht immer durch Apache. Der Vorspann setzt die Header
// deshalb selbst noch einmal (Werte aus public/.htaccess, einzige Quelle) und
// gibt dann das unveränderte HTML aus. URLs ändern sich nicht: DirectoryIndex
// in der .htaccess zeigt auf index.php. Die 404.html bleibt eine Datei —
// ErrorDocument liefert sie ohnehin über Apache aus.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");

if (!fs.existsSync(DIST)) {
  console.error("dist/ fehlt — erst `astro build`.");
  process.exit(1);
}

const preamble = phpPreamble(fs.readFileSync(path.join(ROOT, "public", ".htaccess"), "utf8"));
let pages = 0;
for (const file of walk(DIST)) {
  if (path.basename(file) !== "index.html") continue;
  const html = fs.readFileSync(file, "utf8");
  fs.writeFileSync(path.join(path.dirname(file), "index.php"), preamble + html);
  fs.unlinkSync(file);
  pages++;
}
if (pages === 0) {
  console.error("dist/: keine index.html gefunden — build.format muss \"directory\" sein");
  process.exit(1);
}
console.log(`wrap-php: ${pages} Seiten als index.php`);

function phpPreamble(htaccess) {
  const lines = [];
  for (const m of htaccess.matchAll(/^\s*Header always set (\S+) "([^"]*)"(?:\s+"expr=([^"]*)")?\s*$/gm)) {
    const [, name, value, expr] = m;
    const call = `header(${phpString(`${name}: ${value}`)});`;
    lines.push(expr ? `if ($https) { ${call} }` : call);
  }
  if (lines.length === 0) throw new Error("public/.htaccess: keine `Header always set`-Zeilen gefunden");
  return [
    "<?php",
    "// Statische Seite, mit Absicht über PHP ausgeliefert: Beim Hoster liefert",
    "// nginx vorhandene .html-Dateien am Apache vorbei aus, und dann fehlen die",
    "// Security-Header aus der .htaccess. Eine .php-Datei geht immer durch Apache.",
    "// Die Header stehen hier noch einmal (Werte beim Build aus public/.htaccess",
    "// übernommen). Generiert von scripts/wrap-php.mjs — Quelle ist src/.",
    "$https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')",
    "  || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');",
    ...lines,
    "?>",
    "",
  ].join("\n");
}

function phpString(text) {
  return `'${text.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
}

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}
