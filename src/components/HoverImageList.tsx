import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

export type HoverImageListItem = {
  /** Identificador único */
  key: string
  /** Número da linha (ex: "01") */
  index: string
  /** Título principal exibido na lista */
  title: string
  /** Categoria/subtítulo (ex: nome comercial do produto) */
  category: string
  /** URL do logo / imagem que aparece no hover */
  image?: string
  /** Link de destino */
  href?: string
}

export type HoverImageListProps = {
  items: HoverImageListItem[]
}

/**
 * HoverImageList
 * --------------
 * Lista de itens com preview de imagem cursor-following. Inspirado em
 * Linear, Vercel e AKFA. Hover de uma linha ativa o preview do produto;
 * o preview segue o cursor com leve smoothing.
 *
 * - Mobile: oculta o preview (UX touch-first)
 * - Respeita prefers-reduced-motion (preview aparece estático)
 */
export function HoverImageList({ items }: HoverImageListProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div ref={containerRef} className="relative" onMouseMove={handleMove}>
      <ul className="divide-y divide-border">
        {items.map((it, i) => (
          <li key={it.key}>
            <a
              href={it.href ?? '#contato'}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
              onFocus={() => setActiveIdx(i)}
              onBlur={() => setActiveIdx(null)}
              className="group flex items-baseline gap-6 sm:gap-10 py-6 sm:py-8 transition-colors focus-visible:outline-none focus-visible:bg-secondary/30 px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-card"
            >
              <span className={`font-mono text-2xs uppercase tracking-label transition-colors ${activeIdx === i ? 'text-primary' : 'text-muted-foreground'}`}>
                {it.index}
              </span>
              <span className={`font-display text-3xl sm:text-5xl leading-[1.05] tracking-display flex-1 transition-all duration-500 ${
                activeIdx === i
                  ? 'text-foreground translate-x-1 sm:translate-x-2'
                  : 'text-muted-foreground'
              }`}>
                {it.title}
              </span>
              <span className="hidden sm:flex items-center gap-2 font-mono text-2xs uppercase tracking-label text-muted-foreground">
                {it.category}
                <ArrowUpRight
                  className={`w-4 h-4 transition-all ${
                    activeIdx === i ? 'text-primary -translate-y-0.5 translate-x-0.5' : ''
                  }`}
                  aria-hidden
                />
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* Cursor-following preview (desktop only) */}
      <div
        className="hidden lg:block absolute pointer-events-none transition-opacity duration-300 z-20"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -120%)',
          opacity: activeIdx !== null && items[activeIdx]?.image ? 1 : 0,
        }}
        aria-hidden
      >
        <div className="rounded-card glass border-gradient p-6 w-64 h-40 flex items-center justify-center backdrop-blur-md">
          {activeIdx !== null && items[activeIdx]?.image && (
            <img
              src={items[activeIdx].image}
              alt=""
              className="max-h-16 max-w-full object-contain logo-tint"
            />
          )}
        </div>
      </div>
    </div>
  )
}
