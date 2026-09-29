<script setup lang="ts">
import { cv } from "~/data/cv";

// Gabarit du PDF téléchargeable (scripts/cv-pdf.mjs) : retiré du site
// publié une fois le PDF imprimé. En développement, sert d'aperçu.
useSeoMeta({
  title: `${cv.name} - CV`,
  robots: "noindex, nofollow",
});
</script>

<template>
  <main class="cv-preview">
    <p class="cv-preview__note">
      Aperçu du CV en PDF, page non publiée.
      <NuxtLink to="/">Retour au portfolio</NuxtLink>
    </p>
    <div class="cv-preview__page">
      <CvSheet />
    </div>
  </main>
</template>

<style scoped>
.cv-preview {
  min-height: 100vh;
  padding: 1.5rem 1rem 3rem;
  overflow-x: auto;
  background: color-mix(in srgb, var(--dark) 14%, var(--bg));
}

.cv-preview__note {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 210mm;
  margin: 0 auto 1rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.cv-preview__page {
  position: relative;
  width: 210mm;
  margin-inline: auto;
  box-shadow: var(--shadow-hover);
}

/* Limite de la page A4 : si le contenu la dépasse, le PDF fera deux pages */
.cv-preview__page::after {
  content: "Fin de la page A4";
  position: absolute;
  top: 297mm;
  left: 0;
  right: 0;
  padding-top: 0.25rem;
  border-top: 2px dashed var(--highlight-text);
  font-size: 0.75rem;
  font-weight: 600;
  text-align: right;
  color: var(--highlight-text);
  pointer-events: none;
}

@media print {
  .cv-preview {
    min-height: 0;
    padding: 0;
    background: none;
  }

  .cv-preview__note,
  .cv-preview__page::after {
    display: none;
  }

  .cv-preview__page {
    box-shadow: none;
  }
}
</style>
