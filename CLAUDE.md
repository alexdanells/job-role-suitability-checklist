# Job Role Suitability Checklist

## Project purpose
A form/checklist completed by employers on behalf of apprentices at the point of UK apprenticeship enrolment. The employer confirms the level of exposure and frequency of exposure to criteria required by the apprenticeship standard, determining whether the role can satisfy the necessary learning outcomes and whether the apprenticeship should proceed.

This is a Tess Group tool — deployed as a static GitHub Pages site, no backend.

---

## Stack
- **HTML** — single entry point: `index.html`
- **CSS** — all styles in `style.css`
- **JavaScript** — all logic in `app.js`
- **LocalStorage** — per-standard state persistence (no backend, no database)
- **Hosting** — GitHub Pages, `main` branch root

## File rules
- Everything lives in exactly **three files**: `index.html`, `style.css`, `app.js`
- Do NOT add any libraries or CDN scripts without explicit approval
- Do NOT create additional JS/CSS files
- Do NOT introduce a build tool, bundler, or package manager

## How the app runs
Alex opens `index.html` directly in a browser (file:// or the GitHub Pages URL). After any change, Alex refreshes the page manually. There is no dev server.

---

## Repository
- **GitHub:** `alexdanells/job-role-suitability-checklist`
- **Live site:** `https://alexdanells.github.io/job-role-suitability-checklist/`
- **GitHub Pages:** enabled from `main` branch root
- Always commit and push after changes so the live site stays current

---

## User profile
Alex (alex.danells@thetessgroup.com) has built similar HTML/CSS/JS/LocalStorage apps on GitHub Pages before. Treat Alex as a non-developer — explain steps clearly, flag anything requiring manual browser or GitHub action, and avoid jargon without explanation. Alex refreshes `index.html` manually after each change is confirmed done.

---

## What has been built

### Navigation
Two-row sticky navigation bar:
- **Row 1 (categories):** Data | AI & Automation | Digital Marketing | Cyber Security | Accountancy
- **Row 2 (standards):** updates dynamically to show the standards within the selected category
- Clicking a category defaults to its first standard; clicking a standard loads its checklist

### Standards implemented (fully working checklists)

| Standard | Code | Version | LocalStorage key |
|---|---|---|---|
| Level 4 Data Analyst | ST0118 | v1.1 | `jrsc_l4-data-analyst` |
| Level 3 Data Technician | ST0795 | v1.2 | `jrsc_l3-data-technician` |
| Level 3 Multi-channel Marketer | ST1031 | v1.1 | `jrsc_l3-multichannel-marketer` |
| Level 3 Cyber Security Technician | ST0865 | v1.1 | `jrsc_l3-cyber-security` |

### Standards showing "coming soon"
These are in the navigation but not yet built (KSBs were incomplete or dynamically loaded from Skills England):
- Level 4 AI & Automation Practitioner (ST1512 v2.1)
- Level 3 Assistant Accountant (ST0002 v1.2)
- Level 4 Professional Accounting Technician (ST0003 v1.2)

Each "coming soon" page includes a direct link to the standard on Skills England.

---

## Checklist form structure (all standards follow this template)

Each checklist page contains, in order:

1. **Checklist header** — level badge, title with version in brackets, intro paragraph, link to official standard on Skills England
2. **Demo bar** — red "View Example Completed Form" button; activates demo mode with pre-filled realistic data; sticky when active; "Exit Demo" scrolls user back to top
3. **Checklist Details card** — employer name, apprentice name (optional), date of completion (defaults to today), completed by, job title (placeholder varies by standard)
4. **Rating Guide** — collapsible "How to complete this form" panel; open by default; two columns colour-coded to match the rating buttons: exposure (Limited=red, Moderate=amber, Significant=green) and frequency (Rarely=red, Sometimes=amber, Often/Daily=green); amber note explains when written explanation is required
5. **Progress bar** — "X of N sections completed"; updates live
6. **Skill sections** (N varies by standard) — collapsible cards, all open by default, auto-collapse when both ratings are complete
7. **Tools, Systems & Technologies** — tool checkboxes (standard-specific list) + free-text for unlisted tools + system access/permissions textarea
8. **Additional Information** — free-text box for anything else relevant (routines, plans, context)
9. **Form actions** — "Clear & Start Again" (left) | "Save as PDF" (disabled until all sections complete) + "View Suitability Summary" (right)
10. **Suitability Summary** (rendered below form actions after submission) — meta block, verdict banner, results table, tools declared, additional notes

### Left sidebar
- Appears when the user scrolls past the progress bar (IntersectionObserver)
- Fixed position to the left of the centred content; hidden below 1260px viewport width
- Lists all skill sections with live status dots + mini progress bar
- Clicking any item scrolls to that section (offset accounts for sticky header)
- Disappears when navigating to a different standard (cleaned up in `renderContent`)

---

## Skill section card anatomy

Each card has:
- **Header (dark navy, clickable to collapse/expand):** section number badge, section title, skill reference codes with short label and hover tooltip showing full standard wording, status dot (grey=incomplete, amber=review, red=concern, green=suitable), +/− toggle
- **Body:**
  - Plain-English description of what the role must provide
  - Italic example use-cases
  - A dividing line, then:
  - **Exposure rating** (Limited / Moderate / Significant) — pill buttons, colour-coded
  - **Frequency rating** (Rarely / Sometimes / Often / Daily) — pill buttons, colour-coded
  - **Comment box** (amber background) — appears automatically when exposure is Limited/Moderate OR frequency is Rarely/Sometimes; labelled "— required"; triggers validation on submit if empty

### Auto-collapse behaviour
A section collapses automatically once both ratings are set AND the required comment (if applicable) is filled. The user can manually re-open any section at any time.

---

## Suitability logic

### Comment requirement
Triggered when: `exposure ∈ {limited, moderate}` OR `frequency ∈ {rarely, sometimes}`

### Section status
| Condition | Status |
|---|---|
| exposure or frequency not set, or required comment missing | `incomplete` |
| exposure=limited AND frequency=rarely | `concern` (red) |
| exposure=limited OR frequency=rarely | `review` (amber) |
| exposure=moderate OR frequency=sometimes (with comment filled) | `review` (amber) |
| exposure=significant AND frequency∈{often,daily} | `suitable` (green) |

### Overall verdict
- Any `incomplete` → **Incomplete**
- Any `concern` → **Not Recommended**
- Any `review` (no concern) → **Review Required**
- All `suitable` → **Suitable**

### Submit validation
Clicking "View Suitability Summary" checks for sections where a comment is required but missing. If found: the affected sections open, comment boxes turn red with an error message, page scrolls to the first offender. The form does not submit until all required comments are filled.

### Save as PDF
- Button is disabled until all sections are complete (progress = N of N)
- Clicking triggers `window.print()`; a print stylesheet hides the form and renders only the summary cleanly with colour preservation

---

## Code architecture (app.js)

### Key constants
- `STANDARDS` — navigation structure (categories → standard IDs + labels)
- `STANDARD_META` — version, code, Skills England URL per standard
- `CHECKLISTS` — maps standard ID → config object `{ stateKey, skillGroups, tools, skillShort, skillFull, demoState, jobTitleHint }`
- `*_SKILL_GROUPS` — array of group objects `{ id, short, title, skills[], description, example }` per standard
- `*_SKILL_SHORT` / `*_SKILL_FULL` — lookup maps from skill code to abbreviated / full standard wording
- `*_TOOLS` — array of `{ id, label }` tool chips per standard
- `*_DEMO_STATE` — pre-filled realistic state object for demo mode
- `EXPOSURE_OPTIONS` / `FREQUENCY_OPTIONS` — rating button definitions

### Key functions
- `renderContent()` — cleans up sidebar, dispatches to `renderChecklist` or "coming soon" view
- `renderChecklist(app, standardId, title, config, overrideState, isDemo)` — main form renderer; generic across all standards
- `buildSectionCard(group, state, config, num)` — renders a single skill section card with all event listeners
- `updateProgress(state, config)` — updates progress bar text/fill, enables/disables PDF button, calls `updateSidebar`
- `getSectionStatus(sec)` — returns `incomplete | concern | review | suitable`
- `completedCount(state, skillGroups)` — counts sections that are fully answered including required comments
- `getOverallVerdict(state, skillGroups)` — derives overall verdict from section statuses
- `needsComment(sec)` — returns true if a written explanation is required
- `buildSidebar(state, config)` — creates fixed sidebar DOM element, attaches IntersectionObserver
- `updateSidebar(state, config)` — re-renders sidebar nav items with current status dots
- `renderResults(state, config, standardId)` — renders suitability summary panel
- `loadStateFor(key)` / `saveStateFor(key, state)` — per-standard LocalStorage helpers
- `activeConfig` — module-level variable set by `renderContent` before rendering; used by generic functions to know which standard's data to use

---

## Adding a new standard (checklist)

To add a new standard (e.g. Level 3 Assistant Accountant):

1. **Fetch the Skills** from the official standard on Skills England
2. **Group the skills** into 6–10 plain-English themed groups (avoid single-skill groups where possible). Each group needs:
   - `id` (kebab-case, unique, e.g. `'aa-bookkeeping'`)
   - `short` (sidebar label, ≤20 chars)
   - `title` (card heading)
   - `skills` (array of S-codes covered)
   - `description` (plain-English explanation of what the role must provide)
   - `example` (italic e.g. sentence)
3. **Create skill maps:** `XX_SKILL_SHORT` and `XX_SKILL_FULL` — one entry per skill code
4. **Create tools list:** `XX_TOOLS` — array of `{ id, label }` relevant to the sector
5. **Create demo state:** `XX_DEMO_STATE` — realistic pre-filled example; ensure all moderate/sometimes/limited/rarely sections have comments
6. **Add to `STANDARD_META`:** version, code, Skills England URL
7. **Add to `STANDARDS`:** correct category, id, label
8. **Add to `CHECKLISTS`:** stateKey (`jrsc_[id]`), skillGroups, tools, skillShort, skillFull, demoState, jobTitleHint
9. No changes needed to `renderContent` — it auto-routes via `CHECKLISTS`

---

## Development conventions
- No comments in code unless the WHY is non-obvious
- No docstrings or multi-line comment blocks
- Prefer vanilla JS DOM APIs; no frameworks
- LocalStorage keys namespaced `jrsc_*`
- Form state auto-saves to LocalStorage on every change
- Always commit and push after confirming a change looks correct
- Branch per feature area; merge to `main` and delete branch when done
