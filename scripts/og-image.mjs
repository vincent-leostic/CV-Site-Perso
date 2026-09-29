// Capture la miniature de partage (1200 × 630, og-image.png) à partir de la
// page /og du site statique, avec Chrome en mode headless. Lancé après
// `nuxt generate` (script `generate`) : elle suit toujours les couleurs et
// le titre du site. La page /og est retirée du site une fois capturée.
import { open } from "node:fs/promises";
import { join } from "node:path";
import { ROOT, renderPage } from "./chrome.mjs";

const WIDTH = 1200;
const HEIGHT = 630;
const OUTPUT = join(ROOT, "og-image.png");

await renderPage("og-image", "/og", [
  "--hide-scrollbars",
  "--force-device-scale-factor=1",
  `--window-size=${WIDTH},${HEIGHT}`,
  `--screenshot=${OUTPUT}`,
]);

// Dimensions lues dans l'en-tête PNG (bloc IHDR, octets 16 à 23)
const file = await open(OUTPUT);
const { buffer } = await file.read({ buffer: Buffer.alloc(24), position: 0 });
await file.close();
const width = buffer.readUInt32BE(16);
const height = buffer.readUInt32BE(20);
console.log(`og-image : og-image.png généré (${width} × ${height})`);
if (width !== WIDTH || height !== HEIGHT) {
  console.warn(`og-image : ${WIDTH} × ${HEIGHT} attendu pour les réseaux sociaux`);
}
