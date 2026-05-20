import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/Eyebrow'
import { MagneticButton } from '@/components/MagneticButton'
import { CapabilityCard } from '@/components/CapabilityCard'
import { BigCapabilityCard } from '@/components/BigCapabilityCard'
import type { Capability } from '@/types/site'
import { journeyStages } from '@/content/journey'

type Props = {
  capabilities: Capability[]
  Nav: React.ComponentType<{ theme: 'dark' | 'light'; onToggleTheme: () => void }>
  Footer: React.ComponentType
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

const fade = (delay: number) => ({
  initial: { opacity: 0, filter: 'blur(8px)', scale: 0.98 },
  animate: { opacity: 1, filter: 'blur(0px)', scale: 1 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const EASE = [0.22, 1, 0.36, 1] as const

export function ProductPage({ capabilities, Nav, Footer, theme, onToggleTheme }: Props) {
  const reduced = useReducedMotion()
  const { slug } = useParams<{ slug: string }>()
  const capability = capabilities.find((c) => c.slug === slug)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug])

  if (!capability) return <Navigate to="/capacidades" replace />

  const Icon = capability.icon
  const accentClass = capability.accent === 'primary' ? 'text-primary' : 'text-accent'

  const currentIndex = capabilities.findIndex((c) => c.slug === slug)
  const prev = capabilities[currentIndex - 1]
  const next = capabilities[currentIndex + 1]

  const stages = capability.journeyStages
    .map((s) => journeyStages.find((js) => js.slug === s))
    .filter(Boolean) as typeof journeyStages

  const related = (() => {
    const others = capabilities.filter((c) => c.slug !== slug)
    const sharesStage = others.filter((c) =>
      c.journeyStages.some((s) => capability.journeyStages.includes(s))
    )
    const rest = others.filter((c) => !sharesStage.includes(c))
    return [...sharesStage, ...rest].slice(0, 9)
  })()

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Nav theme={theme} onToggleTheme={onToggleTheme} />

      {/* Hero */}
      <section className="relative pt-44 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className={`absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full ${capability.accent === 'primary' ? 'bg-primary/8' : 'bg-accent/8'} blur-[120px]`} />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fade(0.05)}>
            <Link
              to="/capacidades"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Todas as capacidades
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              {capability.logo && (
                <motion.div {...fade(0.05)} className="mb-6">
                  <img
                    src={capability.logo}
                    alt={`Logo ${capability.commercialName}`}
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </motion.div>
              )}

              <motion.div {...fade(0.1)}>
                <Eyebrow tone={capability.accent}>{capability.commercialName}</Eyebrow>
              </motion.div>

              <motion.h1
                {...fade(0.22)}
                className="mt-6 font-display text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.08] tracking-tight text-balance pb-1"
              >
                {capability.headline}
              </motion.h1>

              <motion.p
                {...fade(0.36)}
                className="mt-6 text-lg text-muted-foreground text-pretty leading-relaxed max-w-2xl"
              >
                {capability.tagline}
              </motion.p>

              <motion.div {...fade(0.48)} className="mt-10 flex flex-wrap gap-3">
                <MagneticButton strength={0.3} maxOffset={10}>
                  <Button asChild size="lg" className="rounded-full h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                    <Link to="/#contato">{capability.cta.label} <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                </MagneticButton>
              </motion.div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
                className="relative"
              >
                {capability.image ? (
                  <div className="w-[320px] h-[400px] rounded-3xl overflow-hidden ring-1 ring-border shadow-[0_30px_80px_-30px_rgba(15,30,60,0.3)]">
                    <img src={capability.image} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className={`w-[320px] h-[400px] rounded-3xl bg-secondary ring-1 ring-border flex items-center justify-center ${accentClass}`}>
                    <Icon className="w-28 h-28" strokeWidth={1} />
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrativa canônica (2 parágrafos DOCX) */}
      <section className="py-24 border-t border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {capability.narrative.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className={`leading-relaxed text-pretty ${i === 0 ? 'font-display text-2xl sm:text-3xl text-foreground' : 'mt-6 text-lg text-muted-foreground'}`}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </section>

      {/* Capacidades entregues (deliverables canônicos DOCX) */}
      {capability.deliverables.length > 0 && (
        <section className="py-24 border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: EASE }}
                className="lg:col-span-5"
              >
                <Eyebrow tone={capability.accent}>Capacidades entregues</Eyebrow>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl leading-tight tracking-tight text-balance">
                  O que esta capacidade entrega
                </h2>
                <p className="mt-5 text-muted-foreground leading-relaxed text-pretty">
                  Cada capacidade do Ecossistema Salux atua sobre uma necessidade específica
                  da operação — com escopo claro, integração nativa e governança preservada.
                </p>
              </motion.div>
              <div className="lg:col-span-7">
                <ul className="space-y-3">
                  {capability.deliverables.map((d, i) => (
                    <motion.li
                      key={i}
                      initial={reduced ? false : { opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.04, ease: EASE }}
                      className="flex items-start gap-3 rounded-xl bg-card ring-1 ring-border p-4"
                    >
                      <span className={`flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 ${accentClass} shrink-0 mt-0.5`}>
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-sm text-foreground leading-relaxed">{d}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Etapas da jornada cobertas */}
      {stages.length > 0 && (
        <section className="py-24 border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <Eyebrow tone="primary">Etapas da jornada</Eyebrow>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl leading-tight tracking-tight text-balance">
                Onde esta capacidade atua
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {stages.map((s) => {
                const SIcon = s.icon
                return (
                  <div key={s.slug} className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 px-4 py-2 text-sm">
                    <SIcon className="w-4 h-4" />
                    {s.label}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Capacidades relacionadas — bento sempre em dark mode para visual cinematográfico */}
      {related.length > 0 && (
        <section
          className="dark-scope relative py-28 sm:py-32 bg-background text-foreground overflow-hidden"
          style={{
            // Paleta slate (wordmark Salux #45555b) — desaturada, contrasta com os cards azuis
            ['--background' as never]: '205 14% 11%',
            ['--foreground' as never]: '200 15% 95%',
            ['--card' as never]: '205 18% 14%',
            ['--card-foreground' as never]: '200 15% 95%',
            ['--primary' as never]: '213 95% 64%',
            ['--primary-foreground' as never]: '205 60% 5%',
            ['--secondary' as never]: '205 14% 16%',
            ['--secondary-foreground' as never]: '200 15% 95%',
            ['--muted' as never]: '205 12% 18%',
            ['--muted-foreground' as never]: '205 8% 65%',
            ['--accent' as never]: '195 81% 63%',
            ['--accent-foreground' as never]: '205 60% 5%',
            ['--border' as never]: '205 14% 20%',
          }}
        >
          {/* Glow de fundo — primary só, sutil */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[180px]" />
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid lg:grid-cols-12 gap-10 items-end mb-10"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <div className="lg:col-span-8">
                <Eyebrow tone="primary">Ecossistema Salux</Eyebrow>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-balance">
                  Capacidades que se conectam a {capability.commercialName}
                </h2>
                <p className="mt-5 text-muted-foreground max-w-3xl text-pretty">
                  Cada capacidade opera de forma independente, mas ganha força quando integrada
                  ao restante do ecossistema. Explore as que mais dialogam com esta solução.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/capacidades">Ver todas <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related[0] && (
                <motion.div
                  className="sm:col-span-2"
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <BigCapabilityCard
                    className="h-full"
                    code={related[0].commercialName}
                    name={related[0].title}
                    desc={related[0].tagline}
                    icon={related[0].icon}
                    accent={related[0].accent}
                    image={related[0].image!}
                    logo={related[0].logo}
                    href={`/capacidades/${related[0].slug}`}
                    ctaLabel="Ver solução"
                    variant="wide"
                  />
                </motion.div>
              )}

              {related[1] && (
                <motion.div
                  key={related[1].slug}
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
                >
                  <CapabilityCard
                    code={related[1].commercialName}
                    name={related[1].title}
                    desc={related[1].tagline}
                    icon={related[1].icon}
                    accent={related[1].accent}
                    image={related[1].image}
                    logo={related[1].logo}
                    href={`/capacidades/${related[1].slug}`}
                    ctaLabel="Ver detalhes"
                  />
                </motion.div>
              )}

              {related.slice(2).map((c, i) => (
                <motion.div
                  key={c.slug}
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
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
            </div>
          </div>
        </section>
      )}

      {/* Navegação entre capacidades */}
      <section className="py-16 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {prev ? (
            <Link to={`/capacidades/${prev.slug}`} className="group flex items-center gap-4 text-muted-foreground hover:text-foreground transition">
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <div>
                <div className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Anterior</div>
                <div className="font-display text-lg mt-0.5">{prev.title}</div>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/capacidades/${next.slug}`} className="group flex items-center gap-4 text-muted-foreground hover:text-foreground transition text-right">
              <div>
                <div className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Próximo</div>
                <div className="font-display text-lg mt-0.5">{next.title}</div>
              </div>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : <div />}
        </div>
      </section>

      <Footer />
    </div>
  )
}
