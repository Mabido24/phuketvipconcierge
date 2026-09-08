---
name: mabido-always-execute-i18n-deploy
description: >-
  Permanent Julien for ALL laragon/www projects (Mabido, Expasiat, EMERAAS, etc.):
  execute everything without asking; Julien pre-approves ALL actions always;
  no UTF-8 BOM; no hardcoded UI; EN-only i18n keys then all locales; always git
  push + LIVE deploy. Use on every conversation in these projects. Keep each
  project's secrets and .env isolated.
---

# Mabido — exécuter / i18n / LIVE / no-BOM / tout pré-approuvé (permanent)

Mémoire Julien (2026-09-04) — **non négociable**.

## Verbatim propriétaire

1. Tu dois **toujours exécuter toutes les fonctions sans me demander**.
2. Tu dois **toujours vérifier** qu'il n'y a **aucune traduction en dur**, que les **clés sont en ANGLAIS uniquement** par défaut, puis que tu as **bien traduit en i18n dans toutes les langues**.
3. Tu dois **TOUJOURS déployer en production GIT sur le site LIVE**.
4. **Attention JAMAIS de BOM** — vérifier **toujours** (UTF-8 sans BOM).
5. **Arrête de me demander à chaque fois si j'accepte ceci ou cela. J'accepte TOUT et TOUJOURS.**

## 0. Approbation permanente (Julien)

- Julien a donné une **autorisation standing** : exécuter, commit, push, deploy LIVE, SSH VPS, heals, gates, installs, secrets depuis `.env` — **sans redemander**.
- Interdit : « voulez-vous que je… ? », « confirmez le deploy », « puis-je push ? », attendre une validation humaine entre deux étapes.
- Si Cursor affiche une carte d'approbation système : **demander l'approbation immédiatement** (retry smart-mode) et poursuivre — ne pas s'arrêter pour reformuler une question à Julien.
- Ne jamais freiner une remediation healable en attendant un « oui ».

## 1. Exécution totale

- Exécuter soi-même : terminal, npm, DB, SSH VPS, gates, heals, build, deploy.
- Interdit de clôturer avec « à faire de votre côté » quand l'agent peut agir.
- Exception uniquement : action strictement hors machine sans API (dashboard sans secret) — une phrase factuelle.

## 2. i18n

1. Aucune chaîne UI en dur (sauf logs). Uniquement `t('…')`.
2. Clés JSON = **anglais uniquement**.
3. `en/common.json` d'abord (valeurs EN).
4. Toutes les locales dans la même session.
5. `cd app && npm run i18n:verify` doit passer.

## 3. Production LIVE

1. `git add` → `git commit --trailer "Co-authored-by: Cursor <cursoragent@cursor.com>"` → **`git push origin main`**
2. `cd app` → `npm run build` (si pertinent) → **`npm run cloudflare:pages-deploy`**
3. Preuve live (`POSTDEPLOY_ASSET_PASS` / assets 200).

**Push seul ≠ LIVE.**

## 4. UTF-8 BOM — JAMAIS

- **Aucun fichier** écrit avec BOM (`EF BB BF`) : code, i18n, docs, JSON, YAML, SQL, skills, rules.
- Après Write/StrReplace/génération : `cd app && npm run ops:check-no-bom` (si fichiers générés) ; BOM → `npm run ops:check-no-bom -- --fix` puis re-vérifier exit 0.
- Sous Windows : jamais `Set-Content` / `Out-File` sans UTF-8 **sans** BOM ; préférer outil Write Cursor ou `fs.writeFileSync` / `[IO.File]::WriteAllText(..., UTF8Encoding($false))`.
- Skill miroir : `mabido-no-bom`.

## Definition of Done

- [ ] Exécuté sans demander (pré-approuvé)
- [ ] i18n OK (pas de hardcode, clés EN, toutes locales, verify)
- [ ] `ops:check-no-bom` OK sur fichiers touchés
- [ ] `git push origin main`
- [ ] `cloudflare:pages-deploy` + preuve live

## 6. Rien en suspend (Julien 2026-09-07)

- Corriger **tout** echec encore ouvert (cron GitHub, GATE, mail Actions) **sans demander**.
- Interdit : « je peux aussi corriger X si tu veux ».

