import { ArrowUpRight, type LucideIcon } from 'lucide-react'
import { useSpotlight } from './useSpotlight'

export type CapabilityCardProps = {
  code: string
  name: string
  desc: string
  icon: LucideIcon
  accent?: 'primary' | 'accent'
  logo?: string
  href?: string
  ctaLabel?: string
}

/**
 * CapabilityCard
 * --------------
 * Card de capacidade do Ecossistema Salux. Inclui:
 * - Spotlight cursor-following (via useSpotlight + classe .spotlight)
 * - Ícone categórico tingido (primary | accent)
 * - Wordmark do produto opcional com tinting por tema
 * - CTA com animação de seta no hover
 *
 * Tokens consumidos: glass, border-gradient, text-primary/accent, logo-tint, rounded-2xl.
 */
export function CapabilityCard({
  code,
  name,
  desc,
  icon: Icon,
  accent = 'primary',
  logo,
  href = '#contato',
  ctaLabel = 'Conhecer capacidade',
}: CapabilityCardProps) {
  const accentClass = accent === 'primary' ? 'text-primary' : 'text-accent'
  const ref = useSpotlight<HTMLAnchorElement>()

  return (
    <a
      ref={ref}
      href={href}
      className="spotlight group relative rounded-2xl glass p-6 hover:bg-secondary/40 focus-visible:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition border-gradient overflow-hidden flex flex-col"
    >
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className={`w-11 h-11 rounded-xl glass flex items-center justify-center shrink-0 ${accentClass}`}>
          <Icon className="w-5 h-5" aria-hidden />
        </div>
        {logo ? (
          <img src={logo} alt={code} className="h-7 max-w-[130px] object-contain logo-tint" />
        ) : (
          <span className="font-mono text-2xs uppercase tracking-label text-muted-foreground text-right max-w-[130px]">
            {code}
          </span>
        )}
      </div>

      <h3 className="relative z-10 mt-5 font-display text-2xl leading-tight text-balance">{name}</h3>
      <p className="relative z-10 mt-3 text-sm text-muted-foreground leading-relaxed text-pretty flex-1">{desc}</p>

      <div className="relative z-10 mt-5 flex items-center text-sm text-muted-foreground group-hover:text-primary transition">
        {ctaLabel}
        <ArrowUpRight
          className="w-4 h-4 ml-1 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition"
          aria-hidden
        />
      </div>
    </a>
  )
}
