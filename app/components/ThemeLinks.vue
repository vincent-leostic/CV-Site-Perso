<script setup lang="ts">
import { DEFAULT_THEME, THEME_LABELS, themeHref } from "#shared/theme";

const { currentTheme, themes, followThemeLink } = useTheme();

const otherThemes = computed(() => themes.filter((theme) => theme !== currentTheme.value));
</script>

<template>
  <nav class="theme-links" aria-label="Autres versions du CV">
    <p class="theme-links__intro">
      {{
        currentTheme === DEFAULT_THEME
          ? "Ce CV existe aussi en version ludique :"
          : "Autres versions de ce CV :"
      }}
    </p>
    <ul class="theme-links__list" role="list">
      <li v-for="theme in otherThemes" :key="theme" class="theme-links__item">
        <a
          class="theme-links__link"
          :href="themeHref(theme)"
          @click="followThemeLink(theme, $event)"
          >{{ THEME_LABELS[theme] }}</a
        >
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.theme-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  gap: 0.2rem 0.5rem;
}

.theme-links__list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.theme-links__item + .theme-links__item::before {
  content: "·" / "";
  margin: 0 0.5rem;
}

.theme-links__link {
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}
</style>
