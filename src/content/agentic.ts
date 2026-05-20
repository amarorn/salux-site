import type { AgenticLevel } from '@/types/site'

/**
 * Camada agêntica do Initia — 5 níveis (briefing).
 *
 * IMPORTANTE: A IA da Salux NÃO é chatbot. É uma camada operacional
 * agêntica transversal — agentes que informam, analisam, recomendam,
 * executam e coordenam fluxos sob governança.
 *
 * Narrativa central: "A operação deixa de ser apenas registrada e
 * navegada para ser ativada por inteligência."
 */
export const agenticLevels: AgenticLevel[] = [
  {
    level: '01',
    name: 'Informar',
    description:
      'Resumos de prontuário, pendências financeiras, alertas de escala, status da rede.',
  },
  {
    level: '02',
    name: 'Analisar',
    description:
      'Risco de glosa, risco assistencial, gargalo diagnóstico, desvios operacionais.',
  },
  {
    level: '03',
    name: 'Recomendar',
    description:
      'Correção documental, priorização de paciente, remanejamento de equipe.',
  },
  {
    level: '04',
    name: 'Executar sob controle',
    description:
      'Abrir pendência, direcionar fluxo, iniciar validação — sempre sob governança.',
  },
  {
    level: '05',
    name: 'Coordenar',
    description:
      'Alta assistida, ciclo de receita, continuidade pós-alta, fluxo diagnóstico integrado.',
  },
]
