import { useEffect, useRef } from 'react'

/**
 * useSpotlight
 * ------------
 * Hook que retorna uma ref a anexar em um elemento. Conforme o cursor
 * se move sobre ele, atualiza as CSS vars `--mx` e `--my` (em px,
 * relativos ao próprio elemento). Combine com a classe `.spotlight`
 * para mostrar um radial gradient que segue o cursor.
 *
 * Performance: 1 listener por instância, rAF-throttled.
 * Cleanup: handler removido no unmount.
 */
export function useSpotlight<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let frame = 0
    const update = (x: number, y: number) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${x - rect.left}px`)
      el.style.setProperty('--my', `${y - rect.top}px`)
    }
    const onMove = (e: MouseEvent) => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => update(e.clientX, e.clientY))
    }
    el.addEventListener('mousemove', onMove)
    return () => {
      el.removeEventListener('mousemove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return ref
}
