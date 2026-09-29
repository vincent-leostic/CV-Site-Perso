// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  modules: ["@nuxt/fonts"],
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
  css: ["~/assets/css/main.css"],
  // Polices auto-hébergées au build : aucune requête vers Google à la visite.
  // Inter pour le texte, Bricolage Grotesque pour les titres, avec son axe
  // de taille optique (dessin plus expressif en grand).
  fonts: {
    defaults: { subsets: ["latin"], styles: ["normal"] },
    families: [
      { name: "Inter", weights: [400, 500, 600, 700, 800] },
      {
        name: "Bricolage Grotesque",
        weights: [600, 700, 800],
        providerOptions: { google: { experimental: { variableAxis: { opsz: [["12", "96"]] } } } },
      },
    ],
  },
  app: {
    head: {
      htmlAttrs: { lang: "fr" },
    },
  },
  // Gabarits du PDF (/cv) et de la miniature de partage (/og) : pré-rendus
  // pour que scripts/cv-pdf.mjs et scripts/og-image.mjs les impriment ou
  // les capturent, puis retirés du site publié
  nitro: {
    prerender: { routes: ["/cv", "/og"] },
  },
});
