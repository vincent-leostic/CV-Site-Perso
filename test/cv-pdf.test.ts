import { readFileSync } from "node:fs";
import { expect, test } from "vite-plus/test";
import { CV_PDF_FILE } from "../app/utils/cvPdf";

// Les liens « Télécharger mon CV » pointent vers CV_PDF_FILE : le script de
// génération doit produire exactement ce fichier.
test("le script de génération produit le PDF visé par les liens", () => {
  expect(readFileSync("scripts/cv-pdf.mjs", "utf8")).toContain(`const PDF_FILE = "${CV_PDF_FILE}"`);
});
