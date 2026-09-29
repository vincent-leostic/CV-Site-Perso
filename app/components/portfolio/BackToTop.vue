<script setup lang="ts">
// Visible dès que l'accroche (#top) est sortie de l'écran
const visible = ref(false);
let observer: IntersectionObserver | undefined;

onMounted(() => {
  const hero = document.getElementById("top");
  if (!hero) return;
  observer = new IntersectionObserver((entries) => {
    visible.value = !entries.some((entry) => entry.isIntersecting);
  });
  observer.observe(hero);
});

onUnmounted(() => observer?.disconnect());
</script>

<template>
  <!-- Un simple lien vers #top : le défilement doux vient du CSS et
       respecte prefers-reduced-motion. Masqué (v-show), il sort de
       l'ordre de tabulation. -->
  <Transition name="back-to-top">
    <a v-show="visible" class="back-to-top" href="#top" aria-label="Remonter en haut de la page">
      <LineIcon class="back-to-top__icon" name="arrow-up" />
    </a>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 40;
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--highlight);
  color: var(--text);
  box-shadow: var(--shadow-hover);
  transition:
    background-color 0.2s,
    transform 0.2s var(--ease-out);
}

.back-to-top:is(:hover, :focus-visible) {
  background: var(--highlight-hover);
  color: var(--text);
  transform: translateY(-3px);
}

/* Le bouton flotte aussi au-dessus du bloc Contact brun : un contour
   blanc cerclé de brun sombre reste visible sur tous les fonds */
.back-to-top:focus-visible {
  outline: 2px solid var(--on-dark);
  outline-offset: 2px;
  box-shadow:
    0 0 0 6px var(--dark),
    var(--shadow-hover);
}

.back-to-top__icon {
  font-size: 1.3rem;
}

/* Apparition : fondu et léger glissement vers le haut */
.back-to-top-enter-active,
.back-to-top-leave-active {
  transition:
    opacity 0.25s,
    transform 0.25s var(--ease-out);
}

.back-to-top-enter-from,
.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(0.75rem);
}

@media (max-width: 400px) {
  .back-to-top {
    right: 0.75rem;
    bottom: 0.75rem;
  }
}

@media print {
  .back-to-top {
    display: none;
  }
}
</style>
