# Webnary — Code Audit & Fixes (2026-08-19)

Context: a batch of TikTok "add this to your site" reels prompted a review of
`index.html`, `styles.css`, and `script.js` against the site's actual code
(not against the reels' generic checklists). This documents what was
actually broken, what was fixed, and what was deliberately left alone.

## Fixed in this pass

| Issue | File(s) | Severity | What changed |
|---|---|---|---|
| Mobile nav was completely non-functional — burger button had no click handler, so on any screen <980px every nav link and the WhatsApp CTA button were `display:none` with no way to reveal them | `index.html`, `styles.css`, `script.js` | **Critical** | Wrapped nav links + CTA in `.nav-mobile-panel`; added open/close JS (click, close-on-link-click, close-on-Escape, close-on-resize); added `aria-expanded`/`aria-controls` on the burger button |
| FAQ items were `<div>`s with a click handler only — unreachable by keyboard, invisible to screen readers as an interactive control | `index.html`, `styles.css`, `script.js` | High (accessibility) | Converted `.faq-q` to real `<button>` elements with `aria-expanded` + `aria-controls` pointing at an `id` on each `.faq-a`; reset button UA chrome in CSS so it's visually identical to before |
| Theme toggle didn't persist — reloading the page silently reset to dark regardless of what the visitor picked | `index.html`, `script.js` | Medium (UX bug) | Added `localStorage` read/write; added a small inline script in `<head>` that applies the saved theme before first paint, so there's no flash of the wrong theme |
| FAQ content existed but wasn't marked up as structured data, despite the site already shipping `ProfessionalService` JSON-LD | `index.html`, `fr-ads.html` | Medium (SEO/AIO) | Added a `FAQPage` JSON-LD block mirroring the visible FAQ content — eligible for rich results and easier for AI answer engines to parse |
| No `llms.txt` | new file | Low | Added a short one, describing the business, plans, and service area for AI crawlers/agents |
| `fr-ads.html` had the identical dead-burger and non-accessible-FAQ bugs as `index.html` | `fr-ads.html` | **Critical / High** | Applied the same nav-panel and FAQ-button fixes here too — it shares `styles.css` and `script.js` with `index.html`, so no separate CSS/JS changes were needed, just the markup |

## Verified as already correct — no changes made

These appeared on one or more of the TikTok checklists but were already
implemented; re-doing them would have been wasted effort:

- `sitemap.xml`, `robots.txt` (with sitemap reference), canonical tag, favicon reference
- `og:*` meta tags, meta description, `lang="fr"`
- Dark mode toggle (existed, just wasn't persisted — see above)
- Alt text on portfolio images
- WhatsApp floating contact as the tap-to-call equivalent
- `ProfessionalService` structured data (name, address, phone, price range)
- Pricing shown up front, no fake testimonials, no template-y bento/gradient clichés

## Deliberately not done — and why

- **Cookie consent banner / privacy policy** — there is currently no analytics
  script, no cookies, no tracking in the code. Adding a consent banner for a
  site that doesn't set cookies is cargo-culting, not compliance. **Do this
  only after** adding GA4/Search Console (see Next steps).
- **Framer Motion / 21st.dev** — suggested in one reel to "fix" a mobile
  layout-shift claim I could not verify from static files. The site is
  currently a dependency-free, hand-written HTML/CSS/JS stack, which is also
  part of the site's own pitch ("codé à la main, pas de template"). Pulling
  in a React animation library to patch a CSS sizing issue would be the
  wrong fix even if the underlying bug is real. If there's an actual CLS
  problem, it needs to be diagnosed on the live, deployed site (Lighthouse /
  PageSpeed Insights), not guessed at from source.
- **Rewriting the security-checklist items** (RLS, SQL injection, rate
  limiting, webhook signature checks, etc.) — none of these apply. There is
  no database, no auth, no server-side endpoint in this codebase. It's a
  static site. These become relevant only if/when a real form backend (e.g.
  the Google Sheets / Decap CMS option mentioned in the FAQ) is added —
  revisit at that point, not now.

## Next steps (not done, needs your decision first)

1. **Analytics**: no GA4 or Search Console tag exists anywhere in the code.
   Can't measure conversion on the 100€ plan pitch without this. Needs your
   GA4 property ID before I can wire it in.
2. **Cookie consent**: only needed once (1) is added.
3. **Verify on the live/deployed site**: everything above was checked
   against the static source files in this repo. Load-order behavior (e.g.
   any residual theme flash, real-device layout shift) should be spot-checked
   post-deploy, since static analysis can't fully substitute for that.

## Files touched
`index.html`, `fr-ads.html`, `styles.css`, `script.js` (edited) · `llms.txt` (new)

## Note on this pass
`fr-ads.html` was uploaded in the same batch as the other files but got
missed in the first round — it's a separate static HTML file, not something
`index.html`'s edits propagate to automatically. Any future page added to
this site (a new landing page, a service page, etc.) needs the same
nav/FAQ markup fixes applied by hand unless the nav and FAQ get extracted
into a shared include/template — worth doing if more pages are planned.
