# AgraVeda

A polished emergency-department load and patient-flow operational decision-support demo, using React 19, TypeScript, TanStack Start, Tailwind v4, lucide-react and Recharts.

**Operational decision support — not clinical advice.** All operational records are synthetic. No customer testimonials, partner endorsements, clinical outcomes or compliance certifications are asserted.

## Run

```sh
bun install
bun run dev
bun run test
bun run build
```

## Routes

- `/`: photo-led public landing.
- `/product`, `/how-it-works`, `/for-hospitals`, `/security`, `/contact`: public product and evaluation information.
- `/privacy`, `/terms`: demo notices, requiring legal review for production.
- `/login`, `/signup`: integration-ready forms and clearly labelled demo role selection. Email sign-in, signup, reset and Google are not active; no false success or email delivery.
- `/app`: demo access boundary, then operational Overview.
- `/app/forecast`, `/app/patient-flow`, `/app/resources`, `/app/scenarios`, `/app/what-if`, `/app/decisions`, `/app/data-quality`: connected operational views.
- `/app/access-denied`: demo role-access explanation.

## Original calculations

The six engines from https://github.com/Haresh-kumar28/AgraVeda are preserved under `src/engines`. The shared pipeline is: editable SimulationInputs → effective EDRecord → forecast → pressure → bottlenecks → recommendations → isolated what-if comparison. Quality assessment runs against the synthetic history.

Only strict-TypeScript empty-array guards and typed cleaning assignments were added to engines. The synthetic generator is reproducible with seed 42 and a fixed UTC fixture ending 10 October 2026; it must never be presented as live data. Original forecast horizons are **1, 2, 3, 4 and 6 hours**, not a newly invented 24-hour model. Confidence is qualitative; MAE/RMSE are the original synthetic model metrics, not validation claims.

Original limitations remain visible: diagnostic capacity is fixed at 10 in the engine; the previously ineffective diagnostic input is intentionally disabled. Nurses 1:4 and doctors 1:6 are modeling assumptions, not clinical standards. Outbreak/custom use normal historical forecast patterns with adjusted inputs. The original simulator can differ from baseline even with zero adjustments because it uses separate projection formulas; reset clears adjustments, not this modeling behavior.

Additional preserved limitations: departures are tied to arrivals; staffing utilization divides by required rather than available staffing; bed availability uses a legacy 85% occupied-bed adjustment and required beds use 90% of projected occupancy. MAE/RMSE backtesting includes target arrivals as inputs and is therefore not an independent validation. These limitations are surfaced, not silently replaced with new medical modeling. Editing total bed capacity recomputes availability consistently; reset restores the original synthetic fixture.

## Demo authentication and role model

`src/features/auth.tsx` exposes AuthService and AuthProvider. Demo sessions contain only name, role and `mode: demo`, stored in sessionStorage for the browser tab. Passwords and registration values are never persisted. The email forms explicitly return unconfigured errors. Google is disabled and labelled coming soon. Password reset does not claim to send mail.

No real authentication provider or backend is connected. The `/app` layout renders an explicit demo-access screen without a session. SectionAccess prevents restricted operational controls from rendering; sidebar and search follow the same model. **Client-side demo roles are not a secure production authorization boundary.** No private data exists here.

- Hospital Administrator / ED Operations Lead: all eight sections.
- Doctor / Clinician / Nurse Care Coordinator: Overview, Patient flow, Decisions.
- Data Analyst: Overview, Forecast, Patient flow, Scenarios, What-if, Data quality.

### Production integration steps

1. Connect Lovable Cloud and verified authentication. Replace AuthService with validated session, sign-in, signup, reset, sign-out and OAuth implementations; add server-side session enforcement.
2. Store full name, organization and role in reviewed user/organization tables. Never accept a self-selected signup role as a privileged grant. Roles must be authorized by the hospital, with tenant isolation and row-level/server permissions.
3. Implement confirmation, recovery/reset page, invitation and role-approval workflows. Enable providers correctly. Do not simply activate the demo form.
4. Connect reviewed, validated aggregate hospital data; replace synthetic fixtures with authenticated reads. Add audits, retention, monitoring, secrets management and security review.
5. Calibrate and validate the model locally. Review staffing assumptions, clinical governance, privacy policy, terms and any compliance obligations. Do not use the demo for live care decisions.

The public hero is illustrative generated healthcare imagery, not a real physician endorsement. No SmartCare screenshot was available in the workspace; the supplied written design direction was used. Contact information is intentionally unconfigured rather than fabricated.

## Verification

Tests cover the original horizons, reproducible synthetic fixtures, shared input recalculation, surge preset, computed what-if changes, quality handling and demo role restrictions. Browser verification covers public landing, all operational sections, controls, mobile navigation, overflow and role denial.
