import type { SEOMeta } from '@/types/site'
import { homePage } from './home'
import { quemSomosPage } from './quem-somos'
import { initiaPage } from './initia'
import { casesPage } from './cases'
import { solutionsPage } from './solutions'

/**
 * SEO metadata centralizado por rota.
 * Cada página exporta seu próprio `meta`; este arquivo agrega.
 */
export const seoByRoute: Record<string, SEOMeta> = {
  '/': homePage.meta,
  '/quem-somos': quemSomosPage.meta,
  '/capacidades': solutionsPage.meta,
  '/capacidades/initia': initiaPage.meta,
  '/cases': casesPage.meta,
}

/**
 * Palavras-chave estratégicas (briefing — SEO & AEO).
 * Use como base pra meta.keywords e estrutura de cluster temático.
 */
export const strategicKeywords = [
  'gestão hospitalar integrada',
  'governança documental em saúde',
  'inteligência artificial na saúde',
  'BPO do ciclo de receita hospitalar',
  'telessaúde e acesso ao cuidado especializado',
  'gestão da força de trabalho em saúde',
  'prontuário eletrônico integrado',
  'atenção básica e saúde populacional',
  'diagnóstico por imagem hospitalar',
  'governança anestésica',
  'ecossistema de saúde digital',
  'gestão de instituições de saúde',
]

export const defaultOpenGraph = {
  siteName: 'Salux',
  type: 'website' as const,
  locale: 'pt_BR' as const,
}
