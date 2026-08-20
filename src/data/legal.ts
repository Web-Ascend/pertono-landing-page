/**
 * Die eine Stelle für alle Identitäts- und Pflichtangaben von Impressum und
 * Datenschutzerklärung.
 *
 * Quellen der ausgefüllten Werte — nichts hier ist erfunden:
 *  - Anbieter, Anschrift, Telefon: Impressum der live geschalteten
 *    lets-rave.com (gleicher Inhaber, Repo lets-rave_landing-page).
 *  - Aufsichtsbehörde (LDI NRW): Datenschutzerklärung von lets-rave.com.
 *  - Auftragsverarbeiter Supabase/Firebase: pertono-Repo (README,
 *    docs/architecture.md, supabase/functions/).
 *
 * Die verbliebenen TODO-Felder sind ABSICHTLICH leer, weil die Repos sie
 * nicht hergeben — eine plausibel aussehende falsche Angabe ist gefährlicher
 * als eine offensichtlich leere.
 *
 * Solange hier ein TODO steht oder `legalReviewDone` false ist, liefern alle
 * Seiten automatisch `<meta name="robots" content="noindex">` aus und zeigen
 * einen sichtbaren Entwurfs-Hinweis. Beides verschwindet von selbst, sobald
 * die Angaben vollständig sind UND die anwaltliche Prüfung bestätigt wurde —
 * es gibt keinen zweiten Schalter, der vergessen werden kann.
 */

/** Sichtbarer Platzhalter, identisch zu den Quelltexten im pertono-Repo. */
export const TODO = "[ausfüllen]";

/**
 * Erst auf `true` setzen, wenn der Text anwaltlich geprüft wurde.
 * Vorher bleiben alle Seiten auf noindex — unabhängig von den Feldern unten.
 */
export const legalReviewDone = false;

/** Anbieter- und Pflichtangaben (§ 5 DDG, Art. 13 DSGVO). */
export const provider = {
  companyName: "Jan Solga (Einzelunternehmer)",
  street: "Kettelerstraße 42",
  zipCity: "48147 Münster",
  country: "Deutschland",
  /** Einzelunternehmen — Inhaber und vertretungsberechtigt in einer Person. */
  representative: "Jan Solga (Inhaber)",
  email: "support@pertono.com",
  phone: "+49 1522 6886 187",
  /** Einzelunternehmen ohne Handelsregistereintrag (kein e.K.). */
  registerEntry: "Als Einzelunternehmen nicht im Handelsregister eingetragen.",
  /**
   * USt-IdNr. nach § 27a UStG — aus den Repos nicht belegbar (auch das
   * lets-rave-Impressum nennt keine). Falls vorhanden eintragen, sonst z. B.
   * "Keine Umsatzsteuer-Identifikationsnummer vorhanden."
   */
  vatId: TODO,
  /** Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV. */
  contentResponsible: "Jan Solga, Kettelerstraße 42, 48147 Münster",
  /**
   * Einzelunternehmen, keine Beschäftigten im Sinne von Art. 37 DSGVO /
   * § 38 BDSG — von der anwaltlichen Prüfung bestätigen lassen.
   */
  dataProtectionOfficer: "Nicht bestellt, da gesetzlich nicht erforderlich.",
  /** Zuständig für NRW (Sitz des Anbieters: Münster). */
  supervisoryAuthority:
    "Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW), www.ldi.nrw.de",
};

/** Auftragsverarbeiter aus Abschnitt "Speicherort" der Datenschutzerklärung. */
export const processors = {
  /** Datenbank, Auth und Speicher laufen auf Supabase (siehe pertono-Repo).
      Die Rolle ("Hosting" usw.) hängt die Datenschutz-Seite selbst an. */
  hosting: "Supabase",
  /** Firebase existiert im Produkt nur für Cloud Messaging auf Android. */
  push: "Google Firebase Cloud Messaging (nur Android)",
  /**
   * Noch nicht festgelegt: der E-Mail-Versand ist im Backend bisher ein Mock;
   * laut Code-Kommentar ist Postmark oder Brevo geplant, sobald die Domain
   * verifiziert ist. Erst eintragen, wenn der Anbieter wirklich feststeht.
   */
  email: TODO,
};

/** "Stand"-Datum der Datenschutzerklärung. */
export const lastUpdated = "20. August 2026";

const allValues = [
  ...Object.values(provider),
  ...Object.values(processors),
  lastUpdated,
];

/** True, solange mindestens ein Pflichtfeld noch den Platzhalter trägt. */
export const hasOpenTodos = allValues.includes(TODO);

/** Von den Seiten konsumiert: noindex, bis alles vollständig UND geprüft ist. */
export const noindex = hasOpenTodos || !legalReviewDone;
