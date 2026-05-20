import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Eyebrow } from './Eyebrow'
import { SchemaJsonLd } from './SchemaJsonLd'
import type { FAQItem } from '@/types/site'

const EASE = [0.22, 1, 0.36, 1] as const

type Props = {
  items: FAQItem[]
  eyebrow?: string
  title?: string
  subtitle?: string
  /** ID estável pra injetar o JSON-LD FAQPage no head sem duplicar. */
  schemaId?: string
}

/**
 * FAQ — accordion semântico com <details>/<summary> +
 * injeção automática de JSON-LD `FAQPage` schema.org pra AEO.
 *
 * Use schemaId único por página (ex: "faq-home", "faq-initia").
 */
export function FAQ({
  items,
  eyebrow = 'Perguntas frequentes',
  title = 'O que mais perguntam sobre o Ecossistema Salux',
  subtitle,
  schemaId,
}: Props) {
  const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12 max-w-3xl"
        >
          <Eyebrow tone="primary">{eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.08] tracking-tight text-balance">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-5 text-muted-foreground text-pretty leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="space-y-3">
          {items.map((it, i) => (
            <motion.details
              key={it.q}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.04, ease: EASE }}
              className="group rounded-2xl bg-card ring-1 ring-border overflow-hidden [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-start justify-between gap-4 cursor-pointer list-none p-6 hover:bg-secondary/30 transition">
                <span className="font-medium text-foreground text-base leading-snug text-pretty">
                  {it.q}
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-90 shrink-0 mt-0.5" />
              </summary>
              <div className="px-6 pb-6 pt-0 text-muted-foreground leading-relaxed text-pretty text-sm">
                {it.a}
              </div>
            </motion.details>
          ))}
        </div>
      </div>

      {schemaId && <SchemaJsonLd id={schemaId} schema={faqPageSchema} />}
    </section>
  )
}
