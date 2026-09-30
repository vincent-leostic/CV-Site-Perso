<script setup lang="ts">
import type { NuxtError } from "#app";
import { COMMON } from "~/data/common";

// Page d'erreur du site, surtout pour une adresse inconnue : en ligne, la
// page 404 de secours (.htaccess) démarre l'appli sur cette adresse, qui
// aboutit ici plutôt que sur la page par défaut de Nuxt, en anglais. La
// langue suit le préfixe de l'adresse (/en/…).
const props = defineProps<{ error: NuxtError }>();

const { ui } = useContent();
const localePath = useLocalePath();
const status = computed(() => props.error.status ?? 500);
const text = computed(() =>
  status.value === 404 ? ui.value.error.notFound : ui.value.error.unexpected,
);

// app.vue n'est pas rendu avec la page d'erreur : langue posée ici
useHead({ htmlAttrs: { lang: () => ui.value.intl } });
useSeoMeta({
  title: () => `${text.value.title} – ${COMMON.name}`,
  robots: "noindex, nofollow",
});
</script>

<template>
  <main class="error-page">
    <span class="error-page__ring" aria-hidden="true" />
    <Nightingale class="error-page__bird" />
    <div class="error-page__inner">
      <p class="section__kicker error-page__kicker">{{ status }}</p>
      <h1 class="error-page__title">{{ text.title }}</h1>
      <p class="error-page__text">{{ text.text }}</p>
      <!-- Vrai lien, pas NuxtLink : recharge l'appli, ce qui efface l'erreur -->
      <a class="button button--primary" :href="localePath('/')">{{ ui.error.back }}</a>
    </div>
  </main>
</template>

<style scoped>
/* Même fond que l'accroche : dégradé brun, anneau, rossignol perché en bas */
.error-page {
  --focus: var(--on-dark);
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: grid;
  place-items: center;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 3rem 1.5rem 8rem;
  color: var(--on-dark);
  background: linear-gradient(135deg, var(--dark) 0%, var(--accent) 100%);
}

.error-page__ring {
  position: absolute;
  z-index: -1;
  width: 200px;
  height: 200px;
  left: -70px;
  top: -80px;
  border: 30px solid color-mix(in srgb, var(--on-dark) 10%, transparent);
  border-radius: 50%;
}

.error-page__bird {
  position: absolute;
  z-index: -1;
  bottom: 0;
  right: 8%;
  width: clamp(140px, 22vw, 260px);
}

.error-page__inner {
  max-width: 34rem;
  text-align: center;
}

.error-page__kicker {
  color: var(--on-dark-soft);
}

.error-page__title {
  font-size: clamp(2rem, 6vw, 3.2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
}

.error-page__text {
  margin: 1rem 0 2rem;
  font-size: 1.1rem;
  color: var(--on-dark-soft);
}
</style>
