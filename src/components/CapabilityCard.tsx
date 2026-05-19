import { ArrowUpRight, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
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
 * Card de capacidade do Ecossistema Salux. Tratamento "pixila-like":
 * - Hover: cresce (scale 1.03), eleva (sombra + z-10), emerge visual
 *   gigante do produto no fundo (logo escalado e mais opaco)
 * - Spotlight cursor-following mantido como brilho diagonal
 * - Card sem logo: usa o ícone categórico enlarged como visual de fundo
 *
 * Tokens consumidos: glass, border-gradient, text-primary/accent, logo-tint.
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
    <Link
      ref={ref as React.Ref<HTMLAnchorElement>}
      to={href ?? '#contato'}
      className="spotlight group relative rounded-2xl glass p-6 hover:bg-secondary/50 focus-visible:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition-all duration-500 ease-out border-gradient overflow-hidden flex flex-col will-change-transform hover:scale-[1.03] hover:-translate-y-1 hover:z-10 hover:shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.35),0_10px_30px_-12px_hsl(var(--primary)/0.2)]"
    >
      {/* Visual de fundo que emerge no hover (logo do produto enlarged) */}
      {logo ? (
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none" aria-hidden>
          <div className="absolute inset-y-[16%] left-[16%] right-[-8%]">
            <img
              src={logo}
              alt=""
              className="logo-watermark absolute inset-0 h-full w-full max-w-none object-contain object-right-bottom opacity-0 transition-all duration-700 ease-out group-hover:translate-x-1 group-hover:scale-[1.03] group-hover:opacity-100"
              style={{ transformOrigin: 'bottom right' }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/76 to-background/10 transition-opacity duration-500 group-hover:via-background/58" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/82 via-background/18 to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none" aria-hidden>
          <Icon
            className={`absolute -right-6 -bottom-6 w-48 h-48 opacity-0 group-hover:opacity-[0.12] transition-all duration-700 ease-out group-hover:scale-110 ${accentClass}`}
            strokeWidth={1}
          />
        </div>
      )}

      {/* Glow radial extra que aparece no hover */}
      <div
        className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-primary/0 group-hover:bg-primary/15 blur-3xl transition-all duration-700 pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className={`w-14 h-14 rounded-2xl glass flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${accentClass}`}>
          <Icon className="w-6 h-6" aria-hidden />
        </div>
        {logo ? (
          <img
            src={logo}
            alt={code}
            className="h-7 max-w-[130px] object-contain logo-tint transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-85"
          />
        ) : (
          <span className="font-mono text-2xs uppercase tracking-label text-muted-foreground text-right max-w-[130px] transition-opacity duration-500 group-hover:opacity-0">
            {code}
          </span>
        )}
      </div>

      <h3 className="relative z-10 mt-5 font-display text-2xl leading-tight text-balance transition-transform duration-500 group-hover:translate-x-1">
        {name}
      </h3>
      <p className="relative z-10 mt-3 text-sm text-muted-foreground leading-relaxed text-pretty flex-1 line-clamp-3">
        {desc}
      </p>

      {logo && (
        <div className="relative z-10 mt-4 h-8 overflow-hidden">
          <img
            src={logo}
            alt=""
            aria-hidden
            className="ml-auto h-8 max-w-[170px] object-contain logo-tint opacity-0 translate-y-3 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100"
          />
        </div>
      )}

      <div className="relative z-10 mt-5 flex items-center text-sm text-muted-foreground group-hover:text-primary transition">
        <span className="transition-transform duration-500 group-hover:translate-x-1">{ctaLabel}</span>
        <ArrowUpRight
          className="w-4 h-4 ml-1 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1.5 group-hover:scale-110"
          aria-hidden
        />
      </div>
    </Link>
  )
}
