import { COMMON } from "~/data/common";

type EventData = Record<string, string | number>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => void };
  }
}

/**
 * Identifiant du site dans Umami Cloud. Public : il figure dans chaque page.
 * Vide, rien n'est mesuré.
 */
const WEBSITE_ID: string = "85e8d323-a9a9-4d63-b828-2b938043a2ab";

/**
 * Mesure d'audience Umami (umami.is), sans cookie : pas de bannière de
 * consentement. Le script ne se charge que sur le site en ligne : ni en
 * développement, ni pendant l'impression du PDF au build.
 *
 * Les clics sur les éléments marqués data-umami-event sont suivis par le
 * script lui-même. $track envoie les autres événements (sections atteintes),
 * mis en attente tant que le script n'est pas chargé.
 */
export default defineNuxtPlugin(() => {
  const enabled = WEBSITE_ID !== "" && location.hostname === new URL(COMMON.website).hostname;
  const pending: [string, EventData | undefined][] = [];

  function track(event: string, data?: EventData) {
    if (!enabled) return;
    if (window.umami) window.umami.track(event, data);
    else pending.push([event, data]);
  }

  if (enabled) {
    const script = document.createElement("script");
    script.src = "https://cloud.umami.is/script.js";
    script.defer = true;
    script.dataset.websiteId = WEBSITE_ID;
    // Les ancres (#projets…) ne comptent pas comme des pages vues
    script.dataset.excludeHash = "true";
    script.addEventListener("load", () => {
      for (const [event, data] of pending.splice(0)) window.umami?.track(event, data);
    });
    document.head.append(script);
  }

  return { provide: { track } };
});
