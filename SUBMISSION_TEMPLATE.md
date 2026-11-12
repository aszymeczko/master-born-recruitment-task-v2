# Submission: Agata Szymeczko

## Time Spent

Total time: **~4 hours** (approximate)

## Ticket Triage

### Tickets I Addressed

1. **CFG-142** (price stuck at $0.00): rewrote the price hook so out-of-order responses are dropped via effect cleanup and `isLoading` is derived from state, not toggled by hand.
2. **CFG-148** (crash on unchecking packaging): dependent add-ons are now removed for every option type, immutably; the summary no longer dereferences a possibly missing add-on.
3. **CFG-147** (broken share links): links are encoded as UTF-8 base64url; old links still decode; the configuration name is restored.
4. **CFG-152** (keyboard navigation): keyboard-operable colour swatches, add-ons selectable with Space, focus styles, labelled switch, focus moved into modals and back to the trigger.
5. **CFG-143** (sluggishness / memory): removed the leaking resize listener; typing a draft name no longer re-runs price, validation and preview.
6. **CFG-151** (technical error messages): plain-language messages with a next step, dismiss/retry actions, readable add-on requirements, copy-link feedback inside the share modal.
7. **CFG-156** (list keys): replaced index/name keys with stable ids (see note below; the ticket's premise didn't reproduce).
8. **CFG-149** (price loading state): resolved as a side effect of CFG-142. The dimming class `.price-loading` already existed and was wired up, it just never got a chance to show because the price never loaded. No extra change needed.
9. **Not a ticket:** added an error boundary inside the widget so a render crash shows a fallback instead of a blank box on the client's page.
10. **Not a ticket, found during the work:** three pre-demo correctness issues. Malformed share links crashed the widget; configurations loaded from a link or draft weren't checked against the product (an unavailable add-on could stay in the displayed price); and the "✓ Configuration validated" indicator showed even for invalid or still-validating configurations.

### Tickets I Deprioritized

| Ticket  | Reason                                                                                                                                                                                                                                                                                                                   |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CFG-158 | The description is inaccurate: `currentConfig` is already wrapped in `useMemo`, and `product` is a module-level constant passed from `App`, so it is never recomputed. Following the "quick win" would change nothing. The real redundant work (draft name keystrokes triggering recalculation) was fixed under CFG-143. |
| CFG-146 | Could not reproduce from the code: both "Last saved" (`Date#toLocaleTimeString`) and the drafts list (`toLocaleString` on an ISO string with `Z`) render in the user's local time zone. Needs a concrete repro (browser, OS time zone, expected vs shown time) before spending time on it.                               |
| CFG-150 | The ticket says it's a JavaScript column calculation issue, but the computed `--color-columns` variable is never used by any CSS rule; the picker is a plain `flex-wrap`. It's a cosmetic CSS fix, and the JS is dead code. Low value before the demo.                                                                   |
| CFG-153 | A 2–3 week feature, it doesn't belong in a stabilisation sprint before a demo.                                                                                                                                                                                                                                           |
| CFG-155 | Nice-to-have. Worth doing after the demo with design tokens (CSS custom properties) so dark mode is a token swap rather than a rewrite.                                                                                                                                                                                  |
| CFG-157 | A new feature rather than a fix. Note: "Discard" currently resets to defaults with no confirmation, so it's worth picking up soon.                                                                                                                                                                                       |

### Tickets That Need Clarification

| Ticket            | Question                                                                                                                                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CFG-144 / CFG-145 | These contradict each other: Product (Sarah) wants Quick Add removed (2% usage, confusing users); Customer Success (Jamie) reports TechStyle says a Quick Add hotkey is "mandatory" for the demo. Is the feature being sunset or showcased? |
| CFG-154           | Is the 50-item tier `>= 50` or `> 50`? And is it 10% (code, CONTEXT.md) or 15% (marketing page per the ticket)?                                                                                                                             |
| CFG-146           | Which browser / time zone, and what was the expected vs displayed time?                                                                                                                                                                     |
| CFG-151           | Should the error reference code be visible to shoppers at all? I kept it as a small "Reference: …" line for support; Product/CS may prefer to hide it.                                                                                      |

### Tickets With a Misleading Priority Label

| Ticket  | Label on board | Your read               | Why                                                                                                                                                                                                                    |
| ------- | -------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CFG-152 | ⚪ Low         | 🔴 Critical / 🟠 High   | Legal flagged that TechStyle's MSA has accessibility clauses; shipping the demo without keyboard support is arguably a breach. Additionally, add-ons could not be selected by keyboard at all (not in the audit list). |
| CFG-158 | 🟠 High        | ⚪ Low / invalid        | Its premise is false (see above).                                                                                                                                                                                      |
| CFG-149 | 🟡 Medium      | Resolved by CFG-142     | The loading state already existed; it was hidden by the CFG-142 bug.                                                                                                                                                   |
| CFG-145 | 🟠 High        | 🧪 Unclear              | Conflicts directly with CFG-144; can't be prioritised until Product decides.                                                                                                                                           |
| CFG-144 | 🟠 High        | 🧪 Unclear              | Same conflict.                                                                                                                                                                                                         |
| CFG-147 | 🔴 Critical    | 🔴 Critical (confirmed) | Marcus's "dev-only flake" theory is wrong: two real encoding bugs, independent of the build setup.                                                                                                                     |
| CFG-156 | 🟡 Medium      | ⚪ Low                  | No missing keys and no React warnings; only key quality issues.                                                                                                                                                        |

### Tickets Where You Stopped to Ask Instead of Implementing

| Ticket            | Who would you ask                                                      | What you'd ask                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CFG-144 / CFG-145 | Sarah (Product) together with Jamie (CS) and TechStyle's account owner | "Are we sunsetting Quick Add or demoing it?" Building the hotkey for a feature we are about to delete, or deleting a feature the prospect wants to see, both waste work and risk the demo. This is a product decision, not an engineering one, so I left Quick Add untouched.                                                                                                                                                                                                                                                                                                                                                                                                       |
| CFG-154           | Sarah (Product) and Finance                                            | "What is the exact boundary (`>= 50` or `> 50`) and rate (10% or 15%) for the top tier?" Both directions have financial impact (under-discounting customers vs. margin loss). The code is internally inconsistent too: the comment says boundary quantities should get the higher discount, `getNextDiscountTier` uses `<` and tells a user at 49 "add 1 more for 10%", yet 50 gets nothing, and the same off-by-one affects the 10-item tier. CONTEXT.md says "50+" and "10-49", which suggests `>=`, but the rate in the ticket (15%) contradicts CONTEXT (10%). I didn't change pricing; it's a one-character fix once the answer is known, and the UI hint must change with it. |

---

## Technical Write-Up

### Critical Issues Found

#### Issue 1: Price never applied

**Ticket(s):** CFG-142 (and CFG-149)

**What was the bug?**

The hook stored `Date.now()` (~1.7e12) as the "latest request" marker, but the mock API returns a request counter (1, 2, 3…) as `timestamp`. `response.timestamp >= latestRequestRef.current` was therefore never true and the price was never set. On top of that, `finally` reset `isLoading` for stale requests too, and the effect omitted `fetchPrice` from its dependencies.

**How did you find it?**

Reading the hook against the API mock, then reproducing it: a headless Chrome script changes size and quantity 10 times quickly and checks the displayed total against the final selection. On the original commit it shows `$0.00` in 5/5 runs; on the branch it shows the correct price for the last selection in 5/5 runs (e.g. 14", qty 11: $999.99 × 11 − 5% = $10,449.90).

**How did you fix it?**

The request runs in an effect whose cleanup flags the previous run as stale, so a late response from an older configuration is dropped regardless of arrival order. The settled result stores the configuration it was computed for; `isLoading` is derived as "the settled result isn't for the current config", so there is no flag for a stale request to clear. The last known price stays on screen (dimmed) while recalculating instead of flashing back to $0.00. `refetch` is kept via a reload token. The unused `useDebouncedPriceCalculation` was removed (it read a stale ref and had its own races).

**Why this approach?**

It doesn't depend on what the API puts in `timestamp`, and it's the standard React pattern. Alternatives: fixing only the comparison with a local counter (smallest diff, but keeps the fragile manual `isLoading`); `AbortController` (better in production because it cancels the network request, but the mock has no `signal`, so it's a follow-up); debouncing (fewer requests, but a slower-feeling price); TanStack Query/SWR (caching and race handling for free, but a dependency in a widget that is meant to be self-contained).

I rejected Marcus's suggestion for CFG-149 (`{isPriceLoading ? '...' : formattedTotal}`): it hides the price on every change and makes the layout jump; dimming the last known price is calmer and was already implemented.

---

#### Issue 2: Crash when unchecking "Include Packaging"

**Ticket(s):** CFG-148

**What was the bug?**

The error comes from the configuration summary, not from pricing: `availableAddOns.get(id)!.price`. Gift Wrap stayed in `selectedAddOns` after packaging was turned off, because the dependent add-on cleanup only ran for `select` options. A comment claimed toggles were handled in `handleAddOnToggle`, but they weren't. The `select` branch also mutated state in place (`splice` followed by `setSelectedAddOns` with the same reference), which React may ignore.

**How did you find it?**

Followed the stack: `reading 'price'` → the only non-null assertion on an add-on lookup → why the id is still selected → the `option.type === 'select'` guard.

**How did you fix it?**

On any option change, add-ons whose dependency is no longer met are removed with a functional, immutable update. The summary looks add-ons up in `product.addOns`, so an unknown or stale id (old draft, edited link) can't crash the render.

**Why this approach?**

Smallest change that fixes the root cause and the state mutation. The remaining gap was configurations that enter from outside the change handlers (share link, saved draft, `initialConfiguration` prop): a link with Gift Wrap but no packaging still priced Gift Wrap. I closed it by validating at those entry points (`sanitizeConfiguration`, see "Other Changes"): since the handlers already keep the invariant, checking where data comes in is enough. The alternative was to derive "effective add-ons" (selected ∩ available) on every render; that's equally valid, but it means touching every place that reads add-ons, and an add-on would silently come back if its dependency were re-enabled.

---

#### Issue 3: Share links failing

**Ticket(s):** CFG-147

**What was the bug?**

Two independent bugs, neither of them a local-build flake:

1. `btoa()` only accepts Latin-1. A name like "Żółć test 🎨" throws `InvalidCharacterError`, so the link can't be generated at all.
2. Standard base64 contains `+` and `/` and was put into the query string unescaped. `URLSearchParams` decodes `+` as a space, so any link whose encoding happens to contain `+` fails to decode, whatever the name. That's why it looked random ("unable to reproduce consistently").

**How did you find it?**

Round-trip test through a real `URL`/`searchParams`: the customer's name throws on the original encoder, and a plain ASCII name whose encoding contains `+` fails on the original decoder.

**How did you fix it?**

Encode the JSON as UTF-8 bytes (`TextEncoder`) in base64url (no `+`, `/` or padding). The decoder also accepts the old format (spaces mapped back to `+`, non-UTF-8 bytes read as Latin-1), so links already shared by customers keep working. The configuration name was encoded but never read back; it's now restored into the draft name field.

**Why this approach?**

It fixes both bugs, keeps the URL format and backwards compatibility, adds no dependency and works in every browser. Alternatives considered:

- `encodeURIComponent(btoa(…))` fixes only the `+` problem.
- The `unescape(encodeURIComponent())` trick relies on deprecated APIs.
- Native `Uint8Array.prototype.toBase64({ alphabet: 'base64url' })` / `Uint8Array.fromBase64` is the cleanest, but it's a recent API for a widget embedded on clients' sites, so it would need this fallback anyway. It's an easy swap later.
- Plain query params or lz-string change the link format (and lz-string adds a dependency).
- The proper long-term solution is server-side short links (store the configuration, put only an id in the URL).

---

#### Issue 4: Keyboard users couldn't configure the product

**Ticket(s):** CFG-152

**What was the bug?**

- Colour swatches were `div`s: not focusable, no keyboard handling, and the focus style was commented out.
- Not in the audit: the add-on checkbox had a no-op `onChange` and the toggle lived on the wrapper's `onClick`, so a keyboard user could focus a checkbox but Space did nothing. No add-on could be selected without a mouse.
- The packaging `role="switch"` had no accessible name.
- Modals never received focus, so Escape only worked after clicking inside. The "return focus" target came from `document.activeElement`, which is `<body>` in browsers that don't focus buttons on click (Safari).

**How did you fix it?**

- Swatches are buttons in the existing radiogroup with a roving tabindex: one Tab stop, arrow keys move and select, each swatch named by its colour label.
- `:focus-visible` outlines for swatches, quantity buttons, add-on checkboxes and the modal close button.
- Add-on rows are `<label>`s and the checkbox's `onChange` toggles the add-on, so clicking anywhere on the row still works.
- The switch is labelled via `aria-labelledby` and respects `readOnly` on keyboard too.
- Modals first got dialog semantics and focus management. In a second pass (`085db7c`) I moved them to native `<dialog>` opened with `showModal()`: the browser makes the page behind inert, keeps Tab/Shift+Tab inside the dialog (the only other stop is the browser UI, which WCAG allows), and closes it on Escape. Backdrop click still closes it, and focus returns to the trigger, captured from the click event (`document.activeElement` is `<body>` in Safari).
- Audit item 4 ("custom dropdown") doesn't apply: the selects are native `<select>` elements.

**Why this approach?**

For the modals I first made the minimal change, then switched to native `<dialog>` once it was clear the missing focus trap was the last keyboard gap and a contractual requirement: the browser gives focus trap, Escape and an inert background, so there's no hand-written trap to maintain. It needs Safari 15.4+ / Chrome 37+ / Firefox 98+, which should be confirmed against our clients' browser support. For the swatches, visually hidden `<input type="radio">` would also be cleaner (arrow keys and semantics for free), but the current buttons work and rewriting them before the demo is risk without benefit. Not done: a colour-contrast audit.

---

#### Issue 5: Sluggishness over time

**Ticket(s):** CFG-143

**What was the bug?**

- The resize listener was never removed. Every mount (StrictMode's double mount in dev, or a host page that remounts the embed) leaves a listener whose closure keeps the old component tree alive. Measured with Chrome DevTools Protocol: 2 resize listeners after mount before, 1 after.
- The draft name was part of `currentConfig`, so every keystroke in the name field re-ran price calculation, validation and preview generation (and dimmed the price while typing).

The ticket's other hypothesis, preview images, didn't hold up: stale preview results are already discarded, and only the final image URL is requested.

**How did you fix it?**

Added the missing `removeEventListener`. Kept the name out of `currentConfig` and added it only where needed (the share link), which also allowed the `onConfigurationChange` effect to depend on the config directly and cleared the last hook-deps lint warning.

**Caveat:** I couldn't reproduce a 20-minute degradation end to end. A likely contributor to what QA saw in DevTools: `App.tsx` logs the full configuration on every change, and with DevTools open the console keeps every logged object alive. That's host demo code, so I left it, but it's worth knowing when profiling.

Alternatives: since `--color-columns` is unused (CFG-150), the resize code could be deleted entirely; if it is kept, a `ResizeObserver` on the container is more correct for an embedded widget than `window.resize`.

---

### Other Changes Made

- **Refactor needed to commit at all** (`7d304e7`): the pre-commit ESLint hook rejects `setState` inside effects, which blocked any commit touching the component. I fixed these instead of silencing them, which also fixed real glitches:
  - `isDirty` is derived by comparing against a snapshot taken on mount, save, load and discard; previously the Discard button was visible from the first render and right after loading a draft.
  - The shared configuration is read in lazy `useState` initialisers, so defaults no longer flash first.
  - `shareUrl` is computed with `useMemo` instead of being copied into state.
  - A failed validation request is no longer swallowed by an empty `catch`.
- **CFG-151:**
  - Error codes map to plain-language messages with a next step (`errorMessages.ts`), with a small "Reference: CODE" line for support and `role="alert"`.
  - Errors can now be dismissed (previously they stayed forever); price errors offer "Try again".
  - Add-on requirements read "(Requires Material: Aluminum)" instead of "(Requires material)".
  - Copy Link confirms success, and failure (common in iframes without clipboard permission) is explained inside the modal instead of in a banner hidden behind it.
- **Error boundary** (`ConfiguratorErrorBoundary`) inside the widget: a friendly fallback with "Try again" and an error log, instead of an empty box on the client's page. The public `ProductConfigurator` export and props are unchanged.
- **CFG-156:** stable ids as list keys instead of indexes and display names.
- **Malformed share links** (`be2e90c`): the decoder trusted the link's JSON, so `"a": 5` crashed the widget (and the error boundary's "Try again" crashed again because the URL is re-read). The decoded shape is now type-checked: selections must be an object of primitives, add-ons an array of strings, quantity a positive integer, name a string. Anything else falls back to defaults.
- **Loaded configurations checked against the product** (`d780e5a`): `sanitizeConfiguration` starts from the product defaults and keeps only selections matching an available choice, known add-ons whose dependency is met, and a quantity clamped to min/max. It's used for share links, drafts (including corrupted localStorage) and the `initialConfiguration` prop.
- **Validation indicator** (`872bf46`): `isValid` was set to `true` on any response and never reset. The status is now derived from the result for the _current_ configuration (validating / valid / invalid with a friendly message), and both cart buttons wait for it. Verified in the browser: validating → validated on load and after each change, Add to Cart disabled in between. I couldn't trigger the invalid state from the UI (after the fixes above, no reachable configuration fails validation), so that branch is checked by type-checking and code review only.

---

## Code Quality Notes

### Things I Noticed But Didn't Fix

| Issue                                                                                                                    | Why I Left It                                                                |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| CFG-154 discount boundary and the "add N more" hint are inconsistent.                                                    | Waiting for the pricing decision.                                            |
| Validation messages from the API contain internal ids ("requires include_packaging to be true").                         | Not shown to users today (only codes are), but they would leak if displayed. |
| Two `any` types in `types.ts` (`ConfigChangeEvent`) fail `pnpm lint`.                                                    | Pre-existing, unused type, unrelated to the tickets.                         |
| Dead code: `roundToCents`, the `--color-columns` calculation, `requestCounter` "for the race condition bug" in the mock. | Harmless; cleanup with CFG-150.                                              |
| No colour-contrast audit (e.g. the red requirement text, light grey hints).                                              | Needs design input; remaining WCAG work after the keyboard blockers.         |
| `App.tsx` `console.log`s every configuration change.                                                                     | Demo host code; it holds memory while DevTools is open.                      |

### Potential Improvements for the Future

1. **Tests:** there are none. Unit tests for `calculatePriceBreakdown`, the share-link encoder/decoder and the price hook's race handling, plus a few Playwright flows (the checks I ran by hand-written scripts during this task).
2. Break up the ~1000-line component (option renderers, price panel, modals, drafts) now that state syncing is cleaner.
3. `AbortController` for price requests; server-side short share links; native radio inputs for colour swatches.
4. Report errors from the error boundary to monitoring (Sentry or similar).
5. i18n for messages, since the widget is embedded on clients' sites in different markets.
6. Tell the user when values from a share link or draft were dropped because they're no longer available. Today `sanitizeConfiguration` resets them silently, so an add-on can disappear without explanation.
7. Extract one hook for "async result for the current configuration": price, validation and preview are three copies of the same pattern (result tagged with its config, stale flag in the effect cleanup). TanStack Query is the off-the-shelf version, if a dependency becomes acceptable.
8. Add a version field to the share-link payload, and possibly a schema library (Valibot/Zod) once it grows, so future format changes don't rely on heuristics like the current legacy `+`/Latin-1 handling.

---

## Questions for the Team

1. Quick Add: sunset (CFG-144) or demo with a hotkey (CFG-145)? Who owns the call?
2. Discount tiers: `>=` or `>`, and 10% or 15%? Is there an original pricing spec?
3. Should shoppers see the error reference code, or should it only go to logs/support?
4. Do we have a monitoring/error-reporting service the widget should report to?
5. Which browsers do our clients' shoppers use? This decides whether native APIs like `Uint8Array.toBase64` and `<dialog>` can be used without fallbacks.

---

## Assumptions Made

1. Existing share links in the wild must keep working, hence the backwards-compatible decoder.
2. The `timestamp` field in the price response isn't a reliable ordering signal (in the mock it's a counter), so the hook doesn't rely on it.
3. While recalculating, showing the previous price dimmed is better UX than a placeholder.
4. "Discard" keeps its current meaning (reset to defaults); only the dirty-state tracking was fixed.
5. The error boundary belongs inside the widget, not the host app, because clients embed the component directly.

---

## Self-Assessment

### What went well?

Root causes were found and proven rather than guessed: the price race test fails on the original commit and passes on the branch; the share-link bugs are reproduced with a round-trip test; the CFG-143 claims are measured before and after. Several tickets turned out to be different from their description (CFG-147, CFG-149, CFG-156, CFG-158), and I documented that instead of following them literally. The history is split into small commits that each build.

### What was challenging?

Separating real problems from misleading ticket details and labels, and deciding where to stop. In particular, I chose to escalate CFG-144/145 and CFG-154 rather than pick an interpretation. With the remaining time, I picked only issues that affect the demo (pre-demo correctness fixes, the modal focus trap) over new features or refactors.

### What would you do differently with more time?

Add automated tests (unit + Playwright) to the repo instead of throwaway verification scripts, and run a colour-contrast audit.

---

## AI Assistance Notes (optional)

I used Claude Code (an AI coding assistant in the terminal) as a pair programmer. The split of responsibilities was deliberate: **the assistant did the reading, reproducing and typing; I owned the decisions and the acceptance of every change.**

### How I worked with it

**1. Analysis and triage before any code.**

- The assistant read the README, CONTEXT, all tickets and the code, and produced root-cause hypotheses with file and line references, a list of tickets whose labels or descriptions looked wrong, and a proposed priority order.
- I compared that analysis with my own conclusions from reviewing the brief and the codebase, and we settled the plan together:
  - the three demo blockers first (CFG-142, CFG-148, CFG-147);
  - then the contractual accessibility work (CFG-152) and the remaining High/Medium items (CFG-143, CFG-151, CFG-156);
  - contradictory tickets (CFG-144/145, CFG-154) escalated instead of implemented;
  - invalid or low-value tickets explicitly deprioritised.

Implementation started only after that.

**2. Plan reviewed along the way.** After the planned tickets I stopped to check the time used and what was still worth doing before the demo. That led to the extra correctness fixes (malformed links, loaded configurations, the validation indicator) and the native `<dialog>` focus trap, and to deliberately not starting new features.

**3. Implementation.** Each ticket went through the same loop:

1. **Root cause first.** The assistant had to explain the bug and point to the exact lines before touching code. Each fix was preceded by a reproduction against the original code; for CFG-142, CFG-147 and CFG-143 the reproduction results are quoted in the Technical Write-Up.
2. **Small change, one commit.** One logical change per commit, with the reasoning in the commit message. Every code commit passed the pre-commit hook (Prettier and ESLint).
3. **My review.** I read each diff and asked for explanations where needed: "show me the changes", "how do I verify this?".
4. **Manual check in the browser** (`pnpm dev`) before moving on: price under fast clicking, the packaging crash, a share link with "Żółć test 🎨", the keyboard-only flows.
5. **Challenge the first answer.** For every significant fix I didn't accept the first proposal as final. I asked for the alternatives ("what other solutions were there, is ours optimal?") and chose the one that best fit our situation. The criteria were:
   - risk right before a client demo;
   - size of the change;
   - no new dependencies in a self-contained embeddable widget;
   - browser support on clients' sites;
   - backwards compatibility (share links already sent to customers).

   Examples:
   - **Share links:** UTF-8 base64url over native `Uint8Array.toBase64` (too new for embedded use), plain query params or lz-string (format change, dependency), and server-side short links (needs a backend).
   - **Price race:** effect cleanup over `AbortController` (the mock has no `signal`) and TanStack Query (a dependency).
   - **Modals:** this is where the comparison changed the outcome. The first, hand-written focus management was replaced by native `<dialog>`, because it closes the focus-trap gap with less code.

   The options considered and the reasons are recorded per issue in the Technical Write-Up.

#### Ground rules I set for the assistant

- Root cause (file:line) before any fix.
- Agreed plan and scope; product and pricing questions escalated, not guessed.
- I review every diff and check it in the app; nothing is pushed without my go-ahead.
- Lint errors are fixed, never disabled; every commit passes the pre-commit hook and type-checks on its own.
- No new dependencies; the public API and existing share links keep working.
- No explanatory comments in code; the "why" goes in commit messages.
- Anything unverified is labelled as such.

**Gaps vs. a team setup:** reproductions were not committed as regression tests, and there is no CI to enforce the gates.

### Prompts (paraphrased)

The prompts followed a consistent structure: context and constraints up front, a planning step, a repeatable loop per ticket, and a scope check. Exploration (options and reproductions) ran in separate assistant sessions before each change was implemented in this repo.

1. **Context and constraints (once):** "Read README, CONTEXT, TICKETS and the code. Budget: 4h before a client demo. Constraints: atomic commits, no new dependencies, keep the public API, no explanatory comments, don't disable lint rules. Don't change code yet."
2. **Analysis and triage (once):** "For each ticket give the root cause with file:line evidence, or say it can't be confirmed. Flag misleading labels and conflicting tickets. Propose priorities, non-goals, and which tickets need a product decision."
3. **Per ticket:**
   - **Options:** "Give 2 approaches for CFG-xxx with trade-offs (demo risk, size, dependencies, browser support, backwards compatibility) and recommend one."
   - **Reproduce:** "Write a reproduction that fails on the current code."
   - **Implement:** "Implement the chosen approach as the smallest change, one commit."
   - **Review:** "Walk me through the diff and review it as a strict senior reviewer."
   - **Verify:** "How do I verify this in the running app? Which edge cases could still break it? What did you not verify?"
4. **Steering (as needed):** "Keep the current solution." / "Document this, don't fix it yet." / "Only the focus trap — it's a contractual requirement."
5. **Scope check (after the planned tickets):** "How much of the budget have we used, and what still matters for the demo?"

### Where it helped most

- Getting through a ~1000-line component quickly and connecting symptoms to causes. The CFG-148 crash comes from the configuration summary, not from pricing as the error message suggests.
- Turning claims into evidence:
  - a round-trip test of share links through a real `URL` object;
  - a headless Chrome race test for CFG-142, run against both the original commit (5/5 show $0.00) and the fix (5/5 correct);
  - Chrome DevTools Protocol counts of resize listeners before and after CFG-143.
- Spotting where ticket descriptions were wrong: CFG-158 was already memoised, CFG-156 had no missing keys, CFG-150 is not a JS issue, CFG-147 is not a build flake.
- Splitting larger changes into reviewable commits.

### Where I overrode it or rejected its suggestions

- **Tests vs. focus trap.** With time left, the assistant recommended adding automated tests as the strongest signal. I chose the native `<dialog>` focus trap instead, because keyboard accessibility is a contractual requirement for the TechStyle demo and tests aren't required by the brief. Tests are listed as the first follow-up.
- **"Values were dropped" notice.** It recommended telling users when values from a share link are discarded. I decided against it for this iteration and documented it as a follow-up.
- **Refactors before a demo.** It proposed deriving effective add-ons, replacing swatch buttons with native radios, and extracting a shared async hook for price, validation and preview. I kept the working, verified fixes and listed these as improvements; rewriting working code right before a demo is risk without user benefit.
- **Scope.** I first decided the malformed-share-link crash would only be documented. Once the planned tickets were done with time left, I prioritised it, together with two other pre-demo correctness issues (loaded configurations not checked against the product, a misleading "validated" indicator).
- **Contradictory tickets.** For CFG-144/145 and CFG-154 the decision was to escalate rather than pick an interpretation. These are product and finance decisions, not engineering ones.

### What the AI got wrong, and how it was caught

- **A regression it introduced.** Its first CFG-142 fix put the draft name into the config that drives pricing, so every keystroke in the name field re-ran the price calculation. Caught during the CFG-143 investigation and fixed there (`b9c751d`).
- **A test that proved too little.** Its first race check compared the displayed total with the breakdown. Both come from the same response, so the check couldn't detect a stale price. It was replaced with a check against the final selection and run against the original commit to show it actually detects the bug.
- **Wrong test assumptions, not product bugs.** Each was investigated before being dismissed:
  - an add-on assumed to be unavailable by default (the default material already satisfied it);
  - headless Chrome allowing clipboard access without permission;
  - after the switch to native `<dialog>`, a selector looking for `role="dialog"` (the role is implicit);
  - a focus-trap criterion that didn't account for the browser UI being a legitimate Tab stop.
- **One scripted multi-file edit aborted on an ambiguous match.** It was checked that nothing had been written before retrying with a narrower change.

### What I verified myself and what remains unverified

- Verified manually in the browser:
  - correct prices under rapid changes;
  - no crash when unchecking packaging;
  - share links with Polish characters and emoji, including the restored name;
  - full keyboard navigation: swatches, add-ons, switch, Escape and focus return in modals;
  - the Discard button behaviour.
- Verified with throwaway headless-Chrome scripts (not committed): all of the above, malformed links and corrupted drafts, the error banner and copy-link feedback (with forced failures), the dialog focus trap, and no console errors.
- **Not verified in a running app:**
  - the price "Try again" path, because the mock API never fails;
  - the "invalid configuration" indicator state, which no reachable configuration triggers after the fixes.

  Both were checked only by type-checking and code review.

---

## Additional Notes

- Branch: `fix/demo-blockers`; one commit per logical change, and every commit type-checks on its own.
- `pnpm build` passes. `pnpm lint` reports only the two pre-existing `any` errors in `types.ts`.
