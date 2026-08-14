<script setup lang="ts">
import { cv } from "~/data/cv";
import TechIcon from "./TechIcon.vue";

const telHref = `tel:${cv.phone.replaceAll(" ", "")}`;

// Nuage de technos : tous les groupes à plat, les icônes en avant
const allSkills = cv.skillGroups.flatMap((group) => group.skills);

/** Le PDF, c'est simplement la version imprimée : les styles print s'occupent du reste */
function printCv() {
  window.print();
}

/** Identifiant lisible d'un lien de profil, ex. github.com/foo -> "foo" */
function linkHandle(url: string) {
  return new URL(url).pathname.split("/").filter(Boolean).pop() ?? url;
}

/** Chaque casquette a sa couleur, portée par la classe du badge */
function badgeClass(badge: string) {
  const slug = badge
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z]+/g, "-");
  return `m-badge badge-${slug}`;
}
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
          <a class="c-row" :href="`mailto:${cv.email}`">
            <svg
              class="c-ico"
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
          <a class="c-row" :href="telHref">
            <svg
              class="c-ico"
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
          <a
            v-for="link in cv.links"
            :key="link.label"
            class="c-row"
            :href="link.url"
            target="_blank"
            rel="noopener"
          >
            <TechIcon class="c-ico" :label="link.label" />
            <span class="label-screen">{{ link.label }}</span>
            <span class="label-print">{{ linkHandle(link.url) }}</span>
          </a>
        </div>

        <!-- Version compacte du nuage, réservée à l'impression (bande de gauche) -->
        <div class="side-sec side-technos">
          <h2 class="side-title">Technos & outils</h2>
          <ul class="cloud cloud-side">
            <li v-for="skill in allSkills" :key="skill" class="chip">
              <TechIcon :label="skill" branded />{{ skill }}
            </li>
          </ul>
        </div>

        <div class="side-extras">
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
        </div>

        <button type="button" class="print-btn" @click="printCv">Imprimer / PDF</button>
      </aside>

      <!-- Colonne principale : parcours en timeline -->
      <div class="content">
        <section>
          <h2 class="sec-title">Expériences</h2>
          <ol class="timeline">
            <li v-for="exp in cv.experiences" :key="`${exp.role}-${exp.company}`" class="tl-item">
              <div class="tl-head">
                <p class="tl-period">{{ exp.period }}</p>
                <h3 class="tl-role">{{ exp.role }}</h3>
                <p class="tl-company">{{ exp.company }}</p>
              </div>
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
                    <span v-for="badge in m.badges" :key="badge" :class="badgeClass(badge)">{{
                      badge
                    }}</span>
                  </p>
                  <p class="m-desc">{{ m.description }}</p>
                </li>
              </ul>
            </li>
          </ol>
        </section>

        <section class="cloud-sec">
          <h2 class="sec-title">Technos & outils</h2>
          <ul class="cloud">
            <li v-for="skill in allSkills" :key="skill" class="chip">
              <TechIcon :label="skill" branded />{{ skill }}
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

.c-row {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-width: 0;
}

.c-ico {
  width: 1em;
  height: 1em;
  flex: none;
  color: var(--text-muted);
}

/* Les identifiants complets ne servent que sur papier */
.label-print {
  display: none;
}

/* À l'écran, le wrapper est transparent : les sections restent des enfants
   directs de la sidebar ; il ne sert qu'à la grille d'impression. */
.side-extras {
  display: contents;
}

/* Le nuage compact de la bande n'existe qu'à l'impression */
.side-technos {
  display: none;
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

.print-btn {
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

.print-btn:hover,
.print-btn:focus-visible {
  background: var(--accent);
  color: var(--bg-card);
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

/* À l'écran, l'en-tête de job est transparent : il ne sert qu'à la
   languette de la version imprimée */
.tl-head {
  display: contents;
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
  white-space: pre-line;
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
  color: var(--badge, var(--accent));
  background: color-mix(in srgb, var(--badge, var(--accent)) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--badge, var(--accent)) 28%, transparent);
  border-radius: var(--radius-pill);
  padding: 0.07rem 0.42rem;
}

/* Une couleur par casquette */
.badge-chef-de-projet {
  --badge: #3b5bdb;
}

.badge-developpeur {
  --badge: #2f9e44;
}

.badge-responsable-technique {
  --badge: #e8590c;
}

.badge-responsable-fonctionnel {
  --badge: #0c8599;
}

.badge-ia {
  --badge: #9c36b5;
}

.badge-en-autonomie {
  --badge: #5d6470;
}

/* --- Impression : CV moderne à bande latérale encrée.
   Colonne bleu profond avec l'identité en blanc, répétée sur chaque
   page ; colonne claire pour le parcours, cartes et chips teintées. --- */
@media print {
  .serieux {
    max-width: none;
    padding: 0;
  }

  /* La bande encrée : en position fixe, elle se répète sur chaque page */
  .sheet::before {
    content: "";
    position: fixed;
    inset: 0 auto 0 0;
    width: 62mm;
    background: #232f7a;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .sheet {
    display: grid;
    grid-template-columns: 62mm 1fr;
    gap: 0;
    padding: 0;
    border: 0;
    box-shadow: none;
    animation: none;
  }

  /* --- Colonne encre : identité et infos clés en blanc --- */
  .side {
    position: relative;
    top: 0;
    padding: 7mm 5mm 10mm 7mm;
    color: #fff;
  }

  .avatar {
    width: 30mm;
    height: 30mm;
    border: 2px solid rgba(255, 255, 255, 0.85);
    margin-bottom: 4mm;
    filter: none;
  }

  .name {
    font-size: 17pt;
    color: #fff;
  }

  .role {
    color: #bcc8ff;
    font-size: 10.5pt;
  }

  .age {
    color: #bcc8ff;
    font-size: 9pt;
    margin-bottom: 3mm;
  }

  .bio {
    color: #dde3ff;
    font-size: 9pt;
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

  .contact a {
    color: #fff;
  }

  .contact .c-ico {
    color: #fff;
  }

  /* Sur papier, l'identifiant remplace le libellé du lien */
  .label-screen {
    display: none;
  }

  .label-print {
    display: inline;
    overflow-wrap: anywhere;
  }

  .side-sec {
    margin-bottom: 3.5mm;
    break-inside: avoid;
  }

  /* Le nuage compact rejoint la bande, avant la formation */
  .side-technos {
    display: block;
  }

  /* Icônes seules : pastilles rondes façon photo, le logo remplit la
     pastille et le blanc ne se lit plus que comme un fin liseré */
  .cloud-side {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.8mm;
  }

  .cloud-side .chip {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    aspect-ratio: 1;
    font-size: 0;
    background: #fff;
    border: 0;
    padding: 0;
    border-radius: 50%;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .cloud-side .chip:not(:has(.tech-icon)) {
    display: none;
  }

  .cloud-side .tech-icon {
    width: 74%;
    height: 74%;
  }

  .side-title {
    color: #9daaf0;
  }

  .side-line {
    color: #dde3ff;
    font-size: 9pt;
  }

  .side-line strong {
    color: #fff;
  }

  .print-btn {
    display: none;
  }

  /* --- Colonne claire : le parcours --- */
  .content {
    display: block;
    padding: 10mm 10mm 10mm 8mm;
  }

  .content section {
    margin-bottom: 2.5mm;
  }

  /* Les languettes suffisent : pas de titre « Expériences » en print */
  .content .sec-title {
    display: none;
  }

  /* Plus de timeline : chaque job porte une languette bleu marine qui
     part du bord gauche, dans la continuité de la bande */
  .timeline {
    gap: 0;
    border-left: 0;
  }

  .tl-item {
    animation: none;
    padding-left: 0;
    margin-bottom: 2.5mm;
  }

  /* De l'air entre deux expériences */
  .tl-item + .tl-item {
    margin-top: 5mm;
  }

  /* Les entrées courtes (sans cartes de missions) ne se coupent pas
     entre deux pages */
  .tl-item:not(:has(.tl-missions)) {
    break-inside: avoid;
  }

  .tl-item::before {
    display: none;
  }

  .tl-head {
    display: block;
    background: #232f7a;
    margin: 0 0 2mm -8mm;
    padding: 1.8mm 4mm 2mm 8mm;
    border-radius: 0 3mm 3mm 0;
    break-inside: avoid;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .tl-head .tl-period {
    color: #bcc8ff;
    margin-bottom: 0.4mm;
  }

  .tl-head .tl-role {
    color: #fff;
  }

  .tl-head .tl-company {
    color: #dde3ff;
    margin-bottom: 0;
  }

  /* Missions en liste simple : pastille devant chaque intitulé,
     encadrée d'un titre et d'une ouverture */
  .tl-missions {
    margin-top: 2.5mm;
    grid-template-columns: 1fr;
    gap: 2mm;
  }

  .tl-missions::before {
    content: "Mes missions";
    font-weight: 700;
    font-size: 1.05rem;
    color: #232f7a;
  }

  .tl-missions::after {
    content: "et bien plus encore";
    font-style: italic;
    color: var(--text-muted);
  }

  .tl-missions li {
    break-inside: avoid;
    position: relative;
    padding: 0 0 0 4.5mm;
    background: none;
    border: 0;
    border-radius: 0;
  }

  /* La pastille */
  .tl-missions li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 1.4mm;
    width: 2mm;
    height: 2mm;
    border-radius: 50%;
    background: #232f7a;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* En impression, les casquettes restent sobres : marine uniforme */
  .m-badge {
    --badge: #232f7a;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* La section technos de la colonne claire disparaît : elle vit dans la bande */
  .cloud-sec {
    display: none;
  }

  .cloud {
    gap: 2mm;
  }

  .chip {
    break-inside: avoid;
    box-shadow: none;
    padding: 1.2mm 3mm;
    font-size: 9pt;
    background: #f1f3fd;
    border-color: transparent;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}

@media screen and (max-width: 760px) {
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
