# Portfolio de Vincent Leostic

Portfolio une page, en ligne sur [vincent.leostic.bzh](https://vincent.leostic.bzh/) : accroche, projets (sites perso avec captures, missions en ESN), compétences, parcours et contact, avec le CV à télécharger en PDF.

Palette « rossignol », parce que LEOSTIC vient du breton eostig, rossignol : brun du dos pour les liens et les titres, roux de la queue pour la touche vive (boutons, décors), chamois et crème pour les fonds.

## Le CV en PDF

Le CV est une feuille A4 d'une page aux couleurs du site : en-tête brun (photo, titre, disponibilité, coordonnées), parcours et projets perso à gauche, compétences, formation, langues et loisirs dans une colonne chamois. Sa source est la page `/cv` ([app/components/CvSheet.vue](app/components/CvSheet.vue)), cotée en mm et en pt. Après `nuxt generate`, [scripts/cv-pdf.mjs](scripts/cv-pdf.mjs) l'imprime avec Chrome en mode headless dans `cv-vincent-leostic.pdf`, puis retire `/cv` du site publié : le PDF suit toujours le contenu du site. Le script prévient si le CV dépasse une page ou si son poids s'écarte de celui annoncé. Chrome est cherché dans `CHROME_PATH`, puis aux emplacements habituels.

En développement, les liens « Télécharger mon CV » ouvrent `/cv`, un aperçu fidèle du PDF avec la limite de la page A4 en pointillés : le PDF n'existe qu'après le build.

Les anciens thèmes ludiques (Gaming, Nature, Manuscrit, Terminal) restent récupérables via le tag git `themes-ludiques`.

## Stack

- [Nuxt 4](https://nuxt.com), TypeScript strict, site statique (`nuxt generate`)
- Toolchain [Vite+](https://viteplus.dev) : `vp` remplace npm pour les scripts
- Aucune dépendance UI : CSS pur en BEM, icônes simple-icons ([app/data/icons.ts](app/data/icons.ts)) et Lucide ([app/components/LineIcon.vue](app/components/LineIcon.vue))
- Polices Inter et Bricolage Grotesque auto-hébergées au build par [@nuxt/fonts](https://fonts.nuxt.com) : aucune requête vers Google à la visite

Tout le contenu vit dans [app/data/cv.ts](app/data/cv.ts), seul fichier à modifier pour mettre à jour le portfolio et le CV. Les captures des projets perso sont dans `public/projects/`.

## Développement

```bash
vp run dev               # serveur de dev sur http://localhost:3000
vp run generate          # site statique + CV en PDF dans .output/public
vp check                 # formatage, lint et types (TS)
vp exec nuxi typecheck   # types des templates .vue
vp test                  # tests unitaires (test/)
```

## Déploiement

Chaque push sur `main` déclenche le workflow GitHub Actions [deploy-ovh.yml](.github/workflows/deploy-ovh.yml) qui vérifie le code (`vp check`, tests), génère le site statique et le PDF, puis le synchronise en SFTP (`lftp mirror`) sur l'hébergement mutualisé OVH derrière [vincent.leostic.bzh](https://vincent.leostic.bzh/). Les en-têtes HTTP (HSTS, cache des fichiers du build, page 404) sont posés par [public/.htaccess](public/.htaccess).
