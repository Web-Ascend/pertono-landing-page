/**
 * Die eine Stelle für alle Identitäts- und Pflichtangaben von Impressum und
 * Datenschutzerklärung.
 *
 * Quellen der ausgefüllten Werte — nichts hier ist erfunden:
 *  - Anbieter, Anschrift, Telefon: Impressum der live geschalteten
 *    lets-rave.com (gleicher Inhaber, Repo lets-rave_landing-page).
 *  - Aufsichtsbehörde (LDI NRW): Datenschutzerklärung von lets-rave.com.
 *  - Auftragsverarbeiter Supabase/Brevo: pertono-Repo (README,
 *    docs/architecture.md, supabase/functions/).
 *  - Die BEIDEN Push-Wege: app/lib/src/core/push/ (firebase_bootstrap.dart,
 *    web_push_registrar.dart) und supabase/functions/_shared/push/ (fcm.ts,
 *    web_push.ts) im pertono-Repo. Sie haben verschiedene Empfänger und
 *    verschiedene Rechtsfolgen und stehen deshalb getrennt unten.
 *  - Webspace: die Deploy-Workflows beider Repos.
 *
 * Die verbliebenen TODO-Felder sind ABSICHTLICH leer, weil die Repos sie
 * nicht hergeben — eine plausibel aussehende falsche Angabe ist gefährlicher
 * als eine offensichtlich leere.
 *
 * Die Rechtsseiten (/datenschutz/, /impressum/) tragen ihr noindex DAUERHAFT
 * und unabhängig von dieser Datei — sie sollen nie in einem Suchindex landen
 * (die Play Console braucht nur Erreichbarkeit, keine Indexierung). Das Gate
 * hier unten konsumiert das BaseLayout für JEDE Seite der Site — Startseite,
 * Preise, Ratgeber, Vergleiche: solange ein TODO offen oder `legalReviewDone`
 * false ist, bleibt alles auf noindex (eine öffentliche Preisseite mit
 * unfertigem Impressum gehört genauso wenig in den Index wie die Startseite).
 * Das löst sich von selbst, sobald alles vollständig UND anwaltlich geprüft
 * ist — es gibt keinen zweiten Schalter, der vergessen werden kann.
 */

/** Sichtbarer Platzhalter, identisch zu den Quelltexten im pertono-Repo. */
export const TODO = "[ausfüllen]";

/**
 * Erst auf `true` setzen, wenn der Text anwaltlich geprüft wurde.
 * Vorher bleibt die Startseite auf noindex — unabhängig von den Feldern unten.
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
  /** Vom Inhaber bestätigt: Einzelunternehmer ohne USt-IdNr. */
  vatId: "Keine Umsatzsteuer-Identifikationsnummer nach § 27a UStG vorhanden.",
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
  /**
   * Firebase Cloud Messaging existiert im Produkt NUR auf Android:
   * `firebaseBelongsOn` in app/lib/src/core/push/firebase_bootstrap.dart gibt
   * überall sonst false zurück, und `cloudMessagingProvider` liefert dort null
   * — der Web-Build und iOS legen also gar kein Gerätetoken an.
   */
  pushAndroid: "Google (Firebase Cloud Messaging)",
  /**
   * Der zweite, völlig getrennte Push-Weg: im Browser die Web-Push-Schnittstelle
   * (RFC 8291/8292), ohne Firebase und ohne Google-JavaScript auf der Seite.
   * Welcher Push-Dienst zustellt, entscheidet der Browser — siehe
   * supabase/functions/_shared/push/web_push.ts und DECISIONS.md §4.
   */
  pushWeb: "der Push-Dienst des jeweiligen Browsers (Google, Mozilla oder Apple)",
  /**
   * Brevo (Brevo SAS, Paris — EU-Anbieter mit EU-Datenhaltung). Account und
   * Versand-Subdomain send.pertono.com sind eingerichtet (DKIM/SPF/DMARC
   * bei Checkdomain); das Backend stellt von MockEmailSender auf Brevo um.
   */
  email: "Brevo",
  /**
   * Webspace für pertono.com und app.pertono.com. Belegt durch die beiden
   * Deploy-Workflows ("Deploy to Checkdomain" hier, "Deploy web to Checkdomain"
   * im pertono-Repo), die per SFTP auf denselben Webspace spiegeln.
   */
  webHost: "Checkdomain",
};

/**
 * Angaben zum Speicherort und zur Drittlandsübermittlung, die weder das
 * pertono-Repo noch dieses Repo hergeben: beides sind Konsolen- bzw.
 * Vertragstatsachen (Supabase-Dashboard, Google-Vertragsunterlagen).
 *
 * Sie stehen hier als sichtbarer Platzhalter, aus demselben Grund wie die
 * Anbieterangaben oben: eine plausibel klingende, aber ungeprüfte Aussage über
 * einen Speicherort ist gefährlicher als eine offensichtlich offene Stelle —
 * eine Datenschutzerklärung, die etwas Falsches behauptet, ist schlechter als
 * eine mit einer markierten Lücke.
 */
export const dataLocation = {
  /** Region des Supabase-Projekts, z. B. "eu-central-1 (Frankfurt)". */
  supabaseRegion: TODO,
  /**
   * Das Instrument nach Art. 46 DSGVO, auf das die Übermittlung an Google
   * gestützt wird (Google-Auftragsverarbeitungszusatz mit Standardvertrags-
   * klauseln, EU-US Data Privacy Framework o. Ä.) — erst eintragen, wenn der
   * Vertrag tatsächlich geschlossen und die Grundlage geprüft ist.
   */
  googleTransferBasis: TODO,
};

/** "Stand"-Datum der Datenschutzerklärung. */
export const lastUpdated = "25. August 2026";

const allValues = [
  ...Object.values(provider),
  ...Object.values(processors),
  ...Object.values(dataLocation),
  lastUpdated,
];

/** True, solange mindestens ein Pflichtfeld noch den Platzhalter trägt. */
export const hasOpenTodos = allValues.includes(TODO);

/**
 * Vom BASELAYOUT für jede Seite konsumiert: noindex, bis alles vollständig
 * UND geprüft ist. Die Rechtsseiten und die 404 setzen ihr dauerhaftes
 * noindex zusätzlich selbst.
 */
export const noindex = hasOpenTodos || !legalReviewDone;
