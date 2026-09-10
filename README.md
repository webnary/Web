# webnary.studio — Performance Decision Log

Running record of performance changes made to the site, why they were made,
what evidence backed the decision, and how to reverse them if needed.
Newest entries at the top.

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
