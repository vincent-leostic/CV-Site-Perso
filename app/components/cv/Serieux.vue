<script setup lang="ts">
import { cv } from "~/data/cv";
import TechIcon from "./TechIcon.vue";
</script>

<template>
  <div class="serieux">
    <div class="sheet">
      <!-- Colonne latérale : identité, contact, compétences -->
      <aside class="side">
        <img class="avatar" :src="cv.photo" :alt="`Photo de ${cv.name}`" width="200" height="200" />
        <h1 class="name">{{ cv.name }}</h1>
        <p class="role">{{ cv.title }}</p>
        <p class="bio">{{ cv.bio }}</p>

        <div class="contact">
          <a :href="`mailto:${cv.email}`">{{ cv.email }}</a>
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

        <div v-for="group in cv.skillGroups" :key="group.title" class="skill-block">
          <h2 class="side-title">{{ group.title }}</h2>
          <ul class="skill-list">
            <li v-for="skill in group.skills" :key="skill" class="skill-item">
              <TechIcon :label="skill" />{{ skill }}
            </li>
          </ul>
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
            </li>
          </ol>
        </section>

        <section>
          <h2 class="sec-title">Formation</h2>
          <ol class="timeline">
            <li v-for="edu in cv.education" :key="edu.degree" class="tl-item">
              <p class="tl-period">{{ edu.period }}</p>
              <h3 class="tl-role">{{ edu.degree }}</h3>
              <p class="tl-company">{{ edu.school }}</p>
            </li>
          </ol>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.serieux {
  max-width: 980px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 3rem;
}

/* La "feuille" : une page imprimée haut de gamme */
.sheet {
  display: grid;
  grid-template-columns: 280px 1fr;
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
  font-size: 1.55rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.role {
  color: var(--accent);
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.8rem;
}

.bio {
  color: var(--text-muted);
  font-size: 0.88rem;
  line-height: 1.65;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.2rem;
}

.contact {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.86rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.2rem;
}

.skill-block {
  margin-bottom: 1rem;
}

.side-title {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  margin-bottom: 0.3rem;
}

.skill-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.9rem;
  font-size: 0.86rem;
  line-height: 1.6;
}

.skill-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.skill-item .tech-icon {
  color: var(--text-muted);
  font-size: 0.9em;
}

/* --- Contenu principal --- */
.content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  min-width: 0;
}

.sec-title {
  font-size: 0.8rem;
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
  font-size: 0.78rem;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
  margin-bottom: 0.15rem;
}

.tl-role {
  font-size: 1.02rem;
  font-weight: 700;
}

.tl-company {
  font-size: 0.88rem;
  color: var(--accent);
  margin-bottom: 0.35rem;
}

.tl-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
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
