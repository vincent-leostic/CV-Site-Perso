<script setup lang="ts">
import { LINE_ICONS, type LineIconName } from "~/data/lineIcons";

defineProps<{ name: LineIconName }>();
</script>

<template>
  <svg
    class="line-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    v-html="LINE_ICONS[name]"
  />
</template>
