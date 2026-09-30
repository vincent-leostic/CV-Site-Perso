import { COMMON } from "~/data/common";

/**
 * Adresse complète de l'accueil dans la langue affichée, ex.
 * "https://vincent.leostic.bzh/en/" : pas de détection de langue en ligne,
 * le PDF et la miniature anglais doivent donc mener à /en/.
 */
export function useHomeUrl() {
  const localePath = useLocalePath();
  return computed(() => `${COMMON.website}${localePath("/")}`);
}
