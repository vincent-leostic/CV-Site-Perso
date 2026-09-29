/** Lien d'appel d'un numéro affiché avec espaces, ex. "06 13 39 80 06" → "tel:0613398006" */
export function toTelHref(phone: string): string {
  return `tel:${phone.replaceAll(" ", "")}`;
}

/** Domaine d'une URL, sans le www, ex. "https://www.exemple.fr/a" → "exemple.fr" */
export function hostOf(url: string): string {
  return new URL(url).hostname.replace(/^www\./, "");
}

/** URL lisible sur papier, sans protocole, www ni barre finale, ex. "github.com/vincent-leostic" */
export function bareUrl(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

/** Identifiant ASCII en minuscules, ex. "Les ateliers de Camille" → "les-ateliers-de-camille" */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // accents détachés par NFD
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const ROMAN_NUMERALS: [number, string][] = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

/** Chiffres romains, ex. 2026 → "MMXXVI" */
export function toRoman(value: number): string {
  let rest = value;
  let roman = "";
  for (const [amount, numeral] of ROMAN_NUMERALS) {
    while (rest >= amount) {
      roman += numeral;
      rest -= amount;
    }
  }
  return roman;
}
