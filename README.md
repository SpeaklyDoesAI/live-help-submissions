# Live Help Submissions — Creative Owners Club

Static site (no build step) for questions submitted ahead of the Tuesday/Thursday live help calls, backed by Supabase and hosted on Render.

- `index.html` — public question form. Its fields are generated from the `FIELDS` list in `fields.js`; submits via the `submit_live_help` RPC.
- `admin.html` — admin login (Supabase email/password) and lead management: New / Call List / Not Good / Removed tabs, status actions, Called checkbox and notes, read from `live_help_submissions`. Columns are set in its `COLUMNS` list; the detail view shows every field in `fields.js`. Access is enforced by RLS.
- `fields.js` — the single list of form fields; add a line here to add a field.
- `config.js` — Supabase URL, publishable key and Google Maps key.
- `render.yaml` — Render blueprint (free static site, publishes repo root).

Run locally by serving the folder, e.g. `npx serve .`
