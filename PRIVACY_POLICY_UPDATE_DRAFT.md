# Privacy Policy — addendum per iOS Waitlist

Questa è una bozza da incorporare nella privacy policy esistente, che vive nel repo separato `nunzio993/dopahop-assets` (file `privacy-policy.html`).

Da aggiungere come nuova sezione (idealmente prima di "Diritti dell'utente"). Versione bilingue (IT + EN) — adatta nella stessa lingua del resto del documento.

---

## 🇮🇹 Versione italiana

### Lista d'attesa per la versione iOS

Quando ti iscrivi alla lista d'attesa per la versione iOS di DopaHop (form alla pagina `/ios-waitlist/`), raccogliamo:

- **Indirizzo email** — obbligatorio, lo usiamo esclusivamente per inviarti **una sola comunicazione** quando l'app iOS sarà disponibile su App Store.
- **Caso d'uso** — campo facoltativo in cui puoi raccontarci come pensi di usare l'app; ci serve solo per capire quali funzionalità sono più richieste e prioritizzare lo sviluppo.
- **Lingua di iscrizione** — dedotta dalla versione del sito da cui ti iscrivi (it/en/es/de/fr), per inviarti la comunicazione nella tua lingua.
- **Hash anonimo dell'IP + User Agent del browser** — conservati per finalità di sicurezza (prevenzione spam/abusi). L'IP è hashato con SHA-256 e un sale segreto: non è possibile ricostruirlo.

**Base giuridica**: consenso esplicito dell'utente (art. 6.1.a GDPR), prestato compilando e inviando il form.

**Conservazione**: i dati sono conservati fino al lancio della versione iOS o fino a 24 mesi dall'iscrizione, qualunque dei due si verifichi prima. Dopo l'invio della comunicazione di lancio, i dati vengono cancellati entro 30 giorni salvo richiesta esplicita di restare in contatto.

**Dove sono conservati**: Cloudflare D1 (database SQLite gestito), regione EU. I dati non lasciano l'infrastruttura Cloudflare.

**Newsletter / marketing**: l'email **non** sarà mai usata per newsletter, marketing o comunicazioni promozionali diverse dal singolo annuncio di lancio iOS.

**Anti-spam**: il form è protetto da Cloudflare Turnstile, un sistema anti-bot che non utilizza cookie di tracciamento e non profila l'utente.

**Diritti**: puoi richiedere in qualsiasi momento accesso, rettifica o cancellazione dei tuoi dati scrivendo a [tuo-indirizzo-email@dopahop.app]. La cancellazione è eseguita entro 7 giorni lavorativi.

---

## 🇬🇧 English version

### iOS Waitlist

When you sign up for the DopaHop iOS waitlist (form at `/ios-waitlist/`), we collect:

- **Email address** — required, used solely to send you **a single message** when the iOS app becomes available on the App Store.
- **Use case** — optional free-text field where you can tell us how you'd use the app; used only to understand which features are most requested and prioritize development.
- **Sign-up language** — inferred from the locale of the site version you sign up from (it/en/es/de/fr), so we can send the launch message in your language.
- **Anonymous IP hash + browser User Agent** — retained for security purposes (spam/abuse prevention). The IP is hashed with SHA-256 plus a secret salt and cannot be reversed.

**Legal basis**: explicit user consent (art. 6.1.a GDPR), given by completing and submitting the form.

**Retention**: data is retained until the iOS version launches or for up to 24 months from sign-up, whichever comes first. After the launch message is sent, data is deleted within 30 days unless you explicitly request to stay in contact.

**Where it's stored**: Cloudflare D1 (managed SQLite database), EU region. Data never leaves Cloudflare infrastructure.

**Newsletter / marketing**: your email will **never** be used for newsletters, marketing, or any promotional message other than the single iOS launch announcement.

**Anti-spam**: the form is protected by Cloudflare Turnstile, an anti-bot system that does not use tracking cookies and does not profile the user.

**Rights**: you can request access, correction, or deletion of your data at any time by writing to [your-email-address@dopahop.app]. Deletion is performed within 7 working days.

---

## Note operative

- Per cancellare manualmente un'email su richiesta utente:
  ```powershell
  wrangler d1 execute dopahop_waitlist --remote --command="DELETE FROM ios_signups WHERE email = 'user@example.com'"
  ```
- Aggiungere il link alla privacy policy aggiornata anche nel footer del form (già presente come `privacyNote` nelle i18n strings, ma considerare un link diretto alla section).

## TODO post-update

- [ ] Pubblicare il privacy update nel repo `nunzio993/dopahop-assets`
- [ ] Aggiornare la `version` / `lastUpdated` nella privacy policy
- [ ] Verificare che `https://nunzio993.github.io/dopahop-assets/privacy-policy.html` rifletta i cambiamenti
- [ ] (Opzionale) Aggiungere link diretto alla sezione "iOS Waitlist" dal `privacyNote` della pagina waitlist
