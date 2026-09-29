import { themeInitScript } from "./shared/theme";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  modules: ["@nuxt/fonts"],
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      // Année du build, gravée dans le colophon du thème Manuscrit
      buildYear: new Date().getFullYear(),
    },
  },
  // Polices auto-hébergées au build (pas de requête vers Google à la visite) ;
  // chaque thème ne télécharge que les siennes. Seule Inter (thème par
  // défaut) est préchargée.
  fonts: {
    defaults: { subsets: ["latin"], styles: ["normal"], preload: false },
    families: [
      { name: "Inter", weights: [400, 500, 600, 700, 800], preload: true },
      { name: "Chakra Petch", weights: [500, 600, 700] },
      { name: "Nunito Sans", weights: [400, 600, 700, 800] },
      {
        name: "Fraunces",
        weights: [500, 600, 700],
        providerOptions: { google: { experimental: { variableAxis: { opsz: [["9", "144"]] } } } },
      },
      { name: "EB Garamond", weights: [400, 500, 600, 700], styles: ["normal", "italic"] },
      { name: "IM Fell English", weights: [400], styles: ["normal", "italic"] },
      { name: "VT323", weights: [400] },
    ],
  },
  app: {
    head: {
      htmlAttrs: { lang: "fr" },
      // Applique le thème avant le premier rendu (voir shared/theme.ts)
      script: [{ innerHTML: themeInitScript }],
    },
  },
});
