<script setup lang="ts">
import { cv } from "~/data/cv";

const SECTIONS = [
  { id: "a-propos", label: "À propos" },
  { id: "projets", label: "Projets" },
  { id: "competences", label: "Compétences" },
  { id: "parcours", label: "Parcours" },
  { id: "loisirs", label: "Loisirs" },
  { id: "contact", label: "Contact" },
];

// Menu déroulant sous 1000px. Il se ferme au choix d'une section, avec
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
        <LineIcon :name="open ? 'x' : 'menu'" /><span class="visually-hidden">Menu</span>
      </button>
      <nav
        id="site-nav"
        class="site-header__nav"
        :class="{ 'site-header__nav--open': open }"
        aria-label="Sections du portfolio"
      >
        <ul class="site-header__links" role="list">
          <li v-for="section in SECTIONS" :key="section.id" class="site-header__item">
            <a class="site-header__link" :href="`#${section.id}`" @click="open = false">{{
              section.label
            }}</a>
          </li>
        </ul>
      </nav>
      <a
        class="button button--primary button--small"
        :href="CV_PDF_HREF"
        :download="CV_PDF_DOWNLOAD"
      >
        <LineIcon class="button__icon" name="download" />Mon CV<span class="visually-hidden">
          ({{ CV_PDF_META }})</span
        >
      </a>
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
  gap: 2rem;
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

/* Bouton du menu, affiché sous 1000px : même hauteur que « Mon CV » */
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

/* Sous 1000px, les six liens ne tiennent plus à côté du nom et du bouton :
   ils passent dans un panneau déroulé sous l'en-tête */
@media (max-width: 1000px) {
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

@media (max-width: 400px) {
  .site-header__inner,
  .site-header__nav {
    padding-inline: 0.75rem;
  }
}

@media print {
  .site-header {
    display: none;
  }
}
</style>
