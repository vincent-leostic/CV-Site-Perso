<script setup lang="ts">
const { cv, ui } = useContent();

const featured = computed(() => cv.value.interests.featured);
const nowPlaying = computed(() => cv.value.interests.nowPlaying);
const tiles = computed(() => cv.value.interests.tiles);
</script>

<template>
  <section id="loisirs" class="section section--alt hobbies" aria-labelledby="loisirs-title">
    <div class="section__inner">
      <p class="section__kicker">{{ ui.hobbies.kicker }}</p>
      <h2 id="loisirs-title" class="section__title">{{ ui.hobbies.title }}</h2>
      <p class="section__intro">{{ cv.interests.intro }}</p>

      <!-- Mosaïque : tuile phare, écoute du moment, puis tuiles en texte.
           Rien de cliquable, donc aucun effet au survol. -->
      <div class="bento">
        <div class="bento__tile bento__tile--featured">
          <p class="caption bento__caption">{{ featured.caption }}</p>
          <h3 class="bento__title bento__title--large">{{ featured.title }}</h3>
          <p class="bento__text">{{ featured.text }}</p>
        </div>

        <div class="bento__tile bento__tile--now">
          <p class="caption bento__caption">{{ nowPlaying.caption }}</p>
          <h3 class="bento__title bento__title--large">{{ nowPlaying.title }}</h3>
          <!-- Égaliseur décoratif, immobile -->
          <span class="bento__equalizer" aria-hidden="true">
            <span v-for="bar in 5" :key="bar" class="bento__bar" />
          </span>
        </div>

        <div v-for="tile in tiles" :key="tile.title" class="bento__tile">
          <h3 class="bento__title">{{ tile.title }}</h3>
          <p v-if="tile.text" class="bento__text">{{ tile.text }}</p>
          <p
            v-for="list in tile.lists ?? []"
            :key="list.label ?? list.items.join()"
            class="bento__list"
          >
            <strong v-if="list.label" class="bento__label">{{ list.label }}{{ ui.colon }}</strong>
            {{ listOf(list.items, ui.intl) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bento {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;
}

.bento__tile {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.6rem;
  border-radius: var(--radius);
  background: var(--bg);
}

/* Tuile phare : le dégradé de l'accroche, sur deux colonnes */
.bento__tile--featured {
  grid-column: span 2;
  color: var(--on-dark);
  background: linear-gradient(135deg, var(--dark) 0%, var(--accent) 100%);
}

.bento__tile--featured .bento__caption {
  color: var(--highlight-on-dark);
}

.bento__tile--featured .bento__text {
  color: var(--on-dark-soft);
}

/* Écoute du moment : texte encre sur roux (5,5:1) */
.bento__tile--now {
  color: var(--text);
  background: var(--highlight);
}

.bento__tile--now .bento__caption {
  color: var(--text);
}

.bento__title {
  font-size: 1.15rem;
  font-weight: 700;
}

.bento__title--large {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.bento__text,
.bento__list {
  color: var(--text-muted);
}

.bento__list {
  font-size: 0.95rem;
}

.bento__label {
  color: var(--text);
  font-weight: 600;
}

.bento__equalizer {
  display: flex;
  align-items: flex-end;
  gap: 5px;
  height: 2.6rem;
  margin-top: auto;
}

.bento__bar {
  width: 7px;
  border-radius: 4px;
  background: var(--text);
  opacity: 0.8;
}

.bento__bar:nth-child(1) {
  height: 45%;
}

.bento__bar:nth-child(2) {
  height: 90%;
}

.bento__bar:nth-child(3) {
  height: 60%;
}

.bento__bar:nth-child(4) {
  height: 100%;
}

.bento__bar:nth-child(5) {
  height: 35%;
}

@media (max-width: 900px) {
  .bento {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .bento {
    grid-template-columns: minmax(0, 1fr);
  }

  .bento__tile--featured {
    grid-column: auto;
  }
}

/* Les fonds ne s'impriment pas : la tuile phare repasse en encre */
@media print {
  .bento__tile {
    break-inside: avoid;
    border: 1px solid var(--border);
  }

  .bento__tile--featured,
  .bento__tile--featured .bento__caption,
  .bento__tile--featured .bento__text {
    color: var(--text);
  }

  .bento__tile--featured {
    background: none;
  }
}
</style>
