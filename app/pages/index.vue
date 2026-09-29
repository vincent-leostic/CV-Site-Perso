<script setup lang="ts">
import { cv } from "~/data/cv";

// Référencement : le site doit sortir en tête sur « Vincent Leostic ».
// Nom en premier dans le titre ; canonique vers le domaine .bzh ; fiche
// Person (JSON-LD) qui relie le site aux profils GitHub/LinkedIn et
// décrit compétences, langues et diplômes.
const siteUrl = cv.website;
const obtainedEducation = cv.education.filter((edu) => !edu.inProgress);
const seoTitle = `${cv.name} - Portfolio`;
const seoDescription = `Portfolio de ${cv.name}, développeur logiciel à Brest, spécialisé front-end, UI/UX et accessibilité : Vue, Nuxt, TypeScript. Projets, compétences, parcours et CV à télécharger.`;

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
        description: cv.bio,
        // « Divers » mêle méthode et habitudes : pas des domaines de compétence
        knowsAbout: cv.skillGroups
          .filter((group) => group.title !== "Divers")
          .flatMap((group) => group.skills.map((skill) => skill.label)),
        knowsLanguage: cv.languages.map((language) => ({
          "@type": "Language",
          name: language.name,
        })),
        alumniOf: obtainedEducation.flatMap((edu) =>
          edu.school ? [{ "@type": "EducationalOrganization", name: edu.school }] : [],
        ),
        hasCredential: obtainedEducation.map((edu) => ({
          "@type": "EducationalOccupationalCredential",
          name: edu.degree,
        })),
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
    <a class="site__skip" href="#contenu">Aller au contenu</a>
    <PortfolioHeader />
    <main id="contenu" class="site__main" tabindex="-1">
      <PortfolioHero />
      <PortfolioAbout />
      <PortfolioProjects />
      <PortfolioSkills />
      <PortfolioJourney />
      <PortfolioHobbies />
      <PortfolioContact />
    </main>
    <footer class="site__footer">
      <p>Site conçu et développé par {{ cv.name }}, avec Nuxt et TypeScript.</p>
    </footer>
    <PortfolioBackToTop />
  </div>
</template>

<style scoped>
/* Le portfolio s'imprime avec des marges (voir @page portfolio) */
.site {
  page: portfolio;
}

/* Lien d'évitement : invisible jusqu'au premier Tab */
.site__skip {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 100;
  padding: 0.6rem 1rem;
  border-radius: var(--radius-pill);
  background: var(--dark);
  color: var(--on-dark);
  font-weight: 700;
  transform: translateY(-200%);
}

.site__skip:focus-visible {
  transform: none;
  color: var(--on-dark);
}

/* Cible du lien d'évitement, pas un élément interactif */
.site__main:focus {
  outline: none;
}

.site__footer {
  padding: 1.5rem;
  text-align: center;
  font-size: 0.85rem;
  color: var(--on-dark-soft);
  background: var(--dark);
  border-top: 1px solid color-mix(in srgb, var(--on-dark) 12%, transparent);
}

@media print {
  .site__footer {
    display: none;
  }
}
</style>
