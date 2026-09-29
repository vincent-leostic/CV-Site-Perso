import * as en from "./en";
import * as fr from "./fr";
import type { CvData, Locale, UiText } from "./types";

/**
 * Contenu et textes d'interface par langue : fr.ts et en.ts sont les seuls
 * fichiers à modifier pour mettre à jour le portfolio et le CV.
 */
export const CONTENT: Record<Locale, { cv: CvData; ui: UiText }> = { fr, en };

export const LOCALES = Object.keys(CONTENT) as Locale[];
