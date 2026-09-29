import type { IconName } from "./icons";

/** Libellé affiché, accompagné d'une icône de marque s'il y en a une */
export interface Tech {
  label: string;
  icon?: IconName;
  /** Affichée sur le site mais absente du CV en PDF */
  siteOnly?: boolean;
}

export interface Link extends Tech {
  url: string;
}

/** Casquettes tenues sur une mission ; chaque thème leur associe un style */
export type Casquette =
  | "Product Owner"
  | "Chef de projet"
  | "Développeur"
  | "Responsable technique"
  | "Responsable fonctionnel"
  | "IA";

export interface Mission {
  /** Nom court du projet */
  title: string;
  description: string;
  /** Casquettes tenues sur la mission */
  badges?: Casquette[];
  /** Mission coup de cœur, signalée à côté du titre */
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
  /** URL publique, ouverte dans un nouvel onglet ; absente tant que rien n'est en ligne */
  url?: string;
  /** Projet en cours de développement : pas d'aperçu, carte à part */
  inProgress?: boolean;
  /** Technos marquantes, affichées en tags */
  stack?: Tech[];
  /** Capture de la page d'accueil (dans public/), 1280×800 */
  image?: string;
}

export interface SkillGroup {
  title: string;
  skills: Tech[];
}

export interface Education {
  degree: string;
  /** Organisme, omis quand il n'a pas à figurer sur le CV */
  school?: string;
  period: string;
  /** Fiche officielle de la certification (France compétences), liée depuis l'intitulé */
  url?: string;
  /** Diplôme pas encore obtenu : absent des diplômes déclarés au référencement */
  inProgress?: boolean;
}

export interface Language {
  name: string;
  level: string;
}

/** Section « À propos » du portfolio (absente du CV en PDF) */
export interface About {
  title: string;
  /** Phrase d'ouverture, avant les questions-réponses */
  intro: string;
  faq: { question: string; answer: string }[];
  /** Façon de travailler, étape par étape */
  method: { title: string; detail: string }[];
  /** Anecdote de l'encadré « Le saviez-vous ? » */
  funFact?: string;
}

/** Étape de la frise du parcours (portfolio) */
export interface Milestone {
  period: string;
  title: string;
  detail: string;
  /** Étape en cours ou à venir : la frise y mène en pointillé */
  status?: "current" | "future";
  /** Lien depuis le titre : page externe (nouvel onglet) ou ancre du site */
  url?: string;
}

/** Tuile de la mosaïque « En dehors du code » (portfolio) */
export interface InterestTile {
  title: string;
  /** Phrase courte sous le titre */
  text?: string;
  /** Favoris en texte, éventuellement sous un intitulé */
  lists?: { label?: string; items: string[] }[];
}

export interface Interests {
  /** Fil rouge qui ouvre la section */
  intro: string;
  /** Tuile phare, sur fond sombre */
  featured: { caption: string; title: string; text: string };
  /** Écoute du moment, tuile rousse */
  nowPlaying: { caption: string; title: string };
  tiles: InterestTile[];
}

export interface CvData {
  name: string;
  title: string;
  bio: string;
  about: About;
  /** Frise du parcours, de la plus ancienne étape à la plus récente */
  milestones: Milestone[];
  /** Loisirs détaillés ; `hobbies` en reste la version courte (PDF) */
  interests: Interests;
  /** Disponibilité pour un nouveau poste, mise en avant dans le parcours */
  availability: string;
  /** Mobilité, affichée dans le parcours */
  mobility: string;
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
  title: "Développeur logiciel front-end, UI/UX et accessibilité",
  bio: "Je conçois et développe des applications métier, du besoin jusqu'à la production, en soignant chaque détail de l'interface.",
  about: {
    title: "Des interfaces qui font « wow »",
    intro:
      "Après dix ans en restauration, j'avais fait le tour du métier : en 2018, je me suis reconverti dans le développement.",
    faq: [
      {
        question: "Ce que j'aime ?",
        answer:
          "C'est concevoir des interfaces soignées, qui font dire « wow » dès qu'on arrive dessus. Mes premières étaient un peu criardes : j'ai appris à la dure, et j'en ai gardé le goût du détail juste.",
      },
      {
        question: "Le projet dont je suis le plus fier ?",
        answer:
          "Une application pour la sécurité incendie, qui aide les pompiers à préparer leurs interventions. Savoir qu'elle servira à protéger et aider des gens compte beaucoup pour moi.",
      },
      {
        question: "En dehors du travail ?",
        answer:
          "J'écoute beaucoup de musique, surtout du métal. Côté jeux, j'aime la grande stratégie, Europa Universalis en tête, et Final Fantasy XIV, mon jeu de cœur, pour lequel je développe une application destinée aux complétionnistes.",
      },
    ],
    method: [
      { title: "Écouter", detail: "Le besoin, tel que les utilisateurs le vivent." },
      { title: "Comprendre", detail: "Les usages, les contraintes et les objectifs." },
      {
        title: "Concevoir par itérations",
        detail: "Une première version de ma vision, que j'affine pas à pas.",
      },
      { title: "Faire valider", detail: "Chaque version est validée avant d'aller plus loin." },
    ],
    funFact: "Mon nom de famille, LEOSTIC, vient du breton « eostig », qui signifie « rossignol ».",
  },
  milestones: [
    { period: "2008 – 2018", title: "Restauration", detail: "Serveur, puis responsable de salle." },
    {
      period: "2018",
      title: "Reconversion",
      detail: "Titre professionnel Développeur logiciel, à l'AFPA.",
    },
    {
      period: "Depuis 2019",
      title: "Développeur logiciel",
      detail:
        "En ESN à Brest, chez iD3i : des missions variées, avec le front et l'UI/UX pour spécialité.",
    },
    {
      period: "En cours",
      title: "Expert en développement logiciel",
      detail: "Titre de niveau 7 (Bac+5), par VAE.",
      status: "current",
      url: "https://www.francecompetences.fr/recherche/rncp/41330",
    },
    {
      period: "Demain",
      title: "Chez vous ?",
      detail: "Un poste à temps plein dans votre équipe : parlons-en.",
      status: "future",
      url: "#contact",
    },
  ],
  interests: {
    intro:
      "Un fil rouge : dans Final Fantasy XIV comme autour d'une table de jeu de rôle, je joue tank. Avancer en équipe en tenant un rôle essentiel, c'est important pour moi.",
    featured: {
      caption: "Jeu de cœur",
      title: "Final Fantasy XIV",
      text: "Tank paladin depuis la refonte de 2013. J'adore son histoire et ses personnages, au point de développer une application pour ses complétionnistes.",
    },
    nowPlaying: { caption: "En ce moment", title: "Royal Sorrow" },
    tiles: [
      {
        title: "Musique",
        text: "Surtout du métal, et beaucoup de musiques de jeux vidéo.",
        lists: [
          { items: ["Electric Callboy", "Sabaton", "Ghost", "Rammstein", "Motörhead"] },
          { label: "Musiques de jeux", items: ["Clair Obscur : Expedition 33", "NieR"] },
          { label: "Festivals", items: ["Hellfest", "Motocultor"] },
        ],
      },
      {
        title: "Jeux vidéo",
        text: "L'Histoire me passionne depuis toujours, et j'aime les jeux portés par leur récit.",
        lists: [
          {
            label: "Stratégie",
            items: ["Europa Universalis", "Total War", "Anno", "Ixion", "Frostpunk 1 & 2"],
          },
          { label: "Récits", items: ["Tunic", "Outer Wilds", "Baldur's Gate 3"] },
        ],
      },
      {
        title: "Autour d'une table",
        text: "Les échecs, les petits jeux rapides, les parties de Risk à rallonge… et le jeu de rôle, que j'aimerais pratiquer plus souvent.",
      },
    ],
  },
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
        "Des missions variées, d'un secteur à l'autre, et rarement la même casquette : développeur, chef de projet, responsable technique ou fonctionnel selon les besoins. Ma spécialité reste le front et l'UI/UX.\nL'IA fait partie de mes outils au quotidien, encadrée par des spécifications détaillées.",
      missions: [
        {
          title: "Gestion d'adhérents de clubs de sport",
          description:
            "Application qui centralise la vie d'un club de sport : fiches adhérents et inscriptions.",
          badges: ["Product Owner", "Chef de projet", "Développeur"],
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
          badges: ["Product Owner", "Chef de projet", "Développeur"],
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
        "Site de Camille de Boiscuillé, psychopraticienne à Crozon : ses accompagnements (art-thérapie, EMDR, thérapie familiale) présentés dans un site statique ultra-léger, sans JavaScript ni cookies.",
      url: "https://www.camilledeboiscuilletherapeute.com",
      image: "/projects/camille.webp",
      stack: [{ label: "Astro", icon: "astro" }],
    },
    {
      title: "Application pour Final Fantasy XIV",
      description:
        "Une application destinée aux complétionnistes de Final Fantasy XIV, mon jeu de cœur, pour suivre sa progression dans tout ce que le jeu a à collectionner.",
      inProgress: true,
    },
  ],
  skillGroups: [
    {
      title: "Frontend & UI/UX",
      skills: [
        { label: "Accessibilité (WCAG)" },
        { label: "Vue.js 3", icon: "vue" },
        { label: "Nuxt", icon: "nuxt" },
        { label: "Astro", icon: "astro" },
        { label: "TypeScript", icon: "typescript" },
        { label: "CSS moderne", icon: "css" },
        { label: "Design d'interface", icon: "figma" },
      ],
    },
    {
      title: "Backend",
      skills: [
        { label: "Node.js", icon: "node", siteOnly: true },
        { label: "C#", icon: "csharp" },
        { label: "PostgreSQL", icon: "postgresql" },
        { label: "Supabase" },
      ],
    },
    {
      title: "DevOps & outils",
      skills: [
        { label: "Git", icon: "git" },
        { label: "GitLab CI/CD", icon: "gitlab" },
        { label: "GitHub Actions", icon: "github" },
        { label: "Déploiement (Vercel, OVH)" },
      ],
    },
    {
      title: "Développement assisté par IA",
      skills: [
        { label: "Claude Code", icon: "claude" },
        { label: "Skills, hooks & agents" },
        { label: "Intégration LLM" },
      ],
    },
    {
      title: "Divers",
      skills: [
        { label: "Gestion de projet" },
        { label: "Recueil du besoin & spécifications" },
        { label: "Relation client" },
        { label: "SEO" },
        { label: "Multi-projets en ESN" },
        { label: "Veille technique" },
        { label: "Projets perso" },
      ],
    },
  ],
  education: [
    {
      degree: "Expert en développement logiciel, niveau 7 (Bac+5)",
      period: "VAE en cours",
      url: "https://www.francecompetences.fr/recherche/rncp/41330",
      inProgress: true,
    },
    {
      degree: "Titre professionnel Développeur logiciel (Bac+2)",
      school: "AFPA",
      period: "2018",
    },
  ],
  languages: [
    { name: "Français", level: "langue maternelle" },
    {
      name: "Anglais",
      level: "courant et professionnel",
    },
  ],
  availability: "Immédiate",
  mobility: "Permis B",
  hobbies: [
    "Musique (métal)",
    "Jeux vidéo",
    "Jeux de société",
    "Soirées entre amis",
    "Développer à temps perdu",
  ],
};
