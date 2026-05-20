import {
  Boxes, Eye, FileSignature, Globe2, Headphones,
  ScanLine, ShieldCheck, Users, Wallet,
} from 'lucide-react'
import type { Capability } from '@/types/site'

import capInitia from '@/assets/photos/cap-initia.jpg'
import capAtencaoBasica from '@/assets/photos/cap-atencao-basica.jpg'
import capCloudhealth from '@/assets/photos/cap-cloudhealth.jpg'
import capMedplace from '@/assets/photos/cap-medplace.jpg'
import capSkymed from '@/assets/photos/cap-skymed.jpg'
import capZerodox from '@/assets/photos/cap-zerodox.jpg'
import capStargrid from '@/assets/photos/cap-stargrid.jpg'
import capVision from '@/assets/photos/cap-vision.jpg'
import capTihospitalar from '@/assets/photos/cap-tihospitalar.jpg'

// Logos oficiais dos produtos
import logoCloudhealth from '@/assets/logos/cloudhealth.svg'
import logoMedplace from '@/assets/logos/medplace.svg'
import logoSkymed from '@/assets/logos/skymed.svg'
import logoZerodox from '@/assets/logos/zerodox.svg'
import logoStargrid from '@/assets/logos/stargrid.svg'
import logoTihospitalar from '@/assets/logos/tihospitalar.svg'

/**
 * Capacidades do Ecossistema Salux — 9 capacidades.
 *
 * FONTE CANÔNICA: Conteúdo Revisado – Site.docx (página Soluções).
 * Headlines, narrativas (2 parágrafos) e deliverables (8-9 bullets) são
 * EXTRAÍDOS INTEGRALMENTE do DOCX — sem reescrita criativa.
 *
 * Nomenclatura oficial (briefing + DOCX validação):
 * - Initia + SX Sigma  → Base inteligente para gestão hospitalar integrada
 * - Atenção básica e saúde populacional (NÃO "Horizon")
 * - CloudHealth.AI     → Telessaúde e acesso ao cuidado especializado
 * - Med.Place          → Diagnóstico por imagem com continuidade operacional
 * - SkyMed             → Governança anestésica e centro cirúrgico
 * - ZeroDox            → Governança documental e operação sem papel
 * - StarGrid           → Governança da força de trabalho
 * - TI Hospitalar      → BPO do ciclo de receita e proteção de valor
 * - Vision Pilot       → Monitoramento inteligente de fluxos e ambientes hospitalares
 */
export const capabilities: Capability[] = [
  {
    slug: 'initia',
    commercialName: 'Initia + SX Sigma',
    title: 'Base inteligente para gestão hospitalar integrada',
    headline: 'Gestão hospitalar integrada para uma nova geração de operação em saúde',
    tagline:
      'Plataforma nativamente inteligente que conecta prontuário, processos assistenciais, administrativos e financeiros numa única base de dados.',
    description:
      'A gestão hospitalar é a base da operação em saúde. Com o SX Sigma, a Salux consolidou uma plataforma robusta. Com o Initia, essa base evolui para uma nova geração — mais inteligente, coordenada e governada.',
    narrative: [
      'A gestão hospitalar é a base da operação em saúde. Com o SX Sigma, a Salux consolidou uma plataforma robusta para integrar prontuário eletrônico, processos assistenciais, administrativos, financeiros e operacionais. Com o Initia, essa base evolui para uma nova geração, mais inteligente e coordenada, em que dados, fluxos e decisões passam a operar com mais contexto, governança e previsibilidade.',
      'O Initia é também onde nasce a camada agêntica do Ecossistema Salux. Diferente de automações pontuais ou chatbots, os agentes do Initia atuam como uma camada operacional distribuída — capaz de informar, analisar, recomendar e executar fluxos sob governança, em níveis progressivos de atuação. A operação deixa de ser apenas navegada e passa a ser ativada por inteligência.',
    ],
    deliverables: [
      'Prontuário eletrônico integrado à operação assistencial, administrativa e financeira',
      'Integração entre assistência, operação, administração e finanças',
      'Organização de processos hospitalares em uma lógica conectada e rastreável',
      'Apoio à gestão da jornada do paciente dentro da instituição',
      'Visibilidade ampliada sobre dados, fluxos e indicadores operacionais',
      'Redução de fragmentações e retrabalho entre áreas',
      'Apoio à governança e à tomada de decisão com mais contexto',
      'Agentes de inteligência que informam, analisam, recomendam e executam fluxos sob governança',
      'Plataforma escalável para operações hospitalares de diferentes portes e complexidades',
    ],
    icon: Boxes,
    accent: 'primary',
    image: capInitia,
    journeyStages: ['recepcao', 'atendimento', 'internacao-e-operacao', 'alta-e-continuidade', 'backoffice'],
    cta: { label: 'Conheça a solução', href: '/capacidades/initia', variant: 'primary' },
  },

  {
    slug: 'atencao-basica',
    commercialName: 'Atenção básica e saúde populacional',
    title: 'Atenção básica e saúde populacional',
    headline: 'Tecnologia para atenção básica, saúde populacional e continuidade do cuidado',
    tagline:
      'Tecnologia para apoiar a gestão da atenção básica, o cuidado populacional e a continuidade da jornada do paciente.',
    description:
      'Tecnologia para apoiar a gestão da atenção básica, o cuidado populacional e a continuidade da jornada do paciente, com recursos para organizar dados, filas, atendimentos, exames, informações clínicas e redes de cuidado em uma lógica integrada e orientada à população.',
    narrative: [
      'A atenção básica é a porta de entrada do sistema de saúde. Gerir bem esse nível exige tecnologia capaz de organizar dados populacionais, coordenar o cuidado contínuo, conectar diferentes pontos da rede e apoiar gestores e equipes assistenciais na tomada de decisões orientadas à população.',
      'A solução para atenção básica e saúde populacional do Ecossistema Salux é construída para essa realidade — 100% SaaS, com inteligência artificial nativa, desenvolvida para a complexidade do SUS e das redes públicas de saúde.',
    ],
    deliverables: [
      'Gestão inteligente de filas, agendamentos, consultas e exames',
      'IA nativa para análise de fluxos, identificação de gargalos e apoio à priorização',
      'Painéis em tempo real para monitoramento da saúde populacional',
      'Integração com UBS, hospitais, clínicas, laboratórios e RNDS',
      'Registros clínicos estruturados em S.O.A.P.',
      'Histórico completo do paciente disponível em diferentes pontos da rede de atenção',
      'Recursos para gestão de doenças crônicas, odontologia e receituário digital',
      'Apoio à gestão pública, atenção básica e cuidado contínuo em regiões remotas',
    ],
    icon: Globe2,
    accent: 'accent',
    image: capAtencaoBasica,
    journeyStages: ['antes-da-chegada', 'atendimento', 'alta-e-continuidade'],
    cta: { label: 'Conheça a solução', href: '/capacidades/atencao-basica', variant: 'outline' },
  },

  {
    slug: 'cloudhealth',
    commercialName: 'CloudHealth.AI',
    title: 'Telessaúde e acesso ao cuidado especializado',
    headline: 'Telessaúde para ampliar o acesso ao cuidado especializado',
    tagline:
      'Plataforma de telessaúde para conectar especialistas, instituições e pacientes — ampliando acesso em diferentes regiões.',
    description:
      'Plataforma de telessaúde para conectar especialistas, instituições e pacientes, ampliando o acesso ao cuidado em diferentes regiões e apoiando a organização do atendimento ambulatorial com dados clínicos, agendas e dispositivos médicos integrados.',
    narrative: [
      'A distância não pode ser um obstáculo ao cuidado. A CloudHealth.AI é a plataforma de telessaúde e jornadas ambulatoriais digitais do Ecossistema Salux, conectando instituições, profissionais de saúde e pacientes em um ambiente integrado, seguro e preparado para sustentar o atendimento com qualidade assistencial e continuidade das informações clínicas.',
      'Mais do que viabilizar a teleconsulta, a CloudHealth.AI apoia instituições na organização do acesso ao cuidado especializado — especialmente em contextos com menor disponibilidade de especialistas — mantendo dados clínicos, agendas e dispositivos médicos integrados em um único fluxo.',
    ],
    deliverables: [
      'Teleconsultas e atendimento digital com qualidade assistencial',
      'Prontuário eletrônico integrado ao fluxo de telessaúde',
      'Orquestração de agendas e rede colaborativa de profissionais de saúde',
      'Integração com dispositivos médicos e dados vitais em tempo real',
      'Apoio à jornada ambulatorial de pacientes, instituições e profissionais',
      'Receituários, atestados e documentos digitais com validade legal',
      'Integração com sistemas de saúde e fluxos institucionais existentes',
      'Suporte à ampliação do acesso em hospitais, clínicas e redes assistenciais',
    ],
    icon: Headphones,
    accent: 'primary',
    image: capCloudhealth,
    logo: logoCloudhealth,
    journeyStages: ['antes-da-chegada', 'atendimento', 'alta-e-continuidade'],
    cta: { label: 'Conheça a CloudHealth.AI', href: '/capacidades/cloudhealth', variant: 'outline' },
  },

  {
    slug: 'medplace',
    commercialName: 'Med.Place',
    title: 'Diagnóstico por imagem com continuidade operacional',
    headline: 'Diagnóstico por imagem com disponibilidade, segurança e continuidade',
    tagline:
      'Integração de infraestrutura, tecnologia e médicos especialistas para garantir o funcionamento contínuo de exames, laudos e fluxos diagnósticos.',
    description:
      'Integração de infraestrutura, tecnologia e médicos especialistas para garantir o funcionamento contínuo de exames, laudos e fluxos diagnósticos, com qualidade, segurança clínica e previsibilidade operacional.',
    narrative: [
      'O diagnóstico por imagem é uma etapa crítica da jornada do paciente. Garantir que ela funcione com qualidade, segurança clínica e previsibilidade operacional exige mais do que tecnologia: exige a integração de infraestrutura, plataforma e profissionais especializados em uma operação capaz de sustentar exames, laudos e fluxos diagnósticos sem interrupções.',
      'A Med.Place é a solução do Ecossistema Salux que combina telerradiologia, PACS em nuvem, rede de médicos especialistas e inteligência artificial para garantir continuidade operacional e apoio à decisão clínica em diagnóstico por imagem.',
    ],
    deliverables: [
      'Telerradiologia 24/7 e produção de laudos à distância',
      'PACS em nuvem para organização, armazenamento e acesso a imagens diagnósticas',
      'Rede de médicos especialistas conectados à plataforma',
      'Suporte humano qualificado para sustentar operações críticas',
      'Fluxos com rastreabilidade, segurança e boas práticas de proteção de dados em saúde',
      'Integração entre tecnologia, processos e especialistas',
      'Apoio à continuidade operacional do diagnóstico por imagem',
      'Inteligência artificial como suporte à operação e à decisão médica',
    ],
    icon: ScanLine,
    accent: 'accent',
    image: capMedplace,
    logo: logoMedplace,
    journeyStages: ['atendimento', 'diagnostico-e-procedimentos', 'internacao-e-operacao'],
    cta: { label: 'Conheça a Med.Place', href: '/capacidades/medplace', variant: 'outline' },
  },

  {
    slug: 'skymed',
    commercialName: 'SkyMed',
    title: 'Governança anestésica e centro cirúrgico',
    headline: 'Governança anestésica para maior segurança, rastreabilidade e conformidade no centro cirúrgico',
    tagline:
      'Registro anestésico digital como ativo clínico, jurídico e operacional — rastreabilidade ponta a ponta no centro cirúrgico.',
    description:
      'Tecnologia para estruturar o registro anestésico digital como ativo clínico, jurídico e operacional, fortalecendo segurança, rastreabilidade, conformidade e governança em áreas críticas do centro cirúrgico.',
    narrative: [
      'A anestesiologia é um dos pontos mais críticos da jornada assistencial. Estruturar o cuidado anestésico com segurança, documentação adequada e rastreabilidade não é apenas uma questão operacional — é uma exigência clínica, jurídica e de governança.',
      'A SkyMed é a solução do Ecossistema Salux especializada em governança anestésica e centro cirúrgico, desenvolvida para estruturar o registro anestésico digital como um ativo clínico, jurídico e operacional. Sua atuação vai além da digitalização: a plataforma fortalece protocolos, padroniza processos, garante rastreabilidade e protege pacientes, profissionais e instituições.',
    ],
    deliverables: [
      'Checklist inteligente para avaliação pré-operatória, cirurgia segura e cuidados pós-anestésicos',
      'Monitoramento contínuo e registro estruturado dos parâmetros anestésicos',
      'Documentação automática de medicamentos, sinais vitais, eventos e intercorrências',
      'Protocolos, travas e campos obrigatórios para reforçar conformidade e padronização',
      'Assinatura digital, PDF criptografado e rastreabilidade para auditoria',
      'Integração com prontuários eletrônicos e sistemas hospitalares',
      'Business Intelligence e indicadores para gestão da anestesiologia',
      'Soluções para hospitais, grupos de anestesistas, clínicas veterinárias e profissionais volantes',
    ],
    icon: ShieldCheck,
    accent: 'primary',
    image: capSkymed,
    logo: logoSkymed,
    journeyStages: ['atendimento', 'diagnostico-e-procedimentos', 'internacao-e-operacao'],
    cta: { label: 'Conheça a SkyMed', href: '/capacidades/skymed', variant: 'outline' },
  },

  {
    slug: 'zerodox',
    commercialName: 'ZeroDox',
    title: 'Governança documental e operação sem papel',
    headline: 'Governança documental para uma operação em saúde mais segura, eficiente e sem papel',
    tagline:
      'Digitalização juridicamente válida de documentos, acervos e fluxos administrativos em saúde, com assinaturas eletrônicas.',
    description:
      'Digitalização juridicamente válida de documentos, acervos e fluxos administrativos em saúde, com assinaturas eletrônicas, rastreabilidade, conformidade, segurança e redução de papel, prazos e retrabalho.',
    narrative: [
      'A fragmentação documental gera riscos jurídicos, operacionais e financeiros que muitas vezes passam despercebidos. Extravios, retrabalho, processos manuais, conformidade fragilizada e dificuldade de acesso a informações críticas são desafios recorrentes em instituições de saúde que ainda dependem de papel.',
      'O ZeroDox é a solução do Ecossistema Salux para governança documental e operação sem papel, com foco em digitalização juridicamente válida de documentos, acervos e processos administrativos. A plataforma não apenas elimina o papel — ela estrutura fluxos digitais com rastreabilidade, conformidade, segurança e eficiência operacional como base para uma saúde digital que funciona na prática.',
    ],
    deliverables: [
      'Digitalização de documentos e acervos com validade jurídica comprobatória',
      'OCR e indexação para localização rápida de informações',
      'Assinatura eletrônica com conformidade jurídica',
      'Workflows digitais para aprovações, tramitações e processos internos',
      'Recepção digital com coleta de documentos e assinaturas',
      'Rastreabilidade de ponta a ponta em todos os fluxos documentais',
      'Segurança, armazenamento em nuvem e acesso remoto controlado',
      'Redução de papel, custos, prazos, perdas e retrabalho administrativo',
    ],
    icon: FileSignature,
    accent: 'accent',
    image: capZerodox,
    logo: logoZerodox,
    journeyStages: ['recepcao', 'atendimento', 'alta-e-continuidade', 'backoffice'],
    cta: { label: 'Conheça o ZeroDox', href: '/capacidades/zerodox', variant: 'outline' },
  },

  {
    slug: 'stargrid',
    commercialName: 'StarGrid',
    title: 'Governança da força de trabalho',
    headline: 'Governança da força de trabalho para operações de saúde complexas',
    tagline:
      'Gestão inteligente de escalas, jornadas, alocação de equipes, trocas, horas extras, banco de horas e conformidade operacional.',
    description:
      'Gestão inteligente de escalas, jornadas, alocação de equipes, trocas, horas extras, banco de horas e conformidade operacional, com mais previsibilidade, rastreabilidade e controle em operações de saúde complexas.',
    narrative: [
      'Em instituições de saúde, a força de trabalho é simultaneamente o maior ativo e o maior ponto de risco operacional. Escalas mal estruturadas, absenteísmo não controlado, horas extras desgovernadas e dependência de planilhas geram custos ocultos, riscos assistenciais e perda de previsibilidade para a gestão.',
      'A StarGrid é a solução do Ecossistema Salux para governança da força de trabalho, criada para estruturar escalas, jornadas e equipes em ambientes que dependem de pessoas para manter a operação funcionando com segurança, previsibilidade e eficiência.',
    ],
    deliverables: [
      'Criação e gestão inteligente de escalas com base em regras e critérios operacionais',
      'Alocação de profissionais conforme competências, restrições e demanda assistencial',
      'Controle de horas extras, banco de horas e impactos financeiros em tempo real',
      'Trocas de plantão estruturadas, com validações automáticas e rastreabilidade',
      'Apoio à conformidade trabalhista e à defesa em auditorias',
      'Redução de retrabalho e eliminação de dependência de controles manuais',
      'Dados operacionais para decisões mais previsíveis e gestão mais estratégica',
      'Aplicação em ambientes complexos: saúde, hotelaria, segurança e operações 24/7',
    ],
    icon: Users,
    accent: 'primary',
    image: capStargrid,
    logo: logoStargrid,
    journeyStages: ['internacao-e-operacao', 'backoffice'],
    cta: { label: 'Conheça a StarGrid', href: '/capacidades/stargrid', variant: 'outline' },
  },

  {
    slug: 'vision-pilot',
    commercialName: 'Vision Pilot',
    title: 'Monitoramento inteligente de fluxos e ambientes hospitalares',
    headline: 'Inteligência visual para uma operação hospitalar mais eficiente e segura',
    tagline:
      'Visão computacional e IA para transformar fluxos, ocupação e sinais do ambiente físico em dados acionáveis.',
    description:
      'Uso de visão computacional e inteligência artificial para transformar fluxos, ocupação e sinais do ambiente físico em dados acionáveis para gestão, segurança e tomada de decisão em áreas críticas de instituições de saúde.',
    narrative: [
      'A operação hospitalar gera informação contínua no ambiente físico — fluxos, ocupação, tempos, protocolos, movimentos em áreas críticas. Mas essa informação raramente se transforma em dado acionável para a gestão. O resultado é uma operação que executa sem enxergar, e que identifica desvios só quando o impacto já aconteceu.',
      'O Vision Pilot é a solução do Ecossistema Salux que transforma ambientes assistenciais e operacionais em dados estruturados em tempo real, por meio de visão computacional e inteligência artificial — sem lógica de vigilância pessoal.',
    ],
    deliverables: [
      'Leitura contínua de fluxos, ocupação e tempos em áreas críticas',
      'Identificação de gargalos, ociosidade e desvios operacionais em tempo real',
      'Monitoramento de conformidade de protocolos e aderência ao mapa cirúrgico',
      'Gestão de ativos de alto valor com visibilidade de uso e disponibilidade',
      'Alertas automáticos para apoio à segurança do paciente em ambientes de alta sensibilidade',
      'Visibilidade objetiva sobre capacidade instalada e execução real',
      'Inteligência acionável para decisão com base em evidência contínua, não percepção',
    ],
    icon: Eye,
    accent: 'accent',
    image: capVision,
    journeyStages: ['diagnostico-e-procedimentos', 'internacao-e-operacao'],
    cta: { label: 'Conheça o Vision Pilot', href: '/capacidades/vision-pilot', variant: 'outline' },
  },

  {
    slug: 'tihospitalar',
    commercialName: 'TI Hospitalar',
    title: 'BPO do ciclo de receita e proteção de valor',
    headline: 'BPO do ciclo de receita para transformar produção assistencial em receita protegida',
    tagline:
      'Operação especializada em BPO e gestão do ciclo de receita hospitalar para transformar produção assistencial em receita reconhecida.',
    description:
      'Operação especializada em BPO e gestão do ciclo de receita hospitalar para transformar produção assistencial em receita reconhecida, prevenir glosas, reduzir perdas financeiras e proteger valor ao longo da jornada financeira da instituição.',
    narrative: [
      'A sustentabilidade financeira de uma instituição de saúde depende diretamente da eficiência com que sua produção assistencial se transforma em receita reconhecida. Glosas, perdas silenciosas, falhas de codificação e processos de faturamento fragmentados comprometem o fluxo financeiro e a capacidade de investimento da instituição.',
      'A TI Hospitalar é a solução do Ecossistema Salux voltada ao BPO e à gestão inteligente do ciclo de receita hospitalar. Sua atuação vai além da execução operacional do faturamento: estrutura o ciclo de receita de ponta a ponta, identifica perdas, previne glosas e transforma dados financeiros em insumos estratégicos para a gestão.',
    ],
    deliverables: [
      'Operação especializada em BPO do faturamento hospitalar',
      'Transformação da produção assistencial em receita estruturada, previsível e auditável',
      'Organização e controle completo do ciclo de receita',
      'Identificação proativa de falhas que impedem o reconhecimento da receita',
      'Prevenção de glosas e redução de perdas financeiras recorrentes',
      'Rastreabilidade e previsibilidade nos processos de faturamento',
      'Dados financeiros como apoio à gestão estratégica e à tomada de decisão',
      'Sustentabilidade financeira para instituições de saúde públicas e privadas',
    ],
    icon: Wallet,
    accent: 'primary',
    image: capTihospitalar,
    logo: logoTihospitalar,
    journeyStages: ['internacao-e-operacao', 'alta-e-continuidade', 'backoffice'],
    cta: { label: 'Conheça a solução', href: '/capacidades/tihospitalar', variant: 'outline' },
  },
]

/**
 * Helper: capacidades agrupadas por etapa da jornada.
 */
export function getCapabilitiesByStage(stageSlug: string) {
  return capabilities.filter((c) => c.journeyStages.includes(stageSlug as never))
}

export function getCapability(slug: string) {
  return capabilities.find((c) => c.slug === slug)
}
