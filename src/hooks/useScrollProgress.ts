import { useEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Tracks [0–1] scroll progress of a container element via GSAP ScrollTrigger.
 *
 * Returns a mutable ref (no React state updates → zero re-renders).
 * Pass `onUpdate` for imperative side-effects driven by scroll position.
 *
 * SSR-safe: all DOM access is deferred to useEffect.
 */
export function useScrollProgress(
  containerRef: RefObject<HTMLElement | null>,
  onUpdate?: (progress: number) => void,
): RefObject<number> {
  const progressRef = useRef(0)
  const callbackRef = useRef(onUpdate)
  callbackRef.current = onUpdate

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: ({ progress }) => {
        progressRef.current = progress
        callbackRef.current?.(progress)
      },
    })

    return () => st.kill()
  }, [containerRef])

  return progressRef
}
