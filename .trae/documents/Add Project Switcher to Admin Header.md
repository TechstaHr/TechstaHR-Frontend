**What Exists**
- Header is rendered in `app/(admin)/layout.tsx:28-37` with logo, static label, and `AdminTopNav`.
- Pages read/write `localStorage['currentProjectId']`:
  - Reads: `admin/project-management/details/page.tsx:31-39`, `admin/activity/page.tsx:26-36`.
  - Writes: `admin/dashboard/page.tsx:48-52`, `admin/project-management/page.tsx:32-36`.
- Projects are fetched via `getAllProjects` in multiple places; UI `Select` is available at `components/ui/select.tsx`.

**Goal**
- Add a project switcher in the header that, when changed, updates `localStorage['currentProjectId']`. Show it only when user has projects.

**Implementation Plan**
- Create `components/ProjectSwitcher.tsx` (client):
  - Fetch projects with `useQuery(getAllProjects)`.
  - Read initial `currentProjectId` from `localStorage` on mount.
  - Render `Select` with options for each project name; selected value is the current project id.
  - On change: `localStorage.setItem('currentProjectId', newId)`; optionally `toast.success("Project switched")`.
  - Guard for SSR (`typeof window !== 'undefined'`) and hide when no projects.
- Integrate in header:
  - Import and render `<ProjectSwitcher />` inside the header row of `app/(admin)/layout.tsx` alongside the left group (between the page label and `AdminTopNav`).
  - Keep layout styling consistent with existing shadcn UI classes.

**Usage Across Pages**
- Existing pages that read `currentProjectId` will continue to work on next navigation.
- Optional enhancement (second pass, if you want live updates without navigation):
  - Add a tiny hook `useCurrentProjectId()` that returns `[id, setId]` and listens for a custom `window` event to update consumers when the switcher changes.
  - Update `details` and `activity` pages to use the hook so queries refetch when the id changes on the same page.

**Edge Cases**
- No projects: switcher hidden.
- Missing/invalid `currentProjectId`: show placeholder ("Select project") until user picks.
- Auth: relies on existing `ClientAuthWrapper` and react-query token cookie checks.

**Files Touched**
- New: `components/ProjectSwitcher.tsx`.
- Update: `app/(admin)/layout.tsx` to include the component.

If this plan looks good, I’ll implement the switcher and wire it into the header, keeping changes minimal and consistent with your current patterns.