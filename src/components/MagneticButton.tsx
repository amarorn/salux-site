import { useEffect, useRef, type ReactNode } from 'react'

export type MagneticButtonProps = {
  children: ReactNode
  /** Intensidade da atração (0–1). Default 0.25 — sutil e profissional. */
  strength?: number
  /** Distância máxima em pixels que o botão se desloca. Default 12. */
  maxOffset?: number
  className?: string
}

/**
 * MagneticButton
 * --------------
 * Wrapper que faz o conteúdo (geralmente um <Button>) "atrair" suavemente
 * o cursor enquanto ele se aproxima — efeito delicado tipo Linear/Vercel.
 *
 * - rAF-throttled para performance
 * - transform com ease-out 300ms para suavizar
 * - snap back gracioso no mouseleave
 * - Respeita prefers-reduced-motion (desabilita transform)
 */
export function MagneticButton({
  children,
  strength = 0.25,
  maxOffset = 12,
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      const clampedX = Math.max(-maxOffset, Math.min(maxOffset, dx))
      const clampedY = Math.max(-maxOffset, Math.min(maxOffset, dy))
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`
      })
    }
    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame)
      el.style.transform = ''
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [strength, maxOffset])

  return (
    <div ref={ref} className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}>
      {children}
    </div>
  )
}
