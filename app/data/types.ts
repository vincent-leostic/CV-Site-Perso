import type { IconName } from "./icons";

/** Langues du site : français par défaut sur /, anglais sur /en/ */
export type Locale = "fr" | "en";

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

/** Casquettes tenues sur une mission ; libellés traduits dans UiText.roles */
export type Role = "po" | "projectManager" | "developer" | "techLead" | "functionalLead" | "ai";

export interface Mission {
  /** Nom court du projet */
  title: string;
  description: string;
  /** Casquettes tenues sur la mission */
  badges?: Role[];
  /** Mission coup de cœur, signalée sur le site */
  favorite?: boolean;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  /** Missions ou projets marquants */
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
  /** Méthode et habitudes plutôt que domaines de compétence : absent du référencement */
  misc?: boolean;
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

/** Données identiques dans toutes les langues (app/data/common.ts) */
export interface Common {
  name: string;
  /** Chemin de la photo de profil (dans public/) */
  photo: string;
  /** URL publique du site : canonique SEO, et affichée sur le PDF */
  website: string;
  email: string;
  age: number;
  /** Ville, affichée à côté de l'âge */
  location: string;
  links: Link[];
}

/** Contenu du portfolio et du CV dans une langue */
export interface CvData extends Common {
  title: string;
  bio: string;
  /** Ville et repère géographique, affichés dans l'accroche */
  area: string;
  /** Numéro affiché tel quel, au format local ou international ; le lien tel: en dérive */
  phone: string;
  about: About;
  /** Frise du parcours, de la plus ancienne étape à la plus récente */
  milestones: Milestone[];
  /** Loisirs détaillés ; `hobbies` en reste la version courte (PDF) */
  interests: Interests;
  /** Disponibilité pour un nouveau poste, mise en avant dans le parcours */
  availability: string;
  /** Mobilité, affichée dans le parcours */
  mobility: string;
  experiences: Experience[];
  /** Sites réalisés en dehors du travail, avec lien vers le site en ligne */
  personalProjects: PersonalProject[];
  skillGroups: SkillGroup[];
  education: Education[];
  languages: Language[];
  hobbies: string[];
}

/** Ancres des sections du portfolio, identiques dans toutes les langues */
export type SectionId = "a-propos" | "projets" | "competences" | "parcours" | "loisirs" | "contact";

/** Textes d'interface dans une langue : tout texte affiché hors contenu */
export interface UiText {
  /** Langue passée à Intl pour les listes et la casse, ex. "en-GB" */
  intl: string;
  /** Deux-points typographique : insécable devant en français */
  colon: string;
  /** Mention ajoutée aux liens qui ouvrent un nouvel onglet (lecteurs d'écran) */
  newTab: string;
  roles: Record<Role, string>;
  photoAlt: string;
  seo: { title: string; description: string; ogImageAlt: string };
  skipLink: string;
  footer: string;
  /** Mention de la mesure d'audience, en pied de page */
  analytics: string;
  backToTop: string;
  header: {
    navLabel: string;
    menu: string;
    sections: Record<SectionId, string>;
    cv: string;
    /** Nom du groupe de l'interrupteur de langue, lu par les lecteurs d'écran */
    language: string;
  };
  /** Format et poids du PDF, à côté des liens de téléchargement */
  pdfMeta: (kb: number) => string;
  hero: { kicker: string; download: string; contact: string };
  about: { kicker: string; method: string; funFact: string };
  projects: {
    kicker: string;
    title: string;
    intro: string;
    missionsHeading: string;
    favourite: string;
    personalHeading: string;
    inProgress: string;
    screenshotAlt: (title: string) => string;
  };
  skills: { kicker: string; title: string };
  journey: {
    kicker: string;
    title: string;
    availability: string;
    mobility: string;
    languages: string;
  };
  hobbies: { kicker: string; title: string };
  contact: { kicker: string; title: string; intro: string; download: string };
  /** CV en PDF */
  sheet: {
    /** Pastille de disponibilité dans l'en-tête */
    availability: string;
    ageAndPlace: string;
    experience: string;
    missions: string;
    personalProjects: string;
    skills: string;
    education: string;
    languages: string;
    hobbies: string;
  };
  og: { kicker: string };
}
