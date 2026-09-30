import { describe, expect, test } from "vite-plus/test";
import { bareUrl, hostOf, listOf, lowerFirst, sentenceList, toTelHref } from "../app/utils/format";

describe("listOf", () => {
  test("en français : virgules, puis « et »", () => {
    expect(listOf(["Sabaton", "Ghost", "Rammstein"], "fr")).toBe("Sabaton, Ghost et Rammstein");
    expect(listOf(["Hellfest", "Motocultor"], "fr")).toBe("Hellfest et Motocultor");
    expect(listOf(["NieR"], "fr")).toBe("NieR");
  });

  test("en anglais britannique : « and », sans virgule avant", () => {
    expect(listOf(["Sabaton", "Ghost", "Rammstein"], "en-GB")).toBe("Sabaton, Ghost and Rammstein");
  });
});

describe("sentenceList", () => {
  test("met en minuscule les éléments qui suivent le premier", () => {
    expect(sentenceList(["Product Owner", "Chef de projet", "Développeur"], "fr")).toBe(
      "Product Owner, chef de projet et développeur",
    );
    expect(sentenceList(["Product Owner", "Project manager", "Developer"], "en-GB")).toBe(
      "Product Owner, project manager and developer",
    );
  });

  test("garde les sigles et les termes à majuscule interne", () => {
    expect(sentenceList(["Développeur", "IA", "Product Owner"], "fr")).toBe(
      "Développeur, IA et Product Owner",
    );
  });
});

describe("lowerFirst", () => {
  test("met la première lettre en minuscule, même si le texte contient un sigle", () => {
    expect(lowerFirst("Développeur logiciel front-end, UI/UX et accessibilité", "fr")).toBe(
      "développeur logiciel front-end, UI/UX et accessibilité",
    );
  });
});

describe("toTelHref", () => {
  test("retire les espaces du numéro affiché, local ou international", () => {
    expect(toTelHref("06 13 39 80 06")).toBe("tel:0613398006");
    expect(toTelHref("+33 6 13 39 80 06")).toBe("tel:+33613398006");
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
  test("retire le protocole, le www et la barre finale", () => {
    expect(bareUrl("https://github.com/vincent-leostic/")).toBe("github.com/vincent-leostic");
    expect(bareUrl("http://vincent.leostic.bzh")).toBe("vincent.leostic.bzh");
    expect(bareUrl("https://www.linkedin.com/in/vincent-leostic")).toBe(
      "linkedin.com/in/vincent-leostic",
    );
  });
});
