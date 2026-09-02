<script setup lang="ts">
import { cv } from "~/data/cv";
import TechIcon from "./TechIcon.vue";

const COMMANDS = [
  "whoami",
  "cat ./bio.txt",
  "ls ./contacts",
  "cat ./experiences.log",
  "ls ./projets-perso",
  "./skills --graph",
  "cat ./formation.txt",
  "cat ./extras.txt",
];

// Fichiers listés par `ls ./contacts` : le mail puis les liens
const contactFiles = [
  { name: "mail.txt", href: `mailto:${cv.email}`, value: cv.email, external: false },
  {
    name: "tel.txt",
    href: `tel:${cv.phone.replaceAll(" ", "")}`,
    value: cv.phone,
    external: false,
  },
  ...cv.links.map((link) => ({
    name: `${link.label.toLowerCase()}.url`,
    href: link.url,
    value: link.label,
    external: true,
  })),
];

// Fichiers listés par `ls ./projets-perso` : un raccourci .url par site
const projectFiles = cv.personalProjects.map((proj) => ({
  ...proj,
  name: `${proj.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")}.url`,
  host: new URL(proj.url).hostname.replace(/^www\./, ""),
}));

const shown = ref(0);
const typed = ref("");
const done = ref(false);

let alive = true;
let skipped = false;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Jauge ASCII, ex. [████████░░░░] */
function bar(level: number): string {
  const filled = Math.round((level / 100) * 12);
  return "█".repeat(filled) + "░".repeat(12 - filled);
}

/** Un clic sur l'écran affiche tout immédiatement */
function skip() {
  skipped = true;
  shown.value = COMMANDS.length;
  done.value = true;
}

onMounted(async () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    skip();
    return;
  }
  for (let i = 0; i < COMMANDS.length; i++) {
    if (!alive || skipped) return;
    typed.value = "";
    await delay(i === 0 ? 400 : 260);
    for (const char of COMMANDS[i] as string) {
      if (!alive || skipped) return;
      typed.value += char;
      await delay(24 + Math.random() * 40);
    }
    await delay(140);
    if (!alive || skipped) return;
    shown.value = i + 1;
  }
  done.value = true;
});

onUnmounted(() => {
  alive = false;
});
</script>

<template>
  <div class="terminal">
    <div class="window" @click="skip">
      <div class="titlebar">
        <span class="dot dot-r" aria-hidden="true" />
        <span class="dot dot-y" aria-hidden="true" />
        <span class="dot dot-g" aria-hidden="true" />
        <span class="title">vincent@cv: bash</span>
      </div>

      <div class="screen">
        <template v-for="(cmd, i) in COMMANDS" :key="cmd">
          <p v-if="shown >= i" class="prompt-line">
            <span class="prompt">vincent@cv:~$</span>
            <span class="cmd">{{ shown > i ? cmd : typed }}</span>
            <span v-if="shown === i && !done" class="caret" aria-hidden="true" />
          </p>

          <div v-if="shown > i" class="output">
            <!-- whoami -->
            <template v-if="i === 0">
              <p class="big">{{ cv.name }}</p>
              <p class="amber">{{ cv.title }}</p>
              <p class="dim">{{ cv.age }} ans · {{ cv.location }}</p>
            </template>

            <!-- bio -->
            <template v-else-if="i === 1">
              <p>{{ cv.bio }}</p>
            </template>

            <!-- contacts -->
            <template v-else-if="i === 2">
              <p v-for="file in contactFiles" :key="file.name" class="file-line">
                <a
                  class="file"
                  :href="file.href"
                  :target="file.external ? '_blank' : undefined"
                  :rel="file.external ? 'noopener' : undefined"
                >
                  {{ file.name }}
                </a>
                <span class="dim">→ {{ file.value }}</span>
              </p>
            </template>

            <!-- expériences -->
            <template v-else-if="i === 3">
              <div
                v-for="exp in cv.experiences"
                :key="`${exp.role}-${exp.company}`"
                class="log-entry"
              >
                <p>
                  <span class="amber">[{{ exp.period }}]</span>
                  <span class="strong"> {{ exp.role }}</span>
                </p>
                <p class="dim"># {{ exp.company }}</p>
                <p class="dim">{{ exp.description }}</p>
                <p v-for="m in exp.missions ?? []" :key="m.title" class="dim">
                  - <span class="strong">{{ m.title }}</span
                  ><span v-if="m.favorite" class="amber" role="img" aria-label="Mission favorite">
                    ★</span
                  ><template v-if="m.badges">
                    <span class="amber">[{{ m.badges.join("|").toLowerCase() }}]</span></template
                  >
                  : {{ m.description }}
                </p>
              </div>
            </template>

            <!-- projets perso -->
            <template v-else-if="i === 4">
              <div v-for="proj in projectFiles" :key="proj.name" class="log-entry">
                <p class="file-line">
                  <a class="file" :href="proj.url" target="_blank" rel="noopener">{{
                    proj.name
                  }}</a>
                  <span class="dim">→ {{ proj.host }}</span>
                </p>
                <p class="dim">
                  #
                  <template v-if="proj.stack">
                    <span class="amber">[{{ proj.stack.join("|").toLowerCase() }}]</span>
                  </template>
                  {{ proj.description }}
                </p>
              </div>
            </template>

            <!-- compétences -->
            <template v-else-if="i === 5">
              <div v-for="group in cv.skillGroups" :key="group.title" class="skill-group">
                <p class="amber"># {{ group.title }}</p>
                <p v-for="skill in group.skills" :key="skill" class="skill-line">
                  <span class="skill-name"><TechIcon :label="skill" />{{ skill }}</span>
                  <span class="gauge">[{{ bar(statLevel(skill)) }}]</span>
                  <span class="amber">{{ statLevel(skill) }}%</span>
                </p>
              </div>
            </template>

            <!-- formation -->
            <template v-else-if="i === 6">
              <div v-for="edu in cv.education" :key="edu.degree" class="log-entry">
                <p>
                  <span class="amber">[{{ edu.period }}]</span>
                  <span class="strong"> {{ edu.degree }}</span>
                </p>
                <p class="dim"># {{ edu.school }}</p>
              </div>
            </template>

            <!-- langues & hobbies -->
            <template v-else>
              <p class="amber"># Langues</p>
              <p v-for="lang in cv.languages" :key="lang.name" class="dim">
                - <span class="strong">{{ lang.name }}</span> : {{ lang.level }}
              </p>
              <p class="amber"># Hobbies</p>
              <p class="dim">- {{ cv.hobbies.join(", ") }}</p>
            </template>
          </div>
        </template>

        <p v-if="done" class="prompt-line">
          <span class="prompt">vincent@cv:~$</span>
          <span class="caret" aria-hidden="true" />
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.terminal {
  max-width: 1020px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 3rem;
}

/* Allumage du tube cathodique */
.window {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
  animation: crt-on 0.45s cubic-bezier(0.22, 1, 0.36, 1) backwards;
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

.titlebar {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 0.9rem;
  border-bottom: 1px solid var(--border);
  background: rgba(51, 255, 119, 0.04);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  opacity: 0.75;
}

.dot-r {
  background: #ff5f57;
}

.dot-y {
  background: #febc2e;
}

.dot-g {
  background: #28c840;
}

.title {
  margin-left: 0.5rem;
  font-size: 1rem;
  color: var(--text-muted);
}

.screen {
  padding: 1.6rem 1.7rem 2rem;
  font-size: 1.18rem;
  line-height: 1.55;
  min-height: 480px;
  text-shadow: 0 0 6px rgba(51, 255, 119, 0.3);
}

.prompt-line {
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
  flex-wrap: wrap;
}

.prompt {
  color: var(--accent);
  white-space: nowrap;
}

.caret {
  display: inline-block;
  width: 0.55em;
  height: 1em;
  background: var(--accent);
  transform: translateY(0.15em);
  animation: blink 1.05s steps(2) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.output {
  margin: 0.4rem 0 1.2rem;
}

.big {
  font-size: 2.1rem;
  line-height: 1.15;
  color: var(--accent);
  text-shadow: 0 0 12px rgba(51, 255, 119, 0.45);
}

.amber {
  color: var(--accent-2);
  text-shadow: 0 0 6px rgba(255, 176, 0, 0.3);
}

.dim {
  color: var(--text-muted);
}

.strong {
  color: var(--text);
}

.file-line {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
}

.file {
  color: var(--accent-2);
  text-decoration: none;
}

.file:hover {
  text-decoration: underline;
  color: var(--accent-hover);
}

.log-entry + .log-entry {
  margin-top: 0.8rem;
}

.log-entry .dim {
  white-space: pre-line;
}

/* L'espace entre [période] et l'intitulé (le template Vue le compacte) */
.log-entry .strong {
  margin-left: 0.45rem;
}

.skill-group + .skill-group {
  margin-top: 0.8rem;
}

.skill-line {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 0.8rem;
  max-width: 460px;
}

/* Icônes façon glyphes Nerd Font, teintées phosphore */
.skill-name {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.skill-name .tech-icon {
  font-size: 0.85em;
  opacity: 0.9;
}

.gauge {
  letter-spacing: 0.04em;
}

@media (max-width: 560px) {
  .screen {
    padding: 1.2rem 1rem 1.6rem;
    font-size: 1.05rem;
  }

  .skill-line {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .skill-line .amber {
    display: none;
  }
}
</style>
