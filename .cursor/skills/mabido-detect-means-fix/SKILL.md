---
name: mabido-detect-means-fix
description: >-
  ANY anomaly, WARN, FAIL, bug, contradiction (audit Claude/ChatGPT, GATE,
  crawl, admin rouge) = diagnose + repair + re-check + deploy in the SAME
  session. Never only cite. Never end with unfinished tasks. Use on every
  conversation in Julien's laragon/www projects (Mabido, Expasiat, EMERAAS, etc.).
---

# Mabido — détecter = réparer tout de suite (jamais seulement citer)

## Verbatim Julien (permanent)

- Quand tu détectes une erreur il ne faut pas te contenter de me le dire : il faut réparer / trouver l'origine et corriger.
- Toujours réparer automatiquement. Toujours déployer en production.
- Aucun résumé final ne doit laisser des tâches inachevées.

## Interdit

- Lister un WARN, un bug, un écart GATE, un fetch Claude/ChatGPT contradictoire, puis s'arrêter (« noté », « plus tard », « hors scope », « P0 encore ouvert », « à refetch »).
- Un résumé qui ressemble à une checklist de restes (`buy-villa présent, jetta absent` **sans dire si c'est voulu ou cassé**).
- Demander à Julien de lancer une commande, un heal, un deploy, un cron.
- Clôturer tant que mabido.com n'a pas la preuve live de la réparation (sauf blocage **strictement** externe : indexation Google, quota API tiers sans clé, dashboard sans API).

## Obligatoire (même session, avant tout message « c'est bon »)

1. **Preuve** — HTTP / DB / log / GATE.
2. **Cause racine** — une phrase.
3. **Réparer** — code, queue, feed, HTML crawler, llms, trust, deploy `main` + Pages.
4. **Revérifier** la même URL / la même couche.
5. **Résumé final = état déjà vrai en prod**, zéro TODO, zéro « ensuite tu pourras ».

## Preuve de bon état ≠ bug

Si le produit **exige** l'absence d'un client du Live Portfolio (facturation arrêtée) :

| Observation | Bug ? | Action |
|-------------|-------|--------|
| Accueil no-JS : `buy-villa-phuket-rawai` présent | Non si l'API featured le liste | Preuve SSOT, pas à « soigner » |
| Accueil no-JS : `jetta-holiday-rawai` **absent** | Non : Jetta = hub **historique publié** (`/shop/jetta-holiday-rawai` HTTP 200), plus dans GET `/api/shop/portfolio-clients` | Ne **pas** le remettre en vitrine |
| Accueil no-JS : Jetta encore en vitrine alors que l'API ne le liste pas | **Oui** | Retirer de llms/accueil **immédiatement** + deploy |
| `/trust` 200 avec marker `20260803` / Trustpilot 3.8 | **Oui** | Servir le canon `20260831` en 200 Worker + deploy |

Dans un résumé : écrire **voulu** ou **réparé**, jamais une ligne brute qui a l'air d'un défaut.

## Exemples

| Signal | Mauvaise réponse | Bonne réponse |
|--------|------------------|---------------|
| Ollama timeout | « kick échoué » | journalctl + restart + warm + re-kick + preuve |
| Claude voit `/trust` ancien | « c'est son cache » **sans** changer l'origine | 200 Worker actuel sur `/trust` (les fetchers IA ignorent le 301) + deploy + preuve curl UA Claude |
| `/llms.txt` ≠ API | « P0 ouvert, feu vert plus tard » | Function llms = `loadPortfolioClients` + historical + deploy **avant** de répondre |
| GATE WARN | « normal en début » | heal + re-gate |

## Scripts

- `app/scripts/_diag-fix-ollama-now.mjs`
- `npm run vps:deploy-charla-worker`
- `npm run ops:gate-honesty` après un écart llms/trust/portfolio
- Règles : `mabido-warn-means-fix.mdc`, `mabido-detect-means-fix.mdc`, `mabido-git-means-deploy.mdc`
## Un client = tous les GB
Un bug sur un shop => scanner TOUS les GB actifs (meme s il n y en a que 9). Couche GATE CA: ops:gate-gb-audit-match. Incident 2026-09 Recreation Group: scan prospect alors que client payant.
