import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/Eyebrow'
import { casesPage, allCases } from '@/content/cases'

const EASE = [0.22, 1, 0.36, 1] as const

type Props = {
  Nav: React.ComponentType<{ theme: 'dark' | 'light'; onToggleTheme: () => void }>
  Footer: React.ComponentType
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export function CasesPage({ Nav, Footer, theme, onToggleTheme }: Props) {
  useEffect(() => window.scrollTo({ top: 0 }), [])

  const featured = casesPage.featured

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Nav theme={theme} onToggleTheme={onToggleTheme} />

      {/* Hero */}
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
            <Eyebrow tone="primary">{casesPage.hero.eyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(2rem,5vw,4.2rem)] leading-[1.06] tracking-tight text-balance pb-1">
              {casesPage.hero.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl text-pretty leading-relaxed">
              {casesPage.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured case — Hospital Ernesto Dornelles (DOCX canônico) */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="rounded-3xl bg-card ring-1 ring-border overflow-hidden"
          >
            {/* Header do case */}
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-5 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-border">
                <div className="font-mono text-2xs uppercase tracking-widest text-primary">
                  {featured.capability} · Governança da força de trabalho
                </div>
                <div className="mt-3 font-mono text-xs uppercase text-muted-foreground">
                  {featured.institution} · {featured.location}
                </div>
                <h2 className="mt-5 font-display text-3xl sm:text-4xl leading-tight tracking-tight text-balance">
                  {featured.headline}
                </h2>
              </div>
              <div className="lg:col-span-7 p-8 sm:p-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {featured.metrics.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                    className="rounded-2xl bg-primary/5 ring-1 ring-primary/15 p-5"
                  >
                    <div className="font-display text-2xl text-primary leading-tight">{m.value}</div>
                    <div className="mt-2 text-xs text-muted-foreground">{m.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desafio */}
            <div className="border-t border-border p-8 sm:p-12">
              <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-3">
                  <div className="font-mono text-2xs uppercase tracking-widest text-primary">O desafio</div>
                </div>
                <div className="lg:col-span-9 space-y-5 text-muted-foreground leading-relaxed text-pretty">
                  {featured.challenge.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            </div>

            {/* Solução */}
            <div className="border-t border-border p-8 sm:p-12 bg-secondary/30">
              <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-3">
                  <div className="font-mono text-2xs uppercase tracking-widest text-primary">A solução</div>
                </div>
                <div className="lg:col-span-9 space-y-5 text-muted-foreground leading-relaxed text-pretty">
                  {featured.solution.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            </div>

            {/* Impacto além dos números */}
            <div className="border-t border-border p-8 sm:p-12">
              <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-3">
                  <div className="font-mono text-2xs uppercase tracking-widest text-primary">Impacto além dos números</div>
                </div>
                <div className="lg:col-span-9 space-y-5 text-muted-foreground leading-relaxed text-pretty">
                  {featured.impactBeyondNumbers.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            </div>

            {/* Próximo passo */}
            <div className="border-t border-border p-8 sm:p-12 bg-secondary/30">
              <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-3">
                  <div className="font-mono text-2xs uppercase tracking-widest text-primary">O próximo passo</div>
                </div>
                <div className="lg:col-span-9 text-muted-foreground leading-relaxed text-pretty">
                  <p>{featured.nextStep}</p>
                </div>
              </div>
            </div>

            {/* CTA do case (texto canônico DOCX) */}
            <div className="border-t border-border p-8 sm:p-12 bg-primary text-primary-foreground">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4 leading-relaxed text-pretty">
                  {featured.ctaText.map((p, i) => (
                    <p key={i} className={i === 0 ? 'font-display text-xl' : ''}>{p}</p>
                  ))}
                </div>
                <div className="lg:col-span-4 lg:text-right">
                  <Button asChild size="lg" className="rounded-full h-12 px-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-medium">
                    <Link to={featured.cta.href}>{featured.cta.label} <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Outros cases (placeholder pra quando houver mais) */}
          {allCases.length > 1 && (
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allCases.slice(1).map((c) => (
                <Link
                  key={c.slug}
                  to={`/cases/${c.slug}`}
                  className="group rounded-2xl bg-card ring-1 ring-border p-6 hover:scale-[1.01] hover:-translate-y-0.5 transition"
                >
                  <div className="font-mono text-2xs uppercase tracking-widest text-primary">{c.capability}</div>
                  <h3 className="mt-3 font-display text-xl leading-tight">{c.headline}</h3>
                  <div className="mt-5 inline-flex items-center text-sm text-primary">
                    Ver case <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
