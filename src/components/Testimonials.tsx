import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export type Testimonial = {
  quote: string
  name: string
  role: string
  org: string
  avatar?: string
}

function Initials({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-display text-lg shrink-0">
      {initials}
    </div>
  )
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      {items.map((t, i) => (
        <motion.figure
          key={t.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl bg-card ring-1 ring-border p-6 flex flex-col"
        >
          <div className="flex gap-1 text-primary mb-4" aria-label="5 estrelas">
            {Array.from({ length: 5 }).map((_, k) => (
              <Star key={k} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <blockquote className="font-display text-lg leading-snug text-foreground text-pretty flex-1">
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3 pt-5 border-t border-border">
            {t.avatar ? (
              <img
                src={t.avatar}
                alt=""
                className="w-12 h-12 rounded-full object-cover shrink-0"
              />
            ) : (
              <Initials name={t.name} />
            )}
            <div>
              <div className="font-medium text-sm text-foreground">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role} · {t.org}</div>
            </div>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  )
}
