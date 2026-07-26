[![Deploy to GitHub Pages](https://github.com/brooklynhelpdesk/bkhd.nyc/actions/workflows/Deploy_Pages.yml/badge.svg)](https://github.com/brooklynhelpdesk/bkhd.nyc/actions/workflows/Deploy_Pages.yml)

# bkhd.nyc

Marketing site for **Brooklyn Helpdesk** and its platform-engineering arm **BKHD Engineering** —
AI-driven home & business automation, monitoring and network management, and physical security
& access with UniFi.

## Stack

A single, dependency-free static HTML5 page. No framework, no build step, no server-side code,
and **no external requests** (no CDN, web fonts, or third-party scripts) — just `index.html`,
`assets/css/style.css`, and a small `assets/js/main.js`.

## Hosting

Served by **GitHub Pages** on the custom domain in `CNAME` (`bkhd.nyc`). The whole repository
root is the web root.

- `CNAME` — custom domain for GitHub Pages.
- `.well-known/` — reserved for domain-verification / protocol files.

## Deployment

Pushes to `master` are published automatically by
[`.github/workflows/Deploy_Pages.yml`](.github/workflows/Deploy_Pages.yml) using the official
GitHub Pages actions (`configure-pages` → `upload-pages-artifact` → `deploy-pages`).

One-time setup: in **Settings → Pages**, set **Source** to *GitHub Actions*.
