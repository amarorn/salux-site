export type MetricCardProps = {
  /** Valor formatado (ex: "−68%", "2–3 dias → 45 min", "+600") */
  value: string
  /** Label descritivo abaixo do valor */
  label: string
}

/**
 * MetricCard
 * ----------
 * Métrica destacada usada em cases e indicadores. Tipografia display
 * com gradient bone, hover ativa shimmer.
 */
export function MetricCard({ value, label }: MetricCardProps) {
  return (
    <div className="rounded-card bg-secondary/30 p-5 relative overflow-hidden group">
      <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition" aria-hidden />
      <div className="relative font-display text-3xl leading-tight text-gradient-bone">{value}</div>
      <div className="mt-2 text-2xs text-muted-foreground">{label}</div>
    </div>
  )
}
