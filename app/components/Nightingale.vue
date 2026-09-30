<template>
  <!-- Rossignol qui chante (eostig en breton, d'où LEOSTIC), dessiné au trait, décoratif.
       Le bas du viewBox est le bout des pattes : posé sur un bord, il s'y
       perche. L'opacité s'applique au dessin entier : les traits qui se
       croisent ne s'éclaircissent pas. Position et taille : au parent. -->
  <svg class="nightingale" viewBox="80 18 290 238" aria-hidden="true">
    <g
      fill="none"
      stroke="currentColor"
      stroke-width="8"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <!-- Corps : tête, dos, queue, ventre, poitrine -->
      <path
        d="M288 104 C 284 80, 258 70, 238 80 C 214 92, 204 120, 190 146 C 180 164, 168 176, 150 186 L 98 212 C 86 219, 88 232, 100 229 L 164 206 C 182 222, 222 234, 250 220 C 280 204, 298 170, 292 132 C 291 122, 290 112, 288 104 Z"
      />
      <!-- Aile -->
      <path d="M232 118 C 250 150, 238 190, 184 204" />
      <!-- Bec ouvert -->
      <path d="M288 100 L 324 92 L 291 107" />
      <path d="M292 112 L 320 121 L 289 116" />
      <!-- Pattes -->
      <path d="M230 228 L 228 252" />
      <path d="M248 224 L 252 250" />
      <!-- Notes de musique -->
      <path d="M340 72 L 340 34 L 360 29 L 360 66" />
      <circle cx="333" cy="74" r="7" />
      <circle cx="353" cy="68" r="7" />
    </g>
    <circle cx="262" cy="98" r="6" fill="currentColor" />
  </svg>
</template>

<style scoped>
/* Blanc très translucide, à poser sur un fond sombre */
.nightingale {
  height: auto;
  color: var(--on-dark);
  opacity: 0.12;
  pointer-events: none;
}
</style>
