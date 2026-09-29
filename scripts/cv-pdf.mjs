// Génère le CV en PDF à partir de la page /cv du site statique, avec Chrome
// en mode headless. Lancé après `nuxt generate` (script `generate`) : le PDF
// suit donc toujours le contenu de app/data/cv.ts. La page /cv n'est qu'un
// gabarit d'impression : elle est retirée du site une fois le PDF imprimé.
import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { ROOT, renderPage } from "./chrome.mjs";

// Même nom que CV_PDF_FILE (app/utils/cvPdf.ts), vérifié par les tests
const PDF_FILE = "cv-vincent-leostic.pdf";
// Poids annoncé à côté des liens (CV_PDF_META, app/utils/cvPdf.ts)
const ANNOUNCED_KB = 290;
const OUTPUT = join(ROOT, PDF_FILE);

await renderPage("cv-pdf", "/cv", ["--no-pdf-header-footer", `--print-to-pdf=${OUTPUT}`]);

const { size } = await stat(OUTPUT);
const kb = Math.round(size / 1024);
console.log(`cv-pdf : ${PDF_FILE} généré (${kb} Ko)`);
// Chrome écrit chaque page en clair (« /Type /Page »), l'arbre en « /Pages »
const pages = (await readFile(OUTPUT, "latin1")).match(/\/Type\s*\/Page(?!s)/g)?.length ?? 0;
if (pages !== 1) {
  console.warn(`cv-pdf : le CV fait ${pages} pages au lieu d'une, voir l'aperçu /cv`);
}
if (Math.abs(kb - ANNOUNCED_KB) / ANNOUNCED_KB > 0.15) {
  console.warn(
    `cv-pdf : le poids annoncé (${ANNOUNCED_KB} Ko) est à mettre à jour dans cvPdf.ts et ce script`,
  );
}
