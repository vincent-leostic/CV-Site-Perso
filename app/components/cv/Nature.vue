<script setup lang="ts">
import { cv } from "~/data/cv";
import TechIcon from "./TechIcon.vue";

const telHref = `tel:${cv.phone.replaceAll(" ", "")}`;

/** Domaine affiché d'un projet, sans le www */
function projectHost(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}
</script>

<template>
  <div class="nature">
    <!-- Hero pleine largeur, décor organique -->
    <section class="hero">
      <div class="blob blob-a" aria-hidden="true" />
      <div class="blob blob-b" aria-hidden="true" />
      <svg class="leaf leaf-1" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
        />
      </svg>
      <svg class="leaf leaf-2" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
        />
      </svg>
      <svg class="leaf leaf-3" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
        />
      </svg>

      <img class="avatar" :src="cv.photo" :alt="`Photo de ${cv.name}`" width="200" height="200" />
      <h1 class="name">{{ cv.name }}</h1>
      <p class="role">{{ cv.title }}</p>
      <p class="bio">{{ cv.bio }}</p>
      <div class="links">
        <span class="pill">{{ cv.age }} ans · {{ cv.location }}</span>
        <a class="pill" :href="`mailto:${cv.email}`">{{ cv.email }}</a>
        <a class="pill" :href="telHref">{{ cv.phone }}</a>
        <a
          v-for="link in cv.links"
          :key="link.label"
          class="pill"
          :href="link.url"
          target="_blank"
          rel="noopener"
        >
          {{ link.label }}
        </a>
      </div>
    </section>

    <!-- Le parcours : un sentier qui serpente -->
    <section class="path-sec">
      <h2 class="n-title">Mon parcours</h2>
      <div class="path">
        <article
          v-for="(exp, i) in cv.experiences"
          :key="`${exp.role}-${exp.company}`"
          class="step"
          :class="i % 2 === 0 ? 'is-left' : 'is-right'"
          :style="{ '--delay': `${0.2 + i * 0.15}s` }"
        >
          <span class="dot" aria-hidden="true" />
          <div class="step-card">
            <span class="period">{{ exp.period }}</span>
            <h3 class="step-role">{{ exp.role }}</h3>
            <p class="company">{{ exp.company }}</p>
            <p class="desc">{{ exp.description }}</p>
            <ul v-if="exp.missions" class="shoots">
              <li v-for="m in exp.missions" :key="m.title">
                <span class="shoot-title"
                  >{{ m.title
                  }}<span v-if="m.favorite" class="fav" role="img" aria-label="Mission favorite">
                    ★</span
                  >
                  <span v-for="badge in m.badges ?? []" :key="badge" class="shoot-badge">{{
                    badge
                  }}</span></span
                >
                <span class="shoot-desc">{{ m.description }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <!-- Compétences : un jardin de tags -->
    <section class="garden">
      <h2 class="n-title">Ce que je cultive</h2>
      <div v-for="group in cv.skillGroups" :key="group.title" class="bed">
        <h3 class="bed-title">{{ group.title }}</h3>
        <div class="seeds">
          <span v-for="skill in group.skills" :key="skill" class="seed">
            <TechIcon :label="skill" />{{ skill }}
          </span>
        </div>
      </div>
    </section>

    <!-- Projets perso : les semis qui poussent à côté -->
    <section class="sprouts">
      <h2 class="n-title">Mes semis</h2>
      <p class="sprouts-intro">Des sites qui ont poussé en dehors du travail.</p>
      <div class="sprout-list">
        <a
          v-for="proj in cv.personalProjects"
          :key="proj.title"
          class="sprout"
          :href="proj.url"
          target="_blank"
          rel="noopener"
        >
          <h3 class="sprout-title">{{ proj.title }}</h3>
          <p class="sprout-host">{{ projectHost(proj.url) }}</p>
          <p class="desc">{{ proj.description }}</p>
          <div v-if="proj.stack" class="seeds sprout-seeds">
            <span v-for="tech in proj.stack" :key="tech" class="seed">
              <TechIcon :label="tech" />{{ tech }}
            </span>
          </div>
        </a>
      </div>
    </section>

    <!-- Formation : les racines -->
    <section class="roots">
      <h2 class="n-title">Mes racines</h2>
      <div class="root-list">
        <article v-for="edu in cv.education" :key="edu.degree" class="root">
          <p class="period">{{ edu.period }}</p>
          <h3 class="root-degree">{{ edu.degree }}</h3>
          <p class="company">{{ edu.school }}</p>
        </article>
      </div>

      <div class="extras">
        <p v-for="lang in cv.languages" :key="lang.name">
          <strong>{{ lang.name }}</strong> : {{ lang.level }}
        </p>
        <p><strong>Hobbies</strong> : {{ cv.hobbies.join(", ") }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.nature {
  padding-bottom: 3.5rem;
}

/* --- Hero --- */
.hero {
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 4.5rem 1.5rem 4rem;
}

.hero > :not(.blob, .leaf) {
  position: relative;
  z-index: 1;
}

/* Nappes de couleur flottantes */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.5;
  animation: drift 14s ease-in-out infinite alternate;
}

.blob-a {
  width: 340px;
  height: 300px;
  top: -80px;
  left: 12%;
  background: color-mix(in srgb, var(--accent) 30%, transparent);
}

.blob-b {
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
.leaf {
  position: absolute;
  width: 26px;
  height: 26px;
  fill: none;
  stroke: var(--accent);
  stroke-width: 1.6;
  opacity: 0.4;
  animation: sway 9s ease-in-out infinite alternate;
}

.leaf-1 {
  top: 18%;
  left: 16%;
}

.leaf-2 {
  top: 55%;
  right: 14%;
  stroke: var(--accent-2);
  width: 20px;
  animation-delay: -3s;
  animation-duration: 11s;
}

.leaf-3 {
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

.avatar {
  width: 132px;
  height: 132px;
  object-fit: cover;
  border-radius: 42% 58% 62% 38% / 46% 42% 58% 54%;
  border: 3px solid var(--bg-card);
  box-shadow:
    0 0 0 2px var(--accent-2),
    var(--shadow);
  margin-bottom: 1.3rem;
  animation: bloom 0.7s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

@keyframes bloom {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
}

.name {
  font-size: clamp(2.3rem, 6vw, 3.2rem);
  font-weight: 600;
  letter-spacing: -0.01em;
  animation: rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s backwards;
}

.role {
  font-family: var(--font-heading);
  font-style: italic;
  font-size: 1.25rem;
  color: var(--accent-2);
  margin-bottom: 1rem;
  animation: rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.18s backwards;
}

.bio {
  color: var(--text-muted);
  max-width: 620px;
  margin: 0 auto 1.5rem;
  animation: rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.26s backwards;
}

.links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.6rem;
  animation: rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.34s backwards;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}

.pill {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.35rem 1rem;
  font-size: 0.86rem;
  box-shadow: var(--shadow);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.pill:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

/* --- Titres de section --- */
.n-title {
  text-align: center;
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 0.6rem;
}

.n-title::after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 2.6rem;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
}

/* --- Le sentier --- */
.path-sec {
  max-width: 940px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 0;
}

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
}

.step.is-left {
  padding-right: 2.4rem;
  animation: from-l 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--delay) backwards;
}

.step.is-right {
  align-self: flex-end;
  padding-left: 2.4rem;
  animation: from-r 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--delay) backwards;
}

@keyframes from-l {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
}

@keyframes from-r {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
}

.dot {
  position: absolute;
  top: 1.6rem;
  width: 14px;
  height: 14px;
  border-radius: 50% 50% 50% 4px;
  background: var(--accent);
  border: 3px solid var(--bg);
  z-index: 1;
}

.step.is-left .dot {
  right: -8px;
  transform: rotate(45deg);
}

.step.is-right .dot {
  left: -8px;
  transform: rotate(225deg);
}

.step-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 1.4rem;
  box-shadow: var(--shadow);
  transition:
    transform 0.25s,
    box-shadow 0.25s;
}

.step.is-left .step-card {
  transform: rotate(-0.5deg);
}

.step.is-right .step-card {
  transform: rotate(0.5deg);
}

.step-card:hover {
  transform: rotate(0deg) translateY(-3px);
  box-shadow: var(--shadow-hover);
}

.period {
  display: inline-block;
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--accent-2);
  background: color-mix(in srgb, var(--accent-2) 14%, transparent);
  border-radius: 999px;
  padding: 0.12rem 0.65rem;
  margin-bottom: 0.4rem;
}

.step-role {
  font-size: 1.15rem;
  font-weight: 600;
}

.company {
  font-size: 0.87rem;
  color: var(--text-muted);
  margin-bottom: 0.4rem;
}

.desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  white-space: pre-line;
}

.shoots {
  margin-top: 0.6rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  font-size: 0.9rem;
  color: var(--text-muted);
  text-align: left;
}

.shoots li::before {
  content: "• ";
  color: var(--accent);
}

.shoot-title {
  font-weight: 700;
  color: var(--text);
}

.shoot-desc {
  display: block;
  padding-left: 0.85rem;
}

.fav {
  color: #e0a416;
}

.shoot-badge {
  display: inline-block;
  font-size: 0.58rem;
  font-weight: 700;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border-radius: 999px;
  padding: 0.04rem 0.4rem;
  margin-left: 0.3rem;
  vertical-align: middle;
}

.extras {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.95rem;
  color: var(--text-muted);
}

.extras strong {
  color: var(--text);
  font-weight: 700;
}

/* --- Le jardin de compétences --- */
.garden {
  max-width: 800px;
  margin: 0 auto;
  padding: 3.5rem 1.5rem 0;
  text-align: center;
}

.bed + .bed {
  margin-top: 1.6rem;
}

.bed-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 0.7rem;
}

.seeds {
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
  border-radius: 999px;
  padding: 0.3rem 0.9rem;
  font-size: 0.86rem;
  box-shadow: var(--shadow);
  transition: transform 0.25s;
}

.seed .tech-icon {
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
.sprouts {
  max-width: 940px;
  margin: 0 auto;
  padding: 3.5rem 1.5rem 0;
  text-align: center;
}

.sprouts-intro {
  color: var(--text-muted);
  font-style: italic;
  margin: -1.4rem 0 1.6rem;
}

.sprout-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.2rem;
}

.sprout {
  display: block;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 1.4rem 1.5rem;
  box-shadow: var(--shadow);
  transition:
    transform 0.25s,
    box-shadow 0.25s;
}

.sprout:nth-child(odd) {
  transform: rotate(-0.5deg);
}

.sprout:nth-child(even) {
  transform: rotate(0.5deg);
}

.sprout:hover {
  transform: rotate(0deg) translateY(-3px);
  box-shadow: var(--shadow-hover);
}

.sprout-title {
  font-size: 1.15rem;
  font-weight: 600;
}

.sprout-host {
  display: inline-block;
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--accent-2);
  background: color-mix(in srgb, var(--accent-2) 14%, transparent);
  border-radius: 999px;
  padding: 0.12rem 0.65rem;
  margin: 0.25rem 0 0.5rem;
}

.sprout-seeds {
  margin-top: 0.8rem;
}

/* --- Les racines --- */
.roots {
  max-width: 800px;
  margin: 0 auto;
  padding: 3.5rem 1.5rem 0;
  text-align: center;
}

.root-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.root {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.2rem 1.5rem;
  box-shadow: var(--shadow);
}

.root-degree {
  font-size: 1.08rem;
  font-weight: 600;
}

@media (max-width: 680px) {
  .path::before {
    left: 8px;
  }

  .step,
  .step.is-right {
    width: 100%;
    align-self: auto;
    padding-left: 2rem;
    padding-right: 0;
  }

  .step.is-left {
    padding-left: 2rem;
    padding-right: 0;
  }

  .step.is-left .dot,
  .step.is-right .dot {
    left: 1px;
    right: auto;
  }
}
</style>
