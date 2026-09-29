// Génère le CV en PDF dans chaque langue à partir des pages /cv et /en/cv du
// site statique, avec Chrome en mode headless. Lancé après `nuxt generate`
// (script `generate`) : les PDF suivent donc toujours app/data (fr.ts,
// en.ts). Les pages /cv ne sont que des gabarits d'impression : elles sont
// retirées du site une fois les PDF imprimés.
import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { ROOT, renderPage } from "./chrome.mjs";

// Mêmes noms que CV_PDF_FILES (app/utils/cvPdf.ts), vérifiés par les tests
const PDFS = [
  { route: "/cv/", file: "cv-vincent-leostic.pdf" },
  { route: "/en/cv/", file: "cv-vincent-leostic-en.pdf" },
];
// Poids annoncé à côté des liens (CV_PDF_KB, app/utils/cvPdf.ts)
const ANNOUNCED_KB = 275;

for (const { route, file } of PDFS) {
  const output = join(ROOT, file);
  await renderPage("cv-pdf", route, ["--no-pdf-header-footer", `--print-to-pdf=${output}`]);

  const { size } = await stat(output);
  const kb = Math.round(size / 1024);
  console.log(`cv-pdf : ${file} généré (${kb} Ko)`);
  // Chrome écrit chaque page en clair (« /Type /Page »), l'arbre en « /Pages »
  const pages = (await readFile(output, "latin1")).match(/\/Type\s*\/Page(?!s)/g)?.length ?? 0;
  if (pages !== 1) {
    console.warn(`cv-pdf : ${file} fait ${pages} pages au lieu d'une, voir l'aperçu ${route}`);
  }
  if (Math.abs(kb - ANNOUNCED_KB) / ANNOUNCED_KB > 0.15) {
    console.warn(
      `cv-pdf : le poids annoncé (${ANNOUNCED_KB} Ko) est à mettre à jour dans cvPdf.ts et ce script`,
    );
  }
}
