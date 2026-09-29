import { describe, expect, test } from "vite-plus/test";
import { bareUrl, hostOf, listFr, sentenceList, toTelHref } from "../app/utils/format";

describe("listFr", () => {
  test("sépare par des virgules et termine par « et »", () => {
    expect(listFr(["Sabaton", "Ghost", "Rammstein"])).toBe("Sabaton, Ghost et Rammstein");
    expect(listFr(["Hellfest", "Motocultor"])).toBe("Hellfest et Motocultor");
    expect(listFr(["NieR"])).toBe("NieR");
  });
});

describe("sentenceList", () => {
  test("met en minuscule les éléments qui suivent le premier", () => {
    expect(sentenceList(["Product Owner", "Chef de projet", "Développeur"])).toBe(
      "Product Owner, chef de projet et développeur",
    );
  });

  test("garde les sigles et les termes à majuscule interne", () => {
    expect(sentenceList(["Développeur", "IA", "Product Owner"])).toBe(
      "Développeur, IA et Product Owner",
    );
  });
});

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
  test("retire le protocole, le www et la barre finale", () => {
    expect(bareUrl("https://github.com/vincent-leostic/")).toBe("github.com/vincent-leostic");
    expect(bareUrl("http://vincent.leostic.bzh")).toBe("vincent.leostic.bzh");
    expect(bareUrl("https://www.linkedin.com/in/vincent-leostic")).toBe(
      "linkedin.com/in/vincent-leostic",
    );
  });
});
