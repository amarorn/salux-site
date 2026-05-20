import type { InitiaPage } from '@/types/site'
import { agenticLevels } from './agentic'

/**
 * Página Initia — texto canônico DOCX (seção "SEÇÃO DEDICADA — Initia").
 *
 * Narrativa: digitalização → ciclo expôs limite → Initia nasce →
 * nova lógica operacional → conceito initium → camada agêntica →
 * o que entrega → base do ecossistema.
 *
 * Linha-âncora: "A operação deixa de ser navegada e passa a ser
 * ativada por inteligência."
 */
export const initiaPage: InitiaPage = {
  meta: {
    title: 'Initia · A nova geração de plataforma para operar a saúde — Salux',
    description:
      'Da digitalização à inteligência. Do registro à ação. Do sistema ao ecossistema. O Initia é a base nativamente inteligente do Ecossistema Salux.',
    canonical: '/capacidades/initia',
    keywords: [
      'Initia Salux',
      'plataforma agêntica em saúde',
      'gestão hospitalar integrada',
      'prontuário eletrônico inteligente',
      'operação ativada por inteligência',
    ],
  },

  hero: {
    eyebrow: 'Solução âncora · Initia + SX Sigma',
    title: 'Initia — A nova geração de plataforma para operar a saúde',
    subtitle: 'Da digitalização à inteligência. Do registro à ação. Do sistema ao ecossistema.',
    body: [
      'Durante anos, a transformação digital em saúde foi conduzida pela digitalização de processos: prontuários eletrônicos, sistemas de gestão, módulos especializados e integrações pontuais. Esse movimento foi necessário — organizou fluxos, reduziu dependência manual e criou uma base digital que antes não existia.',
      'Mas esse ciclo expôs um limite. Muitas instituições tornaram-se mais digitalizadas sem, necessariamente, tornarem-se mais coordenadas. Possuem sistemas, mas ainda dependem de costuras operacionais. Possuem dados, mas ainda precisam reconstruir contexto a cada etapa. E ainda perdem receita, fragmentam o cuidado e veem o paciente sair sem continuidade.',
      'O Initia nasce para superar esse limite.',
    ],
    cta: { label: 'Fale com um especialista', href: '/#contato', variant: 'primary' },
  },

  newOperationalLogic: {
    title: 'Uma nova lógica operacional',
    body: [
      'O Initia não é uma nova interface nem mais uma funcionalidade de IA. É uma nova lógica operacional — a passagem de sistemas orientados ao registro e à navegação para uma arquitetura nativamente inteligente, capaz de sustentar contexto, acionar agentes, orientar decisões e ativar fluxos em tempo real.',
      'Inspirado no conceito de initium — origem, ponto de partida — o Initia representa o instante em que a inteligência deixa de ser apenas potencial e passa a organizar a operação.',
      'O Initia é o ponto em que a operação deixa de ser navegada e passa a ser ativada por inteligência.',
    ],
  },

  agenticLayer: {
    eyebrow: 'Camada agêntica',
    title: 'Do dado à ação',
    body:
      'No Initia, os agentes de IA não são chatbots nem automações pontuais. São uma camada operacional distribuída que atua em níveis progressivos sobre cada dimensão da operação em saúde.',
    levels: agenticLevels,
  },

  delivers: {
    title: 'O que o Initia entrega',
    items: [
      'Prontuário eletrônico integrado à operação assistencial, administrativa e financeira',
      'Contexto clínico disponível em cada etapa da jornada, sem reconstrução manual',
      'Agentes que informam, analisam, recomendam e executam fluxos sob governança',
      'Integração entre assistência, operação, administração e finanças',
      'Visibilidade ampliada sobre dados, fluxos e indicadores operacionais',
      'Redução de fragmentações, costuras manuais e retrabalho entre áreas',
      'Base escalável para operações hospitalares de diferentes portes e complexidades',
    ],
  },

  ecosystemBase: {
    title: 'A base do ecossistema — e o ponto de partida da camada agêntica',
    body: [
      'O Initia é a solução âncora do Ecossistema Salux. É nele que a camada agêntica nasce — e é a partir dele que essa inteligência se expande progressivamente para as demais capacidades do ecossistema.',
      'Uma base que deixa de apenas registrar a operação para sustentá-la com continuidade, visibilidade e capacidade real de decisão.',
    ],
    cta: { label: 'Explore o ecossistema completo', href: '/capacidades', variant: 'outline' },
  },
}
