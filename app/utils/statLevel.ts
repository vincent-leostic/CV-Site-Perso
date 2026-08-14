/**
 * Niveau 62–95 déterministe par compétence (purement décoratif :
 * utilisé pour les barres d'XP du thème Gaming et les jauges ASCII
 * du thème Terminal).
 */
export function statLevel(name: string): number {
  let h = 0;
  for (const char of name) h = (h * 31 + char.charCodeAt(0)) % 997;
  return 62 + (h % 34);
}
