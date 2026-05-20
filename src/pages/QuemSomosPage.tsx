import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/Eyebrow'
import { CapabilityCard } from '@/components/CapabilityCard'
import { quemSomosPage } from '@/content/quem-somos'
import { capabilities } from '@/content/capabilities'

import quemSomosHero from '@/assets/photos/quemsomos-hero.jpg'
import kleltonPhoto from '@/assets/photos/klelton-bringel.jpg'
import ecossistemaFoto from '@/assets/photos/ecossistema-foto.jpg'

const EASE = [0.22, 1, 0.36, 1] as const

type Props = {
  Nav: React.ComponentType<{ theme: 'dark' | 'light'; onToggleTheme: () => void }>
  Footer: React.ComponentType
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export function QuemSomosPage({ Nav, Footer, theme, onToggleTheme }: Props) {
  useEffect(() => window.scrollTo({ top: 0 }), [])

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Nav theme={theme} onToggleTheme={onToggleTheme} />

      {/* Hero — foto full-bleed com card sobreposto */}
      <section className="relative pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative rounded-[2rem] overflow-hidden ring-1 ring-border"
          >
            <img
              src={quemSomosHero}
              alt="Profissional analisando dashboard hospitalar em tablet"
              className="block w-full aspect-[21/9] sm:aspect-[21/7] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/50 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="-mt-24 sm:-mt-32 mx-auto max-w-6xl px-4"
          >
            <div className="rounded-[2rem] bg-foreground text-background p-10 sm:p-14 shadow-[0_30px_80px_-30px_rgba(15,30,60,0.4)]">
              <Eyebrow tone="primary">{quemSomosPage.hero.eyebrow}</Eyebrow>
              <div className="mt-5 grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5">
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.08] tracking-tight text-balance">
                    {quemSomosPage.hero.title}
                  </h1>
                  <p className="mt-6 text-background/85 text-pretty leading-relaxed">
                    {quemSomosPage.hero.description}
                  </p>
                </div>
                <div className="lg:col-span-7 space-y-5 text-background/85 leading-relaxed text-pretty">
                  {quemSomosPage.hero.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grupo Bringel — foto + texto */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: EASE }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl overflow-hidden ring-1 ring-border">
                <img src={kleltonPhoto} alt="Klelton Bringel" className="block w-full aspect-[4/5] object-cover" />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-foreground/90 to-transparent">
                  <div className="font-display text-xl text-background">{quemSomosPage.bringel.featured.name}</div>
                  <div className="text-sm text-background/80">{quemSomosPage.bringel.featured.subtitle}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="lg:col-span-7"
            >
              <Eyebrow tone="primary">{quemSomosPage.bringel.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.08] tracking-tight text-balance">
                {quemSomosPage.bringel.title}
              </h2>
              <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed text-pretty">
                {quemSomosPage.bringel.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-8">
                <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <a href={quemSomosPage.bringel.cta.href} target="_blank" rel="noopener noreferrer">
                    {quemSomosPage.bringel.cta.label} <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ecossistema Salux — intro + grid de capacidades */}
      <section className="py-24 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
              className="lg:col-span-7"
            >
              <Eyebrow tone="primary">{quemSomosPage.ecosystem.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.08] tracking-tight text-balance">
                {quemSomosPage.ecosystem.title}
              </h2>
              <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed text-pretty max-w-2xl">
                {quemSomosPage.ecosystem.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl overflow-hidden ring-1 ring-border shadow-[0_20px_60px_-20px_rgba(15,30,60,0.2)]">
                <img
                  src={ecossistemaFoto}
                  alt="Profissional de saúde acessando dashboard do Ecossistema Salux"
                  className="block w-full aspect-[4/5] object-cover"
                />
              </div>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
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

          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/capacidades">
                {quemSomosPage.ecosystem.cta.label} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
