<script setup lang="ts">
import { ICONS, type IconName } from "~/data/icons";

const props = defineProps<{ name: IconName; branded?: boolean }>();

/**
 * Icône de marque, remplie en currentColor : chaque thème la colore via la
 * couleur de texte courante, sauf si `branded` est passé, auquel cas elle
 * prend la couleur officielle de la marque.
 */
const icon = computed(() => ICONS[props.name]);
</script>

<template>
  <svg
    class="tech-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
    :style="branded ? { color: icon.brand } : undefined"
  >
    <path :d="icon.path" fill="currentColor" />
  </svg>
</template>
