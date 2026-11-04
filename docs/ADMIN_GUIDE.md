# Updating the website — guide for organisers

This guide is for the organising team of the **DIU AI Training Seminars** (Department of Computer Science and Engineering, Daffodil International University). It explains how to keep the website up to date. No coding is needed. A short version of this guide is inside the admin panel under **Help guide**.

- **Admin panel:** `https://<your-site>/admin`. There is also an *Organiser login* link in the website footer.
- **Who can sign in:** anyone an administrator adds under **Users** or **Volunteers**.
- **Need help?** Contact the person who hosts the website, listed at the end of this guide.

---

## 1. The basics

- **Changes go live immediately.** When you press **Save**, the website updates within a few seconds. There is no separate "publish" step.
- **Hide instead of delete.** Every item has a **Published** switch (the eye icon in lists). Turn it off to hide an item without losing it.
- **Order.** Use the ↑ ↓ arrows in a list to change the order in which items appear on the website.
- **Formatting.** Text boxes with a *Preview* button support simple formatting:
  - `**bold**` → **bold**
  - `*italic*` → *italic*
  - `[link text](https://example.com)` → a link
  - lines starting with `- ` → a bullet list
- **Images.** Click **Upload** next to any image field, choose **Library** to reuse an uploaded file, or paste a link. Photos are resized and compressed automatically. Square photos of at least 400 × 400 px look best for people.
- **Unsaved changes.** In **Site settings**, a bar at the bottom shows when you have unsaved changes. Press **Save changes**.
- **Every text and colour of the site** is in **Site settings**, page by page, with a live preview beside it (see section 3).
- **"To be announced".** Wherever something isn't ready (trainers, schedule, room, past participants), the website automatically shows a friendly placeholder.
- **Refresh website** (on the dashboard). Only needed if the site shows old content after the website host deploys an update or changes the database directly. Normal saves don't need it.

## 2. Signing in and your account

1. Go to `/admin` and sign in with your e-mail and password.
2. Change your password under **My account**. Use 10 to 72 characters. Changing it signs you out on your other browsers and devices.
3. Forgotten your password? Ask an administrator to reset it under **Users**. A reset signs the account out everywhere.
4. Each sign-in lasts 7 days, and you can be signed in on several devices at once. **My account → Where you're signed in** lists them; **Sign out on the other devices** ends all but this one. **Sign out** ends the session on the server, so a copied cookie stops working too.
5. After several wrong passwords, sign-in from that network pauses for 15 minutes. You can still sign in from elsewhere.

**Roles:** *Editors* can change all content. *Administrators* can also add or remove users and volunteers, see the task tracker and delete registrations. *Volunteers* see only the parts of the panel an administrator gave them; their dashboard shows their responsibility, what they can work on and their recent changes.

## 3. Site settings: every page, with a live preview

**Site settings** has a tab for each page of the site (*Home*, *About*, *Schedule*, *Trainers*, *Hands-on labs*, *Registration*, *Partners*, *Venue*, *Organisers*, *Photo gallery*, *Slides & recordings*, *Past participants*, *Meet Aura*) and a **Site-wide** tab for what every page shares. Each tab lists the page's sections in the order they appear.

- **Section order:** on *Home*, *About*, *Schedule*, *Past participants*, *Partners*, *Venue*, *Organisers* and *Meet Aura*, the last tab, **Section order**, lists the page's sections so you can put them in order of priority: drag a section into place, or move it one step at a time with its arrows. The preview jumps to the section you moved. The hero (the page's landing section) always stays at the top. **Back to the default order** undoes it all. A section that isn't showing right now (the participants' quotes before any are featured, say) keeps its place for when it appears. Backgrounds are set per section, so after a move check that tinted and plain sections still take turns.
- **Hiding a section:** every section of a page except its hero has a **Show this section on the page** switch at the top of its tab (on *Trainers* the lead trainer's spotlight and the list, on *Hands-on labs* the list, on *Registration* the form, the fees and the deadlines, and every section that has a place in *Section order*). Switch it off and the whole section leaves the page; its texts and settings are kept for when you switch it back on. Links that only lead to a hidden section go with it.
- **A section's texts and colours:** its colour, its background (*Plain*, *Tinted band* or *Soft glow*), the small label above the title, the title, the introduction, and its button labels, card texts and the messages shown while something is still empty ("Trainers will be announced soon").
- **Live preview:** the real page is shown beside the form and follows what you type, with the section you're editing outlined. Switch between **Desktop** and **Phone**. Only you see unsaved changes; visitors see the saved site until you press **Save changes** (or **Discard** to go back).
- **Layout check:** each text has a counter with its recommended length, and the preview measures the real page and warns when a change breaks the layout (a title running onto many lines, text spilling out of its box, the page scrolling sideways). Warnings never stop you saving.
- **Placeholders:** in many texts you can write `{event}`, `{dates}` or `{venue}`, and they are filled in from *Programme details*, so the texts stay right when the batch dates change. The hint under a field lists the ones it accepts.
- **Colours:** *Site-wide → Colours* sets the brand colour and the seven accent colours sections choose from.
- **Navigation, header, footer and banner** names are under *Site-wide*.
- The items themselves (trainers, sessions, past participants, FAQs…) are added under their own menu entries; the sections that show them say where.

If two people edit Site settings at the same time, their previews show each other's unsaved changes. Whoever saves last decides what is saved.

## 4. Programme details, batch dates and registration

**Site settings → Site-wide → Programme details**
- Name, short name, tagline, short description (used by search engines and social media), organised by. The name appears in the logo, the home page title, page titles, e-mails, calendar invites and the schedule PDF. A year at the end of the name (e.g. *DIU AI Training Seminars 2027*) shows under the logo; without one, the next batch's year does.
- **Next batch starts / ends** (Bangladesh Standard Time). The schedule's days, the home page's *Next batch* and the calendar invites follow them. **The built-in dates (11–12 December 2026) are a placeholder: set the real ones before launch.**
- Venue, room/building (leave blank to show "to be announced") and full address.

**Site settings → Site-wide → Registration**
- **Registration** (*Opening soon*, *Open*, *Closed*), its **deadline** (the form closes by itself when it passes) and **Places confirmed by** (the date registrants will hear whether they have a place; while it is blank the site says "by e-mail").
- An **external form** link (e.g. Google Forms) to use instead of the built-in form, and extra text for the confirmation e-mail.

**The two programmes.** There is one registration for both programmes. The form asks *Which programme would you like to join?* (AI for Professionals, AI for Workspace, or both) and *How much have you used AI tools so far?*. The home page's two programme cards, under the hero, open the form with that programme already ticked (`/register?programme=professionals` or `?programme=workspace`). Aura holds up a placard for each programme in turn, with the registration status (**Home → Hero announcements**).

**Fees:** **Site settings → Registration → Fees**. The built-in fee is "To be announced".

**The forms' fields.** **Registration → Form fields**, **Home → Contact form** and **Partners → Partner form**. Click a field to change its name, guide, example and type of answer, its choices, whether it is required, or to hide it (the *Country* and *Dietary preference* fields come hidden). Add questions of your own with **Add a question**. Fields with a lock came with the site and can't be deleted.

## 5. Announcements

**Announcements → New announcement**
- Title, short text, date, style (*Information*, *Important*, *Good news*).
- Optional link and link label (e.g. to the registration page or a PDF).
- **Pin** important news to keep it at the top.

The newest announcements appear in the box on the home page.

## 6. Programmes, trainers and the schedule

**The programmes:** **Site settings → Home → Programmes** holds the title, description and photo of **AI for Professionals** and **AI for Workspace**, shown as two cards on the home page. Sessions, hands-on labs, demos, trainers and past participants each pick a programme, or *General* for both, and the Schedule and Hands-on labs pages can be filtered by programme.

**Trainers → New trainer**
- Name, designation, affiliation, **label** (*DIU faculty*, *Industry expert* or *Guest trainer*), **programme** (or *General* for both), photo.
- **Profile**, **areas of expertise** (comma-separated, shown as tags) and **what they teach**. These appear in the pop-up when a visitor clicks the trainer's card.
- Profile links (their DIU profile page, LinkedIn, X, Google Scholar, GitHub).
- **Lead trainer** puts them in the spotlight at the top of the Trainers page: a large profile with their programmes, expertise and the faces of the team they lead (the first lead trainer, if you tick several). **Feature on the home page** adds them to the home page carousel.
- The nine trainers of the Department of CSE's list are built in, Professor Dr. Sheak Rashed Haider Noori first as the lead trainer. Their designations are generic ("Faculty member, Department of Computer Science and Engineering") until you edit them; add photos, profiles and expertise as you have them.

**The tentative schedule** is built in, for a two-day batch: Day 1 for **AI for Professionals** (welcome, a lecture, two hands-on labs and a discussion on using AI responsibly) and Day 2 for **AI for Workspace** (writing, spreadsheets, slides and meeting notes, a live demo and a *bring your own task* lab), with breaks, and every trainer and room "to be announced". It is added once to a site with no sessions and shown as a draft. Open a session under **Schedule** to change its title, trainers, room and description, delete the ones you don't need and add your own.

**Schedule → New session**
- Day, start and end time, title, **type** (*Opening*, *Lecture*, *Discussion*, *Hands-on lab*, *Demo*, *Break* or *Session*), programme, room/lab.
- **Trainers:** pick from your trainers. If one isn't confirmed yet, use *Trainer text* (e.g. "Trainer to be announced").
- **Discussions:** choose a *Moderator* and *Panelists*; once they are named the discussion is also listed on the Trainers page.

**Site settings → Schedule → Schedule → Schedule status**
- *To be announced:* the website shows "Schedule to be announced".
- *Draft:* sessions are shown with a "subject to change" note (the default).
- *Final:* sessions are shown without the note.

The **PDF schedule** is generated automatically. To use your own PDF instead, upload it under *Schedule PDF*.

## 7. Past participants

**Past participants → New participant**, once their batch is completed:
- Name, designation, organisation, the **programme** they completed (*General* for both) and the **batch**, written the same way for everyone in it (e.g. "Batch 1 · January 2026"), with **Completed on**, the date that puts the batches in order, newest first.
- A **photo**, a **quote** about the training and a **profile link** are optional: add them only with the participant's permission.
- **Feature their quote** shows the quote under *What participants say* on the Past participants page and on the home page (the first three).

The **Past participants** page (`/past-participants`, in the navigation bar) shows the numbers (participants, batches, organisations, programmes), the featured quotes, and everyone batch by batch, with filters by programme and batch and a search. Until the first participant is added it shows a "first batch is on its way" card with the Register button, and the home page section says the same.

## 8. Hands-on labs, demos and partners

- **Hands-on labs:** title, trainers (name, affiliation, link), level, duration, schedule text, prerequisites (one per line, e.g. "Laptop with a spreadsheet app"), materials and links, capacity.
- **Demos:** title, team, short description, an image and/or a YouTube/Vimeo link.
- **Partners:** name, tier, logo, website, short text. Their logos loop near the bottom of the home page (placeholder tiles until the first partner is added) and are grouped by tier on the **Partners** page. Edit the partnership tiers, introduction and brochure in **Site settings → Partners**; organisations can enquire with the **Become a partner** button there, and their enquiries arrive under **Enquiries**.

## 9. Organisers and volunteers

**Signing in on the website.** Visitors sign in to star sessions and keep their agenda (*My agenda* on the Schedule page). There is no sign-up: registered participants use their e-mail and **registration ID** (in their confirmation e-mail); volunteers, editors and administrators their **admin panel password**; anyone else under **Organisers & volunteers** the **Sign-in e-mail** and **Sign-in code** (at least 8 characters) set on their entry, which are never shown on the website.

**Organisers & volunteers → New person.** Choose the **group**: *Faculty coordinator*, *Student organiser* or *Volunteer*. Each group shows on the Organisers page once it has someone in it; volunteers show a "Coming soon" card until the first one is added. Fill in name, role, department, affiliation, profile link and photo.

## 10. Venue and travel

**Site settings → Venue.** The home page shows a route map of north-west Dhaka: visitors pick how they're arriving (from Shahjalal Airport, the Airport railway station, the metro rail at Mirpur 10, or by road from Gabtoli) and see the route to Daffodil Smart City. It is a schematic, not a street map. Everything else is on the **Venue & travel** page (`/venue`).
- **Map location:** the text the embedded Google Map searches for. For an exact pin, paste the `src` of Google Maps → *Share* → *Embed a map*.
- **Directions:** by air, train, metro rail and road. Each becomes a button on the home page route map and a card on the Venue & travel page. **Check the built-in directions against how participants actually reach campus, and name the DIU transport routes that run on training days.**
- **Campus entry information**, e.g. ID requirements and which gate to use.
- **Nearby accommodation** and **Local tips.**

## 11. Contact, social links, branding and SEO

All under **Site settings → Site-wide**.

- **Contact & social:** official e-mail, phone (optional), website, LinkedIn, X, Instagram, YouTube, and the address that is e-mailed about new enquiries (registrations are listed under **Registrations**).
- **Logos & images:** the **DIU logo** (left corner of the navigation bar) and the **Department of CSE seal** (right corner) are built in, and Aura wears the DIU shield as a badge on every page but the home page; upload a file only to replace one. Also: an event logo and a custom social-media preview image (1200 × 630 px).
- **Home → Hero:** the campus photo behind Aura (DIU's academic building by day in the light theme, the Knowledge Tower by night in the dark theme, both from Wikimedia Commons and credited in the footer; see `docs/IMAGE_CREDITS.md`). Upload your own to replace it, or switch it off.
- **Colours**, **SEO & analytics** (Google Analytics ID and keywords) and the site-wide **Banner**.
- **Features & past batches:** switch on the photo gallery and the slides & recordings when they are ready.

## 12. FAQs

**FAQs → New question:** question, answer (formatting allowed) and category (*General*, *Registration*, *Programmes & schedule*, *Venue & travel*, *Partnerships*). Visitors can search and filter them.

## 13. Registrations and enquiries

**Registrations**
- Search by name, e-mail, organisation or ID, and filter by status. The list shows each person's programme.
- Change the status (*registered*, *confirmed*, *waitlisted*, *cancelled*) and add private notes. Open a registration to see all its answers.
- **Download CSV** opens in Excel (times are in BST), with a column for every question of the form.
- Each person receives a registration ID and an e-mail saying their registration was received and that the organising team will let them know whether they have a place, with a calendar invite, if e-mail is set up on the server. Set registrations to *confirmed* (or *waitlisted*) as you decide.

**Enquiries:** contact-form messages and partnership enquiries. Use **Reply** to answer by e-mail, update the status, or download a CSV.

> If the dashboard says *E-mail is not configured*, forms still work and everything is saved. Ask the website host to add the SMTP settings so confirmation e-mails are sent.

## 14. After a batch

1. **Past participants:** add everyone who completed the batch (section 7).
2. **Photo gallery:** upload photos with captions.
3. **Slides & recordings:** add each session with the slides (PDF upload) and/or a YouTube link.
4. In **Site settings → Site-wide → Features & past batches**, switch on the gallery and the slides & recordings. They appear in the menu automatically.
5. Set the next batch's dates in **Programme details** and update the schedule.

## 15. Users (administrators only)

**Users → Add user:** name, e-mail, role (*Editor* or *Administrator*) and a starting password. Share the password safely and ask them to change it under *My account*. You can reset passwords, change roles, or **Disable** someone who no longer needs access (they can be enabled again later).

## 16. Volunteers and the task tracker (administrators only)

**Volunteers → Add volunteer:** name, e-mail, password (type one or press **Generate**), their **responsibility** (for example *"Trainer coordination: keep trainer profiles and the schedule up to date"*) and their **permissions**:
- Tick the areas they may open and change, grouped as in the menu: each content type (trainers, schedule, past participants…), Registrations, Enquiries and the Media library. Everything else is hidden from them and refused by the server.
- **Site settings** is given page by page: one box per tab (Site-wide, Home, About, Schedule … Meet Aura). A volunteer given *Home* and *Venue* sees only those two tabs, and the server reads and saves only those pages' fields for them: they never see private settings such as the notification e-mail unless they have *Site-wide*, and whatever else a request contains is ignored. Their previews show only their changes too. *Site-wide* covers the programme details, batch dates, registration, colours, logos, contact and notification e-mails, navigation, footer, banner, features and SEO, so give it sparingly. - **Delete items** is separate. Without it they can add, edit, hide and reorder, but not delete. Only administrators can delete registrations and enquiries.
- Anyone who edits something with a photo or file can upload images, even without the Media library.

Share the e-mail and password with them safely. **Edit** changes their details, permissions or password; changes apply straight away, even if they are signed in. A new password, **Disable** or **Remove** signs them out at once on every device. **Disable** pauses their access; **Remove** deletes the account. Their entries stay in the task tracker either way (Site settings entries name the pages changed, e.g. *Site settings › Home*).

**Task tracker** lists everything volunteers do, newest first: who did it, when, where, and for edits each changed field's value **before** and **after** (for additions and deletions, what was entered or deleted). Volunteers' downloads of registration or enquiry spreadsheets and their password changes are listed too. Filter by volunteer or area, press **Mark reviewed** once you've checked an entry (click again to undo), or **Mark all as reviewed**. The dashboard shows how many changes are waiting for review. Administrators' and editors' own changes are not tracked.

To list volunteers on the **website**, use *Organisers & volunteers*; that is separate from their sign-in.

---

### Good practice

- Keep at least two administrators.
- Before launch, check the dashboard for the **sample content** warning. Remove any sample items.
- Use real photos with permission, and write alt text (image descriptions) where asked.
- Pin only one or two announcements at a time.

### Contacts

| Topic | Who |
| --- | --- |
| Website content | Organising team (add names here) |
| Hosting, domain, e-mail (SMTP), backups | Website host / DIU IT services (add contact here) |
