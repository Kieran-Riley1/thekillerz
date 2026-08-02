# The Killerz

Static site for thekillerz.co.uk. Serve the folder rather than opening `index.html` directly —
the tour dates are fetched from `gigs.json`, which browsers block on `file://`:

```bash
python -m http.server 8000
```

The contact form posts to FormSubmit and delivers enquiries to `info@thekillerz.co.uk`.
After deploying it for the first time, send one test enquiry and follow the activation link
FormSubmit emails to that inbox. Delivery will not begin until that one-time confirmation is complete.

## Adding a gig

Edit [gigs.json](gigs.json). Dates are `DD-MM-YYYY`, and anything in the past drops off the
site automatically. Leave `ticket_link` empty to show "Coming Soon" instead of a Tickets button.

```json
{ "date": "14-03-2027", "venue": "The Roadhouse", "city": "Birmingham", "location": "England", "ticket_link": "" }
```

## Rebuilding the CSS

Tailwind is precompiled into `tailwind.css`. **If you add or change a Tailwind class in
`index.html` or `main.js`, rebuild it** or the new class won't have any styles:

```bash
npx tailwindcss@3 -c tailwind.config.js -i tailwind-input.css -o tailwind.css --minify
```

`style.css` is hand-written and loads after Tailwind, so it wins on conflicts. It holds
everything the utilities can't express — the slideshow, gig cards, band cards, form fields
and the gallery viewer.

## Gallery images

The grid loads 800px thumbnails from `images/thumbs/`; clicking one opens the full-size
original from `images/`. After adding a photo to the gallery, generate its thumbnail:

```bash
sips -Z 800 -s format jpeg -s formatOptions 72 images/new-photo.jpg --out images/thumbs/new-photo.jpg
```
