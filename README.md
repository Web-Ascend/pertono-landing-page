# pertono-landing-page

> [!WARNING]
> **Vor der Veröffentlichung vervollständigen und prüfen lassen.** Die Angaben
> in **`src/data/legal.ts`** sind mit den belegbaren Daten aus den anderen
> Repos gefüllt (Impressum/Datenschutz der live lets-rave.com, pertono-Repo);
> die restlichen Platzhalter (`[ausfüllen]`) geben die Repos nicht her und
> dürfen nicht geraten werden. Die Rechtsseiten (`/datenschutz/`,
> `/impressum/`) tragen **dauerhaft** `<meta name="robots" content="noindex">`
> — sie sollen nie in einem Suchindex landen; die Play Console braucht nur
> Erreichbarkeit, keine Indexierung. Solange Felder offen sind oder die
> anwaltliche Prüfung aussteht, trägt zusätzlich auch die Startseite `noindex`.
>
> Noch offen:
>
> - [ ] Auftragsverarbeiter E-Mail-Versand (`processors.email`) — im Backend
>       bisher ein Mock; laut Code-Kommentar Postmark oder Brevo geplant. Erst
>       eintragen, wenn der Anbieter feststeht.
> - [ ] **Text anwaltlich prüfen lassen** (dabei auch bestätigen lassen, dass
>       kein Datenschutzbeauftragter bestellt werden muss), danach
>       `legalReviewDone = true` setzen
>
> Bereits gefüllt (Quellen im Datei-Kommentar): Anbieter Jan Solga
> (Einzelunternehmer, Münster), Telefon, Registereintrag („nicht eingetragen"),
> USt-IdNr. („keine vorhanden", vom Inhaber bestätigt),
> § 18-MStV-Verantwortlicher, Aufsichtsbehörde LDI NRW, Auftragsverarbeiter
> Supabase und Firebase Cloud Messaging, „Stand"-Datum.
>
> Das `noindex` der **Startseite** verschwindet von selbst, sobald alle Felder
> gefüllt sind **und** `legalReviewDone = true` ist — es gibt keinen zweiten
> Schalter, der vergessen werden kann. Die Rechtsseiten bleiben immer `noindex`.

Die Landing Page von [Pertono](https://pertono.com) — Vereinsverwaltung fürs
Handy. Statisch (Astro), zeigt die unterstützten Plattformen (Android, Web,
künftig iOS) und hostet Datenschutzerklärung und Impressum unter stabilen URLs.

**Datenschutz-URL für die Google Play Console:** `https://pertono.com/datenschutz/`

Rechtstexte, Brand-Farben und die self-hosted Fonts (keine Google-Fonts-Requests
— Pertono verspricht EU-Datenhaltung) sind aus dem `pertono`-Repo übernommen.
Die vollständige Marketing-Site (Blog, Preise, Vergleichsseiten) liegt weiterhin
in `pertono/website` und ist nicht deployt — dieses Repo ist die schlanke Seite,
die unter `pertono.com` live geht.

## Seiten

| URL | Inhalt |
| --- | --- |
| `/` | Landing Page: Plattformen + Links auf die Rechtsseiten |
| `/datenschutz/` | Datenschutzerklärung |
| `/impressum/` | Impressum nach § 5 DDG |

## Plattform-Status pflegen

Die Karten auf der Startseite kommen aus **`src/data/platforms.ts`**. Bei einem
Launch dort den `status` auf `"live"` stellen und die `href` eintragen (der
Play-Store-Link für `com.webascend.pertono` ist schon hinterlegt; die
Web-App-URL folgt, sobald sie gehostet ist — z. B. auf Firebase Hosting).
Nicht-live-Plattformen zeigen „Bald verfügbar" bzw. „Geplant" ohne Link.

## Entwicklung

```sh
npm ci
npm run dev      # lokaler Dev-Server
npm run build    # statischer Build nach dist/
npm run preview  # dist/ lokal ansehen
```

## Deployment: Checkdomain per SFTP

`pertono.com` liegt bei Checkdomain. Der Workflow
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) baut bei jedem
Push auf `main` die Site und spiegelt `dist/` per `lftp` über SFTP in das
Dokumentverzeichnis von `pertono.com` — modelliert nach dem Deploy der
lets-rave Landing Page, die ebenfalls dort hostet. (Abweichungen: Astro-Build
vor dem Upload, GitHub-gehosteter Runner statt self-hosted, weil dieses Repo
öffentlich ist, und der Zielpfad als Secret statt im Klartext.)

### Einmalige Einrichtung

1. **Environment anlegen:** *Settings → Environments → New environment* →
   `production`. Unter *Deployment branches* auf **Selected branches** stellen
   und nur `main` erlauben — so kommt kein Workflow auf einem Seitenbranch an
   die Zugangsdaten heran (das Repo ist öffentlich).
2. **Environment-Secrets** in `production` anlegen (die Werte stehen im
   Checkdomain-Panel unter den SFTP-Zugangsdaten; gleiche Namen wie bei
   lets-rave):

   | Secret | Inhalt |
   | --- | --- |
   | `SFTP_HOST` | SFTP-Host des Pakets, z. B. `hostNNN.checkdomain.de` |
   | `SFTP_PORT` | SFTP-Port (bei Checkdomain üblicherweise `22`) |
   | `SFTP_USER` | SFTP-Benutzer |
   | `SFTP_PASSWORD` | SFTP-Passwort |
   | `SFTP_REMOTE_PATH` | Absoluter Pfad zum Dokumentverzeichnis von `pertono.com`, z. B. `/var/www/vhosts/<paket>.checkdomain.de/pertono.com` |
   | `SFTP_KNOWN_HOSTS` | Ausgabe von `ssh-keyscan -p <SFTP_PORT> <SFTP_HOST>` — aktiviert die Host-Key-Verifikation (ohne läuft der Deploy mit Warnung) |

3. **SSL:** Im Checkdomain-Panel Let's Encrypt für `pertono.com` aktivieren,
   falls noch nicht geschehen (HTTPS ist Pflicht für die Play-Console-URL).
   Server-seitige Dotfiles wie `.well-known` rührt der Mirror nicht an —
   einzige Ausnahme ist die `.htaccess`: [`public/.htaccess`](public/.htaccess)
   wird nach dem Mirror separat hochgeladen und ersetzt die alte des Hosters
   (die `/` auf die gelöschte `/de/`-Site umleitete).
4. Push auf `main` — oder den Workflow im Actions-Tab manuell starten.

## Danach: Google Play Console

Sobald die Identitätsfelder gefüllt sind, `legalReviewDone = true` gesetzt ist
und die Seite live ist: `https://pertono.com/datenschutz/` als Datenschutz-URL
im Play Console App-Content eintragen. Das dauerhafte `noindex` der
Rechtsseiten stört dabei nicht — die URL muss nur öffentlich erreichbar sein.
