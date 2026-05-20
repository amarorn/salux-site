import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Eyebrow } from './Eyebrow'
import { SchemaJsonLd } from './SchemaJsonLd'
import type { FAQItem } from '@/types/site'

const EASE = [0.22, 1, 0.36, 1] as const

type Props = {
  items: FAQItem[]
  eyebrow?: string
  title?: string
  subtitle?: string
  schemaId?: string
}

function FAQAccordionItem({ item, isOpen, onToggle, index }: {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index, 8) * 0.04, ease: EASE }}
      className="rounded-2xl bg-card ring-1 ring-border overflow-hidden"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start justify-between gap-4 cursor-pointer p-6 hover:bg-secondary/30 transition text-left"
      >
        <span className="font-medium text-foreground text-base leading-snug text-pretty">
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          className="shrink-0 mt-0.5"
        >
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 pb-6 text-muted-foreground leading-relaxed text-pretty text-sm">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ({
  items,
  eyebrow = 'Perguntas frequentes',
  title = 'O que mais perguntam sobre o Ecossistema Salux',
  subtitle,
  schemaId,
}: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const reduced = useReducedMotion()

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
          initial={reduced ? false : { opacity: 0, y: 16 }}
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
            <FAQAccordionItem
              key={it.q}
              item={it}
              index={i}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>

      {schemaId && <SchemaJsonLd id={schemaId} schema={faqPageSchema} />}
    </section>
  )
}
