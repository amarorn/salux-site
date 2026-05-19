import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { CapabilityCard } from '@/components/CapabilityCard'
import { Eyebrow } from '@/components/Eyebrow'
import type { ProductDef } from './ProductPage'

type Props = {
  products: ProductDef[]
  Nav: React.ComponentType<{ theme: 'dark' | 'light'; onToggleTheme: () => void }>
  Footer: React.ComponentType
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export function CapabilitiesPage({ products, Nav, Footer, theme, onToggleTheme }: Props) {
  return (
    <div className="relative min-h-screen">
      <Nav theme={theme} onToggleTheme={onToggleTheme} />

      <section className="pt-48 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-12 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Início
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow tone="primary">Ecossistema completo</Eyebrow>
            <h1 className="mt-8 font-display text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[1.06] tracking-tight text-balance pb-1">
              Todas as capacidades.
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
              Nove capacidades especializadas, integradas numa única base de dados e numa única camada de inteligência.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <CapabilityCard
                  code={p.code}
                  name={p.name}
                  desc={p.desc}
                  icon={p.icon}
                  accent={p.accent}
                  logo={p.logo}
                  href={`/capacidades/${p.slug}`}
                  ctaLabel="Ver detalhes"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
