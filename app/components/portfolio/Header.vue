<script setup lang="ts">
import { SECTION_IDS } from "~/data/content";

const { cv, ui } = useContent();
const pdf = useCvPdf();

// Menu déroulant sous 1080px. Il se ferme au choix d'une section, avec
// Échap (le focus revient au bouton) et dès qu'on clique ou tabule hors
// de l'en-tête.
const open = ref(false);
const header = useTemplateRef("header");
const toggle = useTemplateRef("toggle");

function closeWithEscape() {
  if (!open.value) return;
  open.value = false;
  toggle.value?.focus();
}

function closeIfOutside(target: EventTarget | null) {
  if (!(target instanceof Node) || !header.value?.contains(target)) open.value = false;
}

const onPointerDown = (event: PointerEvent) => closeIfOutside(event.target);

watch(open, (isOpen) => {
  if (isOpen) document.addEventListener("pointerdown", onPointerDown);
  else document.removeEventListener("pointerdown", onPointerDown);
});

onUnmounted(() => document.removeEventListener("pointerdown", onPointerDown));
</script>

<template>
  <header
    ref="header"
    class="site-header"
    @keydown.esc="closeWithEscape"
    @focusout="closeIfOutside($event.relatedTarget)"
  >
    <div class="site-header__inner">
      <a class="site-header__brand" href="#top">{{ cv.name }}</a>
      <button
        ref="toggle"
        class="site-header__toggle"
        type="button"
        aria-controls="site-nav"
        :aria-expanded="open"
        @click="open = !open"
      >
        <LineIcon :name="open ? 'x' : 'menu'" /><span class="visually-hidden">{{
          ui.header.menu
        }}</span>
      </button>
      <nav
        id="site-nav"
        class="site-header__nav"
        :class="{ 'site-header__nav--open': open }"
        :aria-label="ui.header.navLabel"
      >
        <ul class="site-header__links" role="list">
          <li v-for="id in SECTION_IDS" :key="id" class="site-header__item">
            <a
              class="site-header__link"
              :href="`#${id}`"
              data-track="nav-link"
              :data-track-section="id"
              @click="open = false"
              >{{ ui.header.sections[id] }}</a
            >
          </li>
        </ul>
      </nav>
      <a
        class="button button--primary button--small site-header__cv"
        :href="pdf.href"
        :download="pdf.download"
        data-track="cv-download"
        :data-track-lang="pdf.lang"
        data-track-from="header"
      >
        <LineIcon name="download" /><span class="site-header__cv-label">{{ ui.header.cv }}</span
        ><span class="visually-hidden"> ({{ pdf.meta }})</span>
      </a>
      <PortfolioLangSwitch />
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--bg-card) 88%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}

.site-header__inner {
  max-width: var(--container);
  margin-inline: auto;
  padding: 0.7rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* Le nom fait office de logo : police des titres */
.site-header__brand {
  margin-right: auto;
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--text);
}

.site-header__brand:is(:hover, :focus-visible) {
  color: var(--accent);
}

.site-header__links {
  list-style: none;
  display: flex;
  gap: 1.6rem;
}

.site-header__link {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text-muted);
  text-underline-offset: 6px;
  text-decoration-thickness: 2px;
}

.site-header__link:is(:hover, :focus-visible) {
  color: var(--text);
  text-decoration: underline;
  text-decoration-color: var(--highlight);
}

/* Bouton du menu, affiché sous 1080px : même hauteur que « Mon CV » */
.site-header__toggle {
  display: none;
  place-items: center;
  width: 2.3rem;
  height: 2.3rem;
  border: 2px solid var(--border);
  border-radius: 50%;
  background: none;
  color: var(--text);
  font-size: 1.2rem;
  cursor: pointer;
  transition:
    border-color 0.2s,
    background-color 0.2s;
}

.site-header__toggle:is(:hover, :focus-visible) {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 7%, transparent);
}

/* Sous 1080px, les six liens ne tiennent plus à côté du nom, du CV et de
   la langue : ils passent dans un panneau déroulé sous l'en-tête */
@media (max-width: 1080px) {
  .site-header__inner {
    gap: 0.75rem;
  }

  .site-header__toggle {
    display: grid;
  }

  .site-header__nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 0.25rem 1.5rem 0.75rem;
    background: var(--bg-card);
    border-bottom: 1px solid var(--border);
    box-shadow: var(--shadow);
  }

  .site-header__nav--open {
    display: block;
  }

  .site-header__links {
    flex-direction: column;
    gap: 0;
    max-width: var(--container);
    margin-inline: auto;
  }

  .site-header__item + .site-header__item {
    border-top: 1px solid var(--border);
  }

  .site-header__link {
    display: block;
    padding: 0.8rem 0;
    font-size: 1rem;
  }
}

/* Petits écrans : nom, menu, CV et langue ne tiennent plus côte à côte.
   Le bouton du CV garde son icône ; son libellé reste lu. */
@media (max-width: 480px) {
  .site-header__cv {
    gap: 0;
    padding: 0.5rem;
  }

  .site-header__cv-label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
}

@media (max-width: 400px) {
  .site-header__inner,
  .site-header__nav {
    padding-inline: 0.75rem;
  }
}

/* Sous 360px, même l'icône du CV ne tient plus : le bouton « Télécharger
   mon CV » de l'accroche est juste en dessous */
@media (max-width: 359px) {
  .site-header__cv {
    display: none;
  }
}

@media print {
  .site-header {
    display: none;
  }
}
</style>
