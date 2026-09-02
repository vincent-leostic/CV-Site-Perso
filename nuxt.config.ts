// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      htmlAttrs: { lang: "fr" },
      title: "Vincent LEOSTIC — Développeur logiciel front, UI/UX et outillage IA",
      meta: [
        {
          name: "description",
          content:
            "CV de Vincent LEOSTIC, développeur logiciel à Brest. Spécialisé front et UI/UX (Vue, Nuxt, TypeScript) et outillage de développement assisté par IA.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IM+Fell+English:ital@0;1&family=Inter:wght@400;500;600;700;800&family=Nunito+Sans:wght@400;600;700;800&family=VT323&display=swap",
        },
      ],
      script: [
        {
          // Applique le thème avant le premier rendu pour éviter un flash
          // du thème par défaut (même logique que useTheme.initTheme :
          // ?theme= dans l'URL prime, puis le choix sauvegardé).
          innerHTML: `(function(){var d=document.documentElement;try{var q=new URLSearchParams(location.search).get('theme');var t=q||localStorage.getItem('cv-theme');if(['serieux','gaming','nature','manuscrit','terminal'].indexOf(t)<0){t='serieux'}d.setAttribute('data-theme',t)}catch(e){d.setAttribute('data-theme','serieux')}})()`,
        },
      ],
    },
  },
});
