import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Activity, ArrowRight, ArrowUpRight, Boxes, Brain, Building2, CalendarClock,
  ChevronRight, ClipboardList, Cpu, Eye, FileSignature, Globe2,
  Headphones, HeartPulse, LineChart, Microscope, Moon, Network, Radar,
  ScanLine, ShieldCheck, Sparkles, Stethoscope, Sun, Users, Wallet, Workflow
} from 'lucide-react'
import { SaluxSymbol } from '@/components/SaluxLogo'
import { Styleguide } from '@/components/Styleguide'
import { BigCapabilityCard } from '@/components/BigCapabilityCard'
import womanLaptopJpg from './assets/images/woman-laptop.jpg'
import womanLaptopWebp from './assets/images/woman-laptop.webp'
import doctorTabletJpg from './assets/images/doctor-tablet.jpg'
import doctorTabletWebp from './assets/images/doctor-tablet.webp'
import labDiagnosticsJpg from './assets/images/lab-diagnostics.jpg'
import labDiagnosticsWebp from './assets/images/lab-diagnostics.webp'
import meetingDashboardJpg from './assets/images/meeting-dashboard.jpg'
import meetingDashboardWebp from './assets/images/meeting-dashboard.webp'
import appPhoneJpg from './assets/images/app-phone.jpg'
import appPhoneWebp from './assets/images/app-phone.webp'
import { MetricCard } from '@/components/MetricCard'
import { JourneyStep } from '@/components/JourneyStep'
import { Eyebrow, CountBadge } from '@/components/Eyebrow'
import { Aurora } from '@/components/Aurora'
import { Beams } from '@/components/Beams'
import { MagneticButton } from '@/components/MagneticButton'
import { VideoBackground } from '@/components/VideoBackground'
import SplashCursor from '@/components/SplashCursor'
import { ProductPage, type ProductDef } from './pages/ProductPage'
import { CapabilitiesPage } from './pages/CapabilitiesPage'

import orbsMp4 from './assets/videos/orbs.mp4'
import orbsWebm from './assets/videos/orbs.webm'
import orbsPoster from './assets/videos/orbs.jpg'
import corridorMp4 from './assets/videos/corridor.mp4'
import corridorWebm from './assets/videos/corridor.webm'
import corridorPoster from './assets/videos/corridor.jpg'
import dashboardMp4 from './assets/videos/dashboard.mp4'
import dashboardWebm from './assets/videos/dashboard.webm'
import dashboardPoster from './assets/videos/dashboard.jpg'
import initiaLogo from './assets/products/initia.png'
import cloudLogo from './assets/products/cloud.svg'
import medplaceLogo from './assets/products/medplace.svg'
import skymedLogo from './assets/products/skymed.svg'
import stargridLogo from './assets/products/stargrid.svg'
import zerodoxLogo from './assets/products/zerodox.svg'
import tihospitalarLogo from './assets/products/tihospitalar.svg'

function useReveal(route: string) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal, .image-animated, .scroll-color')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [route])
}

function Counter({ to, suffix = '', duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const [v, setV] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now()
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration)
            const eased = 1 - Math.pow(1 - p, 3)
            setV(Math.round(to * eased))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          io.disconnect()
        }
      })
    }, { threshold: 0.4 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [to, duration])
  return <span ref={ref} aria-live="polite">{v.toLocaleString('pt-BR')}{suffix}</span>
}

const journey = [
  { k: 'Antes da chegada', t: 'Agendamento, telessaúde e triagem inteligente.', i: CalendarClock },
  { k: 'Recepção', t: 'Cadastro, documentos, autorizações e assinaturas digitais.', i: ClipboardList },
  { k: 'Atendimento', t: 'Prontuário, histórico clínico e informações integradas.', i: Stethoscope },
  { k: 'Diagnóstico', t: 'Exames, laudos por imagem, anestesia e rastreabilidade cirúrgica.', i: Microscope },
  { k: 'Internação', t: 'Gestão de leitos, equipes, medicamentos e indicadores em tempo real.', i: HeartPulse },
  { k: 'Alta', t: 'Histórico estruturado, documentação e acompanhamento pós-atendimento.', i: Activity },
  { k: 'Backoffice', t: 'Faturamento, auditoria, força de trabalho e sustentabilidade financeira.', i: Wallet },
]

const products: ProductDef[] = [
  {
    slug: 'initia', code: 'Initia + SX Sigma', name: 'Gestão hospitalar integrada',
    tagline: 'Plataforma nativamente inteligente que conecta prontuário, processos assistenciais, administrativos e financeiros numa única base de dados.',
    desc: 'Plataforma robusta que conecta prontuário, processos assistenciais, administrativos e financeiros em uma base nativamente inteligente.',
    icon: Boxes, accent: 'primary', logo: initiaLogo,
    heroImage: { jpg: womanLaptopJpg, webp: womanLaptopWebp, alt: 'Gestora hospitalar usando dashboard de eficiência operacional' },
    features: [
      { icon: Brain, label: 'Inteligência embarcada', desc: 'Agentes de IA que informam, analisam e executam sob governança clínica.' },
      { icon: Network, label: 'Integração total', desc: 'Assistência, financeiro e operação conectados numa única fonte de verdade.' },
      { icon: LineChart, label: 'Indicadores em tempo real', desc: 'Visibilidade sobre fluxos, leitos, equipes e ciclo de receita.' },
      { icon: Workflow, label: 'Fluxos automatizados', desc: 'Processos que antes dependiam de costuras manuais agora correm sob protocolo.' },
    ],
  },
  {
    slug: 'horizon', code: 'Horizon', name: 'Atenção básica e saúde populacional',
    tagline: 'Tecnologia 100% SaaS para organizar dados populacionais, filas, jornadas e redes de cuidado — integrada à RNDS.',
    desc: 'Tecnologia 100% SaaS para organizar dados populacionais, filas, jornadas, redes de cuidado e integração com a RNDS.',
    icon: Globe2, accent: 'accent',
    heroImage: { jpg: appPhoneJpg, webp: appPhoneWebp, alt: 'App de saúde mobile com agendamentos e notificações' },
    features: [
      { icon: Users, label: 'Gestão populacional', desc: 'Organização de cadastros, territórios e perfis de saúde por comunidade.' },
      { icon: CalendarClock, label: 'Filas inteligentes', desc: 'Agendamento e triagem com priorização baseada em risco e contexto.' },
      { icon: Network, label: 'Rede de cuidado', desc: 'Integração entre unidades, especialistas e serviços de referência.' },
      { icon: Activity, label: 'Integração RNDS', desc: 'Conectividade nativa com a Rede Nacional de Dados em Saúde.' },
    ],
  },
  {
    slug: 'cloudhealth', code: 'CloudHealth.AI', name: 'Telessaúde e cuidado especializado',
    tagline: 'Plataforma que conecta especialistas, instituições e pacientes com prontuário, agenda e dispositivos médicos integrados.',
    desc: 'Plataforma que conecta especialistas, instituições e pacientes — com prontuário, agenda e dispositivos médicos integrados.',
    icon: Headphones, accent: 'primary', logo: cloudLogo,
    heroImage: { jpg: doctorTabletJpg, webp: doctorTabletWebp, alt: 'Médico revisando ECG em tablet holográfico' },
    features: [
      { icon: Stethoscope, label: 'Teleconsulta', desc: 'Atendimento especializado por vídeo com prontuário integrado em tempo real.' },
      { icon: CalendarClock, label: 'Agenda inteligente', desc: 'Gestão de filas de telemedicina com priorização e notificações automáticas.' },
      { icon: Cpu, label: 'Dispositivos médicos', desc: 'Integração com oxímetros, termômetros e outros periféricos digitais.' },
      { icon: Network, label: 'Rede de especialistas', desc: 'Acesso a especialistas de diferentes disciplinas sem deslocamento.' },
    ],
  },
  {
    slug: 'medplace', code: 'Med.Place', name: 'Diagnóstico por imagem contínuo',
    tagline: 'Telerradiologia 24/7, PACS em nuvem e rede de especialistas para sustentar exames e laudos sem interrupções.',
    desc: 'Telerradiologia 24/7, PACS em nuvem e rede de especialistas para sustentar exames e laudos sem interrupções.',
    icon: ScanLine, accent: 'accent', logo: medplaceLogo,
    heroImage: { jpg: labDiagnosticsJpg, webp: labDiagnosticsWebp, alt: 'Laboratório de diagnóstico avançado com equipamento MRI' },
    features: [
      { icon: ScanLine, label: 'Telerradiologia 24/7', desc: 'Laudos por especialistas a qualquer hora, sem depender de equipe local.' },
      { icon: Eye, label: 'PACS em nuvem', desc: 'Armazenamento e acesso a imagens médicas com segurança e escala.' },
      { icon: Microscope, label: 'Rede de especialistas', desc: 'Radiologistas, patologistas e outros especialistas conectados à plataforma.' },
      { icon: Radar, label: 'Rastreamento de exames', desc: 'Visibilidade do status de cada exame, da solicitação ao laudo entregue.' },
    ],
  },
  {
    slug: 'skymed', code: 'SkyMed', name: 'Governança anestésica e cirúrgica',
    tagline: 'Registro anestésico digital como ativo clínico, jurídico e operacional — com rastreabilidade ponta a ponta no centro cirúrgico.',
    desc: 'Registro anestésico digital como ativo clínico, jurídico e operacional — rastreabilidade ponta a ponta no centro cirúrgico.',
    icon: ShieldCheck, accent: 'primary', logo: skymedLogo,
    features: [
      { icon: ShieldCheck, label: 'Registro anestésico', desc: 'Documentação digital completa do ato anestésico com validade jurídica.' },
      { icon: ClipboardList, label: 'Checklist cirúrgico', desc: 'Protocolos de segurança integrados ao fluxo do centro cirúrgico.' },
      { icon: Microscope, label: 'Rastreabilidade', desc: 'Ponta a ponta: material, equipe, horários e intercorrências registrados.' },
      { icon: Activity, label: 'Indicadores CC', desc: 'Ocupação de salas, tempo de turnover e outros KPIs operacionais.' },
    ],
  },
  {
    slug: 'zerodox', code: 'ZeroDox', name: 'Governança documental sem papel',
    tagline: 'Digitalização juridicamente válida, OCR, assinatura eletrônica e workflows com conformidade integral.',
    desc: 'Digitalização juridicamente válida, OCR, assinatura eletrônica e workflows com conformidade integral.',
    icon: FileSignature, accent: 'accent', logo: zerodoxLogo,
    features: [
      { icon: FileSignature, label: 'Assinatura eletrônica', desc: 'Assinaturas com validade jurídica integradas aos fluxos assistenciais.' },
      { icon: Eye, label: 'OCR inteligente', desc: 'Reconhecimento automático de documentos físicos com validação de dados.' },
      { icon: Workflow, label: 'Workflows documentais', desc: 'Automação do ciclo de vida de documentos: captura, aprovação, arquivo.' },
      { icon: ShieldCheck, label: 'Conformidade LGPD', desc: 'Rastreabilidade de acessos e políticas de retenção documentadas.' },
    ],
  },
  {
    slug: 'stargrid', code: 'StarGrid', name: 'Governança da força de trabalho',
    tagline: 'Escalas inteligentes, alocação por competência, controle de horas e conformidade trabalhista com previsibilidade.',
    desc: 'Escalas inteligentes, alocação por competência, controle de horas e conformidade trabalhista com previsibilidade.',
    icon: Users, accent: 'primary', logo: stargridLogo,
    heroImage: { jpg: meetingDashboardJpg, webp: meetingDashboardWebp, alt: 'Equipe revisando dashboard hospitalar em sala de reunião' },
    features: [
      { icon: CalendarClock, label: 'Escalas inteligentes', desc: 'Criação e gestão de escalas com regras operacionais e alertas automáticos.' },
      { icon: Users, label: 'Alocação por competência', desc: 'Distribuição de equipes baseada em perfil, especialidade e disponibilidade.' },
      { icon: Activity, label: 'Controle de horas', desc: 'Banco de horas, extras, trocas e absenteísmo com rastreabilidade.' },
      { icon: Workflow, label: 'Conformidade trabalhista', desc: 'Validações automáticas para garantir respeito às normas e acordos coletivos.' },
    ],
  },
  {
    slug: 'vision-pilot', code: 'Vision Pilot', name: 'Inteligência visual da operação',
    tagline: 'Visão computacional e IA para transformar fluxos, ocupação e tempos em dados acionáveis — sem vigilância pessoal.',
    desc: 'Visão computacional + IA para transformar fluxos, ocupação e tempos em dados acionáveis sem vigilância pessoal.',
    icon: Eye, accent: 'accent',
    features: [
      { icon: Eye, label: 'Visão computacional', desc: 'Câmeras analisam ambientes e fluxos sem identificação individual de pessoas.' },
      { icon: Brain, label: 'IA operacional', desc: 'Modelos treinados para reconhecer padrões de ocupação, fila e movimentação.' },
      { icon: Radar, label: 'Alertas em tempo real', desc: 'Notificações automáticas quando fluxos saem dos parâmetros esperados.' },
      { icon: LineChart, label: 'Dashboards de fluxo', desc: 'Visualização histórica e preditiva de ocupação por área e horário.' },
    ],
  },
  {
    slug: 'tihospitalar', code: 'TI Hospitalar', name: 'BPO do ciclo de receita',
    tagline: 'Operação especializada que transforma produção assistencial em receita reconhecida — prevenindo glosas e protegendo valor.',
    desc: 'Operação especializada que transforma produção assistencial em receita reconhecida — previne glosas e protege valor.',
    icon: Wallet, accent: 'primary', logo: tihospitalarLogo,
    features: [
      { icon: Wallet, label: 'Ciclo de receita', desc: 'Gestão ponta a ponta do faturamento, da produção ao pagamento.' },
      { icon: ShieldCheck, label: 'Prevenção de glosas', desc: 'Auditoria prévia de contas com validação automática por convênio.' },
      { icon: LineChart, label: 'Indicadores financeiros', desc: 'Visibilidade sobre produção, glosas, recebimentos e inadimplência.' },
      { icon: Activity, label: 'Auditoria de contas', desc: 'Revisão especializada de contas médico-hospitalares com equipe dedicada.' },
    ],
  },
]

const agenticLevels = [
  { lvl: '01', nm: 'Informar', d: 'Resumos de prontuário, pendências financeiras, alertas de escala, status da rede.' },
  { lvl: '02', nm: 'Analisar', d: 'Risco de glosa, risco assistencial, gargalo diagnóstico, desvios operacionais.' },
  { lvl: '03', nm: 'Recomendar', d: 'Correção documental, priorização de paciente, remanejamento de equipe.' },
  { lvl: '04', nm: 'Executar', d: 'Abrir pendência, direcionar fluxo, iniciar validação — sob governança.' },
  { lvl: '05', nm: 'Coordenar', d: 'Alta assistida, ciclo de receita, continuidade pós-alta, fluxo diagnóstico integrado.' },
]

const credentials = [
  'GRUPO BRINGEL', 'SUS', '+25 ANOS', '14 ESTADOS', 'ECOSSISTEMA EM EXPANSÃO',
  'SAÚDE PÚBLICA & PRIVADA', '+4.000 COLABORADORES', 'INTELIGÊNCIA AGÊNTICA', 'RNDS',
]

function ThemeToggle({ theme, onToggle }: { theme: 'dark' | 'light'; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative inline-flex items-center justify-center w-9 h-9 rounded-full glass text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/60 focus:outline-none transition group"
      aria-label={`Tema atual ${theme === 'dark' ? 'escuro' : 'claro'}. Trocar para ${theme === 'dark' ? 'claro' : 'escuro'}.`}
      aria-pressed={theme === 'light'}
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      <span className="absolute -inset-1 rounded-full bg-primary/10 blur-md opacity-0 group-hover:opacity-100 transition -z-10" />
    </button>
  )
}

function Nav({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="glass rounded-2xl px-4 py-2.5 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="relative inline-flex items-center justify-center">
              <SaluxSymbol className="w-8 h-8" />
              <span className="absolute -inset-2 rounded-2xl bg-primary/25 blur-lg -z-10 opacity-0 group-hover:opacity-100 transition" />
            </span>
            <span className="font-display text-xl tracking-display">Salux</span>
            <span className="hidden sm:inline-block ml-2 text-2xs font-mono uppercase tracking-label text-muted-foreground border-l border-border pl-2">Ecossistema</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a className="hover:text-foreground transition" href="#jornada">Jornada</a>
            <Link className="hover:text-foreground transition" to="/capacidades">Capacidades</Link>
            <a className="hover:text-foreground transition" href="#initia">Initia</a>
            <a className="hover:text-foreground transition" href="#agentes">Agentes</a>
            <a className="hover:text-foreground transition" href="#cases">Cases</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <Button asChild variant="ghost" className="hidden sm:inline-flex text-sm">
              <a href="#contato">Falar com o time</a>
            </Button>
            <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
              <a href="#capacidades">Conheça o Ecossistema <ArrowRight className="ml-1.5 w-4 h-4" /></a>
            </Button>
            <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-muted-foreground" aria-label="menu">
              <Workflow className="w-5 h-5" />
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden mt-2 glass rounded-2xl p-4 flex flex-col gap-3 text-sm">
            {['jornada','capacidades','initia','agentes','cases'].map(x => (
              <a key={x} onClick={() => setOpen(false)} href={`#${x}`} className="text-muted-foreground hover:text-foreground capitalize">{x}</a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

const heroBlur = (delay: number) => ({
  initial: { opacity: 0, filter: 'blur(12px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
})

function Hero() {
  const reduced = useReducedMotion()
  return (
    <section id="top" className="relative pt-44 pb-36 sm:pt-56 sm:pb-48 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <VideoBackground
          mp4={dashboardMp4}
          webm={dashboardWebm}
          poster={dashboardPoster}
          opacity={0.35}
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <Aurora intensity={0.55} />
        <div className="absolute inset-0 bg-grid mask-radial opacity-30" />
        <div className="absolute inset-0 bg-dotgrid mask-fade-b" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <motion.div {...(reduced ? {} : heroBlur(0.05))}>
              <Eyebrow tone="primary" className="px-3 py-1">
                <Sparkles className="w-3 h-3 mr-1.5" /> Nova geração · Operação ativada por inteligência
              </Eyebrow>
            </motion.div>

            <h1 className="mt-8 font-display text-[clamp(2.2rem,6vw,5.4rem)] leading-[1.05] tracking-tight text-pretty pb-1">
              <motion.span className="inline" {...(reduced ? {} : heroBlur(0.15))}>
                Uma nova forma de{' '}
              </motion.span>
              <em className="italic text-gradient-emerald not-italic-fallback">
                <motion.span className="inline" {...(reduced ? {} : heroBlur(0.28))}>
                  coordenar
                </motion.span>
              </em>
              <br />
              <motion.span className="inline" {...(reduced ? {} : heroBlur(0.42))}>
                cuidado, operação,
              </motion.span>
              <br />
              <motion.span className="inline" {...(reduced ? {} : heroBlur(0.56))}>
                receita e decisão
              </motion.span>
              <br />
              <span className="text-gradient-bone">
                <motion.span className="inline" {...(reduced ? {} : heroBlur(0.7))}>
                  em saúde.
                </motion.span>
              </span>
            </h1>

            <motion.p
              {...(reduced ? {} : heroBlur(0.88))}
              className="mt-10 max-w-2xl text-lg text-pretty leading-relaxed scroll-color"
            >
              O <span className="font-medium">Ecossistema Salux</span> estrutura capacidades especializadas que integram
              dados, fluxos e inteligência — transformando a operação de instituições de saúde em algo mais
              coordenado, eficiente e preparado para os desafios reais do setor.
            </motion.p>

            <motion.div
              {...(reduced ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 1.0, ease: [0.22, 1, 0.36, 1] as const } })}
              className="mt-12 flex flex-wrap gap-3"
            >
              <MagneticButton strength={0.3} maxOffset={10}>
                <Button asChild size="lg" className="rounded-full h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium glow-primary">
                  <a href="#capacidades">Conheça o Ecossistema <ArrowRight className="ml-2 w-4 h-4" /></a>
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.22} maxOffset={8}>
                <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-6 border-border bg-secondary/40 hover:bg-secondary">
                  <a href="#initia">Conheça o Initia <ArrowUpRight className="ml-2 w-4 h-4" /></a>
                </Button>
              </MagneticButton>
            </motion.div>
          </div>

          <div className="lg:col-span-4 image-animated">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full border border-border/60 animate-orbit">
                {[Stethoscope, Eye, FileSignature, Users, Wallet, ScanLine, Headphones, ShieldCheck].map((Ic, i, arr) => {
                  const angle = (i / arr.length) * Math.PI * 2
                  const x = 50 + 50 * Math.cos(angle)
                  const y = 50 + 50 * Math.sin(angle)
                  return (
                    <div key={i} style={{ left: `${x}%`, top: `${y}%` }}
                         className="absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-xl glass border-gradient flex items-center justify-center text-primary">
                      <Ic className="w-5 h-5" />
                    </div>
                  )
                })}
              </div>
              <div className="absolute inset-10 rounded-full border border-border/40" />
              <div className="absolute inset-20 rounded-full border border-border/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-40 h-40 rounded-full glass border-gradient flex items-center justify-center glow-brand">
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 animate-pulse-slow" />
                  <SaluxSymbol className="relative w-20 h-20 animate-float" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-28 reveal">
          <div className="flex items-center gap-3 text-mini font-mono uppercase text-muted-foreground mb-3">
            <span className="h-px flex-1 bg-border" />
            <span>Confiada por instituições em saúde pública e privada</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="overflow-hidden mask-fade-b">
            <div className="flex gap-12 animate-marquee whitespace-nowrap text-muted-foreground/70 w-max">
              {[...credentials, ...credentials, ...credentials].map((c, i) => (
                <span key={i} className="font-mono text-xs tracking-kbd">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Problem() {
  return (
    <section className="relative py-40 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <VideoBackground
          mp4={corridorMp4}
          webm={corridorWebm}
          poster={corridorPoster}
          opacity={0.35}
          objectPosition="center"
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 reveal lg:sticky lg:top-28">
            <Eyebrow tone="accent">
              02 · Problema & valor
            </Eyebrow>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-balance pb-1">
              Onde a saúde <em className="italic text-gradient-emerald whitespace-nowrap">perde eficiência</em>, a Salux cria coordenação.
            </h2>
            <p className="mt-6 text-lg max-w-md scroll-color">
              Mais clareza para gerir. Mais inteligência para decidir.
              <span className="font-medium"> Mais tempo para cuidar.</span>
            </p>
          </div>

          <div className="lg:col-span-7 reveal">
            <div className="space-y-4">
              {[
                { k: 'Dados fragmentados', d: 'Sistemas que não conversam fragmentam a jornada — e exigem reconstrução manual de contexto a cada etapa.' },
                { k: 'Equipes sobrecarregadas', d: 'Costuras operacionais consomem o tempo das lideranças e drenam capacidade assistencial.' },
                { k: 'Perdas financeiras silenciosas', d: 'Glosas, retrabalho e falhas de codificação corroem o ciclo de receita antes que sejam percebidos.' },
                { k: 'Decisões sem contexto', d: 'A operação registra muito, mas ativa pouco — a inteligência continua presa nos dados.' },
              ].map((it, i) => (
                <div key={i} className="group relative rounded-2xl glass p-6 hover:bg-secondary/40 transition border-gradient">
                  <div className="flex items-start gap-5">
                    <span className="font-mono text-xs text-muted-foreground pt-1">0{i+1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-lg">{it.k}</h3>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
                      </div>
                      <p className="mt-2 text-muted-foreground text-pretty leading-relaxed">{it.d}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl p-8 glass border-gradient relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
              <p className="relative font-display text-2xl leading-snug text-balance">
                A Salux atua sobre os pontos críticos da operação — não como um conjunto de ferramentas isoladas,
                mas como um <span className="text-gradient-emerald">ecossistema coordenado de capacidades</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Journey() {
  const [active, setActive] = useState(0)
  return (
    <section id="jornada" className="relative py-40 border-y border-border bg-secondary/20">
      <div className="absolute inset-0 -z-10 bg-grid mask-fade-b opacity-30" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal">
          <Eyebrow tone="primary">
            03 · Jornada conectada
          </Eyebrow>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-balance pb-1">
            Do <em className="italic">cuidado</em> à <em className="italic text-gradient-emerald">gestão.</em>
          </h2>
          <p className="mt-5 max-w-2xl text-muted-foreground text-lg">
            Cada etapa da jornada do paciente conectada a capacidades especializadas, com inteligência
            embarcada para reduzir falhas, automatizar rotinas e dar contexto às decisões.
          </p>
        </div>

        <div className="mt-14 reveal">
          <div className="relative">
            <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div role="tablist" aria-label="Etapas da jornada do paciente" className="relative grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {journey.map((s, i) => (
                <JourneyStep
                  key={s.k}
                  index={i}
                  label={s.k}
                  icon={s.i}
                  isActive={active === i}
                  onActivate={() => setActive(i)}
                />
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-3xl glass p-8 sm:p-10 border-gradient relative overflow-hidden min-h-[180px]">
            <div className="absolute right-0 top-0 w-48 h-48 bg-primary/10 blur-3xl rounded-full" />
            <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="font-mono text-xs uppercase tracking-label text-primary">Etapa {String(active+1).padStart(2,'0')}</div>
              <div className="hidden sm:block h-10 w-px bg-border" />
              <div className="flex-1">
                <h3 className="font-display text-3xl sm:text-4xl">{journey[active].k}</h3>
                <p className="mt-2 text-muted-foreground text-pretty">{journey[active].t}</p>
              </div>
              <a href="#capacidades" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary">
                Capacidades nesta etapa <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const FEATURED = ['initia', 'cloudhealth', 'medplace', 'stargrid']

const FEATURED_IMAGES: Record<string, { jpg: string; webp: string }> = {
  initia: { jpg: womanLaptopJpg, webp: womanLaptopWebp },
  cloudhealth: { jpg: doctorTabletJpg, webp: doctorTabletWebp },
  medplace: { jpg: labDiagnosticsJpg, webp: labDiagnosticsWebp },
  stargrid: { jpg: meetingDashboardJpg, webp: meetingDashboardWebp },
}

function Capabilities() {
  const featured = products.filter(p => FEATURED.includes(p.slug))
  return (
    <section id="capacidades" className="relative py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-end reveal">
          <div className="lg:col-span-7">
            <Eyebrow tone="primary">
              04 · Capacidades integradas
            </Eyebrow>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-balance pb-1">
              Capacidades para resolver <em className="italic text-gradient-emerald">desafios reais</em> da operação.
            </h2>
          </div>
          <div className="lg:col-span-5 text-muted-foreground text-lg">
            Mais do que conectar tecnologias, o ecossistema estrutura uma base coordenada para ampliar
            eficiência, segurança, previsibilidade e inteligência na gestão de instituições de saúde.
          </div>
        </div>

        <div className="mt-14 reveal">
          <div className="relative rounded-3xl glass overflow-hidden border-gradient">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            <div className="absolute inset-0 bg-dotgrid opacity-50" />
            <div className="relative p-8 sm:p-10 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <Badge className="bg-primary/10 text-primary border-primary/30 rounded-full font-mono text-mini uppercase tracking-wider">
                  <Brain className="w-3 h-3 mr-1.5" /> Camada transversal
                </Badge>
                <h3 className="mt-4 font-display text-3xl sm:text-4xl leading-tight">
                  Os <em className="italic text-gradient-emerald">agentes de IA</em> não são chatbots — são uma camada operacional distribuída.
                </h3>
                <p className="mt-4 text-muted-foreground max-w-2xl">
                  Informam o que é relevante, analisam riscos, recomendam ações, executam fluxos sob governança e
                  coordenam processos que antes dependiam de costuras operacionais. Nasce no Initia e se expande
                  por todo o ecossistema.
                </p>
              </div>
              <div className="lg:col-span-5 flex flex-wrap gap-2">
                {['Informar', 'Analisar', 'Recomendar', 'Executar', 'Coordenar'].map((p, i) => (
                  <div key={p} className="px-4 py-2 rounded-full glass text-sm flex items-center gap-2">
                    <span className="font-mono text-2xs text-primary">L{i+1}</span> {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bento grid — 4 destaques (2 wide + 2 tall) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5 reveal overflow-visible">
          {featured.map((c, i) => {
            const img = FEATURED_IMAGES[c.slug]
            // Layout pattern: Initia [span 2] · CloudHealth [span 1] · MedPlace [span 1] · StarGrid [span 2]
            const isWide = i === 0 || i === 3
            return (
              <div key={c.slug} className={isWide ? 'lg:col-span-2' : 'lg:col-span-1'}>
                <BigCapabilityCard
                  code={c.code}
                  name={c.name}
                  desc={c.desc}
                  icon={c.icon}
                  accent={c.accent}
                  logo={c.logo}
                  image={img?.jpg ?? ''}
                  imageWebp={img?.webp}
                  href={`/capacidades/${c.slug}`}
                  variant={isWide ? 'wide' : 'tall'}
                  ctaLabel="Ver solução"
                />
              </div>
            )
          })}
        </div>

        <div className="mt-10 reveal text-center">
          <Link
            to="/capacidades"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition group"
          >
            Ver todas as 9 capacidades
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}


function Initia() {
  return (
    <section id="initia" className="relative py-48 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <VideoBackground
          mp4={orbsMp4}
          webm={orbsWebm}
          poster={orbsPoster}
          opacity={0.4}
        />
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <Beams origin="top" intensity={0.4} />
        <div className="absolute inset-0 bg-grid mask-radial opacity-20" />
        <div className="noise" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center reveal max-w-4xl mx-auto">
          <Eyebrow tone="primary">
            <Cpu className="w-3 h-3 mr-1.5" /> Solução âncora
          </Eyebrow>
          <h2 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] pb-1">
            <em className="italic text-gradient-emerald">Initia.</em><br />
            A nova geração de plataforma<br />
            para operar a saúde.
          </h2>
          <p className="mt-8 text-xl text-pretty scroll-color">
            Da digitalização à inteligência. Do registro à ação. Do sistema ao ecossistema.
          </p>
        </div>

        <div id="agentes" className="mt-20 grid lg:grid-cols-12 gap-6 reveal">
          <div className="lg:col-span-5">
            <div className="rounded-3xl glass p-8 border-gradient h-full relative overflow-hidden">
              <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-primary/15 blur-3xl" />
              <div className="font-mono text-mini uppercase tracking-widest text-primary">Initium · origem</div>
              <p className="mt-6 font-display text-3xl leading-snug text-balance">
                A operação deixa de ser apenas <em className="italic">navegada</em> e passa a ser
                <em className="italic text-gradient-emerald"> ativada por inteligência.</em>
              </p>
              <p className="mt-6 text-muted-foreground text-pretty">
                O Initia não é uma interface nem uma feature de IA. É uma nova lógica operacional —
                uma arquitetura nativamente inteligente, capaz de sustentar contexto, acionar agentes
                e ativar fluxos em tempo real.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { k: 'Contexto', v: 'sem reconstrução manual' },
                  { k: 'Agentes', v: 'em níveis progressivos' },
                  { k: 'Integração', v: 'assistência ⇆ finanças' },
                  { k: 'Escala', v: 'múltiplos portes' },
                ].map((x) => (
                  <div key={x.k} className="rounded-xl glass p-3">
                    <div className="font-mono text-2xs uppercase text-muted-foreground">{x.k}</div>
                    <div className="text-sm mt-1">{x.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl glass overflow-hidden border-gradient">
              <div className="px-8 py-5 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-3">
                  <Radar className="w-4 h-4 text-primary" />
                  <div className="font-mono text-mini uppercase tracking-widest text-muted-foreground">
                    Camada agêntica · do dado à ação
                  </div>
                </div>
                <CountBadge>5 níveis</CountBadge>
              </div>
              <ul className="divide-y divide-border">
                {agenticLevels.map((a) => (
                  <li key={a.lvl} className="group grid grid-cols-12 gap-4 px-8 py-6 hover:bg-secondary/30 transition relative">
                    <div className="col-span-2 font-mono text-sm text-muted-foreground group-hover:text-primary transition">
                      {a.lvl}
                    </div>
                    <div className="col-span-3 font-display text-2xl">{a.nm}</div>
                    <div className="col-span-7 text-muted-foreground text-sm leading-relaxed">{a.d}</div>
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 reveal grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { i: Workflow, t: 'Prontuário integrado à operação' },
            { i: Network, t: 'Contexto clínico em toda a jornada' },
            { i: Brain, t: 'Agentes que executam sob governança' },
            { i: LineChart, t: 'Visibilidade sobre fluxos e indicadores' },
          ].map((x) => {
            const Ic = x.i
            return (
              <div key={x.t} className="rounded-2xl glass p-5 hover:bg-secondary/40 transition">
                <Ic className="w-5 h-5 text-primary" />
                <p className="mt-3 text-sm text-pretty">{x.t}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Credentials() {
  return (
    <section className="relative py-36 border-y border-border bg-secondary/20">
      <div className="absolute inset-0 -z-10 bg-dotgrid opacity-50" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 reveal">
            <Eyebrow tone="accent">
              05 · Credenciais
            </Eyebrow>
            <h2 className="mt-5 font-display text-5xl tracking-tight leading-[1.05]">
              Tecnologia criada para a <em className="italic text-gradient-emerald">realidade da saúde brasileira.</em>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Mais de 25 anos no setor, presença nacional e capacidades especializadas para apoiar instituições
              públicas e privadas em desafios complexos de gestão, cuidado e operação.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm">
              <Building2 className="w-4 h-4 text-accent" /> Parte do <span className="font-medium">Grupo Bringel</span>
            </div>
          </div>

          <div className="lg:col-span-7 reveal">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { n: 25, s: '+', l: 'anos no setor' },
                { n: 14, s: '', l: 'estados' },
                { n: 4000, s: '+', l: 'colaboradores' },
                { n: 44, s: '+', l: 'anos · Grupo Bringel' },
                { n: 9, s: '', l: 'capacidades integradas' },
                { n: 5, s: '', l: 'níveis agênticos' },
              ].map((x, i) => (
                <div key={i} className="rounded-2xl glass p-6 border-gradient">
                  <div className="font-display text-5xl leading-none">
                    <Counter to={x.n} suffix={x.s} />
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">{x.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Case() {
  const metrics = [
    { v: '2–3 dias → 45 min', l: 'Tempo de elaboração de escalas' },
    { v: '−68%', l: 'Absenteísmo · UTI 1' },
    { v: '−53%', l: 'Absenteísmo · UTI 2' },
    { v: '−94%', l: 'Horas extras · Unidade 1' },
    { v: '−80%', l: 'Horas extras · Unidade 2' },
    { v: '+600', l: 'Colaboradores ativos' },
  ]
  return (
    <section id="cases" className="relative py-40 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-20 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal">
          <Eyebrow tone="accent">
            06 · Resultados reais
          </Eyebrow>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-balance pb-1">
            Desafios resolvidos. <em className="italic text-gradient-emerald">Operações transformadas.</em>
          </h2>
        </div>

        <div className="mt-12 reveal rounded-3xl glass border-gradient overflow-hidden">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-5 p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-border relative">
              <div className="absolute top-6 right-6 font-mono text-2xs uppercase tracking-widest text-primary">
                StarGrid · Força de trabalho
              </div>
              <div className="mt-10 font-mono text-xs uppercase text-muted-foreground">Hospital Ernesto Dornelles · Porto Alegre, RS</div>
              <h3 className="mt-4 font-display text-3xl sm:text-4xl leading-tight">
                De <em className="italic">dias</em> para <em className="italic text-gradient-emerald">minutos</em> na gestão de escalas assistenciais.
              </h3>
              <p className="mt-5 text-muted-foreground text-pretty">
                Em áreas críticas como UTI e emergência, a StarGrid substituiu memorandos, planilhas e
                bilhetes por uma plataforma com regras operacionais, validações automáticas e
                rastreabilidade ponta a ponta — devolvendo tempo às lideranças.
              </p>
              <Button asChild variant="outline" className="mt-8 rounded-full">
                <a href="#contato">Ver case completo <ArrowUpRight className="ml-2 w-4 h-4" /></a>
              </Button>
            </div>
            <div className="lg:col-span-7 p-8 sm:p-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {metrics.map((m, i) => (
                <MetricCard key={i} value={m.v} label={m.l} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section id="contato" className="relative py-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="reveal relative rounded-[2rem] glass overflow-hidden border-gradient">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/10" />
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-primary/20 blur-[120px] rounded-full animate-pulse-slow" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-accent/15 blur-[120px] rounded-full" />
          <div className="relative p-10 sm:p-14 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <Eyebrow tone="primary">
                Próximo passo
              </Eyebrow>
              <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-balance pb-1">
                Avance para um novo patamar de <em className="italic text-gradient-emerald">gestão, cuidado e inteligência</em> em saúde.
              </h2>
              <p className="mt-5 text-muted-foreground text-pretty max-w-xl">
                Converse com o time Salux e descubra como o ecossistema pode responder aos desafios
                específicos da sua instituição.
              </p>
            </div>
            <form className="lg:col-span-5 space-y-3" onSubmit={(e) => e.preventDefault()} aria-label="Formulário de contato Salux">
              <div>
                <label htmlFor="contact-name" className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Nome</label>
                <input id="contact-name" name="name" type="text" required autoComplete="name" className="mt-1 w-full bg-secondary/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus:border-primary transition" placeholder="Seu nome" />
              </div>
              <div>
                <label htmlFor="contact-email" className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">E-mail corporativo</label>
                <input id="contact-email" name="email" type="email" required autoComplete="email" className="mt-1 w-full bg-secondary/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus:border-primary transition" placeholder="nome@instituicao.com.br" />
              </div>
              <div>
                <label htmlFor="contact-org" className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Instituição</label>
                <input id="contact-org" name="organization" type="text" required autoComplete="organization" className="mt-1 w-full bg-secondary/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus:border-primary transition" placeholder="Hospital, rede, prefeitura..." />
              </div>
              <Button className="w-full rounded-xl h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium glow-primary mt-2">
                Falar com um especialista <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative border-t border-border py-14">
      <div className="absolute inset-0 -z-10 bg-dotgrid opacity-30" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <a href="#top" className="flex items-center gap-2.5">
              <SaluxSymbol className="w-9 h-9" />
              <span className="font-display text-2xl tracking-display">Salux</span>
              <span className="text-2xs font-mono uppercase tracking-label text-muted-foreground ml-2 border-l border-border pl-2">Ecossistema</span>
            </a>
            <p className="mt-4 text-sm text-muted-foreground max-w-md">
              Soluções tecnológicas para a operação em saúde — cobrindo toda a jornada do paciente,
              com uma camada de inteligência que os sistemas tradicionais ainda não têm.
            </p>
          </div>
          {[
            { t: 'Ecossistema', l: ['Initia', 'CloudHealth.AI', 'Med.Place', 'SkyMed', 'ZeroDox', 'StarGrid', 'Vision Pilot', 'TI Hospitalar'] },
            { t: 'Salux', l: ['Quem somos', 'Grupo Bringel', 'Cases', 'Conteúdo'] },
            { t: 'Contato', l: ['Fale com o time', 'Suporte', 'Imprensa'] },
          ].map((c) => (
            <div key={c.t} className="lg:col-span-2">
              <div className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">{c.t}</div>
              <ul className="mt-4 space-y-2 text-sm">
                {c.l.map((i) => <li key={i}><a className="text-foreground/80 hover:text-foreground transition" href="#">{i}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Salux · Parte do Grupo Bringel</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacidade</a>
            <a href="#" className="hover:text-foreground">Termos</a>
            <a href="#" className="hover:text-foreground">LGPD</a>
            <a href="#styleguide" className="hover:text-foreground font-mono">/styleguide</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

const splashProps = {
  DENSITY_DISSIPATION: 3.5,
  VELOCITY_DISSIPATION: 2,
  PRESSURE: 0.1,
  CURL: 3,
  SPLAT_RADIUS: 0.2,
  SPLAT_FORCE: 6000,
  COLOR_UPDATE_SPEED: 10,
  SHADING: true,
  RAINBOW_MODE: false,
  COLOR: '#54C1ED',
} as const

function HomePage({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
  useReveal('home')
  return (
    <div className="relative min-h-screen">
      <SplashCursor {...splashProps} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-pill focus:bg-primary focus:text-primary-foreground focus:font-medium focus:shadow-lg"
      >
        Pular para o conteúdo
      </a>
      <Nav theme={theme} onToggleTheme={onToggleTheme} />
      <main id="main">
        <Hero />
        <Problem />
        <Journey />
        <Capabilities />
        <Initia />
        <Credentials />
        <Case />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark'
    const saved = localStorage.getItem('salux-theme')
    return saved === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    localStorage.setItem('salux-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <Routes>
      <Route path="/" element={<HomePage theme={theme} onToggleTheme={toggleTheme} />} />
      <Route path="/styleguide" element={
        <div className="relative min-h-screen">
          <SplashCursor {...splashProps} />
          <Nav theme={theme} onToggleTheme={toggleTheme} />
          <Styleguide />
        </div>
      } />
      <Route path="/capacidades" element={
        <CapabilitiesPage
          products={products}
          Nav={Nav}
          Footer={Footer}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      } />
      <Route path="/capacidades/:slug" element={
        <ProductPage
          products={products}
          Nav={Nav}
          Footer={Footer}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
