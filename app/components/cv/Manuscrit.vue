<script setup lang="ts">
import { cv } from "~/data/cv";
import TechIcon from "./TechIcon.vue";

// Initiales gravées dans le sceau de cire (ex. « V·L »)
const initials = cv.name
  .split(" ")
  .map((part) => part.charAt(0))
  .join("·");
</script>

<template>
  <div class="manuscrit">
    <div class="page">
      <p class="ornament" aria-hidden="true">❦</p>
      <p class="incipit">Cy commence la chronique de</p>
      <h1 class="title">{{ cv.name }}</h1>
      <p class="subtitle">{{ cv.title }}</p>

      <img
        class="portrait"
        :src="cv.photo"
        :alt="`Portrait de ${cv.name}`"
        width="200"
        height="200"
      />

      <p class="bio">{{ cv.bio }}</p>

      <p class="contact">
        <a :href="`mailto:${cv.email}`">{{ cv.email }}</a>
        <template v-for="link in cv.links" :key="link.label">
          <span class="fleuron" aria-hidden="true">❧</span>
          <a :href="link.url" target="_blank" rel="noopener">{{ link.label }}</a>
        </template>
      </p>

      <!-- Chapitre I : les expériences -->
      <section class="chapter-sec">
        <h2 class="chapter">
          <span class="chapter-num">Chapitre I</span>
          Des expériences
        </h2>
        <article v-for="exp in cv.experiences" :key="`${exp.role}-${exp.company}`" class="entry">
          <p class="entry-head">
            <span class="pilcrow" aria-hidden="true">¶</span>
            <span class="period">{{ exp.period }}</span>
          </p>
          <h3 class="entry-role">{{ exp.role }}</h3>
          <p class="entry-place">{{ exp.company }}</p>
          <p class="entry-text">{{ exp.description }}</p>
        </article>
      </section>

      <!-- Chapitre II : les compétences, en inventaire -->
      <section class="chapter-sec">
        <h2 class="chapter">
          <span class="chapter-num">Chapitre II</span>
          Des sçavoirs
        </h2>
        <p v-for="group in cv.skillGroups" :key="group.title" class="savoir">
          <span class="savoir-title">{{ group.title }}</span> :
          <template v-for="(skill, i) in group.skills" :key="skill">
            <span class="savoir-item"><TechIcon :label="skill" />{{ skill }}</span
            >{{ i < group.skills.length - 1 ? ", " : "." }}
          </template>
        </p>
      </section>

      <!-- Chapitre III : la formation -->
      <section class="chapter-sec">
        <h2 class="chapter">
          <span class="chapter-num">Chapitre III</span>
          De la formation
        </h2>
        <article v-for="edu in cv.education" :key="edu.degree" class="entry">
          <p class="entry-head">
            <span class="pilcrow" aria-hidden="true">¶</span>
            <span class="period">{{ edu.period }}</span>
          </p>
          <h3 class="entry-role">{{ edu.degree }}</h3>
          <p class="entry-place">{{ edu.school }}</p>
        </article>
      </section>

      <!-- Colophon et sceau -->
      <div class="colophon">
        <p class="colophon-text">Fait &amp; scellé en l'an MMXXVI</p>
        <div class="seal" aria-hidden="true">
          <span class="seal-initials">{{ initials }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.manuscrit {
  max-width: 780px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 3.5rem;
}

/* La page du manuscrit : cadre double, papier plus clair */
.page {
  background: var(--bg-card);
  border: 5px double var(--border);
  box-shadow: var(--shadow);
  padding: 3rem clamp(1.5rem, 6vw, 4rem);
  text-align: center;
  animation: page-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

@keyframes page-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
}

.ornament {
  color: var(--accent-2);
  font-size: 1.5rem;
  margin-bottom: 0.6rem;
}

.incipit {
  font-family: var(--font-heading);
  font-style: italic;
  color: var(--text-muted);
  font-size: 1.05rem;
}

/* Le titre apparaît comme de l'encre qui sèche */
.title {
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

.subtitle {
  font-family: var(--font-heading);
  font-style: italic;
  font-size: 1.2rem;
  color: var(--accent);
  margin-bottom: 1.4rem;
}

/* Portrait ovale façon gravure */
.portrait {
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
.bio {
  text-align: justify;
  hyphens: auto;
  font-size: 1.08rem;
  line-height: 1.75;
  max-width: 560px;
  margin: 0 auto 1.4rem;
}

.bio::first-letter {
  font-family: var(--font-heading);
  font-size: 3.1em;
  line-height: 0.78;
  float: left;
  padding: 0.06em 0.14em 0 0;
  color: var(--accent);
}

.contact {
  font-size: 0.98rem;
  margin-bottom: 2.2rem;
}

.contact a {
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}

.fleuron {
  color: var(--accent-2);
  margin: 0 0.6rem;
}

/* --- Chapitres --- */
.chapter-sec {
  margin-top: 2.4rem;
  animation: page-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

.chapter-sec:nth-of-type(1) {
  animation-delay: 0.25s;
}

.chapter-sec:nth-of-type(2) {
  animation-delay: 0.4s;
}

.chapter-sec:nth-of-type(3) {
  animation-delay: 0.55s;
}

.chapter {
  font-size: 1.55rem;
  font-weight: 400;
  margin-bottom: 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.chapter-num {
  font-family: var(--font-body);
  font-variant: small-caps;
  letter-spacing: 0.22em;
  font-size: 0.82rem;
  color: var(--accent);
}

/* Filets de part et d'autre du titre de chapitre */
.chapter::after {
  content: "";
  width: 5.5rem;
  height: 1px;
  margin: 0.55rem auto 0;
  background: linear-gradient(90deg, transparent, var(--accent-2), transparent);
}

/* --- Entrées de la chronique --- */
.entry {
  max-width: 560px;
  margin: 0 auto;
  text-align: left;
}

.entry + .entry {
  margin-top: 1.4rem;
}

.entry-head {
  font-size: 0.92rem;
}

.pilcrow {
  color: var(--accent);
  margin-right: 0.45rem;
}

.period {
  font-variant: small-caps;
  letter-spacing: 0.12em;
  color: var(--accent);
}

.entry-role {
  font-size: 1.22rem;
  font-weight: 400;
}

.entry-place {
  font-style: italic;
  color: var(--text-muted);
  font-size: 0.98rem;
  margin-bottom: 0.3rem;
}

.entry-text {
  text-align: justify;
  hyphens: auto;
  font-size: 1rem;
  line-height: 1.7;
}

/* --- Inventaire des sçavoirs --- */
.savoir {
  max-width: 560px;
  margin: 0 auto 0.55rem;
  text-align: justify;
  hyphens: auto;
  font-size: 1.02rem;
  line-height: 1.7;
}

.savoir-title {
  font-variant: small-caps;
  letter-spacing: 0.1em;
  color: var(--accent);
}

.savoir-item {
  white-space: nowrap;
}

/* Icônes « gravées » : encre sépia, légèrement estompées */
.savoir-item .tech-icon {
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

.colophon-text {
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

.seal-initials {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  color: rgba(255, 235, 220, 0.55);
  text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.4);
}

@media (max-width: 640px) {
  .page {
    padding: 2rem 1.2rem;
  }
}
</style>
