import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, ArrowUpRight, Brain, Sparkles } from 'lucide-react'
import { SaluxSymbol } from './SaluxLogo'

const swatches = [
  { token: 'background', tw: 'bg-background', text: 'text-foreground' },
  { token: 'foreground', tw: 'bg-foreground', text: 'text-background' },
  { token: 'primary', tw: 'bg-primary', text: 'text-primary-foreground' },
  { token: 'accent', tw: 'bg-accent', text: 'text-accent-foreground' },
  { token: 'secondary', tw: 'bg-secondary', text: 'text-secondary-foreground' },
  { token: 'muted', tw: 'bg-muted', text: 'text-muted-foreground' },
  { token: 'card', tw: 'bg-card border border-border', text: 'text-card-foreground' },
  { token: 'destructive', tw: 'bg-destructive', text: 'text-destructive-foreground' },
]

const opacityRamp = [10, 20, 30, 40, 60, 80, 100]

const typeScale = [
  { name: 'Display XL · hero', cls: 'font-display text-6xl tracking-display', sample: 'Coordenar saúde.' },
  { name: 'Display L · h2', cls: 'font-display text-5xl tracking-display', sample: 'Capacidades integradas.' },
  { name: 'Display M · h3', cls: 'font-display text-3xl tracking-display', sample: 'Camada agêntica.' },
  { name: 'Body L · lead', cls: 'text-lg text-pretty leading-relaxed', sample: 'Salux estrutura capacidades especializadas em uma arquitetura coordenada.' },
  { name: 'Body M · default', cls: 'text-base', sample: 'O agente identifica inconsistências antes do fechamento.' },
  { name: 'Body S · caption', cls: 'text-sm text-muted-foreground', sample: 'Etapa 03 · Internação e operação.' },
  { name: 'Label · uppercase mini', cls: 'font-mono text-mini uppercase tracking-label text-muted-foreground', sample: '03 · Jornada conectada' },
  { name: 'Tag · 2xs mono', cls: 'font-mono text-2xs uppercase tracking-kbd text-muted-foreground', sample: 'INITIA · NÍVEL 04' },
]

const radii = [
  { t: 'rounded-sm', d: 'calc(--radius − 4px)' },
  { t: 'rounded-md', d: 'calc(--radius − 2px)' },
  { t: 'rounded-lg', d: '--radius (0.75rem)' },
  { t: 'rounded-xl', d: '0.75rem default' },
  { t: 'rounded-2xl', d: '1rem default' },
  { t: 'rounded-card', d: '1rem · token' },
  { t: 'rounded-3xl', d: '1.5rem default' },
  { t: 'rounded-hero', d: '2rem · token' },
  { t: 'rounded-pill', d: '9999px · token' },
]

const motion = [
  { name: 'animate-orbit', d: 'rotação contínua · 40s' },
  { name: 'animate-marquee', d: 'translateX infinito · 40s' },
  { name: 'animate-pulse-slow', d: 'opacity 0.55↔1 · 4s' },
  { name: 'animate-float', d: 'translateY 12px · 8s' },
  { name: 'animate-shimmer', d: 'gradient sweep · 3s · hover only' },
  { name: 'reveal → .in', d: 'opacity + translateY 28px · IntersectionObserver' },
]

export function Styleguide() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <header className="space-y-4">
          <Badge variant="outline" className="rounded-pill border-primary/30 bg-primary/5 text-primary font-mono text-mini uppercase tracking-label">
            <Sparkles className="w-3 h-3 mr-1.5" /> Internal · v0.2
          </Badge>
          <h1 className="font-display text-6xl sm:text-7xl tracking-display leading-[0.95]">
            Salux <em className="italic text-gradient-emerald">Design System</em>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Referência viva dos tokens, escalas tipográficas e estados de componente.
            Atualize o source em <code className="font-mono text-sm bg-muted px-2 py-0.5 rounded">src/index.css</code> +
            <code className="font-mono text-sm bg-muted px-2 py-0.5 rounded ml-1">tailwind.config.js</code>.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <a href="#" className="text-sm text-primary hover:underline">← voltar ao site</a>
            <span className="text-muted-foreground">·</span>
            <a href="#colors" className="text-sm text-muted-foreground hover:text-foreground">Cores</a>
            <a href="#type" className="text-sm text-muted-foreground hover:text-foreground">Tipografia</a>
            <a href="#radius" className="text-sm text-muted-foreground hover:text-foreground">Radius</a>
            <a href="#components" className="text-sm text-muted-foreground hover:text-foreground">Componentes</a>
            <a href="#motion" className="text-sm text-muted-foreground hover:text-foreground">Motion</a>
          </div>
        </header>

        {/* Colors */}
        <section id="colors" className="space-y-6">
          <SectionHeader n="01" title="Cores semânticas" desc="Cada token reage automaticamente ao tema. Nunca usar literais como blue-500." />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {swatches.map((s) => (
              <div key={s.token} className="rounded-card overflow-hidden border border-border">
                <div className={`h-24 flex items-end p-3 ${s.tw} ${s.text}`}>
                  <span className="font-mono text-2xs uppercase tracking-label">{s.token}</span>
                </div>
                <div className="p-3 bg-card">
                  <code className="font-mono text-2xs text-muted-foreground">bg-{s.token}</code>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-display text-xl mt-10">Rampa de opacidade · primary</h3>
          <div className="grid grid-cols-7 gap-2">
            {opacityRamp.map((o) => (
              <div key={o} className="rounded-md overflow-hidden">
                <div className="h-14" style={{ backgroundColor: `hsl(var(--primary) / ${o/100})` }} />
                <div className="font-mono text-2xs text-muted-foreground mt-1 text-center">/{o}</div>
              </div>
            ))}
          </div>

          <h3 className="font-display text-xl mt-10">Brand gradient (símbolo)</h3>
          <div className="rounded-hero overflow-hidden h-24 bg-brand-gradient flex items-center px-6">
            <span className="font-mono text-mini uppercase tracking-label text-white/90">#08394d → #2e72b1 → #4a9cfa → #54c1ed</span>
          </div>
        </section>

        {/* Typography */}
        <section id="type" className="space-y-6">
          <SectionHeader n="02" title="Tipografia" desc="Sora (display) + Inter (corpo) + JetBrains Mono (labels/códigos)." />
          <div className="rounded-card border border-border divide-y divide-border">
            {typeScale.map((t) => (
              <div key={t.name} className="grid grid-cols-12 gap-4 p-5 items-baseline">
                <div className="col-span-3">
                  <div className="font-mono text-2xs uppercase tracking-label text-muted-foreground">{t.name}</div>
                  <code className="font-mono text-2xs text-primary/80 break-all">{t.cls}</code>
                </div>
                <div className="col-span-9">
                  <div className={t.cls}>{t.sample}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Radius */}
        <section id="radius" className="space-y-6">
          <SectionHeader n="03" title="Border radius" desc="3 tokens custom + defaults Tailwind." />
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            {radii.map((r) => (
              <div key={r.t} className="flex flex-col items-center gap-2">
                <div className={`w-20 h-20 ${r.t} bg-primary/20 border border-primary/40`} />
                <code className="font-mono text-2xs text-foreground">{r.t}</code>
                <span className="font-mono text-2xs text-muted-foreground text-center">{r.d}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Components */}
        <section id="components" className="space-y-10">
          <SectionHeader n="04" title="Componentes" desc="Estados e variantes." />

          {/* Buttons */}
          <div>
            <h3 className="font-display text-xl mb-4">Button</h3>
            <div className="rounded-card border border-border p-6 space-y-6">
              <Row label="Primary">
                <Button className="rounded-pill bg-primary hover:bg-primary/90 text-primary-foreground glow-primary">
                  Conheça o Ecossistema <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button disabled className="rounded-pill bg-primary text-primary-foreground">
                  Disabled
                </Button>
              </Row>
              <Row label="Outline / Secondary">
                <Button variant="outline" className="rounded-pill bg-secondary/40 hover:bg-secondary">
                  Conheça o Initia <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
              </Row>
              <Row label="Ghost">
                <Button variant="ghost">Falar com o time</Button>
              </Row>
              <Row label="Icon-only">
                <Button size="icon" variant="outline" className="rounded-pill" aria-label="Exemplo">
                  <Brain className="w-4 h-4" />
                </Button>
              </Row>
            </div>
          </div>

          {/* Badges */}
          <div>
            <h3 className="font-display text-xl mb-4">Badge / Eyebrow</h3>
            <div className="rounded-card border border-border p-6 flex flex-wrap gap-3">
              <Badge variant="outline" className="rounded-pill border-primary/30 bg-primary/5 text-primary font-mono text-mini uppercase tracking-label">
                01 · Hero
              </Badge>
              <Badge variant="outline" className="rounded-pill border-accent/30 bg-accent/5 text-accent font-mono text-mini uppercase tracking-label">
                02 · Problema
              </Badge>
              <Badge className="bg-primary/10 text-primary border-primary/30 rounded-pill font-mono text-mini uppercase tracking-label">
                <Brain className="w-3 h-3 mr-1.5" /> Camada transversal
              </Badge>
              <Badge className="bg-accent/10 text-accent border-accent/30 rounded-pill">5 níveis</Badge>
            </div>
          </div>

          {/* Capability card preview */}
          <div>
            <h3 className="font-display text-xl mb-4">CapabilityCard (preview)</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl glass p-6 border-gradient flex flex-col">
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-xl glass flex items-center justify-center text-primary">
                    <Brain className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-2xs uppercase tracking-label text-muted-foreground">Default</span>
                </div>
                <h3 className="mt-5 font-display text-2xl leading-tight">Estado default</h3>
                <p className="mt-3 text-sm text-muted-foreground flex-1">Glass + border gradient. Sem hover.</p>
              </div>
              <div className="rounded-2xl glass p-6 border-gradient flex flex-col bg-secondary/40 relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative flex items-start justify-between">
                  <div className="w-11 h-11 rounded-xl glass flex items-center justify-center text-primary">
                    <Brain className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-2xs uppercase tracking-label text-primary">Hover</span>
                </div>
                <h3 className="relative mt-5 font-display text-2xl leading-tight">Estado hover</h3>
                <p className="relative mt-3 text-sm text-muted-foreground flex-1">Blob azul aparece + bg sutil.</p>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div>
            <h3 className="font-display text-xl mb-4">Logo</h3>
            <div className="rounded-card border border-border p-6 flex items-center gap-10">
              <SaluxSymbol className="w-16 h-16" />
              <div className="flex items-center gap-2.5">
                <SaluxSymbol className="w-8 h-8" />
                <span className="font-display text-xl tracking-display">Salux</span>
              </div>
              <div className="flex items-center gap-2.5">
                <SaluxSymbol className="w-12 h-12" />
                <span className="font-display text-3xl tracking-display">Salux</span>
                <span className="text-2xs font-mono uppercase tracking-label text-muted-foreground border-l border-border pl-2">Ecossistema</span>
              </div>
            </div>
          </div>
        </section>

        {/* Motion */}
        <section id="motion" className="space-y-6">
          <SectionHeader n="05" title="Motion" desc="Todas as animações respeitam prefers-reduced-motion." />
          <div className="rounded-card border border-border divide-y divide-border">
            {motion.map((m) => (
              <div key={m.name} className="grid grid-cols-12 gap-4 p-5 items-center">
                <code className="col-span-4 font-mono text-sm text-primary">{m.name}</code>
                <div className="col-span-8 text-sm text-muted-foreground">{m.d}</div>
              </div>
            ))}
          </div>
          <div className="rounded-card border border-border p-6 flex items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-primary animate-pulse-slow" />
            <div className="w-12 h-12 rounded-full bg-accent animate-float" />
            <SaluxSymbol className="w-12 h-12 animate-orbit" />
            <span className="text-sm text-muted-foreground">amostras vivas</span>
          </div>
        </section>

        <footer className="pt-10 border-t border-border text-xs text-muted-foreground flex justify-between flex-wrap gap-3">
          <span>Salux Design System · {new Date().getFullYear()}</span>
          <span className="font-mono">/#styleguide</span>
        </footer>
      </div>
    </div>
  )
}

function SectionHeader({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-end justify-between border-b border-border pb-4">
      <div>
        <div className="font-mono text-2xs uppercase tracking-label text-primary">{n}</div>
        <h2 className="font-display text-3xl sm:text-4xl tracking-display mt-1">{title}</h2>
      </div>
      <p className="text-sm text-muted-foreground max-w-md">{desc}</p>
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 gap-4 items-center">
      <div className="col-span-3 font-mono text-2xs uppercase tracking-label text-muted-foreground">{label}</div>
      <div className="col-span-9 flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}
