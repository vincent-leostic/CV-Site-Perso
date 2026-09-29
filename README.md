# CV de Vincent Leostic

Site CV multi-thèmes, en ligne sur [vincent.leostic.bzh](https://vincent.leostic.bzh/).

Le CV s'ouvre toujours en version Pro. Quatre variantes ludiques du même contenu sont proposées discrètement en pied de page, avec une transition circulaire (View Transitions) ; la version affichée est portée par `?theme=` dans l'URL (lien partageable), sans être mémorisée.

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
- Aucune dépendance UI : CSS pur en BEM, icônes simple-icons inlinées ([app/data/icons.ts](app/data/icons.ts))
- Polices auto-hébergées au build par [@nuxt/fonts](https://fonts.nuxt.com) : aucune requête vers Google à la visite

Tout le contenu du CV vit dans [app/data/cv.ts](app/data/cv.ts), seul fichier à modifier pour mettre à jour les infos (y compris les niveaux des compétences, affichés en jauges par les thèmes Gaming et Terminal).

La liste des thèmes et leur résolution au chargement (`?theme=`, puis choix sauvegardé, puis défaut) sont définies une seule fois dans [shared/theme.ts](shared/theme.ts).

## Développement

```bash
vp run dev     # serveur de dev sur http://localhost:3000
vp check       # formatage, lint et types (TS)
vp exec nuxi typecheck   # types des templates .vue
vp test        # tests unitaires (test/)
```

## Déploiement

Chaque push sur `main` déclenche le workflow GitHub Actions [deploy-ovh.yml](.github/workflows/deploy-ovh.yml) qui vérifie le code (`vp check`, tests), génère le site statique (`nuxt generate`) et le synchronise en SFTP (`lftp mirror`) sur l'hébergement mutualisé OVH derrière [vincent.leostic.bzh](https://vincent.leostic.bzh/). Les en-têtes HTTP (HSTS, cache des fichiers du build, page 404) sont posés par [public/.htaccess](public/.htaccess).
