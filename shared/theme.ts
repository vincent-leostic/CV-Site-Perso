/**
 * Source unique des thèmes : partagée par le composable useTheme (app) et
 * le script inline injecté dans le <head> (nuxt.config).
 *
 * Le CV s'ouvre toujours en version Pro ; les autres thèmes sont des
 * variantes ludiques, proposées en pied de page et portées par `?theme=`
 * dans l'URL (lien partageable, conservé au rechargement).
 */
export const THEMES = ["serieux", "gaming", "nature", "manuscrit", "terminal"] as const;

export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "serieux";

/** Nom affiché de chaque version */
export const THEME_LABELS: Record<Theme, string> = {
  serieux: "Pro",
  gaming: "Gaming",
  nature: "Nature",
  manuscrit: "Manuscrit",
  terminal: "Terminal",
};

/**
 * Classe posée sur <html> tant que le layout du thème résolu n'est pas monté :
 * le HTML pré-rendu contient toujours le layout Sérieux.
 */
export const THEME_PENDING_CLASS = "theme-pending";

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

/** Adresse d'une version du CV, ex. "/?theme=gaming" ; la version Pro est "/" */
export function themeHref(theme: Theme): string {
  return theme === DEFAULT_THEME ? "/" : `/?theme=${theme}`;
}

/**
 * Exécuté avant le premier rendu : `?theme=` dans l'URL, sinon la version
 * Pro. Le résultat est posé en `data-theme` sur <html>, que useTheme relit
 * ensuite. Hors version Pro, la page reste masquée jusqu'au montage du bon
 * layout, avec un filet de 4 s si le JS de l'app ne se charge pas.
 */
export const themeInitScript = `(function(){var d=document.documentElement,T=${JSON.stringify(THEMES)},D=${JSON.stringify(DEFAULT_THEME)},P=${JSON.stringify(THEME_PENDING_CLASS)},t=new URLSearchParams(location.search).get("theme");if(T.indexOf(t)<0)t=D;d.setAttribute("data-theme",t);if(t!==D){d.classList.add(P);setTimeout(function(){d.classList.remove(P)},4000)}})()`;
