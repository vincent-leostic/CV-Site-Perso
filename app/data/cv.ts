export interface Link {
  label: string;
  url: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface Education {
  degree: string;
  school: string;
  period: string;
}

export interface CvData {
  name: string;
  title: string;
  bio: string;
  /** Chemin de la photo de profil (dans public/) */
  photo: string;
  email: string;
  links: Link[];
  experiences: Experience[];
  skillGroups: SkillGroup[];
  education: Education[];
}

/**
 * Tout le contenu du CV est centralisé ici : c'est le seul fichier à
 * modifier pour mettre à jour les infos affichées sur le site.
 *
 * Contenu réel (interview du 2026-08-14). Restent à confirmer : les dates
 * exactes de la période restauration et de la gendarmerie.
 */
export const cv: CvData = {
  name: "Vincent Leostic",
  title: "Développeur logiciel front, UI/UX et outillage IA",
  bio: "Développeur logiciel chez iD3i, à Brest, depuis 2019, après une reconversion. Spécialisé front et UI/UX : des interfaces soignées, jolies sans en faire trop. Je développe assisté par IA au quotidien et je construis l'outillage qui va avec, une bibliothèque de skills, de règles et de garde-fous autour de Claude Code. Basé à Plougastel.",
  photo: "/avatar.jpg",
  email: "vincent.leostic@gmail.com",
  links: [
    { label: "GitHub", url: "https://github.com/vincent-leostic" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/vincent-leostic-43a613280" },
  ],
  experiences: [
    {
      role: "Développeur logiciel",
      company: "iD3i, ESN à Brest",
      period: "nov. 2019 – aujourd'hui",
      description:
        "Applications web métier en Vue, Nuxt et TypeScript pour des secteurs variés : planification en restauration, sécurité incendie, gestion d'adhérents de clubs de sport, école de pilotage, recherche d'emploi maritime, refonte du site id3i.fr. Spécialisation front et UI/UX. Développement assisté par IA : bibliothèque de skills Claude Code adaptée à chaque projet et techno (règles d'architecture, styles, garde-fous appliqués par hooks), dont une application de gestion d'adhérents menée en production avec cette approche.",
    },
    {
      // Dates approximatives (~10 ans, avant la reconversion de 2018), à confirmer.
      role: "Serveur, puis responsable de salle",
      company: "Restauration",
      period: "2008 – 2018",
      description:
        "Dix ans en salle : encadrement d'équipe, gestion du rush, relation client, et des coups de main en cuisine quand il le fallait.",
    },
    {
      // Statut exact et dates à confirmer.
      role: "Gendarme adjoint volontaire",
      company: "Gendarmerie nationale",
      period: "1 an",
      description: "Une année au contact du public, avant dix ans en restauration.",
    },
  ],
  skillGroups: [
    {
      title: "Frontend & UI/UX",
      skills: ["Vue.js 3", "Nuxt", "Astro", "TypeScript", "CSS moderne", "Design d'interface"],
    },
    {
      title: "Outillage IA",
      skills: ["Claude Code", "Skills & hooks", "Agents", "Intégration LLM"],
    },
    {
      title: "DevOps & outils",
      skills: [
        "Git",
        "GitLab CI/CD",
        "GitHub Actions",
        "Multi-projets en ESN",
        "Veille technique",
        "Notions back (Node.js, SQL)",
      ],
    },
  ],
  education: [
    {
      degree: "Titre professionnel Développeur logiciel (équivalent BAC+2)",
      school: "AFPA",
      period: "2018",
    },
  ],
};
