## Local Setup

npm install
npm start       # dev server
npm run build   # generate _site/

---

## Part 1: Theme Picker

I chose Option A. The CSS handles theming entirely on its own via @media (prefers-color-scheme: dark). If JS is off, the hidden attribute keeps the switcher invisible so there's no broken control.

For FOCT: there's a small blocking IIFE in the head that reads localStorage and sets data-theme on the html element before the body renders, so the right theme is applied before any pixels hit the screen.

The switcher is a native select with a proper label, persists via localStorage, and uses no libraries or inline handlers.

---

## Part 2: Web Component - photo-of-the-day

Tag: photo-of-the-day

Endpoint: https://picsum.photos/v2/list (keyless public API)

Attributes:
- page: default "5", accepts any positive integer. Which page of photos to fetch. Changing it at runtime triggers a new fetch.

States: idle, loading, success, error (with retry button)

Security: All remote data is inserted via textContent and setAttribute on a cloned template — never via innerHTML. Using innerHTML with untrusted API strings would allow injected scripts to execute in the page.

Fallback: Content between the tags renders if JS is off or the network fails.

Usage:
<photo-of-the-day page="5">
    <p>Featured images are currently unavailable. Please enable JavaScript.</p>
</photo-of-the-day>

To reconfigure at runtime:
document.querySelector('photo-of-the-day').setAttribute('page', '10');

---

## Part 3: SSG - Eleventy (11ty)

The site uses Eleventy with a base-layout.njk that owns the full document shell. Shared includes (header, footer, metadata) are reused across every page. Global data like site title, author, nav links, and social links live in _data/site.json. Project pages are generated from projects/*.md files using a single project-template.njk. Navigation state (aria-current="page") is computed at build time.

The conversion removed all the manual copy-pasting of headers, footers, and metadata across every file. The cost is a build step and a layer of abstraction that makes quick edits slightly less direct. I wouldn't use an SSG for something highly dynamic, like a live dashboard or real-time feed, where content changes per request rather than per deploy.

---