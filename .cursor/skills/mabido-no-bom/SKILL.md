---
name: mabido-no-bom
description: >-
  Forbid UTF-8 BOM in every generated file. Use when writing, copying, syncing,
  or committing any code/docs/config on Windows/PowerShell/Node/Python — especially
  before git push or Cloudflare deploy. Applies to all Julien laragon/www projects.
---

# Mabido — No UTF-8 BOM (absolute)

## When this skill applies

**Always** when creating or modifying files (code, markdown, JSON, i18n, public docs, scripts, rules, skills).

## Hard rule

1. Never write UTF-8 BOM (`EF BB BF`) into any file.
2. Prefer Cursor Write/StrReplace, Node `fs.writeFileSync`, or Python `encoding='utf-8'` (not `utf-8-sig` for writes).
3. On Windows PowerShell: never `Set-Content`/`Out-File` without explicit UTF-8 **no BOM**.
4. After generating or syncing docs/public markdown: run `cd app && npm run ops:check-no-bom`.
5. If BOM detected: `npm run ops:check-no-bom -- --fix` then re-check until exit 0 before commit/push.

## Why

BOM broke Cloudflare Pages `_routes.json` parse and GitHub Actions deploy (e.g. `pour-claude-audit-complet-mabido.md` on 2026-08-03).

## Project rule

Also enforced by always-applied rule `.cursor/rules/mabido-no-bom.mdc`.

## Mémoire Julien (2026-09-04)

**Attention JAMAIS de BOM** — vérifier **toujours** après toute écriture / sync / commit.
Avant push / deploy : `cd app && npm run ops:check-no-bom` (exit 0). BOM trouvé → `--fix` puis re-check.
