# Technical Requirements Document (TRD)
## PujaCircle — Sankalp Advisor Update

**Repo path:** `docs/03-architecture/TRD.md`
**Version:** 2.0
**Current phase:** Frontend + single-file mock data. No backend calls.

---

## 1. Current-Phase Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     React 19 + TS + Vite                 │
│                                                            │
│  ┌───────────────┐   ┌──────────────┐   ┌──────────────┐ │
│  │  Devotee UI   │   │  Priest UI   │   │  Admin UI    │ │
│  │  (unchanged)  │   │ (unchanged)  │   │ (+ Catalog)  │ │
│  └───────┬───────┘   └──────┬───────┘   └──────┬───────┘ │
│          │                  │                  │          │
│  ┌───────┴──────────────────┴──────────────────┴───────┐ │
│  │              Advisor Module (NEW, isolated)          │ │
│  │   Intake → Matching Engine → Ritual Kit → PDF export │ │
│  └───────────────────────┬───────────────────────────────┘ │
│                          │                                 │
│  ┌───────────────────────┴───────────────────────────────┐ │
│  │        Mock API Layer (thin wrapper, unchanged shape) │ │
│  │        Adds artificial delay, simulates responses     │ │
│  └───────────────────────┬───────────────────────────────┘ │
│                          │                                 │
│  ┌───────────────────────┴───────────────────────────────┐ │
│  │     src/mocks/data.ts   ← SINGLE SOURCE OF TRUTH      │ │
│  │  users[] priests[] bookings[] pujaCatalog[] ratings[] │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

No network calls leave the browser this phase. Backend (`backend/`) remains scaffolded but unused/unwired.

## 2. Consolidation of Mock Data (the one real edit to the existing repo)

**Before:** `frontend/src/mocks/` contained a mock DB, separate mock API modules, delay simulation, and an 11-suite test runner across multiple files (per README).

**After (this update):**
- `src/mocks/data.ts` — the *only* file containing seed arrays (`users`, `priests`, `pujaServices`, `bookings`, `ratings`, `pujaCatalog`, `advisorTagRules`). No other file defines seed data.
- Existing mock API wrapper files are kept, but refactored to **import from** `data.ts` rather than defining their own fixtures. Their function signatures (what components call) do not change — this is why booking/priest/admin pages need no edits.
- Existing 11-suite test runner is updated only at the import line (`from './data'`), not at the assertion level. All 33 tests must still pass.

This satisfies the mentor's constraint literally (one data file) without discarding the working mock engine or forcing changes to already-built pages.

## 3. New Folder Additions (additive only)

```
frontend/src/
├── mocks/
│   └── data.ts                      # consolidated single source of truth
├── components/
│   └── advisor/                     # NEW
│       ├── IntakeForm.tsx
│       ├── MatchResultCard.tsx
│       ├── RitualKitView.tsx
│       ├── HoroscopeUpload.tsx      # Superseded: removed in scope reduction pass
│       └── AdvisorPreviewPanel.tsx  # admin-only, reuses IntakeForm
├── pages/
│   ├── advisor/                     # NEW
│   │   ├── AdvisorIntakePage.tsx
│   │   └── AdvisorResultPage.tsx
│   └── admin/
│       └── AdminCatalogPage.tsx     # NEW — CRUD on pujaCatalog
├── lib/
│   ├── advisorMatching.ts           # NEW — scoring/ranking function
│   └── pdfExport.ts                 # NEW
├── types/
│   └── advisor.ts                   # NEW — PujaCatalogEntry, AdvisorQuery, RitualProfile
└── motion/
    └── variants.ts                  # NEW — shared Framer Motion variants (see DESIGN.md)
```

## 4. Mock Data Schema (TypeScript, illustrative)

```typescript
// types/advisor.ts

export interface PujaCatalogEntry {
  id: string;
  name: string;
  deity: string;
  description: string;
  intentTags: string[];        // e.g. ["new-home", "vastu", "prosperity"]
  samagriList: string[];
  steps: string[];
  timingNote: string;          // static reference text this phase
  category: "life-event" | "dosha-nivaran" | "festival" | "business" | "ancestral";
}

// Superseded: gotra, nakshatra, dob removed in scope reduction pass; name retained for sankalp
export interface RitualProfile {
  fullName: string;
}

export interface AdvisorQuery {
  id: string;
  rawInput: string;
  structuredFilters?: { occasion?: string; concern?: string; urgency?: "low" | "medium" | "high" };
  matchedEntryIds: string[];   // top-N, in rank order
  scores: number[];
  timestamp: string;
}
```

## 5. Matching Engine (mocked, deterministic — the honest description for NFR-7)

`lib/advisorMatching.ts` performs:
1. Tokenize `rawInput` (lowercase, strip stopwords).
2. Score each `PujaCatalogEntry` by tag-overlap count against a static keyword→tag lookup table (`advisorTagRules` in `data.ts`), weighted by `structuredFilters` if provided.
3. Sort descending, return top 3 with score and a human-readable reason string built from which tags matched.
4. If top score is below threshold, return the fallback path (FR-13).

This is explicitly a rules-based, explainable engine — not machine learning. It is designed so that swapping `advisorMatching.ts`'s internals for a real pgvector similarity call in Phase 2 requires no change to any component that consumes it (same function signature: `matchPuja(query): AdvisorQuery`).

## 6. Framer Motion — Technical Approach

- Add `framer-motion` as the sole new frontend dependency for this update.
- Centralize variants in `motion/variants.ts` (fadeInUp, staggerContainer, cardHover, modalTransition) — components import variants, they don't define ad hoc animation objects inline, to keep motion consistent and reviewable in one place.
- Respect `prefers-reduced-motion` via a single `useReducedMotion()` check wrapped in a `MotionProvider`, not scattered per-component checks.
- Page-level transitions on route change (Advisor intake → result) use `AnimatePresence` with exit/enter variants.
- Micro-interactions: button press scale, card hover lift, staggered list reveal for Advisor match results, skeleton→content crossfade for the mocked "thinking" delay (reused from existing delay-simulation pattern, now given a visible loading animation instead of a blank wait).

Full interaction-by-interaction spec is in `DESIGN.md` §5 — this section only fixes the technical implementation pattern.

## 7. Phase 2 Target Architecture (not built now — documented for continuity and viva Q&A)

```
React 19 (Vercel)  →  Express + TS (Render/Fly.io free tier)  →  Supabase Postgres
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
          pgvector similarity   Tithi/Panchang calc   Gemini free-tier API
          (real embeddings,     (own TS algorithm,     (final sankalp phrasing
           replaces tag rules)   no external call)      only — last-mile step)
```

- `advisorMatching.ts`'s function signature is preserved; its implementation swaps from tag-overlap to a Supabase RPC call doing cosine similarity over `pgvector` columns.
- `data.ts` seed arrays become the initial Supabase seed/migration data — not thrown away, migrated.
- Real OTP auth replaces mocked auth; JWT/session handling per existing scaffolded middleware.
- No changes anticipated to Devotee/Priest/Admin UI components — the mock API layer's replacement with real HTTP calls is the only swap, by design (see §5).

## 8. Deployment (this phase)

- Frontend: Vercel or Netlify free tier, static build, zero environment secrets required (no backend to connect to).
- CI: existing `.github/ci.yml` extended to run the consolidated mock test suite; no deployment step changes needed since there's no backend to deploy yet.
