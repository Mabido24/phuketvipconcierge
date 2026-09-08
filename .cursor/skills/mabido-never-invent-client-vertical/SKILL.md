---
name: mabido-never-invent-client-vertical
description: >-
  Never invent a Mabido client's trade from the NAME. Always fetch the official
  website. Any doubt = email admin (Resend). Bruno Bald = influencer / comic
  actor, never photographer. Use on every GB classify, audit, scrape, or prompt.
---

# Never invent a client vertical

## When

Any task that **sets, infers, or writes** a merchant category, brand_knowledge, audit type, scrape vertical, blog prompt, or Charla entity.

## Do

1. Query the merchant website from DB.
2. Fetch live HTML (homepage + About if thin).
3. Quote visible text. Classify from that quote + host only.
4. If the page is empty, JS-only, SSL-down, or ambiguous: **email admin** (`notifyVerticalDoubt` / `sendMonitoringAlertEmail`). Stop guessing.
5. Persist `brand_knowledge` (voice, facts from the quote, forbidden wrong trades).

## Never

- Guess from the name (Bald, Garden, Holiday, Fortune, Phuket in the name).
- Call Bruno Bald a photographer, barber, or villa agency.
- Call Dream Garden a landscaper because of "garden" — the site says villa owner/manager.
- Write a trade into prompts or blogs without a site quote.

## Code

- `app/functions/lib/merchantVerticalFromSite.ts`
- `app/functions/lib/notifyVerticalDoubt.ts`
- Rule: `.cursor/rules/mabido-never-invent-client-vertical.mdc`
- Doc: `docs/CLIENT_VERTICAL_SSOT.md`
