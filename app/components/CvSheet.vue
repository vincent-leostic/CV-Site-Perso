<script setup lang="ts">
import { cv, type PersonalProject } from "~/data/cv";

// Seuls les projets en ligne figurent sur le CV
type LiveProject = PersonalProject & { url: string };
// Compétences du PDF : sans celles réservées au site
const pdfSkillGroups = cv.skillGroups
  .map((group) => ({ ...group, skills: group.skills.filter((skill) => !skill.siteOnly) }))
  .filter((group) => group.skills.length > 0);

const liveProjects = cv.personalProjects.filter(
  (proj): proj is LiveProject => proj.url !== undefined && !proj.inProgress,
);
</script>

<template>
  <!-- Gabarit A4 du PDF (scripts/cv-pdf.mjs) : cotes en mm et en pt, pour
       un rendu identique à l'écran (aperçu) et à l'impression. Doit tenir
       sur une page. Les liens restent cliquables dans le PDF. -->
  <article class="cv-sheet">
    <header class="cv-sheet__header">
      <span class="cv-sheet__ring" aria-hidden="true" />
      <div class="cv-sheet__visual">
        <img
          class="cv-sheet__photo"
          :src="cv.photo"
          :alt="`Photo de ${cv.name}`"
          width="200"
          height="200"
        />
      </div>
      <div>
        <h1 class="cv-sheet__name">{{ cv.name }}</h1>
        <p class="cv-sheet__role">{{ cv.title }}</p>
        <ul class="cv-sheet__badges" role="list">
          <li class="cv-sheet__badge cv-sheet__badge--highlight">
            Disponibilité {{ cv.availability.toLocaleLowerCase("fr") }}
          </li>
          <li class="cv-sheet__badge">{{ cv.mobility }}</li>
        </ul>
        <p class="cv-sheet__bio">{{ cv.bio }}</p>
        <ul class="contact" role="list">
          <li class="contact__item">
            <LineIcon class="contact__icon" name="map-pin" />{{ cv.age }} ans, {{ cv.location }}
          </li>
          <li>
            <a class="contact__item contact__link" :href="`mailto:${cv.email}`">
              <LineIcon class="contact__icon" name="mail" />{{ cv.email }}
            </a>
          </li>
          <li>
            <a class="contact__item contact__link" :href="toTelHref(cv.phone)">
              <LineIcon class="contact__icon" name="phone" />{{ noBreak(cv.phone) }}
            </a>
          </li>
          <li>
            <a class="contact__item contact__link" :href="cv.website">
              <LineIcon class="contact__icon" name="globe" />{{ bareUrl(cv.website) }}
            </a>
          </li>
          <li v-for="link in cv.links" :key="link.label">
            <a class="contact__item contact__link" :href="link.url">
              <TechIcon v-if="link.icon" class="contact__icon" :name="link.icon" />{{
                bareUrl(link.url)
              }}
            </a>
          </li>
        </ul>
      </div>
    </header>

    <div class="cv-sheet__body">
      <div class="cv-sheet__main">
        <section class="cv-section">
          <h2 class="cv-section__title">Expériences</h2>
          <ol class="cv-section__list" role="list">
            <li v-for="exp in cv.experiences" :key="`${exp.role}-${exp.company}`" class="job">
              <div class="job__head">
                <h3 class="job__role">{{ exp.role }}</h3>
                <p class="job__period">{{ exp.period }}</p>
              </div>
              <p class="job__company">{{ exp.company }}</p>
              <p class="job__desc">{{ exp.description }}</p>
              <template v-if="exp.missions">
                <h4 class="job__missions-title">Mes missions principales</h4>
                <ul class="job__missions" role="list">
                  <li v-for="m in exp.missions" :key="m.title" class="mission">
                    <p class="mission__head">
                      <span class="mission__title">{{ m.title }}</span>
                      <span v-if="m.badges" class="mission__roles">{{
                        sentenceList(m.badges)
                      }}</span>
                    </p>
                    <p class="mission__desc">{{ m.description }}</p>
                  </li>
                </ul>
              </template>
            </li>
          </ol>
        </section>

        <section class="cv-section">
          <h2 class="cv-section__title">Projets perso</h2>
          <ul class="cv-section__list" role="list">
            <li v-for="proj in liveProjects" :key="proj.title">
              <p class="project__head">
                <span class="project__title">{{ proj.title }}</span>
                <a class="project__link" :href="proj.url"
                  >{{ hostOf(proj.url) }} <span aria-hidden="true">↗</span></a
                >
                <span v-if="proj.stack" class="project__stack">{{
                  listFr(proj.stack.map((tech) => tech.label))
                }}</span>
              </p>
              <p class="project__desc">{{ proj.description }}</p>
            </li>
          </ul>
        </section>
      </div>

      <div class="cv-sheet__side">
        <section class="cv-section">
          <h2 class="cv-section__title">Compétences</h2>
          <dl class="skill-list">
            <div v-for="group in pdfSkillGroups" :key="group.title">
              <dt class="skill-list__name">{{ group.title }}</dt>
              <dd class="cv-section__line">
                {{ listFr(group.skills.map((skill) => skill.label)) }}
              </dd>
            </div>
          </dl>
        </section>

        <section class="cv-section">
          <h2 class="cv-section__title">Formation</h2>
          <ul class="cv-section__list cv-section__list--tight" role="list">
            <li v-for="edu in cv.education" :key="edu.degree" class="cv-section__line">
              <a v-if="edu.url" class="cv-section__key cv-section__link" :href="edu.url">{{
                edu.degree
              }}</a>
              <strong v-else class="cv-section__key">{{ edu.degree }}</strong>
              <br /><template v-if="edu.school">{{ edu.school }}, </template>{{ edu.period }}
            </li>
          </ul>
        </section>

        <section class="cv-section">
          <h2 class="cv-section__title">Langues</h2>
          <p v-for="lang in cv.languages" :key="lang.name" class="cv-section__line">
            <strong class="cv-section__key">{{ lang.name }}</strong> : {{ lang.level }}
          </p>
        </section>

        <section class="cv-section">
          <h2 class="cv-section__title">Loisirs</h2>
          <p class="cv-section__line">{{ sentenceList(cv.hobbies) }}</p>
        </section>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* --- La feuille : une page A4, en-tête brun puis deux colonnes --- */
.cv-sheet {
  --gutter: 10mm;
  display: grid;
  grid-template-rows: auto 1fr;
  width: 210mm;
  min-height: 297mm;
  background: var(--bg-card);
  font-size: 9pt;
  line-height: 1.45;
  /* Aplats imprimés tels quels : la propriété s'hérite dans toute la feuille */
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* --- En-tête : reprend l'accroche du site. Le dégradé s'arrête à
   mi-chemin du brun du dos : le roux clair y reste lisible (4,7:1). --- */
.cv-sheet__header {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 8mm;
  padding: 9mm var(--gutter);
  color: var(--on-dark);
  background: linear-gradient(
    135deg,
    var(--dark) 0%,
    color-mix(in srgb, var(--dark), var(--accent)) 100%
  );
}

/* Anneau roux dans le coin haut droit, comme sur le bloc Contact : il
   reste au-dessus du texte le plus long (la présentation) */
.cv-sheet__ring {
  position: absolute;
  z-index: -1;
  width: 46mm;
  height: 46mm;
  right: -16mm;
  top: -18mm;
  border: 7mm solid color-mix(in srgb, var(--highlight) 85%, transparent);
  border-radius: 50%;
}

/* Disque roux décalé derrière la photo, comme sur l'accroche */
.cv-sheet__visual {
  --offset: 2.5mm;
  position: relative;
  margin: 0 var(--offset) var(--offset) 0;
}

.cv-sheet__visual::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: var(--offset) calc(-1 * var(--offset)) calc(-1 * var(--offset)) var(--offset);
  border-radius: 50%;
  background: var(--highlight);
}

.cv-sheet__photo {
  display: block;
  width: 32mm;
  height: 32mm;
  border-radius: 50%;
  object-fit: cover;
  border: 1.2mm solid var(--on-dark);
}

.cv-sheet__name {
  font-size: 24pt;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.05;
}

.cv-sheet__role {
  margin-top: 1.2mm;
  font-size: 11pt;
  font-weight: 600;
  color: var(--highlight-on-dark);
}

.cv-sheet__badges {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 2mm;
  margin-top: 2.5mm;
}

.cv-sheet__badge {
  padding: 0.5mm 2.6mm;
  border: 0.3mm solid color-mix(in srgb, var(--on-dark) 55%, transparent);
  border-radius: var(--radius-pill);
  font-size: 8pt;
  font-weight: 600;
}

/* Même pastille que « Disponibilité » sur le site : encre sur roux */
.cv-sheet__badge--highlight {
  border-color: var(--highlight);
  background: var(--highlight);
  color: var(--text);
}

.cv-sheet__bio {
  margin-top: 2.5mm;
  color: var(--on-dark-soft);
}

/* --- Coordonnées : URL en clair, le PDF peut finir imprimé --- */
.contact {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1.2mm 5mm;
  margin-top: 3mm;
  font-size: 8.5pt;
  color: var(--on-dark-soft);
}

.contact__item {
  display: inline-flex;
  align-items: center;
  gap: 1.5mm;
}

.contact__link {
  color: var(--on-dark);
}

.contact__icon {
  font-size: 1.15em;
  color: var(--highlight-on-dark);
}

/* --- Corps : parcours à gauche, colonne chamois à droite --- */
.cv-sheet__body {
  display: grid;
  grid-template-columns: 1fr 58mm;
  gap: 7mm;
  padding: 7mm var(--gutter) 8mm;
}

.cv-sheet__main {
  display: flex;
  flex-direction: column;
  gap: 6mm;
  min-width: 0;
}

/* Le fond chamois descend jusqu'au pied de la page */
.cv-sheet__side {
  display: flex;
  flex-direction: column;
  gap: 5mm;
  padding: 5mm;
  border-radius: 4mm;
  background: var(--bg-tint);
  font-size: 8.5pt;
}

/* --- Section : surtitre souligné de roux, comme sur le site --- */
.cv-section__title {
  margin-bottom: 3mm;
  font-family: var(--font-body);
  font-size: 8pt;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--highlight-text);
  text-decoration: underline 0.6mm var(--highlight);
  text-decoration-skip-ink: none;
  text-underline-offset: 1.6mm;
}

.cv-section__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4mm;
}

.cv-section__list--tight {
  gap: 2mm;
}

.cv-section__line {
  color: var(--text-muted);
}

.cv-section__key {
  font-weight: 600;
  color: var(--text);
}

.cv-section__link {
  color: var(--accent);
}

/* --- Expériences --- */
.job__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 4mm;
}

.job__role {
  font-size: 12pt;
  font-weight: 700;
  line-height: 1.25;
}

.job__period {
  flex: none;
  font-size: 8.5pt;
  font-weight: 600;
  color: var(--highlight-text);
  font-variant-numeric: tabular-nums;
}

.job__company {
  font-weight: 600;
  color: var(--accent);
}

.job__desc {
  margin-top: 1.2mm;
  color: var(--text-muted);
  white-space: pre-line;
}

.job__missions-title {
  margin-top: 3mm;
  font-size: 10pt;
  font-weight: 700;
}

.job__missions {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2mm;
  margin-top: 1.5mm;
}

/* Mission : pastille rousse, casquettes calées à droite de l'intitulé */
.mission {
  position: relative;
  padding-left: 4.5mm;
  break-inside: avoid;
}

.mission::before {
  content: "";
  position: absolute;
  left: 0;
  top: 1.3mm;
  width: 2mm;
  height: 2mm;
  border-radius: 50%;
  background: var(--highlight);
}

.mission__head,
.project__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0 3mm;
}

.mission__title {
  font-weight: 600;
}

.mission__roles,
.project__stack {
  margin-left: auto;
  font-size: 7.5pt;
  font-weight: 500;
  color: var(--text-muted);
}

.mission__desc,
.project__desc {
  font-size: 8.5pt;
  color: var(--text-muted);
}

/* --- Projets perso --- */
.project__title {
  font-size: 10pt;
  font-weight: 700;
  font-family: var(--font-heading);
}

.project__link {
  font-weight: 600;
  color: var(--accent);
}

/* --- Compétences : groupe en gras, technos à la suite --- */
.skill-list {
  display: flex;
  flex-direction: column;
  gap: 2mm;
}

.skill-list__name {
  font-weight: 600;
}

/* --- Impression : la feuille occupe exactement la page --- */
@media print {
  .cv-sheet {
    height: 297mm;
  }
}
</style>
