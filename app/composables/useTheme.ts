import {
  DEFAULT_THEME,
  THEMES,
  THEME_PENDING_CLASS,
  THEME_STORAGE_KEY,
  isTheme,
  type Theme,
} from "#shared/theme";

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function useTheme() {
  const currentTheme = useState<Theme>("theme", () => DEFAULT_THEME);

  /** Change de thème et le sauvegarde pour les prochaines visites */
  function setTheme(theme: Theme) {
    currentTheme.value = theme;
    applyTheme(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* stockage bloqué : le choix vaut pour la visite en cours */
    }
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
    // Calcule les styles avant de retirer la classe : l'indicateur du
    // sélecteur se pose sur le bon thème sans glisser depuis « Pro »
    void root.offsetWidth;
    root.classList.remove(THEME_PENDING_CLASS);

    // L'impression suit la mise en page papier de Sérieux quel que soit le
    // thème affiché : bascule le temps de l'impression, sans sauvegarder.
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

  return {
    currentTheme: readonly(currentTheme),
    themes: THEMES,
    initTheme,
    setTheme,
    switchTheme,
  };
}
