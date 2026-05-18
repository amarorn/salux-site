type AuroraProps = {
  className?: string
  /** Intensidade geral (opacity multiplier 0–1) */
  intensity?: number
}

/**
 * Aurora
 * ------
 * Background animado com 3 camadas de gradientes radiais que se movem,
 * escalam e rotacionam em loop. Visual de aurora boreal em navy → cyan.
 *
 * - Pure CSS (zero dependência, zero WebGL)
 * - Respeita prefers-reduced-motion (animações pausam)
 * - mix-blend-mode: screen para somar luminosidade
 * - Performance: ~3 composited layers, GPU-only
 */
export function Aurora({ className = '', intensity = 1 }: AuroraProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity: intensity }}
      aria-hidden
    >
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-grain" />
    </div>
  )
}
