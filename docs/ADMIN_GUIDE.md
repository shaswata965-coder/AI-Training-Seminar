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
- **Custom training, no dates.** Every training is designed for the organisation that asks for it, and the website says so: there are no batches, dates or "coming soon" posters. Wherever something isn't set yet (trainers, schedule, room, past participants), it shows what happens instead (e.g. the room is "confirmed by e-mail").
- **Refresh website** (on the dashboard). Only needed if the site shows old content after the website host deploys an update or changes the database directly. Normal saves don't need it.

## 2. Signing in and your account

1. Go to `/admin` and sign in with your e-mail and password.
2. Change your password under **My account**. Use 10 to 72 characters. Changing it signs you out on your other browsers and devices.
3. Forgotten your password? Ask an administrator to reset it under **Users**. A reset signs the account out everywhere.
4. Each sign-in lasts 7 days, and you can be signed in on several devices at once. **My account → Where you're signed in** lists them; **Sign out on the other devices** ends all but this one. **Sign out** ends the session on the server, so a copied cookie stops working too.
5. After several wrong passwords, sign-in from that network pauses for 15 minutes. You can still sign in from elsewhere.

**Roles:** *Editors* can change all content. *Administrators* can also add or remove users and volunteers, see the task tracker and delete registrations. *Volunteers* see only the parts of the panel an administrator gave them; their dashboard shows their responsibility, what they can work on and their recent changes.

## 3. Site settings: every page, with a live preview

**Site settings** has a tab for each page of the site (*Home*, *About*, *Schedule*, *Trainers*, *Hands-on labs*, *Contact us*, *Partners*, *Venue*, *Organisers*, *Photo gallery*, *Slides & recordings*, *Past participants*, *Meet Aura*) and a **Site-wide** tab for what every page shares. Each tab lists the page's sections in the order they appear.

- **Section order:** on *Home*, *About*, *Schedule*, *Past participants*, *Partners*, *Venue*, *Organisers* and *Meet Aura*, the last tab, **Section order**, lists the page's sections so you can put them in order of priority: drag a section into place, or move it one step at a time with its arrows. The preview jumps to the section you moved. The hero (the page's landing section) always stays at the top. **Back to the default order** undoes it all. A section that isn't showing right now (the participants' quotes before any are featured, say) keeps its place for when it appears. Backgrounds are set per section, so after a move check that tinted and plain sections still take turns.
- **Hiding a section:** every section of a page except its hero has a **Show this section on the page** switch at the top of its tab (on *Trainers* the lead trainer's spotlight and the list, on *Hands-on labs* the list, on *Contact us* the form, the pricing and the deadlines, and every section that has a place in *Section order*). Switch it off and the whole section leaves the page; its texts and settings are kept for when you switch it back on. Links that only lead to a hidden section go with it.
- **A section's texts and colours:** its colour, its background (*Plain*, *Tinted band* or *Soft glow*), the small label above the title, the title, the introduction, and its button labels, card texts and the messages shown while something is still empty ("Your name could be here").
- **Live preview:** the real page is shown beside the form and follows what you type, with the section you're editing outlined. Switch between **Desktop** and **Phone**. Only you see unsaved changes; visitors see the saved site until you press **Save changes** (or **Discard** to go back).
- **Layout check:** each text has a counter with its recommended length, and the preview measures the real page and warns when a change breaks the layout (a title running onto many lines, text spilling out of its box, the page scrolling sideways). Warnings never stop you saving.
- **Placeholders:** in many texts you can write `{programme}` or `{venue}`, and they are filled in from *Programme details*, so the texts stay right when those change. The hint under a field lists the ones it accepts.
- **Colours:** *Site-wide → Colours* sets the brand colour and the seven accent colours sections choose from.
- **Navigation, header, footer and banner** names are under *Site-wide*.
- The items themselves (trainers, sessions, past participants, FAQs…) are added under their own menu entries; the sections that show them say where.

If two people edit Site settings at the same time, their previews show each other's unsaved changes. Whoever saves last decides what is saved.

## 4. Programme details and Contact us

The training is **custom**: there is no fixed course and there are no batches. Every training is planned with the organisation that asks for it, so the website shows **no dates**, deadlines or calendar links.

**Site settings → Site-wide → Programme details**
- Name, short name, tagline, short description (used by search engines and social media), organised by. The name appears in the logo, the home page title, page titles, e-mails and the sample plan PDF. Leave the year out (a year written at the end of the name would show under the logo).
- Venue, room/building (leave blank to say the room is confirmed by e-mail) and full address.

**Site settings → Site-wide → Contact us**
- **Training requests**: *Open* (the usual state) or *Paused*.
- An **external form** link (e.g. Google Forms) to use instead of the built-in form, and extra text for the confirmation e-mail.

**Contact us.** Every *Contact us* button (navigation bar, home page, Past participants…) leads to the training request form at `/contact` (the old `/register` address still works). The form asks who is contacting you, the organisation, *What should the training focus on?* (AI for Professional Work, AI for Office Work, saving time on routine tasks), *Tell us about your needs* and how much the team uses AI tools today. The two cards under the hero open the form with that focus area already ticked (`/contact?programme=professionals` or `?programme=workspace`). Aura holds up a placard for each focus area in turn (**Home → Hero announcements**).

**Pricing:** **Site settings → Contact us → Pricing**. The built-in price is "On request", quoted for each team.

**The forms' fields.** **Contact us → Form fields**, **Home → Contact form** and **Partners → Partner form**. Click a field to change its name, guide, example and type of answer, its choices, whether it is required, or to hide it (the *Country* and *Dietary preference* fields come hidden). Add questions of your own with **Add a question**. Fields with a lock came with the site and can't be deleted.

## 5. Announcements

**Announcements → New announcement**
- Title, short text, date, style (*Information*, *Important*, *Good news*).
- Optional link and link label (e.g. to the Contact us page or a PDF).
- **Pin** important news to keep it at the top.

The newest announcements appear in the box on the home page.

## 6. Focus areas, trainers and the sample plan

**The focus areas:** **Site settings → Home → What we train** holds the title, description and photo of **AI for Professional Work** and **AI for Office Work**, shown as two cards on the home page. Sessions, hands-on labs, demos, trainers and past participants each pick a focus area, or *General*, and the Sample plan and Hands-on labs pages can be filtered by focus area.

**Trainers → New trainer**
- Name, designation, affiliation, **label** (*DIU faculty*, *Industry expert* or *Guest trainer*), **focus area** (or *General*), photo.
- **Profile**, **areas of expertise** (comma-separated, shown as tags) and **what they teach**. These appear in the pop-up when a visitor clicks the trainer's card.
- Profile links (their DIU profile page, LinkedIn, X, Google Scholar, GitHub).
- **Lead trainer** puts them in the spotlight at the top of the Trainers page: a large profile with their focus areas, expertise and the faces of the team they lead (the first lead trainer, if you tick several). **Feature on the home page** adds them to the home page carousel.
- The nine trainers of the Department of CSE's list are built in, Professor Dr. Sheak Rashed Haider Noori first as the lead trainer. Their designations are generic ("Faculty member, Department of Computer Science and Engineering") until you edit them; add photos, profiles and expertise as you have them.

**The sample plan** is built in: an example of a two-day training, Day 1 on **AI for Professional Work** (your team's goals, a lecture, two hands-on labs and a discussion on using AI responsibly) and Day 2 on **AI for Office Work** (writing, spreadsheets, slides and meeting notes, a live demo and a *bring your own task* lab), with breaks; each session's trainers read "DIU CSE trainers" and rooms are confirmed by e-mail. Days show as *Day 1*, *Day 2*… with no dates. It is added once to a site with no sessions and shown as a sample. Open a session under **Schedule** to change its title, trainers, room and description, delete the ones you don't need and add your own.

**Schedule → New session**
- Day, start and end time, title, **type** (*Opening*, *Lecture*, *Discussion*, *Hands-on lab*, *Demo*, *Break* or *Session*), focus area, room/lab.
- **Trainers:** pick from your trainers, or write a *Trainer text* (e.g. "DIU CSE trainers").
- **Discussions:** choose a *Moderator* and *Discussion leads*; once they are named the discussion is also listed on the Trainers page.

**Site settings → Schedule → Schedule → Sample plan status**
- *Hidden:* instead of sessions, the website says every training is planned with you.
- *Sample:* sessions are shown marked "Sample: adapted for you" (the default).
- *Shown without that mark:* sessions are shown without it.

The **PDF of the sample plan** is generated automatically, without dates. To use your own PDF instead, upload it under *Sample plan PDF*.

## 7. Past participants

**Past participants → New participant**, once their training is completed:
- Name, designation, organisation, the **focus area** (*General* for several) and the **training**, written the same way for everyone in it (e.g. "Office productivity training · Acme Bank"), with **Completed on**, the date that puts the trainings in order, newest first (it is not shown on the website).
- A **photo**, a **quote** about the training and a **profile link** are optional: add them only with the participant's permission.
- **Feature their quote** shows the quote under *What participants say* on the Past participants page and on the home page (the first three).

The **Past participants** page (`/past-participants`, in the navigation bar) shows the numbers (participants, trainings, organisations, focus areas), the featured quotes, and everyone training by training, with filters by focus area and training and a search. Until the first participant is added it shows a "Your team could be here" card with the Contact us button, and the home page section says the same.

## 8. Hands-on labs, demos and partners

- **Hands-on labs:** title, trainers (name, affiliation, link), level, duration, schedule text, prerequisites (one per line, e.g. "Laptop with a spreadsheet app"), materials and links, capacity.
- **Demos:** title, team, short description, an image and/or a YouTube/Vimeo link.
- **Partners:** name, tier, logo, website, short text. Their logos loop near the bottom of the home page (placeholder tiles until the first partner is added) and are grouped by tier on the **Partners** page. Edit the partnership tiers, introduction and brochure in **Site settings → Partners**; organisations can enquire with the **Become a partner** button there, and their enquiries arrive under **Enquiries**.

## 9. Organisers and volunteers

**Signing in on the website.** Visitors sign in to star sessions and keep their agenda (*My agenda* on the Sample plan page). There is no sign-up: people who sent a training request use their e-mail and **reference number** (in their confirmation e-mail); volunteers, editors and administrators their **admin panel password**; anyone else under **Organisers & volunteers** the **Sign-in e-mail** and **Sign-in code** (at least 8 characters) set on their entry, which are never shown on the website.

**Organisers & volunteers → New person.** Choose the **group**: *Faculty coordinator*, *Student organiser* or *Volunteer*. Each group shows on the Organisers page once it has someone in it; volunteers show an "Open call" card inviting people to volunteer until the first one is added. Fill in name, role, department, affiliation, profile link and photo.

## 10. Venue and travel

**Site settings → Venue.** The home page shows a route map of north-west Dhaka: visitors pick how they're arriving (from Shahjalal Airport, the Airport railway station, the metro rail at Mirpur 10, or by road from Gabtoli) and see the route to Daffodil Smart City. It is a schematic, not a street map. Everything else is on the **Venue & travel** page (`/venue`).
- **Map pin (latitude, longitude):** where the embedded Google Map, *Open map* and every *Directions* link point: DIU's main buildings at Daffodil Smart City (23.8770, 90.3200) by default. To move it, right-click the spot in Google Maps and click the numbers at the top to copy them. **Map location (search text)** is used only while the pin is blank. A **custom map embed** (Google Maps → *Share* → *Embed a map*) replaces the embedded map, unless it shows a place outside Bangladesh.
- **Directions:** by air, train, metro rail and road. Each becomes a button on the home page route map and a card on the Venue & travel page. **Check the built-in directions against how participants actually reach campus, and name the DIU transport routes that run on training days.**
- **Campus entry information**, e.g. ID requirements and which gate to use.
- **Nearby accommodation** and **Local tips.**

## 11. Contact, social links, branding and SEO

All under **Site settings → Site-wide**.

- **Contact & social:** official e-mail, phone (optional), website, LinkedIn, X, Instagram, YouTube, and the address that is e-mailed about new enquiries (training requests are listed under **Training requests**).
- **Logos & images:** the **DIU logo** (left corner of the navigation bar) and the **Department of CSE seal** (right corner) are built in, and Aura wears the DIU shield as a badge on every page but the home page; upload a file only to replace one. Also: a programme logo and a custom social-media preview image (1200 × 630 px).
- **Home → Hero:** the campus photo behind Aura (DIU's academic building by day in the light theme, the Knowledge Tower by night in the dark theme, both from Wikimedia Commons and credited in the footer; see `docs/IMAGE_CREDITS.md`). Upload your own to replace it, or switch it off.
- **Colours**, **SEO & analytics** (Google Analytics ID and keywords) and the site-wide **Banner**.
- **Aura:** the mascot's look on every page, in the logo, on the loading screen and in the social preview. **Look**: *Strong* (square jaw, broad shoulders, fists; the default) or *Classic* (the original rounded robot). **Colours**: steel, DIU blue, graphite or classic white. **Eye colour**: a colour for each section (amber for AI for Professionals, mint for AI for Workspace…) or one colour everywhere. Try the combinations first in the playground on the **Meet Aura** page.
- **Features & past trainings:** **Ask Aura**, the site search in the bottom-right corner of every page (on by default; visitors can also press Ctrl/⌘ + K), and the photo gallery and the slides & recordings, to switch on when they are ready.

## 12. FAQs

**FAQs → New question:** question, answer (formatting allowed) and category (*General*, *Getting started*, *Training & sessions*, *Venue & travel*, *Partnerships*). Visitors can search and filter them.

## 13. Training requests and enquiries

**Training requests** (sent with the Contact us form)
- Search by name, e-mail, organisation or reference number, and filter by status. The list shows each request's focus areas.
- Change the status (*registered*, *confirmed*, *waitlisted*, *cancelled*) and add private notes. Open a request to see all its answers.
- **Download CSV** opens in Excel (times are in BST), with a column for every question of the form.
- Each person receives a reference number and, if e-mail is set up on the server, an e-mail saying their request was received and that the organising team will reply by e-mail to plan the training. Update the status as you go.

**Enquiries:** contact-form messages and partnership enquiries. Use **Reply** to answer by e-mail, update the status, or download a CSV.

> If the dashboard says *E-mail is not configured*, forms still work and everything is saved. Ask the website host to add the SMTP settings so confirmation e-mails are sent.

## 14. After a training

1. **Past participants:** add everyone who completed the training (section 7).
2. **Photo gallery:** upload photos with captions.
3. **Slides & recordings:** add each session with the slides (PDF upload) and/or a YouTube link.
4. In **Site settings → Site-wide → Features & past trainings**, switch on the gallery and the slides & recordings. They appear in the menu automatically.

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
