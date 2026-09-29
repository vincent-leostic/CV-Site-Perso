import { describe, expect, test } from "vite-plus/test";
import { cv } from "../app/data/cv";
import { ICONS } from "../app/data/icons";
import { toTelHref } from "../app/utils/format";

/** Doublons d'une liste, pour des messages d'échec lisibles */
function duplicates(values: string[]) {
  return values.filter((value, index) => values.indexOf(value) !== index);
}

describe("données du CV", () => {
  test("les URLs publiques sont valides et en https", () => {
    const urls = [
      cv.website,
      ...cv.links.map((link) => link.url),
      ...cv.personalProjects.map((proj) => proj.url),
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
    expect(toTelHref(cv.phone)).toMatch(/^tel:0\d{9}$/);
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
    // Sérieux met toutes les compétences à plat dans un seul nuage
    expect(
      duplicates(cv.skillGroups.flatMap((group) => group.skills.map((skill) => skill.label))),
    ).toEqual([]);
    expect(duplicates(cv.education.map((edu) => edu.degree))).toEqual([]);
    expect(duplicates(cv.languages.map((lang) => lang.name))).toEqual([]);
  });

  test("les niveaux de compétence sont des entiers entre 0 et 100", () => {
    for (const skill of cv.skillGroups.flatMap((group) => group.skills)) {
      expect(Number.isInteger(skill.level), skill.label).toBe(true);
      expect(skill.level, skill.label).toBeGreaterThanOrEqual(0);
      expect(skill.level, skill.label).toBeLessThanOrEqual(100);
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
