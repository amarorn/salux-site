import type { FAQItem } from '@/types/site'

/**
 * FAQ canônica — extraída integralmente do DOCX (seção "FAQ para AEO").
 * 12 perguntas técnicas/conceituais com respostas longas, ancoradas no
 * vocabulário oficial Salux. Pronta para JSON-LD FAQPage schema.org.
 */
export const faq: FAQItem[] = [
  {
    q: 'O que é uma camada agêntica em saúde?',
    a: 'Uma camada agêntica em saúde é uma estrutura de inteligência artificial distribuída que atua de forma contínua sobre a operação — não como automação pontual ou chatbot, mas como uma camada capaz de observar dados, interpretar contextos, priorizar riscos, recomendar ações e executar fluxos sob governança. Diferente dos sistemas tradicionais, que registram e armazenam, os agentes atuam: informam o que é relevante no momento certo, analisam riscos antes que se tornem problemas, recomendam com base em contexto real e executam dentro dos fluxos da instituição.',
  },
  {
    q: 'Qual a diferença entre automação e agentes de IA na operação hospitalar?',
    a: 'A automação executa tarefas predefinidas em condições específicas — ela repete. Os agentes de IA interpretam contexto, identificam variações, recomendam respostas e executam fluxos de forma adaptativa — eles raciocinam. Na operação hospitalar, a automação pode enviar um alerta quando um prazo vence. Um agente identifica que aquele prazo está em risco três etapas antes, recomenda uma correção e, se autorizado, executa a ação sem depender de intervenção manual.',
  },
  {
    q: 'Como a inteligência artificial pode coordenar fluxos em hospitais?',
    a: 'Por meio de agentes de IA aplicados à operação, é possível conectar fluxos que hoje dependem de costuras manuais entre sistemas, áreas e profissionais. No Ecossistema Salux, os agentes atuam em níveis progressivos: informam pendências e contextos críticos, analisam riscos assistenciais e financeiros, recomendam ações corretivas, executam etapas sob governança e coordenam processos completos — como o ciclo de receita, a continuidade pós-alta e o fluxo diagnóstico integrado.',
  },
  {
    q: 'O que significa a operação em saúde ser ativada por inteligência?',
    a: 'Significa que a operação deixa de depender exclusivamente de navegação manual entre sistemas e reconstrução de contexto a cada etapa. Com uma camada agêntica, os dados se transformam em ação coordenada: o profissional recebe o que é relevante no momento certo, os riscos são sinalizados antes de se materializarem e os fluxos são ativados com base em contexto real — não em regras fixas ou intervenção manual constante. A operação passa de reativa para coordenada.',
  },
  {
    q: 'Como agentes de IA atuam na gestão hospitalar sem substituir profissionais?',
    a: 'Os agentes atuam como suporte à decisão e à execução, não como substitutos. Eles filtram ruído, sintetizam contexto, identificam prioridades e executam etapas de baixo valor decisório — liberando profissionais para atuar onde o julgamento humano é insubstituível. Na prática: o agente identifica uma inconsistência de faturamento e abre a pendência; o gestor decide como resolvê-la. O agente sinaliza risco de queda em leito monitorado; a enfermeira intervém. A inteligência organiza — o profissional decide e cuida.',
  },
  {
    q: 'Como integrar a gestão hospitalar com a atenção básica?',
    a: 'A integração entre gestão hospitalar e atenção básica exige uma arquitetura que conecte dados, fluxos e pontos de cuidado em uma lógica comum. O Ecossistema Salux estrutura essa conexão por meio de capacidades complementares: a base inteligente para gestão hospitalar integrada organiza prontuário, processos assistenciais e operação dentro da instituição, enquanto a solução para atenção básica e saúde populacional conecta UBS, redes de cuidado, histórico do paciente e gestão de filas em uma lógica orientada à população — com integração à RNDS e dados compartilhados entre os pontos da rede.',
  },
  {
    q: 'Qual a melhor solução para governança documental em hospitais?',
    a: 'Governança documental em hospitais exige mais do que digitalização. Exige validade jurídica, rastreabilidade ponta a ponta, assinatura eletrônica, workflows configuráveis, conformidade regulatória e redução de retrabalho. O ZeroDox, solução do Ecossistema Salux para governança documental e operação sem papel, estrutura fluxos digitais com essas características — eliminando extravios, acelerando processos e criando uma base documental confiável para a saúde digital funcionar na prática.',
  },
  {
    q: 'Como reduzir glosas e melhorar o ciclo de receita hospitalar?',
    a: 'A glosa é o sintoma final de um problema que se forma muito antes — no registro, na documentação, na codificação e na rastreabilidade da produção assistencial. Reduzi-la exige atuar na origem: garantir que cada etapa da jornada gere o registro correto no momento certo. O Ecossistema Salux aborda o ciclo de receita de ponta a ponta, com BPO especializado, auditoria preventiva, rastreabilidade documental e agentes de IA que identificam inconsistências antes do fechamento da conta — transformando produção assistencial em receita reconhecida e protegida.',
  },
  {
    q: 'O que é BPO do ciclo de receita em saúde?',
    a: 'BPO do ciclo de receita em saúde é a terceirização especializada da operação de faturamento hospitalar — da produção assistencial ao reconhecimento da receita. Vai além da execução operacional: envolve auditoria preventiva, identificação de perdas silenciosas, prevenção de glosas, rastreabilidade e leitura estratégica dos dados financeiros. No Ecossistema Salux, essa capacidade transforma o faturamento em uma função gerenciada com previsibilidade, governança e proteção de valor ao longo de toda a jornada financeira da instituição.',
  },
  {
    q: 'Como ampliar o acesso ao cuidado especializado com telessaúde?',
    a: 'Ampliar acesso com telessaúde exige mais do que viabilizar teleconsultas. Exige organizar agendas, conectar especialistas, integrar dados clínicos e manter continuidade das informações do paciente em cada atendimento. A CloudHealth.AI, plataforma de telessaúde do Ecossistema Salux, conecta instituições, profissionais e pacientes em um ambiente integrado — com prontuário eletrônico, dispositivos médicos, receituário digital e suporte à jornada ambulatorial completa, especialmente em regiões com menor disponibilidade de especialistas.',
  },
  {
    q: 'Como garantir rastreabilidade no centro cirúrgico?',
    a: 'A rastreabilidade no centro cirúrgico envolve registro contínuo de parâmetros anestésicos, materiais, medicamentos, tempos de sala, conformidade de protocolos e documentação clínica integrada ao prontuário. O SkyMed, solução do Ecossistema Salux para governança anestésica e centro cirúrgico, estrutura esse registro como ativo clínico, jurídico e operacional — com checklist inteligente, monitoramento contínuo, assinatura digital e rastreabilidade ponta a ponta para auditoria e segurança assistencial.',
  },
  {
    q: 'Como integrar prontuário eletrônico, faturamento e operação hospitalar?',
    a: 'A integração entre prontuário, faturamento e operação exige uma base comum que conecte o que acontece na assistência com o que precisa ser registrado, documentado e faturado — sem costuras manuais entre sistemas. O Ecossistema Salux estrutura essa base por meio da gestão hospitalar integrada, em que dados assistenciais, administrativos, financeiros e operacionais operam em uma mesma arquitetura coordenada, reduzindo fragmentações, retrabalho e perdas no ciclo de receita.',
  },
]
