import type { Common, Locale } from "./types";

/** Données identiques en français et en anglais */
export const COMMON: Common = {
  name: "Vincent LEOSTIC",
  photo: "/avatar.jpg",
  website: "https://vincent.leostic.bzh",
  email: "vincent.leostic@gmail.com",
  age: 37,
  location: "Plougastel-Daoulas",
  links: [
    { label: "GitHub", url: "https://github.com/vincent-leostic", icon: "github" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/vincent-leostic", icon: "linkedin" },
  ],
};

/** Nom de chaque version du site, dans sa propre langue (interrupteur de langue) */
export const LANGUAGE_LABELS: Record<Locale, string> = {
  fr: "Version française",
  en: "English version",
};
