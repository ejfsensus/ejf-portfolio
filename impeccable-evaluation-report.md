# `/impeccable` Evaluation: EJF Portfolio

**Project**: [ejf-portfolio](https://github.com/sensuslab/ejf-portfolio) — Ethan James Farrell AI Consulting Portfolio  
**Date**: 2026-04-29  
**Evaluation**: UX Design Critique + Technical Quality Audit  
**Context Established**: PRODUCT.md ✓ | DESIGN.md ✓ | DESIGN.json ✓

---

## Executive Summary

| Dimension | Score | Verdict |
|-----------|-------|---------|
| **AI Slop Detection** | — | **NOT AI slop** — genuine human authorship with custom palette, signature motifs, and distinctive voice |
| **Nielsen's Heuristics (UX)** | **28/40** | Good — solid foundation, address weak areas |
| **Cognitive Load** | **1/8 failures** | Low — well-scaffolded, minimal friction |
| **Technical Health (Audit)** | **10/20** | Acceptable — significant work needed |
| **Anti-Patterns** | **1/4** | 3 explicit DESIGN.md violations found in code |

**Overall verdict**: This is a **surprisingly strong, intentionally-crafted portfolio** that largely escapes the AI-slop trap. The design shows genuine authorship — a custom obsidian palette (not pure black), a distinctive Inter Tight + Fraunces serif pairing, a signature prism gradient bar motif, and hand-coded generative SVG artwork. The brand voice is consistent — calm, plain-spoken, warm without being casual.

That said, there are **specific craft failures** that undermine the "Operational grounding" and "Ethical by default" principles. The most concerning finding: **the DESIGN.md explicitly bans certain patterns, yet those exact patterns appear in the code** — suggesting the design system was documented after the code was written, or implementation was never reviewed against its own rules.

---

## What's Working (Celebrate These)

1. **The prism bar as a genuine signature motif.** The gradient bar (`linear-gradient(90deg, #3FB8B0, #2B2A63 45%, #D97A4A)`) appears under "intent" in the hero, as a hover accent in the Three E's cards, as a section divider in FAQ, and as the home pillar indicator. Immediately recognizable, conceptually weighted, never decorative.

2. **Two-accent discipline is real.** Ember and prism are rationed carefully — combined they occupy ≤15% of any viewport at rest. The system feels monochrome-with-intent rather than dark-mode-generic.

3. **Typographic tension works.** Inter Tight at `-0.04em` tracking against Fraunces italic at 300 weight creates editorial warmth without losing authority. The "One Serif Rule" is respected.

4. **`prefers-reduced-motion` properly respected.** Bloom animations and fade-up transitions are disabled for users who prefer reduced motion. Good ethical practice.

5. **Semantic landmarks used well.** `<main>`, `<header>`, `<footer>`, `<nav>`, `<section>`, `<article>`, `<figure>`, `<blockquote>` all used appropriately.

6. **Transform-only animations.** Bloom drift and fade-up use `transform` and `opacity` only — compositor-friendly with `will-change: transform` present.

7. **Video accessibility handled.** Hero video has `aria-hidden="true"`, `muted`, `playsInline`, `motion-reduce:hidden`. No auto-playing audio.

8. **Deterministic generative art.** `PrismArtefact.tsx` uses seed-based deterministic algorithms — each product gets a unique but stable visual signature.

---

## Critical Issues: P0 (Blocking) — Fix Immediately

### [P0] Gradient text (`background-clip: text`) in Three E's card
- **Where**: `src/components/Positioning.tsx:69-73`
- **What**: The oversized "E" letterforms use `bg-clip-text text-transparent` with a linear gradient — a pattern **explicitly banned** by DESIGN.md ("Don't apply gradient text")
- **Why it matters**: This is a classic AI-generated portfolio tell. It undermines the brand's claim of "no visual gimmicks." The design document was written specifically to reject this pattern, yet it appears in the code.
- **Fix**: Remove the gradient. Use solid `text-bone` or `text-bone/80` for the "E" letterforms. Emphasis should come from size and weight, not decorative gradients.
- **Command**: `$impeccable colorize`

### [P0] Side-stripe accent border in FounderModal
- **Where**: `src/components/FounderModal.tsx:169`
- **What**: `border-l-2 border-ember/70` as a colored left accent on the Three E's principles list — **explicitly banned** by DESIGN.md ("Don't use side-stripe borders")
- **Why it matters**: Side-stripe borders are a lazy design pattern the system explicitly rejects. Their presence undermines design system discipline.
- **Fix**: Replace with a full-border card (`border border-white/10 rounded-lg p-4`), a background tint (`bg-ember/5 rounded-lg p-4`), or the prism-bar underline pattern.
- **Command**: `$impeccable shape`

---

## Priority Issues: P1 (Major) — Fix Before Release

### [P1] Vision section has brittle `bg-bone text-bone` pattern
- **Where**: `src/components/Vision.tsx:5`
- **What**: Background and text both set to bone (`#F4F1EC`). Readability depends entirely on a background image (`/sensusbg.png`) and CSS gradient overlays.
- **Impact**: If the image fails (slow connection, network error), text becomes invisible. WCAG 2.1 AA violation — contrast must be sufficient independent of decorative assets.
- **Fix**: Set a dark fallback background (`bg-obsidian`) so text remains readable if the image fails. The decorative image should enhance, not enable, readability.
- **Command**: `$impeccable harden`

### [P1] Mobile navigation completely missing
- **Where**: `src/components/Nav.tsx:42`
- **What**: `hidden md:flex` on nav links means mobile users have zero section navigation — only the "Meet Ethan" button remains.
- **Impact**: For a long single-scroll page, mobile users must manually scroll through 10+ sections. No way to jump to Contact, FAQ, or Products.
- **Fix**: Implement a hamburger menu with the 6 anchor links, or convert to a sticky bottom bar with icon links.
- **Command**: `$impeccable adapt`

### [P1] Form placeholder text fails WCAG AA contrast
- **Where**: `src/components/Contact.tsx:137` (`placeholder-bone/35`)
- **What**: Placeholder text at 35% opacity yields **2.88:1 contrast** — below the 4.5:1 AA minimum.
- **Impact**: Users with low vision cannot read placeholder hints. The DESIGN.md describes this as "deliberately subtle" — but this is an accessibility trade-off that fails WCAG.
- **Fix**: Change to `placeholder-bone/55` (5.66:1, passes AA) or add persistent visible labels.
- **Command**: `$impeccable harden`

### [P1] No focus-visible styles on interactive elements
- **Where**: Global — nav links, buttons, cards, form fields
- **What**: Keyboard users cannot see which element has focus. No `:focus-visible` ring, outline, or background shift anywhere.
- **Impact**: WCAG 2.1 AA 2.4.7 violation. Keyboard navigation is effectively blind.
- **Fix**: Add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/80` to all interactive elements.
- **Command**: `$impeccable harden`

### [P1] ProductCard uses invalid `<button>` nesting
- **Where**: `src/components/ProductCard.tsx:94-101`
- **What**: `<button>` contains `<div>`, `<h3>`, `<p>` — block-level and heading elements inside a button.
- **Impact**: Violates HTML spec. Screen readers skip or misannounce content. Some browsers flatten the DOM.
- **Fix**: Render as `<div role="button" tabIndex={0}>` with keyboard handlers, or use an `<a>` element, or refactor so the card is a wrapper with a separate internal button.
- **Command**: `$impeccable harden`

### [P1] Modals do not trap focus
- **Where**: `src/components/FounderModal.tsx`, `src/components/ProductModal.tsx`
- **What**: When a modal opens, focus remains in the background document. Tab cycling continues through elements behind the modal.
- **Impact**: WCAG 2.1 AA 2.4.3 violation. Screen reader and keyboard users lose context.
- **Fix**: Implement focus trapping — move focus to modal container on open; intercept Tab/Shift+Tab to cycle within modal; return focus to trigger on close.
- **Command**: `$impeccable harden`

### [P1] FAQ accordion lacks ARIA states
- **Where**: `src/components/Faq.tsx:37-47`
- **What**: No `aria-expanded` or `aria-controls` on FAQ toggle buttons.
- **Impact**: Screen reader users cannot tell whether an item is expanded or collapsed.
- **Fix**: Add `aria-expanded={isOpen}` to the `<button>` and `aria-controls` pointing to the content panel's id.
- **Command**: `$impeccable harden`

### [P1] Em dashes used throughout copy
- **Where**: `Vision.tsx`, `Acuity.tsx`, `Approach.tsx`, `Contact.tsx`, `FounderModal.tsx`
- **What**: The DESIGN.md explicitly bans em dashes: "Don't use em dashes in copy — the system prefers commas, colons, or periods."
- **Impact**: Undermines the brand's claim of intentional, disciplined copy.
- **Fix**: Replace all em dashes with commas, colons, periods, or en dashes.
- **Command**: `$impeccable clarify`

### [P1] Hard-coded colors in global CSS
- **Where**: `src/index.css:10-12`, `index.css:23`, `index.css:43`
- **What**: Colors defined outside the Tailwind token system (`#0A0A0C`, `#F4F1EC`, `#D97A4A`, `#0E0E12`). The `canvas-card` color `#0E0E12` is not even in the token set.
- **Impact**: If tokens change, these don't update. Creates an unintended extra surface tier.
- **Fix**: Replace with Tailwind utilities or CSS custom properties referencing tokens.
- **Command**: `$impeccable extract`

---

## Secondary Issues: P2 (Minor) — Fix in Next Pass

| Issue | Location | Impact | Command |
|-------|----------|--------|---------|
| No skip navigation link | `App.tsx` | Keyboard users tab through entire hero | `$impeccable harden` |
| Form errors lack ARIA | `Contact.tsx:103` | Errors not linked to fields | `$impeccable harden` |
| Touch targets below 44×44px | FAQ toggle, chips | Mis-taps on mobile | `$impeccable adapt` |
| Fixed px font sizes | Global | Breaks text scaling | `$impeccable typeset` |
| `overflow-x: hidden` on body | `index.css:19` | Masks layout issues | `$impeccable layout` |
| FounderModal tabs overflow | `FounderModal.tsx:85` | No scroll affordance | `$impeccable adapt` |
| Images in src/ not public/ | `ProductCard.tsx` | Unnecessary build processing | `$impeccable optimize` |
| Background images without priority | `Vision.tsx`, `Acuity.tsx` | Compete with critical content | `$impeccable optimize` |
| Inline rgba() gradients everywhere | 10+ files | No single source of truth | `$impeccable extract` |
| No loading state for Supabase | `usePortfolioData.ts` | Blank sections on slow connections | `$impeccable harden` |
| Contact form lacks email validation | `Contact.tsx` | Malformed emails submitted | `$impeccable harden` |
| FounderModal 6 tabs | `FounderModal.tsx` | Pushes working memory limits | `$impeccable distill` |

---

## Systemic Issues (Patterns, Not One-Offs)

1. **Design document violations in implementation.** Three explicit "Don't" rules from DESIGN.md appear in the code. This indicates a process gap — either the code was written before the design system was finalized, or code review does not check against DESIGN.md.

2. **Hard-coded colors and rgba() opacity values.** Over 30 instances of inline `rgba(...)` values across components. The Tailwind tokens exist but are not used for gradients or overlays.

3. **Missing mobile UX patterns.** Navigation simply hides on mobile. The approach accordion doesn't consider touch. This suggests mobile was an afterthought.

4. **Accessibility as an afterthought.** No focus-visible, no skip link, no ARIA on accordion, no focus trapping, invalid button nesting — a systemic absence of a11y-first practices.

5. **PX-based typography.** Every text size is in pixels, breaking user text scaling and maintainability.

---

## Recommended Action Plan

| Priority | Command | What It Fixes |
|----------|---------|---------------|
| **P0** | `$impeccable colorize` | Remove gradient text from Three E's card |
| **P0** | `$impeccable shape` | Refactor side-stripe border in FounderModal |
| **P1** | `$impeccable harden` | Add focus-visible, modal focus trapping, FAQ ARIA, fix button nesting, fix form contrast, add Supabase loading states |
| **P1** | `$impeccable adapt` | Build mobile nav, increase touch targets |
| **P1** | `$impeccable clarify` | Strip all em dashes from copy |
| **P1** | `$impeccable extract` | Tokenize hard-coded rgba() values, align canvas-card with tokens |
| **P2** | `$impeccable optimize` | Defer below-fold video loading, add fetchpriority hints, move images to public/ |
| **P2** | `$impeccable typeset` | Convert px-based font sizes to rem units |
| **P2** | `$impeccable layout` | Remove `overflow-x: hidden`, fix overflow at source |
| **P2** | `$impeccable distill` | Simplify FounderModal tabs (6 → 3 meta-groups) |
| **Final** | `$impeccable polish` | Final pass: clean redundant motion-reduce classes, refine accordion animation |

---

## Full Reports

- **UX Design Critique**: `/mnt/agents/output/ux-critique-report.md` (240 lines)
- **Technical Quality Audit**: `/mnt/agents/output/audit-report.md` (353 lines)
- **PRODUCT.md**: `/mnt/agents/ejf-portfolio/PRODUCT.md`
- **DESIGN.md**: `/mnt/agents/ejf-portfolio/DESIGN.md`
- **DESIGN.json**: `/mnt/agents/ejf-portfolio/DESIGN.json`

---

> You can ask me to run any of these commands one at a time, all at once, or in any order you prefer.
>
> Re-run `$impeccable critique` and `$impeccable audit` after fixes to see your scores improve.
