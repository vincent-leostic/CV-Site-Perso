<script setup lang="ts">
import { cv } from "~/data/cv";

/** Commandes tapées l'une après l'autre ; `id` choisit la sortie affichée */
const STEPS = [
  { id: "whoami", cmd: "whoami" },
  { id: "bio", cmd: "cat ./bio.txt" },
  { id: "contacts", cmd: "ls ./contacts" },
  { id: "experiences", cmd: "cat ./experiences.log" },
  { id: "projects", cmd: "ls ./projets-perso" },
  { id: "skills", cmd: "./skills --graph" },
  { id: "education", cmd: "cat ./formation.txt" },
  { id: "extras", cmd: "cat ./extras.txt" },
] as const;

/** Session déjà jouée pendant la visite : on affiche tout d'emblée */
const PLAYED_KEY = "cv-terminal-played";

// Fichiers listés par `ls ./contacts` : le mail, le téléphone puis les liens
const contactFiles = [
  { name: "mail.txt", href: `mailto:${cv.email}`, value: cv.email, external: false },
  { name: "tel.txt", href: toTelHref(cv.phone), value: cv.phone, external: false },
  ...cv.links.map((link) => ({
    name: `${slugify(link.label)}.url`,
    href: link.url,
    value: link.label,
    external: true,
  })),
];

// Fichiers listés par `ls ./projets-perso` : un raccourci .url par site
const projectFiles = cv.personalProjects.map((proj) => ({
  ...proj,
  name: `${slugify(proj.title)}.url`,
  host: hostOf(proj.url),
}));

const shown = ref(0);
const typed = ref("");
const done = ref(false);
const screenEl = ref<HTMLElement | null>(null);

let alive = true;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Jauge ASCII, ex. [████████░░░░] */
function bar(level: number): string {
  const filled = Math.round((level / 100) * 12);
  return "█".repeat(filled) + "░".repeat(12 - filled);
}

function hasPlayed(): boolean {
  try {
    return sessionStorage.getItem(PLAYED_KEY) !== null;
  } catch {
    return false;
  }
}

/** Fin de session, tapée ou sautée : tout est affiché */
function finish() {
  shown.value = STEPS.length;
  done.value = true;
  window.removeEventListener("keydown", onKeydown);
  try {
    sessionStorage.setItem(PLAYED_KEY, "1");
  } catch {
    /* stockage bloqué : l'animation rejouera à la prochaine visite */
  }
}

/** Le bouton disparaît une fois tout affiché : le focus passe à l'écran */
async function skip() {
  finish();
  await nextTick();
  screenEl.value?.focus();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") void skip();
}

onMounted(async () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || hasPlayed()) {
    finish();
    return;
  }
  window.addEventListener("keydown", onKeydown);
  for (const [i, step] of STEPS.entries()) {
    typed.value = "";
    await delay(i === 0 ? 400 : 260);
    for (const char of step.cmd) {
      if (!alive || done.value) return;
      typed.value += char;
      await delay(24 + Math.random() * 40);
    }
    await delay(140);
    if (!alive || done.value) return;
    shown.value = i + 1;
  }
  finish();
});

onUnmounted(() => {
  alive = false;
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <div class="layout terminal">
    <div class="window">
      <div class="window__bar">
        <span class="window__dot window__dot--red" aria-hidden="true" />
        <span class="window__dot window__dot--yellow" aria-hidden="true" />
        <span class="window__dot window__dot--green" aria-hidden="true" />
        <span class="window__title">vincent@cv: bash</span>
        <button v-if="!done" type="button" class="window__skip" @click="skip">
          Tout afficher <kbd class="window__key">Échap</kbd>
        </button>
      </div>

      <div ref="screenEl" class="window__screen" tabindex="-1" :aria-busy="!done">
        <template v-for="(step, i) in STEPS" :key="step.id">
          <p v-if="shown >= i" class="prompt">
            <span class="prompt__user">vincent@cv:~$</span>
            <span>{{ shown > i ? step.cmd : typed }}</span>
            <span v-if="shown === i && !done" class="prompt__caret" aria-hidden="true" />
          </p>

          <div v-if="shown > i" class="output">
            <template v-if="step.id === 'whoami'">
              <p class="output__big">{{ cv.name }}</p>
              <p class="output__amber">{{ cv.title }}</p>
              <p class="output__dim">{{ cv.age }} ans · {{ cv.location }}</p>
            </template>

            <template v-else-if="step.id === 'bio'">
              <p>{{ cv.bio }}</p>
            </template>

            <ul v-else-if="step.id === 'contacts'" class="files" role="list">
              <li v-for="file in contactFiles" :key="file.name" class="files__item">
                <a
                  class="files__name"
                  :href="file.href"
                  :target="file.external ? '_blank' : undefined"
                  :rel="file.external ? 'noopener' : undefined"
                  >{{ file.name }}</a
                >
                <span class="output__dim">→ {{ file.value }}</span>
              </li>
            </ul>

            <template v-else-if="step.id === 'experiences'">
              <div
                v-for="exp in cv.experiences"
                :key="`${exp.role}-${exp.company}`"
                class="output__entry"
              >
                <p>
                  <span class="output__amber">[{{ exp.period }}]</span>{{ " " }}
                  <span class="output__strong">{{ exp.role }}</span>
                </p>
                <p class="output__dim"># {{ exp.company }}</p>
                <p class="output__dim">{{ exp.description }}</p>
                <p v-for="m in exp.missions ?? []" :key="m.title" class="output__dim">
                  - <span class="output__strong">{{ m.title }}</span>
                  <span
                    v-if="m.favorite"
                    class="output__amber"
                    role="img"
                    aria-label="Mission favorite"
                    >{{ " " }}★</span
                  >
                  <span v-if="m.badges" class="output__amber"
                    >{{ " " }}[{{ m.badges.join("|").toLowerCase() }}]</span
                  >
                  : {{ m.description }}
                </p>
              </div>
            </template>

            <template v-else-if="step.id === 'projects'">
              <div v-for="proj in projectFiles" :key="proj.name" class="output__entry">
                <p class="files__item">
                  <a class="files__name" :href="proj.url" target="_blank" rel="noopener">{{
                    proj.name
                  }}</a>
                  <span class="output__dim">→ {{ proj.host }}</span>
                </p>
                <p class="output__dim">
                  #
                  <span v-if="proj.stack" class="output__amber"
                    >[{{ proj.stack.map((tech) => tech.label.toLowerCase()).join("|") }}]</span
                  >
                  {{ proj.description }}
                </p>
              </div>
            </template>

            <template v-else-if="step.id === 'skills'">
              <div v-for="group in cv.skillGroups" :key="group.title" class="output__entry">
                <p class="output__amber"># {{ group.title }}</p>
                <p v-for="skill in group.skills" :key="skill.label" class="skill">
                  <span class="skill__name">
                    <CvTechIcon v-if="skill.icon" class="skill__icon" :name="skill.icon" />
                    {{ skill.label }}
                  </span>
                  <span class="skill__gauge">[{{ bar(skill.level) }}]</span>
                  <span class="skill__value">{{ skill.level }}%</span>
                </p>
              </div>
            </template>

            <template v-else-if="step.id === 'education'">
              <div v-for="edu in cv.education" :key="edu.degree" class="output__entry">
                <p>
                  <span class="output__amber">[{{ edu.period }}]</span>{{ " " }}
                  <span class="output__strong">{{ edu.degree }}</span>
                </p>
                <p class="output__dim"># {{ edu.school }}</p>
              </div>
            </template>

            <template v-else>
              <p class="output__amber"># Langues</p>
              <p v-for="lang in cv.languages" :key="lang.name" class="output__dim">
                - <span class="output__strong">{{ lang.name }}</span> : {{ lang.level }}
              </p>
              <p class="output__amber"># Hobbies</p>
              <p class="output__dim">- {{ cv.hobbies.join(", ") }}</p>
            </template>
          </div>
        </template>

        <p v-if="done" class="prompt">
          <span class="prompt__user">vincent@cv:~$</span>
          <span class="prompt__caret" aria-hidden="true" />
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Allumage du tube cathodique */
.window {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
  animation: crt-on 0.45s var(--ease-out) backwards;
}

@keyframes crt-on {
  0% {
    transform: scaleY(0.02);
    opacity: 0.4;
    filter: brightness(6);
  }
  60% {
    transform: scaleY(1);
    filter: brightness(1.6);
  }
  100% {
    filter: brightness(1);
  }
}

.window__bar {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 0.9rem;
  border-bottom: 1px solid var(--border);
  background: color-mix(in srgb, var(--accent) 4%, transparent);
}

.window__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  opacity: 0.75;
}

.window__dot--red {
  background: #ff5f57;
}

.window__dot--yellow {
  background: #febc2e;
}

.window__dot--green {
  background: #28c840;
}

.window__title {
  margin-left: 0.5rem;
  font-size: 1rem;
  color: var(--text-muted);
}

.window__skip {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.1rem 0.6rem;
  font: inherit;
  font-size: 1rem;
  color: var(--accent);
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition:
    border-color 0.2s,
    background-color 0.2s;
}

.window__skip:is(:hover, :focus-visible) {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}

.window__key {
  font: inherit;
  color: var(--text-muted);
}

.window__screen {
  padding: 1.6rem 1.7rem 2rem;
  font-size: 1.18rem;
  line-height: 1.55;
  min-height: 480px;
  text-shadow: 0 0 6px color-mix(in srgb, var(--accent) 30%, transparent);
}

.prompt {
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
  flex-wrap: wrap;
}

.prompt__user {
  color: var(--accent);
  white-space: nowrap;
}

.prompt__caret {
  display: inline-block;
  width: 0.55em;
  height: 1em;
  background: var(--accent);
  transform: translateY(0.15em);
  animation: blink 1.05s steps(2) infinite;
}

.output {
  margin: 0.4rem 0 1.2rem;
}

.output__big {
  font-size: 2.1rem;
  line-height: 1.15;
  color: var(--accent);
  text-shadow: 0 0 12px color-mix(in srgb, var(--accent) 45%, transparent);
}

.output__amber {
  color: var(--accent-2);
  text-shadow: 0 0 6px color-mix(in srgb, var(--accent-2) 30%, transparent);
}

.output__dim {
  color: var(--text-muted);
  white-space: pre-line;
}

.output__strong {
  color: var(--text);
}

.output__entry + .output__entry {
  margin-top: 0.8rem;
}

.files {
  list-style: none;
}

.files__item {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
}

.files__name {
  color: var(--accent-2);
}

.files__name:is(:hover, :focus-visible) {
  text-decoration: underline;
  color: var(--accent-hover);
}

.skill {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 0.8rem;
  max-width: 460px;
}

/* Icônes façon glyphes Nerd Font, teintées phosphore */
.skill__name {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.skill__icon {
  font-size: 0.85em;
  opacity: 0.9;
}

.skill__gauge {
  letter-spacing: 0.04em;
}

.skill__value {
  color: var(--accent-2);
  text-shadow: 0 0 6px color-mix(in srgb, var(--accent-2) 30%, transparent);
}

@media (max-width: 560px) {
  .window__screen {
    padding: 1.2rem 1rem 1.6rem;
    font-size: 1.05rem;
  }

  .skill {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .skill__value {
    display: none;
  }
}
</style>
