import { useEffect, useMemo, useRef } from 'react';
import { Glass, glassValue } from '@samasante/liquid-glass';

/**
 * CursorGlass — a fresh, demo-faithful reimplementation of the loupe from
 * glass.samasante.com.
 *
 * The demo's Playground loupe (see samasante/liquid-glass/site/src/
 * components/GlassDemo.tsx) uses:
 *
 *   <Glass
 *     refract={<Scene dark grid scale />}
 *     pixelUnits
 *     behind={pageBg}
 *     optics={DEFAULT_LENS}
 *     center={{ x: glassValue, y: glassValue }}
 *     width={glassValue} height={glassValue} radius={glassValue}
 *     style={{ position: "absolute", inset: 0 }}
 *   />
 *
 * …inside a bounded stage. Here we use the same exact wiring, but the
 * "stage" is the full viewport so the loupe can roam the whole page.
 *
 * Lens geometry: a true 240 x 240 circle (radius 120) — round, thick,
 * substantial, matching the demo's substantial feel.
 *
 * Scene: a full-viewport page mirror (dark obsidian base, the hero's
 * purple/orange/teal radial blooms, a 23px white-6% dot grid, and the
 * hero's ghost type) so the refracted copy reads as a real page rather
 * than a flat gradient.
 */

// ── Lens geometry ──────────────────────────────────────────────────────────
const LENS_SIZE = 240; // full px — round, thick
const LENS_RADIUS = LENS_SIZE / 2;

// ── Optics: verbatim from the demo's DEFAULT_LENS (Playground.tsx) ─────────
const DEMO_OPTICS = {
  // shape
  mapSize: 512,
  clipToShape: true,
  softEdge: true,
  splay: 0,
  sheenAngle: 0,
  sheenDark: false,
  // edge / meniscus
  bend: 0.4,
  bendWidth: 0.07,
  // refraction
  depth: 0.95,
  curvature: 0.5,
  dispersion: 0.2,
  strength: 0.14,
  // background
  frost: 1,
  brightness: 0,
  // specular
  specular: 1.55,
  sheen: 1.2,
  sheenWidth: 3.5,
  sheenFalloff: 1.7,
  // glow
  glow: 0.1,
  glowSpread: 1,
  glowFalloff: 0.6,
} as const;

/**
 * The <Scene> the lens refracts. Modelled on the demo's Scene: a
 * page-like surface (bg color + dot grid + content) so the refracted
 * copy reads as a real page, not a flat gradient.
 */
function PageScene() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        backgroundColor: '#0A0A0C',
        backgroundImage: [
          // Dot grid (matches the demo's anchor pattern)
          'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          // Hero purple bloom (top-right)
          'radial-gradient(50% 50% at 80% 20%, rgba(43, 42, 99, 0.55) 0%, transparent 60%)',
          // Hero orange bloom (bottom-left)
          'radial-gradient(40% 40% at 10% 90%, rgba(217, 122, 74, 0.32) 0%, transparent 60%)',
          // Subtle teal sheen (centre, very faint)
          'radial-gradient(60% 60% at 50% 50%, rgba(63, 184, 176, 0.10) 0%, transparent 70%)',
        ].join(', '),
        backgroundSize: '23px 23px, 100% 100%, 100% 100%, 100% 100%',
      }}
    >
      {/* Ghost type — a few dim headlines so the refracted copy reads
          as a page-with-content rather than a flat field. Low contrast
          on purpose (the lens's bend + sheen are the visual focus). */}
      <div
        style={{
          position: 'absolute',
          left: '6%',
          top: '32%',
          color: 'rgba(245, 245, 240, 0.22)',
          fontFamily: 'ui-serif, Georgia, serif',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(40px, 7vw, 88px)',
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        Unique perspectives,
      </div>
      <div
        style={{
          position: 'absolute',
          left: '6%',
          top: '44%',
          color: 'rgba(245, 245, 240, 0.18)',
          fontFamily: 'ui-serif, Georgia, serif',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(40px, 7vw, 88px)',
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        built with intent.
      </div>
      <div
        style={{
          position: 'absolute',
          right: '8%',
          top: '18%',
          color: 'rgba(217, 122, 74, 0.28)',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          fontWeight: 500,
          fontSize: '11px',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        Accepting clients
      </div>
      <div
        style={{
          position: 'absolute',
          left: '6%',
          bottom: '12%',
          color: 'rgba(245, 245, 240, 0.12)',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: 1.55,
          maxWidth: '38ch',
          userSelect: 'none',
        }}
      >
        AI consulting, design &amp; deployment. Operating as OpusAI, the
        applied arm of Sensus InVista.
      </div>
    </div>
  );
}

/**
 * The loupe. Cursor following is wired exactly like the demo: the
 * `center` prop takes 0..1 motion values that an rAF loop eases towards
 * the cursor. Touch-only devices are skipped (a sticky loupe breaks
 * scroll/tap).
 */
export function CursorGlass() {
  const x = useMemo(() => glassValue(0.5), []);
  const y = useMemo(() => glassValue(0.5), []);
  const targetRef = useRef({ x: 0.5, y: 0.5 });
  const visibleRef = useRef(false);
  const enabledRef = useRef(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      enabledRef.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    }
  }, []);

  // rAF loop: ease centre towards cursor target.
  useEffect(() => {
    if (!enabledRef.current) return;
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const cx = x.get();
      const cy = y.get();
      const tx = targetRef.current.x;
      const ty = targetRef.current.y;
      const ease = 0.3;
      const nx = cx + (tx - cx) * ease;
      const ny = cy + (ty - cy) * ease;
      if (Math.abs(nx - cx) > 0.0003 || Math.abs(ny - cy) > 0.0003) {
        x.set(nx);
        y.set(ny);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [x, y]);

  // Track the cursor as a 0..1 fraction of the viewport.
  useEffect(() => {
    if (!enabledRef.current) return;
    const onMove = (e: PointerEvent) => {
      const tx = e.clientX / window.innerWidth;
      const ty = e.clientY / window.innerHeight;
      targetRef.current = { x: tx, y: ty };
      if (!visibleRef.current) {
        // Snap on the first move so the loupe appears under the cursor
        // instead of drifting in from the screen centre.
        x.set(tx);
        y.set(ty);
        visibleRef.current = true;
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [x, y]);

  if (!enabledRef.current) return null;

  return (
    <div
      aria-hidden
      data-cursor-glass=""
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 60,
      }}
    >
      <Glass
        refract={<PageScene />}
        pixelUnits
        behind="#0A0A0C"
        optics={DEMO_OPTICS}
        center={{ x, y }}
        width={LENS_SIZE}
        height={LENS_SIZE}
        radius={LENS_RADIUS}
        style={{ position: 'absolute', inset: 0 }}
      />
    </div>
  );
}
