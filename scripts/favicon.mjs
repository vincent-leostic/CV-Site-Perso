// Tire du favicon SVG (public/favicon.svg) les icônes des navigateurs et
// appareils qui ne lisent pas le SVG, avec Chrome en mode headless :
// favicon.ico (32 px, anciens navigateurs et outils qui le demandent à la
// racine) et apple-touch-icon.png (180 px, écran d'accueil iOS). Lancé après
// `nuxt generate` (script `generate`) : les icônes suivent toujours le SVG.
import { readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ROOT, renderPage } from "./chrome.mjs";

// Gabarit temporaire où l'icône remplit la fenêtre, retiré par renderPage
const TEMPLATE = "favicon-template";
const svg = await readFile(join(ROOT, "favicon.svg"), "utf8");

/** Capture l'icône en PNG de `size` px de côté et renvoie le fichier lu */
async function capture(file, size, { square = false } = {}) {
  // Taille en px, pas en vw : Chrome headless élargit la fenêtre à 500 px
  // au moins, la capture n'en garde que le coin haut gauche. iOS arrondit
  // lui-même les coins : l'icône d'écran d'accueil reste carrée.
  const corners = square ? "rect { rx: 0; }" : "";
  await writeFile(
    join(ROOT, `${TEMPLATE}.html`),
    `<!doctype html><style>body { margin: 0; } svg { display: block; width: ${size}px; height: ${size}px; } ${corners}</style>${svg}`,
  );
  const output = join(ROOT, file);
  await renderPage("favicon", `/${TEMPLATE}`, [
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    // Coins arrondis transparents plutôt que blancs
    "--default-background-color=00000000",
    `--window-size=${size},${size}`,
    `--screenshot=${output}`,
  ]);

  const png = await readFile(output);
  // Dimensions lues dans l'en-tête PNG (bloc IHDR, octets 16 à 23)
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  // Bloquant : le build échoue plutôt que de publier une icône déformée
  if (width !== size || height !== size) {
    console.error(`favicon : ${file} fait ${width} × ${height} au lieu de ${size} × ${size}`);
    process.exitCode = 1;
  }
  return png;
}

await capture("apple-touch-icon.png", 180, { square: true });
console.log("favicon : apple-touch-icon.png généré (180 × 180)");

// Un ICO peut contenir un PNG tel quel : en-tête de 6 octets, une entrée de
// répertoire de 16 octets, puis l'image
const ICO_SIZE = 32;
const png = await capture("favicon-32.png", ICO_SIZE);
await rm(join(ROOT, "favicon-32.png"));
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2); // type : icône
header.writeUInt16LE(1, 4); // nombre d'images
header.writeUInt8(ICO_SIZE, 6); // largeur
header.writeUInt8(ICO_SIZE, 7); // hauteur
header.writeUInt16LE(1, 10); // plans de couleur
header.writeUInt16LE(32, 12); // bits par pixel
header.writeUInt32LE(png.length, 14); // poids de l'image
header.writeUInt32LE(header.length, 18); // position de l'image
await writeFile(join(ROOT, "favicon.ico"), Buffer.concat([header, png]));
console.log(`favicon : favicon.ico généré (${ICO_SIZE} × ${ICO_SIZE})`);
