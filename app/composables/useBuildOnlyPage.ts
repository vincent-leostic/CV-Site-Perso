/**
 * Page réservée au build (gabarit du PDF, miniature de partage) : pré-rendue
 * pour être imprimée ou capturée, puis retirée du site publié. En ligne, la
 * page 404 de secours démarre l'appli sur son adresse ; sans rendu serveur,
 * on répond donc 404 au lieu d'afficher le gabarit.
 */
export function useBuildOnlyPage(title: string) {
  useSeoMeta({ title, robots: "noindex, nofollow" });
  if (import.meta.client && !useNuxtApp().payload.serverRendered) {
    throw createError({ statusCode: 404, statusMessage: "Page introuvable", fatal: true });
  }
}
