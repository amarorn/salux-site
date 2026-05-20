import { ArrowUpRight, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSpotlight } from '@/components/useSpotlight'

export type CapabilityCardProps = {
  code: string
  name: string
  desc: string
  icon: LucideIcon
  accent?: 'primary' | 'accent'
  image?: string
  logo?: string
  href?: string
  ctaLabel?: string
}

/**
 * CapabilityCard — estilo institucional (PDF home):
 * - Foto no topo (aspect 4:3) com logo do produto sobreposto (canto inf esq)
 * - Faixa azul-clara embaixo com título + descrição curta
 * - Hover Apple-tier: scale 1.01 + lift 2px + sombra suave
 */
export function CapabilityCard({
  code,
  name,
  desc,
  icon: Icon,
  accent = 'primary',
  image,
  logo,
  href = '#contato',
  ctaLabel = 'Conhecer capacidade',
}: CapabilityCardProps) {
  const accentClass = accent === 'primary' ? 'text-primary' : 'text-accent'
  const spotRef = useSpotlight<HTMLAnchorElement>()

  return (
    <Link
      ref={spotRef}
      to={href ?? '#contato'}
      className="spotlight group relative flex flex-col rounded-2xl overflow-hidden bg-card ring-1 ring-border transition-[transform,box-shadow] duration-300 ease-out will-change-transform hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-24px_rgba(15,30,60,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
    >
      {/* Foto topo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {image ? (
          <img
            src={image}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className={`absolute inset-0 flex items-center justify-center ${accentClass}`}>
            <Icon className="w-16 h-16 opacity-50" strokeWidth={1.2} />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
        {logo && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="inline-flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm ring-1 ring-black/5">
              <img
                src={logo}
                alt={code}
                className="h-5 w-auto max-w-[140px] object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* Faixa azul-clara embaixo */}
      <div className="flex flex-col flex-1 bg-primary/5 p-6">
        {!logo && (
          <span className="font-mono text-2xs uppercase tracking-label text-primary/80">{code}</span>
        )}
        <h3 className={`${logo ? '' : 'mt-2'} font-display text-xl leading-tight text-balance text-primary`}>
          {name}
        </h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed text-pretty flex-1 line-clamp-4">
          {desc}
        </p>
        <div className="mt-5 flex items-center text-sm text-primary group-hover:text-primary/80 transition-colors">
          <span>{ctaLabel}</span>
          <ArrowUpRight
            className="w-4 h-4 ml-1 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </div>
      </div>
    </Link>
  )
}
