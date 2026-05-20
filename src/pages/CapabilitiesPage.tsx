import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, LayoutGrid, List } from 'lucide-react'
import { CapabilityCard } from '@/components/CapabilityCard'
import { BigCapabilityCard } from '@/components/BigCapabilityCard'
import { HoverImageList, type HoverImageListItem } from '@/components/HoverImageList'
import { Eyebrow } from '@/components/Eyebrow'
import type { Capability, JourneyStageSlug } from '@/types/site'
import { journeyStages } from '@/content/journey'
import { solutionsPage } from '@/content/solutions'

type Props = {
  capabilities: Capability[]
  Nav: React.ComponentType<{ theme: 'dark' | 'light'; onToggleTheme: () => void }>
  Footer: React.ComponentType
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

const EASE = [0.22, 1, 0.36, 1] as const

export function CapabilitiesPage({ capabilities, Nav, Footer, theme, onToggleTheme }: Props) {
  const [stage, setStage] = useState<JourneyStageSlug | 'todas'>('todas')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const filtered = useMemo(() => {
    if (stage === 'todas') return capabilities
    return capabilities.filter((c) => c.journeyStages.includes(stage))
  }, [capabilities, stage])

  const listItems = useMemo<HoverImageListItem[]>(() =>
    filtered.map((c, i) => ({
      key: c.slug,
      index: String(i + 1).padStart(2, '0'),
      title: c.title,
      category: c.commercialName,
      image: c.logo ?? c.image,
      href: `/capacidades/${c.slug}`,
    })),
  [filtered])

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Nav theme={theme} onToggleTheme={onToggleTheme} />

      <section className="pt-44 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Início
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="max-w-4xl"
          >
            <Eyebrow tone="primary">{solutionsPage.hero.eyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(2rem,5vw,4.2rem)] leading-[1.06] tracking-tight text-balance pb-1">
              {solutionsPage.hero.title}
            </h1>
            <div className="mt-6 space-y-4 max-w-3xl text-lg text-muted-foreground text-pretty leading-relaxed">
              {solutionsPage.intro.map((p, i) => <p key={i}>{p}</p>)}
              <p className="text-foreground font-medium">{solutionsPage.navigationPrompt}</p>
            </div>
          </motion.div>

          {/* Filtro + toggle de visualização */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-2"
          >
            <div
              className="flex flex-wrap gap-2 flex-1"
              role="tablist"
              aria-label="Filtrar capacidades por etapa da jornada"
            >
              <FilterChip active={stage === 'todas'} onClick={() => setStage('todas')}>
                Todas ({capabilities.length})
              </FilterChip>
              {journeyStages.map((s) => {
                const count = capabilities.filter((c) => c.journeyStages.includes(s.slug)).length
                const SIcon = s.icon
                return (
                  <FilterChip
                    key={s.slug}
                    active={stage === s.slug}
                    onClick={() => setStage(s.slug)}
                  >
                    <SIcon className="w-4 h-4" />
                    {s.label}
                    <span className="ml-1 font-mono text-2xs opacity-60">{count}</span>
                  </FilterChip>
                )
              })}
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 rounded-full bg-secondary ring-1 ring-border p-1 shrink-0">
              <button
                type="button"
                aria-label="Visualização em grade"
                aria-pressed={view === 'grid'}
                onClick={() => setView('grid')}
                className={`p-1.5 rounded-full transition-colors ${view === 'grid' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Visualização em lista"
                aria-pressed={view === 'list'}
                onClick={() => setView('list')}
                className={`p-1.5 rounded-full transition-colors ${view === 'list' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait" initial={false}>
            {view === 'grid' ? (
              <motion.div
                key={`grid-${stage}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-5"
              >
                {/* Card destacado: primeiro item do filtro, 2 colunas × 2 linhas */}
                {filtered[0] && (
                  <motion.div
                    className="sm:col-span-2 sm:row-span-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                  >
                    <BigCapabilityCard
                      className="h-full"
                      code={filtered[0].commercialName}
                      name={filtered[0].title}
                      desc={filtered[0].tagline}
                      icon={filtered[0].icon}
                      accent={filtered[0].accent}
                      image={filtered[0].image!}
                      logo={filtered[0].logo}
                      href={`/capacidades/${filtered[0].slug}`}
                      ctaLabel="Ver solução"
                      variant="wide"
                    />
                  </motion.div>
                )}

                {/* Slots à direita do hero (itens 2 e 3) */}
                {filtered.slice(1, 3).map((c, i) => (
                  <motion.div
                    key={c.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (i + 1) * 0.06, ease: EASE }}
                  >
                    <CapabilityCard
                      code={c.commercialName}
                      name={c.title}
                      desc={c.tagline}
                      icon={c.icon}
                      accent={c.accent}
                      image={c.image}
                      logo={c.logo}
                      href={`/capacidades/${c.slug}`}
                      ctaLabel="Ver detalhes"
                    />
                  </motion.div>
                ))}

                {/* Restante — 3 colunas */}
                {filtered.slice(3).map((c, i) => (
                  <motion.div
                    key={c.slug}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.05, ease: EASE }}
                  >
                    <CapabilityCard
                      code={c.commercialName}
                      name={c.title}
                      desc={c.tagline}
                      icon={c.icon}
                      accent={c.accent}
                      image={c.image}
                      logo={c.logo}
                      href={`/capacidades/${c.slug}`}
                      ctaLabel="Ver detalhes"
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <HoverImageList items={listItems} />
              </motion.div>
            )}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              Nenhuma capacidade nesta etapa.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm transition-colors ${
        active
          ? 'bg-primary text-primary-foreground ring-1 ring-primary'
          : 'bg-secondary text-muted-foreground ring-1 ring-border hover:text-foreground hover:bg-secondary/70'
      }`}
    >
      {children}
    </button>
  )
}
