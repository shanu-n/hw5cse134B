## Part 1: Theme Picker

I chose Option A. The CSS handles theming entirely on its own via @media (prefers-color-scheme: dark). if JS is off, the hidden attribute keeps the switcher invisible so there's no broken control sitting there doing nothing.

For FOCT: there's a small blocking IIFE in the head that reads localStorage and sets data-theme on the html element before the body renders, so the right theme is applied before any pixels hit the screen.

The switcher is a native select with a proper label, persists via localStorage, and uses no libraries or inline handlers.

---

## Part 2: Web Component - photo-of-the-day

Tag: photo-of-the-day

Endpoint: https://picsum.photos/v2/list (keyless public API)

Attributes:
- page: default "5", accepts any positive integer. Which page of photos to fetch. Changing it at runtime triggers a new fetch.

States: idle (waiting), loading (shows message), success (renders image + caption), error (shows message + retry button)

Security: All remote data is inserted via textContent and setAttribute on a cloned template — never via innerHTML, which would allow untrusted API strings to execute as HTML.

Fallback: Content between the element tags is shown if JS is off or the network fails.

Usage:
<photo-of-the-day page="5">
    <p>Featured images are currently unavailable. Please enable JavaScript.</p>
</photo-of-the-day>

To reconfigure at runtime:
document.querySelector('photo-of-the-day').setAttribute('page', '10');