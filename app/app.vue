<script setup lang="ts">
// Langue de la page, canonique, hreflang, og:url et og:locale selon la
// langue affichée (module i18n)
const i18nHead = useLocaleHead({ dir: false });
useHead(() => ({
  htmlAttrs: { lang: i18nHead.value.htmlAttrs.lang },
  link: [...i18nHead.value.link],
  meta: [...i18nHead.value.meta],
}));
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
