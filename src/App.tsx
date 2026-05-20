import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from 'framer-motion'
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  ArrowRight, ArrowUpRight, Brain, Building2, ChevronRight,
  Mail, Menu, Moon, Phone, Sun,
} from 'lucide-react'
import { SaluxSymbol } from '@/components/SaluxLogo'
import { Styleguide } from '@/components/Styleguide'
import { CapabilityCard } from '@/components/CapabilityCard'
import { Eyebrow } from '@/components/Eyebrow'
import { MagneticButton } from '@/components/MagneticButton'
import { JourneyWheel } from '@/components/JourneyWheel'
import { Testimonials } from '@/components/Testimonials'
import { FAQ } from '@/components/FAQ'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import { Aurora } from '@/components/Aurora'
import { Beams } from '@/components/Beams'
import { DecryptText } from '@/components/DecryptText'
import SplashCursor from '@/components/SplashCursor'

import { ProductPage } from './pages/ProductPage'
import { CapabilitiesPage } from './pages/CapabilitiesPage'
import { QuemSomosPage } from './pages/QuemSomosPage'
import { InitiaPage } from './pages/InitiaPage'
import { CasesPage } from './pages/CasesPage'

import {
  mainNav, navCta, footerNav, legalLinks, footerTagline,
  homePage, capabilities, testimonials, journeyStages, faq,
} from '@/content'

import heroEquipe from './assets/photos/hero-equipe.jpg'
import mockupDevice from './assets/photos/mockup-device.jpg'

const EASE = [0.22, 1, 0.36, 1] as const

// ─────────────────────────────────────────── HOOKS

function useReveal(route: string) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal, .scroll-color')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [route])
}

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [display, setDisplay] = useState(0)
  const spring = useSpring(0, { stiffness: 55, damping: 18, mass: 1 })

  useEffect(() => {
    if (inView) spring.set(to)
  }, [inView, to, spring])

  useEffect(() => spring.on('change', (v) => setDisplay(Math.round(v))), [spring])

  return <span ref={ref} aria-live="polite">{display.toLocaleString('pt-BR')}{suffix}</span>
}

// ─────────────────────────────────────────── NAV / FOOTER

function ThemeToggle({ theme, onToggle }: { theme: 'dark' | 'light'; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-secondary text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/60 focus:outline-none transition"
      aria-label={`Tema atual ${theme === 'dark' ? 'escuro' : 'claro'}. Trocar para ${theme === 'dark' ? 'claro' : 'escuro'}.`}
      aria-pressed={theme === 'light'}
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}

function Nav({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-background/85 backdrop-blur-xl ring-1 ring-border rounded-2xl px-5 py-2.5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <SaluxSymbol className="w-8 h-8 text-primary" />
            <span className="font-display text-xl tracking-display text-foreground">Salux</span>
            <span className="hidden sm:inline-block ml-1 text-2xs font-mono uppercase tracking-label text-muted-foreground">Technology</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-7 text-sm">
            {mainNav.map((x) => (
              <Link key={x.href} to={x.href} className="text-muted-foreground hover:text-foreground transition">{x.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
              <a href={navCta.href}>{navCta.label}</a>
            </Button>
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-muted-foreground" aria-label="menu">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden mt-2 bg-background/95 backdrop-blur-xl ring-1 ring-border rounded-2xl p-4 flex flex-col gap-3 text-sm">
            {mainNav.map((x) => (
              <Link key={x.href} onClick={() => setOpen(false)} to={x.href} className="text-muted-foreground hover:text-foreground">{x.label}</Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

function Footer() {
  const cols = [
    { t: 'Soluções', l: footerNav.solucoes },
    { t: 'Institucional', l: footerNav.institucional },
    { t: 'Contato', l: footerNav.contato },
  ]
  return (
    <footer className="relative border-t border-border bg-secondary/30 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-2.5">
              <SaluxSymbol className="w-9 h-9 text-primary" />
              <span className="font-display text-2xl tracking-display">Salux</span>
              <span className="text-2xs font-mono uppercase tracking-label text-muted-foreground ml-2 border-l border-border pl-2">Technology</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
              {footerTagline}
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.t} className="lg:col-span-2">
              <div className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">{c.t}</div>
              <ul className="mt-4 space-y-2 text-sm">
                {c.l.map((i) => <li key={i.href}><a className="text-foreground/80 hover:text-foreground transition" href={i.href}>{i.label}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Salux Technology · Parte do Grupo Bringel</div>
          <div className="flex gap-6">
            {legalLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-foreground">{l.label}</a>
            ))}
            <Link to="/styleguide" className="hover:text-foreground font-mono">/styleguide</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────── SECTIONS

function Hero() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -40])

  const { hero } = homePage

  return (
    <section ref={sectionRef} id="top" className="relative pt-36 sm:pt-44 pb-16 sm:pb-24 overflow-hidden">
      {/* Aurora — background animado azul/cyan, mix-blend-mode screen */}
      <Aurora intensity={0.55} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-block"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 ring-1 ring-primary/20 px-3.5 py-1.5 font-mono text-2xs uppercase tracking-widest text-primary">
            <DecryptText text={hero.title} duration={1100} startDelay={300} speed={40} />
          </span>
        </motion.div>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 18, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mt-6 font-display text-[clamp(2rem,5.4vw,4.4rem)] leading-[1.08] tracking-tight text-balance text-foreground"
        >
          {hero.subtitle}
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          className="mt-7 mx-auto max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty"
        >
          {hero.body}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          {hero.ctas.map((c, i) =>
            i === 0 ? (
              <MagneticButton key={c.label} strength={0.3} maxOffset={10}>
                <Button asChild size="lg" className="rounded-full h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                  <a href={c.href}>{c.label} <ArrowRight className="ml-2 w-4 h-4" /></a>
                </Button>
              </MagneticButton>
            ) : (
              <MagneticButton key={c.label} strength={0.22} maxOffset={8}>
                <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-6">
                  <a href={c.href}>{c.label} <ArrowUpRight className="ml-2 w-4 h-4" /></a>
                </Button>
              </MagneticButton>
            )
          )}
        </motion.div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-14">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          style={reduced ? undefined : { y: imgY }}
          className="relative overflow-hidden rounded-[2rem] ring-1 ring-border shadow-[0_30px_80px_-30px_rgba(15,30,60,0.25)]"
        >
          <motion.img
            src={heroEquipe}
            alt="Equipe médica em ambiente hospitalar"
            style={reduced ? undefined : { scale: imgScale }}
            className="block w-full aspect-[21/9] sm:aspect-[21/8] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/25 via-transparent to-transparent mix-blend-multiply" />
        </motion.div>
      </div>
    </section>
  )
}

function Problem() {
  const { problem } = homePage
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-primary text-primary-foreground overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-10 p-10 sm:p-14">
            <div className="lg:col-span-5 reveal">
              <h2 className="font-display text-4xl sm:text-5xl leading-[1.08] tracking-tight text-balance">
                {problem.title}
              </h2>
              <ul className="mt-8 space-y-3 text-lg">
                {problem.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <Button asChild size="lg" className="mt-10 rounded-full h-12 px-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-medium">
                <a href={problem.cta.href}>{problem.cta.label} <ArrowRight className="ml-2 w-4 h-4" /></a>
              </Button>
            </div>
            <div className="lg:col-span-7 reveal text-primary-foreground/90 leading-relaxed text-pretty space-y-5">
              {problem.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Journey() {
  const { journey } = homePage
  const reduced = useReducedMotion()
  const colRef = useRef<HTMLDivElement>(null)
  const inView = useInView(colRef, { once: true, margin: '-80px' })

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0 } },
  }
  const item = {
    hidden: reduced ? {} : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  }

  return (
    <section id="jornada" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            ref={colRef}
            className="lg:col-span-6"
            variants={container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <motion.h2
              variants={item}
              className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-balance"
            >
              {journey.title.split(',')[0]},
              <br />
              <span className="text-primary">
                <DecryptText
                  text={journey.title.split(',')[1]?.trim() ?? ''}
                  duration={1100}
                  speed={28}
                  startDelay={500}
                />
              </span>
            </motion.h2>

            <motion.p variants={item} className="mt-5 text-muted-foreground text-pretty max-w-xl">
              {journey.subtitle}
            </motion.p>

            <motion.div variants={item} className="mt-10 space-y-3">
              {journey.pillars.map((p, i) => (
                <details key={p.title} open={i === 0} className="group rounded-2xl bg-card ring-1 ring-border p-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="font-medium text-foreground">{p.title}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </details>
              ))}
            </motion.div>

            <motion.div variants={item}>
              <Link to={journey.cta.href} className="inline-flex items-center gap-2 mt-8 text-sm text-primary hover:text-primary/80 transition">
                {journey.cta.label} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-6 pb-16">
            <JourneyWheel nodes={journeyStages.map((s) => ({ k: s.label, t: s.description, i: s.icon }))} />
          </div>
        </div>
      </div>
    </section>
  )
}

function Capabilities() {
  const { capabilities: c } = homePage
  return (
    <section id="capacidades" className="relative py-24 sm:py-32 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-end reveal">
          <div className="lg:col-span-8">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-balance">
              {c.title}
            </h2>
            <p className="mt-5 text-muted-foreground max-w-3xl text-pretty">
              {c.body}
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Button asChild variant="outline" className="rounded-full">
              <Link to={c.cta.href}>{c.cta.label} <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>

        {/* Camada agêntica — bloco transversal */}
        <div className="mt-12 reveal">
          <div className="relative rounded-3xl bg-foreground text-background overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/20 mix-blend-screen" />
            <div className="noise" aria-hidden />
            {/* Beams — feixes de luz irradiando do topo, reforçam o conceito de "ativação" */}
            <Beams origin="top" intensity={0.55} />
            <div className="relative p-8 sm:p-12 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 ring-1 ring-primary/40 px-3 py-1 font-mono text-2xs uppercase tracking-widest text-background">
                  <Brain className="w-3 h-3" /> {c.agentic.eyebrow}
                </span>
                <h3 className="mt-5 font-display text-2xl sm:text-3xl leading-tight text-balance">
                  {c.agentic.title}
                </h3>
                <p className="mt-4 text-background/80 max-w-2xl">
                  {c.agentic.body}
                </p>
              </div>
              <div className="lg:col-span-5 grid grid-cols-1 gap-2">
                {c.agentic.levels.map((a) => (
                  <div key={a.level} className="flex items-center gap-3 rounded-xl bg-background/5 ring-1 ring-background/10 px-4 py-3">
                    <span className="font-mono text-2xs text-background/70 w-6">{a.level}</span>
                    <span className="font-display text-lg text-background">{a.name}</span>
                    <span className="text-xs text-background/60 leading-snug ml-auto text-right hidden sm:block max-w-[60%]">{a.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grid das 9 capacidades */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 reveal">
          {capabilities.map((p) => (
            <CapabilityCard
              key={p.slug}
              code={p.commercialName}
              name={p.title}
              desc={p.tagline}
              icon={p.icon}
              accent={p.accent}
              image={p.image}
              logo={p.logo}
              href={`/capacidades/${p.slug}`}
              ctaLabel="Ver detalhes"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function Credentials() {
  const { credentials } = homePage
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2rem] bg-foreground text-background overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-accent/20 mix-blend-screen" />
          <div className="noise" aria-hidden />
          {/* Aurora — reforça a identidade visual azul na seção de credenciais */}
          <Aurora intensity={0.3} />
          <div className="relative grid lg:grid-cols-12 gap-10 p-10 sm:p-14 items-center">
            <div className="lg:col-span-7 reveal">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.08] tracking-tight text-balance">
                {credentials.title}
              </h2>
              <p className="mt-5 text-background/80 max-w-xl text-pretty">
                {credentials.subtitle}
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {credentials.tags.map((t) => (
                  <li key={t} className="rounded-full bg-background/5 ring-1 ring-background/15 px-3.5 py-1.5 text-sm text-background/90">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 grid grid-cols-3 max-w-md gap-6 text-background">
                <div>
                  <div className="font-display text-3xl"><Counter to={25} suffix="+" /></div>
                  <div className="text-xs text-background/60 mt-1">anos no setor</div>
                </div>
                <div>
                  <div className="font-display text-3xl"><Counter to={14} /></div>
                  <div className="text-xs text-background/60 mt-1">estados</div>
                </div>
                <div>
                  <div className="font-display text-3xl"><Counter to={4000} suffix="+" /></div>
                  <div className="text-xs text-background/60 mt-1">colaboradores · Grupo Bringel</div>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-3 flex-wrap">
                <div className="inline-flex items-center gap-2 rounded-full bg-background/5 ring-1 ring-background/15 px-4 py-2 text-sm text-background/90">
                  <Building2 className="w-4 h-4 text-primary" /> Parte do <span className="font-medium">Grupo Bringel</span>
                </div>
                <Button asChild variant="outline" className="rounded-full border-background/30 bg-background/5 text-background hover:bg-background/10">
                  <Link to={credentials.cta.href}>{credentials.cta.label} <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 reveal flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: EASE }}
                className="relative w-[260px] h-[520px] rounded-[2.4rem] bg-background/10 ring-8 ring-background/20 overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]"
              >
                <img src={mockupDevice} alt="App Salux em dispositivo móvel" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full bg-background/40" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CasesPreview() {
  const { cases } = homePage
  return (
    <section id="cases" className="relative py-24 sm:py-32 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-12 max-w-3xl">
          <Eyebrow tone="primary">{cases.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-balance">
            {cases.title}
          </h2>
        </div>
        <div className="text-center">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/cases">Ver todos os cases <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const { testimonials: t } = homePage
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-12 max-w-3xl">
          <Eyebrow tone="primary">{t.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-balance">
            {t.title}
          </h2>
        </div>
        <Testimonials items={testimonials} />
      </div>
    </section>
  )
}

function CTA() {
  const { cta } = homePage
  return (
    <section id="contato" className="relative py-24 sm:py-32 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-12 max-w-4xl">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-balance">
            {cta.title}
          </h2>
          <p className="mt-5 text-muted-foreground text-pretty max-w-2xl">
            {cta.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-3">
            {cta.contactCards.map((c, i) => {
              const Ic = c.icon
              return (
                <motion.a
                  key={c.title}
                  href="#contato-form"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                  className="group flex items-start gap-4 rounded-2xl bg-card ring-1 ring-border p-5 hover:ring-primary/40 hover:bg-primary/5 transition"
                >
                  <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary shrink-0">
                    <Ic className="w-5 h-5" />
                  </span>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{c.title}</div>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition" />
                </motion.a>
              )
            })}
            <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
              <a href={`mailto:${cta.contact.email}`} className="flex items-center gap-2 hover:text-foreground transition">
                <Mail className="w-4 h-4 text-primary" /> {cta.contact.email}
              </a>
              <a href={`tel:${cta.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-foreground transition">
                <Phone className="w-4 h-4 text-primary" /> {cta.contact.phone}
              </a>
            </div>
          </div>

          <form
            id="contato-form"
            className="lg:col-span-7 rounded-3xl bg-card ring-1 ring-border p-8 sm:p-10 space-y-4"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Formulário de contato Salux"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nome Completo" id="c-name" type="text" autoComplete="name" placeholder="Seu nome" />
              <Field label="Empresa" id="c-org" type="text" autoComplete="organization" placeholder="Hospital, rede, prefeitura..." />
              <Field label="E-mail" id="c-email" type="email" autoComplete="email" placeholder="nome@instituicao.com.br" />
              <Field label="Telefone" id="c-phone" type="tel" autoComplete="tel" placeholder="(11) 99999-9999" />
            </div>
            <div>
              <label htmlFor="c-msg" className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Mensagem</label>
              <textarea
                id="c-msg" name="message" rows={5}
                placeholder="Escreva sua mensagem"
                className="mt-1 w-full bg-background ring-1 ring-border rounded-xl px-4 py-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition"
              />
            </div>
            <Button className="w-full rounded-xl h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
              {cta.formCta.label} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

function Field({ label, id, type, autoComplete, placeholder }: { label: string; id: string; type: string; autoComplete?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={id} className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        id={id} name={id} type={type} autoComplete={autoComplete}
        placeholder={placeholder}
        className="mt-1 w-full bg-background ring-1 ring-border rounded-xl px-4 py-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition"
      />
    </div>
  )
}

// ─────────────────────────────────────────── ROUTES

function HomePage({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
  useReveal('home')
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SplashCursor
        TRANSPARENT={true}
        DENSITY_DISSIPATION={4}
        VELOCITY_DISSIPATION={0.96}
        SPLAT_RADIUS={0.2}
        RAINBOW_MODE={false}
        SIM_RESOLUTION={128}
        COLOR="#3d89d9"
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-pill focus:bg-primary focus:text-primary-foreground focus:font-medium focus:shadow-lg"
      >
        Pular para o conteúdo
      </a>
      <Nav theme={theme} onToggleTheme={onToggleTheme} />
      <main id="main">
        <Hero />
        <Problem />
        <Journey />
        <Capabilities />
        <Credentials />
        <CasesPreview />
        <TestimonialsSection />
        <FAQ
          items={faq}
          eyebrow="Perguntas frequentes"
          title="O que mais perguntam sobre o Ecossistema Salux"
          subtitle="Conceitos centrais da camada agêntica, integração entre capacidades e impactos reais na operação em saúde."
          schemaId="faq-home"
        />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Salux',
  legalName: 'Salux Technology',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://salux.com.br',
  description:
    'O Ecossistema Salux estrutura capacidades especializadas que integram dados, fluxos e inteligência para transformar a operação de instituições de saúde públicas e privadas.',
  parentOrganization: { '@type': 'Organization', name: 'Grupo Bringel' },
  foundingDate: '2000',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+55-0800-123-4567',
    email: 'comercial@salux.com.br',
    contactType: 'customer support',
    areaServed: 'BR',
    availableLanguage: ['Portuguese'],
  },
  sameAs: [] as string[],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Salux · Ecossistema de saúde digital',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://salux.com.br',
  inLanguage: 'pt-BR',
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'light'
    const saved = localStorage.getItem('salux-theme')
    return saved === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    localStorage.setItem('salux-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <>
      <SchemaJsonLd id="schema-organization" schema={organizationSchema} />
      <SchemaJsonLd id="schema-website" schema={websiteSchema} />
      <AnimatedRoutes theme={theme} toggleTheme={toggleTheme} />
    </>
  )
}

function AnimatedRoutes({ theme, toggleTheme }: { theme: 'dark' | 'light'; toggleTheme: () => void }) {
  const location = useLocation()
  const reduced = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: -4 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage theme={theme} onToggleTheme={toggleTheme} />} />
          <Route path="/quem-somos" element={
            <QuemSomosPage Nav={Nav} Footer={Footer} theme={theme} onToggleTheme={toggleTheme} />
          } />
          <Route path="/capacidades" element={
            <CapabilitiesPage
              capabilities={capabilities}
              Nav={Nav}
              Footer={Footer}
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          } />
          <Route path="/capacidades/initia" element={
            <InitiaPage Nav={Nav} Footer={Footer} theme={theme} onToggleTheme={toggleTheme} />
          } />
          <Route path="/capacidades/:slug" element={
            <ProductPage
              capabilities={capabilities}
              Nav={Nav}
              Footer={Footer}
              theme={theme}
              onToggleTheme={toggleTheme}
            />
          } />
          <Route path="/cases" element={
            <CasesPage Nav={Nav} Footer={Footer} theme={theme} onToggleTheme={toggleTheme} />
          } />
          <Route path="/styleguide" element={
            <div className="relative min-h-screen">
              <Nav theme={theme} onToggleTheme={toggleTheme} />
              <Styleguide />
            </div>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default App
