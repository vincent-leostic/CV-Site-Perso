<script setup lang="ts">
import { DEFAULT_THEME, themeHref } from "#shared/theme";
import { cv } from "~/data/cv";

const { currentTheme, followThemeLink } = useTheme();

// Référencement : le site doit sortir en tête sur « Vincent Leostic ».
// Nom en premier dans le titre ; canonique vers le domaine .bzh pour que
// les variantes ?theme= consolident vers la même URL ; fiche Person
// (JSON-LD) qui relie le site aux profils GitHub/LinkedIn.
const siteUrl = cv.website;
const seoTitle = `${cv.name} — ${cv.title}`;
const seoDescription = `CV de ${cv.name}, développeur logiciel à Brest, spécialisé front-end et UI/UX : Vue, Nuxt, TypeScript.`;

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogUrl: `${siteUrl}/`,
  ogType: "profile",
  ogImage: `${siteUrl}/og-image.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: `${cv.name}, ${cv.title}`,
  ogLocale: "fr_FR",
  twitterCard: "summary_large_image",
});

useHead({
  link: [{ rel: "canonical", href: `${siteUrl}/` }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Vincent Leostic",
        alternateName: cv.name,
        url: `${siteUrl}/`,
        image: `${siteUrl}${cv.photo}`,
        jobTitle: cv.title,
        address: { "@type": "PostalAddress", addressLocality: cv.location, addressCountry: "FR" },
        email: `mailto:${cv.email}`,
        sameAs: cv.links.map((link) => link.url),
      }),
    },
  ],
});
</script>

<template>
  <div class="site">
    <!-- La version Pro n'a pas d'en-tête : la feuille porte déjà le nom.
         Les versions ludiques gardent toujours un chemin de retour. -->
    <header v-if="currentTheme !== DEFAULT_THEME" class="site-header">
      <div class="site-header__inner">
        <p class="site-header__brand">{{ cv.name }}</p>
        <a
          class="site-header__back"
          :href="themeHref(DEFAULT_THEME)"
          @click="followThemeLink(DEFAULT_THEME, $event)"
          ><span aria-hidden="true">← </span>Revenir à la version pro</a
        >
      </div>
    </header>

    <!-- Chaque thème est un layout à part entière, nourri par les mêmes
         données (~/data/cv). Le composant est remonté à chaque changement
         de thème : sa chorégraphie d'entrée rejoue sous la révélation
         circulaire. -->
    <main class="site-main">
      <CvSerieux v-if="currentTheme === 'serieux'" />
      <CvGaming v-else-if="currentTheme === 'gaming'" />
      <CvNature v-else-if="currentTheme === 'nature'" />
      <CvManuscrit v-else-if="currentTheme === 'manuscrit'" />
      <CvTerminal v-else />
    </main>

    <footer class="site-footer">
      <ThemeLinks />
      <p>Fait avec Nuxt & TypeScript</p>
    </footer>
  </div>
</template>

<style scoped>
.site {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-header);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(10px);
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

.site-header__inner {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0.8rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

/* Le nom se tronque plutôt que de pousser le sélecteur hors de l'écran */
.site-header__brand {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--accent);
}

.site-header__back {
  flex: none;
  font-size: 0.9rem;
  font-weight: 600;
}

.site-header__back:is(:hover, :focus-visible) {
  text-decoration: underline;
}

.site-main {
  flex: 1;
}

/* Le HTML pré-rendu contient le layout Sérieux : masqué tant que le
   layout du thème choisi n'est pas monté (voir shared/theme.ts) */
:global(.theme-pending) .site-main {
  visibility: hidden;
}

.site-footer {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  text-align: center;
  padding: 1.5rem;
  color: var(--text-muted);
  font-size: 0.85rem;
  border-top: 1px solid var(--border);
}

@media (max-width: 400px) {
  .site-header__inner {
    padding-inline: 0.75rem;
    gap: 0.5rem;
  }
}

@media print {
  .site-header,
  .site-footer {
    display: none;
  }
}
</style>
