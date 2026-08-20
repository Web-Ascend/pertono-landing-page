/**
 * Die Plattformen, auf denen es Pertono gibt — die eine Stelle, an der ein
 * Launch eingetragen wird.
 *
 * `status` steuert, was die Startseite rendert:
 *  - "live":    Karte verlinkt auf `href` (Pflicht bei live).
 *  - "soon":    Karte zeigt "Bald verfügbar", ohne Link — auch wenn `href`
 *               schon hinterlegt ist (ein Play-Store-Link liefert 404, solange
 *               die App nur im internen Track liegt).
 *  - "planned": Karte zeigt "Geplant".
 *
 * Nichts hier erfinden: URLs erst eintragen, wenn sie existieren.
 */

export type PlatformStatus = "live" | "soon" | "planned";

export interface Platform {
  name: string;
  description: string;
  status: PlatformStatus;
  /** Ziel-URL; wird nur bei status "live" verlinkt. */
  href?: string;
  /** Beschriftung des Links bei status "live". */
  linkLabel?: string;
}

export const platforms: Platform[] = [
  {
    name: "Android",
    description: "Für Handy und Tablet, aus dem Google Play Store.",
    status: "soon",
    // Paket-ID aus dem App-Repo (com.webascend.pertono). Auf "live" stellen,
    // sobald die App im Play Store öffentlich ist.
    href: "https://play.google.com/store/apps/details?id=com.webascend.pertono",
    linkLabel: "Im Play Store öffnen",
  },
  {
    name: "Web",
    description: "Im Browser, ohne Installation — auch am Rechner.",
    status: "planned",
    // href eintragen, sobald die Web-App gehostet ist (z. B.
    // https://app.pertono.com), dann auf "live" stellen.
    linkLabel: "Web-App öffnen",
  },
  {
    name: "iOS",
    description: "Für iPhone und iPad, aus dem App Store.",
    status: "planned",
    linkLabel: "Im App Store öffnen",
  },
];

/** Anzeigetexte für die Nicht-live-Zustände. */
export const statusLabel: Record<Exclude<PlatformStatus, "live">, string> = {
  soon: "Bald verfügbar",
  planned: "Geplant",
};
