import type { QuemSomosPage } from '@/types/site'

/**
 * Página Quem Somos — textos integrais do PDF Quem Somos (1).pdf.
 */
export const quemSomosPage: QuemSomosPage = {
  meta: {
    title: 'Quem Somos · Salux — Tecnologia feita para transformar a saúde brasileira',
    description:
      'A Salux é uma empresa de soluções tecnológicas para a operação em saúde — cobrindo toda a jornada do paciente, com uma camada de inteligência que os sistemas tradicionais ainda não têm.',
    canonical: '/quem-somos',
    keywords: [
      'sobre a Salux',
      'Grupo Bringel',
      'tecnologia em saúde',
      'ERP HIS evolução',
      'plataforma agêntica em saúde',
    ],
  },

  hero: {
    eyebrow: 'Quem Somos',
    title: 'Somos a Salux. Tecnologia feita para transformar a saúde brasileira.',
    description:
      'A Salux é uma empresa de soluções tecnológicas para a operação em saúde cobrindo toda a jornada do paciente, com uma camada de inteligência que os sistemas tradicionais ainda não têm.',
    body: [
      'Nascemos com um propósito claro: democratizar o acesso à tecnologia para a saúde. Há mais de 25 anos, acompanhamos cada transformação do setor e preservamos o que mais importa — o conhecimento profundo da operação por dentro.',
      'Essa trajetória nos trouxe até a nova geração. Nossas soluções representam a evolução da lógica tradicional do ERP e do HIS e inauguram um novo patamar: o da operação ativada por inteligência, em que agentes não apenas informam, mas analisam, recomendam e executam nos fluxos da instituição. São capacidades diferentes conectadas por uma mesma direção: ajudar instituições a operar com mais controle, integração e sustentabilidade.',
    ],
  },

  bringel: {
    eyebrow: 'Nossa evolução',
    title: 'Parte do Grupo Bringel. Com a retaguarda certa para crescer.',
    body: [
      'A Salux e todo o seu ecossistema integram o Grupo Bringel, com mais de 44 anos de experiência, presença em 14 estados, mais de 4 mil colaboradores e uma estrutura que conecta inovação, capital e visão estratégica para acelerar o crescimento dos negócios em diferentes setores.',
      'Isso significa mais capacidade de expansão, mais velocidade de desenvolvimento e mais força para levar o ecossistema a novas instituições e mercados, mantendo o foco no que sempre nos moveu: resolver os desafios reais da operação em saúde.',
    ],
    cta: {
      label: 'Conheça mais do Grupo Bringel',
      href: 'https://grupobringel.com.br',
      variant: 'primary',
    },
    featured: {
      name: 'Klelton Bringel',
      subtitle: '+ de 30 anos no setor de saúde',
    },
  },

  ecosystem: {
    eyebrow: 'Ecossistema Salux',
    title: 'Capacidades conectadas para uma saúde mais inteligente',
    body: [
      'O Ecossistema Salux estrutura tecnologias e serviços especializados em uma arquitetura coordenada para responder aos principais desafios da saúde brasileira.',
      'Cada capacidade atua sobre uma necessidade específica da operação — da jornada assistencial à sustentabilidade financeira — conectando dados, processos e equipes para gerar mais eficiência, segurança e inteligência na gestão de instituições de saúde.',
      'Essa integração permite que instituições públicas e privadas avancem com mais clareza, reduzam fragmentações e contem com capacidades complementares para cuidar melhor, operar com mais previsibilidade e tomar melhores decisões.',
    ],
    cta: {
      label: 'Ver todas as capacidades do ecossistema',
      href: '/capacidades',
      variant: 'outline',
    },
  },
}
