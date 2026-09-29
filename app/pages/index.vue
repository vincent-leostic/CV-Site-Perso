<script setup lang="ts">
import type { Locale } from "~/data/types";

// Référencement : le site doit sortir en tête sur « Vincent Leostic ».
// Nom en premier dans le titre ; fiche Person (JSON-LD) qui relie le site
// aux profils GitHub/LinkedIn et décrit compétences, langues et diplômes.
// Canonique, hreflang, og:url et og:locale viennent de useLocaleHead
// (app.vue).
const { cv, ui } = useContent();
const { locale } = useI18n();
const localePath = useLocalePath();

const siteUrl = cv.value.website;
const pageUrl = computed(() => `${siteUrl}${localePath("/")}`);

useSeoMeta({
  title: () => ui.value.seo.title,
  description: () => ui.value.seo.description,
  ogTitle: () => ui.value.seo.title,
  ogDescription: () => ui.value.seo.description,
  ogType: "profile",
  ogImage: () => `${siteUrl}/${OG_IMAGE_FILES[locale.value as Locale]}`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: () => ui.value.seo.ogImageAlt,
  twitterCard: "summary_large_image",
});

useHead(() => {
  const obtainedEducation = cv.value.education.filter((edu) => !edu.inProgress);
  return {
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Vincent Leostic",
          alternateName: cv.value.name,
          url: pageUrl.value,
          image: `${siteUrl}${cv.value.photo}`,
          jobTitle: cv.value.title,
          description: cv.value.bio,
          knowsAbout: cv.value.skillGroups
            .filter((group) => !group.misc)
            .flatMap((group) => group.skills.map((skill) => skill.label)),
          knowsLanguage: cv.value.languages.map((language) => ({
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
          address: {
            "@type": "PostalAddress",
            addressLocality: cv.value.location,
            addressCountry: "FR",
          },
          email: `mailto:${cv.value.email}`,
          sameAs: cv.value.links.map((link) => link.url),
        }),
      },
    ],
  };
});
</script>

<template>
  <PortfolioHero />
  <PortfolioAbout />
  <PortfolioProjects />
  <PortfolioSkills />
  <PortfolioJourney />
  <PortfolioHobbies />
  <PortfolioContact />
  <PortfolioBackToTop />
</template>
