import { describe, expect, test } from "vite-plus/test";
import { DEFAULT_THEME, THEME_PENDING_CLASS, isTheme, themeInitScript } from "../shared/theme";

interface RunOptions {
  search?: string;
  stored?: string | null;
  /** Simule un stockage bloqué (SecurityError) */
  storageThrows?: boolean;
}

/**
 * Exécute le script inline tel qu'il est injecté dans le <head>, avec un
 * document, une URL et un localStorage factices.
 */
function runInitScript({ search = "", stored = null, storageThrows = false }: RunOptions = {}) {
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
  const localStorage = {
    getItem: () => {
      if (storageThrows) throw new Error("SecurityError");
      return stored;
    },
  };
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
  test("sans paramètre ni choix sauvegardé : thème par défaut, rien de masqué", () => {
    expect(runInitScript()).toEqual({ theme: DEFAULT_THEME, pending: false });
  });

  test("?theme= prime sur le choix sauvegardé (lien partagé)", () => {
    expect(runInitScript({ search: "?theme=gaming", stored: "nature" })).toEqual({
      theme: "gaming",
      pending: true,
    });
  });

  test("sans paramètre, le choix sauvegardé s'applique", () => {
    expect(runInitScript({ stored: "manuscrit" })).toEqual({ theme: "manuscrit", pending: true });
  });

  test("un ?theme= inconnu retombe sur le choix sauvegardé", () => {
    expect(runInitScript({ search: "?theme=oups", stored: "terminal" })).toEqual({
      theme: "terminal",
      pending: true,
    });
  });

  test("une valeur sauvegardée inconnue retombe sur le défaut", () => {
    expect(runInitScript({ stored: "oups" })).toEqual({ theme: DEFAULT_THEME, pending: false });
  });

  test("un stockage bloqué n'empêche ni ?theme= ni le défaut", () => {
    expect(runInitScript({ search: "?theme=nature", storageThrows: true }).theme).toBe("nature");
    expect(runInitScript({ storageThrows: true }).theme).toBe(DEFAULT_THEME);
  });
});

describe("isTheme", () => {
  test("reconnaît les thèmes et rejette le reste", () => {
    expect(isTheme("gaming")).toBe(true);
    expect(isTheme("Gaming")).toBe(false);
    expect(isTheme(null)).toBe(false);
  });
});
