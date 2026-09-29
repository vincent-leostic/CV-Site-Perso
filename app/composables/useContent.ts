import { CONTENT } from "~/data/content";
import type { Locale } from "~/data/types";

/** Contenu et textes d'interface de la langue affichée */
export function useContent() {
  const { locale } = useI18n();
  const content = computed(() => CONTENT[locale.value as Locale]);
  return {
    cv: computed(() => content.value.cv),
    ui: computed(() => content.value.ui),
  };
}
