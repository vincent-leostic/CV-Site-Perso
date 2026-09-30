<script setup lang="ts">
import { LANGUAGE_LABELS } from "~/data/common";
import { LOCALES } from "~/data/content";

const { ui } = useContent();
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <!-- Interrupteur FR/EN. La langue affichée est du texte, l'autre un lien
       étendu à tout l'interrupteur : un clic n'importe où change de langue.
       La pastille rousse glisse sous la langue affichée. -->
  <div
    class="lang-switch"
    :style="{ '--index': LOCALES.indexOf(locale) }"
    role="group"
    :aria-label="ui.header.language"
  >
    <span class="lang-switch__thumb" aria-hidden="true" />
    <template v-for="code in LOCALES" :key="code">
      <span v-if="code === locale" class="lang-switch__option lang-switch__option--current">{{
        code.toUpperCase()
      }}</span>
      <NuxtLink
        v-else
        class="lang-switch__option lang-switch__link"
        :to="switchLocalePath(code)"
        :lang="code"
        :hreflang="code"
        data-track="lang-switch"
        :data-track-to="code"
        >{{ code.toUpperCase()
        }}<span class="visually-hidden"> ({{ LANGUAGE_LABELS[code] }})</span></NuxtLink
      >
    </template>
  </div>
</template>

<style scoped>
/* Piste à deux cases, même hauteur que les autres boutons de l'en-tête */
.lang-switch {
  --option: 2rem;
  --gap: 3px;
  position: relative;
  isolation: isolate;
  display: flex;
  flex: none;
  padding: var(--gap);
  border: 2px solid var(--border);
  border-radius: var(--radius-pill);
  background: var(--bg-card);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  transition: border-color 0.2s;
}

.lang-switch:has(.lang-switch__link:hover) {
  border-color: var(--accent);
}

/* Pastille sous la langue affichée : décalée d'une case par rang */
.lang-switch__thumb {
  position: absolute;
  z-index: -1;
  top: var(--gap);
  left: var(--gap);
  width: var(--option);
  height: calc(100% - 2 * var(--gap));
  border-radius: var(--radius-pill);
  background: var(--highlight);
  transform: translateX(calc(var(--index) * 100%));
  transition: transform 0.3s var(--ease-out);
}

.lang-switch__option {
  display: grid;
  place-items: center;
  width: var(--option);
  height: calc(2.3rem - 2 * var(--gap) - 4px);
  color: var(--text-muted);
}

/* Encre sur roux, comme les boutons du site */
.lang-switch__option--current {
  color: var(--text);
}

.lang-switch__link {
  transition: color 0.2s;
}

.lang-switch__link:is(:hover, :focus-visible) {
  color: var(--text);
}

/* Zone cliquable étendue à tout l'interrupteur, bordure comprise */
.lang-switch__link::after {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: var(--radius-pill);
}

/* Le contour de focus entoure l'interrupteur entier */
.lang-switch__link:focus-visible {
  outline: none;
}

.lang-switch__link:focus-visible::after {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
</style>
