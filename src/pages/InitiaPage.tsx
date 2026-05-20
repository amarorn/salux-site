import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Radar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/Eyebrow'
import { MagneticButton } from '@/components/MagneticButton'
import { initiaPage } from '@/content/initia'
import { faq } from '@/content/faq'
import { FAQ } from '@/components/FAQ'

import capInitia from '@/assets/photos/cap-initia.jpg'
import { Beams } from '@/components/Beams'

const initiaHeroVideo = '/videos/initia-hero.mp4'

/**
 * Subset de FAQs focado em conceitos da camada agêntica e Initia.
 * Critério: perguntas sobre IA/agentes/operação ativada por inteligência.
 */
const initiaFaqSubset = faq.filter((q) =>
  /agêntica|agente|automação|coordenar|ativada|substituir|chatbot/i.test(q.q)
)

const EASE = [0.22, 1, 0.36, 1] as const

type Props = {
  Nav: React.ComponentType<{ theme: 'dark' | 'light'; onToggleTheme: () => void }>
  Footer: React.ComponentType
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export function InitiaPage({ Nav, Footer, theme, onToggleTheme }: Props) {
  useEffect(() => window.scrollTo({ top: 0 }), [])

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Nav theme={theme} onToggleTheme={onToggleTheme} />

      {/* Hero */}
      <section className="relative pt-44 pb-32 overflow-hidden min-h-[92vh] flex items-center">
        {/* Vídeo de fundo full-bleed */}
        <div className="absolute inset-0 -z-10">
          <video
            src={initiaHeroVideo}
            poster={capInitia}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
          />
          <img
            src={capInitia}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover hidden motion-reduce:block"
          />

          {/* Overlays para legibilidade do texto */}
          <div className="absolute inset-0 bg-background/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

          {/* Glow primário (mantém identidade da marca) */}
          <div className="absolute right-[10%] top-1/3 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/15 blur-[160px]" />

          {/* Feixes de luz sugerindo "ativação" */}
          <Beams origin="base" intensity={0.45} />

          {/* Grão sutil para textura cinematográfica */}
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>")',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Link
              to="/capacidades"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Todas as capacidades
            </Link>
          </motion.div>

          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <Eyebrow tone="primary">{initiaPage.hero.eyebrow}</Eyebrow>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="mt-6 font-display text-[clamp(2.2rem,5.6vw,5rem)] leading-[1.04] tracking-tight text-balance pb-1"
            >
              {initiaPage.hero.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="mt-6 text-xl text-primary text-pretty leading-snug max-w-2xl"
            >
              {initiaPage.hero.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <MagneticButton strength={0.3} maxOffset={10}>
                <Button asChild size="lg" className="rounded-full h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                  <a href={initiaPage.hero.cta.href}>{initiaPage.hero.cta.label} <ArrowRight className="ml-2 w-4 h-4" /></a>
                </Button>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Body do hero — 3 parágrafos canônicos */}
      <section className="py-20 border-t border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {initiaPage.hero.body.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
              className={`text-pretty leading-relaxed ${
                i === initiaPage.hero.body.length - 1
                  ? 'mt-8 font-display text-2xl text-primary'
                  : 'mt-6 text-lg text-muted-foreground first:mt-0'
              }`}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </section>

      {/* Nova lógica operacional — 3 parágrafos */}
      <section className="py-24 border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.08] tracking-tight text-balance"
          >
            {initiaPage.newOperationalLogic.title}
          </motion.h2>
          <div className="mt-8 space-y-6">
            {initiaPage.newOperationalLogic.body.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
                className={`leading-relaxed text-pretty ${
                  i === initiaPage.newOperationalLogic.body.length - 1
                    ? 'font-display text-xl text-primary'
                    : 'text-lg text-muted-foreground'
                }`}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Camada agêntica — 5 níveis */}
      <section className="py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-3xl mb-12"
          >
            <Eyebrow tone="primary">{initiaPage.agenticLayer.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.08] tracking-tight text-balance">
              {initiaPage.agenticLayer.title}
            </h2>
            <p className="mt-6 text-muted-foreground text-pretty leading-relaxed">
              {initiaPage.agenticLayer.body}
            </p>
          </motion.div>

          <div className="rounded-3xl bg-foreground text-background overflow-hidden">
            <div className="px-8 py-5 flex items-center justify-between border-b border-background/10">
              <div className="flex items-center gap-3">
                <Radar className="w-4 h-4 text-primary" />
                <div className="font-mono text-2xs uppercase tracking-widest text-background/70">
                  Camada agêntica · do dado à ação
                </div>
              </div>
              <span className="font-mono text-2xs text-background/70">5 níveis</span>
            </div>
            <ul className="divide-y divide-background/10">
              {initiaPage.agenticLayer.levels.map((a, i) => (
                <motion.li
                  key={a.level}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                  className="grid grid-cols-12 gap-4 px-8 py-6"
                >
                  <div className="col-span-2 font-mono text-sm text-background/60">{a.level}</div>
                  <div className="col-span-3 font-display text-2xl text-background">{a.name}</div>
                  <div className="col-span-7 text-background/70 text-sm leading-relaxed">{a.description}</div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* O que o Initia entrega — bullets canônicos DOCX */}
      <section className="py-24 border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.08] tracking-tight text-balance mb-12"
          >
            {initiaPage.delivers.title}
          </motion.h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {initiaPage.delivers.items.map((label, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.05, ease: EASE }}
                className="flex items-start gap-3 rounded-2xl bg-card ring-1 ring-border p-5"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span className="text-sm text-foreground leading-relaxed">{label}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* A base do ecossistema — 2 parágrafos canônicos */}
      <section className="py-24 border-t border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.08] tracking-tight text-balance">
              {initiaPage.ecosystemBase.title}
            </h2>
            <div className="mt-8 space-y-5 text-lg text-muted-foreground leading-relaxed text-pretty max-w-3xl mx-auto">
              {initiaPage.ecosystemBase.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-10 rounded-full">
              <Link to={initiaPage.ecosystemBase.cta.href}>
                {initiaPage.ecosystemBase.cta.label} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ — subset focado em camada agêntica */}
      <div className="border-t border-border bg-secondary/40">
        <FAQ
          items={initiaFaqSubset}
          eyebrow="Sobre a camada agêntica"
          title="Como funciona a inteligência operacional do Initia"
          subtitle="As perguntas mais comuns sobre agentes de IA, automação e a virada de lógica que o Initia traz para a operação em saúde."
          schemaId="faq-initia"
        />
      </div>

      <Footer />
    </div>
  )
}
