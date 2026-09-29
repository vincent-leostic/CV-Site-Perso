/**
 * Source unique des thèmes : partagée par le composable useTheme (app) et
 * le script inline injecté dans le <head> (nuxt.config).
 */
export const THEMES = ["serieux", "gaming", "nature", "manuscrit", "terminal"] as const;

export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "serieux";

/** Clé localStorage du thème choisi */
export const THEME_STORAGE_KEY = "cv-theme";

/**
 * Classe posée sur <html> tant que le layout du thème résolu n'est pas monté :
 * le HTML pré-rendu contient toujours le layout Sérieux.
 */
export const THEME_PENDING_CLASS = "theme-pending";

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

/**
 * Exécuté avant le premier rendu : `?theme=` dans l'URL prime (lien
 * partageable), puis le choix sauvegardé, puis le thème par défaut. Le
 * résultat est posé en `data-theme` sur <html>, que useTheme relit ensuite.
 * Hors thème par défaut, la page reste masquée jusqu'au montage du bon
 * layout, avec un filet de 4 s si le JS de l'app ne se charge pas.
 */
export const themeInitScript = `(function(){var d=document.documentElement,T=${JSON.stringify(THEMES)},D=${JSON.stringify(DEFAULT_THEME)},P=${JSON.stringify(THEME_PENDING_CLASS)},t=new URLSearchParams(location.search).get("theme");if(T.indexOf(t)<0){try{t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})}catch(e){}}if(T.indexOf(t)<0)t=D;d.setAttribute("data-theme",t);if(t!==D){d.classList.add(P);setTimeout(function(){d.classList.remove(P)},4000)}})()`;
