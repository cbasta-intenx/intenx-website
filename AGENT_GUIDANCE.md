# INTenX Website — Agent Guidance
**Domain:** intenx.io — public web presence
**Tech Stack:** Next.js + Tailwind CSS
**GitHub:** github.com/cbasta-intenx/intenx-website
**Working Directory:** `~/intenx-website/`

---

## Your Role

Build and evolve the INTenX public website. The site is transitioning from the current Squarespace consulting site (built late 2025) to the public home of the RTGF Framework and INTenX brand.

**Primary output:** A Next.js site deployed at intenx.io that:
1. Presents the RTGF Framework as a first-class product
2. Reflects the current INTenX brand ("Engineering with intent.")
3. Replaces the Squarespace consulting page
4. Serves snapshots of the RTGF Framework content from its source repo

---

## How to Work

### Always read context first
- `WEBSITE-SESSION-CONTEXT.md` — current state, content plan, architecture decisions
- `docs/source-content.md` — Squarespace content (the baseline to evolve from)
- Brand strategy: `~/business-ops/strategy/BRAND-STRATEGY.md`

### Key architectural rule: Framework content is upstream
RTGF Framework content originates in its own source repo — it is not authored here. The website renders it. When RTGF content needs to change, that work happens upstream. The website session handles rendering, layout, and INTenX brand presentation.

### Update findings
When decisions are made (tech choices, content structure, component patterns), update `WEBSITE-SESSION-CONTEXT.md` immediately. Don't rely on conversation memory.

### Git workflow
- Branch from `main` for feature work
- Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, `style:`
- Co-author: `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`
- Remote: `origin` = `https://github.com/cbasta-intenx/intenx-website.git`

---

## Content Ownership

| Content | Source | Website role |
|---------|--------|--------------|
| RTGF Framework pages | RTGF Framework repo (separate) | Render + present |
| INTenX brand / about | Author here | Maintain |
| Services / consulting | `docs/source-content.md` baseline | Update + evolve |
| Contact | `docs/source-content.md` baseline | Update |

---

## Priority Order for First Session

### Step 0 — Consolidate branches into main (before any new work)

All existing branches must be merged to `main` before development proceeds. Review each branch, merge what's ready, and confirm `main` is the clean baseline.

Branches to merge:
| Branch | Contains | Action |
|--------|----------|--------|
| `feature/devcontainer-setup` | Devcontainer config | Merge to main |
| `feature/nextjs-scaffold` | Full Next.js app in `web/` | Merge to main |
| `initial-port-dev-container-agent` | Experimental agent devcontainer work | Review — merge or close |

Steps:
1. Inspect each branch (`git log`, `git diff main...<branch>`) — understand what it contains
2. Merge in dependency order: devcontainer first, then nextjs-scaffold
3. Resolve any conflicts
4. Push `main` to origin
5. Confirm `main` contains: devcontainer + `web/` Next.js app + Squarespace source docs
6. Delete merged feature branches (local + remote) to keep the repo clean

Only after `main` is consolidated should new feature branches be created.

### Step 1 — New feature branch from clean main

```bash
git checkout main && git checkout -b feature/brand-refresh
```

### Steps 2–7 — Content and feature development

2. **Update home hero** — `web/app/page.tsx`: "Engineering with intent." tagline, RTGF CTA
3. **Fix SEO metadata** — `web/app/layout.tsx`: title/description still says "Create Next App"
4. **Add `/rtgf` route** — new `web/app/rtgf/` pages; this is the core new content
5. **Update services** — four pillars: RTGF Advisory, AI-Native Engineering, TFaaS, Embedded
6. **Write About** — founder story, INTenX name etymology (IN + INTENtional + TenX), Indiana anchor
7. **Deploy** — connect to Vercel, configure intenx.io DNS

---

## Decision Authority

**This session handles:**
- All Next.js code, components, layout, styling
- Content authoring for INTenX brand/about/services sections
- Technical architecture for how RTGF Framework content is rendered (static import, git submodule, API, etc.)
- Deployment configuration (Vercel, Netlify, or self-hosted)

**Escalate to Control Center:**
- RTGF Framework content changes (upstream, not here)
- Brand strategy changes (see `BRAND-STRATEGY.md`)
- Domain/DNS configuration decisions
- Trademark-sensitive naming decisions

---

## Key References

| Resource | Location |
|----------|----------|
| Website context | `~/intenx-website/WEBSITE-SESSION-CONTEXT.md` |
| Squarespace source content | `~/intenx-website/docs/source-content.md` |
| Brand strategy | `~/business-ops/strategy/BRAND-STRATEGY.md` |
| RTGF-Core repo | `~/rtgf-core/` |
| Control Center memory | `~/.claude/projects/-home-cbasta/memory/MEMORY.md` |
| GitHub remote | https://github.com/cbasta-intenx/intenx-website.git |
