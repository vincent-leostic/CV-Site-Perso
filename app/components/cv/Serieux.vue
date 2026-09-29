<script setup lang="ts">
import { cv } from "~/data/cv";

// Nuage de technos : tous les groupes à plat
const allSkills = cv.skillGroups.flatMap((group) => group.skills);

/** Le PDF, c'est simplement la version imprimée : les styles print s'occupent du reste */
function printCv() {
  window.print();
}
</script>

<template>
  <div class="layout serieux">
    <div class="sheet">
      <!-- Colonne latérale : identité, contact, compétences -->
      <div class="sheet__side">
        <div class="identity">
          <img
            class="identity__avatar"
            :src="cv.photo"
            :alt="`Photo de ${cv.name}`"
            width="200"
            height="200"
          />
          <h1 class="identity__name">{{ cv.name }}</h1>
          <p class="identity__role">{{ cv.title }}</p>
          <p class="identity__meta">{{ cv.age }} ans · {{ cv.location }}</p>
          <p class="identity__bio">{{ cv.bio }}</p>
        </div>

        <ul class="contact" role="list">
          <li class="contact__item">
            <a class="contact__link" :href="`mailto:${cv.email}`">
              <svg
                class="contact__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>{{ cv.email }}</span>
            </a>
          </li>
          <li class="contact__item">
            <a class="contact__link" :href="toTelHref(cv.phone)">
              <svg
                class="contact__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                />
              </svg>
              <span>{{ cv.phone }}</span>
            </a>
          </li>
          <!-- L'adresse du site n'a de sens que sur papier : à l'écran, on y est déjà -->
          <li class="contact__item contact__item--print">
            <a class="contact__link" :href="cv.website">
              <svg
                class="contact__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <span>{{ bareUrl(cv.website) }}</span>
            </a>
          </li>
          <li v-for="link in cv.links" :key="link.label" class="contact__item">
            <a class="contact__link" :href="link.url" target="_blank" rel="noopener">
              <CvTechIcon v-if="link.icon" class="contact__icon" :name="link.icon" />
              <span class="contact__label contact__label--screen">{{ link.label }}</span>
              <span class="contact__label contact__label--print">{{ bareUrl(link.url) }}</span>
            </a>
          </li>
        </ul>

        <!-- Version compacte du nuage, réservée à l'impression (bande de gauche) -->
        <div class="side-section side-section--print">
          <h2 class="side-section__title">Technos & outils</h2>
          <ul class="tech-list tech-list--compact" role="list">
            <li v-for="skill in allSkills" :key="skill.label" class="tech-list__item">
              <CvTechIcon v-if="skill.icon" class="tech-list__icon" :name="skill.icon" branded />{{
                skill.label
              }}
            </li>
          </ul>
        </div>

        <div class="side-section">
          <h2 class="side-section__title">Formation</h2>
          <p v-for="edu in cv.education" :key="edu.degree" class="side-section__line">
            <strong class="side-section__key">{{ edu.period }}</strong> :
            <a
              v-if="edu.url"
              class="side-section__link"
              :href="edu.url"
              target="_blank"
              rel="noopener"
              >{{ edu.degree }}</a
            >
            <template v-else>{{ edu.degree }}</template
            >, {{ edu.school }}
          </p>
        </div>

        <div class="side-section">
          <h2 class="side-section__title">Langues</h2>
          <p v-for="lang in cv.languages" :key="lang.name" class="side-section__line">
            <strong class="side-section__key">{{ lang.name }}</strong> : {{ lang.level }}
          </p>
        </div>

        <div class="side-section">
          <h2 class="side-section__title">Hobbies</h2>
          <p class="side-section__line">{{ cv.hobbies.join(" · ") }}</p>
        </div>

        <button type="button" class="print-button" @click="printCv">Imprimer / PDF</button>
      </div>

      <!-- Colonne principale : parcours en timeline -->
      <div class="sheet__main">
        <section class="sheet__section">
          <h2 class="sheet__title">Expériences</h2>
          <ol class="timeline">
            <li
              v-for="exp in cv.experiences"
              :key="`${exp.role}-${exp.company}`"
              class="timeline__item"
            >
              <div class="timeline__head">
                <p class="timeline__period">{{ exp.period }}</p>
                <h3 class="timeline__role">{{ exp.role }}</h3>
                <p class="timeline__company">{{ exp.company }}</p>
              </div>
              <p class="timeline__desc">{{ exp.description }}</p>
              <ul v-if="exp.missions" class="timeline__missions" role="list">
                <li v-for="m in exp.missions" :key="m.title" class="card mission">
                  <p class="mission__title">
                    {{ m.title }}
                    <span
                      v-if="m.favorite"
                      class="mission__fav"
                      role="img"
                      aria-label="Mission favorite"
                      >★</span
                    >
                  </p>
                  <p v-if="m.badges" class="mission__roles">{{ m.badges.join(" · ") }}</p>
                  <p class="mission__desc">{{ m.description }}</p>
                </li>
              </ul>
            </li>
          </ol>
        </section>

        <!-- Les projets perso restent sur l'écran : la mise en page papier est
             calibrée sans eux (et les liens ne se cliquent pas sur une feuille) -->
        <section class="sheet__section sheet__section--screen">
          <h2 class="sheet__title">Projets perso</h2>
          <ul class="projects" role="list">
            <li v-for="proj in cv.personalProjects" :key="proj.title" class="card project">
              <a class="project__link" :href="proj.url" target="_blank" rel="noopener">
                <span class="project__title">{{ proj.title }}</span>
                <span class="project__host"
                  >{{ hostOf(proj.url) }} <span aria-hidden="true">↗</span></span
                >
              </a>
              <p class="project__desc">{{ proj.description }}</p>
              <ul v-if="proj.stack" class="project__stack" role="list">
                <li v-for="tech in proj.stack" :key="tech.label" class="project__tech">
                  <CvTechIcon v-if="tech.icon" :name="tech.icon" branded />{{ tech.label }}
                </li>
              </ul>
            </li>
          </ul>
        </section>

        <!-- En impression, le nuage vit dans la bande (version compacte) -->
        <section class="sheet__section sheet__section--screen">
          <h2 class="sheet__title">Technos & outils</h2>
          <ul class="tech-list" role="list">
            <li v-for="skill in allSkills" :key="skill.label" class="tech-list__item">
              <CvTechIcon v-if="skill.icon" class="tech-list__icon" :name="skill.icon" branded />{{
                skill.label
              }}
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* La "feuille" : une page imprimée haut de gamme */
.sheet {
  --enter-y: 14px;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 3rem;
  box-shadow: var(--shadow);
  animation: enter 0.6s var(--ease-out) backwards;
}

/* --- Colonne latérale --- */
.sheet__side {
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

/* Collante seulement si elle tient dans la fenêtre : sinon Langues,
   Hobbies et le bouton d'impression resteraient hors champ. Seuil à
   relever si la colonne s'allonge (elle fait environ 65 rem). */
@media screen and (min-width: 761px) and (min-height: 70rem) {
  .sheet__side {
    position: sticky;
    top: 1.5rem;
  }
}

.identity {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.identity__avatar {
  width: 88px;
  height: 88px;
  object-fit: cover;
  border-radius: 50%;
  filter: grayscale(1) contrast(1.05);
  margin-bottom: 1rem;
}

.identity__name {
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.identity__role {
  color: var(--accent);
  font-weight: 600;
  font-size: 1.05rem;
  /* Lignes équilibrées : évite de couper « front-end » sur son trait d'union */
  text-wrap: balance;
}

.identity__meta {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 0.8rem;
}

.identity__bio {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.65;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.2rem;
}

.contact {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  font-size: 0.95rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.2rem;
}

.contact__link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-width: 0;
}

.contact__link:is(:hover, :focus-visible) {
  text-decoration: underline;
}

.contact__icon {
  width: 1em;
  height: 1em;
  flex: none;
  color: var(--text-muted);
}

/* Les URLs complètes et la ligne du site ne servent que sur papier */
.contact__label--print,
.contact__item--print {
  display: none;
}

.side-section {
  margin-bottom: 1.1rem;
}

/* Le nuage compact de la bande n'existe qu'à l'impression */
.side-section--print {
  display: none;
}

.side-section__title {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  margin-bottom: 0.35rem;
}

.side-section__line {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.55;
}

.side-section__key {
  color: var(--text);
  font-weight: 600;
}

.side-section__link:is(:hover, :focus-visible) {
  text-decoration: underline;
}

.print-button {
  align-self: start;
  margin-top: 0.3rem;
  padding: 0.45rem 1rem;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent);
  background: none;
  border: 1px solid color-mix(in srgb, var(--accent) 45%, var(--border));
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.print-button:is(:hover, :focus-visible) {
  background: var(--accent);
  color: var(--bg-card);
}

/* --- Colonne principale --- */
.sheet__main {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  min-width: 0;
}

.sheet__title {
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
.sheet__title::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--border);
}

/* --- Timeline --- */
.timeline {
  list-style: none;
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.timeline__item {
  --enter-x: 10px;
  position: relative;
  padding-left: 1.6rem;
  animation: enter 0.55s var(--ease-out) backwards;
}

.timeline__item:nth-child(1) {
  animation-delay: 0.15s;
}

.timeline__item:nth-child(2) {
  animation-delay: 0.25s;
}

.timeline__item:nth-child(3) {
  animation-delay: 0.35s;
}

/* Point de la timeline */
.timeline__item::before {
  content: "";
  position: absolute;
  left: -4.5px;
  top: 0.45rem;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
}

/* À l'écran, l'en-tête de job est transparent : il ne sert qu'à la
   languette de la version imprimée */
.timeline__head {
  display: contents;
}

.timeline__period {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
  margin-bottom: 0.15rem;
}

.timeline__role {
  font-size: 1.2rem;
  font-weight: 700;
}

.timeline__company {
  font-size: 1rem;
  color: var(--accent);
  margin-bottom: 0.35rem;
}

.timeline__desc {
  font-size: 1rem;
  color: var(--text-muted);
  white-space: pre-line;
}

/* Missions en cartes : l'expérience occupe le terrain */
.timeline__missions {
  margin-top: 0.9rem;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(250px, 100%), 1fr));
  gap: 0.6rem;
}

/* --- Cartes : missions et projets perso. Un simple fond, sans bordure :
   la feuille est déjà une carte --- */
.card {
  background: var(--bg);
  border-radius: 8px;
}

.mission {
  line-height: 1.5;
  padding: 0.7rem 0.9rem;
}

.mission__title {
  font-size: 0.98rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.mission__fav {
  color: var(--fav);
  margin-left: 0.15rem;
}

/* Casquettes tenues : une ligne discrète plutôt qu'une rangée de badges */
.mission__roles {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-muted);
  margin-bottom: 0.35rem;
}

.mission__desc {
  font-size: 0.92rem;
  color: var(--text-muted);
}

/* --- Projets perso --- */
.projects {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
  gap: 0.8rem;
}

/* Toute la carte est cliquable : le lien du titre s'étend sur elle, son
   nom accessible reste court (titre et domaine) */
.project {
  position: relative;
  padding: 0.9rem 1.1rem;
  transition:
    box-shadow 0.2s,
    transform 0.2s;
}

.project:has(.project__link:is(:hover, :focus-visible)) {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}

.project__link {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1rem;
  margin-bottom: 0.35rem;
}

.project__link::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
}

/* Le contour de focus entoure la carte entière */
.project__link:focus-visible {
  outline: none;
}

.project__link:focus-visible::after {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.project__link:is(:hover, :focus-visible) .project__title {
  text-decoration: underline;
}

.project__title {
  font-size: 1rem;
  font-weight: 600;
}

.project__host {
  font-size: 0.82rem;
  color: var(--accent);
  white-space: nowrap;
}

.project__desc {
  font-size: 0.92rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.project__stack {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.5rem;
}

.project__tech {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 0.12rem 0.55rem;
}

/* --- Nuage de technos --- */
.tech-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.tech-list__item {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  background: var(--bg);
  font-size: 0.95rem;
  font-weight: 500;
}

.tech-list__icon {
  font-size: 1.25rem;
  color: var(--accent);
}

@media screen and (max-width: 760px) {
  .sheet {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1.8rem;
  }
}

@media screen and (max-width: 400px) {
  .sheet {
    padding: 1.2rem;
  }
}

/* --- Impression : CV moderne à bande latérale encrée.
   Colonne bleu profond avec l'identité en blanc, répétée sur chaque
   page ; colonne claire pour le parcours, missions en liste. --- */
@media print {
  .serieux {
    --ink: #232f7a;
    --ink-soft: #bcc8ff;
    --ink-pale: #dde3ff;
    max-width: none;
    padding: 0;
    /* Aplats imprimés tels quels : la propriété s'hérite dans toute la feuille */
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* La bande encrée : en position fixe, elle se répète sur chaque page */
  .sheet::before {
    content: "";
    position: fixed;
    inset: 0 auto 0 0;
    width: 62mm;
    background: var(--ink);
  }

  .sheet {
    grid-template-columns: 62mm 1fr;
    gap: 0;
    padding: 0;
    border: 0;
    box-shadow: none;
  }

  /* --- Colonne encre : identité et infos clés en blanc.
     Positionnée pour passer au-dessus de la bande fixe. --- */
  .sheet__side {
    position: relative;
    padding: 6mm 5mm 5mm 7mm;
    color: #fff;
  }

  .identity__avatar {
    width: 26mm;
    height: 26mm;
    border: 2px solid rgba(255, 255, 255, 0.85);
    margin-bottom: 3mm;
    filter: none;
  }

  .identity__name {
    font-size: 17pt;
    color: #fff;
  }

  .identity__role {
    color: var(--ink-soft);
    font-size: 10.5pt;
  }

  .identity__meta {
    color: var(--ink-soft);
    font-size: 9pt;
    margin-bottom: 3mm;
  }

  .identity__bio {
    color: var(--ink-pale);
    font-size: 9pt;
    line-height: 1.5;
    border: 0;
    padding-bottom: 0;
    margin-bottom: 4mm;
  }

  .contact {
    border: 0;
    gap: 1.2mm;
    padding-bottom: 0;
    margin-bottom: 4mm;
    font-size: 9pt;
  }

  .contact__link,
  .contact__icon {
    color: #fff;
  }

  /* Sur papier, l'URL complète remplace le libellé du lien */
  .contact__label--screen {
    display: none;
  }

  .contact__label--print {
    display: inline;
    overflow-wrap: anywhere;
  }

  .contact__item--print {
    display: block;
  }

  .side-section {
    margin-bottom: 2.5mm;
    break-inside: avoid;
  }

  /* Le nuage compact rejoint la bande, avant la formation */
  .side-section--print {
    display: block;
  }

  .side-section__title {
    color: #9daaf0;
  }

  .side-section__line {
    color: var(--ink-pale);
    font-size: 9pt;
  }

  .side-section__key,
  .side-section__link {
    color: #fff;
  }

  /* Icônes seules : pastilles rondes façon photo, le logo remplit la
     pastille et le blanc ne se lit plus que comme un fin liseré */
  .tech-list--compact {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.8mm;
  }

  .tech-list--compact .tech-list__item {
    display: flex;
    justify-content: center;
    gap: 0;
    aspect-ratio: 1;
    font-size: 0;
    background: #fff;
    border: 0;
    padding: 0;
    border-radius: 50%;
  }

  .tech-list--compact .tech-list__item:not(:has(.tech-list__icon)) {
    display: none;
  }

  .tech-list--compact .tech-list__icon {
    width: 74%;
    height: 74%;
  }

  .print-button {
    display: none;
  }

  /* --- Colonne claire : le parcours --- */
  .sheet__main {
    display: block;
    padding: 10mm 10mm 10mm 8mm;
  }

  .sheet__section {
    margin-bottom: 2.5mm;
  }

  /* Les languettes suffisent : pas de titre de section en print */
  .sheet__title {
    display: none;
  }

  /* Projets perso et nuage de technos : réservés à l'écran */
  .sheet__section--screen {
    display: none;
  }

  /* Plus de timeline : chaque job porte une languette bleu marine qui
     part du bord gauche, dans la continuité de la bande */
  .timeline {
    gap: 0;
    border-left: 0;
  }

  .timeline__item {
    padding-left: 0;
    margin-bottom: 2.5mm;
  }

  /* De l'air entre deux expériences */
  .timeline__item + .timeline__item {
    margin-top: 5mm;
  }

  /* Les entrées courtes (sans cartes de missions) ne se coupent pas
     entre deux pages */
  .timeline__item:not(:has(.timeline__missions)) {
    break-inside: avoid;
  }

  .timeline__item::before {
    display: none;
  }

  .timeline__head {
    display: block;
    background: var(--ink);
    margin: 0 0 2mm -8mm;
    padding: 1.8mm 4mm 2mm 8mm;
    border-radius: 0 3mm 3mm 0;
    break-inside: avoid;
  }

  .timeline__period {
    color: var(--ink-soft);
    margin-bottom: 0.4mm;
  }

  .timeline__role {
    color: #fff;
  }

  .timeline__company {
    color: var(--ink-pale);
    margin-bottom: 0;
  }

  /* Missions en liste simple : pastille devant chaque intitulé,
     encadrée d'un titre et d'une ouverture */
  .timeline__missions {
    margin-top: 2.5mm;
    grid-template-columns: 1fr;
    gap: 2mm;
  }

  .timeline__missions::before {
    content: "Mes missions";
    font-weight: 700;
    font-size: 1.05rem;
    color: var(--ink);
  }

  .timeline__missions::after {
    content: "et bien plus encore";
    font-style: italic;
    color: var(--text-muted);
  }

  .mission {
    break-inside: avoid;
    position: relative;
    padding: 0 0 0 4.5mm;
    background: none;
    border: 0;
    border-radius: 0;
  }

  /* La pastille */
  .mission::before {
    content: "";
    position: absolute;
    left: 0;
    top: 1.4mm;
    width: 2mm;
    height: 2mm;
    border-radius: 50%;
    background: var(--ink);
  }
}
</style>
