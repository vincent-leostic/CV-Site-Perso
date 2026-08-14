<script setup lang="ts">
import type { Theme } from "~/composables/useTheme";

const { currentTheme, themes, switchTheme } = useTheme();

const labels: Record<Theme, string> = {
  serieux: "Pro",
  gaming: "Gaming",
  nature: "Nature",
  manuscrit: "Manuscrit",
  terminal: "Terminal",
};

const activeIndex = computed(() => themes.indexOf(currentTheme.value));

function onSelect(theme: Theme, event: MouseEvent) {
  // La révélation circulaire part du centre du bouton cliqué
  const button = event.currentTarget as HTMLElement;
  const rect = button.getBoundingClientRect();
  switchTheme(theme, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
}
</script>

<template>
  <div class="switcher-wrap">
    <span class="switcher-label">Thèmes :</span>
    <div class="switcher" role="group" aria-label="Choix du thème">
      <span
        class="indicator"
        :style="{ transform: `translateX(${activeIndex * 100}%)` }"
        aria-hidden="true"
      />
      <button
        v-for="theme in themes"
        :key="theme"
        type="button"
        class="option"
        :class="{ active: currentTheme === theme }"
        :aria-pressed="currentTheme === theme"
        :title="labels[theme]"
        @click="onSelect(theme, $event)"
      >
        <!-- Icônes : Lucide (licence ISC) -->
        <svg
          v-if="theme === 'serieux'"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect width="20" height="14" x="2" y="6" rx="2" />
          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
        <svg
          v-else-if="theme === 'gaming'"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="6" x2="10" y1="11" y2="11" />
          <line x1="8" x2="8" y1="9" y2="13" />
          <line x1="15" x2="15.01" y1="12" y2="12" />
          <line x1="18" x2="18.01" y1="10" y2="10" />
          <path
            d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"
          />
        </svg>
        <svg
          v-else-if="theme === 'nature'"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
          />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
        <svg
          v-else-if="theme === 'manuscrit'"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M19 17V5a2 2 0 0 0-2-2H4" />
          <path
            d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2h3"
          />
        </svg>
        <svg
          v-else
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" x2="20" y1="19" y2="19" />
        </svg>
        <span class="option-label">{{ labels[theme] }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.switcher-wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.switcher-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  white-space: nowrap;
}

.switcher {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 3px;
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  background: var(--bg);
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

.indicator {
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 3px;
  width: calc((100% - 6px) / 5);
  border-radius: calc(var(--radius-pill) - 2px);
  background: var(--bg-card);
  border: 1px solid color-mix(in srgb, var(--accent) 40%, var(--border));
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.3s,
    border-color 0.3s;
}

.option {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.32rem 0.7rem;
  border: 0;
  background: none;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  border-radius: var(--radius-pill);
  transition: color 0.2s;
}

.option:hover {
  color: var(--text);
}

.option.active {
  color: var(--accent);
}

.option svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

@media (max-width: 680px) {
  .switcher-label {
    display: none;
  }

  .option-label {
    display: none;
  }

  .option {
    padding: 0.4rem 0.6rem;
  }
}
</style>
