/**
 * Barrel export — toda a camada de conteúdo do site Salux.
 *
 * Uso: `import { homePage, capabilities, journeyStages } from '@/content'`
 *
 * Princípio: páginas (App.tsx, *Page.tsx) consomem APENAS daqui.
 * Nenhum texto institucional deve ficar hardcoded em componentes.
 */

// Navegação
export { mainNav, navCta, footerNav, legalLinks, footerTagline } from './navigation'

// CTAs reutilizáveis
export { ctas } from './ctas'

// Dados estruturais
export { journeyStages, journeyPillars } from './journey'
export { agenticLevels } from './agentic'
export { capabilities, getCapability, getCapabilitiesByStage } from './capabilities'
export { testimonials } from './testimonials'
export { allCases, ernestoDornellesCase } from './cases'

// Páginas (cada uma agrega seu próprio conteúdo + meta SEO)
export { homePage } from './home'
export { quemSomosPage } from './quem-somos'
export { initiaPage } from './initia'
export { casesPage } from './cases'
export { solutionsPage } from './solutions'

// SEO / AEO
export { seoByRoute, strategicKeywords, defaultOpenGraph } from './seo'
export { faq } from './faq'
