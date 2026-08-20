# pertono-legal

> [!WARNING]
> **Vor der Veröffentlichung ausfüllen und prüfen lassen.** Die
> Identitätsangaben sind absichtlich leere Platzhalter (`[ausfüllen]`) — eine
> plausibel aussehende falsche Adresse ist gefährlicher als eine offensichtlich
> leere. Solange Felder offen sind oder die anwaltliche Prüfung aussteht,
> liefern alle Seiten automatisch `<meta name="robots" content="noindex">` aus.
>
> Alle Angaben stehen zentral in **`src/data/legal.ts`**:
>
> - [ ] Firmierung (`companyName`)
> - [ ] Straße und Hausnummer (`street`)
> - [ ] Postleitzahl und Ort (`zipCity`)
> - [ ] Vertretungsberechtigte Person (`representative`)
> - [ ] Telefon (`phone`) — E-Mail ist mit `support@pertono.com` vorbelegt
> - [ ] Registergericht und Registernummer (`registerCourt`, `registerNumber`) — oder Hinweis „kein Registereintrag"
> - [ ] USt-IdNr. (`vatId`) — oder Hinweis „keine vorhanden"
> - [ ] Verantwortlich nach § 18 Abs. 2 MStV (`contentResponsible`)
> - [ ] Datenschutzbeauftragte Person (`dataProtectionOfficer`) — oder „Nicht bestellt, da gesetzlich nicht erforderlich."
> - [ ] Zuständige Aufsichtsbehörde (`supervisoryAuthority`)
> - [ ] Auftragsverarbeiter: Hosting, Push, E-Mail-Versand (`processors`)
> - [ ] „Stand"-Datum der Datenschutzerklärung (`lastUpdated`)
> - [ ] **Text anwaltlich prüfen lassen**, danach `legalReviewDone = true` setzen
>
> Das `noindex` verschwindet von selbst, sobald alle Felder gefüllt sind **und**
> `legalReviewDone = true` ist — es gibt keinen zweiten Schalter, der vergessen
> werden kann.

Statische Rechts-Website für [Pertono](https://pertono.com) — Datenschutzerklärung
und Impressum unter stabilen URLs, damit sie als Datenschutz-URL im Google Play
Console App-Content eingetragen werden können.

**Finale Datenschutz-URL:** `https://legal.pertono.com/datenschutz/`

Die Inhalte sind übernommen aus dem `pertono`-Repo
(`website/src/pages/datenschutz.astro`, `website/src/pages/impressum.astro`);
Brand-Farben und selbst gehostete Fonts (keine Google-Fonts-Requests — Pertono
verspricht EU-Datenhaltung) ebenfalls von dort.

## Seiten

| URL | Inhalt |
| --- | --- |
| `/` | Übersicht mit Links |
| `/datenschutz/` | Datenschutzerklärung |
| `/impressum/` | Impressum nach § 5 DDG |

## Entwicklung

```sh
npm ci
npm run dev      # lokaler Dev-Server
npm run build    # statischer Build nach dist/
npm run preview  # dist/ lokal ansehen
```

## Deployment (aktiv): Checkdomain per SFTP

`pertono.com` liegt bei Checkdomain, `legal.pertono.com` deshalb auch. Der
Workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) baut
bei jedem Push auf `main` die Site und spiegelt `dist/` per `lftp` über SFTP
auf den Webspace — modelliert nach dem Deploy der lets-rave Landing Page, die
ebenfalls dort hostet. (Abweichungen: Astro-Build vor dem Upload, und
GitHub-gehosteter Runner statt self-hosted, weil dieses Repo öffentlich ist.)

### Einmalige Einrichtung

1. **Checkdomain-Panel:** Subdomain `legal.pertono.com` im Paket von
   `pertono.com` anlegen und ihr ein eigenes Dokumentverzeichnis geben (z. B.
   `legal.pertono.com/`). Liegt die Subdomain im selben Paket, ist der
   DNS-Eintrag automatisch gesetzt — sonst beim DNS von `pertono.com` einen
   Eintrag für `legal` auf den Checkdomain-Webspace anlegen.
2. **SSL:** Im Checkdomain-Panel Let's Encrypt für `legal.pertono.com`
   aktivieren (HTTPS ist Pflicht für die Play-Console-URL).
3. **GitHub Secrets** unter *Settings → Secrets and variables → Actions*
   anlegen (gleiche Namen wie bei lets-rave, die Werte stehen im
   Checkdomain-Panel unter den SFTP-Zugangsdaten):

   | Secret | Inhalt |
   | --- | --- |
   | `SFTP_HOST` | SFTP-Host des Pakets, z. B. `hostNNN.checkdomain.de` |
   | `SFTP_PORT` | SFTP-Port (bei Checkdomain üblicherweise `22`) |
   | `SFTP_USER` | SFTP-Benutzer |
   | `SFTP_PASSWORD` | SFTP-Passwort |
   | `SFTP_REMOTE_PATH` | Absoluter Pfad zum Dokumentverzeichnis der Subdomain, z. B. `/var/www/vhosts/<paket>.checkdomain.de/legal.pertono.com` |
   | `SFTP_KNOWN_HOSTS` | Ausgabe von `ssh-keyscan -p <SFTP_PORT> <SFTP_HOST>` — aktiviert die Host-Key-Verifikation (ohne läuft der Deploy mit Warnung) |

   `SFTP_REMOTE_PATH` ist hier ein Secret (bei lets-rave steht der Pfad im
   Klartext im Workflow), weil dieses Repo öffentlich ist.
4. Push auf `main` — oder den Workflow im Actions-Tab manuell starten.

## Alternative (nicht aktiv): GitHub Pages

Falls das Hosting doch zu GitHub Pages wechseln soll:

- **Custom-Subdomain** `legal.pertono.com`: `public/CNAME` mit Inhalt
  `legal.pertono.com` anlegen, Pages-Workflow
  (`actions/configure-pages` → `astro build` → `actions/upload-pages-artifact`
  → `actions/deploy-pages`) einrichten, im DNS von `pertono.com` (bei
  Checkdomain) einen CNAME `legal` → `web-ascend.github.io` setzen und in den
  Repo-Settings *Enforce HTTPS* aktivieren. `site` in `astro.config.mjs`
  bleibt `https://legal.pertono.com`, `base` bleibt `/`.
- **Project Pages ohne DNS:** kein `CNAME`, in `astro.config.mjs`
  `site: 'https://web-ascend.github.io'` und `base: '/pertono-legal'` setzen.
  URL wäre dann `https://web-ascend.github.io/pertono-legal/datenschutz/`.

## Danach: Google Play Console

Sobald die Identitätsfelder gefüllt sind, `legalReviewDone = true` gesetzt ist
(damit fällt das `noindex` weg) und die Seite live ist:
`https://legal.pertono.com/datenschutz/` als Datenschutz-URL im Play Console
App-Content eintragen.
