// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

/**
 * Die Website von Pertono: Startseite mit Plattform-Karten, Preise, Ratgeber
 * (Blog) und Vergleichsseiten — und die Rechtsseiten unter stabilen URLs
 * (https://pertono.com/datenschutz/ ist die Datenschutz-URL für die Google
 * Play Console). Sie ist der Akquisekanal: ein Kassenwart, der aus seinem
 * aktuellen Programm herauswill, findet Pertono über eine Suchmaschine.
 * Deshalb ist der Build statisch, ohne Client-JavaScript, und emittiert
 * eine Sitemap.
 *
 * `site` muss der echte Origin sein — Sitemap-Einträge und Canonical-URLs
 * werden daraus gebaut. Gehostet wird bei Checkdomain (siehe
 * .github/workflows/deploy.yml), deshalb ist `base` schlicht `/`.
 */
export default defineConfig({
  site: "https://pertono.com",
  base: "/",
  integrations: [
    sitemap({
      // Die Rechtsseiten tragen ihr noindex dauerhaft, die 404 ebenso. Eine
      // noindex-Seite in der Sitemap zu listen sagt einem Crawler zwei
      // gegensätzliche Dinge. (Das befristete Entwurfs-Gate aus
      // src/data/legal.ts filtert hier bewusst NICHT: es verschwindet von
      // selbst, und die Sitemap-URL soll von Anfang an stabil erreichbar
      // sein — solange das Gate steht, ist das noindex im HTML maßgeblich.)
      filter: (page) => !/\/(impressum|datenschutz|404)\/?$/.test(page),
    }),
  ],
  build: {
    // Directory-URLs: /datenschutz/ statt /datenschutz.html.
    format: "directory",
  },
  compressHTML: true,
});
