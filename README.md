# ⌨️ Developer Portfolio

> Terminal-themed developer portfolio. Fetches pinned repos, language stats, and contribution graphs from the GitHub API at build time. Designed with Open Design's terminal/tech-dashboard aesthetic.

<p align="center">
  <img src="public/screenshot.png" alt="portfolio screenshot" width="800" />
</p>

<p align="center">
  <a href="https://github.com/corazonthedev/dev-portfolio"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT" /></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.3-black?logo=next.js" alt="Next.js 16" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss" alt="Tailwind CSS" /></a>
  <br/>
  <a href="https://corazonthedev.vercel.app">🌐 Live Demo</a>
  ·
  <a href="#-fork-your-own">📦 Fork</a>
  ·
  <a href="https://github.com/corazonthedev/dev-portfolio/issues">🐛 Report Bug</a>
</p>

---

## Screenshots

| Section | Preview |
|---------|---------|
| **Terminal Chrome + Profile** | `user@corazonthedev · profile.json` |
| **Metric Cards** | repo count, languages, top stars, since — with progress bars |
| **Projects Table** | `$ ls -la projects/` — table view, colored lang dots |
| **Language Chart** | `$ cat languages.txt` — horizontal bars with percentages |
| **Contribution Graph** | `$ cat contributions.log` — GitHub-style heatmap |

> Generate fresh: `npx playwright screenshot --full-page http://localhost:3000 public/screenshot.png`

---

## Design

Built from Open Design's `02-tech-dashboard.html` terminal/tech-dashboard output.

| Token | Value | Usage |
|-------|-------|-------|
| `#0a0e14` | bg-primary | page background |
| `#10161c` | bg-surface | cards, tables, panels |
| `#181e26` | bg-header | terminal chrome, header bar |
| `#252e3a` | border | all borders |
| `#5caf78` | accent-green | primary accent, Python |
| `#61afef` | accent-blue | links, TypeScript |
| `#d19a66` | accent-orange | stars |
| `#56b6c2` | accent-cyan | C++ |
| `#9b6ef0` | accent-purple | C# |
| `#8bc34a` | accent-lime | GDScript |
| `#d4e6f5` | text-primary | headings |
| `#b3c4d4` | text-body | body text |
| `#6a7a8a` | text-muted | secondary, labels |

- **Font:** JetBrains Mono everywhere (`font-family: 'JetBrains Mono', 'IBM Plex Mono', ui-monospace, Menlo, monospace`)
- **Border-radius:** 0 on all elements
- **Chrome:** fixed 28px terminal bar (●●● window controls + title)
- **Status bar:** `➜ ~/profile` prompt with blinking cursor

---

## 🚀 Fork Your Own

> Edit `src/config.ts` → deploy. That's it.

### 1. Clone & Install

```bash
git clone https://github.com/corazonthedev/dev-portfolio.git
cd dev-portfolio
npm install
```

### 2. GitHub Token

Required for contribution graph. Without one, the contributions section stays empty.

```bash
echo "GITHUB_TOKEN=ghp_yo...re" > .env.local
```

Get one: [GitHub Settings → Tokens](https://github.com/settings/tokens) — classic token, `repo` + `read:user` scopes.

### 3. Edit Config

All personal data lives in a single file:

```ts
// src/config.ts
export const siteConfig = {
  github: {
    username: "your-username",
    pinnedRepos: ["Repo1", "Repo2"],
  },
  personal: {
    name: "Your Name",
    title: "Full-Stack Developer",
    bio: "Short bio here",
    location: "City, Country",
  },
  social: {
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/...",
    twitter: "https://x.com/...",
  },
  signature: "your-username",
  since: 2024,
};
```

> `signature` appears in the terminal prompt on every page.

### 4. Development

```bash
npm run dev
# → http://localhost:3000
```

### 5. Build

```bash
VERCEL=1 npm run build
```

> ⚠️ If `NODE_ENV=production` is set globally, npm skips devDependencies. `VERCEL=1` also works around a Next.js 16 `_global-error` prerender bug.

### 6. Deploy (Vercel)

```bash
vercel --prod
```

Or: vercel.com → import repo → add `GITHUB_TOKEN` env var → deploy.

---

## 🧱 Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout + metadata + SEO
│   ├── page.tsx             # Home page composition
│   ├── not-found.tsx        # 404 ($ cat /dev/404)
│   ├── error.tsx            # Error ($ stderr.log)
│   ├── loading.tsx          # Loading (blink cursor)
│   ├── global-error.tsx     # Fatal error boundary
│   ├── globals.css          # All styles + CSS custom properties
│   └── api/github/route.ts  # GitHub API proxy
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Terminal chrome bar + status bar
│   │   └── Footer.tsx       # Link row + copyright
│   └── sections/
│       ├── Hero.tsx         # Profile card (terminal-card style)
│       ├── Metrics.tsx      # 4-column metric grid
│       ├── PinnedProjects.tsx # Projects table
│       ├── Languages.tsx    # Language section wrapper
│       ├── LanguageChart.tsx # Horizontal bar chart
│       ├── Contributions.tsx # Contribution section wrapper
│       └── ContributionGraph.tsx # SVG heatmap grid
├── lib/
│   ├── github.ts            # GitHub API client
│   ├── fetch-portfolio-data.ts # Build-time data fetcher
│   └── design-tokens.ts     # Design tokens (JS/TS)
├── types/
│   └── github.ts            # TypeScript interfaces
├── config.ts                # ★ SINGLE CONFIG FILE
└── test/
    ├── github.test.ts       # GitHub API unit tests
    ├── fetch-portfolio-data.test.ts # Data aggregator tests
    └── setup.ts             # Vitest setup
```

---

## 🔧 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** (canary) | App Router, RSC, ISR |
| **React 19** | UI framework |
| **TypeScript 5** | Type safety |
| **Tailwind CSS 3** | Utility CSS |
| **JetBrains Mono** | Monospace font (Google Fonts) |
| **GitHub REST API** | Repo, language, contribution data |
| **GitHub GraphQL API** | Contribution calendar |
| **Vitest** | Unit tests |

---

## 🧪 Tests

```bash
npx vitest run
# → 10 tests, 10 passed
```

Covers:
- GitHub API client (fetch, error handling, rate limits, missing token)
- Portfolio data aggregator (language merge across repos, error resilience)

---

## 📄 Sections

| Section | Prompt | Content |
|---------|--------|---------|
| Profile | `user@corazonthedev · profile.json` | Name, role, location, bio, links |
| Metrics | — | 4 metric cards (repos, langs, stars, since) |
| Projects | `$ ls -la projects/` | Table with pinned repos |
| Languages | `$ cat languages.txt` | Language bar chart |
| Contributions | `$ cat contributions.log` | SVG heatmap (needs GITHUB_TOKEN) |

---

## 🌍 API

GitHub API runs at build time. With token:
- `GET /users/{username}/repos` → repo list
- `GET /repos/{username}/{repo}/languages` → language byte counts
- `POST /graphql` → contribution calendar

Route handler at `/api/github` can be used as a proxy.

---

## ⚠️ Known Issues

- **Global `NODE_ENV=production`**: npm skips devDependencies. Build with `VERCEL=1`.
- **`_global-error` prerender**: Next.js 16 bug. Doesn't affect Vercel deployment.
- **Inter font removed**: Design is fully monospace now.

---

## 🤝 Contributing

PRs welcome. Tests must pass, build must be clean.

```bash
# Dev
npm run dev

# Test
npx vitest run

# Build
VERCEL=1 npm run build
```

---

## 📜 License

MIT © [corazonthedev](https://github.com/corazonthedev)

---

<p align="center">
  <sub>Built with</sub>
  <br/>
  <code>➜ ~/portfolio $</code>
  <span style="display:inline-block;width:8px;height:14px;background:#5caf78;animation:blink 1s step-end infinite;vertical-align:middle;margin-left:4px"></span>
</p>
