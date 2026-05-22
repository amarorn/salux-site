import { useRef, useLayoutEffect, useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatedWord } from './AnimatedWord'
import { BackgroundScene } from './BackgroundScene'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import {
  SCROLL_SCENE_VH,
  SCROLL_SCENE_VH_PER_WORD,
  SCROLL_SCENE_VH_MIN,
  SCENE_WORDS,
  WORD_TIMING,
  SCALES,
  BLURS,
  SCRUB,
  MOBILE_BREAKPOINT_PX,
} from '@/config/animation.config'

gsap.registerPlugin(ScrollTrigger)

// ─── Progress dot indicator ─────────────────────────────────────────────────

function ProgressDots({
  total,
  containerRef,
}: {
  total: number
  containerRef: RefObject<HTMLElement | null>
}) {
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])
  const progressRef = useScrollProgress(containerRef)

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = requestAnimationFrame(update)
      const p = progressRef.current
      for (let i = 0; i < total; i++) {
        const dot = dotRefs.current[i]
        if (!dot) continue
        const start  = i / total
        const end    = (i + 1) / total
        const active = p >= start && p < end
        dot.style.transform = `translate3d(0,0,0) scale(${active ? 1.9 : 1})`
        dot.style.opacity   = active ? '1' : '0.28'
        dot.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease'
      }
    }

    update()
    return () => cancelAnimationFrame(raf)
  }, [progressRef, total])

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3"
      style={{ zIndex: 50 }}
      aria-hidden="true"
    >
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          ref={(el) => { dotRefs.current[i] = el }}
          className="w-1.5 h-1.5 rounded-full bg-white"
          style={{ transform: 'translate3d(0,0,0)' }}
        />
      ))}
    </div>
  )
}

// ─── Scroll progress bar ─────────────────────────────────────────────────────

function ScrollBar({ containerRef }: { containerRef: RefObject<HTMLElement | null> }) {
  const barRef      = useRef<HTMLDivElement>(null)
  const progressRef = useScrollProgress(containerRef)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = requestAnimationFrame(update)
      const bar = barRef.current
      if (bar) bar.style.transform = `translate3d(0,0,0) scaleX(${progressRef.current})`
    }
    update()
    return () => cancelAnimationFrame(raf)
  }, [progressRef])

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-px bg-white/20"
      style={{ zIndex: 50 }}
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full bg-white/70"
        style={{ transformOrigin: 'left', transform: 'translate3d(0,0,0) scaleX(0)', willChange: 'transform' }}
      />
    </div>
  )
}

// ─── Main ScrollScene ────────────────────────────────────────────────────────

/**
 * ScrollScene
 * ───────────
 * Orchestrates the full immersive scroll experience:
 *
 *  - A 500vh transparent spacer drives a GSAP master timeline via ScrollTrigger
 *  - Three AnimatedWords (COLOR / TEXTURE / SHAPE) are `position: fixed`
 *    and animated with scale + opacity + blur — all on the GPU compositor thread
 *  - BackgroundScene handles gradient interpolation and bokeh particles independently
 *  - Lenis smooth scroll is synced to GSAP via useLenis → ScrollTrigger.update
 *
 * Performance strategy:
 *  - Zero React state updates during scroll (refs + direct style mutation only)
 *  - Single GSAP master timeline (3 words × 2 tweens = 6 total tweens)
 *  - Separate rAF loops for particles and progress indicators
 *  - will-change + translate3d on all animated elements
 *  - GSAP cleanup on unmount (kills ScrollTriggers, timelines, sets)
 */
export function ScrollScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordRefs     = useRef<(HTMLDivElement | null)[]>([])
  const tlRef        = useRef<gsap.core.Timeline | null>(null)
  const vhRef        = useRef(SCROLL_SCENE_VH)

  // Keep ScrollTrigger in sync on every GSAP tick
  useEffect(() => {
    gsap.ticker.add(ScrollTrigger.update)
    return () => gsap.ticker.remove(ScrollTrigger.update)
  }, [])

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`).matches
    const words  = SCENE_WORDS
    const { ENTER_DURATION, EXIT_START } = WORD_TIMING
    const exitScale = isMobile ? SCALES.EXIT_MOBILE : SCALES.EXIT

    // ── Set initial invisible state for all words ──────────────────────────
    wordRefs.current.forEach((el) => {
      if (el) {
        gsap.set(el, {
          scale:      SCALES.INITIAL,
          autoAlpha:  0,
          filter:     `blur(${BLURS.INITIAL}px)`,
          force3D:    true,
        })
      }
    })

    // ── Master timeline ────────────────────────────────────────────────────
    // Duration = total words (each word = 1 unit, placed at integer offsets)
    const tl = gsap.timeline({ paused: true })
    tlRef.current = tl

    words.forEach((_, i) => {
      const el = wordRefs.current[i]
      if (!el) return

      const offset = i // word i starts at position i in the timeline

      // Entrance: scale up, un-blur, fade in
      tl.fromTo(
        el,
        { scale: SCALES.INITIAL, autoAlpha: 0, filter: `blur(${BLURS.INITIAL}px)` },
        {
          scale:     SCALES.PEAK,
          autoAlpha: 1,
          filter:    `blur(${BLURS.PEAK}px)`,
          letterSpacing: isMobile ? '-0.035em' : '-0.045em',
          ease:      'power2.out',
          duration:  ENTER_DURATION,
          force3D:   true,
        },
        offset,
      )

      // Exit: scale to overflow, re-blur, fade out
      tl.to(
        el,
        {
          scale:     exitScale,
          autoAlpha: 0,
          filter:    `blur(${BLURS.EXIT}px)`,
          letterSpacing: isMobile ? '0.02em' : '0.035em',
          ease:      'power3.in',
          duration:  1 - EXIT_START,
          force3D:   true,
        },
        offset + EXIT_START,
      )
    })

    // ── ScrollTrigger scrubs the master timeline ───────────────────────────
    const st = ScrollTrigger.create({
      trigger:   container,
      start:     'top top',
      end:       'bottom bottom',
      scrub:     SCRUB,
      animation: tl,
    })

    return () => {
      st.kill()
      tl.kill()
      // Reset elements to avoid stale state if component remounts
      wordRefs.current.forEach((el) => {
        if (el) gsap.set(el, { clearProps: 'all' })
      })
    }
  }, [])

  useEffect(() => {
    const applyHeight = () => {
      const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`).matches
      const computed = Math.max(
        SCROLL_SCENE_VH_MIN,
        SCENE_WORDS.length * (isMobile ? SCROLL_SCENE_VH_PER_WORD - 25 : SCROLL_SCENE_VH_PER_WORD),
      )
      vhRef.current = Math.max(computed, SCROLL_SCENE_VH)
      if (containerRef.current) {
        containerRef.current.style.height = `${vhRef.current}vh`
      }
      ScrollTrigger.refresh()
    }

    applyHeight()
    window.addEventListener('resize', applyHeight, { passive: true })
    return () => window.removeEventListener('resize', applyHeight)
  }, [])

  return (
    <>
      {/* Fixed background — gradient + particles */}
      <BackgroundScene containerRef={containerRef} />

      {/* Scroll spacer — drives the ScrollTrigger via its height */}
      <div
        ref={containerRef}
        style={{ height: `${vhRef.current}vh` }}
        aria-hidden="true"
      />

      {/* Fixed animated words */}
      {SCENE_WORDS.map((word, i) => (
        <AnimatedWord
          key={word}
          word={word}
          ref={(el) => { wordRefs.current[i] = el }}
        />
      ))}

      {/* UI chrome */}
      <ProgressDots total={SCENE_WORDS.length} containerRef={containerRef} />
      <ScrollBar containerRef={containerRef} />
    </>
  )
}
