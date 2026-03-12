# INTenX Website — Session Context
**Last Updated:** 2026-02-28
**Updated By:** INTenX Control Center

---

## Current State

### Branches
| Branch | Status | Notes |
|--------|--------|-------|
| `main` | Base — no app | Squarespace content dump + devcontainer only |
| `feature/nextjs-scaffold` | **Active development branch** | Full Next.js app scaffolded in `web/` |
| `feature/devcontainer-setup` | Merged upstream | Devcontainer config |
| `initial-port-dev-container-agent` | Experimental | Agent-based devcontainer work |

**Start from `feature/nextjs-scaffold`** — this is where work continues.

### What's Built (`feature/nextjs-scaffold` — `web/` directory)

```
web/
├── app/
│   ├── layout.tsx        ← Navigation + footer (contact info correct)
│   ├── page.tsx          ← Home (OLD messaging — needs update)
│   ├── services/page.tsx ← Services (OLD Squarespace pillars — needs update)
│   ├── about/page.tsx    ← About (placeholder — needs About section)
│   ├── contact/page.tsx  ← Contact (basically correct)
│   └── globals.css       ← Tailwind base styles
├── next.config.ts
├── package.json          ← Next.js + Tailwind + TypeScript
└── tsconfig.json
```

**What's correct:**
- Next.js App Router, TypeScript, Tailwind CSS — proper stack
- Layout/navigation: Home, Services, About, Contact
- Footer: `info@intenx.io`, `202 Lindenwood Dr, Michigan City IN 46360` — correct
- Copyright + INTenX branding in footer

**What needs updating (content is still 2023 Squarespace):**
- `page.tsx` hero: tagline is "Engineering • Embedded Systems • Production Test" → needs "Engineering with intent."
- `services/page.tsx`: three old pillars → needs RTGF Advisory, AI-Native Engineering, TFaaS, Embedded
- `about/page.tsx`: stub text → needs Cole Basta story, INTenX name etymology, strategy
- `/rtgf` route: **does not exist yet** — the biggest new addition needed
- `layout.tsx` metadata: title is "Create Next App" → needs real SEO metadata

The live intenx.io site is still the Squarespace placeholder. The Next.js app has not been deployed yet.

---

## Strategic Direction

### The Brand Pivot

INTenX is evolving from an engineering consulting shop to the platform company behind the RTGF Framework and the INTenX Stack. The website must catch up.

**Old identity:** Engineering • Embedded Systems • Production Test
**New identity:** "Engineering with intent." — The Operating System for AI-Native Engineering Teams

### The RTGF Framework Separation

This is the key architectural decision driving website development:

**RTGF Framework** (universal, public-facing)
- The methodology: maturity model, governance principles, capability module *concepts*, Level 0–5 progression
- Language: functional and universal — no implementation-specific acronyms (BKF, PCM, RIS, etc.)
- Audience: Any engineering team, any AI tooling, any domain
- Home: Its own git repo (to be created: `rtgf-framework`) + published on intenx.io

**RTGF-Core** (INTenX implementation reference, at `~/rtgf-core/`)
- INTenX's own application of RTGF in practice
- Uses internal acronyms (BKF, PCM, SCOPE, BATON, CHRONICLE, WARD) as implementation labels
- Not the primary website content — referenced from website as "see it in practice"

**The website renders the RTGF Framework.** It does not render the implementation internals.

### Content Architecture for the Site

```
intenx.io/
├── /                     ← Hero + brand statement ("Engineering with intent.")
├── /rtgf                 ← RTGF Framework (rendered from framework repo)
│   ├── /rtgf/framework   ← The framework overview (Layer 3, 7 differentiators)
│   ├── /rtgf/maturity    ← Maturity model (Reactive → Generative)
│   └── /rtgf/patterns    ← Governance patterns (functional language)
├── /services             ← Updated INTenX services (consulting, RTGF assessments, TFaaS)
├── /about                ← Founder story, INTenX name etymology, Indiana anchor
└── /contact              ← info@intenx.io, Michigan City IN
```

---

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Next.js** (App Router) | Configured in devcontainer |
| Styling | **Tailwind CSS** | Configured in devcontainer |
| Linting | ESLint + Prettier | Configured in devcontainer |
| Deployment | TBD — Vercel recommended | Connects to GitHub, free tier for public repos |
| Content | Markdown → MDX or static import | RTGF Framework content rendered from upstream |
| Domain | intenx.io (owned) | DNS config: TBD when host confirmed |

**Devcontainer:** `.devcontainer/` is already configured. `postCreateCommand` runs `post-create.sh`. Workspace folder is `/workspace` inside container.

**Note:** devcontainer.json has `"GITHUB_USER": "Ccbasta"` (capital C — may need correction to `cbasta`).

---

## Content Plan

### Hero Section
- **Tagline:** "Engineering with intent."
- **Subhead:** "The governance framework for AI-native engineering teams."
- **CTA:** "Explore RTGF" → `/rtgf`
- **Secondary CTA:** "Work with us" → `/contact`

### RTGF Framework Section (primary new content)
Rendered from the RTGF Framework repo. Sections:
1. The problem (Layer 3 gap — deployed vs. validated distinction)
2. What RTGF is (seven differentiators, functional language, no acronyms)
3. The maturity model (Reactive → Generative — the level names are a brand asset)
4. Governance patterns (4 published patterns)
5. MVG Starter Kit (get started immediately)
6. Safety Baseline (standalone artifact)

### Services Section (updated from Squarespace baseline)
INTenX now offers:
1. **RTGF Advisory** — maturity assessment, governance implementation, domain packs
2. **AI-Native Engineering** — AI stack design, RTGF implementation, context governance
3. **Test Fixtures & TestOps** — TFaaS, G2/G3-class fixture development, MESS hosting
4. **Embedded & Electronics** — legacy services, keep for continuity

### About Section (new — Squarespace had none)
- Cole Basta, founder — 30+ years multi-disciplinary engineering, Michigan City IN
- The INTenX name etymology (IN + INTENtional + TenX) — state this explicitly
- The "why Indiana" story — building for manufacturers who build real things, not PowerPoint manufacturers
- INTenX Stack: RTGF + TestOps + AI Stack

### Contact Section (update existing)
- Keep: info@intenx.io, 202 Lindenwood Dr, Michigan City IN 46360
- Remove: Squarespace attribution
- Update: contact form fields for current service inquiries

---

## RTGF Framework Repo (Architecture Decision — Open)

The RTGF session is mid-discussion on where the framework manifesto lives. Options:

**Option A: Framework content lives in `rtgf-core` README**
- Website fetches/renders from `~/rtgf-core/README.md` and related docs
- Pro: simpler, one less repo
- Con: conflates implementation reference with universal framework

**Option B: Separate `rtgf-framework` repo (RTGF session leaning toward this)**
- Own repo: `github.com/INTenX/rtgf-framework`
- Website pulls from this repo
- rtgf-core stays as implementation reference
- Pro: clean separation, framework is clearly universal
- Con: another repo to maintain, content sync complexity

**Option C: Framework content authored directly in website**
- MDX pages in the website repo
- Pro: simplest for website team
- Con: loses git history in the framework repo, no standalone downloadable framework

**Current recommendation: Option B.** The RTGF session is heading toward creating the framework repo. The website should be architected to pull from an external source (git submodule or copy-on-release). Build the website to accept markdown from an upstream source — the exact source can be wired in once the RTGF session resolves it.

**For first website session:** Use static copies of the current `rtgf-core/README.md` content (already cleaned of acronyms). Wire up the upstream integration later.

---

## Brand Guidelines (from BRAND-STRATEGY.md)

**Primary tagline:** "Engineering with intent."
**Product tagline:** "Govern your AI stack. Not just your AI policy."
**Voice:** Precise, practitioner-first, Midwest direct, confident, durable
**Capitalization:** Always `INTenX` — uppercase I, N, X. Never `intenx` or `Intenx`.

**What the site does NOT sound like:**
- Enterprise compliance marketing
- Coastal AI hype
- Jargon overload

---

## Pending Decisions (for website session to resolve or escalate)

| Decision | Options | Status |
|----------|---------|--------|
| Deployment host | Vercel (recommended), Netlify, self-hosted | Open |
| RTGF content source | Option A/B/C above | Open — await RTGF session |
| Navigation structure | Multi-page vs. long-scroll | Recommend multi-page (Next.js App Router) |
| Dark/light theme | Standard tech-brand dark theme vs. light professional | Open |
| RTGF Framework repo name | `rtgf-framework` vs. other | Open — RTGF session resolves |

---

## Findings Log

| Date | Topic | Finding |
|------|-------|---------|
| 2026-02-28 | Tech stack | Next.js + Tailwind + TypeScript. App scaffolded in `web/` on `feature/nextjs-scaffold` branch. |
| 2026-02-28 | Branch | `feature/nextjs-scaffold` is the active dev branch — 4 pages built, old Squarespace content. |
| 2026-02-28 | Branch strategy | All existing branches to be merged into `main` before new development. See AGENT_GUIDANCE.md Step 0. |
| 2026-02-28 | Content baseline | Squarespace content in docs/source-content.md — 2023 consulting placeholder |
| 2026-02-28 | Architecture | RTGF Framework separating from implementation (rtgf-core). Framework is website content. |
| 2026-02-28 | Brand | "Engineering with intent." primary tagline. INTenX.io owned. See BRAND-STRATEGY.md. |
| 2026-02-28 | devcontainer note | GITHUB_USER set to "Ccbasta" (capital C) — may need correction |

---

## References

- Agent guidance: `~/intenx-website/AGENT_GUIDANCE.md`
- Squarespace source: `~/intenx-website/docs/source-content.md`
- Brand strategy: `~/business-ops/strategy/BRAND-STRATEGY.md`
- RTGF-Core repo: `~/rtgf-core/`
- RTGF-Core README (framework content source): `~/rtgf-core/README.md`
- GitHub: https://github.com/cbasta-intenx/intenx-website.git
- Control Center memory: `~/.claude/projects/-home-cbasta/memory/MEMORY.md`
