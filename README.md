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
> anwaltliche Prüfung aussteht, trägt zusätzlich **jede** Seite der Site
> `noindex` — auch Preise und Ratgeber.
>
> Noch offen:
>
> - [ ] **Text anwaltlich prüfen lassen** (dabei auch bestätigen lassen, dass
>       kein Datenschutzbeauftragter bestellt werden muss), danach
>       `legalReviewDone = true` setzen
>
> Alle Felder sind gefüllt (Quellen im Datei-Kommentar): Anbieter Jan Solga
> (Einzelunternehmer, Münster), Telefon, Registereintrag („nicht eingetragen"),
> USt-IdNr. („keine vorhanden", vom Inhaber bestätigt),
> § 18-MStV-Verantwortlicher, Aufsichtsbehörde LDI NRW, Auftragsverarbeiter
> Supabase, Firebase Cloud Messaging und Brevo (E-Mail-Versand über
> `send.pertono.com`), „Stand"-Datum.
>
> Das `noindex` verschwindet von selbst, sobald alle Felder gefüllt sind
> **und** `legalReviewDone = true` ist — es gibt keinen zweiten Schalter, der
> vergessen werden kann. Die Rechtsseiten bleiben immer `noindex`.

Die Website von [Pertono](https://pertono.com) — Vereinsverwaltung fürs Handy.
Statisch (Astro): Startseite mit den unterstützten Plattformen (Android, Web,
künftig iOS), Preise, Ratgeber und Vergleichsseiten, dazu Datenschutzerklärung
und Impressum unter stabilen URLs.

**Datenschutz-URL für die Google Play Console:** `https://pertono.com/datenschutz/`

Brand-Farben und die self-hosted Fonts (keine Google-Fonts-Requests — Pertono
verspricht EU-Datenhaltung) sind aus dem `pertono`-Repo übernommen. Die
Marketing-Site (Startseite, Preise, Blog, Vergleichsseiten) lebte früher als
`pertono/website` im Monorepo und ist hierher umgezogen — dieses Repo ist die
eine Site, die unter `pertono.com` live geht.

## Seiten

| URL | Inhalt |
| --- | --- |
| `/` | Startseite: Pitch, Funktionen, Plattformen |
| `/preise/` | Tarife (bis zum Start als vorläufig gekennzeichnet) |
| `/blog/` | Ratgeber-Artikel aus `src/content/blog/` |
| `/vergleich/…/` | Vergleichsseiten aus `src/content/vergleich/` |
| `/datenschutz/` | Datenschutzerklärung |
| `/impressum/` | Impressum nach § 5 DDG |

## Inhalte pflegen

Ratgeber und Vergleiche sind Astro-Content-Collections mit Schema-Validierung
(`src/content.config.ts`) — `npm run check` ist deshalb ein echter Check: eine
zu lange Meta-Description bricht den Build. Vergleichsseiten nennen einen
echten Wettbewerber, ihr Schema erzwingt darum `checkedOn`, das Datum der
letzten Prüfung der Aussagen — eine veraltete Vergleichsseite ist eine falsche
Behauptung über ein anderes Unternehmen. Beiträge mit `draft: true` erscheinen
in keinem Build.

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

## Prüfung im Pull Request

[`.github/workflows/pr-check.yml`](.github/workflows/pr-check.yml) führt bei
jedem Pull Request auf `main` `npm ci`, `npm run check` und `npm run build`
aus — dieselben Befehle in derselben Reihenfolge wie der Deploy, nur vor dem
Merge statt danach. Der Job hat weder Secrets noch ein Environment und lädt
nichts hoch, ist also auch für einen Pull Request aus einem Fork unbedenklich.
Als *Required Check* in den Branch-Protection-Regeln hinterlegt, kommt kein
Branch mehr nach `main`, dessen Build bricht.

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

## App-Deeplinks (Einladungslinks)

Die Einladungsmail der App verlinkt auf `https://pertono.com/einladung/<Code>`.
Dieser Pfad gehört der App, nicht der Landing Page:

- **App installiert:** Android (und später iOS) fängt den Link auf
  Betriebssystem-Ebene ab und öffnet die App direkt — der Server wird nie
  erreicht. Das setzt die Domain-Verifizierung über die beiden Dateien in
  [`public/.well-known/`](public/.well-known/) voraus.
- **Keine App:** eine `RewriteRule` in [`public/.htaccess`](public/.htaccess)
  leitet mit `302` auf `https://app.pertono.com/?invite=<Code>` weiter (Code als
  Query, weil ein `#`-Fragment einen Redirect nicht zuverlässig überlebt); die
  Web-App löst den Code dort ein.

Beide `.well-known`-Dateien sind — wie die `.htaccess` — Dotfiles, die der
Mirror ausschließt. Der Deploy lädt sie per separatem `put` hoch und **prüft im
Anschluss per `curl` gegen die Live-Site**, dass sie erreichbar sind, den
richtigen Content-Type haben und der Redirect den Code trägt. Ein grüner Deploy
mit totem Deeplink ist damit ausgeschlossen.

**Zwei Werte müssen noch eingetragen werden** (Platzhalter im Code, CI warnt
solange sie stehen):

| Datei | Platzhalter | Wert |
| --- | --- | --- |
| `public/.well-known/assetlinks.json` | `REPLACE_WITH_PLAY_APP_SIGNING_SHA256_FINGERPRINT` | SHA-256 des **Play-App-Signing**-Zertifikats (Play Console → *Einrichtung → App-Integrität → App-Signatur*), Format `AB:CD:…` |
| `public/.well-known/apple-app-site-association` | `REPLACE_WITH_APPLE_TEAM_ID` | Apple **Team ID** (10 Zeichen); die AASA ist bis dahin vorbereitet, aber dormant |

Bis der Fingerprint stimmt, schlägt Androids Verifizierung bewusst geschlossen
fehl — der Link öffnet dann im Browser, was ohnehin der Fallback ist. Die
`ForceType`-Regel für die endungslose AASA prüft der Deploy nur als Warnung, weil
iOS noch nicht ausgeliefert wird; vor dem iOS-Start muss sie grün sein.

## Danach: Google Play Console

Sobald die Identitätsfelder gefüllt sind, `legalReviewDone = true` gesetzt ist
und die Seite live ist: `https://pertono.com/datenschutz/` als Datenschutz-URL
im Play Console App-Content eintragen. Das dauerhafte `noindex` der
Rechtsseiten stört dabei nicht — die URL muss nur öffentlich erreichbar sein.
