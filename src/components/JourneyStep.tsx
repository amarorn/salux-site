import type { LucideIcon } from 'lucide-react'

export type JourneyStepProps = {
  index: number
  total?: number
  label: string
  icon: LucideIcon
  isActive: boolean
  onActivate: () => void
}

/**
 * JourneyStep
 * -----------
 * Botão-tab da jornada do paciente. Ativa por hover, foco ou click.
 * Deve ser usado dentro de um container com role="tablist".
 */
export function JourneyStep({
  index,
  label,
  icon: Icon,
  isActive,
  onActivate,
}: JourneyStepProps) {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-current={isActive ? 'step' : undefined}
      aria-label={`Etapa ${index + 1}: ${label}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      className="group text-left flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-card"
    >
      <div
        className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
          isActive
            ? 'bg-primary text-primary-foreground scale-110 glow-primary'
            : 'glass text-primary'
        }`}
      >
        <Icon className="w-5 h-5" aria-hidden />
        {isActive && (
          <span
            className="absolute -inset-2 rounded-2xl border border-primary/40 animate-pulse-slow"
            aria-hidden
          />
        )}
      </div>
      <div className="mt-4 text-center">
        <div className="font-mono text-2xs text-muted-foreground">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div
          className={`mt-1 text-sm font-medium transition ${
            isActive ? 'text-foreground' : 'text-muted-foreground'
          }`}
        >
          {label}
        </div>
      </div>
    </button>
  )
}
