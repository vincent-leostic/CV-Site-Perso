import type { Locale } from "~/data/types";

/**
 * CV en PDF de chaque langue, générés au build par scripts/cv-pdf.mjs à
 * partir des pages /cv et /en/cv. Noms vérifiés par les tests.
 */
export const CV_PDF_FILES: Record<Locale, string> = {
  fr: "cv-vincent-leostic.pdf",
  en: "cv-vincent-leostic-en.pdf",
};

/**
 * Poids annoncé à côté des liens de téléchargement, en Ko. Le script de
 * génération prévient si le poids réel s'en écarte trop.
 */
export const CV_PDF_KB = 275;

/** Miniature de partage de chaque langue, capturée par scripts/og-image.mjs */
export const OG_IMAGE_FILES: Record<Locale, string> = {
  fr: "og-image.png",
  en: "og-image-en.png",
};
