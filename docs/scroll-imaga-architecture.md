# IMAGA-style Scroll Architecture (Production Ready)

This project now includes a modular, scroll-driven immersive scene with:

- `src/components/scroll-scene/ScrollScene.tsx`
- `src/components/scroll-scene/AnimatedWord.tsx`
- `src/components/scroll-scene/BackgroundScene.tsx`
- `src/hooks/useScrollProgress.ts`
- `src/config/animation.config.ts`

## Folder structure

```txt
src/
  components/
    scroll-scene/
      ScrollScene.tsx
      AnimatedWord.tsx
      BackgroundScene.tsx
  hooks/
    useScrollProgress.ts
  config/
    animation.config.ts
  pages/
    ScrollExperience.tsx
```

## Technical decisions

- Scroll is fully driven by GSAP `ScrollTrigger` (no timers).
- Main visuals stay `position: fixed`, while an artificial spacer controls duration.
- Word transitions are timeline-based and synchronized with scene progress.
- Background uses layered gradients + blurred particles for cinematic depth.
- Hook-based progress tracking avoids React re-renders during scroll.

## Performance strategy

- Zero state updates inside scroll loop.
- Direct style mutation (`ref.style`) for gradient and timeline properties.
- Canvas on capped DPR (`<= 1.75`) to reduce fill rate cost.
- Particle render loop throttled to ~30fps while preserving 60fps UI thread feel.
- `transform: translate3d(0,0,0)`, `will-change`, and `force3D` used on animated layers.
- All `ScrollTrigger`, rAF, and observers are cleaned up on unmount.

## Responsive strategy

- Word size controlled with clamp and mobile override utility `.imaga-word`.
- Mobile uses reduced `EXIT` scale to prevent aggressive clipping.
- Scene height recalculates on resize with `ScrollTrigger.refresh()`.

## SSR safety

- DOM access only in `useEffect`/`useLayoutEffect`.
- No direct `window` usage during render paths.

## Evolution path (WebGL / Three.js)

You can upgrade `BackgroundScene` to a WebGL renderer with:

1. Full-screen quad shader for gradient/noise interpolation.
2. GPU particles (instanced points or billboards) tied to scroll uniforms.
3. Post-processing pass for bloom + film grain.
4. Shared progress uniform fed by `useScrollProgress`.

This preserves the same architecture while replacing only the background implementation.