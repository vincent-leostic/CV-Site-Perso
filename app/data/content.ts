import * as en from "./en";
import * as fr from "./fr";
import type { CvData, Locale, SectionId, UiText } from "./types";

/**
 * Contenu et textes d'interface par langue : fr.ts et en.ts sont les seuls
 * fichiers à modifier pour mettre à jour le portfolio et le CV.
 */
export const CONTENT: Record<Locale, { cv: CvData; ui: UiText }> = { fr, en };

export const LOCALES = Object.keys(CONTENT) as Locale[];

/** Sections du portfolio dans l'ordre de la page : menu et mesure d'audience */
export const SECTION_IDS: SectionId[] = [
  "a-propos",
  "projets",
  "competences",
  "parcours",
  "loisirs",
  "contact",
];
