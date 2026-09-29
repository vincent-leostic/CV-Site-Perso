<script setup lang="ts">
import { cv } from "~/data/cv";
</script>

<template>
  <section id="a-propos" class="section section--alt about" aria-labelledby="a-propos-title">
    <div class="section__inner about__grid">
      <div>
        <p class="section__kicker">À propos</p>
        <h2 id="a-propos-title" class="section__title">{{ cv.about.title }}</h2>
        <p class="about__intro">{{ cv.about.intro }}</p>
        <!-- Questions-réponses : une liste de définitions, question puis réponse -->
        <dl class="about__faq">
          <div v-for="item in cv.about.faq" :key="item.question" class="about__qa">
            <dt class="about__question">{{ item.question }}</dt>
            <dd class="about__answer">{{ item.answer }}</dd>
          </div>
        </dl>
      </div>

      <div class="about__side">
        <div class="about__method">
          <h3 class="about__method-title">Ma façon de travailler</h3>
          <ol class="about__steps" role="list">
            <li v-for="(step, index) in cv.about.method" :key="step.title" class="about__step">
              <!-- La liste ordonnée porte déjà le rang pour les lecteurs d'écran -->
              <span class="about__step-number" aria-hidden="true">{{ index + 1 }}</span>
              <div>
                <p class="about__step-title">{{ step.title }}</p>
                <p class="about__step-detail">{{ step.detail }}</p>
              </div>
            </li>
          </ol>
        </div>

        <!-- Anecdote en marge du propos : un aside -->
        <aside v-if="cv.about.funFact" class="about__fact" aria-labelledby="a-propos-fact">
          <h3 id="a-propos-fact" class="about__fact-title">Le saviez-vous ?</h3>
          <p class="about__fact-text">{{ cv.about.funFact }}</p>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about__grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  align-items: start;
  gap: 3rem;
}

.about__intro {
  margin-top: 1.5rem;
  max-width: 42rem;
  font-size: 1.1rem;
  line-height: 1.7;
}

.about__faq {
  margin-top: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 42rem;
}

/* Question en roux, dans la police des titres */
.about__question {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--highlight-text);
}

.about__answer {
  margin-top: 0.3rem;
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-muted);
}

.about__side {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.about__method {
  padding: 1.6rem;
  border-radius: var(--radius);
  background: var(--bg);
}

/* Encadré « Le saviez-vous ? » : teinté de roux */
.about__fact {
  padding: 1.3rem 1.6rem;
  border-radius: var(--radius);
  background: color-mix(in srgb, var(--highlight) 12%, var(--bg-card));
}

.about__fact-title {
  margin-bottom: 0.4rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--highlight-text);
}

.about__fact-text {
  font-weight: 600;
}

.about__method-title {
  margin-bottom: 1.2rem;
  font-size: 1.05rem;
  font-weight: 700;
}

.about__steps {
  list-style: none;
}

/* Frise d'étapes : pastille à gauche, titre et détail à droite */
.about__step {
  position: relative;
  display: grid;
  grid-template-columns: 2rem 1fr;
  column-gap: 1rem;
  padding-bottom: 1.2rem;
}

.about__step:last-child {
  padding-bottom: 0;
}

/* Fil roux qui relie chaque pastille à la suivante */
.about__step:not(:last-child)::before {
  content: "";
  position: absolute;
  left: calc(1rem - 1px);
  top: 2.3rem;
  bottom: 0.3rem;
  width: 2px;
  border-radius: 2px;
  background: color-mix(in srgb, var(--highlight) 35%, transparent);
}

/* Chiffre roux foncé sur blanc (5,8:1) */
.about__step-number {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border: 2px solid var(--highlight);
  border-radius: 50%;
  background: var(--bg-card);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--highlight-text);
}

/* Hauteur de ligne = pastille : le titre s'aligne sur son centre */
.about__step-title {
  font-weight: 700;
  line-height: 2rem;
}

.about__step-detail {
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--text-muted);
}

@media (max-width: 820px) {
  .about__grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
