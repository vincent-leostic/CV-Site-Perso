export type Theme = "serieux" | "gaming" | "nature" | "manuscrit" | "terminal";

const THEMES: Theme[] = ["serieux", "gaming", "nature", "manuscrit", "terminal"];
const STORAGE_KEY = "cv-theme";

const currentTheme = ref<Theme>("serieux");

function isTheme(value: string | null): value is Theme {
  return value !== null && (THEMES as string[]).includes(value);
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => { ready: Promise<void> };
};

export function useTheme() {
  /**
   * À appeler une fois côté client : `?theme=` dans l'URL prime (lien
   * partageable), sinon le choix sauvegardé, sinon le thème par défaut.
   */
  function initTheme() {
    const fromQuery = new URLSearchParams(window.location.search).get("theme");
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isTheme(fromQuery)) {
      currentTheme.value = fromQuery;
    } else if (isTheme(saved)) {
      currentTheme.value = saved;
    }
    applyTheme(currentTheme.value);
  }

  function setTheme(theme: Theme) {
    currentTheme.value = theme;
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  /**
   * Change de thème avec une révélation circulaire partant de `origin`
   * (View Transitions API). Bascule instantanée si le navigateur ne le
   * supporte pas ou si l'utilisateur préfère réduire les animations.
   */
  function switchTheme(theme: Theme, origin?: { x: number; y: number }) {
    if (theme === currentTheme.value) return;

    const doc = document as DocumentWithViewTransition;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduceMotion) {
      setTheme(theme);
      return;
    }

    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? 0;
    // On attend le re-rendu de Vue : le nouveau layout doit être dans le
    // DOM avant que la snapshot "new" ne soit capturée.
    const transition = doc.startViewTransition(async () => {
      setTheme(theme);
      await nextTick();
    });
    transition.ready
      .then(() => {
        const radius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y),
        );
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 650,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {
        /* la transition a été interrompue : le thème est déjà appliqué */
      });
  }

  return {
    currentTheme: readonly(currentTheme),
    themes: THEMES,
    initTheme,
    setTheme,
    switchTheme,
  };
}
