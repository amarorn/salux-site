import { Badge } from '@/components/ui/badge'
import type { ReactNode } from 'react'

export type EyebrowProps = {
  /** Tom do eyebrow — primary (azul, default) ou accent (cyan) */
  tone?: 'primary' | 'accent'
  /** Conteúdo (texto, número, ícone) */
  children: ReactNode
  className?: string
}

/**
 * Eyebrow
 * -------
 * Badge "eyebrow" padronizado, usado antes de headings de seção.
 * Encapsula a combinação repetida de classes para garantir consistência
 * visual entre todas as seções.
 *
 * Variantes:
 * - primary (default): borda + tinta no azul institucional
 * - accent: borda + tinta no cyan, para seções secundárias (problema, case)
 *
 * Para variantes com ícone, passe-o como child:
 *   <Eyebrow><Sparkles className="w-3 h-3 mr-1.5" /> Novidade</Eyebrow>
 */
export function Eyebrow({ tone = 'primary', children, className = '' }: EyebrowProps) {
  const toneClass =
    tone === 'primary'
      ? 'border-primary/30 bg-primary/5 text-primary'
      : 'border-accent/30 bg-accent/5 text-accent'

  return (
    <Badge
      variant="outline"
      className={`rounded-pill font-mono text-mini uppercase tracking-label px-3 py-1 ${toneClass} ${className}`}
    >
      {children}
    </Badge>
  )
}

/**
 * StatusBadge
 * -----------
 * Badge filled para indicar status (success/info/warning/neutral).
 * Usado dentro de cards ou tabelas, não para eyebrows de seção.
 */
export function StatusBadge({
  status = 'info',
  children,
}: {
  status?: 'success' | 'info' | 'warning' | 'neutral'
  children: ReactNode
}) {
  const tone = {
    success: 'bg-primary/10 text-primary border-primary/30',
    info: 'bg-accent/10 text-accent border-accent/30',
    warning: 'bg-destructive/10 text-destructive border-destructive/30',
    neutral: 'bg-muted text-muted-foreground border-border',
  }[status]
  return (
    <Badge className={`rounded-pill font-mono text-mini uppercase tracking-label ${tone}`}>
      {children}
    </Badge>
  )
}

/**
 * CountBadge
 * ----------
 * Pequeno contador numérico, usado para indicar quantidades discretas
 * (ex: "5 níveis", "9 capacidades").
 */
export function CountBadge({ children }: { children: ReactNode }) {
  return (
    <Badge className="bg-accent/10 text-accent border-accent/30 rounded-pill">{children}</Badge>
  )
}
