/** Nom du CV en PDF, généré au build par scripts/cv-pdf.mjs à partir de la page /cv */
export const CV_PDF_FILE = "cv-vincent-leostic.pdf";

/**
 * Format et poids affichés à côté des liens de téléchargement. Le script de
 * génération prévient si le poids réel s'en écarte trop.
 */
export const CV_PDF_META = "PDF, environ 290 Ko";

/**
 * Lien « Télécharger mon CV ». Le PDF n'existe qu'après `vp run generate` :
 * en développement, on renvoie vers la page /cv qui en est la source.
 */
export const CV_PDF_HREF = import.meta.dev ? "/cv" : `/${CV_PDF_FILE}`;

/**
 * Attribut download du même lien. Absent en développement : il ferait
 * enregistrer la page /cv en .htm au lieu de l'ouvrir.
 */
export const CV_PDF_DOWNLOAD = import.meta.dev ? undefined : CV_PDF_FILE;
