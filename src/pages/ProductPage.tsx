import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/Eyebrow'
import { MagneticButton } from '@/components/MagneticButton'

export type ProductDef = {
  slug: string
  code: string
  name: string
  tagline: string
  desc: string
  icon: LucideIcon
  accent: 'primary' | 'accent'
  logo?: string
  features: { icon: LucideIcon; label: string; desc: string }[]
}

type Props = {
  products: ProductDef[]
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

export function ProductPage({ products, Nav, Footer, theme, onToggleTheme }: Props) {
  const { slug } = useParams<{ slug: string }>()
  const product = products.find((p) => p.slug === slug)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug])

  if (!product) return <Navigate to="/capacidades" replace />

  const Icon = product.icon
  const accentColor = product.accent === 'primary' ? 'text-primary' : 'text-accent'
  const glowClass = product.accent === 'primary' ? 'glow-primary' : 'glow-accent'

  const currentIndex = products.findIndex((p) => p.slug === slug)
  const prev = products[currentIndex - 1]
  const next = products[currentIndex + 1]

  return (
    <div className="relative min-h-screen">
      <Nav theme={theme} onToggleTheme={onToggleTheme} />

      {/* Hero */}
      <section className="relative pt-48 pb-40 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid mask-radial opacity-20" />
          <div className="absolute inset-0 bg-dotgrid opacity-30" />
          <div className={`absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full ${product.accent === 'primary' ? 'bg-primary/8' : 'bg-accent/8'} blur-[120px]`} />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fade(0.05)}>
            <Link
              to="/capacidades"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-12 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Todas as capacidades
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div {...fade(0.1)}>
                <Eyebrow tone={product.accent}>
                  {product.code}
                </Eyebrow>
              </motion.div>

              <motion.h1
                {...fade(0.22)}
                className="mt-8 font-display text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[1.06] tracking-tight text-balance pb-1"
              >
                {product.name}
              </motion.h1>

              <motion.p
                {...fade(0.36)}
                className="mt-6 text-xl text-muted-foreground text-pretty leading-relaxed max-w-2xl"
              >
                {product.tagline}
              </motion.p>

              <motion.div {...fade(0.48)} className="mt-12 flex flex-wrap gap-3">
                <MagneticButton strength={0.3} maxOffset={10}>
                  <Button asChild size="lg" className="rounded-full h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                    <Link to="/#contato">Falar com o time <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                </MagneticButton>
              </motion.div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.88, filter: 'blur(16px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {product.logo ? (
                  <div className={`w-64 h-64 rounded-3xl glass border-gradient flex items-center justify-center p-10 ${glowClass}`}>
                    <img src={product.logo} alt={product.code} className="w-full h-full object-contain logo-tint" />
                  </div>
                ) : (
                  <div className={`w-64 h-64 rounded-3xl glass border-gradient flex items-center justify-center ${glowClass} ${accentColor}`}>
                    <Icon className="w-28 h-28" strokeWidth={1} />
                  </div>
                )}
                <div className={`absolute -inset-8 rounded-full ${product.accent === 'primary' ? 'bg-primary/10' : 'bg-accent/10'} blur-3xl -z-10`} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Descrição */}
      <section className="py-32 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-2xl sm:text-3xl lg:text-4xl leading-snug text-balance max-w-4xl"
          >
            {product.desc}
          </motion.p>
        </div>
      </section>

      {/* Features */}
      {product.features.length > 0 && (
        <section className="py-32 border-t border-border bg-secondary/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {product.features.map((f, i) => {
                const FIcon = f.icon
                return (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl glass p-6 border-gradient"
                  >
                    <FIcon className={`w-7 h-7 ${accentColor}`} />
                    <h3 className="mt-4 font-display text-xl leading-tight">{f.label}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* Slot para foto — placeholder elegante */}
      <section className="py-32 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-video rounded-3xl glass border-gradient overflow-hidden flex items-center justify-center"
          >
            <div className="text-center">
              <div className={`mx-auto w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4 ${accentColor}`}>
                <Icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Imagem em breve</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navegação entre produtos */}
      <section className="py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {prev ? (
            <Link to={`/capacidades/${prev.slug}`} className="group flex items-center gap-4 text-muted-foreground hover:text-foreground transition">
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <div>
                <div className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Anterior</div>
                <div className="font-display text-lg mt-0.5">{prev.name}</div>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/capacidades/${next.slug}`} className="group flex items-center gap-4 text-muted-foreground hover:text-foreground transition text-right">
              <div>
                <div className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Próximo</div>
                <div className="font-display text-lg mt-0.5">{next.name}</div>
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
