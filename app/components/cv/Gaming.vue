<script setup lang="ts">
import { cv } from "~/data/cv";
import TechIcon from "./TechIcon.vue";

// Niveau affiché sur la carte joueur (années chez iD3i, arrondies)
const PLAYER_LEVEL = 7;

const telHref = `tel:${cv.phone.replaceAll(" ", "")}`;
</script>

<template>
  <div class="gaming">
    <!-- Carte joueur -->
    <section class="player-card">
      <div class="avatar-wrap">
        <img class="avatar" :src="cv.photo" :alt="`Photo de ${cv.name}`" width="200" height="200" />
        <span class="level">LVL {{ PLAYER_LEVEL }}</span>
      </div>
      <h1 class="gamertag">{{ cv.name }}</h1>
      <p class="class-line">{{ cv.title }}<span class="cursor" aria-hidden="true" /></p>
      <p class="age-line">Age {{ cv.age }} · {{ cv.location }}</p>
      <p class="bio">{{ cv.bio }}</p>
      <div class="menu">
        <a class="menu-btn" :href="`mailto:${cv.email}`">Contact</a>
        <a class="menu-btn" :href="telHref">{{ cv.phone }}</a>
        <a
          v-for="link in cv.links"
          :key="link.label"
          class="menu-btn"
          :href="link.url"
          target="_blank"
          rel="noopener"
        >
          {{ link.label }}
        </a>
      </div>
    </section>

    <div class="hud">
      <!-- Journal de missions : les expériences -->
      <section class="panel missions">
        <h2 class="panel-title">Journal de missions</h2>
        <article
          v-for="(exp, i) in cv.experiences"
          :key="`${exp.role}-${exp.company}`"
          class="mission"
          :style="{ '--delay': `${0.25 + i * 0.12}s` }"
        >
          <p class="mission-tag">
            Mission {{ String(cv.experiences.length - i).padStart(2, "0") }}
            <span class="mission-period">{{ exp.period }}</span>
          </p>
          <h3 class="mission-role">{{ exp.role }}</h3>
          <p class="mission-zone">{{ exp.company }}</p>
          <p class="mission-desc">{{ exp.description }}</p>
          <ul v-if="exp.missions" class="objectives">
            <li v-for="m in exp.missions" :key="m.title">
              <span class="obj-title"
                >{{ m.title
                }}<span v-if="m.favorite" class="fav" role="img" aria-label="Mission favorite">
                  ★</span
                >
                <span v-for="badge in m.badges ?? []" :key="badge" class="obj-badge">{{
                  badge
                }}</span></span
              >
              <span class="obj-desc">{{ m.description }}</span>
            </li>
          </ul>
        </article>
      </section>

      <aside class="col">
        <!-- Stats : les compétences en barres d'XP -->
        <section class="panel">
          <h2 class="panel-title">Stats</h2>
          <div v-for="group in cv.skillGroups" :key="group.title" class="stat-group">
            <h3 class="stat-group-title">{{ group.title }}</h3>
            <div
              v-for="(skill, i) in group.skills"
              :key="skill"
              class="stat"
              :style="{ '--level': `${statLevel(skill)}%`, '--delay': `${0.35 + i * 0.08}s` }"
            >
              <div class="stat-head">
                <span class="stat-name"><TechIcon :label="skill" />{{ skill }}</span>
                <span class="stat-val">{{ statLevel(skill) }}</span>
              </div>
              <div class="stat-bar"><span class="stat-fill" /></div>
            </div>
          </div>
        </section>

        <!-- Quêtes annexes : les projets perso -->
        <section class="panel">
          <h2 class="panel-title">Quêtes annexes</h2>
          <a
            v-for="proj in cv.personalProjects"
            :key="proj.title"
            class="quest"
            :href="proj.url"
            target="_blank"
            rel="noopener"
          >
            <p class="quest-name">{{ proj.title }} <span class="quest-arrow">↗</span></p>
            <p class="quest-desc">{{ proj.description }}</p>
            <p v-if="proj.stack" class="quest-stack">
              <span v-for="tech in proj.stack" :key="tech" class="obj-badge">{{ tech }}</span>
            </p>
          </a>
        </section>

        <!-- Formation -->
        <section class="panel">
          <h2 class="panel-title">Formation</h2>
          <div v-for="edu in cv.education" :key="edu.degree" class="cert">
            <p class="cert-period">{{ edu.period }}</p>
            <h3 class="cert-name">{{ edu.degree }}</h3>
            <p class="cert-school">{{ edu.school }}</p>
          </div>
        </section>

        <!-- Langues & hobbies -->
        <section class="panel">
          <h2 class="panel-title">Extras</h2>
          <p v-for="lang in cv.languages" :key="lang.name" class="extra-line">
            <span class="extra-strong">{{ lang.name }}</span> : {{ lang.level }}
          </p>
          <p class="extra-line">
            <span class="extra-strong">Hobbies</span> : {{ cv.hobbies.join(", ") }}
          </p>
        </section>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.gaming {
  max-width: var(--container);
  margin: 0 auto;
  padding: 2.5rem 1.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

/* --- Carte joueur --- */
.player-card {
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
  animation: card-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
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

.avatar-wrap {
  position: relative;
  display: inline-block;
  margin-bottom: 1.1rem;
}

.avatar {
  display: block;
  width: 108px;
  height: 108px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid var(--accent);
  box-shadow: 0 0 26px rgba(45, 212, 255, 0.35);
  animation: avatar-pulse 3.5s ease-in-out infinite;
}

@keyframes avatar-pulse {
  50% {
    box-shadow: 0 0 38px rgba(45, 212, 255, 0.55);
  }
}

.level {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-heading);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--bg);
  background: var(--accent);
  padding: 0.1rem 0.55rem;
  border-radius: 3px;
  white-space: nowrap;
}

.gamertag {
  font-size: clamp(1.7rem, 4.5vw, 2.3rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-shadow: 0 0 28px rgba(45, 212, 255, 0.4);
}

.class-line {
  font-family: var(--font-heading);
  color: var(--accent);
  font-weight: 600;
  font-size: 1.05rem;
  letter-spacing: 0.06em;
  margin-bottom: 1rem;
}

/* Curseur de terminal clignotant */
.cursor::after {
  content: "▌";
  margin-left: 2px;
  color: var(--accent-2);
  animation: blink 1.1s steps(2) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.age-line {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent-2);
  margin: -0.6rem 0 0.8rem;
}

.bio {
  color: var(--text-muted);
  max-width: 520px;
  margin: 0 auto 1.3rem;
  font-size: 0.92rem;
}

.menu {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.menu-btn {
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

.menu-btn:hover {
  background: color-mix(in srgb, var(--accent) 18%, transparent);
  color: var(--accent-hover);
}

/* --- Grille HUD --- */
.hud {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 1.4rem;
  align-items: start;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
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

.missions {
  animation: from-left 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.15s backwards;
}

.col .panel {
  animation: from-right 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.2s backwards;
}

@keyframes from-left {
  from {
    opacity: 0;
    transform: translateX(-22px);
  }
}

@keyframes from-right {
  from {
    opacity: 0;
    transform: translateX(22px);
  }
}

.panel-title {
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--accent);
  margin-bottom: 1.2rem;
}

.panel-title::before {
  content: "// ";
  color: var(--accent-2);
}

/* --- Missions --- */
.mission {
  padding: 1rem 0 1rem 1.1rem;
  border-left: 2px solid color-mix(in srgb, var(--accent) 35%, transparent);
  animation: from-left 0.5s cubic-bezier(0.22, 1, 0.36, 1) var(--delay) backwards;
}

.mission + .mission {
  margin-top: 0.4rem;
}

.mission-tag {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent-2);
  margin-bottom: 0.3rem;
}

.mission-period {
  color: var(--accent);
  white-space: nowrap;
}

.mission-role {
  font-size: 1.05rem;
  font-weight: 700;
}

.mission-zone {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.35rem;
}

.mission-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  white-space: pre-line;
}

.objectives {
  margin-top: 0.6rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.objectives li::before {
  content: "▸ ";
  color: var(--accent-2);
}

.obj-title {
  font-weight: 600;
  color: var(--text);
}

.obj-desc {
  display: block;
  padding-left: 1.05rem;
}

.fav {
  color: #f0b429;
  text-shadow: 0 0 8px rgba(240, 180, 41, 0.55);
}

.obj-badge {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.52rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent-2);
  border: 1px solid color-mix(in srgb, var(--accent-2) 45%, transparent);
  border-radius: 3px;
  padding: 0.06rem 0.4rem;
  margin-left: 0.35rem;
  vertical-align: middle;
}

/* --- Stats --- */
.stat-group + .stat-group {
  margin-top: 1.1rem;
}

.stat-group-title {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.stat + .stat {
  margin-top: 0.5rem;
}

.stat-head {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
}

.stat-name {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-width: 0;
}

.stat-name .tech-icon {
  color: var(--accent);
  filter: drop-shadow(0 0 4px color-mix(in srgb, var(--accent) 55%, transparent));
}

.stat-val {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  color: var(--accent);
}

.stat-bar {
  height: 6px;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border-radius: 2px;
  overflow: hidden;
}

/* Barre d'XP : se remplit à l'arrivée */
.stat-fill {
  display: block;
  height: 100%;
  width: var(--level);
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  border-radius: 2px;
  animation: fill 0.9s cubic-bezier(0.22, 1, 0.36, 1) var(--delay) backwards;
}

@keyframes fill {
  from {
    width: 0;
  }
}

/* --- Quêtes annexes --- */
.quest {
  display: block;
  padding: 0.7rem 0.8rem;
  border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
  clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
  transition: background-color 0.2s;
}

.quest:hover {
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}

.quest + .quest {
  margin-top: 0.7rem;
}

.quest-name {
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--accent);
}

.quest-arrow {
  color: var(--accent-2);
}

.quest-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.quest-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.45rem;
}

.quest-stack .obj-badge {
  margin-left: 0;
}

/* --- Formation --- */
.cert + .cert {
  margin-top: 1rem;
}

.cert-period {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  color: var(--accent);
  letter-spacing: 0.08em;
}

.cert-name {
  font-size: 0.92rem;
  font-weight: 700;
}

.cert-school {
  font-size: 0.83rem;
  color: var(--text-muted);
}

.extra-line {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.extra-line + .extra-line {
  margin-top: 0.45rem;
}

.extra-strong {
  color: var(--text);
  font-weight: 600;
}

@media (max-width: 820px) {
  .hud {
    grid-template-columns: 1fr;
  }
}
</style>
