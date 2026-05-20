import { useState } from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { SaluxSymbol } from './SaluxLogo'

export type WheelNode = {
  k: string
  t: string
  i: LucideIcon
}

/**
 * JourneyWheel — fluxograma circular da jornada do paciente.
 * 7 nodes posicionados em círculo ao redor de um core central (símbolo Salux).
 * Hover/foco no node revela rótulo. Acessível via keyboard.
 */
export function JourneyWheel({ nodes }: { nodes: WheelNode[] }) {
  const [active, setActive] = useState(0)
  const radius = 38 // %

  return (
    <div className="relative aspect-square w-full max-w-[520px] mx-auto">
      {/* anéis de fundo */}
      <div className="absolute inset-0 rounded-full border border-border" />
      <div className="absolute inset-[14%] rounded-full border border-border/60" />
      <div className="absolute inset-[26%] rounded-full border border-border/40" />

      {/* linhas radiais do centro pra cada node */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" aria-hidden>
        {nodes.map((_, i) => {
          const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2
          const x = 50 + radius * Math.cos(angle)
          const y = 50 + radius * Math.sin(angle)
          return (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="hsl(var(--primary))"
              strokeOpacity={active === i ? 0.5 : 0.12}
              strokeWidth={active === i ? 0.4 : 0.2}
              style={{ transition: 'stroke-opacity 300ms ease-out, stroke-width 300ms ease-out' }}
            />
          )
        })}
      </svg>

      {/* nodes */}
      {nodes.map((n, i) => {
        const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2
        const x = 50 + radius * Math.cos(angle)
        const y = 50 + radius * Math.sin(angle)
        const Ic = n.i
        const isActive = active === i
        return (
          <button
            key={n.k}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            style={{ left: `${x}%`, top: `${y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group focus-visible:outline-none"
            aria-label={n.k}
          >
            <motion.span
              animate={{ scale: isActive ? 1.08 : 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className={`relative flex items-center justify-center w-12 h-12 rounded-full ring-1 transition-colors duration-300 ${
                isActive
                  ? 'bg-primary text-primary-foreground ring-primary shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.6)]'
                  : 'bg-card text-primary ring-border'
              }`}
            >
              <Ic className="w-5 h-5" />
            </motion.span>
          </button>
        )
      })}

      {/* core central */}
      <div className="absolute inset-[34%] rounded-full bg-primary/10 ring-1 ring-primary/30 flex items-center justify-center">
        <SaluxSymbol className="w-12 h-12 text-primary" />
      </div>

      {/* label do node ativo, abaixo da roda */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 w-[80%] text-center">
        <div className="font-mono text-2xs uppercase tracking-label text-primary mb-1">
          Etapa {String(active + 1).padStart(2, '0')}
        </div>
        <div className="font-display text-lg text-foreground">{nodes[active].k}</div>
        <p className="mt-1 text-xs text-muted-foreground">{nodes[active].t}</p>
      </div>
    </div>
  )
}
