---
name: mabido-internal-design
description: >-
  Apply the Mabido Internal landing design kit (peach/lime, floating pill nav,
  large radii, scroll reveals). Use when building landings, marketing pages,
  or when the user asks for the /internal look, Mabido design kit, or design Mabido chrome.
---

# Mabido Internal Design Kit

## When to use

- New landing / marketing page
- User says: « design /internal », « kit Mabido », « peach lime floating nav »
- Visual refresh of a promo page

## Source kit

Prefer files from (first match that exists):

1. `templates/mabido-internal-design-kit/` in the current repo
2. User’s copy of the kit folder (ask path if missing)

Read `DESIGN.md` + import `css/kit.css`. Use `react/KitShell.tsx` + `react/KitReveal.tsx` when the stack is React.

## Hard rules

1. Background peach (`#f8eee7`), CTA lime (`#a3ff47`) on ink text.
2. Floating pill topbar (fixed, blur, rounded) — not a full-width sticky bar.
3. Large radii (~40px). Dark wave sections for pricing / heroes.
4. First viewport: brand + one headline + one lead + one CTA group — no card clutter in the hero.
5. Lime pill spans inside titles; scroll reveals on sections.
6. Back-to-top lime circle after scroll.
7. Do **not** invent purple SaaS gradients or default Inter-only layouts.
8. Product copy only — no “design system” meta text in the UI.

## Implementation checklist

- [ ] `kit.css` imported once
- [ ] Page wrapped in `.iap` (via `KitShell` or manual)
- [ ] Hero uses `iap__hero iap__wave`, title uses `iap__pill`
- [ ] Buttons use `iap__btn` / `iap__btn--ghost`
- [ ] Mobile: burger inside topbar (`iap__burger` at ≤980px)

## Live reference

https://mabido.com/internal/autopilot-visibility
