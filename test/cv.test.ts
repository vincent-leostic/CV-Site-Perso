import { existsSync } from "node:fs";
import { describe, expect, test } from "vite-plus/test";
import { CONTENT, LOCALES } from "../app/data/content";
import { ICONS } from "../app/data/icons";
import { toTelHref } from "../app/utils/format";

/** Doublons d'une liste, pour des messages d'échec lisibles */
function duplicates(values: string[]) {
  return values.filter((value, index) => values.indexOf(value) !== index);
}

describe.each(LOCALES)("données du CV (%s)", (locale) => {
  const { cv } = CONTENT[locale];

  test("les URLs publiques sont valides et en https", () => {
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

  test("chaque capture de projet existe dans public/", () => {
    for (const proj of cv.personalProjects) {
      if (proj.image) expect(existsSync(`public${proj.image}`), proj.image).toBe(true);
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

  test("même numéro de téléphone, au format local ou international", () => {
    const national = toTelHref(CONTENT.fr.cv.phone).replace("tel:0", "");
    const international = toTelHref(CONTENT.en.cv.phone).replace("tel:+33", "");
    expect(international).toBe(national);
  });
});
