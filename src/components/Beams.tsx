type BeamsProps = {
  className?: string
  /** Origem dos raios — base (do chão pra cima) ou top (do topo pra baixo) */
  origin?: 'base' | 'top'
  /** Intensidade geral */
  intensity?: number
}

/**
 * Beams
 * -----
 * Feixes de luz sutis irradiando de um ponto. Inspira "ativação" /
 * "ignição" de inteligência. Usado em seções de destaque (Initia).
 *
 * - Conic gradient mascarado por radial fade
 * - 2 camadas com rotações opostas para evitar visual estático
 * - GPU-composited, pura CSS
 */
export function Beams({ className = '', origin = 'base', intensity = 1 }: BeamsProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity: intensity }}
      aria-hidden
    >
      <div className={`beams-layer beams-${origin} beams-cw`} />
      <div className={`beams-layer beams-${origin} beams-ccw`} />
      <div className={`beams-glow beams-${origin}`} />
    </div>
  )
}
