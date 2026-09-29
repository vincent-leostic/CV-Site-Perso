<script setup lang="ts">
import { cv } from "~/data/cv";

// Niveau affiché sur la carte joueur (années chez iD3i, arrondies)
const PLAYER_LEVEL = 7;
</script>

<template>
  <div class="layout gaming">
    <!-- Carte joueur -->
    <section class="player-card">
      <div class="player-card__portrait">
        <img
          class="player-card__avatar"
          :src="cv.photo"
          :alt="`Photo de ${cv.name}`"
          width="200"
          height="200"
        />
        <span class="player-card__level">LVL {{ PLAYER_LEVEL }}</span>
      </div>
      <h1 class="player-card__name">{{ cv.name }}</h1>
      <p class="player-card__class">
        {{ cv.title }}<span class="player-card__cursor" aria-hidden="true" />
      </p>
      <p class="player-card__meta">Age {{ cv.age }} · {{ cv.location }}</p>
      <p class="player-card__bio">{{ cv.bio }}</p>
      <ul class="player-card__menu" role="list">
        <li>
          <a class="menu-button" :href="`mailto:${cv.email}`">Contact</a>
        </li>
        <li>
          <a class="menu-button" :href="toTelHref(cv.phone)">{{ cv.phone }}</a>
        </li>
        <li v-for="link in cv.links" :key="link.label">
          <a class="menu-button" :href="link.url" target="_blank" rel="noopener">
            {{ link.label }}
          </a>
        </li>
      </ul>
    </section>

    <div class="hud">
      <!-- Journal de missions : les expériences -->
      <section class="panel hud__main">
        <h2 class="panel__title">Journal de missions</h2>
        <article
          v-for="(exp, i) in cv.experiences"
          :key="`${exp.role}-${exp.company}`"
          class="mission"
          :style="{ '--delay': `${0.25 + i * 0.12}s` }"
        >
          <p class="mission__tag">
            Mission {{ String(cv.experiences.length - i).padStart(2, "0") }}
            <span class="mission__period">{{ exp.period }}</span>
          </p>
          <h3 class="mission__role">{{ exp.role }}</h3>
          <p class="mission__zone">{{ exp.company }}</p>
          <p class="mission__desc">{{ exp.description }}</p>
          <ul v-if="exp.missions" class="mission__objectives" role="list">
            <li v-for="m in exp.missions" :key="m.title" class="objective">
              <div class="objective__head">
                <span class="objective__title">
                  {{ m.title }}
                  <span
                    v-if="m.favorite"
                    class="objective__fav"
                    role="img"
                    aria-label="Mission favorite"
                    >★</span
                  >
                </span>
                <!-- Espace explicite : sans lui, le dernier mot du titre reste
                     collé au premier tag et passe à la ligne avec lui -->
                {{ " " }}
                <ul v-if="m.badges" class="objective__tags" role="list">
                  <li v-for="badge in m.badges" :key="badge" class="tag objective__tag">
                    {{ badge }}
                  </li>
                </ul>
              </div>
              <p class="objective__desc">{{ m.description }}</p>
            </li>
          </ul>
        </article>
      </section>

      <div class="hud__side">
        <!-- Stats : les compétences en barres d'XP -->
        <section class="panel">
          <h2 class="panel__title">Stats</h2>
          <div v-for="group in cv.skillGroups" :key="group.title" class="stat-group">
            <h3 class="stat-group__title">{{ group.title }}</h3>
            <ul class="stat-group__list" role="list">
              <li
                v-for="(skill, i) in group.skills"
                :key="skill.label"
                class="stat"
                :style="{ '--level': `${skill.level}%`, '--delay': `${0.35 + i * 0.08}s` }"
              >
                <div class="stat__head">
                  <span class="stat__name">
                    <CvTechIcon v-if="skill.icon" class="stat__icon" :name="skill.icon" />
                    {{ skill.label }}
                  </span>
                  <span class="stat__value">{{ skill.level }}</span>
                </div>
                <div class="stat__bar" aria-hidden="true"><span class="stat__fill" /></div>
              </li>
            </ul>
          </div>
        </section>

        <!-- Quêtes annexes : les projets perso -->
        <section class="panel">
          <h2 class="panel__title">Quêtes annexes</h2>
          <ul class="quest-list" role="list">
            <li v-for="proj in cv.personalProjects" :key="proj.title">
              <a class="quest" :href="proj.url" target="_blank" rel="noopener">
                <p class="quest__name">
                  {{ proj.title }} <span class="quest__arrow" aria-hidden="true">↗</span>
                </p>
                <p class="quest__desc">{{ proj.description }}</p>
                <ul v-if="proj.stack" class="quest__tags" role="list">
                  <li v-for="tech in proj.stack" :key="tech.label" class="tag">
                    {{ tech.label }}
                  </li>
                </ul>
              </a>
            </li>
          </ul>
        </section>

        <!-- Formation -->
        <section class="panel">
          <h2 class="panel__title">Formation</h2>
          <div v-for="edu in cv.education" :key="edu.degree" class="cert">
            <p class="cert__period">{{ edu.period }}</p>
            <h3 class="cert__name">{{ edu.degree }}</h3>
            <p class="cert__school">{{ edu.school }}</p>
          </div>
        </section>

        <!-- Langues & hobbies -->
        <section class="panel extras">
          <h2 class="panel__title">Extras</h2>
          <p v-for="lang in cv.languages" :key="lang.name" class="extras__line">
            <span class="extras__key">{{ lang.name }}</span> : {{ lang.level }}
          </p>
          <p class="extras__line">
            <span class="extras__key">Hobbies</span> : {{ cv.hobbies.join(", ") }}
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gaming {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

/* --- Carte joueur --- */
.player-card {
  --enter-s: 0.96;
  position: relative;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 2.5rem 2rem 2.2rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  clip-path: polygon(
    0 0,
    calc(100% - 22px) 0,
    100% 22px,
    100% 100%,
    22px 100%,
    0 calc(100% - 22px)
  );
  animation: enter 0.55s var(--ease-out) backwards;
}

/* Crochets de visée aux coins */
.player-card::before,
.player-card::after {
  content: "";
  position: absolute;
  width: 22px;
  height: 22px;
}

.player-card::before {
  top: 10px;
  left: 10px;
  border-top: 2px solid var(--accent);
  border-left: 2px solid var(--accent);
}

.player-card::after {
  bottom: 10px;
  right: 10px;
  border-bottom: 2px solid var(--accent);
  border-right: 2px solid var(--accent);
}

.player-card__portrait {
  position: relative;
  display: inline-block;
  margin-bottom: 1.1rem;
}

.player-card__avatar {
  display: block;
  width: 108px;
  height: 108px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid var(--accent);
  box-shadow: 0 0 26px color-mix(in srgb, var(--accent) 35%, transparent);
  animation: avatar-pulse 3.5s ease-in-out infinite;
}

@keyframes avatar-pulse {
  50% {
    box-shadow: 0 0 38px color-mix(in srgb, var(--accent) 55%, transparent);
  }
}

.player-card__level {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--bg);
  background: var(--accent);
  padding: 0.05rem 0.55rem;
  border-radius: 3px;
  white-space: nowrap;
}

.player-card__name {
  font-size: clamp(1.7rem, 4.5vw, 2.3rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-shadow: 0 0 28px color-mix(in srgb, var(--accent) 40%, transparent);
}

.player-card__class {
  font-family: var(--font-heading);
  color: var(--accent);
  font-weight: 600;
  font-size: 1.05rem;
  letter-spacing: 0.06em;
  margin-bottom: 1rem;
}

/* Curseur de terminal clignotant */
.player-card__cursor::after {
  content: "▌";
  margin-left: 2px;
  color: var(--accent-2);
  animation: blink 1.1s steps(2) infinite;
}

.player-card__meta {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent-2);
  margin: -0.6rem 0 0.8rem;
}

.player-card__bio {
  color: var(--text-muted);
  max-width: 520px;
  margin: 0 auto 1.3rem;
  font-size: 0.92rem;
}

.player-card__menu {
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.6rem;
}

/* Bouton biseauté : le clip-path couperait le contour de focus, qui est
   donc dessiné à l'intérieur */
.menu-button {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.4rem 1.1rem;
  border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
  clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
  transition:
    background-color 0.2s,
    color 0.2s;
}

.menu-button:is(:hover, :focus-visible) {
  background: color-mix(in srgb, var(--accent) 18%, transparent);
  color: var(--accent-hover);
}

.menu-button:focus-visible {
  outline-offset: -4px;
}

/* --- Grille HUD --- */
.hud {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 1.4rem;
  align-items: start;
}

.hud__main {
  --enter-x: -22px;
  animation: enter 0.55s var(--ease-out) 0.15s backwards;
}

.hud__side {
  --enter-x: 22px;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  animation: enter 0.55s var(--ease-out) 0.2s backwards;
}

.panel {
  position: relative;
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 1.5rem;
  clip-path: polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%);
}

/* Liseré dégradé en haut de chaque panneau */
.panel::before {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  opacity: 0.65;
}

.panel__title {
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--accent);
  margin-bottom: 1.2rem;
}

.panel__title::before {
  content: "// " / "";
  color: var(--accent-2);
}

/* --- Missions --- */
.mission {
  --enter-x: -22px;
  padding: 1rem 0 1rem 1.1rem;
  border-left: 2px solid color-mix(in srgb, var(--accent) 35%, transparent);
  animation: enter 0.5s var(--ease-out) var(--delay) backwards;
}

.mission + .mission {
  margin-top: 0.4rem;
}

.mission__tag {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent-2);
  margin-bottom: 0.3rem;
}

.mission__period {
  color: var(--accent);
  white-space: nowrap;
}

.mission__role {
  font-size: 1.05rem;
  font-weight: 700;
}

.mission__zone {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.35rem;
}

.mission__desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  white-space: pre-line;
}

.mission__objectives {
  margin-top: 0.6rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.objective__head::before {
  content: "▸ " / "";
  color: var(--accent-2);
}

.objective__title {
  font-weight: 600;
  color: var(--text);
}

.objective__fav {
  color: var(--fav);
  text-shadow: 0 0 8px color-mix(in srgb, var(--fav) 55%, transparent);
}

.objective__tags {
  display: inline;
  list-style: none;
}

.objective__tag {
  margin-left: 0.35rem;
}

.objective__desc {
  padding-left: 1.05rem;
}

/* Étiquettes : casquettes et technos */
.tag {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1.5;
  color: var(--accent-2);
  border: 1px solid color-mix(in srgb, var(--accent-2) 45%, transparent);
  border-radius: 3px;
  padding: 0 0.4rem;
  vertical-align: middle;
}

/* --- Stats --- */
.stat-group + .stat-group {
  margin-top: 1.1rem;
}

.stat-group__title {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.stat-group__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat__head {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
}

.stat__name {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-width: 0;
}

.stat__icon {
  color: var(--accent);
  filter: drop-shadow(0 0 4px color-mix(in srgb, var(--accent) 55%, transparent));
}

.stat__value {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  color: var(--accent);
}

.stat__bar {
  height: 6px;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border-radius: 2px;
  overflow: hidden;
}

/* Barre d'XP : se remplit à l'arrivée */
.stat__fill {
  display: block;
  height: 100%;
  width: var(--level);
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  border-radius: 2px;
  animation: fill 0.9s var(--ease-out) var(--delay) backwards;
}

@keyframes fill {
  from {
    width: 0;
  }
}

/* --- Quêtes annexes --- */
.quest-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

/* Même biseau que les boutons du menu : contour de focus intérieur */
.quest {
  display: block;
  padding: 0.7rem 0.8rem;
  border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
  clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
  transition: background-color 0.2s;
}

.quest:is(:hover, :focus-visible) {
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}

.quest:focus-visible {
  outline-offset: -4px;
}

.quest__name {
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--accent);
}

.quest__arrow {
  color: var(--accent-2);
}

.quest__desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.quest__tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.45rem;
}

/* --- Formation --- */
.cert + .cert {
  margin-top: 1rem;
}

.cert__period {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  color: var(--accent);
  letter-spacing: 0.08em;
}

.cert__name {
  font-size: 0.92rem;
  font-weight: 700;
}

.cert__school {
  font-size: 0.83rem;
  color: var(--text-muted);
}

/* --- Extras --- */
.extras__line {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.extras__line + .extras__line {
  margin-top: 0.45rem;
}

.extras__key {
  color: var(--text);
  font-weight: 600;
}

@media (max-width: 820px) {
  .hud {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 400px) {
  .player-card {
    padding-inline: 1.2rem;
  }
}
</style>
