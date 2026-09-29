<script setup lang="ts">
import type { PersonalProject } from "~/data/types";

const { cv, ui } = useContent();

// Missions menées en ESN, à plat
const missions = computed(() => cv.value.experiences.flatMap((exp) => exp.missions ?? []));

// Projets en ligne (carte cliquable avec aperçu) et projets en cours (sans aperçu)
type LiveProject = PersonalProject & { url: string };
const liveProjects = computed(() =>
  cv.value.personalProjects.filter(
    (proj): proj is LiveProject => proj.url !== undefined && !proj.inProgress,
  ),
);
const projectsInProgress = computed(() =>
  cv.value.personalProjects.filter((proj) => proj.inProgress),
);
</script>

<template>
  <!-- Une seule section, en deux bandes de fond différent -->
  <section id="projets" class="projects" aria-labelledby="projets-title">
    <div class="section">
      <div class="section__inner">
        <p class="section__kicker">{{ ui.projects.kicker }}</p>
        <h2 id="projets-title" class="section__title">{{ ui.projects.title }}</h2>
        <p class="section__intro">{{ ui.projects.intro }}</p>

        <h3 class="projects__heading">{{ ui.projects.missionsHeading }}</h3>
        <ul class="projects__missions" role="list">
          <li v-for="m in missions" :key="m.title" class="mission-card">
            <p v-if="m.favorite" class="mission-card__fav">{{ ui.projects.favourite }}</p>
            <h4 class="mission-card__title">{{ m.title }}</h4>
            <p v-if="m.badges" class="mission-card__roles">
              {{
                sentenceList(
                  m.badges.map((role) => ui.roles[role]),
                  ui.intl,
                )
              }}
            </p>
            <p class="mission-card__desc">{{ m.description }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="section section--tint">
      <div class="section__inner">
        <h3 class="projects__heading">{{ ui.projects.personalHeading }}</h3>
        <ul class="projects__showcase" role="list">
          <li v-for="proj in liveProjects" :key="proj.title" class="project-card">
            <img
              v-if="proj.image"
              class="project-card__image"
              :src="proj.image"
              :alt="ui.projects.screenshotAlt(proj.title)"
              width="1280"
              height="800"
              loading="lazy"
            />
            <div class="project-card__body">
              <h4 class="project-card__title">
                <!-- Le lien s'étend à toute la carte ; son nom reste le titre -->
                <a
                  class="project-card__link"
                  :href="proj.url"
                  target="_blank"
                  rel="noopener"
                  data-umami-event="project-open"
                  :data-umami-event-project="proj.title"
                  >{{ proj.title }}<span class="visually-hidden">{{ ui.newTab }}</span></a
                >
              </h4>
              <p class="project-card__host">
                {{ hostOf(proj.url) }}<LineIcon class="project-card__arrow" name="arrow-up-right" />
              </p>
              <p class="project-card__desc">{{ proj.description }}</p>
              <ul v-if="proj.stack" class="project-card__stack" role="list">
                <li v-for="tech in proj.stack" :key="tech.label" class="tag">
                  <TechIcon v-if="tech.icon" class="tag__icon" :name="tech.icon" branded />{{
                    tech.label
                  }}
                </li>
              </ul>
            </div>
          </li>

          <!-- En cours : pas d'aperçu ni de lien, donc pas d'effet au survol -->
          <li
            v-for="proj in projectsInProgress"
            :key="proj.title"
            class="project-card project-card--in-progress"
          >
            <div class="project-card__body">
              <p class="project-card__status">{{ ui.projects.inProgress }}</p>
              <h4 class="project-card__title">{{ proj.title }}</h4>
              <p class="project-card__desc">{{ proj.description }}</p>
              <ul v-if="proj.stack" class="project-card__stack" role="list">
                <li v-for="tech in proj.stack" :key="tech.label" class="tag">
                  <TechIcon v-if="tech.icon" class="tag__icon" :name="tech.icon" branded />{{
                    tech.label
                  }}
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* L'ancre vise la section entière : l'en-tête collant ne masque pas le titre */
.projects {
  scroll-margin-top: 4rem;
}

.projects__heading {
  margin: 3rem 0 1.2rem;
  font-size: 1.15rem;
  font-weight: 700;
}

/* En tête de bande, le padding de la section suffit */
.projects__heading:first-child {
  margin-top: 0;
}

.projects__showcase {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(420px, 100%), 1fr));
  gap: 1.5rem;
}

/* --- Carte de projet perso : entièrement cliquable --- */
.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--bg-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition:
    transform 0.25s var(--ease-out),
    box-shadow 0.25s;
}

.project-card:has(.project-card__link:is(:hover, :focus-visible)) {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

/* La carte coupe ce qui déborde : le contour de focus l'entoure donc
   elle, plutôt que le lien */
.project-card:has(.project-card__link:focus-visible) {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

/* Projet en cours : toute la largeur sous les projets en ligne, contour
   en pointillé comme l'étape à venir de la frise */
.project-card--in-progress {
  grid-column: 1 / -1;
  box-shadow: none;
  border: 2px dashed color-mix(in srgb, var(--highlight) 55%, transparent);
}

.project-card__status {
  align-self: flex-start;
  padding: 0.2rem 0.75rem;
  border-radius: var(--radius-pill);
  background: var(--highlight);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text);
}

.project-card__image {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top;
  border-bottom: 1px solid var(--border);
}

.project-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.4rem 1.5rem 1.6rem;
}

.project-card__title {
  font-size: 1.3rem;
  font-weight: 800;
}

.project-card__link {
  color: var(--text);
}

.project-card__link::after {
  content: "";
  position: absolute;
  inset: 0;
}

.project-card__link:is(:hover, :focus-visible) {
  color: var(--accent);
}

.project-card__link:focus-visible {
  outline: none;
}

.project-card__host {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--highlight-text);
}

.project-card__desc {
  color: var(--text-muted);
}

.project-card__stack {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.4rem;
}

/* --- Missions : pas cliquables, donc pas d'effet au survol --- */
.projects__missions {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  gap: 1.2rem;
}

.mission-card {
  position: relative;
  padding: 1.4rem 1.5rem 1.5rem;
  background: var(--bg-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

/* Trait roux en tête de carte */
.mission-card::before {
  content: "";
  display: block;
  width: 2.5rem;
  height: 4px;
  margin-bottom: 1rem;
  border-radius: 4px;
  background: var(--highlight);
}

.mission-card__fav {
  position: absolute;
  top: 0.9rem;
  right: 1rem;
  padding: 0.15rem 0.65rem;
  border-radius: var(--radius-pill);
  background: var(--highlight);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text);
}

.mission-card__title {
  font-size: 1.1rem;
  font-weight: 700;
}

.mission-card__roles {
  margin-top: 0.3rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent);
}

.mission-card__desc {
  margin-top: 0.6rem;
  font-size: 0.95rem;
  color: var(--text-muted);
}

@media print {
  .project-card,
  .mission-card {
    box-shadow: none;
    border: 1px solid var(--border);
    break-inside: avoid;
  }
}
</style>
