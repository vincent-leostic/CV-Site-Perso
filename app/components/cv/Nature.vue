<script setup lang="ts">
import { cv } from "~/data/cv";

/** Cartes légèrement penchées, en alternance */
function tilt(index: number) {
  return index % 2 === 0 ? "card--tilt-left" : "card--tilt-right";
}
</script>

<template>
  <div class="nature">
    <!-- Hero pleine largeur, décor organique -->
    <section class="hero">
      <div class="hero__blob hero__blob--a" aria-hidden="true" />
      <div class="hero__blob hero__blob--b" aria-hidden="true" />
      <svg
        v-for="n in 3"
        :key="n"
        class="hero__leaf"
        :class="`hero__leaf--${n}`"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
        />
      </svg>

      <div class="hero__content">
        <img
          class="hero__avatar"
          :src="cv.photo"
          :alt="`Photo de ${cv.name}`"
          width="200"
          height="200"
        />
        <h1 class="hero__name">{{ cv.name }}</h1>
        <p class="hero__role">{{ cv.title }}</p>
        <p class="hero__bio">{{ cv.bio }}</p>
        <ul class="hero__links" role="list">
          <li class="pill">{{ cv.age }} ans · {{ cv.location }}</li>
          <li>
            <a class="pill pill--link" :href="`mailto:${cv.email}`">{{ cv.email }}</a>
          </li>
          <li>
            <a class="pill pill--link" :href="toTelHref(cv.phone)">{{ cv.phone }}</a>
          </li>
          <li v-for="link in cv.links" :key="link.label">
            <a class="pill pill--link" :href="link.url" target="_blank" rel="noopener">
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- Le parcours : un sentier qui serpente -->
    <section class="nature__section nature__section--path">
      <h2 class="section-title">Mon parcours</h2>
      <div class="path">
        <article
          v-for="(exp, i) in cv.experiences"
          :key="`${exp.role}-${exp.company}`"
          class="step"
          :class="i % 2 === 0 ? 'step--left' : 'step--right'"
          :style="{ '--delay': `${0.2 + i * 0.15}s` }"
        >
          <span class="step__dot" aria-hidden="true" />
          <div class="card card--lift" :class="tilt(i)">
            <span class="chip">{{ exp.period }}</span>
            <h3 class="card__title">{{ exp.role }}</h3>
            <p class="card__meta">{{ exp.company }}</p>
            <p class="card__text">{{ exp.description }}</p>
            <ul v-if="exp.missions" class="shoots" role="list">
              <li v-for="m in exp.missions" :key="m.title" class="shoot">
                <div class="shoot__head">
                  <span class="shoot__title">
                    {{ m.title }}
                    <span
                      v-if="m.favorite"
                      class="shoot__fav"
                      role="img"
                      aria-label="Mission favorite"
                      >★</span
                    >
                  </span>
                  <!-- Espace explicite : sans lui, le dernier mot du titre reste
                       collé au premier badge et passe à la ligne avec lui -->
                  {{ " " }}
                  <ul v-if="m.badges" class="shoot__badges" role="list">
                    <li v-for="badge in m.badges" :key="badge" class="badge">{{ badge }}</li>
                  </ul>
                </div>
                <p class="shoot__desc">{{ m.description }}</p>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <!-- Compétences : un jardin de tags -->
    <section class="nature__section">
      <h2 class="section-title">Ce que je cultive</h2>
      <div v-for="group in cv.skillGroups" :key="group.title" class="bed">
        <h3 class="bed__title">{{ group.title }}</h3>
        <ul class="seed-list" role="list">
          <li v-for="skill in group.skills" :key="skill.label" class="seed">
            <CvTechIcon v-if="skill.icon" class="seed__icon" :name="skill.icon" />
            {{ skill.label }}
          </li>
        </ul>
      </div>
    </section>

    <!-- Projets perso : les semis qui poussent à côté -->
    <section class="nature__section nature__section--wide">
      <h2 class="section-title">Mes semis</h2>
      <p class="sprouts-intro">Des sites qui ont poussé en dehors du travail.</p>
      <ul class="sprouts" role="list">
        <li v-for="(proj, i) in cv.personalProjects" :key="proj.title">
          <a
            class="card card--lift sprout"
            :class="tilt(i)"
            :href="proj.url"
            target="_blank"
            rel="noopener"
          >
            <h3 class="card__title">{{ proj.title }}</h3>
            <p class="chip sprout__host">{{ hostOf(proj.url) }}</p>
            <p class="card__text">{{ proj.description }}</p>
            <ul v-if="proj.stack" class="seed-list sprout__seeds" role="list">
              <li v-for="tech in proj.stack" :key="tech.label" class="seed">
                <CvTechIcon v-if="tech.icon" class="seed__icon" :name="tech.icon" />
                {{ tech.label }}
              </li>
            </ul>
          </a>
        </li>
      </ul>
    </section>

    <!-- Formation : les racines -->
    <section class="nature__section">
      <h2 class="section-title">Mes racines</h2>
      <div class="roots">
        <article v-for="edu in cv.education" :key="edu.degree" class="card">
          <p class="chip">{{ edu.period }}</p>
          <h3 class="card__title">{{ edu.degree }}</h3>
          <p class="card__meta">{{ edu.school }}</p>
        </article>
      </div>

      <div class="extras">
        <p v-for="lang in cv.languages" :key="lang.name">
          <strong class="extras__key">{{ lang.name }}</strong> : {{ lang.level }}
        </p>
        <p><strong class="extras__key">Hobbies</strong> : {{ cv.hobbies.join(", ") }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.nature {
  padding-bottom: 3.5rem;
}

.nature__section {
  max-width: 800px;
  margin: 0 auto;
  padding: 3.5rem 1.5rem 0;
  text-align: center;
}

.nature__section--wide {
  max-width: 940px;
}

.nature__section--path {
  max-width: 940px;
  padding-top: 1.5rem;
  text-align: start;
}

/* --- Hero --- */
.hero {
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 4.5rem 1.5rem 4rem;
}

.hero__content {
  position: relative;
  z-index: 1;
}

/* Nappes de couleur flottantes */
.hero__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.5;
  animation: drift 14s ease-in-out infinite alternate;
}

.hero__blob--a {
  width: 340px;
  height: 300px;
  top: -80px;
  left: 12%;
  background: color-mix(in srgb, var(--accent) 30%, transparent);
}

.hero__blob--b {
  width: 300px;
  height: 280px;
  top: 30px;
  right: 10%;
  background: color-mix(in srgb, var(--accent-2) 26%, transparent);
  animation-delay: -7s;
}

@keyframes drift {
  to {
    transform: translate(28px, 18px) scale(1.08);
  }
}

/* Feuilles qui dérivent doucement */
.hero__leaf {
  position: absolute;
  width: 26px;
  height: 26px;
  fill: none;
  stroke: var(--accent);
  stroke-width: 1.6;
  opacity: 0.4;
  animation: sway 9s ease-in-out infinite alternate;
}

.hero__leaf--1 {
  top: 18%;
  left: 16%;
}

.hero__leaf--2 {
  top: 55%;
  right: 14%;
  stroke: var(--accent-2);
  width: 20px;
  animation-delay: -3s;
  animation-duration: 11s;
}

.hero__leaf--3 {
  bottom: 12%;
  left: 26%;
  width: 17px;
  animation-delay: -6s;
  animation-duration: 13s;
}

@keyframes sway {
  to {
    transform: translate(14px, 22px) rotate(38deg);
  }
}

.hero__avatar {
  --enter-s: 0.85;
  width: 132px;
  height: 132px;
  object-fit: cover;
  border-radius: 42% 58% 62% 38% / 46% 42% 58% 54%;
  border: 3px solid var(--bg-card);
  box-shadow:
    0 0 0 2px var(--accent-2),
    var(--shadow);
  margin-bottom: 1.3rem;
  animation: enter 0.7s var(--ease-out) backwards;
}

/* Le nom, le rôle, la bio et les liens montent l'un après l'autre */
.hero__name,
.hero__role,
.hero__bio,
.hero__links {
  --enter-y: 16px;
  animation: enter 0.7s var(--ease-out) backwards;
}

.hero__name {
  font-size: clamp(2.3rem, 6vw, 3.2rem);
  font-weight: 600;
  letter-spacing: -0.01em;
  animation-delay: 0.1s;
}

.hero__role {
  font-family: var(--font-heading);
  font-style: italic;
  font-size: 1.25rem;
  color: var(--accent-2-text);
  margin-bottom: 1rem;
  animation-delay: 0.18s;
}

.hero__bio {
  color: var(--text-muted);
  max-width: 620px;
  margin: 0 auto 1.5rem;
  animation-delay: 0.26s;
}

.hero__links {
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.6rem;
  animation-delay: 0.34s;
}

/* Pastille : simple étiquette, ou lien qui se soulève au survol */
.pill {
  display: block;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 0.35rem 1rem;
  font-size: 0.86rem;
  box-shadow: var(--shadow);
}

.pill--link {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.pill--link:is(:hover, :focus-visible) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

/* --- Titres de section --- */
.section-title {
  text-align: center;
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 0.6rem;
}

.section-title::after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 2.6rem;
  height: 3px;
  border-radius: var(--radius-pill);
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
}

/* --- Cartes : étapes du sentier, semis et racines --- */
.card {
  display: block;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 1.4rem 1.5rem;
  box-shadow: var(--shadow);
}

.card--tilt-left {
  transform: rotate(-0.5deg);
}

.card--tilt-right {
  transform: rotate(0.5deg);
}

.card--lift {
  transition:
    transform 0.25s,
    box-shadow 0.25s;
}

.card--lift:is(:hover, :focus-visible) {
  transform: rotate(0deg) translateY(-3px);
  box-shadow: var(--shadow-hover);
}

.card__title {
  font-size: 1.15rem;
  font-weight: 600;
}

.card__meta {
  font-size: 0.87rem;
  color: var(--text-muted);
  margin-bottom: 0.4rem;
}

.card__text {
  font-size: 0.9rem;
  color: var(--text-muted);
  white-space: pre-line;
}

/* Période ou domaine, en terracotta */
.chip {
  display: inline-block;
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--accent-2-text);
  background: color-mix(in srgb, var(--accent-2) 14%, transparent);
  border-radius: var(--radius-pill);
  padding: 0.12rem 0.65rem;
  margin-bottom: 0.4rem;
}

/* --- Le sentier --- */
.path {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 0.5rem 0;
}

/* Ligne pointillée centrale */
.path::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  border-left: 2px dashed color-mix(in srgb, var(--accent) 40%, transparent);
}

.step {
  position: relative;
  width: 50%;
  animation: enter 0.6s var(--ease-out) var(--delay) backwards;
}

.step--left {
  --enter-x: -20px;
  padding-right: 2.4rem;
}

.step--right {
  --enter-x: 20px;
  align-self: flex-end;
  padding-left: 2.4rem;
}

.step__dot {
  position: absolute;
  top: 1.6rem;
  width: 14px;
  height: 14px;
  border-radius: 50% 50% 50% 4px;
  background: var(--accent);
  border: 3px solid var(--bg);
  z-index: 1;
}

.step--left .step__dot {
  right: -8px;
  transform: rotate(45deg);
}

.step--right .step__dot {
  left: -8px;
  transform: rotate(225deg);
}

/* Missions : les pousses de l'expérience */
.shoots {
  margin-top: 0.6rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.shoot__head::before {
  content: "• " / "";
  color: var(--accent);
}

.shoot__title {
  font-weight: 700;
  color: var(--text);
}

.shoot__fav {
  color: var(--fav);
}

.shoot__badges {
  display: inline;
  list-style: none;
}

.shoot__desc {
  padding-left: 0.85rem;
}

.badge {
  display: inline-block;
  margin-left: 0.3rem;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.5;
  color: var(--accent-hover);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border-radius: var(--radius-pill);
  padding: 0 0.45rem;
  vertical-align: middle;
}

/* --- Le jardin de compétences --- */
.bed + .bed {
  margin-top: 1.6rem;
}

.bed__title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 0.7rem;
}

.seed-list {
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.seed {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--bg-card);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, var(--border));
  color: var(--text);
  border-radius: var(--radius-pill);
  padding: 0.3rem 0.9rem;
  font-size: 0.86rem;
  box-shadow: var(--shadow);
  transition: transform 0.25s;
}

.seed__icon {
  color: var(--accent);
  font-size: 0.95em;
}

/* Légère dispersion organique */
.seed:nth-child(3n + 1) {
  transform: rotate(-1.5deg);
}

.seed:nth-child(3n + 2) {
  transform: rotate(1.2deg) translateY(2px);
}

.seed:nth-child(3n) {
  transform: rotate(-0.6deg) translateY(-1px);
}

.seed:hover {
  transform: rotate(0deg) scale(1.06);
}

/* --- Les semis --- */
.sprouts-intro {
  color: var(--text-muted);
  font-style: italic;
  margin: -1.4rem 0 1.6rem;
}

.sprouts {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: 1.2rem;
}

.sprout__host {
  margin: 0.25rem 0 0.5rem;
}

.sprout__seeds {
  margin-top: 0.8rem;
}

/* --- Les racines --- */
.roots {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.extras {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.95rem;
  color: var(--text-muted);
}

.extras__key {
  color: var(--text);
  font-weight: 700;
}

@media (max-width: 680px) {
  .path::before {
    left: 8px;
  }

  .step--left,
  .step--right {
    width: 100%;
    align-self: auto;
    padding-left: 2rem;
    padding-right: 0;
  }

  .step--left .step__dot,
  .step--right .step__dot {
    left: 1px;
    right: auto;
  }
}
</style>
