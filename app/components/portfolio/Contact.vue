<script setup lang="ts">
const { cv, ui } = useContent();
const pdf = useCvPdf();
</script>

<template>
  <section id="contact" class="section contact-panel" aria-labelledby="contact-title">
    <span class="contact-panel__ring" aria-hidden="true" />
    <!-- Rossignol perché sur la limite basse du bloc, en miroir de l'accroche -->
    <Nightingale class="contact-panel__bird" />
    <div class="section__inner">
      <p class="section__kicker contact-panel__kicker">{{ ui.contact.kicker }}</p>
      <h2 id="contact-title" class="section__title">{{ ui.contact.title }}</h2>
      <p class="section__intro contact-panel__intro">{{ ui.contact.intro }}</p>

      <ul class="contact-panel__list" role="list">
        <li>
          <a
            class="contact-panel__link"
            :href="`mailto:${cv.email}`"
            data-umami-event="contact-email"
          >
            <LineIcon class="contact-panel__icon" name="mail" />{{ cv.email }}
          </a>
        </li>
        <li>
          <a
            class="contact-panel__link"
            :href="toTelHref(cv.phone)"
            data-umami-event="contact-phone"
          >
            <LineIcon class="contact-panel__icon" name="phone" />{{ noBreak(cv.phone) }}
          </a>
        </li>
        <li v-for="link in cv.links" :key="link.label">
          <a
            class="contact-panel__link"
            :href="link.url"
            target="_blank"
            rel="noopener"
            data-umami-event="social-link"
            :data-umami-event-network="link.label"
            data-umami-event-from="contact"
          >
            <TechIcon v-if="link.icon" class="contact-panel__icon" :name="link.icon" />{{
              link.label
            }}<span class="visually-hidden">{{ ui.newTab }}</span>
          </a>
        </li>
      </ul>

      <a
        class="button button--primary contact-panel__cv"
        :href="pdf.href"
        :download="pdf.download"
        data-umami-event="cv-download"
        :data-umami-event-lang="pdf.lang"
        data-umami-event-from="contact"
      >
        <LineIcon class="button__icon" name="download" />{{ ui.contact.download }}
        <span class="button__meta">({{ pdf.meta }})</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.contact-panel {
  --focus: var(--on-dark);
  position: relative;
  isolation: isolate;
  overflow: hidden;
  color: var(--on-dark);
  background: var(--dark);
}

.contact-panel__ring {
  position: absolute;
  z-index: -1;
  width: 320px;
  height: 320px;
  right: -110px;
  top: -120px;
  border: 44px solid color-mix(in srgb, var(--highlight) 85%, transparent);
  border-radius: 50%;
  pointer-events: none;
}

/* Pendant du rossignol de l'accroche : à droite du contenu, retourné pour
   regarder vers lui, les pattes sur le bas du bloc. Mêmes règles de
   taille et d'affichage. */
.contact-panel__bird {
  display: none;
  position: absolute;
  z-index: -1;
  bottom: 0;
  right: calc((100% - var(--container)) * 0.2);
  width: clamp(200px, calc((100% - var(--container)) / 2 - 5rem), 320px);
  transform: translateX(50%) scaleX(-1);
}

@media (min-width: 1700px) {
  .contact-panel__bird {
    display: block;
  }
}

.contact-panel__kicker {
  color: var(--highlight-on-dark);
}

.contact-panel__intro {
  color: var(--on-dark-soft);
}

/* Chaque lien prend la largeur de son contenu : l'e-mail ne se coupe pas */
.contact-panel__list {
  list-style: none;
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.contact-panel__link {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 1rem 1.2rem;
  border-radius: var(--radius);
  background: color-mix(in srgb, var(--on-dark) 8%, transparent);
  font-weight: 600;
  color: var(--on-dark);
  overflow-wrap: anywhere;
  transition: background-color 0.2s;
}

.contact-panel__link:is(:hover, :focus-visible) {
  color: var(--on-dark);
  background: color-mix(in srgb, var(--on-dark) 16%, transparent);
}

.contact-panel__icon {
  font-size: 1.2rem;
  color: var(--highlight-on-dark);
}

.contact-panel__cv {
  margin-top: 2rem;
}

@media (max-width: 760px) {
  .contact-panel__ring {
    width: 200px;
    height: 200px;
    right: -90px;
    top: -90px;
    border-width: 30px;
  }
}

@media print {
  .contact-panel {
    color: var(--text);
    background: none;
  }

  .contact-panel__ring,
  .contact-panel__cv {
    display: none;
  }

  .contact-panel__kicker,
  .contact-panel__intro,
  .contact-panel__link {
    color: var(--text);
  }
}
</style>
