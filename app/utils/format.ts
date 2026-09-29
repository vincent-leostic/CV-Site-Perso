/** Texte insécable (espaces → espaces insécables), ex. un numéro de téléphone affiché */
export function noBreak(text: string): string {
  return text.replaceAll(" ", " ");
}

/** Lien d'appel d'un numéro affiché avec espaces, ex. "06 13 39 80 06" → "tel:0613398006" */
export function toTelHref(phone: string): string {
  return `tel:${phone.replaceAll(" ", "")}`;
}

/** Domaine d'une URL, sans le www, ex. "https://www.exemple.fr/a" → "exemple.fr" */
export function hostOf(url: string): string {
  return new URL(url).hostname.replace(/^www\./, "");
}

const FRENCH_LIST = new Intl.ListFormat("fr", { style: "long", type: "conjunction" });

/** Liste de noms en français, ex. ["Sabaton", "Ghost", "Rammstein"] → "Sabaton, Ghost et Rammstein" */
export function listFr(items: string[]): string {
  return FRENCH_LIST.format(items);
}

/**
 * Liste en phrase : après le premier élément, les suivants passent en
 * minuscule, sauf les sigles et termes à majuscule interne (« IA »,
 * « Product Owner »). Ex. ["Product Owner", "Chef de projet", "Développeur"]
 * → "Product Owner, chef de projet et développeur".
 */
export function sentenceList(items: string[]): string {
  return listFr(
    items.map((item, index) =>
      index === 0 || /\p{Lu}/u.test(item.slice(1))
        ? item
        : item.charAt(0).toLocaleLowerCase("fr") + item.slice(1),
    ),
  );
}

/** URL lisible sur papier, sans protocole, www ni barre finale, ex. "github.com/vincent-leostic" */
export function bareUrl(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}
