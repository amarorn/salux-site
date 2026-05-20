import type { LucideIcon } from 'lucide-react'

/* ─────────────────────────────────────────── Tipos atômicos */

export type CTA = {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
}

export type NavLink = { label: string; href: string }

export type SEOMeta = {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  keywords?: string[]
}

/* ─────────────────────────────────────────── Jornada */

export type JourneyStageSlug =
  | 'antes-da-chegada'
  | 'recepcao'
  | 'atendimento'
  | 'diagnostico-e-procedimentos'
  | 'internacao-e-operacao'
  | 'alta-e-continuidade'
  | 'backoffice'

export type JourneyStage = {
  slug: JourneyStageSlug
  label: string
  description: string
  icon: LucideIcon
}

export type Pillar = { title: string; description: string }

/* ─────────────────────────────────────────── Camada agêntica */

export type AgenticLevel = {
  level: string        // "01" .. "05"
  name: string         // "Informar" .. "Coordenar"
  description: string
}

/* ─────────────────────────────────────────── Capacidades */

export type CapabilitySlug =
  | 'initia'
  | 'atencao-basica'
  | 'cloudhealth'
  | 'medplace'
  | 'skymed'
  | 'zerodox'
  | 'stargrid'
  | 'vision-pilot'
  | 'tihospitalar'

export type Capability = {
  slug: CapabilitySlug
  /** Nome comercial oficial (ex: "Initia + SX Sigma", "CloudHealth.AI") */
  commercialName: string
  /** Título institucional curto (label/subtítulo) — "Base inteligente para gestão hospitalar integrada" */
  title: string
  /** H2 narrativo canônico (DOCX) — usado no hero da página de detalhe */
  headline: string
  /** Resumo curto pra card (1 linha) */
  tagline: string
  /** Descrição institucional resumida (PDF home/quem somos) */
  description: string
  /** Narrativa rica — 2 parágrafos canônicos do DOCX */
  narrative: string[]
  /** Lista canônica "Capacidades entregues" (DOCX) — 8-9 bullets */
  deliverables: string[]
  icon: LucideIcon
  accent: 'primary' | 'accent'
  /** Foto representativa (cards de capacidade, hero) */
  image?: string
  /** Logo oficial da marca/produto (SVG) — usado no hero da página de detalhe */
  logo?: string
  /** Etapas da jornada que esta capacidade cobre */
  journeyStages: JourneyStageSlug[]
  cta: CTA
}

/* ─────────────────────────────────────────── Cases */

export type CaseMetric = { value: string; label: string }

export type CaseStudy = {
  slug: string
  capability: string // commercialName
  institution: string
  location: string
  headline: string
  /** Desafio — parágrafos canônicos (DOCX) */
  challenge: string[]
  /** Solução — parágrafos canônicos (DOCX) */
  solution: string[]
  metrics: CaseMetric[]
  /** Impacto além dos números — parágrafos canônicos (DOCX) */
  impactBeyondNumbers: string[]
  /** Próximo passo — parágrafo canônico (DOCX) */
  nextStep: string
  /** Texto do bloco CTA do case — parágrafos canônicos (DOCX) */
  ctaText: string[]
  cta: CTA
}

/* ─────────────────────────────────────────── Depoimentos */

export type Testimonial = {
  quote: string
  name: string
  role: string
  org: string
  avatar?: string
}

/* ─────────────────────────────────────────── FAQ */

export type FAQItem = { q: string; a: string }

/* ─────────────────────────────────────────── Contato */

export type ContactCard = {
  icon: LucideIcon
  title: string
  description: string
  cta?: CTA
}

export type ContactInfo = {
  email: string
  phone: string
}

/* ─────────────────────────────────────────── Página agregadora */

export type HomePage = {
  meta: SEOMeta
  hero: {
    /** H1 canônico DOCX — "Ecossistema Salux" */
    title: string
    /** Subtítulo (value prop) — "Uma nova forma de coordenar..." */
    subtitle: string
    /** Parágrafo institucional descritivo (DOCX) */
    body: string
    ctas: CTA[]
  }
  problem: {
    title: string
    bullets: string[]
    body: string[]
    cta: CTA
  }
  journey: {
    title: string
    subtitle: string
    pillars: Pillar[]
    stages: JourneyStage[]
    cta: CTA
  }
  capabilities: {
    title: string
    body: string
    cta: CTA
    /** Bloco transversal de IA agêntica */
    agentic: {
      eyebrow: string
      title: string
      body: string
      levels: AgenticLevel[]
    }
  }
  credentials: {
    title: string
    subtitle: string
    tags: string[]
    cta: CTA
  }
  cases: {
    eyebrow: string
    title: string
  }
  testimonials: {
    eyebrow: string
    title: string
  }
  cta: {
    title: string
    subtitle: string
    contactCards: ContactCard[]
    formCta: CTA
    contact: ContactInfo
  }
}

export type QuemSomosPage = {
  meta: SEOMeta
  hero: {
    eyebrow: string
    title: string
    description: string
    body: string[]
  }
  bringel: {
    eyebrow: string
    title: string
    body: string[]
    cta: CTA
    featured: { name: string; subtitle: string }
  }
  ecosystem: {
    eyebrow: string
    title: string
    body: string[]
    cta: CTA
  }
}

export type InitiaPage = {
  meta: SEOMeta
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    /** 3 parágrafos canônicos do DOCX (transformação digital, ciclo expôs limite, Initia nasce) */
    body: string[]
    cta: CTA
  }
  newOperationalLogic: {
    title: string
    /** 3 parágrafos canônicos do DOCX (initium / ponto de virada) */
    body: string[]
  }
  agenticLayer: {
    eyebrow: string
    title: string
    body: string
    levels: AgenticLevel[]
  }
  delivers: {
    title: string
    /** Bullets canônicos do DOCX — sem ícones (texto puro) */
    items: string[]
  }
  ecosystemBase: {
    title: string
    /** 2 parágrafos canônicos do DOCX */
    body: string[]
    cta: CTA
  }
}

export type CasesPage = {
  meta: SEOMeta
  hero: {
    eyebrow: string
    title: string
    subtitle: string
  }
  featured: CaseStudy
}

export type SolutionsPage = {
  meta: SEOMeta
  hero: {
    eyebrow: string
    title: string
    subtitle: string
  }
  /** Filtros disponíveis por etapa da jornada */
  filterByStage: boolean
}
