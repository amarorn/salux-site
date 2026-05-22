/** Total artificial scroll height in vh */
export const SCROLL_SCENE_VH = 500
export const SCROLL_SCENE_VH_PER_WORD = 160
export const SCROLL_SCENE_VH_MIN = 420

/** Words displayed sequentially — each occupies an equal 1/N of total scroll */
export const SCENE_WORDS = ['COLOR', 'TEXTURE', 'SHAPE'] as const
export type SceneWord = (typeof SCENE_WORDS)[number]

/**
 * Background gradient palette keyframes.
 * Indexed at scroll progress [0, 1/3, 2/3, 1].
 * Format: [top_h, top_s, top_l, bottom_h, bottom_s, bottom_l]
 */
export const BG_PALETTE: [number, number, number, number, number, number][] = [
  [44,  88, 62,  25, 72, 10],  // golden yellow sky → deep amber ground
  [26,  92, 58,  14, 78,  9],  // warm orange
  [318, 76, 52, 282, 68,  8],  // hot pink / magenta
  [256, 74, 36, 240, 82,  5],  // violet → indigo night
]

/**
 * Per-word animation timing — expressed as fraction of the word's own [0–1] range.
 * ENTER_DURATION: scroll fraction for the entrance (scale up + fade in)
 * EXIT_START:     scroll fraction at which exit begins (scale to infinity + fade out)
 * The range between ENTER_DURATION and EXIT_START is a natural "hold".
 */
export const WORD_TIMING = {
  ENTER_DURATION: 0.36,
  EXIT_START:     0.54,
} as const

/** Scale keyframes */
export const SCALES = {
  INITIAL: 0.065,
  PEAK:    1,
  EXIT:    13,
  EXIT_MOBILE: 8.5,
} as const

/** Blur keyframes (px) */
export const BLURS = {
  INITIAL: 28,
  PEAK:    0,
  EXIT:    16,
} as const

/**
 * GSAP scrub value — higher = smoother lag, lower = snappier.
 * 1.2 gives a cinematic "weighted" follow feel.
 */
export const SCRUB = 1.2
export const MOBILE_BREAKPOINT_PX = 768

/** Canvas bokeh particle system */
export const PARTICLES = {
  COUNT:       24,
  CSS_BLUR:    64,    // px — CSS filter on canvas element (GPU, cheap)
  R_MIN:       55,    // minimum circle radius px
  R_MAX:       190,   // maximum circle radius px
  ALPHA_MIN:   0.055,
  ALPHA_MAX:   0.22,
  SPEED_Y_MIN: 0.00007,
  SPEED_Y_MAX: 0.00020,
  SPEED_X_MAX: 0.00012,
} as const
