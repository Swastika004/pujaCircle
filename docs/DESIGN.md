# Design System & UX Specification
## PujaCircle — Sankalp Advisor Update

**Repo path:** `docs/02-design/DESIGN.md`
**Version:** 2.0 (supersedes v1.0 palette/typography, extends with motion spec)

---

## 1. Design Philosophy

The existing v1.0 palette (Saffron/Maroon/Gold/Ivory) is thematically correct but reads as a generic "temple site" template — it's the same visual language as every competitor surveyed. v2.0 keeps the cultural signal but modernizes execution: deeper, less saturated tones for a premium feel, a serif+sans pairing for hierarchy (ritual content feels considered, UI chrome feels crisp), and purposeful motion that signals "the system is thinking" during the Advisor flow rather than static instant results — which is honest, since the mocked matching has a deliberate short delay to simulate real computation, and worth showing rather than hiding.

## 2. Color Palette (v2.0)

Replace flat HSL swatches with a slightly desaturated, higher-contrast set. All values are CSS custom properties in `index.css`.

| Token | Hex | HSL | Usage |
|---|---|---|---|
| `--brand-primary` (Deep Saffron) | `#D9642C` | `hsl(20, 68%, 48%)` | Primary CTAs, active states |
| `--brand-primary-dark` | `#A84A1F` | `hsl(20, 65%, 38%)` | Hover/pressed states |
| `--brand-secondary` (Regal Maroon) | `#5C1A2E` | `hsl(340, 55%, 22%)` | Headers, admin chrome, emphasis text |
| `--brand-accent` (Muted Gold) | `#C9A24B` | `hsl(42, 50%, 55%)` | Badges, ratings, highlight borders |
| `--brand-accent-soft` | `#EFE3C5` | `hsl(42, 50%, 88%)` | Subtle highlight backgrounds |
| `--background` (Warm Ivory) | `#FAF6EF` | `hsl(40, 40%, 96%)` | App background |
| `--surface` | `#FFFFFF` | — | Cards, modals |
| `--surface-alt` | `#F2ECDF` | `hsl(40, 33%, 91%)` | Alternating rows, secondary panels |
| `--foreground` (Charcoal) | `#231F20` | `hsl(220, 12%, 12%)` | Body text |
| `--foreground-muted` | `#6B6560` | — | Secondary text, captions |
| `--success` | `#3E7A4C` | — | Confirmed bookings, positive states |
| `--warning` | `#B8862E` | — | Pending/expiring states |
| `--danger` | `#A33B34` | — | Rejected/cancelled states |
| `--advisor-accent` (NEW — distinguishes Advisor module) | `#5B4B8A` | `hsl(258, 30%, 40%)` | Advisor-specific UI only — deliberately distinct from booking-flow saffron/maroon so the module reads visually as a different kind of experience (reflective, guided) vs. transactional booking |

The `--advisor-accent` is the one deliberate departure: giving the Advisor its own quiet accent color (a muted indigo/violet) signals to the user "this is the thinking/guidance part," distinct from the transactional saffron of booking — a small but real UX decision, not decoration.

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| Display / Headings | **Fraunces** (serif, variable) | Used for page titles, puja names, sankalp text display — gives ritual content warmth and gravity instead of looking like generic SaaS |
| UI / Body | **Inter** (sans, variable) | All UI chrome, forms, buttons, tables — high legibility, familiar |
| Devanagari/Sanskrit fragments (if displayed) | **Noto Serif Devanagari** | Only if any Sanskrit script is shown; ensures correct rendering |

**Type scale** (rem, 1rem = 16px base):

| Token | Size | Weight | Usage |
|---|---|---|---|
| `--text-display` | 2.75rem | 600 (Fraunces) | Hero/page titles |
| `--text-h1` | 2rem | 600 (Fraunces) | Section headers |
| `--text-h2` | 1.5rem | 600 (Fraunces) | Card/subsection titles |
| `--text-h3` | 1.125rem | 500 (Inter) | Component labels |
| `--text-body` | 1rem | 400 (Inter) | Body copy |
| `--text-small` | 0.875rem | 400 (Inter) | Captions, metadata |
| `--text-micro` | 0.75rem | 500 (Inter, uppercase, tracked) | Badges, tags, status pills |

Load both via `@fontsource/fraunces` and `@fontsource/inter` (npm, free, self-hosted — no external font CDN dependency, keeps the free-deployment constraint honest).

## 4. Spacing, Radius, Elevation

- Spacing scale: 4px base unit — 4, 8, 12, 16, 24, 32, 48, 64.
- Radius: `--radius-sm: 6px` (inputs, tags), `--radius-md: 12px` (cards), `--radius-lg: 20px` (modals, hero panels).
- Elevation: two shadow tokens only — `--shadow-card` (subtle, resting state) and `--shadow-raised` (hover/active) — avoid a large shadow scale, it reads as dated.

## 5. Motion & Micro-interaction Spec (Framer Motion)

All animations reference shared variants in `motion/variants.ts` (see TRD §6 for the implementation rule). Durations use two tokens only: `--motion-fast: 150ms` (hover/press) and `--motion-base: 300ms` (transitions/reveals), both `ease: [0.22, 1, 0.36, 1]` (standard ease-out).

| Interaction | Component | Behavior |
|---|---|---|
| Route transition | Advisor Intake → Result | Outgoing view fades + slides left 16px out; incoming fades + slides in from right 16px, via `AnimatePresence` |
| "Thinking" state | Advisor matching delay | Animated pulsing dots or a subtly rotating mandala-line icon (SVG, brand-colored) — replaces blank spinner, communicates "reasoning," honest about the artificial delay rather than hiding it |
| Match result reveal | `MatchResultCard` list | Staggered fade+rise, 60ms stagger between cards, so results feel "arrived at" rather than dumped |
| Card hover | Puja/priest cards | Lift 4px (`translateY(-4px)`) + shadow escalation from `--shadow-card` to `--shadow-raised`, 150ms |
| Button press | All primary buttons | Scale to 0.97 on `whileTap`, spring return |
| Form field focus | Inputs | Border color transitions to `--brand-primary` with a soft outer glow (`box-shadow`), 150ms |
| Modal open/close | Booking dialogs, RitualKit preview | Scale from 0.95 + fade in; reverse on close |
| Rating stars | Rating submission | Sequential fill animation per star on select, not simultaneous |
| Status badge change | Booking status updates | Cross-fade + slight color-morph rather than instant swap |
| PDF export | Ritual Kit download button | Icon morphs from download → checkmark briefly on success, no toast needed for this specific action |

**Reduced motion:** a single `useReducedMotion()` gate in a shared `MotionProvider` disables all transform/opacity animations app-wide, falling back to instant state changes, per NFR-4.

## 6. Component Notes

- **Admin Catalog Console** should visually differ from Devotee-facing screens — denser tables, `--surface-alt` backgrounds, no large hero imagery — to reinforce that it's a management tool, not a marketing surface.
- **Advisor module** uses `--advisor-accent` for its primary buttons/highlights instead of `--brand-primary`, per §2 — the only place in the app this token appears.
- Status pills (PENDING/CONFIRMED/REJECTED/EXPIRED/CANCELLED/COMPLETED) each map to one of `--warning`/`--success`/`--danger`/`--foreground-muted` consistently across Devotee, Priest, and Admin views — no per-role recoloring.

## 7. Accessibility

- Minimum contrast ratio 4.5:1 for body text against its background at every token pairing above (verify `--brand-accent` on `--background` specifically — it's the tightest pairing).
- All motion respects `prefers-reduced-motion` (§5).
- Focus states are visible (outline or glow) on every interactive element, not just `:hover`.
- Advisor intake form must be fully operable via keyboard and screen-reader labeled, since it's a free-text + form hybrid.
