import { forwardRef } from 'react'

type Props = {
  word: string
  /** Extra Tailwind / CSS classes for one-off overrides */
  className?: string
}

/**
 * AnimatedWord — pure display component.
 *
 * Renders a fixed, viewport-centered word. Animation state (scale, opacity,
 * blur) is driven externally by GSAP via the forwarded ref — this component
 * holds no animation logic of its own.
 *
 * GPU hints applied:
 *  - will-change: transform, opacity, filter
 *  - translate3d(0,0,0) forces layer promotion
 *  - contain: strict prevents layout recalculations
 */
export const AnimatedWord = forwardRef<HTMLDivElement, Props>(
  ({ word, className = '' }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none select-none fixed inset-0 flex items-center justify-center ${className}`}
      style={{
        willChange: 'transform, opacity, filter',
        transform: 'translate3d(0,0,0)',
        contain: 'strict',
        zIndex: 20,
      }}
    >
      <span
        className="text-white leading-none whitespace-nowrap imaga-word"
        style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(5rem, 18vw, 25rem)',
          // Subtle glow — matches bokeh colour temperature
          textShadow: '0 0 80px rgba(255,255,255,0.18), 0 0 200px rgba(255,255,255,0.08)',
        }}
      >
        {word}
      </span>
    </div>
  ),
)

AnimatedWord.displayName = 'AnimatedWord'
