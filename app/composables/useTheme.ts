import { DEFAULT_THEME, THEMES, THEME_PENDING_CLASS, isTheme, type Theme } from "#shared/theme";

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

/** Reflète le thème dans l'URL : un rechargement ou un lien copié le conserve */
function syncUrl(theme: Theme) {
  const url = new URL(window.location.href);
  if (theme === DEFAULT_THEME) url.searchParams.delete("theme");
  else url.searchParams.set("theme", theme);
  // history.state conservé : vue-router y range sa position de défilement
  window.history.replaceState(window.history.state, "", url);
}

export function useTheme() {
  const currentTheme = useState<Theme>("theme", () => DEFAULT_THEME);

  /** Nouveau layout affiché depuis son début */
  function setTheme(theme: Theme) {
    currentTheme.value = theme;
    applyTheme(theme);
    syncUrl(theme);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  /**
   * À appeler une fois côté client, au montage de l'app. Le script inline
   * (shared/theme) a déjà résolu le thème avant le premier rendu : on le lit
   * sur <html> plutôt que dans l'URL, que vue-router réécrit pendant
   * l'hydratation. On démasque ensuite la page, le bon layout étant monté.
   */
  async function initTheme() {
    const root = document.documentElement;
    const resolved = root.getAttribute("data-theme");
    if (isTheme(resolved)) currentTheme.value = resolved;
    await nextTick();
    root.classList.remove(THEME_PENDING_CLASS);

    // L'impression suit la mise en page papier de Sérieux quel que soit le
    // thème affiché : bascule le temps de l'impression, sans toucher à l'URL.
    let themeBeforePrint: Theme | null = null;
    window.addEventListener("beforeprint", () => {
      if (currentTheme.value === DEFAULT_THEME) return;
      themeBeforePrint = currentTheme.value;
      currentTheme.value = DEFAULT_THEME;
      applyTheme(DEFAULT_THEME);
    });
    window.addEventListener("afterprint", () => {
      if (!themeBeforePrint) return;
      currentTheme.value = themeBeforePrint;
      applyTheme(themeBeforePrint);
      themeBeforePrint = null;
    });
  }

  /**
   * Change de thème avec une révélation circulaire partant de `origin`
   * (View Transitions API). Bascule instantanée si le navigateur ne le
   * supporte pas ou si l'utilisateur préfère réduire les animations.
   */
  function switchTheme(theme: Theme, origin?: { x: number; y: number }) {
    if (theme === currentTheme.value) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("startViewTransition" in document) || reduceMotion) {
      setTheme(theme);
      return;
    }

    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? 0;
    // On attend le re-rendu de Vue : le nouveau layout doit être dans le
    // DOM avant que la snapshot "new" ne soit capturée.
    const transition = document.startViewTransition(async () => {
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

  /**
   * Clic sur un lien de thème (href = themeHref) : bascule animée depuis le
   * lien. Un clic modifié (nouvel onglet, etc.) garde le comportement natif.
   */
  function followThemeLink(theme: Theme, event: MouseEvent) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    switchTheme(theme, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  }

  return {
    currentTheme: readonly(currentTheme),
    themes: THEMES,
    initTheme,
    switchTheme,
    followThemeLink,
  };
}
