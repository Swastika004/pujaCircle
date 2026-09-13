# Product Requirements Document (PRD)
## PujaCircle — Sankalp Advisor Update

**Repo path:** `docs/01-product/PRD.md`
**Version:** 2.0 (supersedes v1.0)
**Status:** Active — Current Phase: Frontend + Mock Data Only

---

## 1. Change Summary (v1.0 → v2.0)

| Area | v1.0 | v2.0 |
|---|---|---|
| Core value prop | Book a verified priest for a puja | Know **which** puja you need, then book a verified priest |
| Backend | Express/Drizzle scaffold, Supabase target | **Deferred.** Current phase is frontend-only, single mock data file |
| New feature | — | **Sankalp Advisor**: intent-based puja recommendation + personalized ritual kit |
| Roles | Devotee, Priest, Admin | Unchanged — Devotee, Priest, **Admin** (scope expanded, see §5) |
| Design | Functional shadcn/ui, no motion spec | Modern palette + typography system + **Framer Motion** micro-interaction spec |

This document does not replace the original PujaCircle booking scope — it adds the Advisor as a first-class module and formally freezes the current phase to frontend + mock data, per mentor direction.

---

## 2. Problem Statement

Across every existing player in this space (puja booking marketplaces surveyed: PujaServices, VedaMandir, OnlinePathPuja, UtsavApp, PujaDukaan, GharMandir, Yatradham, GoPuja, 99Pandit, OnlinePuja), the product assumes the devotee already knows which puja they need. In practice, most users arrive with a life situation ("bought a new house," "exams coming up," "recurring bad luck") and no clear idea which ritual, deity, date, or materials apply. Existing platforms solve *booking*, not *decision-making*, and none personalize the ritual itself (sankalp, samagri list) to the individual devotee.

> [!NOTE]
> **Superseded in this update (Scope-Reduction Pass):** All astrology-dependent functionality (gotra, nakshatra, DOB collection, horoscope OCR upload, and computed tithi/panchang timing lookups) has been removed from scope. Ritual personalization is now strictly devotee-name-based, and puja timing notes are static authored tradition strings.

## 3. Goals

- **G1:** Let a devotee describe a real-life situation in plain language and receive a reasoned, ranked puja recommendation.
- **G2:** Generate a personalized ritual kit (samagri checklist, step sequence, sankalp text with the devotee's own name; ~~gotra/nakshatra superseded~~).
- **G3:** Preserve the existing, already-built booking/priest/admin flow without regression.
- **G4:** Ship a frontend-complete, mock-data-driven demo this phase; defer live backend/AI to Phase 2.

## 4. Non-Goals (this phase)

- No real database, no real authentication, no real payments.
- No live LLM or embedding API calls — advisor logic is rule-based against mock data.
- No mobile app, no GPS/live tracking, no e-commerce samagri delivery (unchanged from v1.0 constraints).
- Astrology calculations, gotra/nakshatra profiling, horoscope OCR, and astronomical tithi computations (removed in scope reduction).

## 5. User Roles

| Role | Summary | New responsibilities in v2.0 |
|---|---|---|
| **Devotee** | Books pujas, uses the Advisor | Can run the Advisor flow, download a personalized ritual kit PDF (horoscope OCR upload superseded) |
| **Priest (Purohit)** | Offers services, accepts/rejects bookings | Unchanged from v1.0 |
| **Admin** | Approves priests, manages users | **Expanded:** curates and moderates the Puja Catalog (add/edit/retire entries, edit tag mappings that drive Advisor matching), reviews Advisor recommendation logs for accuracy, manages featured/seasonal pujas |

Admin's expanded scope is the anchor for "must contain role of admin" — the catalog that powers the Advisor is admin-curated content, not devotee-editable, which is both realistic (quality control) and gives Admin a meaningfully larger role than pure user/priest approval.

## 6. Key Features (this phase, mock-data)

### P0 — Must ship
1. **Sankalp Advisor flow**: free-text or guided-question intent capture → ranked puja matches with visible reasoning → detail view.
2. **Personalized Ritual Kit**: samagri list, step sequence, sankalp paragraph templated with devotee profile name; exportable as PDF.
3. ~~**Devotee ritual profile**: name, gotra, nakshatra, DOB~~ *(Superseded: simplified to devotee name only)*.
4. **Admin Catalog Console**: CRUD on puja catalog entries and their intent tags, from a single mock data source.
5. **Unmodified booking flow**: existing devotee/priest/admin booking pages continue to function against the (now consolidated) mock data file.

### P1 — Nice to have this phase
6. ~~Horoscope image upload with client-side OCR auto-fill of nakshatra/gotra fields~~ *(Superseded: removed in scope reduction)*.
7. ~~Auspicious date badge computed from tithi lookup~~ *(Superseded: static authored tradition notes used instead)*.

## 7. Success Metrics (demo/viva framing)

- Advisor produces a distinct, reasoned recommendation for at least 8 realistic test scenarios (see SRS §6 test scenarios).
- Admin can add a new puja catalog entry and see it appear in Advisor results without a code change (data-driven, not hardcoded).
- Zero regressions in existing booking/priest/admin flows — verified against the existing 11-suite mock test runner.

## 8. Phase 2 (explicitly out of scope now, documented for continuity)

Real Supabase Postgres + pgvector-based semantic matching, real tithi/panchang astronomical calculation, live LLM call for sankalp phrasing, real OTP auth, real priest payment/dakshina logging. See TRD §7 for target architecture.

## 9. Assumptions & Dependencies

- Puja catalog content (30–50 entries) is originally written by the team, not scraped from competitor sites (copyright + differentiation).
- Framer Motion is added as a new frontend dependency; no backend dependency changes this phase.
- Mentor sign-off constraint ("frontend + single mock file") is treated as a hard constraint for grading, not a suggestion.
