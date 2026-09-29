import { describe, expect, test } from "vite-plus/test";
import {
  DEFAULT_THEME,
  THEME_PENDING_CLASS,
  isTheme,
  themeHref,
  themeInitScript,
} from "../shared/theme";

/**
 * Exécute le script inline tel qu'il est injecté dans le <head>, avec un
 * document et une URL factices.
 */
function runInitScript(search = "") {
  const attributes = new Map<string, string>();
  const classes = new Set<string>();
  const document = {
    documentElement: {
      setAttribute: (name: string, value: string) => attributes.set(name, value),
      classList: {
        add: (name: string) => classes.add(name),
        remove: (name: string) => classes.delete(name),
      },
    },
  };
  // Un ancien choix sauvegardé ne doit plus rien changer
  const localStorage = { getItem: () => "gaming" };
  // Le filet de sécurité (setTimeout) n'est pas déclenché ici
  const setTimeout = () => 0;
  // On exécute la chaîne exacte envoyée au navigateur, pas une copie de sa logique
  // oxlint-disable-next-line typescript/no-implied-eval
  new Function("document", "location", "localStorage", "setTimeout", themeInitScript)(
    document,
    { search },
    localStorage,
    setTimeout,
  );
  return { theme: attributes.get("data-theme"), pending: classes.has(THEME_PENDING_CLASS) };
}

describe("script inline de thème", () => {
  test("sans paramètre : version Pro, rien de masqué, même avec un ancien choix sauvegardé", () => {
    expect(runInitScript()).toEqual({ theme: DEFAULT_THEME, pending: false });
  });

  test("?theme= affiche la version demandée (lien partagé)", () => {
    expect(runInitScript("?theme=nature")).toEqual({ theme: "nature", pending: true });
  });

  test("un ?theme= inconnu retombe sur la version Pro", () => {
    expect(runInitScript("?theme=oups")).toEqual({ theme: DEFAULT_THEME, pending: false });
  });
});

describe("themeHref", () => {
  test("la version Pro est la racine, les autres portent ?theme=", () => {
    expect(themeHref(DEFAULT_THEME)).toBe("/");
    expect(themeHref("terminal")).toBe("/?theme=terminal");
  });
});

describe("isTheme", () => {
  test("reconnaît les thèmes et rejette le reste", () => {
    expect(isTheme("gaming")).toBe(true);
    expect(isTheme("Gaming")).toBe(false);
    expect(isTheme(null)).toBe(false);
  });
});
