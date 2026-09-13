## 📌 Summary of Changes

A concise description of the changes introduced in this pull request and the rationale behind them.

---

## 🔗 Related Issues

Closes #
Fixes #
Related to #

---

## 🛠️ Type of Change

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update
- [ ] 🎨 Code styling or refactoring (no functional changes)
- [ ] ⚙️ Tooling / CI / CD workflow update

---

## 🏛️ Architectural & Domain Guardrails

Please confirm adherence to PujaCircle's core principles:
- [ ] **Web-First**: Responsive across mobile, tablet, and desktop viewports (zero native app dependencies).
- [ ] **Offline Cash Dakshina**: Preserves cash-on-completion settlement (no third-party online payment gateways).
- [ ] **Immutable Price Protection**: Booking price snapshots remain authoritative and locked.
- [ ] **Boundary Strictness**: Schema validations use `.strict()` with sanitized error messages.
- [ ] **API Decoupling**: UI components consume `src/api/*`, no direct mock store modifications.

---

## ✅ Quality & Verification Checklist

- [ ] `npm run lint` passes with 0 errors and 0 warnings.
- [ ] `npm run build` succeeds cleanly.
- [ ] `npm run test:mock` passes all verification checks.
- [ ] Manually tested on mobile (375px) and desktop (1280px+) viewport widths.
- [ ] All new and existing unit/integration tests pass.

---

## 📸 Screenshots / Demos (If Applicable)

| Before | After |
| :---: | :---: |
| _Screenshot / GIF_ | _Screenshot / GIF_ |
