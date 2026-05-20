import type { SolutionsPage } from '@/types/site'

/**
 * Página /capacidades (Soluções) — texto canônico DOCX (página Soluções).
 */
export const solutionsPage: SolutionsPage & {
  intro: string[]
  navigationPrompt: string
} = {
  meta: {
    title: 'Soluções · Capacidades do Ecossistema Salux',
    description:
      'Uma capacidade para cada ponto crítico da operação em saúde. Filtre por etapa da jornada do paciente: da atenção básica ao backoffice financeiro.',
    canonical: '/capacidades',
    keywords: [
      'soluções para hospitais',
      'capacidades do ecossistema salux',
      'gestão hospitalar integrada',
      'plataforma de saúde',
      'jornada do paciente',
    ],
  },
  hero: {
    eyebrow: 'Soluções',
    title: 'Uma capacidade para cada ponto crítico da operação em saúde',
    subtitle:
      'O Ecossistema Salux estrutura tecnologias especializadas para apoiar instituições de saúde em seus principais desafios.',
  },
  intro: [
    'O Ecossistema Salux estrutura tecnologias especializadas para apoiar instituições de saúde em seus principais desafios — da gestão hospitalar integrada à atenção básica, da jornada assistencial à sustentabilidade financeira.',
    'Cada capacidade atua sobre uma frente específica da operação, mas todas compartilham a mesma lógica: integrar processos, ampliar a inteligência da gestão e fortalecer a capacidade de cuidado.',
  ],
  navigationPrompt:
    'Navegue pela jornada abaixo e descubra quais capacidades do Ecossistema Salux atuam em cada etapa da operação.',
  filterByStage: true,
}
