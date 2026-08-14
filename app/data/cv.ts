export interface Link {
  label: string;
  url: string;
}

/**
 * Casquettes possibles : "Chef de projet", "Développeur", "Responsable
 * technique", "Responsable fonctionnel", "IA", "En autonomie".
 */
export interface Mission {
  /** Nom court du projet */
  title: string;
  description: string;
  /** Casquettes tenues sur la mission, affichées en badges */
  badges?: string[];
  /** Mission préférée : affiche une étoile jaune à côté du titre */
  favorite?: boolean;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  /** Missions ou projets marquants, affichés en cartes ou liste selon le thème */
  missions?: Mission[];
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

export interface Language {
  name: string;
  level: string;
}

export interface CvData {
  name: string;
  title: string;
  bio: string;
  /** Chemin de la photo de profil (dans public/) */
  photo: string;
  email: string;
  /** Numéro affiché tel quel ; les thèmes en dérivent le lien tel: */
  phone: string;
  age: number;
  /** Ville, affichée à côté de l'âge */
  location: string;
  links: Link[];
  experiences: Experience[];
  skillGroups: SkillGroup[];
  education: Education[];
  languages: Language[];
  hobbies: string[];
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
  bio: "Développeur logiciel chez iD3i, à Brest, après une reconversion. Spécialisé front et UI/UX, je développe assisté par IA au quotidien et je construis l'outillage qui va avec.",
  photo: "/avatar.jpg",
  email: "vincent.leostic@gmail.com",
  phone: "06 13 39 80 06",
  age: 37,
  location: "Plougastel-Daoulas",
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
        "Applications web métier en Vue, Nuxt et TypeScript, sur un back C# et PostgreSQL. Spécialisation front et UI/UX. Outillage IA : bibliothèque de skills Claude Code par projet et par techno, garde-fous appliqués par hooks, rédaction de spécifications détaillées, applications livrées en développement assisté par IA.",
      missions: [
        {
          title: "Gestion d'adhérents de clubs de sport",
          description:
            "Application qui centralise la vie d'un club de sport : fiches adhérents, inscriptions et suivi des cotisations. Livrée en production dans les délais et le budget alloués.",
          badges: [
            "Chef de projet",
            "Développeur",
            "Responsable technique",
            "Responsable fonctionnel",
            "IA",
            "En autonomie",
          ],
        },
        {
          title: "Planification en restauration",
          description:
            "Outil de gestion des commandes, des plannings et de tous les à-côtés de la vie en restauration. Un métier que je connais de l'intérieur.",
          badges: ["Développeur"],
        },
        {
          title: "Sécurité incendie",
          description:
            "Fiches d'aide à l'intervention pour les pompiers, retrouvées en saisissant les informations d'un lieu et générées en PDF. Moteur de dessin sur photo prise par drone pour délimiter les zones sensibles et à risque.",
          badges: ["Chef de projet", "Développeur", "Responsable fonctionnel"],
          favorite: true,
        },
        {
          title: "Antipollution maritime",
          description:
            "Application de gestion du stock de matériel antipollution, pour un matériel prêt le jour où il doit servir.",
          badges: ["Chef de projet", "Responsable technique"],
        },
        {
          title: "Refonte du site id3i.fr",
          description:
            "Refonte complète de la vitrine de l'entreprise, avec des technologies éprouvées et validées par la communauté.",
          badges: ["Chef de projet", "Développeur", "Responsable fonctionnel", "IA"],
        },
      ],
    },
    {
      // Dates approximatives (~10 ans, avant la reconversion de 2018), à confirmer.
      role: "Serveur, puis responsable de salle",
      company: "Restauration",
      period: "2008 – 2018",
      description: "Dix ans en salle : encadrement d'équipe, gestion du rush, relation client.",
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
      title: "Backend",
      skills: ["Node.js", "C#", "PostgreSQL"],
    },
    {
      title: "DevOps & outils",
      skills: ["Git", "GitLab CI/CD", "GitHub Actions", "Multi-projets en ESN", "Veille technique"],
    },
  ],
  education: [
    {
      degree: "Titre professionnel Développeur logiciel (équivalent BAC+2)",
      school: "AFPA",
      period: "2018",
    },
  ],
  languages: [
    { name: "Français", level: "langue maternelle" },
    {
      name: "Anglais",
      level: "courant et professionnel, lecture technique fluide ; l'oral manque de pratique",
    },
  ],
  hobbies: ["Jeux vidéo", "Jeux de société", "Soirées entre amis", "Développer à temps perdu"],
};
