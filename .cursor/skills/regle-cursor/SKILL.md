---
name: regle-cursor
description: >-
  Julien permanent: execute without asking (accepts ALL always); never UTF-8 BOM;
  i18n EN keys + all locales; always LIVE deploy. Use on every conversation in
  Mabido, Expasiat, EMERAAS, and all other laragon/www projects.
---

# regle-cursor

Skill détaillée : **`mabido-always-execute-i18n-deploy`** (+ **`mabido-no-bom`**).

1. Exécuter **sans demander** — Julien accepte **TOUT et TOUJOURS**.
2. **JAMAIS de BOM** — toujours vérifier (`ops:check-no-bom`).
3. i18n : pas de hardcode ; clés **EN** ; **toutes** les langues.
4. **Toujours** `git push` + `cloudflare:pages-deploy` sur le LIVE.