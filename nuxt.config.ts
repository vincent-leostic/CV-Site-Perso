// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  modules: ["@nuxt/fonts", "@nuxtjs/i18n"],
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
  // Français sur /, anglais sur /en/, sans redirection automatique : un
  // lien envoyé s'ouvre toujours dans sa langue. Contenu et textes
  // d'interface dans app/data (fr.ts, en.ts) : le module sert aux adresses
  // par langue et aux balises hreflang.
  i18n: {
    baseUrl: "https://vincent.leostic.bzh",
    defaultLocale: "fr",
    strategy: "prefix_except_default",
    // /en/ plutôt que /en : le serveur redirigerait /en vers /en/
    trailingSlash: true,
    detectBrowserLanguage: false,
    locales: [
      { code: "fr", language: "fr-FR", name: "Français" },
      { code: "en", language: "en-GB", name: "English" },
    ],
  },
  // Gabarits du PDF (/cv) et de la miniature de partage (/og), dans chaque
  // langue : pré-rendus pour que scripts/cv-pdf.mjs et scripts/og-image.mjs
  // les impriment ou les capturent, puis retirés du site publié
  nitro: {
    prerender: { routes: ["/en/", "/cv/", "/og/", "/en/cv/", "/en/og/"] },
  },
});
