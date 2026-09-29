import { readFileSync } from "node:fs";
import { expect, test } from "vite-plus/test";
import { CV_PDF_FILES, CV_PDF_KB, OG_IMAGE_FILES } from "../app/utils/cvPdf";

// Les liens « Télécharger mon CV » et les balises og:image visent ces
// fichiers : les scripts de génération doivent produire exactement ceux-là.
test("le script du PDF produit les fichiers visés par les liens", () => {
  const script = readFileSync("scripts/cv-pdf.mjs", "utf8");
  for (const file of Object.values(CV_PDF_FILES)) {
    expect(script).toContain(`file: "${file}"`);
  }
  expect(script).toContain(`const ANNOUNCED_KB = ${CV_PDF_KB};`);
});

test("le script de la miniature produit les images déclarées", () => {
  const script = readFileSync("scripts/og-image.mjs", "utf8");
  for (const file of Object.values(OG_IMAGE_FILES)) {
    expect(script).toContain(`file: "${file}"`);
  }
});
