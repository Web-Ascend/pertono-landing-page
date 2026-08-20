/**
 * Die eine Stelle für alle Identitäts- und Pflichtangaben von Impressum und
 * Datenschutzerklärung.
 *
 * Die mit TODO markierten Felder sind ABSICHTLICH leer: eine plausibel
 * aussehende falsche Adresse ist gefährlicher als eine offensichtlich leere,
 * weil sie niemandem auffällt. Ein unvollständiges oder falsches Impressum ist
 * abmahnfähig (§ 5 DDG).
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
  /** Firmierung, z. B. "Pertono GmbH" oder "Max Mustermann". */
  companyName: TODO,
  /** Straße und Hausnummer. */
  street: TODO,
  /** Postleitzahl und Ort. */
  zipCity: TODO,
  country: "Deutschland",
  /** Vertretungsberechtigte Person(en). */
  representative: TODO,
  /** Kontakt-E-Mail — die einzige bereits bekannte Angabe. */
  email: "support@pertono.com",
  /** Telefonnummer. */
  phone: TODO,
  /** Registergericht — oder Hinweis, dass kein Registereintrag besteht. */
  registerCourt: TODO,
  /** Registernummer. */
  registerNumber: TODO,
  /** USt-IdNr. nach § 27a UStG — oder Hinweis, dass keine vorhanden ist. */
  vatId: TODO,
  /** Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV. */
  contentResponsible: TODO,
  /**
   * Datenschutzbeauftragte Person — oder der Hinweis:
   * "Nicht bestellt, da gesetzlich nicht erforderlich."
   */
  dataProtectionOfficer: TODO,
  /** Zuständige Aufsichtsbehörde (Landesdatenschutzbehörde), mit Anschrift/Link. */
  supervisoryAuthority: TODO,
};

/** Auftragsverarbeiter aus Abschnitt "Speicherort" der Datenschutzerklärung. */
export const processors = {
  /** Hosting-Anbieter (Server in der EU). */
  hosting: TODO,
  /** Anbieter für Push-Benachrichtigungen. */
  push: TODO,
  /** Anbieter für E-Mail-Versand. */
  email: TODO,
};

/** "Stand"-Datum der Datenschutzerklärung, z. B. "20. August 2026". */
export const lastUpdated = TODO;

const allValues = [
  ...Object.values(provider),
  ...Object.values(processors),
  lastUpdated,
];

/** True, solange mindestens ein Pflichtfeld noch den Platzhalter trägt. */
export const hasOpenTodos = allValues.includes(TODO);

/** Von den Seiten konsumiert: noindex, bis alles vollständig UND geprüft ist. */
export const noindex = hasOpenTodos || !legalReviewDone;
