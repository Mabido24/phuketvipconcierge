# Phuket VIP Concierge - Directives & Paramètres du Projet

## Identité du Projet
- **Nom** : Phuket VIP Concierge
- **Positionnement** : Agence Immobilière de Prestige & Conciergerie Privée à Phuket, Thaïlande.
- **Offre** : Achat résidentiel, Location saisonnière/longue durée, Vente/Estimation de propriétés, Services VIP Concierge.
- **Stack** : Pure Vanilla HTML5, Tailwind CSS (CDN), Vanilla JS ES6+, Cloudflare Pages, Supabase REST (optionnel).

## Multilingue & i18n
- **10 Langues officielles supportées** : FR (Français), EN (Anglais), DE (Allemand), IT (Italien), ES (Espagnol), PT (Portugais), TH (Thaïlandais), RU (Russe), AR (Arabe - RTL), ZH (Chinois).
- **Structure des clés** : Clés de dictionnaires en ANGLAIS dans `SITE_I18N`.
- **Traduction dynamique à la volée** : Google Translate GTX API gratuite pour les descriptions personnalisées.

## Devises Supportées
- **THB (฿)** : Devise de référence locale
- **EUR (€)** : Euro
- **USD ($)** : Dollar américain

## Déploiement & Environnements
- **DEV Local** : Laragon (`http://phuketvipconcierge.test` ou `http://localhost/phuketvipconcierge`)
- **PROD** : Cloudflare Pages via GitHub Actions / dossier de sortie `./out` (`node scripts/build-static.js`).
