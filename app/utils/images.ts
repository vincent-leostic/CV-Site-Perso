/**
 * Largeurs de chaque capture de projet (public/projects) : l'original fait
 * 1280 px, ses versions réduites portent la largeur en suffixe
 * (ramonea-640.webp). Voir le README pour les générer.
 */
export const PROJECT_IMAGE_WIDTHS = [640, 960, 1280] as const;

/** Adresse d'une version réduite, ex. "/projects/ramonea.webp", 640 → "/projects/ramonea-640.webp" */
export function projectImageAt(image: string, width: number): string {
  return width === 1280 ? image : image.replace(/\.webp$/, `-${width}.webp`);
}

/** srcset d'une capture de projet : le navigateur prend la plus petite suffisante */
export function projectSrcset(image: string): string {
  return PROJECT_IMAGE_WIDTHS.map((width) => `${projectImageAt(image, width)} ${width}w`).join(
    ", ",
  );
}
