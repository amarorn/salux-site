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
      className="spotlight group relative rounded-2xl glass p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition-[transform,box-shadow,background-color] duration-300 ease-out border-gradient overflow-hidden flex flex-col will-change-transform hover:bg-secondary/30 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.55)]"
    >
      {logo && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none" aria-hidden>
          <div className="absolute inset-y-[20%] left-[20%] right-[-4%]">
            <img
              src={logo}
              alt=""
              className="logo-watermark absolute inset-0 h-full w-full max-w-none object-contain object-right-bottom opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-[0.45]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        </div>
      )}

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className={`w-14 h-14 rounded-2xl glass flex items-center justify-center shrink-0 ${accentClass}`}>
          <Icon className="w-6 h-6" aria-hidden />
        </div>
        {logo ? (
          <img
            src={logo}
            alt={code}
            className="h-7 max-w-[130px] object-contain logo-tint"
          />
        ) : (
          <span className="font-mono text-2xs uppercase tracking-label text-muted-foreground text-right max-w-[130px]">
            {code}
          </span>
        )}
      </div>

      <h3 className="relative z-10 mt-5 font-display text-2xl leading-tight text-balance">
        {name}
      </h3>
      <p className="relative z-10 mt-3 text-sm text-muted-foreground leading-relaxed text-pretty flex-1 line-clamp-3">
        {desc}
      </p>

      <div className="relative z-10 mt-5 flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        <span>{ctaLabel}</span>
        <ArrowUpRight
          className="w-4 h-4 ml-1 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </div>
    </Link>
  )
}
