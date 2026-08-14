<script setup lang="ts">
import { cv } from "~/data/cv";
import TechIcon from "./TechIcon.vue";

const telHref = `tel:${cv.phone.replaceAll(" ", "")}`;

// Nuage de technos : tous les groupes à plat, les icônes en avant
const allSkills = cv.skillGroups.flatMap((group) => group.skills);
</script>

<template>
  <div class="serieux">
    <div class="sheet">
      <!-- Colonne latérale : identité, contact, compétences -->
      <aside class="side">
        <img class="avatar" :src="cv.photo" :alt="`Photo de ${cv.name}`" width="200" height="200" />
        <h1 class="name">{{ cv.name }}</h1>
        <p class="role">{{ cv.title }}</p>
        <p class="age">{{ cv.age }} ans · {{ cv.location }}</p>
        <p class="bio">{{ cv.bio }}</p>

        <div class="contact">
          <a :href="`mailto:${cv.email}`">{{ cv.email }}</a>
          <a :href="telHref">{{ cv.phone }}</a>
          <a
            v-for="link in cv.links"
            :key="link.label"
            :href="link.url"
            target="_blank"
            rel="noopener"
          >
            {{ link.label }}
          </a>
        </div>

        <div class="side-sec">
          <h2 class="side-title">Formation</h2>
          <p v-for="edu in cv.education" :key="edu.degree" class="side-line">
            <strong>{{ edu.period }}</strong> : {{ edu.degree }}, {{ edu.school }}
          </p>
        </div>

        <div class="side-sec">
          <h2 class="side-title">Langues</h2>
          <p v-for="lang in cv.languages" :key="lang.name" class="side-line">
            <strong>{{ lang.name }}</strong> : {{ lang.level }}
          </p>
        </div>

        <div class="side-sec">
          <h2 class="side-title">Hobbies</h2>
          <p class="side-line">{{ cv.hobbies.join(" · ") }}</p>
        </div>
      </aside>

      <!-- Colonne principale : parcours en timeline -->
      <div class="content">
        <section>
          <h2 class="sec-title">Expériences</h2>
          <ol class="timeline">
            <li v-for="exp in cv.experiences" :key="`${exp.role}-${exp.company}`" class="tl-item">
              <p class="tl-period">{{ exp.period }}</p>
              <h3 class="tl-role">{{ exp.role }}</h3>
              <p class="tl-company">{{ exp.company }}</p>
              <p class="tl-desc">{{ exp.description }}</p>
              <ul v-if="exp.missions" class="tl-missions">
                <li v-for="m in exp.missions" :key="m.title">
                  <p class="m-title">
                    {{ m.title }}
                    <span v-if="m.favorite" class="fav" role="img" aria-label="Mission favorite"
                      >★</span
                    >
                  </p>
                  <p v-if="m.badges" class="m-badges">
                    <span v-for="badge in m.badges" :key="badge" class="m-badge">{{ badge }}</span>
                  </p>
                  <p class="m-desc">{{ m.description }}</p>
                </li>
              </ul>
            </li>
          </ol>
        </section>

        <section>
          <h2 class="sec-title">Technos & outils</h2>
          <ul class="cloud">
            <li v-for="skill in allSkills" :key="skill" class="chip">
              <TechIcon :label="skill" />{{ skill }}
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.serieux {
  max-width: var(--container);
  margin: 0 auto;
  padding: 2.5rem 1.5rem 3rem;
}

/* La "feuille" : une page imprimée haut de gamme */
.sheet {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 3rem;
  box-shadow: var(--shadow);
  animation: sheet-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

@keyframes sheet-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}

/* --- Sidebar --- */
.side {
  align-self: start;
  position: sticky;
  top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.avatar {
  width: 88px;
  height: 88px;
  object-fit: cover;
  border-radius: 50%;
  filter: grayscale(1) contrast(1.05);
  margin-bottom: 1rem;
  transition: filter 0.4s;
}

.avatar:hover {
  filter: grayscale(0);
}

.name {
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.role {
  color: var(--accent);
  font-weight: 600;
  font-size: 1.05rem;
}

.age {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 0.8rem;
}

.bio {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.65;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.2rem;
}

.contact {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  font-size: 0.95rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.2rem;
}

.contact a:hover,
.contact a:focus-visible {
  text-decoration: underline;
}

.side-sec {
  margin-bottom: 1.1rem;
}

.side-title {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  margin-bottom: 0.35rem;
}

.side-line {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.55;
}

.side-line strong {
  color: var(--text);
  font-weight: 600;
}

/* --- Nuage de technos --- */
.cloud {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  background: var(--bg);
  font-size: 0.95rem;
  font-weight: 500;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.2s;
}

.chip:hover {
  border-color: color-mix(in srgb, var(--accent) 45%, var(--border));
  box-shadow: var(--shadow);
  transform: translateY(-1px);
}

.chip .tech-icon {
  font-size: 1.25rem;
  color: var(--accent);
}

/* --- Contenu principal --- */
.content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  min-width: 0;
}

.sec-title {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.4rem;
}

/* Filet qui prolonge le titre de section */
.sec-title::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--border);
}

.timeline {
  list-style: none;
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.tl-item {
  position: relative;
  padding-left: 1.6rem;
  animation: item-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

.tl-item:nth-child(1) {
  animation-delay: 0.15s;
}

.tl-item:nth-child(2) {
  animation-delay: 0.25s;
}

.tl-item:nth-child(3) {
  animation-delay: 0.35s;
}

@keyframes item-in {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
}

/* Point de la timeline */
.tl-item::before {
  content: "";
  position: absolute;
  left: -4.5px;
  top: 0.45rem;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
}

.tl-period {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
  margin-bottom: 0.15rem;
}

.tl-role {
  font-size: 1.2rem;
  font-weight: 700;
}

.tl-company {
  font-size: 1rem;
  color: var(--accent);
  margin-bottom: 0.35rem;
}

.tl-desc {
  font-size: 1rem;
  color: var(--text-muted);
}

/* Missions en cartes : l'expérience occupe le terrain */
.tl-missions {
  margin-top: 0.9rem;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.6rem;
}

.tl-missions li {
  line-height: 1.5;
  padding: 0.7rem 0.9rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-left: 3px solid color-mix(in srgb, var(--accent) 55%, var(--border));
  border-radius: 8px;
}

.m-title {
  font-size: 0.98rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.m-desc {
  font-size: 0.92rem;
  color: var(--text-muted);
}

.fav {
  color: #f0b429;
  margin-left: 0.15rem;
}

.m-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.28rem;
  margin: 0.3rem 0 0.4rem;
}

.m-badge {
  font-size: 0.56rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
  border-radius: var(--radius-pill);
  padding: 0.07rem 0.42rem;
}

@media (max-width: 760px) {
  .sheet {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1.8rem;
  }

  .side {
    position: static;
  }
}
</style>
