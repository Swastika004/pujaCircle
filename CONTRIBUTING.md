# Contributing to PujaCircle 🕉️

First off, thank you for considering contributing to PujaCircle! We welcome contributions to make traditional Vedic rituals accessible, authentic, and modern.

Please take a moment to review this document to ensure a smooth and effective collaboration process.

---

## 📜 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Architectural Principles & Boundaries](#architectural-principles--boundaries)
3. [Local Development Setup](#local-development-setup)
4. [Branching Strategy & Workflow](#branching-strategy--workflow)
5. [Commit Conventions](#commit-conventions)
6. [Pull Request Process](#pull-request-process)
7. [Testing & Quality Assurance](#testing--quality-assurance)

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please report any violations or concerns to the project maintainers.

---

## Architectural Principles & Boundaries

Before designing features or making pull requests, please respect the core domain boundaries established for PujaCircle:

1. **Web-First Responsive Design**: Optimized for desktop and mobile web (zero native app overhead).
2. **Offline Cash Dakshina**: Direct cash settlement between devotee and priest after ceremony completion. No online payment gateways or escrows.
3. **Immutable Price Snapshots**: Service prices are locked at booking submission to prevent retroactive disputes.
4. **Strict Schema Validation**: All request and response payloads must adhere to Zod validation boundaries (`.strict()`).
5. **No Direct Mock DB Access in UI**: UI components must consume services via API abstractions (`src/api/*.api.ts`), never importing mock DB data directly.

---

## Local Development Setup

### Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/subx6789/pujaCircle.git
   cd pujaCircle
   ```

2. **Install dependencies:**
   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   npm install --prefix frontend

   # Install backend dependencies
   npm install --prefix backend
   ```

3. **Configure environment files:**
   ```bash
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   ```

4. **Start local development servers:**
   ```bash
   # Start frontend only (with mock API mode)
   npm run frontend

   # Or run both frontend and backend concurrently
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

---

## Branching Strategy & Workflow

We follow standard Git feature branching:

- `main`: Production-ready branch.
- `develop`: Integration branch for upcoming releases.
- Feature branches: `feat/<feature-name>` or `fix/<bug-name>`.

### Working on a Change:
1. Create a branch off `main` or `develop`:
   ```bash
   git checkout -b feat/my-new-feature
   ```
2. Make your changes with focused, modular commits.
3. Verify type safety and tests locally before pushing.

---

## Commit Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` A new user-facing or platform feature
- `fix:` A bug fix
- `docs:` Documentation updates only
- `style:` Code style/formatting changes that do not affect logic
- `refactor:` Code restructuring without changing behavior
- `test:` Adding or updating tests
- `chore:` Maintenance, package updates, or tooling configuration

**Example:**
```bash
git commit -m "feat(booking): implement 5-hour SLA countdown timer"
git commit -m "fix(address): resolve postal pincode lookup failure"
```

---

## Pull Request Process

1. **Keep PRs focused**: Address one feature or bug per pull request.
2. **Ensure Clean Checks**:
   ```bash
   # Linting and TypeScript verification
   npm run lint

   # Frontend production build verification
   npm run build

   # Mock API verification suite
   npm run test:mock
   ```
3. **Fill out the Pull Request Template**: Describe what changes were made, how they were tested, and link any related issues.
4. **Code Review**: At least one maintainer review is required before merging.

---

## Testing & Quality Assurance

All PRs undergo automated checks in GitHub Actions:
- **TypeScript strictness** with zero compiler errors (`tsc --noEmit`)
- **Bundle build integrity** with Vite
- **Mock system verification** simulating auth, booking lifecycle transitions, ratings, and admin moderation

Thank you for helping build PujaCircle! 🕉️
