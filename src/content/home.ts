import { Headphones, Sparkles, Workflow } from 'lucide-react'
import type { HomePage } from '@/types/site'
import { journeyPillars, journeyStages } from './journey'
import { agenticLevels } from './agentic'

/**
 * Página Home — todo o conteúdo extraído integralmente do PDF Home (1).pdf.
 * Textos preservados na íntegra; nenhuma reescrita criativa.
 */
export const homePage: HomePage = {
  meta: {
    title: 'Salux · Ecossistema de saúde digital para coordenar cuidado, operação e decisão',
    description:
      'O Ecossistema Salux estrutura capacidades especializadas que integram dados, fluxos e inteligência para transformar a operação de instituições de saúde públicas e privadas.',
    canonical: '/',
    keywords: [
      'ecossistema de saúde digital',
      'gestão hospitalar integrada',
      'inteligência artificial na saúde',
      'plataforma operacional em saúde',
      'gestão de instituições de saúde',
    ],
  },

  hero: {
    title: 'Ecossistema Salux',
    subtitle: 'Uma nova forma de coordenar cuidado, operação, receita e decisão em saúde.',
    body:
      'O Ecossistema Salux estrutura capacidades especializadas que integram dados, fluxos e inteligência para transformar a operação de instituições de saúde públicas e privadas — tornando-a mais coordenada, eficiente e preparada para os desafios reais do setor.',
    ctas: [
      { label: 'Conheça o Ecossistema', href: '#capacidades', variant: 'primary' },
      { label: 'Fale com nosso time', href: '#contato', variant: 'outline' },
    ],
  },

  problem: {
    title: 'Onde a saúde perde eficiência, a Salux cria coordenação',
    bullets: [
      '+ mais clareza para gerir.',
      '+ mais inteligência para decidir.',
      '+ mais tempo para cuidar.',
    ],
    body: [
      'Na saúde, os desafios mais críticos surgem onde a operação perde coesão: dados fragmentados, sistemas que não se comunicam, equipes sobrecarregadas, retrabalho recorrente, perdas financeiras silenciosas e decisões que precisam ser tomadas com precisão.',
      'A Salux e todo o seu ecossistema atua sobre esses pontos críticos. Não como um conjunto de ferramentas isoladas, mas como um ecossistema coordenado de capacidades — capaz de conectar cuidado, operação e decisão em uma mesma direção estratégica.',
      'Com visibilidade integrada sobre toda a jornada — do primeiro contato ao pós-atendimento — sua instituição ganha mais contexto para decidir, menos fricção para operar e mais capacidade de cuidar com eficiência e segurança.',
    ],
    cta: { label: 'Conheça o ecossistema', href: '#capacidades', variant: 'primary' },
  },

  journey: {
    title: 'Uma jornada conectada, do cuidado à gestão',
    subtitle:
      'O Ecossistema Salux atua em diferentes pontos da jornada do paciente, conectando dados, processos e equipes para integrar assistência, operação e gestão em uma mesma lógica.',
    pillars: journeyPillars,
    stages: journeyStages,
    cta: { label: 'Entenda a jornada completa', href: '/capacidades', variant: 'outline' },
  },

  capabilities: {
    title:
      'Capacidades integradas para resolver desafios reais da operação em saúde',
    body:
      'O Ecossistema Salux organiza capacidades especializadas em gestão hospitalar, atenção básica, telessaúde, diagnóstico por imagem, governança documental, gestão da força de trabalho, BPO do ciclo de receita e inteligência artificial aplicada à saúde. Mais do que conectar tecnologias, estrutura uma base coordenada para ampliar eficiência, segurança, previsibilidade e inteligência na gestão de instituições de saúde.',
    cta: { label: 'Explore todas as capacidades', href: '/capacidades', variant: 'outline' },
    agentic: {
      eyebrow: 'Camada Agêntica · Ecossistema Salux',
      title: 'Camada agêntica de inteligência operacional',
      body:
        'Os agentes de IA do Ecossistema Salux não são chatbots nem automações pontuais. São uma camada operacional distribuída que atua em níveis progressivos sobre a operação em saúde: informam o que é relevante no momento certo, analisam riscos antes que se tornem problemas, recomendam ações com base em contexto real, executam fluxos sob governança e coordenam processos que antes dependiam de esforço manual e costuras operacionais. Nascida no Initia, essa camada agêntica está em expansão para todo o ecossistema — e representa a virada de lógica que a Salux traz para a saúde: a operação deixa de ser apenas registrada e navegada para ser ativada por inteligência.',
      levels: agenticLevels,
    },
  },

  credentials: {
    title: 'Tecnologia criada para a realidade da saúde brasileira',
    subtitle:
      'A Salux combina mais de 25 anos de experiência no setor, presença nacional e capacidades especializadas para apoiar instituições públicas e privadas em desafios complexos de gestão, cuidado e operação.',
    tags: [
      '+25 anos de atuação no setor de saúde',
      'Ecossistema em expansão contínua',
      'Presença nacional',
      'Parte do Grupo Bringel',
      'Soluções para saúde pública e privada',
    ],
    cta: { label: 'Conheça nossos cases', href: '/cases', variant: 'outline' },
  },

  cases: {
    eyebrow: 'Cases · Resultados reais',
    title: 'Desafios resolvidos. Operações transformadas.',
  },

  testimonials: {
    eyebrow: 'Depoimentos',
    title: 'Confiada por quem opera saúde de verdade',
  },

  cta: {
    title:
      'Avance para um novo patamar de gestão, cuidado e inteligência em saúde',
    subtitle:
      'Converse com o time Salux e descubra como o ecossistema pode responder aos desafios específicos da sua instituição.',
    contactCards: [
      {
        icon: Headphones,
        title: 'Suporte Técnico',
        description:
          'Precisa de ajuda? Nossa equipe técnica está disponível para resolver qualquer questão rapidamente.',
      },
      {
        icon: Workflow,
        title: 'Parcerias Estratégicas',
        description:
          'Interessado em estabelecer uma parceria? Conecte-se conosco para explorar oportunidades de colaboração.',
      },
      {
        icon: Sparkles,
        title: 'Conversa com Comercial',
        description:
          'Está pronto para conhecer nossas soluções? Nossa equipe está pronta para mostrar como podemos acelerar seus resultados.',
      },
    ],
    formCta: { label: 'Enviar mensagem', href: '#', variant: 'primary' },
    contact: {
      email: 'comercial@salux.com.br',
      phone: '0800 123 4567',
    },
  },
}
