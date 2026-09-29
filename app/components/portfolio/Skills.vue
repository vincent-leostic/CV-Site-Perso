<script setup lang="ts">
const { cv, ui } = useContent();
</script>

<template>
  <section id="competences" class="section section--alt skills" aria-labelledby="competences-title">
    <div class="section__inner">
      <p class="section__kicker">{{ ui.skills.kicker }}</p>
      <h2 id="competences-title" class="section__title">{{ ui.skills.title }}</h2>

      <div class="skills__grid">
        <div v-for="group in cv.skillGroups" :key="group.title" class="skill-group">
          <h3 class="skill-group__title">{{ group.title }}</h3>
          <ul class="skill-group__list" role="list">
            <li v-for="skill in group.skills" :key="skill.label" class="tag">
              <TechIcon v-if="skill.icon" class="tag__icon" :name="skill.icon" branded />{{
                skill.label
              }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills__grid {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(440px, 100%), 1fr));
  gap: 1.2rem;
}

.skill-group {
  padding: 1.5rem;
  border-radius: var(--radius);
  background: var(--bg);
}

/* Nombre impair de groupes : le dernier, seul sur sa ligne, prend toute la largeur */
.skill-group:last-child:nth-child(odd) {
  grid-column: 1 / -1;
}

.skill-group__title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
  font-size: 1.05rem;
  font-weight: 700;
}

/* Pastille rousse devant le titre du groupe */
.skill-group__title::before {
  content: "";
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: var(--highlight);
}

.skill-group__list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

@media print {
  .skill-group {
    break-inside: avoid;
  }
}
</style>
