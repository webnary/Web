# webnary.studio — Performance Decision Log

Running record of performance changes made to the site, why they were made,
what evidence backed the decision, and how to reverse them if needed.
Newest entries at the top.

---

## 2026-09-10 — Switch primary contact flow from form.webnary.studio to WhatsApp

**Problem:** every CTA on the page (nav, hero, both live plan cards, the
devis link, bottom-of-page card, footer, sticky mobile bar) linked to
`https://form.webnary.studio`. The decision was made to lead with a direct
WhatsApp message instead — the form isn't being retired, just no longer the
first click. If a visitor specifically asks for the form link during a
WhatsApp chat, it gets pasted manually; no code path needs to serve it.

**What changed:**
- All CTAs above switched from `https://form.webnary.studio` to
  `https://wa.me/33767708253?text=...` with a pre-filled message:
  - Nav CTA, hero CTA, bottom-of-page CTA, footer, sticky mobile bar (5
    locations) all send the same generic message: *"Bonjour ! Je souhaite
    remplir le formulaire pour réserver mon projet."*
  - Plan 1 (Présence en Ligne, 150€) and Plan 2 (Site Évolutif — WordPress,
    299€) "Choisir ce plan" buttons send a plan-specific version naming the
    plan and price. Plan 3 (Boutique Shopify) is untouched — it's still the
    disabled "Bientôt disponible" placeholder.
  - "Demander un devis" (Plan 4, sur-mesure) sends its own devis-specific
    message.
  - The pre-existing floating WhatsApp circle (`.wa-fixed`) and its casual
    "J'ai une question" message were left as-is — that's a separate, lower
    -commitment entry point and was never one of the CTA locations above.
- Hero button label ("Remplissez le formulaire") was kept unchanged on
  purpose: it now opens WhatsApp with a message that itself says "je
  souhaite remplir le formulaire," so the label and the message agree
  rather than contradict each other.
- FAQ text updated (both the visible `<details>` blocks and the matching
  `FAQPage` JSON-LD, which had to stay in sync) to describe the WhatsApp
  -first flow honestly:
  - "Comment se passe la prise de contact ?" now mentions sending a
    WhatsApp message first, with the form link offered as an alternative
    on request.
  - "Dois-je forcément passer par un rendez-vous ?" — "le formulaire
    suffit" became "un message sur WhatsApp suffit."
- Footer's CONTACT column had two near-duplicate lines once the switch
  landed ("Réserver un aperçu" → form, and a separate plain "WhatsApp" →
  wa.me). Merged into a single "Réserver sur WhatsApp" line using the
  generic reservation message; the redundant second line was removed.
- CSP: dropped `form-action 'self' https://form.webnary.studio` entirely.
  The page has no `<form>` element and, after this switch, no link points
  at `form.webnary.studio` anymore either — the directive had nothing
  left to permit.
- CSP script-src hash for the `FAQPage` JSON-LD block was recomputed
  (`sha256-qcGNQGYrTvtJoWBSnEiYDgo5ueTC3FQHxCRej+/ralM=`) since its text
  content changed. The `ProfessionalService` JSON-LD block was untouched,
  so its hash is unchanged.

**To revert:** swap the `wa.me` hrefs back to `https://form.webnary.studio`
on all 8 CTAs (the 5 generic ones + 2 plans + devis), restore the two
FAQ answers' old wording (both visible and JSON-LD), re-add
`form-action 'self' https://form.webnary.studio` to the CSP, restore the
old JSON-LD hash `sha256-X2iIFO6ZnKw01nNOHBdHMVH9VgtcKi7UUPK8LC4IFFM=` in
its place, and split the footer's merged line back into a "Réserver un
aperçu" (form) line plus a separate generic "WhatsApp" line if desired.

---

## 2026-09-10 — Hide the floating WhatsApp circle on mobile only

**Problem:** below the 860px nav breakpoint, the floating `.wa-fixed`
circle and the sticky bottom bar (`.sticky-cta`) were both visible at
once, doing the same job (surfacing a WhatsApp/contact CTA) and eating
screen space on small viewports.

**What changed:** added a small `<style>` block directly in `index.html`,
right after the `styles.css` link, hiding `.wa-fixed` under a
`max-width: 860px` media query. Desktop is untouched — `.sticky-cta` is
mobile-only there, so the floating circle is still the only persistent
CTA on larger screens.

**Why inline instead of in `styles.css`:** `styles.css` isn't part of this
working session, so it couldn't be edited directly. This is functionally
identical to putting the same rule in the stylesheet — safe to move it
there later if convenient.

**To revert:** delete the `<style>` block (clearly commented, sits right
after the `styles.css` `<link>` in `<head>`).

---

## 2026-09-10 — Right-size the "Nos aperçus" portfolio images (`srcset`/`sizes`)

**Problem:** PageSpeed Insights flagged ~182 KiB of "Améliorer l'affichage des
images" on mobile. It didn't move after the Clarity fix below, confirming it
was unrelated to tracking scripts. This was the biggest lever left for mobile
LCP (measured at 5.0s, still solidly in "poor," >4s).

**Root cause:** all 5 portfolio cards used a single `<picture>` with one
fixed-size image (`560×848` webp / up to `1110×1680` jpg), regardless of
viewport. The card only ever displays at:
- ~220×333 CSS px on mobile (below the 860px nav breakpoint)
- ~280×400 CSS px on desktop (the size baked into the `width`/`height`
  attributes, which exist to reserve layout space and prevent CLS — they are
  **not** the intended download resolution)

So every mobile visitor downloaded the desktop-sized image.

**What changed:**
- Generated two width variants per photo, each in webp + jpg fallback, sized
  at 2× the real CSS display size (retina-safe without going further, since
  going to 3× would have erased the savings):
  - `*-440w.{webp,jpg}` → 2× of the ~220px mobile card
  - `*-560w.{webp,jpg}` → 2× of the ~280px desktop card (this is close to
    the old single-size master, so desktop is basically unchanged)
- Added `srcset` + `sizes="(max-width: 860px) 220px, 280px"` to both the
  `<source type="image/webp">` and the `<img>` fallback for all 5 cards in
  `index.html`, so the browser — not us — picks the right file per viewport.
- Re-encoded at webp/jpg quality 78 (visually lossless at this display size).
- Original full-resolution masters moved to `images/_originals/` — kept on
  disk (not linked from any page) in case a future redesign needs to re-crop
  at a larger size. Safe to delete if disk space matters more than that
  option.

**Result (measured on the 5 webp files actually downloaded):**
mobile now downloads ~128 KB total across the 5 cards instead of ~189 KB —
and only ever the size it actually needs, instead of always paying the
desktop cost.

**To revert:** point the `<source>`/`<img>` tags in `index.html` back at
`images/portfolio-N.jpg` / `images/portfolio-N.webp` (still present in
`images/_originals/`), and drop the `srcset`/`sizes` attributes.

---

## 2026-09-10 — Strip unused Microsoft Clarity entries from the CSP

**Problem:** housekeeping follow-up to disabling Clarity (below). The CSP
`<meta>` tag (`index.html`, was line 12) still whitelisted
`https://www.clarity.ms` and `https://scripts.clarity.ms` in `script-src`,
and `https://*.clarity.ms` in `connect-src`, even though nothing loads from
those domains anymore.

**Why it matters:** an unused CSP allowance is pure attack surface — if a
future XSS bug ever let an attacker inject a `<script>` tag, a wider
`script-src` gives them more places to load a malicious payload from. There
is no functional upside to keeping it once Clarity is off.

**What changed:** removed `https://www.clarity.ms`, `https://scripts.clarity.ms`,
and `https://*.clarity.ms` from the CSP `content` attribute. Nothing else in
the policy changed — `gtag`/`fbq` domains are still allowed since those
scripts are still active.

**To revert:** if Clarity is ever re-enabled (see below), these three
entries need to be added back to the CSP or the browser will silently block
Clarity's script and beacon requests with a CSP violation (no visible error
to the visitor, just zero data in the Clarity dashboard — this exact
failure mode already happened once with the old inline-script hash, see the
comment above the CSP tag in `index.html`).

---

## 2026-09-10 — Disable Microsoft Clarity

**Hypothesis going in:** Clarity was suspected of being a meaningful chunk
of main-thread blocking time, based on an initial (inconclusive) click vs.
session-recording gap analysis.

**Test:** controlled A/B — commented out the Clarity snippet in
`tracking.js` (gtag and Meta Pixel left untouched), re-ran PageSpeed
Insights mobile + desktop, and compared to the prior report.

**Result — confirmed, not noise:**

| Metric (desktop)     | With Clarity | Without Clarity |
|---|---|---|
| Total Blocking Time  | 1,910 ms     | 140 ms (**-92%**) |
| Performance score    | 68           | 97 |

| Metric (mobile)       | With Clarity | Without Clarity |
|---|---|---|
| Total Blocking Time    | 230 ms  | 80 ms |
| LCP                    | 6.0 s   | 5.0 s |
| Speed Index            | 4.2 s   | 2.9 s |
| Performance score      | 69      | 78 |

Desktop moved the most because desktop's fast network let Clarity's script
fully download and execute inside Lighthouse's trace window, so its real
cost got measured — on throttled mobile it often hadn't finished loading
before the trace ended, so the old mobile numbers were flattering Clarity,
not clearing it.

Mobile's LCP improvement is a secondary effect: Clarity's domain
(`n.clarity.ms`) was contending for one of the limited parallel connections
during the LCP window, competing with the actual LCP image for bandwidth.
Removing Clarity removed that contention.

**Bonus finding:** "Bonnes pratiques" went 92 → 100 on both mobile and
desktop. Clarity was also throwing browser console errors / DevTools Issues
— a correctness problem independent of speed.

**Decision:** keep Clarity disabled. The commented-out snippet is left in
place in `tracking.js` for reference/re-enabling later, not deleted.

**If Clarity is genuinely needed again** (i.e. session recordings are
actively reviewed, not just collected): don't just uncomment it — load it
in a way that doesn't cost main-thread time, e.g. via a web-worker
isolation approach (Partytown) or a sampled load rate (e.g. 1-in-10
sessions). Re-enabling as-is reintroduces the full 1,910ms desktop TBT hit.
Also remember to re-add the CSP entries above, or it'll load nothing at all.

**What changed:** the Clarity IIFE in `tracking.js` is wrapped in a block
comment with a dated note explaining why and how to reverse it. gtag/fbq
are untouched.