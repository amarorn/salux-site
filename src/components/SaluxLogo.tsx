import { useId, useEffect } from 'react'
import { motion, useAnimation, useReducedMotion } from 'framer-motion'

/**
 * Entrance → slow perpetual spin.
 *
 * Sequência:
 * 1. fade-in + scale 0.55→1 + unroll -18°→0° (0.8s, ease-out cinematográfico)
 * 2. imediatamente depois: giro contínuo 0°→360° (44s, linear, ∞)
 * 3. hover: scale 1→1.08 com spring gentil
 * 4. reduced-motion: SVG estático, sem nenhuma transform
 *
 * Gradientes usam IDs únicos via useId() — safe quando o símbolo
 * aparece múltiplas vezes na mesma página (nav + hero).
 */

const EASE = [0.22, 1, 0.36, 1] as const

export function SaluxSymbol({ className = 'w-8 h-8' }: { className?: string }) {
  const uid     = useId().replace(/:/g, 's')   // :r0: → sr0s (válido em url(#id))
  const reduced = useReducedMotion()
  const appear  = useAnimation()
  const spin    = useAnimation()

  useEffect(() => {
    if (reduced) return
    appear
      .start({
        opacity   : 1,
        scale     : 1,
        rotate    : 0,
        transition: { duration: 0.8, ease: EASE },
      })
      .then(() =>
        spin.start({
          rotate    : 360,
          transition: {
            duration  : 44,
            ease      : 'linear',
            repeat    : Infinity,
            repeatType: 'loop' as const,
          },
        })
      )
  }, [appear, spin, reduced])

  const g  = (name: string) => `${uid}-${name}`
  const u  = (name: string) => `url(#${g(name)})`

  return (
    <motion.svg
      viewBox   ="0 0 178.25 178.25"
      xmlns     ="http://www.w3.org/2000/svg"
      className ={className}
      aria-hidden
      initial   ={reduced ? false : { opacity: 0, scale: 0.55, rotate: -18 }}
      animate   ={appear}
      whileHover={reduced ? undefined : {
        scale     : 1.08,
        transition: { type: 'spring', stiffness: 260, damping: 22 },
      }}
    >
      <defs>
        <linearGradient id={g('g6')} x1="51.03" y1="-1289.43" x2="4.34" y2="-1364.15"
          gradientTransform="translate(0 -1227.61) scale(1 -1)" gradientUnits="userSpaceOnUse">
          <stop offset="0"   stopColor="#08394d"/>
          <stop offset=".2"  stopColor="#19537a"/>
          <stop offset=".47" stopColor="#2e72b1"/>
          <stop offset=".7"  stopColor="#3d89d9"/>
          <stop offset=".89" stopColor="#4797f1"/>
          <stop offset="1"   stopColor="#4a9cfa"/>
        </linearGradient>

        <linearGradient id={g('g5')} x1="0" y1="-1312.36" x2="63.96" y2="-1312.36"
          gradientTransform="translate(0 -1227.61) scale(1 -1)" gradientUnits="userSpaceOnUse">
          <stop offset=".04" stopColor="#52a0ef"/>
          <stop offset="1"   stopColor="#52a0ef"/>
        </linearGradient>

        <linearGradient id={g('g3')} x1="-1363.44" y1="650.32" x2="-1410.13" y2="575.6"
          gradientTransform="translate(-1236.23 -533.9) rotate(-180) scale(1 -1)" gradientUnits="userSpaceOnUse">
          <stop offset="0"   stopColor="#08394d"/>
          <stop offset=".15" stopColor="#17556d"/>
          <stop offset=".44" stopColor="#3183a4"/>
          <stop offset=".69" stopColor="#44a5cc"/>
          <stop offset=".88" stopColor="#50b9e4"/>
          <stop offset="1"   stopColor="#54c1ed"/>
        </linearGradient>

        <linearGradient id={g('g6b')} x1="-1555.55" y1="-956.27" x2="-1602.24" y2="-1030.99"
          gradientTransform="translate(-894.44 -1428.34) rotate(-90) scale(1 -1)" gradientUnits="userSpaceOnUse">
          <stop offset="0"   stopColor="#08394d"/>
          <stop offset=".2"  stopColor="#19537a"/>
          <stop offset=".47" stopColor="#2e72b1"/>
          <stop offset=".7"  stopColor="#3d89d9"/>
          <stop offset=".89" stopColor="#4797f1"/>
          <stop offset="1"   stopColor="#4a9cfa"/>
        </linearGradient>

        <linearGradient id={g('g5b')} x1="38.53" y1="-1373.87" x2="130.99" y2="-1373.87"
          gradientTransform="translate(0 -1227.61) scale(1 -1)" gradientUnits="userSpaceOnUse">
          <stop offset=".04" stopColor="#52a0ef"/>
          <stop offset="1"   stopColor="#52a0ef"/>
        </linearGradient>

        <linearGradient id={g('g6c')} x1="243.14" y1="317.16" x2="196.45" y2="242.44"
          gradientTransform="translate(-200.74 -192.11) rotate(90) scale(1 -1)" gradientUnits="userSpaceOnUse">
          <stop offset="0"   stopColor="#08394d"/>
          <stop offset=".2"  stopColor="#19537a"/>
          <stop offset=".47" stopColor="#2e72b1"/>
          <stop offset=".7"  stopColor="#3d89d9"/>
          <stop offset=".89" stopColor="#4797f1"/>
          <stop offset="1"   stopColor="#4a9cfa"/>
        </linearGradient>

        <linearGradient id={g('g7')} x1="47.26" y1="-1259.59" x2="139.73" y2="-1259.59"
          gradientTransform="translate(0 -1227.61) scale(1 -1)" gradientUnits="userSpaceOnUse">
          <stop offset=".04" stopColor="#52a0ef"/>
          <stop offset="1"   stopColor="#4a9cfa"/>
        </linearGradient>
      </defs>

      {/*
        motion.g com transformBox: fill-box + transformOrigin: center
        garante que o pivô do giro seja o centro exato do símbolo (89.125, 89.125),
        não o canto do viewport SVG.
      */}
      <motion.g
        animate={spin}
        style={{
          transformOrigin : 'center',
          transformBox    : 'fill-box',
        } as React.CSSProperties}
      >
        <path fill={u('g6')}  d="M59.97,98.73c5.28-5.28,5.33-13.89.1-19.12-5.23-5.23-30-30-32.35-32.35,0,0,9.93,13.95,7.4,24.13-2.53,10.17-31.18,45.32-31.18,45.32-5.15,6.34-5.33,13.89-.1,19.12s13.84,5.19,19.12-.1l37.01-37Z"/>
        <path fill={u('g5')}  d="M59.97,79.51c5.28,5.28,5.33,13.89.1,19.12-5.23,5.23-30,30-32.35,32.35,0,0,9.93-13.95,7.4-24.13-2.53-10.17-31.18-45.32-31.18-45.32-5.15-6.34-5.33-13.89-.09-19.12,5.23-5.23,13.84-5.19,19.12.1l37,37Z"/>
        <path fill={u('g3')}  d="M118.27,79.51c-5.28,5.28-5.33,13.89-.1,19.12s30,30,32.35,32.35c0,0-9.93-13.95-7.4-24.13,2.53-10.17,31.18-45.32,31.18-45.32,5.15-6.34,5.33-13.89.1-19.12s-13.84-5.19-19.12.1l-37.01,37Z"/>
        <path fill="#54c1ed"  d="M118.27,98.73c-5.28-5.28-5.33-13.89-.1-19.12s30-30,32.35-32.35c0,0-9.93,13.95-7.4,24.13,2.53,10.17,31.18,45.32,31.18,45.32,5.15,6.34,5.33,13.89.1,19.12s-13.84,5.19-19.12-.1l-37.01-37Z"/>
        <path fill={u('g6b')} d="M98.73,118.27c-5.28-5.28-13.89-5.33-19.12-.1s-30,30-32.35,32.35c0,0,13.95-9.93,24.13-7.4,10.17,2.53,45.32,31.18,45.32,31.18,6.34,5.15,13.89,5.33,19.12.1s5.19-13.84-.1-19.12l-37-37.01Z"/>
        <path fill={u('g5b')} d="M79.52,118.27c5.28-5.28,13.89-5.33,19.12-.1s30,30,32.35,32.35c0,0-13.95-9.93-24.13-7.4-10.17,2.53-45.32,31.18-45.32,31.18-6.34,5.15-13.89,5.33-19.12.1-5.23-5.23-5.19-13.84.1-19.12l37-37.01Z"/>
        <path fill={u('g6c')} d="M79.52,59.97c5.28,5.28,13.89,5.33,19.12.1s30-30,32.35-32.35c0,0-13.95,9.93-24.13,7.4-10.18-2.53-45.33-31.18-45.33-31.18-6.34-5.15-13.89-5.33-19.12-.1s-5.19,13.84.1,19.12l37.01,37.01Z"/>
        <path fill={u('g7')}  d="M98.73,59.97c-5.28,5.28-13.89,5.33-19.12.1L47.26,27.72s13.95,9.93,24.13,7.4c10.17-2.53,45.32-31.18,45.32-31.18,6.34-5.15,13.89-5.33,19.12-.1,5.23,5.23,5.19,13.84-.1,19.12l-37,37.01Z"/>
      </motion.g>
    </motion.svg>
  )
}

export function SaluxWordmark({ className = 'h-7' }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <SaluxSymbol className="h-full w-auto" />
      <span className="font-display text-[1.45em] leading-none tracking-[-0.04em] text-foreground/95">
        Salux
      </span>
    </div>
  )
}
