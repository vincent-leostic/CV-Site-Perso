<script setup lang="ts">
const { ui } = useContent();
</script>

<template>
  <!-- Mise en page du portfolio. D'une langue à l'autre, seule la page
       change : l'en-tête reste monté et son interrupteur de langue glisse. -->
  <div class="site">
    <a class="site__skip" href="#contenu">{{ ui.skipLink }}</a>
    <PortfolioHeader />
    <main id="contenu" class="site__main" tabindex="-1">
      <slot />
    </main>
    <footer class="site__footer">
      <p>{{ ui.footer }}</p>
      <p class="site__analytics">{{ ui.analytics }}</p>
    </footer>
  </div>
</template>

<style scoped>
/* Le portfolio s'imprime avec des marges (voir @page portfolio) */
.site {
  page: portfolio;
}

/* Lien d'évitement : invisible jusqu'au premier Tab */
.site__skip {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 100;
  padding: 0.6rem 1rem;
  border-radius: var(--radius-pill);
  background: var(--dark);
  color: var(--on-dark);
  font-weight: 700;
  transform: translateY(-200%);
}

.site__skip:focus-visible {
  transform: none;
  color: var(--on-dark);
}

/* Cible du lien d'évitement, pas un élément interactif */
.site__main:focus {
  outline: none;
}

.site__footer {
  padding: 1.5rem;
  text-align: center;
  font-size: 0.85rem;
  color: var(--on-dark-soft);
  background: var(--dark);
  border-top: 1px solid color-mix(in srgb, var(--on-dark) 12%, transparent);
}

.site__analytics {
  margin-top: 0.25rem;
  font-size: 0.78rem;
  opacity: 0.85;
}

@media print {
  .site__footer {
    display: none;
  }
}
</style>
