import type { IconName } from "./icons";

/** Libellé affiché, accompagné d'une icône de marque s'il y en a une */
export interface Tech {
  label: string;
  icon?: IconName;
}

export interface Link extends Tech {
  url: string;
}

/** Casquettes tenues sur une mission ; chaque thème leur associe un style */
export type Casquette =
  | "Chef de projet"
  | "Développeur"
  | "Responsable technique"
  | "Responsable fonctionnel"
  | "IA"
  | "En autonomie";

export interface Mission {
  /** Nom court du projet */
  title: string;
  description: string;
  /** Casquettes tenues sur la mission, affichées en badges */
  badges?: Casquette[];
  /** Mission préférée : affiche une étoile à côté du titre */
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

export interface PersonalProject {
  /** Nom du site ou du projet */
  title: string;
  description: string;
  /** URL publique, ouverte dans un nouvel onglet */
  url: string;
  /** Technos marquantes, affichées en tags */
  stack?: Tech[];
}

export interface Skill extends Tech {
  /** Maîtrise sur 100 : barres d'XP (Gaming) et jauges ASCII (Terminal) */
  level: number;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
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
  /** URL publique du site : canonique SEO, et affichée sur le PDF imprimé */
  website: string;
  email: string;
  /** Numéro affiché tel quel ; les thèmes en dérivent le lien tel: */
  phone: string;
  age: number;
  /** Ville, affichée à côté de l'âge */
  location: string;
  links: Link[];
  experiences: Experience[];
  /** Sites réalisés en dehors du travail, avec lien vers le site en ligne */
  personalProjects: PersonalProject[];
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
  name: "Vincent LEOSTIC",
  title: "Développeur logiciel front, UI/UX et outillage IA",
  bio: "Développeur logiciel chez iD3i, à Brest, après une reconversion. Spécialisé front et UI/UX, je développe assisté par IA au quotidien et je construis l'outillage qui va avec.",
  photo: "/avatar.jpg",
  website: "https://vincent.leostic.bzh",
  email: "vincent.leostic@gmail.com",
  phone: "06 13 39 80 06",
  age: 37,
  location: "Plougastel-Daoulas",
  links: [
    { label: "GitHub", url: "https://github.com/vincent-leostic", icon: "github" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/vincent-leostic", icon: "linkedin" },
  ],
  experiences: [
    {
      role: "Développeur logiciel",
      company: "iD3i, ESN à Brest",
      period: "2019 – aujourd'hui",
      description:
        "Des missions variées, d'un secteur à l'autre, et rarement la même casquette : développeur, chef de projet, responsable technique ou fonctionnel selon les besoins. Ma spécialité reste le front et l'UI/UX.\nAvec le développement assisté par IA au quotidien, j'ai pu franchir le cap de la simple « théorie » : bibliothèque de skills, hooks, spécifications détaillées, IA marketplaces.",
      missions: [
        {
          title: "Gestion d'adhérents de clubs de sport",
          description:
            "Application qui centralise la vie d'un club de sport : fiches adhérents et inscriptions. Livrée en production dans les délais et le budget alloués.",
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
            "Application de création des fiches d'aide à l'intervention pour les pompiers, retrouvées en saisissant les informations d'un lieu et générées en PDF. Moteur de dessin sur photo prise par drone pour délimiter les zones sensibles et à risque.",
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
          badges: ["Développeur", "Responsable fonctionnel", "IA"],
        },
      ],
    },
    {
      // Dates approximatives (~10 ans, avant la reconversion de 2018), à confirmer.
      role: "Serveur, puis responsable de salle",
      company: "Restauration",
      period: "2008 – 2018",
      description:
        "Dix ans en salle : encadrement d'équipe, gestion du rush, relation client. Multiples restaurants, autant de façons de travailler.",
    },
  ],
  personalProjects: [
    {
      title: "Ramonéa",
      description:
        "Site vitrine d'une entreprise de ramonage de la presqu'île de Crozon : prestations, tarifs, FAQ et contact, avec un back-office complet pour que l'artisan gère lui-même contenus, photos, traductions et SEO.",
      url: "https://ramonea.fr",
      stack: [
        { label: "Vue.js 3", icon: "vue" },
        { label: "TypeScript", icon: "typescript" },
        { label: "Supabase" },
      ],
    },
    {
      title: "Les ateliers de Camille",
      description:
        "Site de Camille de Boiscuillé, psychopraticienne à Crozon : ses accompagnements (art-thérapie, EMDR, thérapie familiale) présentés dans un site statique ultra-léger, sans JavaScript ni cookies.",
      url: "https://www.camilledeboiscuilletherapeute.com",
      stack: [{ label: "Astro", icon: "astro" }],
    },
  ],
  skillGroups: [
    {
      title: "Frontend & UI/UX",
      skills: [
        { label: "Vue.js 3", icon: "vue", level: 90 },
        { label: "Nuxt", icon: "nuxt", level: 85 },
        { label: "Astro", icon: "astro", level: 70 },
        { label: "TypeScript", icon: "typescript", level: 85 },
        { label: "CSS moderne", icon: "css", level: 90 },
        { label: "Design d'interface", icon: "figma", level: 80 },
      ],
    },
    {
      title: "Outillage IA",
      skills: [
        { label: "Claude Code", icon: "claude", level: 95 },
        { label: "Skills & hooks", level: 90 },
        { label: "Agents", level: 85 },
        { label: "Intégration LLM", level: 75 },
      ],
    },
    {
      title: "Backend",
      skills: [
        { label: "Node.js", icon: "node", level: 70 },
        { label: "C#", icon: "csharp", level: 65 },
        { label: "PostgreSQL", icon: "postgresql", level: 65 },
      ],
    },
    {
      title: "DevOps & outils",
      skills: [
        { label: "Git", icon: "git", level: 85 },
        { label: "GitLab CI/CD", icon: "gitlab", level: 70 },
        { label: "GitHub Actions", icon: "github", level: 70 },
        { label: "Multi-projets en ESN", level: 85 },
        { label: "Veille technique", level: 85 },
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
  languages: [
    { name: "Français", level: "langue maternelle" },
    {
      name: "Anglais",
      level: "courant et professionnel, lecture technique fluide ; l'oral manque de pratique",
    },
  ],
  hobbies: ["Jeux vidéo", "Jeux de société", "Soirées entre amis", "Développer à temps perdu"],
};
