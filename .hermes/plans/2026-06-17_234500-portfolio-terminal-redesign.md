# Portfolio Redesign Plan — Terminal/Tech Dashboard

> **For Hermes:** Use subagent-driven-development to implement this plan task-by-task.

**Goal:** Replace the current warm-editorial design with the terminal/tech-dashboard aesthetic from Open Design (`02-tech-dashboard.html`).

**Architecture:** Extract design tokens from the Open Design HTML → update Tailwind config → rewrite globals.css → rebuild all components with terminal-style chrome (monospace, green accent, bordered cards, table views, metric bars).

**Source design file:** `/home/qwe/Desktop/dev-portfolio/02-tech-dashboard.html`

---

## New Design System (from HTML)

### Colors
| Role | Value | Usage |
|------|-------|-------|
| bg-primary | `#0a0e14` | page background |
| bg-surface | `#10161c` | cards, tables, panels |
| bg-header | `#181e26` | card headers, terminal chrome |
| border | `#252e3a` | all borders |
| text-primary | `#d4e6f5` | headings, bright text |
| text-body | `#b3c4d4` | body text |
| text-muted | `#6a7a8a` | secondary, labels |
| text-dim | `#7a8a9a` | descriptions |
| accent-green | `#5caf78` | primary accent, prompts, Python |
| accent-blue | `#61afef` | links, TypeScript |
| accent-orange | `#d19a66` | stars, warning |
| accent-cyan | `#56b6c2` | C++ |
| accent-purple | `#9b6ef0` | C# |

### Typography
- **Font:** `'JetBrains Mono', 'IBM Plex Mono', ui-monospace, Menlo, monospace` (everywhere)
- **Scale:** 10px (labels) · 11px (prompts) · 12px (table) · 13px (body) · 20px (name) · 28px (metrics)
- **Letter-spacing:** `0.08em` (uppercase labels), `-0.03em` (large numbers), `0.06em` (tags)

### Layout
- **Container:** max-width 1200px, centered, padding 48px 32px 64px
- **Terminal chrome:** fixed 28px bar at top with window controls and title
- **Status bar:** prompt line (➜ ~/profile) with blinking cursor
- **Section pattern:** section-prompt label (green, `$` prefix) → content card
- **Cards:** bg-surface (#10161c), 1px border (#252e3a), no border-radius
- **Card headers:** bg-header (#181e26), uppercase label, window buttons

### Components (from HTML)
- **Profile card:** grid layout (label:value), name large, tags inline, link list
- **Metric cards:** 4-column grid, large number + label + progress bar
- **Language bars:** name (100px) + track + fill + percentage
- **Projects table:** full-width table, sortable headers, hover rows
- **Footer:** simple links + copyright

### Removed (from current design)
- Inter font → monospace everywhere
- Terracotta/copper/gold → green/blue/orange/cyan/purple
- Warm dark (#0f0c08) → cool dark (#0a0e14)
- Asymmetrical layout → structured terminal grid
- Framer Motion fade-in → simpler transitions (width bars, hover)
- Theme toggle → keep if desired but colors change
- Signature element → terminal prompt replaces it

---

## Tasks

### Task 1: Update design tokens

**Files:**
- Modify: `src/lib/design-tokens.ts`
- Modify: `tailwind.config.ts`

**Action:** Replace all color and font values with the terminal palette above. Remove old warm-editorial tokens.

```typescript
// tailwind.config.ts — colors
bg-primary: "#0a0e14",
bg-surface: "#10161c",
bg-header: "#181e26",
border: "#252e3a",
"text-primary": "#d4e6f5",
"text-body": "#b3c4d4",
"text-muted": "#6a7a8a",
"text-dim": "#7a8a9a",
"accent-green": "#5caf78",
"accent-blue": "#61afef",
"accent-orange": "#d19a66",
"accent-cyan": "#56b6c2",
"accent-purple": "#9b6ef0",
```

```typescript
// design-tokens.ts — same colors, fonts.mono as primary, fonts.body = fonts.mono
```

**Verify:** `npx tsc --noEmit` passes.

---

### Task 2: Rewrite globals.css

**Files:**
- Overwrite: `src/app/globals.css`

**Action:** Replace all CSS with terminal-style base styles:
- Body: bg `#0a0e14`, text `#b3c4d4`, font-family JetBrains Mono
- Remove Inter/Google Fonts import, keep JetBrains Mono import
- Base utility classes for terminal chrome
- No border-radius anywhere (border-radius: 0 or none)
- `::selection` in accent-green

**Verify:** `npm run build` succeeds.

---

### Task 3: Rewrite Header component

**Files:**
- Overwrite: `src/components/layout/Header.tsx`

**Action:** Replace with terminal status bar:
- Fixed 28px top bar (bg-header, border-bottom)
- Left: `● ● ●` window controls (red/yellow/green dots)
- Center: user@corazonthedev · terminal
- Right: close/minimize/maximize symbols (— □ ×)
- Below: prompt line `➜ ~/profile` with blinking cursor
- No nav links in header (move to footer)

---

### Task 4: Rewrite Hero section

**Files:**
- Overwrite: `src/components/sections/Hero.tsx`

**Action:** Replace with terminal-card style profile grid:
- Card header: "user@corazonthedev · profile.json" + window buttons
- Grid layout: label (green, right-aligned) | value
- Fields: name (large, #d4e6f5), role (with tags), location, bio, links
- Tags: inline bg-#1a2332, green text, small uppercase
- Links: blue (#61afef), `↗` suffix, muted for absent links
- No Framer Motion animations (or minimal)

---

### Task 5: Rewrite metric cards section

**Files:**
- Create: `src/components/sections/Metrics.tsx`
- Remove: remove from old components if separate

**Action:** New 4-column metric grid from the HTML:
- Repositories count, Languages count, Top repo stars, Since year
- Each: large number (#d4e6f5), label (#6a7a8a uppercase), progress bar
- Bar fill widths: 100%, 78%, 62%, 45%
- Colors per card: green, orange, blue, cyan

---

### Task 6: Rewrite LanguageChart component

**Files:**
- Overwrite: `src/components/charts/LanguageChart.tsx`

**Action:** Replace SVG bars with terminal-style language bars:
- Row per language: name (100px, left) + track (bg-#1a2332) + fill (colored) + percentage
- Colors per language: Python=green, C#=purple, C++=cyan, TypeScript=blue, GDScript=green variant
- No SVG, no Framer Motion animation (CSS transition on width)

---

### Task 7: Rewrite ProjectCard / Projects section

**Files:**
- Overwrite: `src/components/sections/PinnedProjects.tsx`
- Overwrite or replace: `src/components/projects/ProjectCard.tsx`

**Action:** Replace card grid with projects table:
- Full-width table, terminal-chrome style
- Headers: name | language | stars | description
- Each row: repo name (blue link), language dot + name, star count (orange), description (dim)
- Row hover: bg-#141c26
- No card borders, no hover border animation from old design

---

### Task 8: Rewrite Contribution graph

**Files:**
- Overwrite: `src/components/charts/ContributionGraph.tsx`
- Overwrite: `src/components/sections/Contributions.tsx`

**Action:** Update colors to terminal palette. Keep SVG grid but:
- Empty: #1a2332 (same as lang track)
- Low: tint of green
- High: accent-green
- Section label: green, `$` prefix

---

### Task 9: Rewrite Footer

**Files:**
- Overwrite: `src/components/layout/Footer.tsx`

**Action:** Simple link row + copyright:
- Left: github link (blue) | email link (muted) separated by `/`
- Right: copyright #6a7a8a, uppercase, small
- Top border: 1px #252e3a

---

### Task 10: Update Homepage

**Files:**
- Modify: `src/app/page.tsx`

**Action:** Reorder sections: Hero → Metrics → Languages → Projects → Contributions. Update section labels to `$` prompt style.

---

### Task 11: Remove theme toggle (or update)

**Files:**
- Modify: `src/components/ui/ThemeToggle.tsx`
- Or delete and remove from Header

**Action:** Either remove (terminal theme has no light mode) or update colors to terminal palette. Default to no light mode.

---

### Task 12: Update Layout

**Files:**
- Modify: `src/app/layout.tsx`

**Action:** Remove old Header/Footer. New header is the terminal chrome bar. Wrap everything in the terminal container.

---

### Task 13: Update remaining pages (error, loading, not-found, global-error)

**Files:**
- Modify: `src/app/not-found.tsx`
- Modify: `src/app/error.tsx`
- Modify: `src/app/loading.tsx`
- Modify: `src/app/global-error.tsx`

**Action:** Match terminal style — monospace, green accent, bordered cards.

---

### Task 14: Update tests

**Files:**
- Modify: `src/test/github.test.ts`
- Modify: `src/test/fetch-portfolio-data.test.ts`

**Action:** Color tokens may have changed in design-tokens.ts, update test mocks if needed. No behavioral changes expected.

---

### Task 15: Build & verify

```bash
cd /home/qwe/Desktop/dev-portfolio
VERCEL=1 npm run build
```

Expected: clean build, all pages render in terminal style.

---

## Verification Checklist

- [ ] All colors match terminal palette (no terracotta/copper/gold remnants)
- [ ] JetBrains Mono everywhere (no Inter)
- [ ] No border-radius on any element
- [ ] Terminal chrome bar at top
- [ ] Status bar with prompt and cursor
- [ ] Profile card with grid layout
- [ ] Metric cards with progress bars
- [ ] Language bars matching HTML design
- [ ] Projects table (not card grid)
- [ ] Footer with basic links
- [ ] Build succeeds
- [ ] Tests pass (10/10)
