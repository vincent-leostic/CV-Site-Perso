import { describe, expect, test } from "vite-plus/test";
import { bareUrl, hostOf, slugify, toRoman, toTelHref } from "../app/utils/format";

describe("toTelHref", () => {
  test("retire les espaces du numéro affiché", () => {
    expect(toTelHref("06 13 39 80 06")).toBe("tel:0613398006");
  });
});

describe("hostOf", () => {
  test("garde le domaine, sans www ni chemin", () => {
    expect(hostOf("https://www.camilledeboiscuilletherapeute.com/a/b")).toBe(
      "camilledeboiscuilletherapeute.com",
    );
    expect(hostOf("https://ramonea.fr")).toBe("ramonea.fr");
  });
});

describe("bareUrl", () => {
  test("retire le protocole et la barre finale", () => {
    expect(bareUrl("https://github.com/vincent-leostic/")).toBe("github.com/vincent-leostic");
    expect(bareUrl("http://vincent.leostic.bzh")).toBe("vincent.leostic.bzh");
  });
});

describe("slugify", () => {
  test("donne un identifiant ASCII sans accents", () => {
    expect(slugify("Ramonéa")).toBe("ramonea");
    expect(slugify("Les ateliers de Camille")).toBe("les-ateliers-de-camille");
    expect(slugify("  GitLab CI/CD  ")).toBe("gitlab-ci-cd");
  });
});

describe("toRoman", () => {
  test.each([
    [1, "I"],
    [4, "IV"],
    [9, "IX"],
    [14, "XIV"],
    [1990, "MCMXC"],
    [2026, "MMXXVI"],
  ])("%i → %s", (value, roman) => {
    expect(toRoman(value)).toBe(roman);
  });
});
