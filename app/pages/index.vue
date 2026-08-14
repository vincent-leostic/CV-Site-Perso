<script setup lang="ts">
import { cv } from "~/data/cv";

const { currentTheme } = useTheme();

useSeoMeta({
  title: `CV - ${cv.name}`,
  description: `CV en ligne de ${cv.name}, ${cv.title}`,
});
</script>

<template>
  <div class="page">
    <header class="header">
      <div class="header-inner">
        <div class="header-brand">{{ cv.name }}</div>
        <ThemeSwitcher />
      </div>
    </header>

    <!-- Chaque thème est un layout à part entière, nourri par les mêmes
         données (~/data/cv). Le composant est remonté à chaque changement
         de thème : sa chorégraphie d'entrée rejoue sous la révélation
         circulaire. -->
    <main class="main">
      <CvSerieux v-if="currentTheme === 'serieux'" />
      <CvGaming v-else-if="currentTheme === 'gaming'" />
      <CvNature v-else-if="currentTheme === 'nature'" />
      <CvManuscrit v-else-if="currentTheme === 'manuscrit'" />
      <CvTerminal v-else />
    </main>

    <footer class="footer">
      <p>Fait avec Nuxt & TypeScript</p>
    </footer>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-header);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(10px);
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

.header-inner {
  max-width: 1060px;
  margin: 0 auto;
  padding: 0.8rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.header-brand {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--accent);
  white-space: nowrap;
}

.main {
  flex: 1;
}

.footer {
  text-align: center;
  padding: 1.5rem;
  color: var(--text-muted);
  font-size: 0.85rem;
  border-top: 1px solid var(--border);
}
</style>
