# DIU AI Training Seminars — website

Website for the **AI training seminars of the Department of Computer Science and Engineering, Daffodil International University (DIU)**: two programmes, **AI for Professionals** and **AI for Workspace**, run in batches at Daffodil Smart City, Savar, Dhaka, with hands-on sessions led by the department's trainers.

The training runs **continuously**: new batches start all year round, anyone can register at any time and is placed in the next batch with free seats, and the site always shows the next batch's dates. The site has no "coming soon" posters or countdowns. [`docs/REQUIREMENTS_CHECKLIST.md`](docs/REQUIREMENTS_CHECKLIST.md) maps the brief to the site and lists what the organisers still need to fill in.

It's a fast, accessible, mobile-first site with light and dark modes, a light pastel palette and **Aura**, an original robot guide (square-jawed and broad-shouldered by default; his build, colours and eyes are chosen in the admin panel) who looks different in each section: a rocket for AI for Professionals, a laptop and headset for AI for Workspace, a mortarboard and laser pointer on the Trainers page, a graduation cap and confetti for past participants, and so on. Organisers update all content from a built-in admin panel, with no code changes.

**Stack:** Next.js 16 (App Router, React 19, TypeScript) · Node.js · MongoDB (Mongoose) · Tailwind CSS 4.

| Document | For |
| --- | --- |
| This README | Developers and whoever hosts the site |
| [`docs/ADMIN_GUIDE.md`](docs/ADMIN_GUIDE.md) | Organisers updating content (a short version is inside the admin at **/admin/guide**) |
| [`docs/REQUIREMENTS_CHECKLIST.md`](docs/REQUIREMENTS_CHECKLIST.md) | How each item of the brief is met, and what is still a placeholder |
| [`docs/IMAGE_CREDITS.md`](docs/IMAGE_CREDITS.md) | Where the built-in photos and logos come from, and their licences |
| [`loadtest/README.md`](loadtest/README.md) | End-to-end load tests (k6, nginx, a real browser) and how to run them |

---

## What's included

**Public site**
- **Home (single scroll, sticky navigation):** a loading screen the first time the site is opened (the site's files are cached behind it while Aura's ship takes off); the hero with the programme's name, tagline, the next batch's dates and venue, Aura holding up a placard for each programme in turn with the registration status (*enrolling now!*), two compact registration cards along its foot (*AI for Professionals* and *AI for Workspace*, each opening the form with its programme ticked), and a photo of DIU's campus behind Aura with the university's sign above his head (the academic building by day in the light theme, the Knowledge Tower by night in the dark theme; `public/hero/`; Site settings → Home → Hero replaces it or switches it off). Then, in this default order (Site settings → Home → Section order): *Enrolment* (new batches all year round) with what to expect and a *Now enrolling* poster; the two **programme cards**; the **trainers** in a 3D cover-flow carousel; announcements; About (Aura in a circle of up to 8 topics); **past participants' quotes**; the highlights as a tear-off ticket; venue and travel as an interactive **route map of north-west Dhaka** (pick air, train, metro rail or road and a small Aura travels the route to Daffodil Smart City); partner logos; FAQ and contact form. The DIU logo and the Department of CSE seal sit at the corners of the navigation bar, which links Home, Schedule, Trainers and Past participants; everything else is under *Explore*.
- **Inner pages:** `/about` (why the training, what you will learn, an interactive loop of how a professional works with AI: frame, brief, draft, check, apply; who should attend, how a batch runs), `/programme` (the **Schedule** of the next batch: each day's hours, the session formats and programmes, day tabs, filters by programme and type, search, *My agenda* (starring needs signing in), calendar links, PDF download), `/trainers` (the **lead trainer's spotlight**, then every trainer with filters by programme and pop-up profiles with shareable links), `/past-participants` (numbers, featured quotes, everyone by batch with filters and search), `/tutorials` (**hands-on labs** and demos), `/venue`, `/partners` (partners by tier, ways to take part, partnership tiers, *Become a partner*), `/register`, `/organisers` and `/meet-aura`.
- **After a batch**, hidden until switched on in the admin: `/gallery` (photos) and `/recordings` (slides and recordings).
- **Forms:** training registration (with the programme and the participant's experience with AI tools) and contact / *Become a partner* enquiries. They support deadlines and open/closed status, and send confirmation e-mails with a calendar invite. Every field can be edited in Site settings (*Registration → Form fields*, *Home → Contact form*, *Partners → Partner form*); the server checks answers against the same settings, and the admin's views, CSV exports and e-mails follow them.
- **Ask Aura:** a button in the bottom-right corner of every page (or Ctrl/⌘ + K) opens a search over the pages, home sections, FAQs, trainers, sessions and labs, with the next batch's dates, the venue and *Register* at hand (`components/aura/AuraAssistant.tsx`, index in `src/lib/content/search.ts`). Site settings → Site-wide → Features & past batches switches it off.
- **Extras:** add-to-calendar (Google, Outlook, .ics), share buttons, SEO metadata, Open Graph images, JSON-LD course data (the training as a `Course` with the next batch as its `CourseInstance`), sitemap, robots.txt, web manifest, Google Analytics (optional), Vercel Web Analytics (when deployed on Vercel).

**Admin panel (`/admin`)**
- Sign-in with administrator, editor and volunteer roles. Volunteers get a responsibility and only the permissions an administrator ticks, and their changes go to a **task tracker**.
- **Site settings with a tab per page:** every section's texts, colours and background, the order of each page's sections, sections that can be hidden, the site's accent colours and **Aura's look** (build, colours, eyes), with the real page as a live preview beside the form.
- Edit everything: programme details and batch dates, registration status and deadlines, announcements, the two programmes, trainers, the schedule, hands-on labs, demos, **past participants**, partners and tiers, organisers and volunteers, FAQs, venue and travel, contact and social links, branding, SEO, and the past-batch switches.
- Media library, registrations and enquiries (search, status, notes, CSV export for Excel). Changes appear on the website immediately.

---

## Quick start (development)

Requirements: **Node.js 20.9+** (22 LTS recommended) and **MongoDB 6+**, either local or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster.

```bash
npm install
cp .env.example .env.local      # set MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD (AUTH_SECRET optional in dev)
npm run seed                    # stores the default content (also happens automatically on first start):
                                # the nine trainers (DEFAULT_TRAINERS), FAQs and the tentative two-day schedule
                                # (DEFAULT_SESSIONS in src/lib/content/defaults.ts, shown as a draft)
npm run dev                     # http://localhost:3000
```

Sign in at <http://localhost:3000/admin> with `ADMIN_EMAIL` / `ADMIN_PASSWORD`. On an empty database the first sign-in creates the administrator. You can also create users from the command line:

```bash
npm run create-admin -- --email you@daffodilvarsity.edu.bd --name "Your Name"            # asks for a password
npm run create-admin -- --email editor@daffodilvarsity.edu.bd --role editor
```

The same command resets the password of an existing user.

### Sample content for previews

The trainers and a draft schedule are built in, but past participants, labs, demos and partners start empty, with friendly placeholders that invite people in rather than say "coming soon". To preview a fully populated site, load sample content. Every sample item is labelled as a sample (names like *Ayesha Sample*, *Example Bank PLC*):

```bash
npm run seed:demo                 # adds 8 past participants in 2 batches (with quotes), 3 labs, 2 demos, partners, volunteers, an announcement
npm run seed:demo -- --remove     # removes exactly those items (your own content is kept)
```

While samples are loaded, the admin dashboard shows a warning. **Remove them before launch.**

> Scripts write straight to the database, so the running site can take up to 5 minutes to show their changes. To show them at once, press **Refresh website** on the admin dashboard (or restart the site). Changes made in the admin panel show up immediately.

### Useful commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` / `npm start` | Production build / server |
| `npm run lint` · `npm run typecheck` · `npm run check` | ESLint · TypeScript · both |
| `npm run seed` | Add default content where missing (never overwrites) |
| `npm run seed:demo [-- --remove \| --reset]` | Add / remove sample content |
| `npm run create-admin -- --email …` | Create a user or reset a password |

---

## Configuration

All settings are environment variables; [`.env.example`](.env.example) documents each one. `NEXT_PUBLIC_*` values are compiled in at build time, so **rebuild after changing them**.

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | yes | MongoDB connection string, e.g. `mongodb://127.0.0.1:27017/diu-ai-training` or an Atlas `mongodb+srv://…` URI. Give this site **a database of its own**. If the database it names was set up by the site's earlier version (recognised by the `hackathon` record that version stored), the site uses its own database, `diu-ai-training`, on the same server instead, with the admin accounts carried over, and leaves the earlier one untouched (`src/lib/db.ts`) |
| `MONGODB_DB` | | Database name, if not in the URI (the same rule applies) |
| `NEXT_PUBLIC_SITE_URL` | yes (prod) | Public origin, e.g. `https://ai-training.daffodilvarsity.edu.bd`. Used in e-mails, calendar files, the sitemap and social previews |
| `NEXT_PUBLIC_BASE_PATH` | | Serve under a path, e.g. `/ai-training` for `https://cse.daffodilvarsity.edu.bd/ai-training` |
| `AUTH_SECRET` | yes (prod) | 32+ random characters for signing admin sessions (`openssl rand -base64 48`). Without it the admin panel refuses sign-ins in production |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | | First administrator, created on the first sign-in to an empty database (password: 10+ characters) |
| `COOKIE_SECURE` | | `false` only to test a production build over plain HTTP. Not needed on localhost |
| `CLIENT_IP_HEADER` | | Header holding the visitor's IP address, if your proxy sets one it overwrites (e.g. `x-real-ip`, `cf-connecting-ip`). By default the last `X-Forwarded-For` entry is used. Used for rate limits |
| `RATE_LIMIT_EXEMPT` | | IPv4 addresses or ranges (e.g. `203.0.113.0/24, 198.51.100.7`) where many people share one address and may all register at once, such as the university's network or a computer lab's. Elsewhere one address may send at most 100 registrations and 40 messages per 10 to 15 minutes; each person (address and e-mail) 8 and 5 |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | | Outgoing mail for confirmations and organiser notifications. Without them, forms still work but no e-mail is sent |
| `SMTP_MAX_CONNECTIONS`, `SMTP_MAX_PER_MINUTE` | | Connections to the mail server at once (default 3), and e-mails a minute at most (default no limit; set it under your provider's limit, e.g. 30 for Microsoft 365). E-mails beyond it wait their turn, and one the server turns away for now is tried again for about 8 minutes |
| `MAIL_FROM` | | Sender, e.g. `"DIU AI Training Seminars <no-reply@daffodilvarsity.edu.bd>"` |
| `NOTIFY_EMAIL` | | Where organiser notifications of new enquiries go (overridable in Admin → Site settings → Site-wide → Contact & social) |
| `NEXT_PUBLIC_GA_ID` | | Google Analytics 4 ID `G-…` (or set it in Admin → Site settings → Site-wide → SEO & analytics) |
| `MAX_UPLOAD_MB` | | Max size per upload (default 8) |

**How content is stored:** everything editable lives in MongoDB, including uploaded images and PDFs (GridFS bucket `media`). Backing up the database backs up the whole site. If the database is unreachable, the public site still renders with the built-in default content (programme details, trainers, schedule, FAQs), and forms show a friendly error.

---

## Deployment

The site needs a Node.js server; it is not a static export. Use either of the two options below. Serve it over **HTTPS** at a DIU subdomain (e.g. `ai-training.daffodilvarsity.edu.bd`) or a path (e.g. `cse.daffodilvarsity.edu.bd/ai-training`, with `NEXT_PUBLIC_BASE_PATH=/ai-training`).

### Option A — Docker Compose (website + MongoDB)

```bash
cp .env.example .env    # set NEXT_PUBLIC_SITE_URL, AUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, SMTP_* (MONGODB_URI is set by compose)
docker compose up -d --build
docker compose run --rm tools seed                                   # optional: default content (also automatic)
docker compose run --rm tools create-admin -- --email you@daffodilvarsity.edu.bd --password 'a-long-password'
```

The site listens on port 3000 of this machine only (`PORT` in `.env` changes the port), for the reverse proxy below; set `BIND=0.0.0.0` to publish it on every interface. MongoDB data persists in the `mongo-data` volume. To update, run `git pull && docker compose up -d --build`.

The image is built without database access, so its pages start with the default content and switch to what is in MongoDB within about a minute of starting. Press **Refresh website** on the admin dashboard to switch them at once.

### Option B — Node.js + PM2 on a server

```bash
git clone <repo> diu-ai-training && cd diu-ai-training
npm ci
cp .env.example .env.local        # production values; NODE_ENV is set by `npm start`
npm run build
npm install -g pm2
pm2 start npm --name diuai -- start -- -H 127.0.0.1   # port 3000, for the reverse proxy only; add `-p 4000` for another port
pm2 save && pm2 startup                     # restart on reboot
```

To update: `git pull && npm ci && npm run build && pm2 restart diuai`.

### Reverse proxy with HTTPS (Nginx)

Put this in `/etc/nginx/sites-available/diu-ai-training` and enable it (`ln -s ../sites-available/diu-ai-training /etc/nginx/sites-enabled/`):

```nginx
upstream diuai {
    server 127.0.0.1:3000;
    keepalive 64;                                      # reuse connections to Node.js
}
# Build files are cached for good, pages for 2 seconds (nginx creates the folder).
proxy_cache_path /var/cache/nginx/diuai levels=1:2 keys_zone=diuai:10m max_size=512m inactive=7d use_temp_path=off;
# Signed-in organisers and the admin's live preview always get fresh pages.
map "$cookie_diuai_admin$cookie___prerender_bypass" $diuai_no_cache { default 1; "" 0; }
# One gzipped and one plain copy of everything cached.
map $http_accept_encoding $diuai_encoding { ~*gzip gzip; default ""; }

server {
    listen 443 ssl http2;
    server_name ai-training.daffodilvarsity.edu.bd;
    ssl_certificate     /etc/ssl/diu/fullchain.pem;   # university certificate or Let's Encrypt (certbot --nginx)
    ssl_certificate_key /etc/ssl/diu/privkey.pem;
    client_max_body_size 10m;                          # uploads (MAX_UPLOAD_MB)

    proxy_http_version 1.1;
    proxy_set_header Connection "";
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $remote_addr;     # overwrite (not append) so clients can't spoof their IP

    # Forms, APIs and the admin panel: never cached.
    location /api/  { proxy_pass http://diuai; }
    location /admin { proxy_pass http://diuai; }

    # Build files: a file's name changes with its content, so each is fetched from Node.js once.
    location /_next/static/ {
        proxy_pass http://diuai;
        proxy_set_header Accept-Encoding $diuai_encoding;
        proxy_cache diuai;
        proxy_cache_key "$host$request_uri|$diuai_encoding";
        proxy_cache_valid 200 30d;
        proxy_ignore_headers Vary;
    }

    # Pages, prefetches and files in public/: cached for 2 seconds, so a rush reaches Node.js about once
    # per page every 2 seconds, and an edit saved in the admin reaches visitors within about 2 seconds.
    location / {
        proxy_pass http://diuai;
        proxy_set_header Accept-Encoding $diuai_encoding;
        proxy_cache diuai;
        proxy_cache_key "$host$request_uri|$diuai_encoding|$http_rsc|$http_next_router_prefetch|$http_next_router_segment_prefetch|$http_next_router_state_tree|$http_next_url";
        proxy_cache_valid 200 301 302 307 308 404 2s;
        proxy_ignore_headers Cache-Control Expires Vary; # the key above holds every header a page varies on
        proxy_cache_lock on;
        proxy_cache_use_stale updating error timeout http_500 http_502 http_503 http_504;
        proxy_cache_background_update on;
        proxy_cache_bypass $diuai_no_cache;
        proxy_no_cache $diuai_no_cache;
    }
}
server { listen 80; server_name ai-training.daffodilvarsity.edu.bd; return 301 https://$host$request_uri; }
```

And in `/etc/nginx/nginx.conf`, give nginx enough connections for a busy day (every visitor holds one, and every request passed to Node.js another; Ubuntu's default is 768 per worker):

```nginx
worker_rlimit_nofile 65535;      # at the top, beside worker_processes
events {
    worker_connections 4096;
}
```

Then `sudo nginx -t && sudo systemctl reload nginx`. In load tests on a 2-core server this served 2,000 people registering within the same minute with no errors, where a plain `proxy_pass` failed most of them (`loadtest/` reproduces them).

`Host` must be passed through: the admin API rejects cross-site requests by comparing the browser's `Origin` with it. For a sub-path, build with `NEXT_PUBLIC_BASE_PATH` set to the same path, put the path in front of every `location` (`/ai-training/api/`, `/ai-training/admin`, `/ai-training/_next/static/`, `/ai-training/`) and proxy without stripping the prefix. Run one Node.js process only: rate limits and the page cache live in its memory.

### After deploying

1. Open `/api/health`. It should return `{"status":"ok","db":"connected"}`.
2. Sign in at `/admin`, change the password (My account), and add the other organisers under **Users**.
3. In **Site settings**, set the next batch's dates, the fees, the contact e-mail and phone, check the registration status and deadlines, and add the Google Analytics ID. Then fill in the trainers' designations and photos, and the schedule (see the list at the end of [`docs/REQUIREMENTS_CHECKLIST.md`](docs/REQUIREMENTS_CHECKLIST.md)).
4. Confirm `NEXT_PUBLIC_SITE_URL` is right. Social previews and e-mail links use it.
5. Send a test registration to check that e-mail works.

### Backups

```bash
mongodump --uri "$MONGODB_URI" --archive=diuai-$(date +%F).gz --gzip     # includes uploaded files
mongorestore --uri "$MONGODB_URI" --archive=diuai-2026-12-01.gz --gzip
```

With Docker, run the same commands inside the `mongo` container, e.g. `docker compose exec mongo mongodump --archive --gzip > backup.gz`.

---

## Project structure

```
src/
  app/
    (site)/            public pages (home, about, programme (the schedule), trainers, past-participants, tutorials (hands-on labs), venue, partners, register, organisers, gallery, recordings, meet-aura)
    admin/             admin panel (login, dashboard, content editors, settings, registrations, media, users, volunteers, task tracker, guide)
    api/               public APIs (register, enquiries, calendar, programme/pdf, media, health) and /api/admin/*
    opengraph-image.tsx, sitemap.ts, robots.ts, manifest.ts, icon.svg …
  components/
    aura/              Aura mascot: SVG art in two builds (builds.ts), presets, eye-tracking, reactions, fly-in entrances, playground, Ask Aura
    loading/           the home page's loading screen (Aura's ship, the crew, the progress ring, the smoke), the asset caching behind it, and the service worker registration
    home/ programme/ partners/ trainers/ participants/ tutorials/ venue/ gallery/ forms/ share/ layout/ ui/ effects/ admin/
  lib/
    schema/            field definitions for every content type (drive the admin forms, validation and database schemas)
    content/           default content (settings, trainers, schedule, FAQs), cached queries, bootstrap
    server/            auth, e-mail, PDF, CSV, validation, admin CRUD (server-only)
  proxy.ts             protects /admin pages
scripts/               seed, seed:demo, create-admin
assets/fonts/          fonts for the social preview images (SIL Open Font License); site fonts are in src/app/fonts
docs/                  admin guide, requirements checklist, image credits
```

**Section order:** the sections of a page that admins may move are listed, in their default order, in `src/lib/schema/section-order.ts` (by their Site settings section keys). Each such page gets a *Section order* tab in Site settings (an `order` field, `<page>Order`, so volunteers can move only their own pages' sections), and the page renders those sections through `<InOrder s={s} page="…" sections={{ key: <Section …/>, … }}>` (`components/layout/InOrder.tsx`), with its hero outside it, first. A saved order is made whole as it's read: unknown keys are dropped and sections added since are put back after the one they follow by default. To make a new section movable, add its key to the page's list and to the page's `sections`.

**Hidden sections:** the sections that can be hidden are listed per page in `HIDEABLE_SECTIONS` (same file): every movable one, plus the lead trainer's spotlight and the list on *Trainers*, the list on *Hands-on labs* and the form, fees and deadlines of *Registration*; the hero always shows. Each page keeps the keys of its hidden ones in a `multiselect` field, `<page>Hidden` (`SettingsPage.hidden` in `src/lib/schema/resources.ts`, scoped to the page like its other fields), switched by the *Show this section on the page* toggle at the top of each section's tab in Site settings. `InOrder` leaves hidden sections out; pages without a Section order check `isShown(s, page, key)`, as do links that only lead to a section (the home sections in `sectionNav`). A tab that is part of another section (`within`) is hidden with it.

**Programmes:** AI for Professionals and AI for Workspace are the content's *themes* in the code (`THEME_KEYS` in `src/lib/content/constants.ts`: `professionals`, `workspace` and `general` for both), with their labels, colours and Aura looks in `THEME_META`. Sessions, labs, demos, trainers and past participants each have a `theme` field; the home page's programme cards are `themes` in the settings. Links may name a programme (`/programme?theme=workspace`, `/register?programme=professionals`, which ticks it on the form).

**Trainers and past participants:** the trainers of the department's list are `DEFAULT_TRAINERS` (`src/lib/content/defaults.ts`), stored on a site's first start and shown from the code while there is no database; the one marked `lead` is the Trainers page's spotlight (`components/trainers/TrainerSpotlight.tsx`). Past participants are the `participants` collection, grouped by their `batch` text and ordered by `completed` (`src/lib/participants.ts`); those with a quote and `featured` appear in *What participants say* and on the home page.

**Adding a field to a content type** (for example a "pronouns" field for trainers): add it to the collection's `fields` in `src/lib/schema/resources.ts` and to its type in `src/lib/content/types.ts`, then render it. The admin form, validation and database schema follow automatically.

**Forms:** each public form's built-in fields (their default wording, the types they may take, whether they are always required) are listed in `src/lib/forms.ts`, with the code that checks answers, shared by the browser and the server (`lib/server/validation.ts`). The fields as edited are saved in the site settings (`registerFields`, `contactFields`, `partnerFields`) and made whole as they're read (`formFields()`: unknown keys dropped, missing built-in fields put back, locked types and requirements restored). Answers to built-in fields are stored in their own columns; answers to added questions (keys `q-…`) under `answers`. Answers to a question that was later deleted stay in the record and show as *Earlier question* in the admin and the CSV.

**Caching:** public pages are rendered once and cached (`'use cache'` with tags). Saving in the admin expires the matching tags, so the next visitor gets fresh content (behind the nginx configuration above, within about 2 seconds, its micro-cache; organisers signed in see it at once). Time-based refresh (5 minutes) is only a safety net for direct database edits.

**Aura's look:** Site settings → Site-wide → Aura stores `auraBuild` (`strong` or `classic`), `auraColor` (`steel`, `navy`, `graphite`, `white`) and `auraEyes` (`auto` for each section's own, or one colour); the options and colours are in `components/aura/builds.ts`. The root layout (`src/app/layout.tsx`) puts the build on `<html data-aura-build>` and the colours in CSS custom properties (`--aura-body-1` … `--aura-trim-2`, `--aura-shine`, and `--aura-eye` for one eye colour). Every Aura drawing (`AuraArt`, `AuraHead`, `MiniAura`, the loading screen's ship and crew) is drawn in both builds, parts marked `aura-b-strong` / `aura-b-classic`, and `globals.css` shows the chosen one, so server-rendered pages, the admin's live preview and cached pages all follow the setting without JavaScript. Both builds share the anchor points (eyes, chest, shoulders, grip), so every prop, hat and effect fits either. Where there is no stylesheet (the social preview image), `AuraArt` takes `build` and `colors` and draws just one; `<Aura build="…">` does the same for one Aura (the Meet Aura playground, which also offers the colours).

**DIU badge:** every full-size Aura, except on the home page, wears the DIU shield on a white pin on his upper chest (`Badge` in `components/aura/AuraArt.tsx`, drawn from `public/logos/diu-shield.png`; the social preview images inline it, as they render from a data URI). Pass `badge={false}` to leave it off, or wrap part of a page in `<AuraBadge wear={false}>` (`components/aura/Aura.tsx`) to leave it off every Aura inside. The home page has none: `AuraBadgeByPage` (`components/layout/AuraBadgeByPage.tsx`) takes it off at `/`, where the campus and its sign already stand behind him.

**Hero photo:** the built-in campus photos (`public/hero/`, `CAMPUS` in `components/home/Hero.tsx`) are placed by their "Daffodil International University" sign (`sx`, `sy`), centred over Aura's column, faded in from the left (`fade`) to keep clear of the title; the day photo shows in the light theme and the night one in the dark theme. An uploaded photo replaces both and sits at the top right instead.

**Placard:** `<Aura placard="…">` has Aura hold a large sign with those words in front of him in both hands (the `holdWide` pose); `AuraArt` breaks the text into up to three lines at the largest size that fits the board, from the display font's measured letter widths. When the words change the board flips down to show the new ones (`placardFlip`). The home hero's Aura holds up two in turn, one per programme with the registration status (`components/home/HeroPlacards.tsx`), from Site settings → Home → Hero announcements: a bar filling under the switch times each one (CSS, so it pauses with the page's animations, while the pointer or focus is on him or a registration card, and never runs with reduced motion); the hero section is marked `data-placard` so the matching ticket in `RegisterChooser.tsx` lights up, and pointing at a card (`data-placard-key`) brings its placard up.

**Motion:** Aura flies into place (Auras smaller than 56 px just appear). Page heroes use `entrance="load"` (pure CSS, on page load); other Auras fly in from the nearest edge when scrolled into view (`components/aura/entrance.ts`). A flight takes 2 s (1.6 s on phones; `zip` 1.1 s, `drift` 2.2 s), set by `--fly-dur` in `components/aura/aura.css`. Pass `entrance="zip" | "drift" | "none"` to change that. Micro-interactions live in `src/app/micro.css` with one delegated script (`components/effects/MicroInteractions.tsx`). Opt an element in with `data-ripple` (ink ripple on press), `data-glow` (cursor-following light on cards), `data-burst` (star spin and ring when pressed), or the `mi-link`, `mi-underline` and `mi-stagger` classes. Segmented controls use `useSlidingPill` (`components/ui/SlidingPill.tsx`). With *reduced motion* turned on, Auras simply appear in place; with JavaScript off, nothing is left hidden. **Loading screen and caching** (`components/loading/`): an inline script in the root layout's `<head>` (`flag.ts`) names the build from the home page's content-hashed script and stylesheet URLs and, if this browser hasn't cached that build's files yet, marks `<html data-launch="run">` before anything is drawn, so the screen covers the page from the first paint and the hero Aura's fly-in waits for it (`"quiet"` instead, with no screen, for `#section` links and reduced motion). The screen draws from the first bytes of HTML: CSS is inlined into the page (`experimental.inlineCss`), so there are no stylesheet requests to wait for, and the fonts aren't preloaded (Chrome holds the first paint for preloaded fonts). The head script moves the ring while the page's own scripts and images load; then `warm.ts` waits for the fonts, prefetches the main pages through the router (their data and scripts), and saves the images they show (listed by the home page from the content) and the build files loaded so far in the `diuai-assets-v1` Cache Storage cache, from a worker, reporting real progress to the ring. When all is cached (or after 10 s, with caching going on behind), Aura lifts off, and the build is remembered in localStorage, so the screen is skipped until the next update. `public/sw.js`, registered on every public page in production, serves build files and uploads from that cache (cache first; other images are refreshed in the background) and leaves pages, the admin and the API alone. Every moving part of the screen is its own element animated only with `transform` and `opacity`, which the browser's compositor runs off the main thread, so it stays smooth while the page loads; behind it the page is hidden and its animations paused (the hero's network canvas rests too). If the screen's script never runs, it hides itself after 16 s. To see it again, open the site in a private window or clear its site data.

**Hero network:** the animated network of ideas fills the hero but keeps clear of text: mark an element `data-graph-avoid="text"` to clear just its lines of text, or `data-graph-avoid=""` to clear its whole box (`components/effects/NetworkCanvas.tsx`).

**Buttons and links to other pages:** nothing is pill-shaped. Buttons are keycaps (`.key` in `src/app/micro.css`, used by `Button`/`ButtonLink` in `components/ui/Button.tsx`): rounded rectangles on a solid edge that rise on hover and press down while held; filter toggles that are on stay pressed in. A link from a section to another page is a `Portal` (`components/ui/Portal.tsx`) instead: a card with a small preview of the destination (`components/portals/PortalArt.tsx`: trainers' or participants' faces, the loop of working with AI, a crop of the route map, a batch's timetable, FAQ bubbles) and a signal trace that pulses the arrow on hover. **Section header labels** (`Eyebrow` in `components/ui/Section.tsx`, used by `SectionHeading` and `PageHero`) are one style everywhere, with no box: larger letter-spaced text in the section's colour, led by a mini Aura in the section's colour that floats, blinks, glances at the label and now and then waves (`components/aura/MiniAura.tsx`); centred headings get one on each side, facing the label (`.eyebrow` in `src/app/tags.css`). **Text tags:** badges and small labels are never pill-shaped. Each section picks a tag style (`bracket`, `underline`, `ribbon`, `slash`, `tab`, `stamp`, `corner` or `label`) with `<Section tags="…">`, `data-tags="…"` or, for a whole page, `<TagScope style="…">`; every `.tag` inside follows (`src/app/tags.css`, `components/ui/Tag.tsx`).

**Changing a default:** a site stores the default settings of its day when it is set up, so a new default reaches existing sites only if the old one is listed in `RETIRED` (`src/lib/content/defaults.ts`; it holds the wording from before the training was presented as continuous): a stored value that is still an earlier default, never edited, is read as the current one (`withCurrentDefaults`, for the site and the admin alike), and edited values are kept. Settings stored by the site's first version under names it no longer uses (e.g. `workshopStatus`, now `registrationStatus`), and the `{event}` placeholder (now `{programme}`), are read under their current names (`withCurrentNames`, same file) before anything else, and saved under them from then on. Other names for a programme key (`workplace` for `workspace`) are read as the key (`currentThemeKey` in `src/lib/content/constants.ts`). The database itself is not changed.

**No em dashes:** the site's own text avoids them, and stored content is shown with any em dash replaced (`stripEmDashes` in `src/lib/content/normalize.ts`), without changing the database.

---

## Accessibility, performance and security

- Semantic HTML, a skip link, visible focus styles, labelled form fields with inline errors, keyboard-friendly dialogs and tabs, and colour contrast checked in both themes. Animations respect *reduced motion* and are lighter on small screens.
- Pages are pre-rendered and cached, fonts are self-hosted, images are compressed WebP, heavy widgets (map, videos) load only when clicked or scrolled into view, and there are no large client libraries.
- Admin sessions are signed JWTs (HS256, `AUTH_SECRET`) in HTTP-only, SameSite cookies, each tied to a session stored in the database: signing out, a password change or a disabled account ends them at once. Passwords are stored only as bcrypt hashes (cost 12). Sign-in is rate-limited by failed attempts (without letting anyone lock an account), takes the same time whether or not an account exists, and state-changing requests must come from the site's own pages. Every field of every form is type- and length-checked on the server and cleaned of control characters; links must be http(s), mailto, tel or a path on the site. Pages send a Content-Security-Policy, HSTS and the usual hardening headers; uploaded SVGs are checked for scripts, downloaded rather than shown when opened directly, and sandboxed; CSV exports are protected against formula injection. 

## Handover checklist

- [ ] Source code: this repository.
- [ ] Hosting: server or Docker host, domain or sub-path, HTTPS certificate.
- [ ] Secrets in the server environment, not in git: `MONGODB_URI`, `AUTH_SECRET`, SMTP credentials.
- [ ] Admin accounts for each organiser (Admin → Users) and volunteer (Admin → Volunteers); first administrator from `ADMIN_EMAIL` / `ADMIN_PASSWORD` or `npm run create-admin`.
- [ ] Update guide for organisers: [`docs/ADMIN_GUIDE.md`](docs/ADMIN_GUIDE.md) (also at `/admin/guide`).
- [ ] Sample content removed (`npm run seed:demo -- --remove`); the next batch's dates, fees, trainers' details, schedule and contact details filled in (see [`docs/REQUIREMENTS_CHECKLIST.md`](docs/REQUIREMENTS_CHECKLIST.md)).
- [ ] Database backups scheduled.

## Credits and licences

Aura is an original character drawn in SVG for this site. Fonts: Inter and Outfit, bundled in `src/app/fonts` so builds need no internet access (SIL Open Font License; see `src/app/fonts/LICENSE.md`). Icons: Lucide (ISC). The DIU logo, the DIU shield and the Department of CSE seal are in `public/logos`, from the department's own documents; Admin → Site settings → Logos & images can replace them. The campus photos are from Wikimedia Commons: the academic building by Nurunnaby Chowdhury (Hasive), CC BY-SA 4.0 (credited in the site's footer), and the Knowledge Tower at night by 0ximjub43r, CC0; see [`docs/IMAGE_CREDITS.md`](docs/IMAGE_CREDITS.md).
