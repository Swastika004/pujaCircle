# Software Requirements Specification (SRS)
## PujaCircle — Sankalp Advisor Update

**Repo path:** `docs/01-product/SRS.md`
**Version:** 2.0
**Phase:** Frontend-only, single-file mock data (no live backend)

---

## 1. Scope

This SRS covers all devotee-, priest-, and admin-facing functionality implementable against a single static mock data source, including the new Sankalp Advisor and expanded Admin Catalog Console. It supersedes the booking-only scope of v1.0 by adding Advisor-related requirements while keeping all existing booking requirements in force.

## 2. Definitions

- **Advisor**: the intent → recommendation → ritual kit flow.
- **Catalog**: the set of puja entries (purpose, deity, samagri, steps, tags) that the Advisor matches against.
- **Ritual Kit**: the personalized samagri list + steps + sankalp text generated for a devotee.
- **Mock Data File**: the single TypeScript file (`src/mocks/data.ts`) that is the sole source of seed data for this phase.

## 3. User Roles & Permission Matrix

| Capability | Devotee | Priest | Admin |
|---|:---:|:---:|:---:|
| Register / login (mocked OTP) | ✅ | ✅ | ✅ (seeded, no self-registration) |
| ~~Complete ritual profile (gotra, nakshatra, DOB)~~ *(Devotee name only)* | ✅ | ❌ | ❌ |
| Run Advisor flow | ✅ | ❌ | ❌ (can preview as QA, see FR-19) |
| ~~Upload horoscope image for auto-fill~~ *(Superseded: removed)* | ❌ | ❌ | ❌ |
| Download Ritual Kit PDF | ✅ | ❌ | ❌ |
| Browse priests / book puja | ✅ | — | — |
| Accept / reject booking within 5-hour window | — | ✅ | — |
| Set own pricing per service | — | ✅ | — |
| View own bookings & ratings | — | ✅ | — |
| Approve / reject priest applications | ❌ | — | ✅ |
| CRUD puja catalog entries | ❌ | ❌ | ✅ |
| Edit intent-tag mappings used by Advisor matching | ❌ | ❌ | ✅ |
| View Advisor recommendation logs (mock) | ❌ | ❌ | ✅ |
| Manage users (suspend/reinstate) | ❌ | ❌ | ✅ |

## 4. Functional Requirements

### 4.1 Authentication (mocked, unchanged behavior from v1.0)
- **FR-1**: System shall simulate OTP-based login for Devotee and Priest roles against mock credentials.
- **FR-2**: System shall provide a fixed Admin login (seeded credentials, no self-registration path).

### 4.2 Devotee Ritual Profile
> [!NOTE]
> **Superseded in this update (Scope-Reduction Pass):** All astrology-dependent profile fields (gotra, nakshatra, DOB) and client-side horoscope OCR (FR-5) have been removed. Devotee personalization is strictly devotee-name-based.

- **FR-3** *(Superseded)*: ~~System shall let a Devotee create/edit a ritual profile: full name, gotra, nakshatra, date of birth.~~ Devotee profile now retains full name only for sankalp personalization.
- **FR-4**: System shall persist the ritual profile in mock in-memory/localStorage-equivalent state for the session (no real DB this phase).
- **FR-5** *(Superseded)*: ~~System shall allow uploading a horoscope image and attempt client-side OCR extraction of nakshatra/gotra, pre-filling the form fields for user confirmation.~~ *(Removed in scope reduction)*.

### 4.3 Sankalp Advisor
- **FR-6**: System shall present a guided intake (free-text situation description plus optional structured filters: occasion, concern type, urgency).
- **FR-7**: System shall match the devotee's intake against the Puja Catalog using tag-overlap scoring (mocked matching function, deterministic and data-driven — not hardcoded per-scenario).
- **FR-8**: System shall display the top 3 matches ranked by score, each with a visible reasoning line (e.g., "Matched: house purchase, Vastu concern").
- **FR-9**: Devotee shall be able to select a match and view its full detail (deity, significance, samagri list, step sequence, ideal timing note).
- **FR-10**: System shall generate a Ritual Kit: samagri checklist, numbered steps, and a sankalp paragraph templated with the devotee's name (gotra and nakshatra removed in scope reduction).
- **FR-11**: System shall allow exporting the Ritual Kit as a PDF.
- **FR-12** *(Superseded)*: ~~System shall display a static "auspicious timing" note per puja from a mock tithi lookup table, clearly labeled as approximate/reference-only this phase.~~ System now displays a plain static authored tradition timing note per puja entry without astrological or tithi calculation.
- **FR-13**: If no catalog entry scores above a minimum threshold, system shall show a graceful "no strong match" state with the closest 1–2 suggestions rather than an empty result.

### 4.4 Booking Flow (existing, unchanged requirements carried forward)
- **FR-14**: Devotee can browse priests filtered by service/location/price.
- **FR-15**: A puja selected from Advisor results shall pass its type as a filter into the priest listing view (query param), without modifying the listing component's core logic.
- **FR-16**: Booking status shall follow PENDING → CONFIRMED/REJECTED/EXPIRED/CANCELLED → COMPLETED.
- **FR-17**: Ratings (1–5 stars) may only be submitted by the devotee on a COMPLETED booking.

### 4.5 Admin
- **FR-18**: Admin shall have full CRUD on Puja Catalog entries: name, deity, description, intent tags, samagri list, steps, timing note.
- **FR-19**: Admin shall be able to run the Advisor in a "preview" mode using arbitrary test input, to QA matching quality without affecting devotee data.
- **FR-20**: Admin shall retain existing v1.0 capabilities: priest approval/rejection, user management.
- **FR-21**: Admin edits to the Catalog shall be reflected in Advisor results immediately within the session (data-driven, no rebuild required, though a full app reload is acceptable given single-file mock storage).

## 5. Non-Functional Requirements

- **NFR-1 (Consistency)**: All mock data shall originate from exactly one file (`src/mocks/data.ts`); no component may define inline seed data.
- **NFR-2 (No regression)**: All existing mock test suites (11 suites, 33 tests per README) shall continue to pass after the data consolidation.
- **NFR-3 (Performance)**: Advisor matching against a 30–50 entry catalog shall resolve client-side in under 200ms (trivial given in-memory scoring).
- **NFR-4 (Accessibility)**: All interactive elements meet WCAG 2.1 AA contrast; animations respect `prefers-reduced-motion`.
- **NFR-5 (Portability)**: Frontend shall build and deploy on Vercel/Netlify free tier with zero backend dependency this phase.
- **NFR-6 (Type safety)**: All mock data and Advisor logic shall be fully typed (TypeScript interfaces, no `any`).
- **NFR-7 (Honesty in demo)**: UI copy shall not claim "AI-powered" or "machine learning" for the mocked matching logic; acceptable framing is "smart recommendation" or "guided advisor," reserving "AI" language for the Phase 2 real implementation.

## 6. Advisor Test Scenarios (for QA / viva demo)

1. "I just bought a new flat" → Griha Pravesh—type match.
2. "My exams are coming up and I'm anxious" → Saraswati/success-oriented puja.
3. "Recurring bad luck, nothing is working out" → Dosha-nivaran category.
4. "Starting a new business next month" → Business/prosperity puja.
5. "It's my father's death anniversary" → Shraddha/ancestral rites.
6. "Planning my daughter's wedding" → Marriage-related puja.
7. Vague input ("I don't know, just bless my family") → graceful fallback suggestion.
8. Conflicting/multi-intent input → top-3 ranked list showing genuine score separation, not ties.

## 7. Data Model (mock entities — see TRD §4 for full TypeScript interfaces)

- `User` (Devotee/Priest/Admin, role-discriminated)
- `RitualProfile`
- `PujaCatalogEntry`
- `Booking`
- `Rating`
- `AdvisorQuery` (logged for Admin preview review)

## 8. Constraints

- No backend calls of any kind in this phase — a reviewer disconnecting the network should see zero functional change.
- Existing repo file boundaries (per README status table) are not to be restructured beyond the mock-data consolidation explicitly required.
