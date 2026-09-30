import { existsSync } from "node:fs";
import { describe, expect, test } from "vite-plus/test";
import { CONTENT, LOCALES } from "../app/data/content";
import { ICONS } from "../app/data/icons";
import { toTelHref } from "../app/utils/format";
import { PROJECT_IMAGE_WIDTHS, projectImageAt } from "../app/utils/images";

/** Doublons d'une liste, pour des messages d'échec lisibles */
function duplicates(values: string[]) {
  return values.filter((value, index) => values.indexOf(value) !== index);
}

describe.each(LOCALES)("données du CV (%s)", (locale) => {
  const { cv } = CONTENT[locale];

  test("les URL publiques sont valides et en https", () => {
    const urls = [
      cv.website,
      ...cv.links.map((link) => link.url),
      ...cv.personalProjects.flatMap((proj) => (proj.url ? [proj.url] : [])),
      ...cv.education.flatMap((edu) => (edu.url ? [edu.url] : [])),
    ];
    for (const url of urls) {
      expect(new URL(url).protocol, url).toBe("https:");
    }
  });

  test("la photo est un chemin absolu vers public/", () => {
    expect(cv.photo).toMatch(/^\/[\w.-]+$/);
  });

  test("l'e-mail et le téléphone sont bien formés", () => {
    expect(cv.email).toMatch(/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/);
    expect(toTelHref(cv.phone)).toMatch(/^tel:(0|\+33)\d{9}$/);
  });

  // Les libellés servent de clés de rendu (v-for) : un doublon casse la liste
  test("les clés de rendu sont uniques", () => {
    expect(duplicates(cv.links.map((link) => link.label))).toEqual([]);
    expect(duplicates(cv.experiences.map((exp) => `${exp.role}-${exp.company}`))).toEqual([]);
    for (const exp of cv.experiences) {
      expect(duplicates(exp.missions?.map((m) => m.title) ?? [])).toEqual([]);
    }
    expect(duplicates(cv.personalProjects.map((proj) => proj.title))).toEqual([]);
    expect(duplicates(cv.skillGroups.map((group) => group.title))).toEqual([]);
    for (const group of cv.skillGroups) {
      expect(duplicates(group.skills.map((skill) => skill.label))).toEqual([]);
    }
    expect(duplicates(cv.education.map((edu) => edu.degree))).toEqual([]);
    expect(duplicates(cv.languages.map((lang) => lang.name))).toEqual([]);
    expect(duplicates(cv.milestones.map((step) => step.title))).toEqual([]);
  });

  test("chaque capture de projet existe dans public/, avec ses versions réduites", () => {
    for (const proj of cv.personalProjects) {
      if (!proj.image) continue;
      for (const width of PROJECT_IMAGE_WIDTHS) {
        const file = projectImageAt(proj.image, width);
        expect(existsSync(`public${file}`), file).toBe(true);
      }
    }
  });

  test("chaque icône référencée existe", () => {
    const techs = [
      ...cv.links,
      ...cv.skillGroups.flatMap((group) => group.skills),
      ...cv.personalProjects.flatMap((proj) => proj.stack ?? []),
    ];
    for (const tech of techs) {
      if (tech.icon) expect(ICONS, tech.label).toHaveProperty(tech.icon);
    }
  });
});

/** Tous les textes d'une valeur, fonctions de UiText exclues */
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

// Typographie française : espace insécable (U+00A0) devant « : ; ! ? » et
// dans les guillemets, entre un nombre et son unité. Une espace ordinaire
// laisse le signe partir seul en début de ligne.
test("typographie française : pas d'espace sécable avant la ponctuation haute", () => {
  const { cv, ui } = CONTENT.fr;
  const texts = [...strings(cv), ...strings(ui), ui.pdfMeta(275)];
  const faults = texts.filter((text) => / [:;!?»]|« |\d (ans|Ko)\b/.test(text));
  expect(faults).toEqual([]);
});

/** Champs qui ne se traduisent pas : identiques dans toutes les langues */
const SHARED_KEYS = new Set([
  "url",
  "icon",
  "image",
  "status",
  "badges",
  "favorite",
  "inProgress",
  "siteOnly",
  "misc",
  "photo",
  "website",
  "email",
  "age",
]);

/** Forme d'une valeur : les textes s'effacent, sauf les champs partagés */
function shape(value: unknown, key = ""): unknown {
  if (SHARED_KEYS.has(key)) return value;
  if (Array.isArray(value)) return value.map((item) => shape(item));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v, k)]));
  }
  return typeof value;
}

describe("français et anglais", () => {
  test("même structure, mêmes liens, icônes, images et casquettes", () => {
    expect(shape(CONTENT.en.cv)).toEqual(shape(CONTENT.fr.cv));
  });

  // Minuscule en français (nom commun), majuscule en anglais (nom propre)
  test("les langues parlées suivent la casse de chaque langue", () => {
    expect(CONTENT.fr.ui.journey.languageList(CONTENT.fr.cv.languages)).toBe(
      "Français (langue maternelle) et anglais (courant et professionnel)",
    );
    expect(CONTENT.en.ui.journey.languageList(CONTENT.en.cv.languages)).toBe(
      "French (native) and English (fluent, professional)",
    );
  });

  test("même numéro de téléphone, au format local ou international", () => {
    const national = toTelHref(CONTENT.fr.cv.phone).replace("tel:0", "");
    const international = toTelHref(CONTENT.en.cv.phone).replace("tel:+33", "");
    expect(international).toBe(national);
  });
});
