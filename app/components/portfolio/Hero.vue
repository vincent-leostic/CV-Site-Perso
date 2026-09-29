<script setup lang="ts">
const { cv, ui } = useContent();
const pdf = useCvPdf();
</script>

<template>
  <section id="top" class="hero" aria-labelledby="hero-name">
    <span class="hero__ring" aria-hidden="true" />

    <!-- Rossignol perché sur la limite basse de l'accroche -->
    <Nightingale class="hero__bird" />

    <div class="hero__inner">
      <div class="hero__text">
        <p class="section__kicker hero__kicker">{{ ui.hero.kicker }}</p>
        <h1 id="hero-name" class="hero__name">{{ cv.name }}</h1>
        <p class="hero__role">{{ cv.title }}</p>
        <p class="hero__pitch">{{ cv.bio }}</p>

        <div class="hero__actions">
          <a class="button button--primary" :href="pdf.href" :download="pdf.download">
            <LineIcon class="button__icon" name="download" />{{ ui.hero.download }}
            <span class="button__meta">({{ pdf.meta }})</span>
          </a>
          <a class="button button--ghost" href="#contact">{{ ui.hero.contact }}</a>
        </div>

        <ul class="hero__meta" role="list">
          <li class="hero__meta-item">
            <LineIcon class="hero__meta-icon" name="map-pin" />{{ cv.area }}
          </li>
          <li v-for="link in cv.links" :key="link.label">
            <a class="hero__meta-item hero__social" :href="link.url" target="_blank" rel="noopener">
              <TechIcon v-if="link.icon" class="hero__meta-icon" :name="link.icon" />{{ link.label
              }}<span class="visually-hidden">{{ ui.newTab }}</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="hero__visual">
        <img class="hero__photo" :src="cv.photo" :alt="ui.photoAlt" width="200" height="200" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  --focus: var(--on-dark);
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 5rem 1.5rem 5.5rem;
  color: var(--on-dark);
  background: linear-gradient(135deg, var(--dark) 0%, var(--accent) 100%);
}

/* Anneau décoratif en haut à gauche */
.hero__ring {
  position: absolute;
  z-index: -1;
  width: 200px;
  height: 200px;
  left: -70px;
  top: -80px;
  border: 30px solid color-mix(in srgb, var(--on-dark) 10%, transparent);
  border-radius: 50%;
  pointer-events: none;
}

/* Rossignol perché sur la limite basse de l'accroche, dans le vide à
   gauche du contenu, son centre à 40 % de ce vide : sa largeur suit
   l'espace libre et il reste loin du texte. Masqué sur les écrans trop
   étroits, où il passerait sous le texte. */
.hero__bird {
  display: none;
  position: absolute;
  z-index: -1;
  bottom: 0;
  left: calc((100% - var(--container)) * 0.2);
  width: clamp(200px, calc((100% - var(--container)) / 2 - 5rem), 320px);
  transform: translateX(-50%);
}

@media (min-width: 1700px) {
  .hero__bird {
    display: block;
  }
}

.hero__inner {
  max-width: var(--container);
  margin-inline: auto;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 3rem;
}

.hero__kicker {
  color: var(--on-dark-soft);
}

.hero__name {
  font-size: clamp(2.4rem, 7vw, 4.2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.02;
}

.hero__role {
  margin-top: 0.6rem;
  font-size: clamp(1.15rem, 2.6vw, 1.45rem);
  font-weight: 600;
  color: var(--on-dark-soft);
}

.hero__pitch {
  margin-top: 1.2rem;
  max-width: 36rem;
  font-size: 1.08rem;
  color: var(--on-dark-soft);
}

.hero__actions {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.hero__meta {
  list-style: none;
  margin-top: 1.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1.4rem;
  font-size: 0.92rem;
  color: var(--on-dark-soft);
}

.hero__meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.hero__meta-icon {
  font-size: 1.05em;
}

.hero__social {
  font-weight: 600;
  color: var(--on-dark);
  text-underline-offset: 4px;
  text-decoration-thickness: 2px;
}

.hero__social:is(:hover, :focus-visible) {
  color: var(--on-dark);
  text-decoration: underline;
  text-decoration-color: var(--highlight);
}

/* Disque roux décalé derrière la photo : attaché à elle, il ne passe
   jamais sous le texte blanc */
.hero__visual {
  --offset: 26px;
  position: relative;
  margin: 0 var(--offset) var(--offset) 0;
}

.hero__visual::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: var(--offset) calc(-1 * var(--offset)) calc(-1 * var(--offset)) var(--offset);
  border-radius: 50%;
  background: var(--highlight);
}

.hero__photo {
  display: block;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  object-fit: cover;
  border: 6px solid var(--on-dark);
  box-shadow: 0 20px 50px rgba(40, 25, 15, 0.35);
}

@media (max-width: 760px) {
  .hero {
    padding: 3rem 1.5rem 3.5rem;
  }

  .hero__inner {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .hero__visual {
    --offset: 12px;
    order: -1;
    justify-self: start;
  }

  .hero__photo {
    width: 120px;
    height: 120px;
    border-width: 4px;
  }
}

@media (max-width: 400px) {
  .hero {
    padding-inline: 0.75rem;
  }
}

/* Sur papier, pas de fond : le texte repasse en encre */
@media print {
  .hero {
    padding: 0 0 8mm;
    color: var(--text);
    background: none;
  }

  .hero__ring,
  .hero__visual::before,
  .hero__actions {
    display: none;
  }

  .hero__kicker,
  .hero__role,
  .hero__pitch,
  .hero__meta,
  .hero__social {
    color: var(--text);
  }

  .hero__photo {
    width: 30mm;
    height: 30mm;
    box-shadow: none;
  }
}
</style>
