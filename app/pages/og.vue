<script setup lang="ts">
import { cv } from "~/data/cv";

// Gabarit de la miniature de partage (scripts/og-image.mjs) : capturée à
// 1200 × 630 au build, puis retirée du site publié. Reprend l'accroche.
useBuildOnlyPage(`${cv.name} - Miniature`);

const [firstName, ...lastNames] = cv.name.split(" ");
</script>

<template>
  <main class="og">
    <span class="og__ring" aria-hidden="true" />
    <span class="og__ring og__ring--highlight" aria-hidden="true" />
    <div class="og__visual">
      <img
        class="og__photo"
        :src="cv.photo"
        :alt="`Photo de ${cv.name}`"
        width="200"
        height="200"
      />
    </div>
    <div>
      <p class="section__kicker og__kicker">Portfolio</p>
      <h1 class="og__name">{{ firstName }}<br />{{ lastNames.join(" ") }}</h1>
      <p class="og__role">{{ cv.title }}</p>
      <p class="og__url">{{ bareUrl(cv.website) }}</p>
    </div>
  </main>
</template>

<style scoped>
/* Cotes en px : la capture est faite à 1200 × 630, à l'échelle 1 */
.og {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 72px;
  width: 1200px;
  height: 630px;
  padding: 0 90px 0 110px;
  color: var(--on-dark);
  background: linear-gradient(135deg, var(--dark) 0%, var(--accent) 100%);
}

/* Anneau blanc en haut à gauche, comme sur l'accroche, et anneau roux en
   bas à droite, comme sur le bloc Contact */
.og__ring {
  position: absolute;
  z-index: -1;
  width: 300px;
  height: 300px;
  left: -110px;
  top: -130px;
  border: 44px solid color-mix(in srgb, var(--on-dark) 10%, transparent);
  border-radius: 50%;
}

.og__ring--highlight {
  width: 360px;
  height: 360px;
  left: auto;
  top: auto;
  right: -150px;
  bottom: -180px;
  border: 52px solid color-mix(in srgb, var(--highlight) 85%, transparent);
}

/* Disque roux décalé derrière la photo, comme sur l'accroche */
.og__visual {
  --offset: 22px;
  position: relative;
  margin: 0 var(--offset) var(--offset) 0;
}

.og__visual::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: var(--offset) calc(-1 * var(--offset)) calc(-1 * var(--offset)) var(--offset);
  border-radius: 50%;
  background: var(--highlight);
}

.og__photo {
  display: block;
  width: 270px;
  height: 270px;
  border-radius: 50%;
  object-fit: cover;
  border: 8px solid var(--on-dark);
  box-shadow: 0 20px 50px rgba(40, 25, 15, 0.35);
}

.og__kicker {
  margin-bottom: 18px;
  font-size: 20px;
  color: var(--on-dark-soft);
}

.og__name {
  font-size: 104px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 0.98;
}

.og__role {
  margin-top: 20px;
  max-width: 600px;
  font-size: 34px;
  font-weight: 600;
  line-height: 1.25;
  color: var(--on-dark-soft);
}

/* Pastille comme les boutons du site : encre sur roux */
.og__url {
  display: inline-block;
  margin-top: 30px;
  padding: 10px 26px;
  border-radius: var(--radius-pill);
  background: var(--highlight);
  font-size: 26px;
  font-weight: 700;
  color: var(--text);
}
</style>
