# CV de Vincent Leostic

Site CV multi-thèmes, en ligne sur [vincent.leostic.bzh](https://vincent.leostic.bzh/).

Un même contenu, cinq mises en scène complètes. Le sélecteur en haut de page bascule d'un univers à l'autre, avec une transition circulaire (View Transitions). Le choix est conservé en localStorage et partageable via `?theme=` dans l'URL.

| Thème     | Ambiance                                        |
| --------- | ----------------------------------------------- |
| Sérieux   | feuille éditoriale, deux colonnes, timeline     |
| Gaming    | carte joueur, journal de missions, barres d'XP  |
| Nature    | hero organique, sentier alterné, jardin de tags |
| Manuscrit | parchemin, lettrine, chapitres, sceau de cire   |
| Terminal  | CRT phosphore, session shell auto-tapée         |

## Stack

- [Nuxt 3](https://nuxt.com) (compatibilityVersion 4), TypeScript strict
- Toolchain [Vite+](https://viteplus.dev) : `vp` remplace npm pour les scripts
- Aucune dépendance UI : CSS pur, icônes simple-icons inlinées ([app/components/cv/TechIcon.vue](app/components/cv/TechIcon.vue))

Tout le contenu du CV vit dans [app/data/cv.ts](app/data/cv.ts), seul fichier à modifier pour mettre à jour les infos.

## Développement

```bash
vp run dev     # serveur de dev sur http://localhost:3000
vp check       # formatage, lint et types
```

## Déploiement

Chaque push sur `main` déclenche le workflow GitHub Actions [deploy-ovh.yml](.github/workflows/deploy-ovh.yml) qui génère le site statique (`nuxt generate`) et le synchronise en SFTP (`lftp mirror`) sur l'hébergement mutualisé OVH derrière [vincent.leostic.bzh](https://vincent.leostic.bzh/).
