import { ArrowUpRight, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSpotlight } from './useSpotlight'

export type BigCapabilityCardProps = {
  code: string
  name: string
  desc: string
  icon: LucideIcon
  accent?: 'primary' | 'accent'
  logo?: string
  /** URL da imagem hero (webp preferido, jpg fallback via picture) */
  image: string
  imageWebp?: string
  /** Slug de destino (ex: /produto/initia) */
  href: string
  ctaLabel?: string
  /** Aspect ratio do card — 'wide' = 2 colunas, 'tall' = 1 coluna mas mais alta */
  variant?: 'wide' | 'tall'
}

/**
 * BigCapabilityCard
 * -----------------
 * Card destacado de capacidade, ocupando mais espaço no bento grid e
 * usando imagem hero como visual principal (não wordmark). Tratamento
 * editorial: imagem ocupa metade/topo, conteúdo sobre overlay com
 * gradient navy-to-transparent.
 *
 * - Hover: imagem scale 1.05 + content lift + glow
 * - Spotlight cursor-following mantido
 * - Logo do produto aparece como badge se fornecido
 */
export function BigCapabilityCard({
  code,
  name,
  desc,
  icon: Icon,
  accent = 'primary',
  logo,
  image,
  imageWebp,
  href,
  ctaLabel = 'Conhecer solução',
  variant = 'wide',
}: BigCapabilityCardProps) {
  const accentClass = accent === 'primary' ? 'text-primary' : 'text-accent'
  const ref = useSpotlight<HTMLAnchorElement>()

  return (
    <Link
      ref={ref as React.Ref<HTMLAnchorElement>}
      to={href}
      className={`spotlight group relative rounded-2xl glass border-gradient overflow-hidden flex ${
        variant === 'wide' ? 'flex-col lg:flex-row min-h-[320px]' : 'flex-col min-h-[460px]'
      } will-change-transform transition-all duration-500 ease-out hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60`}
    >
      {/* Imagem hero */}
      <div className={`relative overflow-hidden ${variant === 'wide' ? 'lg:w-1/2 h-56 lg:h-auto' : 'h-56'}`}>
        <picture>
          {imageWebp && <source srcSet={imageWebp} type="image/webp" />}
          <img
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </picture>
        {/* Overlay para garantir contraste */}
        <div className={`absolute inset-0 ${
          variant === 'wide'
            ? 'bg-gradient-to-r from-background/40 via-background/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-background/20 lg:to-background'
            : 'bg-gradient-to-b from-background/20 via-background/60 to-background'
        }`} />
      </div>

      {/* Conteúdo */}
      <div className={`relative z-10 p-6 lg:p-8 flex flex-col ${variant === 'wide' ? 'lg:w-1/2' : 'flex-1'}`}>
        <div className="flex items-start justify-between gap-4">
          <div className={`w-12 h-12 rounded-xl glass flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 ${accentClass}`}>
            <Icon className="w-5 h-5" aria-hidden />
          </div>
          {logo && (
            <img
              src={logo}
              alt={code}
              className="h-7 max-w-[140px] object-contain logo-tint opacity-90"
            />
          )}
        </div>

        <h3 className="mt-6 font-display text-2xl lg:text-3xl leading-tight text-balance">
          {name}
        </h3>
        <p className="mt-3 text-sm lg:text-base text-muted-foreground leading-relaxed text-pretty flex-1">
          {desc}
        </p>

        <div className="mt-6 flex items-center text-sm font-medium text-foreground group-hover:text-primary transition">
          <span className="transition-transform duration-500 group-hover:translate-x-1">{ctaLabel}</span>
          <ArrowUpRight
            className="w-4 h-4 ml-1.5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1.5 group-hover:scale-110"
            aria-hidden
          />
        </div>
      </div>
    </Link>
  )
}
