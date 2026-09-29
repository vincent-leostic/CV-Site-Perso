<script setup lang="ts">
import { cv } from "~/data/cv";

// Initiales gravées dans le sceau de cire (ex. « V·L »)
const initials = cv.name
  .split(" ")
  .map((part) => part.charAt(0))
  .join("·");

// Le colophon date l'ouvrage de l'année du build
const sealYear = toRoman(useRuntimeConfig().public.buildYear);
</script>

<template>
  <div class="layout manuscrit">
    <div class="folio">
      <p class="folio__ornament" aria-hidden="true">❦</p>
      <p class="folio__incipit">Cy commence la chronique de</p>
      <h1 class="folio__title">{{ cv.name }}</h1>
      <p class="folio__subtitle">{{ cv.title }}</p>

      <img
        class="folio__portrait"
        :src="cv.photo"
        :alt="`Portrait de ${cv.name}`"
        width="200"
        height="200"
      />

      <p class="folio__bio">{{ cv.bio }}</p>

      <ul class="contact" role="list">
        <li class="contact__item">{{ cv.age }} ans, {{ cv.location }}</li>
        <li class="contact__item">
          <a class="ink-link" :href="`mailto:${cv.email}`">{{ cv.email }}</a>
        </li>
        <li class="contact__item">
          <a class="ink-link" :href="toTelHref(cv.phone)">{{ cv.phone }}</a>
        </li>
        <li v-for="link in cv.links" :key="link.label" class="contact__item">
          <a class="ink-link" :href="link.url" target="_blank" rel="noopener">{{ link.label }}</a>
        </li>
      </ul>

      <!-- Chapitre I : les expériences -->
      <section class="chapter">
        <h2 class="chapter__title">
          <span class="chapter__num">Chapitre I</span>
          Des expériences
        </h2>
        <article v-for="exp in cv.experiences" :key="`${exp.role}-${exp.company}`" class="entry">
          <p class="entry__head">
            <span class="entry__pilcrow" aria-hidden="true">¶</span>
            <span class="entry__period">{{ exp.period }}</span>
          </p>
          <h3 class="entry__title">{{ exp.role }}</h3>
          <p class="entry__place">{{ exp.company }}</p>
          <p class="entry__text">{{ exp.description }}</p>
          <ul v-if="exp.missions" class="entry__missions" role="list">
            <li v-for="m in exp.missions" :key="m.title" class="mission">
              <span class="mission__title">{{ m.title }}</span>
              <span v-if="m.favorite" class="mission__fav" role="img" aria-label="Mission favorite"
                >★</span
              >
              <span v-if="m.badges" class="mission__casquettes"
                >({{ m.badges.join(", ").toLowerCase() }})</span
              >
              : {{ m.description }}
            </li>
          </ul>
        </article>
      </section>

      <!-- Chapitre II : les compétences, en inventaire -->
      <section class="chapter">
        <h2 class="chapter__title">
          <span class="chapter__num">Chapitre II</span>
          Des sçavoirs
        </h2>
        <p v-for="group in cv.skillGroups" :key="group.title" class="savoir">
          <span class="savoir__title">{{ group.title }}</span> :
          <template v-for="(skill, i) in group.skills" :key="skill.label">
            <span class="savoir__item"
              ><CvTechIcon v-if="skill.icon" class="savoir__icon" :name="skill.icon" />{{
                skill.label
              }}</span
            >{{ i < group.skills.length - 1 ? ", " : "." }}
          </template>
        </p>
        <p class="savoir">
          <span class="savoir__title">Langues</span> :
          <template v-for="(lang, i) in cv.languages" :key="lang.name"
            >{{ lang.name }} ({{ lang.level }}){{ i < cv.languages.length - 1 ? ", " : "." }}
          </template>
        </p>
        <p class="savoir">
          <span class="savoir__title">Passe-temps</span> : {{ cv.hobbies.join(", ") }}.
        </p>
      </section>

      <!-- Chapitre III : la formation -->
      <section class="chapter">
        <h2 class="chapter__title">
          <span class="chapter__num">Chapitre III</span>
          De la formation
        </h2>
        <article v-for="edu in cv.education" :key="edu.degree" class="entry">
          <p class="entry__head">
            <span class="entry__pilcrow" aria-hidden="true">¶</span>
            <span class="entry__period">{{ edu.period }}</span>
          </p>
          <h3 class="entry__title">{{ edu.degree }}</h3>
          <p class="entry__place">{{ edu.school }}</p>
        </article>
      </section>

      <!-- Chapitre IV : les projets perso -->
      <section class="chapter">
        <h2 class="chapter__title">
          <span class="chapter__num">Chapitre IV</span>
          Des ouvrages personnels
        </h2>
        <article v-for="proj in cv.personalProjects" :key="proj.title" class="entry">
          <p class="entry__head">
            <span class="entry__pilcrow" aria-hidden="true">¶</span>
            <a class="entry__period ink-link" :href="proj.url" target="_blank" rel="noopener">{{
              hostOf(proj.url)
            }}</a>
          </p>
          <h3 class="entry__title">{{ proj.title }}</h3>
          <p v-if="proj.stack" class="entry__place">
            Œuvré en {{ proj.stack.map((tech) => tech.label).join(", ") }}
          </p>
          <p class="entry__text">{{ proj.description }}</p>
        </article>
      </section>

      <!-- Colophon et sceau -->
      <div class="colophon">
        <p class="colophon__text">Fait &amp; scellé en l'an {{ sealYear }}</p>
        <div class="seal" aria-hidden="true">
          <span class="seal__initials">{{ initials }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Le folio du manuscrit : cadre double, papier plus clair */
.folio {
  --enter-y: 12px;
  background: var(--bg-card);
  border: 5px double var(--border);
  box-shadow: var(--shadow);
  padding: 3rem clamp(1.5rem, 6vw, 4rem);
  text-align: center;
  /* E-mail et domaines, sans espace, déborderaient sur petit écran */
  overflow-wrap: break-word;
  animation: enter 0.7s var(--ease-out) backwards;
}

.folio__ornament {
  color: var(--accent-2);
  font-size: 1.5rem;
  margin-bottom: 0.6rem;
}

.folio__incipit {
  font-family: var(--font-heading);
  font-style: italic;
  color: var(--text-muted);
  font-size: 1.05rem;
}

/* Le titre apparaît comme de l'encre qui sèche */
.folio__title {
  font-size: clamp(2rem, 5.5vw, 2.7rem);
  font-weight: 400;
  margin-bottom: 0.1rem;
  animation: ink 1s ease-out 0.15s backwards;
}

@keyframes ink {
  from {
    opacity: 0;
    filter: blur(3px);
  }
}

.folio__subtitle {
  font-family: var(--font-heading);
  font-style: italic;
  font-size: 1.2rem;
  color: var(--accent);
  margin-bottom: 1.4rem;
}

/* Portrait ovale façon gravure */
.folio__portrait {
  width: 112px;
  height: 128px;
  object-fit: cover;
  border-radius: 50%;
  filter: sepia(0.45) contrast(1.05) saturate(0.85);
  border: 3px solid var(--bg-card);
  box-shadow:
    0 0 0 1px var(--border),
    0 0 0 5px var(--bg-card),
    0 0 0 6px var(--border),
    var(--shadow);
  margin-bottom: 1.5rem;
}

/* Paragraphe d'introduction avec lettrine */
.folio__bio {
  text-align: justify;
  hyphens: auto;
  font-size: 1.08rem;
  line-height: 1.75;
  max-width: 640px;
  margin: 0 auto 1.4rem;
}

.folio__bio::first-letter {
  font-family: var(--font-heading);
  font-size: 3.1em;
  line-height: 0.78;
  float: left;
  padding: 0.06em 0.14em 0 0;
  color: var(--accent);
}

/* Contacts en ligne, séparés par des fleurons */
.contact {
  list-style: none;
  font-size: 0.98rem;
  margin-bottom: 2.2rem;
}

.contact__item {
  display: inline;
}

.contact__item + .contact__item::before {
  content: "❧" / "";
  color: var(--accent-2);
  margin: 0 0.6rem;
}

/* Lien souligné à l'ancienne : contacts et ouvrages */
.ink-link {
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}

/* --- Chapitres --- */
.chapter {
  --enter-y: 12px;
  margin-top: 2.4rem;
  animation: enter 0.6s var(--ease-out) backwards;
}

.chapter:nth-of-type(1) {
  animation-delay: 0.25s;
}

.chapter:nth-of-type(2) {
  animation-delay: 0.4s;
}

.chapter:nth-of-type(3) {
  animation-delay: 0.55s;
}

.chapter:nth-of-type(4) {
  animation-delay: 0.7s;
}

.chapter__title {
  font-size: 1.55rem;
  font-weight: 400;
  margin-bottom: 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.chapter__num {
  font-family: var(--font-body);
  font-variant: small-caps;
  letter-spacing: 0.22em;
  font-size: 0.82rem;
  color: var(--accent);
}

/* Filets de part et d'autre du titre de chapitre */
.chapter__title::after {
  content: "";
  width: 5.5rem;
  height: 1px;
  margin: 0.55rem auto 0;
  background: linear-gradient(90deg, transparent, var(--accent-2), transparent);
}

/* --- Entrées de la chronique --- */
.entry {
  max-width: 640px;
  margin: 0 auto;
  text-align: left;
}

.entry + .entry {
  margin-top: 1.4rem;
}

.entry__head {
  font-size: 0.92rem;
}

.entry__pilcrow {
  color: var(--accent);
  margin-right: 0.45rem;
}

.entry__period {
  font-variant: small-caps;
  letter-spacing: 0.12em;
  color: var(--accent);
}

.entry__title {
  font-size: 1.22rem;
  font-weight: 400;
}

.entry__place {
  font-style: italic;
  color: var(--text-muted);
  font-size: 0.98rem;
  margin-bottom: 0.3rem;
}

.entry__text {
  text-align: justify;
  hyphens: auto;
  font-size: 1rem;
  line-height: 1.7;
  white-space: pre-line;
}

.entry__missions {
  margin-top: 0.4rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.98rem;
  line-height: 1.6;
}

.mission::before {
  content: "· " / "";
  color: var(--accent);
}

.mission__title {
  font-variant: small-caps;
  letter-spacing: 0.04em;
  color: var(--accent);
}

.mission__fav {
  margin-left: 0.25em;
  color: var(--fav);
}

.mission__casquettes {
  font-style: italic;
  color: var(--text-muted);
  margin-left: 0.3rem;
}

/* --- Inventaire des sçavoirs --- */
.savoir {
  max-width: 640px;
  margin: 0 auto 0.55rem;
  text-align: justify;
  hyphens: auto;
  font-size: 1.02rem;
  line-height: 1.7;
}

.savoir__title {
  font-variant: small-caps;
  letter-spacing: 0.1em;
  color: var(--accent);
}

.savoir__item {
  white-space: nowrap;
}

/* Icônes « gravées » : encre sépia, légèrement estompées */
.savoir__icon {
  font-size: 0.85em;
  margin-right: 0.3em;
  opacity: 0.75;
}

/* --- Colophon & sceau de cire --- */
.colophon {
  margin-top: 2.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
}

.colophon__text {
  font-family: var(--font-heading);
  font-style: italic;
  color: var(--text-muted);
}

/* Le sceau se « tamponne » sur la page à l'arrivée */
.seal {
  position: relative;
  width: 76px;
  height: 76px;
  border-radius: 47% 53% 50% 50% / 52% 48% 52% 48%;
  background: radial-gradient(circle at 35% 30%, #a93b47, #7a1f2b 60%, #571219);
  box-shadow:
    inset 0 2px 6px rgba(255, 255, 255, 0.25),
    inset 0 -3px 8px rgba(0, 0, 0, 0.35),
    0 3px 10px rgba(58, 47, 30, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-6deg);
  animation: stamp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.9s backwards;
}

@keyframes stamp {
  from {
    opacity: 0;
    transform: rotate(-14deg) scale(1.9);
  }
}

/* Anneau gravé dans la cire */
.seal::before {
  content: "";
  position: absolute;
  inset: 9px;
  border-radius: inherit;
  border: 1px solid rgba(255, 255, 255, 0.22);
}

.seal__initials {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  color: rgba(255, 235, 220, 0.55);
  text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.4);
}

@media (max-width: 640px) {
  .folio {
    padding: 2rem 1.2rem;
  }
}
</style>
