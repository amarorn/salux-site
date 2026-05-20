import {
  Activity, CalendarClock, ClipboardList, HeartPulse,
  Microscope, Stethoscope, Wallet,
} from 'lucide-react'
import type { JourneyStage, Pillar } from '@/types/site'

/**
 * Jornada conectada — 7 etapas (PDF Home + briefing).
 * Ordem fiel: Antes da chegada → Recepção → Atendimento →
 * Diagnóstico e procedimentos → Internação e operação →
 * Alta e continuidade → Backoffice.
 */
export const journeyStages: JourneyStage[] = [
  {
    slug: 'antes-da-chegada',
    label: 'Antes da chegada',
    description: 'Agendamento, telessaúde e triagem inteligente.',
    icon: CalendarClock,
  },
  {
    slug: 'recepcao',
    label: 'Recepção',
    description: 'Cadastro, documentos, autorizações e assinaturas digitais.',
    icon: ClipboardList,
  },
  {
    slug: 'atendimento',
    label: 'Atendimento',
    description: 'Prontuário, histórico clínico e informações integradas.',
    icon: Stethoscope,
  },
  {
    slug: 'diagnostico-e-procedimentos',
    label: 'Diagnóstico e procedimentos',
    description: 'Exames, laudos por imagem, anestesia e rastreabilidade cirúrgica.',
    icon: Microscope,
  },
  {
    slug: 'internacao-e-operacao',
    label: 'Internação e operação',
    description: 'Gestão de leitos, equipes, medicamentos e indicadores em tempo real.',
    icon: HeartPulse,
  },
  {
    slug: 'alta-e-continuidade',
    label: 'Alta e continuidade',
    description: 'Histórico estruturado, documentação e acompanhamento pós-atendimento.',
    icon: Activity,
  },
  {
    slug: 'backoffice',
    label: 'Backoffice',
    description:
      'Faturamento, auditoria, força de trabalho e sustentabilidade financeira.',
    icon: Wallet,
  },
]

/**
 * Pilares da jornada conectada — textos integrais do PDF Home.
 */
export const journeyPillars: Pillar[] = [
  {
    title: 'Cuidado integrado do início ao fim',
    description:
      'Informações, processos e equipes organizados para uma assistência mais fluida, segura e eficiente em cada etapa da jornada do paciente.',
  },
  {
    title: 'Inteligência aplicada à operação',
    description:
      'Com inteligência artificial embarcada e integração entre capacidades especializadas, o ecossistema automatiza rotinas críticas, reduz falhas e apoia decisões clínicas, operacionais e administrativas com mais contexto e previsibilidade.',
  },
  {
    title: 'Tecnologia com propósito real',
    description:
      'A tecnologia da Salux atua onde gera valor concreto: simplificando a complexidade da operação, ampliando a resolutividade assistencial e melhorando a experiência de pacientes, profissionais e gestores de saúde.',
  },
]
