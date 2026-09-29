import { COMMON } from "./common";
import type { CvData, UiText } from "./types";

/**
 * English content of the portfolio and the PDF CV, then interface text.
 * Same structure as fr.ts, checked by the tests. British English.
 * French qualifications are given with their European level (EQF).
 */
export const cv: CvData = {
  ...COMMON,
  title: "Front-end software developer, UI/UX and accessibility",
  bio: "I design and build business applications, from the first requirements to production, with care for every detail of the interface.",
  area: "Plougastel-Daoulas, near Brest, France",
  about: {
    title: "Interfaces that make people say “wow”",
    intro:
      "After ten years in the restaurant trade, I had seen all it had to offer: in 2018, I retrained as a developer.",
    faq: [
      {
        question: "What do I love?",
        answer:
          "Designing polished interfaces that make people say “wow” the moment they land on them. My first ones were a bit garish: I learnt the hard way, and it left me with an eye for the right detail.",
      },
      {
        question: "The project I'm proudest of?",
        answer:
          "A fire safety application that helps firefighters prepare their interventions. Knowing it will help protect people means a lot to me.",
      },
      {
        question: "Outside work?",
        answer:
          "I listen to a lot of music, mostly metal. As for games, I love grand strategy, Europa Universalis above all, and Final Fantasy XIV, my all-time favourite, for which I'm building an app for completionists.",
      },
    ],
    method: [
      { title: "Listen", detail: "To the need, as users experience it." },
      { title: "Understand", detail: "How people work, the constraints and the goals." },
      {
        title: "Design in iterations",
        detail: "A first version of my vision, refined step by step.",
      },
      { title: "Get sign-off", detail: "Each version is approved before going further." },
    ],
    funFact: "My surname, LEOSTIC, comes from the Breton word “eostig”, meaning “nightingale”.",
  },
  milestones: [
    {
      period: "2008 – 2018",
      title: "Restaurant trade",
      detail: "Waiter, then front-of-house manager.",
    },
    {
      period: "2018",
      title: "Career change",
      detail: "Software developer vocational qualification, at AFPA.",
    },
    {
      period: "Since 2019",
      title: "Software developer",
      detail:
        "At iD3i, an IT services company in Brest: varied projects, specialising in front-end and UI/UX.",
    },
    {
      period: "In progress",
      title: "Expert in software development",
      detail: "Master's-level qualification (EQF 7), through recognition of prior experience.",
      status: "current",
      url: "https://www.francecompetences.fr/recherche/rncp/41330",
    },
    {
      period: "Tomorrow",
      title: "With you?",
      detail: "A full-time role in your team: let's talk.",
      status: "future",
      url: "#contact",
    },
  ],
  interests: {
    intro:
      "A common thread: in Final Fantasy XIV as around a role-playing table, I play the tank. Moving forward as a team while holding an essential role matters to me.",
    featured: {
      caption: "All-time favourite",
      title: "Final Fantasy XIV",
      text: "Paladin tank since the 2013 relaunch. I love its story and characters, so much that I'm building an app for its completionists.",
    },
    nowPlaying: { caption: "Now playing", title: "Royal Sorrow" },
    tiles: [
      {
        title: "Music",
        text: "Mostly metal, and a lot of video game soundtracks.",
        lists: [
          { items: ["Electric Callboy", "Sabaton", "Ghost", "Rammstein", "Motörhead"] },
          { label: "Game soundtracks", items: ["Clair Obscur: Expedition 33", "NieR"] },
          { label: "Festivals", items: ["Hellfest", "Motocultor"] },
        ],
      },
      {
        title: "Video games",
        text: "History has always fascinated me, and I love games driven by their story.",
        lists: [
          {
            label: "Strategy",
            items: ["Europa Universalis", "Total War", "Anno", "Ixion", "Frostpunk 1 & 2"],
          },
          { label: "Stories", items: ["Tunic", "Outer Wilds", "Baldur's Gate 3"] },
        ],
      },
      {
        title: "Around a table",
        text: "Chess, quick little games, never-ending games of Risk… and role-playing, which I'd love to play more often.",
      },
    ],
  },
  phone: "+33 6 13 39 80 06",
  experiences: [
    {
      role: "Software developer",
      company: "iD3i, IT services company in Brest",
      period: "2019 – present",
      description:
        "Varied projects across sectors, and rarely the same hat: developer, project manager, technical or functional lead as needed. My speciality remains front-end and UI/UX.\nAI is part of my everyday toolkit, guided by detailed specifications.",
      missions: [
        {
          title: "Sports club membership management",
          description:
            "Application that centralises the life of a sports club: member records and registrations.",
          badges: ["po", "projectManager", "developer"],
        },
        {
          title: "Restaurant planning",
          description:
            "Tool for managing orders, rotas and everything else that comes with running a restaurant. A trade I know from the inside.",
          badges: ["developer"],
        },
        {
          title: "Fire safety",
          description:
            "Application for creating firefighters' intervention sheets, found by entering a site's details and generated as PDFs. Drawing engine on drone photos to mark sensitive and high-risk areas.",
          badges: ["po", "projectManager", "developer"],
          favorite: true,
        },
        {
          title: "Marine pollution response",
          description:
            "Stock management application for pollution response equipment, so that it is ready on the day it is needed.",
          badges: ["projectManager", "techLead"],
        },
        {
          title: "id3i.fr website redesign",
          description:
            "Complete redesign of the company's website, built on proven technologies backed by the community.",
          badges: ["developer", "functionalLead", "ai"],
        },
      ],
    },
    {
      // Approximate dates (~10 years, before the 2018 career change), to be confirmed.
      role: "Waiter, then front-of-house manager",
      company: "Restaurant trade",
      period: "2008 – 2018",
      description:
        "Ten years front of house: team management, handling the rush, customer relations. Many restaurants, as many ways of working.",
    },
  ],
  personalProjects: [
    {
      title: "Ramonéa",
      description:
        "Website for a chimney sweeping business on the Crozon peninsula: services, prices, FAQ and contact, with a full back office so the owner can manage content, photos, translations and SEO on their own.",
      url: "https://ramonea.fr",
      image: "/projects/ramonea.webp",
      stack: [
        { label: "Vue.js 3", icon: "vue" },
        { label: "TypeScript", icon: "typescript" },
        { label: "Supabase" },
      ],
    },
    {
      title: "Les ateliers de Camille",
      description:
        "Website of Camille de Boiscuillé, a psychotherapy practitioner in Crozon: her services (art therapy, EMDR, family therapy) presented on an ultra-light static site, with no JavaScript and no cookies.",
      url: "https://www.camilledeboiscuilletherapeute.com",
      image: "/projects/camille.webp",
      stack: [{ label: "Astro", icon: "astro" }],
    },
    {
      title: "Final Fantasy XIV app",
      description:
        "An app for completionists of Final Fantasy XIV, my all-time favourite game, to track progress across everything the game has to collect.",
      inProgress: true,
    },
  ],
  skillGroups: [
    {
      title: "Front-end & UI/UX",
      skills: [
        { label: "Accessibility (WCAG)" },
        { label: "Vue.js 3", icon: "vue" },
        { label: "Nuxt", icon: "nuxt" },
        { label: "Astro", icon: "astro" },
        { label: "TypeScript", icon: "typescript" },
        { label: "Modern CSS", icon: "css" },
        { label: "Interface design", icon: "figma" },
      ],
    },
    {
      title: "Back-end",
      skills: [
        { label: "Node.js", icon: "node", siteOnly: true },
        { label: "C#", icon: "csharp" },
        { label: "PostgreSQL", icon: "postgresql" },
        { label: "Supabase" },
      ],
    },
    {
      title: "DevOps & tools",
      skills: [
        { label: "Git", icon: "git" },
        { label: "GitLab CI/CD", icon: "gitlab" },
        { label: "GitHub Actions", icon: "github" },
        { label: "Deployment (Vercel, OVH)" },
      ],
    },
    {
      title: "AI-assisted development",
      skills: [
        { label: "Claude Code", icon: "claude" },
        { label: "Skills, hooks & agents" },
        { label: "LLM integration" },
      ],
    },
    {
      title: "Other",
      misc: true,
      skills: [
        { label: "Project management" },
        { label: "Requirements gathering & specifications" },
        { label: "Client relations" },
        { label: "SEO" },
        { label: "Multi-project work in IT services" },
        { label: "Keeping up with tech" },
        { label: "Personal projects" },
      ],
    },
  ],
  education: [
    {
      degree: "Expert in software development, EQF level 7 (Master's level)",
      period: "In progress, through recognition of prior experience (VAE)",
      url: "https://www.francecompetences.fr/recherche/rncp/41330",
      inProgress: true,
    },
    {
      degree: "Software developer vocational qualification, EQF level 5",
      school: "AFPA",
      period: "2018",
    },
  ],
  languages: [
    { name: "French", level: "native" },
    { name: "English", level: "fluent, professional" },
  ],
  availability: "Immediate",
  mobility: "Driving licence (category B)",
  hobbies: [
    "Music (metal)",
    "Video games",
    "Board games",
    "Evenings with friends",
    "Coding in my spare time",
  ],
};

export const ui: UiText = {
  intl: "en-GB",
  colon: ":",
  newTab: " (opens in a new tab)",
  roles: {
    po: "Product Owner",
    projectManager: "Project manager",
    developer: "Developer",
    techLead: "Technical lead",
    functionalLead: "Functional lead",
    ai: "AI",
  },
  photoAlt: `Photo of ${COMMON.name}`,
  seo: {
    title: `${COMMON.name} - Portfolio`,
    description: `Portfolio of ${COMMON.name}, software developer in Brest, France, specialising in front-end, UI/UX and accessibility: Vue, Nuxt, TypeScript. Projects, skills, background and downloadable CV.`,
    ogImageAlt: `${COMMON.name}, ${cv.title}`,
  },
  skipLink: "Skip to content",
  footer: `Site designed and built by ${COMMON.name}, with Nuxt and TypeScript.`,
  backToTop: "Back to top of page",
  header: {
    navLabel: "Portfolio sections",
    menu: "Menu",
    sections: {
      "a-propos": "About",
      projets: "Projects",
      competences: "Skills",
      parcours: "Background",
      loisirs: "Interests",
      contact: "Contact",
    },
    cv: "My CV",
    language: "Language",
  },
  pdfMeta: (kb) => `PDF, about ${kb} KB`,
  hero: { kicker: "Portfolio", download: "Download my CV", contact: "Get in touch" },
  about: { kicker: "About", method: "How I work", funFact: "Did you know?" },
  projects: {
    kicker: "Projects",
    title: "Business applications and live websites",
    intro:
      "A selection of projects carried out at iD3i, then my personal projects: two live websites and an app in progress.",
    missionsHeading: "Projects at iD3i",
    favourite: "Favourite",
    personalHeading: "Personal projects",
    inProgress: "In development",
    screenshotAlt: (title) => `Home page of the ${title} website`,
  },
  skills: { kicker: "Skills", title: "My toolbox" },
  journey: {
    kicker: "Background",
    title: "The road so far",
    availability: "Availability",
    mobility: "Mobility",
    languages: "Languages",
  },
  hobbies: { kicker: "Interests", title: "Away from the code" },
  contact: {
    kicker: "Contact",
    title: "Get in touch",
    intro: "A question, an opportunity? Email or call me.",
    download: "Download my CV",
  },
  sheet: {
    availability: "Available immediately",
    ageAndPlace: `${COMMON.age} years old, ${COMMON.location}`,
    experience: "Experience",
    missions: "Key projects",
    personalProjects: "Personal projects",
    skills: "Skills",
    education: "Education",
    languages: "Languages",
    hobbies: "Interests",
  },
  og: { kicker: "Portfolio" },
};
