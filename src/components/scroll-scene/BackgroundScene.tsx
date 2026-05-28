import { useRef, useEffect, type RefObject } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BG_PALETTE, PARTICLES } from '@/config/animation.config'

// ─── Helpers ───────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function samplePalette(progress: number) {
  const stages = BG_PALETTE.length - 1
  const raw    = Math.min(progress * stages, stages - 0.0001)
  const stage  = Math.floor(raw)
  const t      = raw - stage
  const from   = BG_PALETTE[stage]
  const to     = BG_PALETTE[stage + 1]
  return {
    h1: lerp(from[0], to[0], t),
    s1: lerp(from[1], to[1], t),
    l1: lerp(from[2], to[2], t),
    h2: lerp(from[3], to[3], t),
    s2: lerp(from[4], to[4], t),
    l2: lerp(from[5], to[5], t),
  }
}

// ─── Particle type ─────────────────────────────────────────────────────────

type Blob = {
  x: number        // 0–1 normalized X
  y: number        // 0–1 normalized Y
  r: number        // radius in px
  vx: number       // px/frame velocity (normalised)
  vy: number       // drifts upward (negative)
  alpha: number    // [ALPHA_MIN, ALPHA_MAX]
  hueOffset: number // added to base hue for variety
}

function createBlobs(count: number): Blob[] {
  const { R_MIN, R_MAX, ALPHA_MIN, ALPHA_MAX, SPEED_Y_MIN, SPEED_Y_MAX, SPEED_X_MAX } = PARTICLES
  return Array.from({ length: count }, () => ({
    x:          Math.random(),
    y:          Math.random(),
    r:          R_MIN + Math.random() * (R_MAX - R_MIN),
    vx:         (Math.random() - 0.5) * SPEED_X_MAX,
    vy:         -(SPEED_Y_MIN + Math.random() * (SPEED_Y_MAX - SPEED_Y_MIN)),
    alpha:      ALPHA_MIN + Math.random() * (ALPHA_MAX - ALPHA_MIN),
    hueOffset:  (Math.random() - 0.5) * 55,
  }))
}

// ─── Component ─────────────────────────────────────────────────────────────

type Props = {
  /** The 500vh scroll container — used for ScrollTrigger.trigger */
  containerRef: RefObject<HTMLElement | null>
}

/**
 * BackgroundScene
 * ───────────────
 * Fixed full-viewport background composed of three layers:
 *
 *  1. Gradient div  — HSL radial gradients interpolated across the BG_PALETTE
 *                     as scroll progresses. Updated via GSAP ScrollTrigger onUpdate
 *                     (direct style mutation — no React state, no re-renders).
 *
 *  2. Particle canvas — ~24 large blurry circles (bokeh) drifting upward.
 *                       CSS filter:blur applied to the whole canvas element
 *                       (single GPU pass, cheaper than per-blob shadowBlur).
 *                       Colors track scroll-driven hue in real time.
 *
 *  3. Vignette + grain overlays for cinematic depth.
 */
export function BackgroundScene({ containerRef }: Props) {
  const gradientRef  = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const rafRef       = useRef(0)
  const progressRef  = useRef(0)
  const blobsRef     = useRef<Blob[]>(createBlobs(PARTICLES.COUNT))

  // ─── Gradient: GSAP ScrollTrigger (direct style mutation) ────────────────
  useEffect(() => {
    const bg = gradientRef.current
    const container = containerRef.current
    if (!bg || !container) return

    // Set initial gradient immediately
    const { h1, s1, l1, h2, s2, l2 } = samplePalette(0)
    bg.style.background = buildGradient(h1, s1, l1, h2, s2, l2)

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: ({ progress }) => {
        progressRef.current = progress
        const c = samplePalette(progress)
        bg.style.background = buildGradient(c.h1, c.s1, c.l1, c.h2, c.s2, c.l2)
      },
    })

    return () => st.kill()
  }, [containerRef])

  // ─── Particle canvas: rAF loop ────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let W = 0
    let H = 0

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(document.documentElement)

    const blobs = blobsRef.current

    const render = () => {
      rafRef.current = requestAnimationFrame(render)
      ctx.clearRect(0, 0, W, H)

      const { h1 } = samplePalette(progressRef.current)

      blobs.forEach((b) => {
        // Drift
        b.x += b.vx
        b.y += b.vy

        // Wrap
        if (b.y < -(b.r / H + 0.05)) { b.y = 1 + b.r / H; b.x = Math.random() }
        if (b.x < -0.15) b.x = 1.15
        if (b.x >  1.15) b.x = -0.15

        ctx.globalAlpha = b.alpha
        ctx.fillStyle   = `hsl(${h1 + b.hueOffset} 78% 74%)`
        ctx.beginPath()
        ctx.arc(b.x * W, b.y * H, b.r, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    render()

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      {/* Layer 1 — animated HSL gradient */}
      <div
        ref={gradientRef}
        className="absolute inset-0"
        style={{ willChange: 'background', transform: 'translate3d(0,0,0)' }}
      />

      {/* Layer 2 — bokeh particle canvas (CSS-blurred) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          filter: `blur(${PARTICLES.CSS_BLUR}px) brightness(1.18)`,
          transform: 'translate3d(0,0,0)',
          willChange: 'filter',
        }}
      />

      {/* Layer 3 — radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 72% 72% at 50% 50%, transparent 38%, rgba(0,0,0,0.62) 100%)',
        }}
      />

      {/* Layer 4 — film grain */}
      <div
        className="absolute inset-0 mix-blend-overlay pointer-events-none"
        style={{
          opacity: 0.042,
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.88%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>")',
        }}
      />
    </div>
  )
}

// ─── Gradient builder ───────────────────────────────────────────────────────

function buildGradient(
  h1: number, s1: number, l1: number,
  h2: number, s2: number, l2: number,
) {
  return [
    `radial-gradient(ellipse 95% 65% at 22% 26%, hsl(${h1} ${s1}% ${l1}%) 0%, transparent 62%)`,
    `radial-gradient(ellipse 60% 90% at 80% 74%, hsl(${h1 + 14} ${s1 - 7}% ${l1 - 7}%) 0%, transparent 58%)`,
    `hsl(${h2} ${s2}% ${l2}%)`,
  ].join(', ')
}
