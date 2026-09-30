// Outils communs aux scripts lancés après `nuxt generate` (cv-pdf.mjs,
// og-image.mjs, favicon.mjs) : un serveur statique sur .output/public et Chrome en mode
// headless, sans fenêtre, avec un profil temporaire.
//
// Chrome est cherché dans CHROME_PATH, puis aux emplacements habituels
// (Windows, macOS, Linux ; les runners GitHub Actions l'ont préinstallé).
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { extname, join, resolve } from "node:path";

export const ROOT = resolve(".output/public");

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".woff2": "font/woff2",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    process.env.LOCALAPPDATA &&
      join(process.env.LOCALAPPDATA, "Google/Chrome/Application/chrome.exe"),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ];
  return candidates.find((path) => path && existsSync(path));
}

/** Premier fichier existant pour une URL : /cv → cv/index.html ou cv.html */
async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]).replace(/\/$/, "");
  for (const candidate of [clean, `${clean}/index.html`, `${clean}.html`]) {
    const file = join(ROOT, candidate);
    if (!file.startsWith(ROOT)) return null;
    try {
      if ((await stat(file)).isFile()) return file;
    } catch {
      /* candidat suivant */
    }
  }
  return null;
}

/** Serveur statique minimal sur .output/public, sur un port libre */
function serve() {
  const server = createServer(async (request, response) => {
    const file = await resolveFile(request.url ?? "/");
    if (!file) {
      response.writeHead(404).end();
      return;
    }
    const type = CONTENT_TYPES[extname(file)] ?? "application/octet-stream";
    response.writeHead(200, { "Content-Type": type }).end(await readFile(file));
  });
  return new Promise((resolvePort) => {
    server.listen(0, "127.0.0.1", () => resolvePort({ server, port: server.address().port }));
  });
}

function run(command, args) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(command, args, { stdio: "ignore" });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 ? resolveRun() : reject(new Error(`Chrome s'est arrêté (code ${code})`)),
    );
  });
}

/**
 * Ouvre une page du site généré dans Chrome headless avec les options
 * propres à la sortie voulue (impression PDF, capture), puis retire cette
 * page du site : elle ne sert que de gabarit. `name` préfixe les messages.
 */
export async function renderPage(name, route, outputArgs) {
  const chrome = findChrome();
  if (!chrome) {
    console.error(`${name} : Chrome introuvable. Indiquez son chemin dans CHROME_PATH.`);
    process.exit(1);
  }
  if (!existsSync(join(ROOT, "index.html"))) {
    console.error(`${name} : lancer d'abord \`nuxt generate\` (.output/public absent).`);
    process.exit(1);
  }

  const { server, port } = await serve();
  const profile = await mkdtemp(join(tmpdir(), `${name}-`));
  try {
    await run(chrome, [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      // Laisse le temps aux polices et à l'hydratation
      "--virtual-time-budget=8000",
      `--user-data-dir=${profile}`,
      // Les runners Linux de la CI n'offrent pas le bac à sable de Chrome
      ...(process.env.CI ? ["--no-sandbox"] : []),
      ...outputArgs,
      `http://127.0.0.1:${port}${route}`,
    ]);
  } finally {
    server.close();
    await rm(profile, { recursive: true, force: true });
  }
  const page = route.replace(/^\/|\/$/g, "");
  await rm(join(ROOT, page), { recursive: true, force: true });
  await rm(join(ROOT, `${page}.html`), { force: true });
}
