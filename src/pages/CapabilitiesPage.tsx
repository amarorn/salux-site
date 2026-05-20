import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { CapabilityCard } from '@/components/CapabilityCard'
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

  const filtered = useMemo(() => {
    if (stage === 'todas') return capabilities
    return capabilities.filter((c) => c.journeyStages.includes(stage))
  }, [capabilities, stage])

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

          {/* Filtro por etapa da jornada */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
            className="mt-10 flex flex-wrap gap-2"
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
          </motion.div>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.05, ease: EASE }}
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
          </div>
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
