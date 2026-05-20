import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'

export type NarrativeChapter = {
  tag: string
  number: string
  title: string
  body: string
}

// ─── Orb visual (right side) ───────────────────────────────────────────────

function OrbLayer({
  index,
  total,
  scrollYProgress,
}: {
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const start = index / total
  const end = (index + 1) / total
  const mid = (start + end) / 2
  // Fade window proporcional ao tamanho do segmento (evita offsets invertidos quando total alto)
  const fade = Math.min(0.12, (end - start) * 0.35)

  const opacity = useTransform(
    scrollYProgress,
    [start, start + fade, end - fade, end],
    [0, 1, 1, 0],
  )
  const scale = useTransform(scrollYProgress, [start, mid, end], [0.88, 1, 0.88])
  const ringCount = index + 1

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div className="relative" style={{ width: 'min(42vw, 480px)', aspectRatio: '1' }}>
        {/* Core glow — boosted (estava fraco demais antes) */}
        <div className="absolute rounded-full bg-primary"
          style={{ inset: '28%', filter: 'blur(70px)', opacity: 0.9 }} />
        <div className="absolute rounded-full bg-accent"
          style={{ inset: '38%', filter: 'blur(40px)', opacity: 0.7 }} />
        <div className="absolute rounded-full bg-primary"
          style={{ inset: '44%', filter: 'blur(18px)', opacity: 0.95 }} />

        {/* Rings — count = level number */}
        {Array.from({ length: ringCount }, (_, r) => (
          <div
            key={r}
            className="absolute rounded-full border border-primary/40"
            style={{
              inset: `${6 + r * 11}%`,
              animationName: 'ring-pulse',
              animationDuration: `${3 + r * 0.4}s`,
              animationTimingFunction: 'ease-in-out',
              animationDelay: `${r * 0.45}s`,
              animationIterationCount: 'infinite',
            }}
          />
        ))}

        {/* Outer ambient — boosted */}
        <div className="absolute inset-0 rounded-full"
          style={{ background: 'hsl(var(--primary)/0.18)', filter: 'blur(80px)' }} />
      </div>
    </motion.div>
  )
}

// ─── Single chapter text panel ─────────────────────────────────────────────

function Chapter({
  chapter,
  index,
  total,
  scrollYProgress,
}: {
  chapter: NarrativeChapter
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const start = index / total
  const end = (index + 1) / total
  const fade = Math.min(0.1, (end - start) * 0.35)

  const opacity = useTransform(
    scrollYProgress,
    [start, start + fade, end - fade, end],
    [0, 1, 1, 0],
  )
  const y = useTransform(scrollYProgress, [start, end], ['3vh', '-3vh'])

  return (
    <>
      <OrbLayer index={index} total={total} scrollYProgress={scrollYProgress} />

      <motion.div
        style={{ opacity, y }}
        className="absolute inset-0 flex items-center"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 w-full
                        grid lg:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full
                             bg-primary/15 ring-1 ring-primary/30
                             px-3 py-1 font-mono text-2xs uppercase tracking-widest
                             text-primary mb-8 block w-fit">
              {chapter.tag}
            </span>

            <div
              className="font-display leading-none tracking-tighter
                         text-primary/15 select-none"
              style={{ fontSize: 'clamp(5rem, 14vw, 11rem)' }}
            >
              {chapter.number}
            </div>

            <h3
              className="font-display leading-[1.04] tracking-tight text-foreground mt-1"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}
            >
              {chapter.title}
            </h3>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
              {chapter.body}
            </p>
          </div>

          {/* Right: filled by OrbLayer absolutely */}
          <div className="hidden lg:block" />
        </div>
      </motion.div>
    </>
  )
}

// ─── Progress dot ──────────────────────────────────────────────────────────

function ProgressDot({
  index,
  total,
  scrollYProgress,
}: {
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const start = index / total
  const end = (index + 1) / total
  const active = useTransform(
    scrollYProgress,
    [start, start + 0.08, end - 0.08, end],
    [0.25, 1, 1, 0.25],
  )
  const scale = useTransform(
    scrollYProgress,
    [start, start + 0.08, end - 0.08, end],
    [0.5, 1, 1, 0.5],
  )

  return (
    <motion.div
      style={{ opacity: active, scale }}
      className="w-1.5 h-1.5 rounded-full bg-primary"
    />
  )
}

// ─── Mobile chapter card ────────────────────────────────────────────────────

function MobileChapter({ chapter }: { chapter: NarrativeChapter }) {
  return (
    <div className="py-12 border-b border-border last:border-0">
      <span className="inline-flex items-center rounded-full bg-primary/10 ring-1 ring-primary/20
                       px-3 py-1 font-mono text-2xs uppercase tracking-widest text-primary mb-5 block w-fit">
        {chapter.tag}
      </span>
      <div className="font-display text-6xl tracking-tighter text-primary/20 leading-none">
        {chapter.number}
      </div>
      <h3 className="font-display text-3xl leading-tight tracking-tight text-foreground mt-1">
        {chapter.title}
      </h3>
      <p className="mt-4 text-base text-muted-foreground leading-relaxed">{chapter.body}</p>
    </div>
  )
}

// ─── Main export ────────────────────────────────────────────────────────────

type Props = {
  eyebrow: string
  headline: string
  chapters: NarrativeChapter[]
  className?: string
}

export function StickyNarrative({ eyebrow, headline, chapters, className = '' }: Props) {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const progressScaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 22 })

  return (
    <section className={`relative bg-background text-foreground ${className}`}>
      {/* Mobile layout */}
      <div className="lg:hidden mx-auto max-w-3xl px-6 py-20">
        <span className="inline-flex items-center rounded-full bg-primary/10 ring-1 ring-primary/20
                         px-3 py-1 font-mono text-2xs uppercase tracking-widest text-primary mb-6 block w-fit">
          {eyebrow}
        </span>
        <h2 className="font-display text-4xl leading-tight tracking-tight text-balance mb-12">
          {headline}
        </h2>
        {chapters.map((c) => <MobileChapter key={c.number} chapter={c} />)}
      </div>

      {/* Desktop sticky scroll */}
      <div
        ref={containerRef}
        className="hidden lg:block"
        style={{ height: `${chapters.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-background">
          {/* Grain texture */}
          <div
            className="absolute inset-0 pointer-events-none z-30 opacity-[0.025] mix-blend-overlay"
            style={{
              backgroundImage:
                'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>")',
            }}
          />

          {/* Section header — fades out as you scroll in */}
          {!reduced && (
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
                y: useTransform(scrollYProgress, [0, 0.08], [0, -24]),
              }}
              className="absolute top-16 left-0 right-0 z-20 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10"
            >
              <span className="inline-flex items-center rounded-full bg-primary/10 ring-1 ring-primary/20
                               px-3 py-1 font-mono text-2xs uppercase tracking-widest text-primary mb-4 block w-fit">
                {eyebrow}
              </span>
              <h2
                className="font-display leading-tight tracking-tight text-foreground max-w-3xl"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
              >
                {headline}
              </h2>
            </motion.div>
          )}

          {/* Chapters */}
          {chapters.map((chapter, i) => (
            <Chapter
              key={chapter.number}
              chapter={chapter}
              index={i}
              total={chapters.length}
              scrollYProgress={scrollYProgress}
            />
          ))}

          {/* Vertical progress dots */}
          <div className="absolute right-7 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
            {chapters.map((_, i) => (
              <ProgressDot
                key={i}
                index={i}
                total={chapters.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          {/* Horizontal progress bar */}
          <motion.div
            style={{ scaleX: progressScaleX, transformOrigin: 'left' }}
            className="absolute bottom-0 left-0 right-0 h-px bg-primary/60 z-20"
          />

          {/* Ambient depth gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40 pointer-events-none z-10" />
        </div>
      </div>
    </section>
  )
}
