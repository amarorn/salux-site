import type { CTA } from '@/types/site'

/**
 * Biblioteca de CTAs reutilizáveis.
 * Garante consistência de copy entre páginas e seções.
 */
export const ctas = {
  primary: {
    falarComEspecialista:    { label: 'Fale com um especialista', href: '/#contato',     variant: 'primary' as const },
    falarComNossoTime:       { label: 'Fale com nosso time',      href: '/#contato',     variant: 'outline' as const },
    enviarMensagem:          { label: 'Enviar mensagem',          href: '#',             variant: 'primary' as const },
  },

  ecosystem: {
    conhecaEcossistema:      { label: 'Conheça o ecossistema',         href: '#capacidades', variant: 'primary' as const },
    exploreCapacidades:      { label: 'Explore todas as capacidades',  href: '/capacidades', variant: 'outline' as const },
    verTodasCapacidades:     { label: 'Ver todas as capacidades do ecossistema', href: '/capacidades', variant: 'outline' as const },
  },

  journey: {
    entendaJornadaCompleta:  { label: 'Entenda a jornada completa',    href: '/capacidades', variant: 'outline' as const },
  },

  bringel: {
    conhecaGrupoBringel:     { label: 'Conheça mais do Grupo Bringel', href: 'https://grupobringel.com.br', variant: 'primary' as const },
  },

  cases: {
    conhecaCases:            { label: 'Conheça nossos cases',          href: '/cases',         variant: 'outline' as const },
    verCaseCompleto:         { label: 'Ver case completo',             href: '#',              variant: 'primary' as const },
  },
} as const satisfies Record<string, Record<string, CTA>>
