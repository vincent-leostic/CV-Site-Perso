<script setup lang="ts">
const { initTheme } = useTheme();

onMounted(initTheme);
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>
