import { useEffect, useRef, useState } from 'react'

export type DecryptTextProps = {
  /** Texto final que será revelado */
  text: string
  /** Delay antes de iniciar a animação (ms). Default 0 */
  startDelay?: number
  /** Velocidade do scramble (ms entre frames). Default 35 */
  speed?: number
  /** Tempo total até resolver completamente (ms). Default 900 */
  duration?: number
  /** Conjunto de caracteres usados no scramble */
  charset?: string
  /** Classe CSS opcional */
  className?: string
  /** Element tag — default span (usar 'em' para itálico inline) */
  as?: 'span' | 'em' | 'strong'
}

const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·•◆◇→'

/**
 * DecryptText
 * -----------
 * Anima a revelação do texto fazendo cada caractere passar por símbolos
 * aleatórios até "resolver" no seu valor final, da esquerda para a direita.
 *
 * - Espaços, quebras de linha e símbolos permanecem fixos
 * - Só inicia quando o elemento entra no viewport (IntersectionObserver)
 * - Respeita prefers-reduced-motion (mostra texto final direto)
 * - rAF + setTimeout combinados para timing preciso
 */
export function DecryptText({
  text,
  startDelay = 0,
  speed = 35,
  duration = 900,
  charset = DEFAULT_CHARSET,
  className = '',
  as: Tag = 'span',
}: DecryptTextProps) {
  const ref = useRef<HTMLElement>(null)
  const [display, setDisplay] = useState(text)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(text)
      return
    }

    // start scrambled
    setDisplay(scramble(text, charset))

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || startedRef.current) return
          startedRef.current = true

          const chars = [...text]
          const total = chars.length
          const startTime = performance.now() + startDelay

          const tick = () => {
            const now = performance.now()
            const elapsed = now - startTime
            if (elapsed < 0) {
              requestAnimationFrame(tick)
              return
            }
            const progress = Math.min(1, elapsed / duration)
            const settled = Math.floor(progress * total)

            const next = chars
              .map((c, i) => {
                if (i < settled) return c
                if (c === ' ' || c === '\n' || c === '\t') return c
                if (/[^A-Za-zÀ-ÿ0-9]/.test(c)) return c
                return charset[Math.floor(Math.random() * charset.length)]
              })
              .join('')
            setDisplay(next)

            if (progress < 1) {
              setTimeout(() => requestAnimationFrame(tick), speed)
            } else {
              setDisplay(text)
            }
          }
          requestAnimationFrame(tick)
        })
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [text, charset, speed, duration, startDelay])

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
    </Tag>
  )
}

function scramble(text: string, charset: string): string {
  return [...text]
    .map((c) => {
      if (c === ' ' || c === '\n' || c === '\t') return c
      if (/[^A-Za-zÀ-ÿ0-9]/.test(c)) return c
      return charset[Math.floor(Math.random() * charset.length)]
    })
    .join('')
}
