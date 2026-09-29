<script setup lang="ts">
const { cv, ui } = useContent();
</script>

<template>
  <section id="parcours" class="section section--tint journey" aria-labelledby="parcours-title">
    <div class="section__inner">
      <p class="section__kicker">{{ ui.journey.kicker }}</p>
      <h2 id="parcours-title" class="section__title">{{ ui.journey.title }}</h2>

      <!-- Frise : horizontale sur grand écran, verticale sur mobile -->
      <ol class="milestones" role="list">
        <li
          v-for="step in cv.milestones"
          :key="step.title"
          class="milestone"
          :class="step.status && `milestone--${step.status}`"
        >
          <p class="milestone__period">{{ step.period }}</p>
          <h3 class="milestone__title">
            <!-- Page externe dans un nouvel onglet ; ancre du site sur place -->
            <a
              v-if="step.url"
              class="milestone__link"
              data-umami-event="milestone-link"
              :data-umami-event-target="step.url"
              :href="step.url"
              :target="step.url.startsWith('http') ? '_blank' : undefined"
              :rel="step.url.startsWith('http') ? 'noopener' : undefined"
              >{{ step.title
              }}<span v-if="step.url.startsWith('http')" class="visually-hidden">{{
                ui.newTab
              }}</span></a
            >
            <template v-else>{{ step.title }}</template>
          </h3>
          <p class="milestone__detail">{{ step.detail }}</p>
        </li>
      </ol>

      <!-- Infos pratiques : ce qu'un recruteur cherche en premier -->
      <dl class="journey__facts">
        <div>
          <dt class="caption">{{ ui.journey.availability }}</dt>
          <dd class="journey__value">
            <span class="tag tag--highlight">{{ cv.availability }}</span>
          </dd>
        </div>
        <div>
          <dt class="caption">{{ ui.journey.mobility }}</dt>
          <dd class="journey__value">{{ cv.mobility }}</dd>
        </div>
        <div>
          <dt class="caption">{{ ui.journey.languages }}</dt>
          <dd class="journey__value">
            {{
              sentenceList(
                cv.languages.map((lang) => `${lang.name} (${lang.level})`),
                ui.intl,
              )
            }}
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
/* --- Frise : un point par étape, relié au suivant par un trait roux ;
   les traits qui mènent à l'étape en cours et à venir sont en pointillé.
   Autant de colonnes que d'étapes. --- */
.milestones {
  --dot: 1.1rem;
  --gap: 2rem;
  --line: color-mix(in srgb, var(--highlight) 45%, transparent);
  list-style: none;
  margin-top: 3rem;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  gap: var(--gap);
}

.milestone {
  position: relative;
  padding-top: calc(var(--dot) + 1.2rem);
}

/* Le point : plein pour une étape passée, cerclé pour celle en cours,
   en pointillé pour celle à venir */
.milestone::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: var(--dot);
  height: var(--dot);
  border-radius: 50%;
  background: var(--highlight);
  box-shadow: 0 0 0 5px var(--bg-tint);
}

.milestone--current::before {
  background: var(--bg-tint);
  border: 3px solid var(--highlight);
}

.milestone--future::before {
  background: var(--bg-tint);
  border: 3px dashed var(--highlight);
}

/* L'étape à venir est une invitation : son lien ressort en roux */
.milestone--future .milestone__link {
  color: var(--highlight-text);
}

/* Le trait vers le point suivant */
.milestone:not(:last-child)::after {
  content: "";
  position: absolute;
  top: calc(var(--dot) / 2 - 1.5px);
  left: calc(var(--dot) + 0.5rem);
  width: calc(100% + var(--gap) - var(--dot) - 1rem);
  height: 3px;
  border-radius: 3px;
  background: var(--line);
}

.milestone:has(+ .milestone--current, + .milestone--future)::after {
  background: repeating-linear-gradient(90deg, var(--line) 0 8px, transparent 8px 14px);
}

.milestone__period {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--highlight-text);
  font-variant-numeric: tabular-nums;
}

.milestone__title {
  margin-top: 0.2rem;
  font-size: 1.2rem;
  font-weight: 700;
}

.milestone__link:is(:hover, :focus-visible) {
  text-decoration: underline;
}

.milestone__detail {
  margin-top: 0.4rem;
  color: var(--text-muted);
}

.journey__facts {
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem 3.5rem;
}

.journey__value {
  margin-top: 0.4rem;
  color: var(--text);
}

/* --- Mobile : la frise devient verticale --- */
@media (max-width: 820px) {
  .milestones {
    grid-auto-flow: row;
    gap: 0;
  }

  .milestone {
    padding: 0 0 2rem calc(var(--dot) + 1.2rem);
  }

  .milestone:last-child {
    padding-bottom: 0;
  }

  .milestone::before {
    top: 0.2rem;
  }

  .milestone:not(:last-child)::after {
    top: calc(var(--dot) + 0.7rem);
    bottom: 0.5rem;
    left: calc(var(--dot) / 2 - 1.5px);
    width: 3px;
    height: auto;
  }

  .milestone:has(+ .milestone--current, + .milestone--future)::after {
    background: repeating-linear-gradient(180deg, var(--line) 0 8px, transparent 8px 14px);
  }
}
</style>
