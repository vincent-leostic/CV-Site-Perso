# Portfolio de Vincent Leostic

Portfolio une page, en ligne sur [vincent.leostic.bzh](https://vincent.leostic.bzh/) : accroche, à propos, projets (sites perso avec captures, missions en ESN), compétences, parcours, loisirs et contact, avec le CV à télécharger en PDF. En français sur `/`, en anglais britannique sur [`/en/`](https://vincent.leostic.bzh/en/), avec un interrupteur FR/EN dans l'en-tête et sans redirection automatique.

Palette « rossignol », parce que LEOSTIC vient du breton eostig, rossignol : brun du dos pour les liens et les titres, roux de la queue pour la touche vive (boutons, décors), chamois et crème pour les fonds.

## Le CV en PDF

Le CV est une feuille A4 d'une page aux couleurs du site : en-tête brun (photo, titre, disponibilité, coordonnées), parcours et projets perso à gauche, compétences, formation, langues et loisirs dans une colonne chamois. Sa source est la page `/cv` ([app/components/CvSheet.vue](app/components/CvSheet.vue)), cotée en mm et en pt. Après `nuxt generate`, [scripts/cv-pdf.mjs](scripts/cv-pdf.mjs) l'imprime avec Chrome en mode headless dans chaque langue (`cv-vincent-leostic.pdf` depuis `/cv`, `cv-vincent-leostic-en.pdf` depuis `/en/cv`), puis retire ces pages du site publié : le PDF suit toujours le contenu du site. Si un CV dépasse une page, le build échoue et rien n'est publié ; si son poids s'écarte de celui annoncé, le script prévient. Chrome est cherché dans `CHROME_PATH`, puis aux emplacements habituels.

Les miniatures de partage (`og-image.png` et `og-image-en.png`, 1200 × 630) suivent le même chemin : [scripts/og-image.mjs](scripts/og-image.mjs) capture les pages `/og` et `/en/og` (gabarit [app/pages/og.vue](app/pages/og.vue), qui reprend l'accroche), puis les retire du site : une miniature aux mauvaises dimensions fait échouer le build. Les deux gabarits répondent 404 en ligne.

Le favicon est le rossignol de l'accroche sur le dégradé brun du site ([public/favicon.svg](public/favicon.svg)). Pour les navigateurs et appareils qui ne lisent pas le SVG, [scripts/favicon.mjs](scripts/favicon.mjs) en tire au build `favicon.ico` (32 px) et `apple-touch-icon.png` (180 px, coins carrés : iOS les arrondit lui-même).

En développement, les liens « Télécharger mon CV » ouvrent l'aperçu de la langue affichée (`/cv` ou `/en/cv`), un aperçu fidèle du PDF avec la limite de la page A4 en pointillés : le PDF n'existe qu'après le build.

Les anciens thèmes ludiques (Gaming, Nature, Manuscrit, Terminal) restent récupérables via le tag git `themes-ludiques`.

## Stack

- [Nuxt 4](https://nuxt.com), TypeScript strict, site statique (`nuxt generate`)
- [@nuxtjs/i18n](https://i18n.nuxtjs.org) pour les adresses par langue et les balises `hreflang`
- Chaîne d'outils [Vite+](https://viteplus.dev) : `vp` remplace npm pour les scripts
- Aucune dépendance UI : CSS pur en BEM, icônes simple-icons ([app/data/icons.ts](app/data/icons.ts)) et Lucide ([app/data/lineIcons.ts](app/data/lineIcons.ts))
- Polices Inter et Bricolage Grotesque auto-hébergées au build par [@nuxt/fonts](https://fonts.nuxt.com) : aucune requête vers Google à la visite

Tout le contenu se trouve dans [app/data/fr.ts](app/data/fr.ts) et [app/data/en.ts](app/data/en.ts) : textes du portfolio et du CV, puis textes d'interface. Les données communes (nom, e-mail, liens…) sont dans [app/data/common.ts](app/data/common.ts). Les types imposent les mêmes champs dans les deux langues, et un test vérifie que les deux fichiers gardent la même structure (liens, icônes, images, casquettes). Les captures des projets perso sont dans `public/projects/` : un original de 1280 × 800 en webp, plus deux versions réduites pour les petits écrans, à générer ainsi :

```bash
vp dlx sharp-cli -i projet.webp -o projet-640.webp -f webp -q 80 resize 640
vp dlx sharp-cli -i projet.webp -o projet-960.webp -f webp -q 80 resize 960
```

## Développement

```bash
vp run dev               # serveur de dev sur http://localhost:3000
vp run generate          # site statique, CV en PDF, miniatures et favicons dans .output/public
vp check                 # formatage, lint et types (TS)
vp exec nuxi typecheck   # types des templates .vue
vp test                  # tests unitaires (test/)
```

## Déploiement

Chaque push sur `main` déclenche le workflow GitHub Actions [deploy-ovh.yml](.github/workflows/deploy-ovh.yml) qui vérifie le code (`vp check`, tests), génère le site statique, les CV en PDF, les miniatures et les icônes, puis synchronise le tout en SFTP (`lftp mirror`) sur l'hébergement mutualisé OVH derrière [vincent.leostic.bzh](https://vincent.leostic.bzh/). Les en-têtes HTTP (HSTS, cache des fichiers du build, page 404) sont posés par [public/.htaccess](public/.htaccess).
