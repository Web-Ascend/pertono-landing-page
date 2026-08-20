// @ts-check
import { defineConfig } from "astro/config";

/**
 * Die Rechts-Site von Pertono: Datenschutzerklärung und Impressum unter
 * stabilen URLs, damit https://legal.pertono.com/datenschutz/ als
 * Datenschutz-URL in der Google Play Console eingetragen werden kann.
 *
 * `site` muss der echte Origin sein — die Canonical-URLs werden daraus
 * gebaut. Gehostet wird bei Checkdomain (siehe .github/workflows/deploy.yml),
 * deshalb ist `base` schlicht `/`.
 */
export default defineConfig({
  site: "https://legal.pertono.com",
  base: "/",
  build: {
    // Directory-URLs: /datenschutz/ statt /datenschutz.html.
    format: "directory",
  },
  compressHTML: true,
});
