# EJF Portfolio — Technical Quality Audit Report

**Project**: Ethan James Farrell AI Consulting Portfolio  
**Stack**: React 18, TypeScript, Vite, Tailwind CSS 3.4, Supabase  
**Audit Date**: 2025  
**Auditor**: Systematic Technical Quality Audit  

---

## Audit Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 2 | Placeholder text fails WCAG AA contrast; no focus-visible styles; modal focus untrapped |
| 2 | Performance | 3 | Videos load eagerly below fold; images not prioritized; otherwise well-optimized |
| 3 | Responsive Design | 2 | Mobile nav vanishes without menu; touch targets <44px; px-based text sizing |
| 4 | Theming | 2 | Extensive hard-coded rgba() values; canvas-card color not in token set |
| 5 | Anti-Patterns | 1 | **3 explicit DESIGN.md violations**: gradient text, side-stripe border, em dashes |
| **Total** | | **10/20** | **Acceptable — significant work needed** |

**Rating bands**: 18-20 Excellent (minor polish) | 14-17 Good (address weak dimensions) | 10-13 Acceptable (significant work needed) | 6-9 Poor (major overhaul) | 0-5 Critical (fundamental issues)

---

## Anti-Patterns Verdict

**Does this look AI-generated?** Partially — the design document itself is thoughtful and distinctive, but **the implementation contains multiple AI slop tells that directly contradict the design document's own rules**.

**Specific tells found:**

1. **Gradient text (`background-clip: text`)** — `Positioning.tsx:69` uses exactly the pattern the DESIGN.md bans under "Don't apply gradient text." The oversized "E" letterforms use a linear-gradient clipped to text. This is a classic AI-portfolio trope and explicitly off-brand.

2. **Side-stripe accent border** — `FounderModal.tsx:169` uses `border-l-2 border-ember/70 pl-5` as a colored left accent on the Three E's principles list. The DESIGN.md explicitly bans this: "Don't use side-stripe borders (`border-left` > 1px as colored accent)."

3. **Em dashes throughout copy** — The DESIGN.md says "Don't use em dashes in copy." Found in: `Vision.tsx` ("Sensus InVista & InVista —"), `Acuity.tsx` ("Acuity Institute —"), `Approach.tsx`, `Contact.tsx`. Multiple instances.

4. **Hero stat row** — Borderline hero-metric template. The DESIGN.md defends this as "intentionally minimal and non-SaaS in proportion," but the presence of big-number + small-label stats is still a SaaS cliché tell.

These are not accidental — the DESIGN.md was clearly written to reject these exact patterns, yet they appear in the code. This suggests the design system was documented after the code was generated, or the implementation was not reviewed against its own rules.

---

## Executive Summary

**Audit Health Score: 10/20 (Acceptable — significant work needed)**

**Total issues found:** 2 P0 | 12 P1 | 11 P2 | 3 P3

**Top 5 critical issues:**

1. **Gradient text in Positioning.tsx** [P0] — Direct DESIGN.md violation. `bg-clip-text text-transparent` on the "E" letterforms is explicitly banned and reads as an AI-generated portfolio tell.
2. **Side-stripe border in FounderModal** [P0] — `border-l-2 border-ember/70` on the principles list is explicitly banned by the design system.
3. **WCAG AA contrast failure on form placeholders** [P1] — `bone/35` (2.88:1) is below the 4.5:1 minimum for text. Contact form placeholders are nearly invisible.
4. **Mobile navigation completely missing** [P1] — `hidden md:flex` on nav links with no hamburger menu means mobile users have no way to navigate sections.
5. **Invalid button nesting in ProductCard** [P1] — `<button>` elements contain `<div>`, `<h3>`, `<p>` block-level children, which violates HTML spec and breaks screen reader behavior.

**Recommended next steps:**
1. Fix the three explicit design violations (gradient text, side-stripe, em dashes) — these are the most visible tells.
2. Add mobile navigation (hamburger or bottom sheet).
3. Fix placeholder contrast and add focus-visible styles across all interactive elements.
4. Refactor ProductCard to use a clickable div with proper ARIA instead of invalid button nesting.
5. Implement focus trapping in modals.

---

## Detailed Findings by Severity

### P0 — Blocking

**[P0] Gradient text (`background-clip: text`) on Three E's card**
- **Location**: `src/components/Positioning.tsx:69-73`
- **Category**: Anti-Pattern
- **Impact**: Direct violation of DESIGN.md "Don't" list. This pattern is a hallmark of AI-generated portfolios and undermines the brand's claim of "no visual gimmicks."
- **Standard**: DESIGN.md line 211: "Don't apply gradient text (`background-clip: text`)"
- **Recommendation**: Remove the gradient. Use solid `text-bone` or `text-bone/80` for the "E" letterforms. Emphasis should come from size and weight, not decorative gradients.
- **Suggested command**: `$impeccable colorize`

**[P0] Side-stripe accent border on modal principles**
- **Location**: `src/components/FounderModal.tsx:169`
- **Category**: Anti-Pattern
- **Impact**: Direct violation of DESIGN.md "Don't" list. Side-stripe borders are a lazy design pattern explicitly rejected by this system.
- **Standard**: DESIGN.md line 209: "Don't use side-stripe borders (`border-left` > 1px as colored accent)"
- **Recommendation**: Replace with a full-border card, a hairline divider, or background tint. Consider using the prism-bar underline pattern instead.
- **Suggested command**: `$impeccable shape`

---

### P1 — Major

**[P1] Form placeholder text fails WCAG AA contrast**
- **Location**: `src/components/Contact.tsx:137` (`placeholder-bone/35`)
- **Category**: Accessibility
- **Impact**: Placeholder text at 35% opacity on obsidian yields 2.88:1 contrast — below the 4.5:1 AA minimum. Users with low vision cannot read placeholder hints. The DESIGN.md says this is "deliberately subtle, almost invisible, to encourage completion" — but this is an accessibility trade-off that fails WCAG.
- **Standard**: WCAG 2.1 AA 1.4.3 (Contrast Minimum)
- **Recommendation**: Change to `placeholder-bone/55` (5.66:1, passes AA) or add visible labels that persist. Do not rely on placeholders alone for field guidance.
- **Suggested command**: `$impeccable harden`

**[P1] No focus-visible styles on interactive elements**
- **Location**: Global — `src/components/Nav.tsx:44`, `src/components/Hero.tsx:71-84`, `src/components/Footer.tsx:75`, `src/components/ProductCard.tsx:32-101`
- **Category**: Accessibility
- **Impact**: Keyboard users cannot see which element has focus. Nav links, buttons, and cards rely only on hover states (`hover:text-bone`, `hover:border-bone/60`). No `:focus-visible` ring, outline, or background shift.
- **Standard**: WCAG 2.1 AA 2.4.7 (Focus Visible)
- **Recommendation**: Add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/80` to all interactive elements. Or add a CSS rule: `a:focus-visible, button:focus-visible { outline: 2px solid rgba(217,122,74,0.8); outline-offset: 2px; }`
- **Suggested command**: `$impeccable harden`

**[P1] Mobile navigation links completely absent**
- **Location**: `src/components/Nav.tsx:42-48`
- **Category**: Responsive / Accessibility
- **Impact**: `hidden md:flex` means on viewports below 768px, all section nav links disappear. There is no hamburger menu, no bottom nav, no alternative. Mobile users cannot jump to sections.
- **Standard**: WCAG 2.1 AA 2.4.5 (Multiple Ways)
- **Recommendation**: Add a hamburger menu that opens a full-screen or slide-in nav overlay on mobile. Or convert nav to a sticky bottom bar with icon links.
- **Suggested command**: `$impeccable adapt`

**[P1] ProductCard uses invalid `<button>` nesting**
- **Location**: `src/components/ProductCard.tsx:94-101`
- **Category**: Accessibility
- **Impact**: `<button>` contains `<div>`, `<h3>`, `<p>` — block-level and heading elements inside a button. This violates the HTML spec (phrasing content only inside buttons) and causes screen readers to skip or misannounce content. Some browsers flatten the DOM, breaking the structure.
- **Standard**: WCAG 2.1 AA 4.1.1 (Parsing), HTML Living Standard
- **Recommendation**: Render as `<div role="button" tabIndex={0}>` with keyboard handlers (Enter/Space), or use an `<a>` with `href="#"` and `onClick`, or refactor so the card is a wrapper with a separate internal button.
- **Suggested command**: `$impeccable harden`

**[P1] Modals do not trap focus**
- **Location**: `src/components/FounderModal.tsx:19-30`, `src/components/ProductModal.tsx:7-18`
- **Category**: Accessibility
- **Impact**: When a modal opens, focus remains in the background document. Tab cycling continues through background elements behind the modal. Screen reader users and keyboard users lose context.
- **Standard**: WCAG 2.1 AA 2.4.3 (Focus Order), 2.4.7 (Focus Visible)
- **Recommendation**: Implement focus trapping: on open, move focus to the modal container; intercept Tab/Shift+Tab to cycle within modal; on close, return focus to trigger. Use a small utility hook or `react-focus-lock` pattern.
- **Suggested command**: `$impeccable harden`

**[P1] FAQ accordion lacks aria-expanded and aria-controls**
- **Location**: `src/components/Faq.tsx:37-47`
- **Category**: Accessibility
- **Impact**: Screen reader users cannot tell whether an FAQ item is expanded or collapsed. The state change is visual-only.
- **Standard**: WCAG 2.1 AA 4.1.2 (Name, Role, Value)
- **Recommendation**: Add `aria-expanded={isOpen}` to the `<button>`. Add `aria-controls` pointing to the content panel's id.
- **Suggested command**: `$impeccable harden`

**[P1] Em dashes used throughout copy**
- **Location**: `Vision.tsx:33`, `Acuity.tsx:80`, `Approach.tsx` (multiple), `Contact.tsx`, `FounderModal.tsx`
- **Category**: Anti-Pattern
- **Impact**: The DESIGN.md explicitly bans em dashes: "Don't use em dashes in copy — the system prefers commas, colons, or periods." Their presence undermines the brand's claim of intentional, disciplined copy.
- **Standard**: DESIGN.md line 215
- **Recommendation**: Replace all em dashes with commas, colons, periods, or en dashes where appropriate.
- **Suggested command**: `$impeccable clarify`

**[P1] bone/45 text fails body text contrast on some surfaces**
- **Location**: `src/components/ProductCard.tsx:114` (`text-bone/75` fallback is `text-bone/45`), `src/components/Footer.tsx:47` (`text-bone/45`)
- **Category**: Accessibility
- **Impact**: `bone/45` yields 4.07:1 on obsidian. This passes for large text (≥3:1) but fails for body text under 18px. Used in status chip fallbacks and footer metadata.
- **Standard**: WCAG 2.1 AA 1.4.3
- **Recommendation**: Use `bone/55` (5.66:1) minimum for any text below 18px.
- **Suggested command**: `$impeccable colorize`

**[P1] Hero video and profile video load eagerly**
- **Location**: `src/components/Hero.tsx:10-20` (`preload="auto"`), `src/components/FounderStrip.tsx:15-24` (`preload="auto"`)
- **Category**: Performance
- **Impact**: Video files are loaded immediately on page load, blocking bandwidth. The hero video is above the fold (justified), but the profile video in FounderStrip is below the fold and should defer loading.
- **Standard**: Web Performance Best Practices
- **Recommendation**: Change FounderStrip video to `preload="none"` and load lazily. For hero video, add `fetchpriority="high"` to ensure it loads before below-fold assets.
- **Suggested command**: `$impeccable optimize`

**[P1] Vision section has dangerous color fallback**
- **Location**: `src/components/Vision.tsx:5`
- **Category**: Accessibility / Theming
- **Impact**: `bg-bone text-bone` means if the background image fails to load (network error, slow connection), white text renders on white background — completely invisible.
- **Standard**: WCAG 2.1 AA 1.4.3, Progressive Enhancement
- **Recommendation**: Change base background to `bg-obsidian` so text remains readable if the image fails. The image overlay covers it when loaded.
- **Suggested command**: `$impeccable harden`

**[P1] Hard-coded colors in global CSS**
- **Location**: `src/index.css:10-12` (`background: #0A0A0C`, `color: #F4F1EC`), `index.css:23` (`background: #D97A4A`), `index.css:43` (`background: #0E0E12`)
- **Category**: Theming
- **Impact**: Colors defined outside the Tailwind token system. If tokens change, these don't update. The `canvas-card` color `#0E0E12` is not even in the design token set (closest is `ink` at `#111114`).
- **Standard**: Internal design system consistency
- **Recommendation**: Replace with Tailwind utilities or CSS custom properties referencing tokens: `background-color: theme('colors.obsidian')`, `color: theme('colors.bone')`.
- **Suggested command**: `$impeccable extract`

---

### P2 — Minor

**[P2] No skip navigation link**
- **Location**: `src/App.tsx:21-43`
- **Category**: Accessibility
- **Impact**: Keyboard users must tab through the entire hero to reach main content.
- **Standard**: WCAG 2.1 AA 2.4.1 (Bypass Blocks)
- **Recommendation**: Add a visually-hidden skip link as the first focusable element: `<a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>`.
- **Suggested command**: `$impeccable harden`

**[P2] Form errors lack ARIA associations**
- **Location**: `src/components/Contact.tsx:103`
- **Category**: Accessibility
- **Impact**: The error message is visually present but not programmatically associated with the failing fields.
- **Standard**: WCAG 2.1 AA 1.3.1 (Info and Relationships)
- **Recommendation**: Add `aria-invalid="true"` to fields when error is present. Use `aria-describedby` to link the error `<p>` to the field.
- **Suggested command**: `$impeccable harden`

**[P2] Touch targets below 44×44px**
- **Location**: `src/components/Faq.tsx:44` (32×32px toggle), `src/components/Acuity.tsx:89` (chips ~30px tall), `src/components/Approach.tsx:62` (capability chips), `src/components/Nav.tsx:51-57` ("Accepting clients" text block ~12px)
- **Category**: Responsive
- **Impact**: WCAG 2.5.5 recommends 44×44px minimum for pointer targets. Small targets cause mis-taps on mobile.
- **Standard**: WCAG 2.1 AA 2.5.5 (Target Size)
- **Recommendation**: Ensure all clickable elements are at least 44×44px. Wrap chips in larger hit areas or increase padding.
- **Suggested command**: `$impeccable adapt`

**[P2] Fixed px font sizes throughout**
- **Location**: Global — `text-[11px]`, `text-[12px]`, `text-[13px]`, `text-[14px]`, `text-[15px]`, `text-[17px]`, `text-[18px]` etc.
- **Category**: Responsive
- **Impact**: Users who increase browser text size won't see these scale because they're fixed in pixels. Breaks accessibility settings.
- **Standard**: WCAG 2.1 AA 1.4.4 (Resize Text)
- **Recommendation**: Convert body-scale text to rem units. Use `text-[0.6875rem]` instead of `text-[11px]`, or configure Tailwind to use rem-based defaults.
- **Suggested command**: `$impeccable typeset`

**[P2] `overflow-x: hidden` on body**
- **Location**: `src/index.css:19`
- **Category**: Responsive
- **Impact**: Hides overflow rather than fixing root causes. Can prevent sticky positioning from working correctly and masks layout issues.
- **Standard**: Best practice
- **Recommendation**: Remove `overflow-x: hidden` and fix any overflow at its source (likely large fixed-width elements or negative margins).
- **Suggested command**: `$impeccable layout`

**[P2] FounderModal tabs overflow without scroll affordance**
- **Location**: `src/components/FounderModal.tsx:85`
- **Category**: Responsive
- **Impact**: On narrow viewports, tabs overflow horizontally with `overflow-x-auto no-scrollbar`. Users may not realize content is scrollable since the scrollbar is hidden.
- **Recommendation**: Add a fade gradient on the right edge to indicate more content, or stack tabs vertically on mobile.
- **Suggested command**: `$impeccable adapt`

**[P2] Images bundled in src/ instead of public/**
- **Location**: `src/components/ProductCard.tsx:4-9` (imported PNGs)
- **Category**: Performance
- **Impact**: Images in `src/` are processed by Vite's build pipeline (hashed, potentially inlined as base64). For product screenshots, this adds unnecessary build time and may inline large images.
- **Recommendation**: Move static images to `public/` and reference by path. Only keep small SVGs or icons in `src/`.
- **Suggested command**: `$impeccable optimize`

**[P2] Background images load without priority hints**
- **Location**: `src/components/Vision.tsx:6-11` (`/sensusbg.png`), `src/components/Acuity.tsx:54-58` (`/acuitybg.png`)
- **Category**: Performance
- **Impact**: Large background images load with default priority, competing with critical content.
- **Recommendation**: Add `fetchpriority="low"` to decorative background images. Preload only the LCP image.
- **Suggested command**: `$impeccable optimize`

**[P2] Inline rgba() gradients everywhere**
- **Location**: `Hero.tsx:27`, `Vision.tsx:18`, `Acuity.tsx:35`, `FounderModal.tsx:51`, `Contact.tsx:42`, `PrismArtefact.tsx:63`
- **Category**: Theming
- **Impact**: Dozens of hard-coded rgba() values for gradients. No single source of truth. Changing a brand color requires manual updates across 10+ files.
- **Standard**: Maintainability
- **Recommendation**: Create CSS custom properties or Tailwind plugins for common gradients (hero-overlay, acuity-glow, etc.).
- **Suggested command**: `$impeccable extract`

**[P2] `canvas-card` color not in token set**
- **Location**: `src/index.css:43` (`background: #0E0E12`)
- **Category**: Theming
- **Impact**: The canvas-card class uses `#0E0E12` which is not defined in `tailwind.config.js` or DESIGN.md. Closest token is `ink` (#111114). Creates an unintended extra surface tier.
- **Standard**: Internal design system consistency
- **Recommendation**: Replace with `bg-ink` or add `#0E0E12` as a named token (e.g., `slate`) if intentional.
- **Suggested command**: `$impeccable extract`

---

### P3 — Polish

**[P3] No `<h1>` on modal content**
- **Location**: `src/components/FounderModal.tsx:61`, `src/components/ProductModal.tsx:52`
- **Category**: Accessibility
- **Impact**: Modal headings use `<h2>` but since the modal overlays the page, some screen reader users benefit from an `<h1>` inside the modal context.
- **Standard**: Best practice
- **Recommendation**: Optional — add `aria-level="1"` if the modal represents a new document context.
- **Suggested command**: `$impeccable harden`

**[P3] Approach accordion uses max-height for animation**
- **Location**: `src/components/Approach.tsx:52-54`
- **Category**: Performance
- **Impact**: `max-h-[800px]` with transition can cause layout thrashing if content exceeds 800px.
- **Standard**: Best practice
- **Recommendation**: Use `grid-template-rows: 0fr` to `1fr` technique or calculate height with refs for smoother animation.
- **Suggested command**: `$impeccable optimize`

**[P3] `motion-reduce:group-hover:translate-y-0` is redundant**
- **Location**: `src/components/Positioning.tsx:69`
- **Category**: Performance
- **Impact**: The `motion-reduce` prefix undoes the hover transform for reduced motion, but the parent `@media (prefers-reduced-motion: reduce)` rule already disables all transforms.
- **Standard**: Best practice
- **Recommendation**: Remove the redundant `motion-reduce` override.
- **Suggested command**: `$impeccable polish`

---

## Patterns & Systemic Issues

### 1. Design document violations in implementation
Three explicit "Don't" rules from DESIGN.md appear in the code. This indicates a **process gap** — either the code was written before the design system was finalized, or code review does not check against DESIGN.md. This is the most concerning systemic issue because it undermines brand consistency.

### 2. Hard-coded colors and rgba() opacity values
Over 30 instances of inline `rgba(10,10,12,...)`, `rgba(244,241,236,...)`, and `rgba(217,122,74,...)` values across components. The Tailwind custom color tokens exist but are not used for gradients, overlays, or decorative backgrounds. This makes global color changes error-prone.

### 3. Missing mobile UX patterns
The navigation simply hides on mobile (`hidden md:flex`). The approach accordion doesn't consider touch. FAQ toggles are too small. This suggests the mobile experience was an afterthought rather than a co-equal design target.

### 4. Accessibility as an afterthought
No focus-visible styles, no skip link, no ARIA on accordion, no focus trapping, invalid button nesting — these are not one-off mistakes but a **systemic absence of accessibility-first implementation practices**.

### 5. PX-based typography
Every text size is declared in pixels (`text-[11px]`, `text-[13px]`, `text-[17px]`). This breaks user text scaling and is a maintainability anti-pattern. The design document specifies `17px` for body but doesn't mandate px units.

---

## Positive Findings

1. **`prefers-reduced-motion` properly respected** — `index.css:145-148` disables bloom animation and fade-up transitions for users who prefer reduced motion. Good practice.

2. **Semantic landmarks used** — `<main>`, `<header>`, `<footer>`, `<nav>`, `<section>`, `<article>`, `<figure>`, `<blockquote>`, `<figcaption>` all used appropriately in `App.tsx` and components.

3. **Video accessibility handled** — Hero video has `aria-hidden="true"`, `muted`, `playsInline`, and `motion-reduce:hidden`. Profile video has `aria-label`. No auto-playing audio.

4. **Proper ARIA on modals** — `role="dialog"`, `aria-modal="true"`, `aria-label` present. Escape key closes modals.

5. **Transform-only animations** — Bloom drift and fade-up use `transform` and `opacity` only, compositor-friendly. `will-change: transform` present on bloom elements.

6. **Form labels properly associated** — Contact form uses `<label>` wrapping inputs with visible text. Required indicators present.

7. **Consistent dark theme** — `color-scheme: dark` set. No light-mode compromise. Typography and spacing follow the design document closely.

8. **Supabase data fetching with cancellation** — `usePortfolioData.ts` uses a `cancelled` flag to prevent state updates after unmount. Good pattern.

9. **Deterministic generative art** — `PrismArtefact.tsx` uses a seed-based deterministic algorithm. Each product gets a unique but stable visual signature.

10. **Passive scroll listener** — `Nav.tsx:19` uses `{ passive: true }` for the scroll listener. Good performance practice.

---

## Recommended Actions

Prioritized by severity (P0 first, then P1, then P2):

1. **[P0] `$impeccable colorize`** — Remove gradient text from Positioning.tsx Three E's card; replace with solid bone color.
2. **[P0] `$impeccable shape`** — Refactor FounderModal principles list to remove side-stripe `border-l-2` accent; use full-border card or prism-bar underline instead.
3. **[P1] `$impeccable clarify`** — Find and replace all em dashes in copy across components; use commas, colons, or periods per DESIGN.md.
4. **[P1] `$impeccable harden`** — Add focus-visible styles to all interactive elements (nav links, buttons, cards, form fields); implement modal focus trapping; add `aria-expanded` to FAQ accordion; fix ProductCard invalid button nesting.
5. **[P1] `$impeccable adapt`** — Build mobile navigation (hamburger menu or bottom bar); increase touch targets to 44×44px minimum.
6. **[P1] `$impeccable harden`** — Fix contact form placeholder contrast (raise to bone/55); add `aria-invalid` and `aria-describedby` to form errors.
7. **[P1] `$impeccable optimize`** — Defer below-fold video loading (`preload="none"`); add `fetchpriority` hints to images.
8. **[P1] `$impeccable extract`** — Replace hard-coded rgba() values with CSS custom properties or Tailwind gradient utilities; align canvas-card color with token set.
9. **[P2] `$impeccable typeset`** — Convert px-based font sizes to rem units for accessibility scaling.
10. **[P2] `$impeccable layout`** — Remove `body { overflow-x: hidden }`; fix overflow at source.
11. **[P2] `$impeccable optimize`** — Move product images from `src/` to `public/` folder.
12. **[P3] `$impeccable polish`** — Final pass: remove redundant motion-reduce classes, clean up max-height animation technique.

---

> You can ask me to run these one at a time, all at once, or in any order you prefer.
>
> Re-run `$impeccable audit` after fixes to see your score improve.
