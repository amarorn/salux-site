import { useEffect, useRef, useState } from 'react'

export type VideoBackgroundProps = {
  /** URL do MP4 (fallback Safari) */
  mp4: string
  /** URL do WebM (preferido por Chromium/Firefox) */
  webm?: string
  /** Imagem poster (mostrada antes do play e em fallback de reduced-motion/data) */
  poster: string
  /** Opacidade do vídeo */
  opacity?: number
  /** Classe adicional para a tag <video> */
  className?: string
  /** Position object (default center) */
  objectPosition?: string
}

/**
 * VideoBackground
 * ---------------
 * Vídeo decorativo em background, com fallbacks corretos:
 * - prefers-reduced-motion → mostra apenas o poster, não dá play
 * - prefers-reduced-data (Save-Data) → mostra apenas o poster
 * - Safari → usa MP4 / Chromium → usa WebM (via <source> order)
 * - autoplay + muted + playsInline (requisitos para autoplay em mobile)
 *
 * O componente em si é absolute inset-0 — coloque dentro de um wrapper
 * absoluto/relativo (ex: a div inset-0 -z-10 do hero/section).
 */
export function VideoBackground({
  mp4,
  webm,
  poster,
  opacity = 1,
  className = '',
  objectPosition = 'center',
}: VideoBackgroundProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [shouldPlay, setShouldPlay] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // @ts-expect-error — Save-Data not in lib.dom types but widely supported
    const saveData = !!(navigator.connection && navigator.connection.saveData)
    if (reducedMotion || saveData) return
    setShouldPlay(true)
  }, [])

  return (
    <video
      ref={ref}
      poster={poster}
      autoPlay={shouldPlay}
      loop
      muted
      playsInline
      preload={shouldPlay ? 'auto' : 'metadata'}
      className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${className}`}
      style={{ opacity, objectPosition }}
      aria-hidden
    >
      {webm && <source src={webm} type="video/webm" />}
      <source src={mp4} type="video/mp4" />
    </video>
  )
}
