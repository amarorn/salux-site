import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Reveal — masked slide-up for headlines and copy.
 * Wraps children in overflow:hidden so the element sweeps into view
 * from below an invisible edge — classic agency/Apple text reveal.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={reduced ? false : { y: '105%', opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.78, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/**
 * RevealBlock — clip-path wipe for images, cards, or large blocks.
 * Reveals from top-to-bottom (curtain drops).
 */
export function RevealBlock({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.05 })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
      animate={inView ? { clipPath: 'inset(0 0 0% 0)', opacity: 1 } : {}}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
