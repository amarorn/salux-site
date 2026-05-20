import type { CaseStudy, CasesPage } from '@/types/site'

/**
 * Case Hospital Ernesto Dornelles — texto canônico DOCX (página Cases).
 *
 * Métricas obrigatórias preservadas integralmente:
 * - Tempo escalas: 2-3 dias → 45 minutos
 * - Absenteísmo UTI 1: −68%   |   UTI 2: −53%
 * - Horas extras Unidade 1: −94%   |   Unidade 2: −80%
 * - Colaboradores ativos: +600
 *
 * Próximo passo canônico: "expandir para 1.800 profissionais".
 */
export const ernestoDornellesCase: CaseStudy = {
  slug: 'hospital-ernesto-dornelles',
  capability: 'StarGrid',
  institution: 'Hospital Ernesto Dornelles',
  location: 'Porto Alegre, RS',
  headline:
    'De dias para minutos: como a governança da força de trabalho transformou a gestão de escalas assistenciais',
  challenge: [
    'O Hospital Ernesto Dornelles, instituição de alta complexidade em Porto Alegre, enfrentava um desafio recorrente em ambientes assistenciais intensivos: escalas construídas manualmente, informações dispersas e alto volume de tempo dedicado à organização da força de trabalho.',
    'Solicitações de folga circulavam por memorandos, bilhetes e acordos informais, tornando o controle fragmentado e o risco de falhas operacionais elevado. Em algumas áreas, elaborar a escala de aproximadamente 200 colaboradores demandava de dois a três dias de trabalho.',
    'O resultado era previsível: retrabalho, absenteísmo não controlado, horas extras desgovernadas e lideranças com pouco espaço para atuar estrategicamente.',
  ],
  solution: [
    'A StarGrid foi implantada inicialmente nas áreas de maior criticidade assistencial — UTI e emergência — envolvendo mais de 600 colaboradores.',
    'Com a plataforma, os profissionais passaram a registrar folgas e preferências diretamente pelo aplicativo. Os gestores ganharam uma ferramenta para estruturar escalas com base em regras operacionais, competências, critérios assistenciais e sinalizações automáticas de risco — eliminando planilhas e reduzindo a dependência de controles manuais.',
  ],
  metrics: [
    { value: '2–3d → 45min', label: 'Tempo de elaboração de escalas' },
    { value: '−68%', label: 'Redução de absenteísmo · UTI 1' },
    { value: '−53%', label: 'Redução de absenteísmo · UTI 2' },
    { value: '−94%', label: 'Redução de horas extras · Unidade 1' },
    { value: '−80%', label: 'Redução de horas extras · Unidade 2' },
    { value: '+600', label: 'Colaboradores ativos na plataforma' },
  ],
  impactBeyondNumbers: [
    'A digitalização da governança de escalas trouxe três mudanças estruturais para o hospital: mais agilidade para os gestores, mais transparência para os colaboradores e mais controle estratégico para a instituição.',
    'Com menos tempo dedicado a processos manuais, as lideranças passaram a atuar com mais foco em decisões críticas — enquanto a operação ganhou previsibilidade, rastreabilidade e segurança.',
  ],
  nextStep:
    'Com os resultados alcançados nas áreas piloto, o Hospital Ernesto Dornelles planeja expandir o uso da StarGrid para toda a equipe assistencial, alcançando mais de 1.800 profissionais.',
  ctaText: [
    'Sua instituição também pode estruturar a governança da força de trabalho com mais inteligência.',
    'Com a tecnologia certa, é possível reduzir retrabalho, controlar custos, eliminar absenteísmo não gerenciado e construir escalas com mais previsibilidade, rastreabilidade e segurança operacional.',
  ],
  cta: { label: 'Fale com um especialista', href: '/#contato', variant: 'primary' },
}

export const casesPage: CasesPage = {
  meta: {
    title: 'Cases · Resultados reais. Desafios resolvidos. Operações transformadas — Salux',
    description:
      'Cases reais de instituições de saúde brasileiras que transformaram a operação com capacidades do Ecossistema Salux — gestão da força de trabalho, ciclo de receita e governança operacional.',
    canonical: '/cases',
    keywords: [
      'cases hospital',
      'StarGrid case',
      'governança da força de trabalho',
      'gestão de escalas hospitalar',
      'Hospital Ernesto Dornelles',
    ],
  },
  hero: {
    eyebrow: 'Cases',
    title: 'Resultados reais. Desafios resolvidos. Operações transformadas.',
    subtitle:
      'Como instituições de saúde brasileiras transformaram suas operações com capacidades do Ecossistema Salux.',
  },
  featured: ernestoDornellesCase,
}

export const allCases: CaseStudy[] = [ernestoDornellesCase]
