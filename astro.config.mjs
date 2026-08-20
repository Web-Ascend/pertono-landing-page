// @ts-check
import { defineConfig } from "astro/config";

/**
 * Die Landing Page von Pertono: zeigt die unterstützten Plattformen (Android,
 * Web, künftig iOS) und hostet Datenschutzerklärung und Impressum unter
 * stabilen URLs — https://pertono.com/datenschutz/ ist die Datenschutz-URL
 * für die Google Play Console.
 *
 * `site` muss der echte Origin sein — die Canonical-URLs werden daraus
 * gebaut. Gehostet wird bei Checkdomain (siehe .github/workflows/deploy.yml),
 * deshalb ist `base` schlicht `/`.
 */
export default defineConfig({
  site: "https://pertono.com",
  base: "/",
  build: {
    // Directory-URLs: /datenschutz/ statt /datenschutz.html.
    format: "directory",
  },
  compressHTML: true,
});
