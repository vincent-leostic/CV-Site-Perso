import { SECTION_IDS } from "~/data/content";

/**
 * Jusqu'où on descend dans le portfolio : un événement « section-<ancre> »
 * la première fois qu'une section arrive dans les 60 % hauts de l'écran,
 * une fois par page vue. L'entonnoir d'Umami, section par section, montre
 * ensuite où les visiteurs s'arrêtent.
 */
export function useSectionTracking() {
  const { $track } = useNuxtApp();
  const { locale } = useI18n();
  let observer: IntersectionObserver | undefined;

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer?.unobserve(entry.target);
          $track(`section-${entry.target.id}`, { lang: locale.value });
        }
      },
      { rootMargin: "0px 0px -40% 0px" },
    );
    for (const id of SECTION_IDS) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
  });

  onUnmounted(() => observer?.disconnect());
}
