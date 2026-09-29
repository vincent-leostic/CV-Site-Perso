import type { Locale } from "~/data/types";

/**
 * Lien « Télécharger mon CV » dans la langue affichée. Les PDF n'existent
 * qu'après `vp run generate` : en développement, le lien ouvre l'aperçu /cv
 * de la langue, sans attribut download (il enregistrerait la page en .htm).
 */
export function useCvPdf() {
  const { locale } = useI18n();
  const localePath = useLocalePath();
  const { ui } = useContent();
  return computed(() => {
    const file = CV_PDF_FILES[locale.value as Locale];
    return {
      href: import.meta.dev ? localePath("/cv") : `/${file}`,
      download: import.meta.dev ? undefined : file,
      meta: ui.value.pdfMeta(CV_PDF_KB),
    };
  });
}
