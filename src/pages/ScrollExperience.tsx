import { Link } from 'react-router-dom'
import { ScrollScene } from '@/components/scroll-scene/ScrollScene'

export function ScrollExperience() {
  return (
    <>
      {/* Back link — unobtrusive, top-left */}
      <Link
        to="/"
        className="fixed top-6 left-6 text-white/40 hover:text-white/80 text-sm tracking-widest uppercase transition-colors duration-300"
        style={{ zIndex: 100, fontFamily: "'Sora', sans-serif", letterSpacing: '0.18em' }}
      >
        ← Salux
      </Link>

      {/* 500 vh immersive scroll experience */}
      <ScrollScene />

      {/* End state — appears naturally after the scroll height */}
      <section
        className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden"
        style={{ background: 'hsl(256 74% 36%)' }}
      >
        {/* Soft radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, hsl(282 68% 28% / 0.7) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-2xl px-6 flex flex-col items-center gap-8">
          <p
            className="text-white/40 uppercase tracking-[0.3em] text-xs"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Salux Platform
          </p>

          <h2
            className="text-white leading-[1.05] tracking-tighter"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.8rem, 8vw, 7rem)',
            }}
          >
            Forma.<br />Cor.<br />Textura.
          </h2>

          <p
            className="text-white/55 text-lg leading-relaxed max-w-md"
            style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300 }}
          >
            Soluções que dão forma às operações de saúde. Uma plataforma. Infinitas possibilidades.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              to="/"
              className="px-8 py-3.5 rounded-full bg-white text-slate-900 text-sm font-semibold tracking-wide hover:bg-white/90 transition-colors"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Explorar Salux
            </Link>
            <Link
              to="/capacidades"
              className="px-8 py-3.5 rounded-full border border-white/25 text-white text-sm font-medium tracking-wide hover:border-white/50 transition-colors"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Ver Capacidades
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
