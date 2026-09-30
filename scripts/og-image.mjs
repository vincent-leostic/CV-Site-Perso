// Capture les miniatures de partage (1200 × 630), une par langue, à partir des
// pages /og et /en/og du site statique, avec Chrome en mode headless. Lancé
// après `nuxt generate` (script `generate`) : elles suivent toujours les
// couleurs et le titre du site. Les pages /og sont retirées du site une
// fois capturées.
import { open } from "node:fs/promises";
import { join } from "node:path";
import { ROOT, renderPage } from "./chrome.mjs";

// Mêmes noms que OG_IMAGE_FILES (app/utils/cvPdf.ts), vérifiés par les tests
const IMAGES = [
  { route: "/og/", file: "og-image.png" },
  { route: "/en/og/", file: "og-image-en.png" },
];
const WIDTH = 1200;
const HEIGHT = 630;

for (const { route, file } of IMAGES) {
  const output = join(ROOT, file);
  await renderPage("og-image", route, [
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    `--window-size=${WIDTH},${HEIGHT}`,
    `--screenshot=${output}`,
  ]);

  // Dimensions lues dans l'en-tête PNG (bloc IHDR, octets 16 à 23)
  const handle = await open(output);
  const { buffer } = await handle.read({ buffer: Buffer.alloc(24), position: 0 });
  await handle.close();
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  console.log(`og-image : ${file} généré (${width} × ${height})`);
  // Bloquant : le build échoue plutôt que de publier une miniature mal cadrée
  if (width !== WIDTH || height !== HEIGHT) {
    console.error(`og-image : ${WIDTH} × ${HEIGHT} attendu pour les réseaux sociaux`);
    process.exitCode = 1;
  }
}
