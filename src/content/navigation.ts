import type { CTA, NavLink } from '@/types/site'

/**
 * Navegação principal (header) — ordem do PDF Home.
 */
export const mainNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Quem somos', href: '/quem-somos' },
  { label: 'Soluções', href: '/capacidades' },
  { label: 'Cases', href: '/cases' },
  { label: 'Contato', href: '/#contato' },
]

export const navCta: CTA = {
  label: 'Fale com um especialista',
  href: '/#contato',
  variant: 'primary',
}

/**
 * Links do footer — agrupados por coluna (PDF Home/Quem Somos).
 * NOTA: O PDF lista "SX Horizon (IA)" no footer — substituído por capacidade
 * válida do briefing (Atenção básica) por instrução: "Nunca usar Horizon".
 */
export const footerNav = {
  solucoes: [
    { label: 'Salux Initia', href: '/capacidades/initia' },
    { label: 'CloudHealth.AI', href: '/capacidades/cloudhealth' },
    { label: 'ZeroDox', href: '/capacidades/zerodox' },
    { label: 'SkyMed', href: '/capacidades/skymed' },
  ] as NavLink[],
  institucional: [
    { label: 'Quem Somos', href: '/quem-somos' },
    { label: 'Soluções', href: '/capacidades' },
    { label: 'Cases', href: '/cases' },
  ] as NavLink[],
  contato: [
    { label: 'comercial@salux.com.br', href: 'mailto:comercial@salux.com.br' },
    { label: '0800 123 4567', href: 'tel:08001234567' },
  ] as NavLink[],
}

export const legalLinks: NavLink[] = [
  { label: 'Privacidade', href: '/privacidade' },
  { label: 'Termos de Uso', href: '/termos' },
  { label: 'Compliance', href: '/compliance' },
]

export const footerTagline =
  'Tecnologia e inteligência para transformar a gestão e o cuidado em saúde em todo o Brasil.'
