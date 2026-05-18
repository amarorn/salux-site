# Salux · Design System

Reference doc for the 4 core components powering the Salux marketing site.
Tokens (cores, tipografia, radius, motion) vivem em `src/index.css` (`:root` + `.light`) e
`tailwind.config.js` (escala custom).

---

## Tokens · Resumo rápido

### Cores semânticas (responsivas ao tema)
| Token | Dark | Light | Uso |
|---|---|---|---|
| `bg-background` | `#08394d`-derived navy | `#f6f9fb` off-white | Body |
| `bg-card` / `bg-popover` | navy +2% | pure white | Surfaces |
| `bg-primary` / `text-primary` | `#4a9cfa` | `#2e72b1` | CTAs, ícones-âncora |
| `bg-accent` / `text-accent` | `#54c1ed` | `#1394a4` (~) | Variantes secundárias |
| `bg-secondary` | navy +5% | bone-tint | Backgrounds neutros |
| `text-muted-foreground` | slate-blue | slate cinza | Texto auxiliar |
| `border-border` | navy +9% | bone-stroke | Linhas, divisores |

❌ **Nunca usar** `blue-500`, `cyan-300`, `slate-700` etc. literais — quebra theming.

### Tipografia
| Família | Onde |
|---|---|
| `font-display` (Sora) | Headings (h1–h3), wordmark |
| `font-sans` (Inter, default) | Corpo, labels, body |
| `font-mono` (JetBrains Mono) | Códigos, labels small-caps, indicadores |

### Escala custom
| Classe | Valor | Uso |
|---|---|---|
| `text-2xs` | 10px / 14px | Códigos, índices "01" |
| `text-mini` | 11px / 16px | Labels uppercase pequenas |
| `tracking-display` | -0.04em | Headings grandes, wordmark |
| `tracking-label` | 0.18em | Eyebrow labels uppercase |
| `tracking-kbd` | 0.25em | Credenciais marquee |
| `rounded-card` | 1rem | Cards padrão |
| `rounded-pill` | full | Badges, botões pílula, skip-link |
| `rounded-hero` | 2rem | CTA hero, blocos de destaque |

### Motion
- `transition` (Tailwind default) — micro-interações
- `animate-orbit` (40s) — orbital do hero
- `animate-marquee` (40s) — ticker credenciais
- `animate-pulse-slow` (4s) — glows, indicadores
- `animate-float` (8s) — símbolo central hero
- `animate-shimmer` (3s) — hover em métricas
- **WCAG 2.3.3:** todas neutralizadas via `@media (prefers-reduced-motion: reduce)`

---

## Componente · Button

Wrapper sobre [shadcn Button](https://ui.shadcn.com/docs/components/button).

### Quando usar
Ações primárias, secundárias, terciárias na página. CTAs no hero, formulários e dentro de cards.

### Variantes
| Variant | Classes adicionais | Use quando |
|---|---|---|
| **Primary** | `bg-primary hover:bg-primary/90 text-primary-foreground rounded-pill glow-primary` | CTA principal por seção (max 1) |
| **Secondary** | `variant="outline"` + `bg-secondary/40 hover:bg-secondary rounded-pill` | Ação alternativa próxima ao primary |
| **Ghost** | `variant="ghost"` | Links inline, "Falar com o time" no nav |
| **Icon-only** | `w-9 h-9 rounded-full glass` (theme toggle) | Ações utilitárias |

### Estados
| Estado | Visual |
|---|---|
| Default | Background sólido / glass |
| Hover | `bg-primary/90` + glow intensifica |
| Focus-visible | `ring-2 ring-primary/60` |
| Disabled | `opacity-50 pointer-events-none` (default shadcn) |
| Loading | (não implementado — adicionar spinner via `data-loading`) |

### Acessibilidade
- Role: `button`
- Foco: `focus-visible:ring-2 ring-primary/60`
- Quando icon-only: `aria-label` obrigatório
- Quando toggle: `aria-pressed`

### ✅ Do / ❌ Don't
| ✅ | ❌ |
|---|---|
| `<Button className="bg-primary">` | `<Button className="bg-blue-500">` |
| 1 primary CTA por viewport | 3+ primary CTAs competindo |
| `rounded-pill` em CTAs | `rounded-md` em CTAs de hero |

---

## Componente · Badge (eyebrow)

Padrão "eyebrow" antes do heading — numeração + categoria da seção.

### Anatomia
```tsx
<Badge variant="outline" className="rounded-pill border-primary/30 bg-primary/5 text-primary font-mono text-mini uppercase tracking-label">
  03 · Jornada conectada
</Badge>
```

### Variantes
| Tom | Uso |
|---|---|
| Primary outline | Seções principais |
| Accent outline | Seções secundárias (problema, case) |
| Filled `bg-primary/10` | Status pills dentro de cards |

### Tokens consumidos
- `border-primary/30`, `bg-primary/5`, `text-primary`
- `font-mono text-mini tracking-label`

### Acessibilidade
- Decorativo: nada necessário
- Se carregar informação semântica (count, status): adicionar contexto via `aria-label` no container

---

## Componente · CapabilityCard

Card de capacidade do ecossistema. 9 instâncias na seção `#capacidades`.

### API
| Prop | Type | Descrição |
|---|---|---|
| `code` | `string` | Nome comercial (Initia, CloudHealth.AI, ...) |
| `name` | `string` | Título descritivo da capacidade |
| `desc` | `string` | Parágrafo curto (~30 palavras) |
| `icon` | `LucideIcon` | Ícone categórico |
| `accent` | `'primary' \| 'accent'` | Tinta do ícone — alterna ritmo visual |
| `logo?` | `string` | URL do SVG do wordmark do produto (opcional) |

### Estados
| Estado | Comportamento |
|---|---|
| Default | Glass, border-gradient sutil |
| Hover | `bg-secondary/40`, glow azul aparece no canto superior direito, seta translada |
| Focus-visible | (TODO P2 — atualmente o card não é focável, não há ação) |

### Acessibilidade
- Como o card hoje não tem `onClick`, **não** é botão. O CTA é a frase "Conhecer capacidade" — recomendado envolver em `<a href>` quando rotas existirem
- Logos: `<img alt={c.code}>` é obrigatório
- Contraste: testado em dark e light, passa AA

### Variação por tema
- Dark: `logo-tint` aplica `brightness(0) invert(1)` → wordmarks brancos
- Light: `logo-tint` é `none` → wordmarks com cores originais da marca

---

## Componente · JourneyStep (tab)

Botões da jornada (`#jornada`) — 7 etapas como `role="tablist"`.

### Comportamento
- Hover, focus ou click ativam a etapa (`active === i`)
- Active: ícone com `bg-primary`, escala 1.10, glow + ring pulsante
- Inactive: glass + `text-primary` no ícone, texto em `muted-foreground`

### Acessibilidade
- Container: `role="tablist"` + `aria-label="Etapas da jornada"`
- Cada botão: `role="tab"`, `aria-selected`, `aria-current="step"` quando ativo
- `aria-label` completo com posição: "Etapa 3: Atendimento"
- Foco: `focus-visible:ring-2 ring-primary/60`
- Decorativo (ring pulsante): `aria-hidden`

### Layout
- Mobile: 2 colunas
- Tablet: 4 colunas
- Desktop: 7 colunas (uma por etapa)

---

## Padrões transversais

### Reveal on scroll
- Adicione `className="reveal"` em qualquer container
- O hook `useReveal()` em App.tsx liga um `IntersectionObserver` (threshold 0.12) e adiciona `.in`
- Em `prefers-reduced-motion: reduce`, reveal já vai direto para o estado final

### Skip-link
- Renderizado no topo do App, invisível até foco (`sr-only focus:not-sr-only`)
- Target: `<main id="main">`

### Theme switching
- Estado no App root, persistido em `localStorage` (`salux-theme`)
- Aplica `.light` em `<html>` — todas as CSS vars `:root` são sobrescritas

---

## Componente · Eyebrow / StatusBadge / CountBadge

Localização: `src/components/Eyebrow.tsx`. Wrappers semânticos sobre `<Badge>`
para garantir consistência das variantes mais usadas.

### Eyebrow (numerador de seção)
```tsx
<Eyebrow tone="primary">01 · Hero</Eyebrow>
<Eyebrow tone="accent">02 · Problema</Eyebrow>
<Eyebrow tone="primary"><Sparkles className="w-3 h-3 mr-1.5" /> Nova geração</Eyebrow>
```
| Tone | Uso |
|---|---|
| `primary` (default) | Seções principais (Hero, Jornada, Capacidades, Initia, CTA) |
| `accent` | Seções secundárias (Problema, Credenciais, Cases) |

### StatusBadge (feedback de estado)
```tsx
<StatusBadge status="success">Online</StatusBadge>
<StatusBadge status="info">Em desenvolvimento</StatusBadge>
<StatusBadge status="warning">Atenção</StatusBadge>
<StatusBadge status="neutral">Rascunho</StatusBadge>
```

### CountBadge (contadores discretos)
```tsx
<CountBadge>5 níveis</CountBadge>
<CountBadge>9 capacidades</CountBadge>
```

---

## Componente · CapabilityCard
Localização: `src/components/CapabilityCard.tsx`

```tsx
<CapabilityCard
  code="CloudHealth.AI"
  name="Telessaúde e cuidado especializado"
  desc="..."
  icon={Headphones}
  accent="primary"
  logo={cloudLogo}
  href="#contato"
  ctaLabel="Conhecer capacidade"
/>
```

### Comportamento
- Container: `<a>` focável com `focus-visible:ring-2 ring-primary/60`
- Hover: blob azul no canto, `bg-secondary/40`, seta translada
- Sem `logo`: cai no código mono (`text-2xs tracking-label`)
- Com `logo`: usa `<img>` com classe `logo-tint` (white-out no dark, cor original no light)

---

## Componente · MetricCard
Localização: `src/components/MetricCard.tsx`

```tsx
<MetricCard value="−68%" label="Absenteísmo · UTI 1" />
<MetricCard value="2–3 dias → 45 min" label="Tempo de elaboração de escalas" />
```

Display via `text-gradient-bone`. Hover ativa `animate-shimmer`.

---

## Componente · JourneyStep
Localização: `src/components/JourneyStep.tsx`

```tsx
<div role="tablist" aria-label="Etapas da jornada">
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
```

Botão-tab com `role="tab"`, `aria-selected`, `aria-current="step"`.
Container externo é responsável pelo `role="tablist"`.

---

## Roadmap

- [ ] Variantes formais de `Button` (loading, destructive)
- [ ] Extrair `AgenticLevelRow` e `OrbitVisual` (hero)
- [ ] Mover `capabilities` / `journey` / `agenticLevels` para `src/data/ecosystem.ts`
- [ ] `Toast` para feedback de submit do form
- [ ] Modal `Dialog` para case studies expandidos
