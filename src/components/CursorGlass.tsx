import { useEffect, useMemo, useRef } from 'react';
import { Glass, glassValue } from '@samasante/liquid-glass';

// Extracted liquid-glass settings for the 93x50 loupe.
const APPLE_OPTICS = {
  // REFRACTION
  strength: 0.2,
  depth: 0.95,
  curvature: 0.35,
  dispersion: 0.2,
  // EDGE
  bend: 0.4,
  bendWidth: 0.06,
  // SHEEN
  sheen: 1.2,
  sheenWidth: 3.5,
  specular: 1.6,
  sheenAngle: 20,
  sheenFalloff: 1.5,
  // BACKGROUND
  glow: 0.1,
  glowSpread: 1,
  glowFalloff: 0.5,
  frost: 1,
  brightness: 0,
  splay: 0,
  clipToShape: true,
  softEdge: true,
  mapSize: 512,
};

/**
 * The <Scene> the lens refracts. The demo's loupe copies the stage (dot
 * grid + headline + photos) and refracts that copy through the SVG filter —
 * that's what makes the loupe read as "looking at the page". For the
 * portfolio we mirror the page's actual visual language: dark obsidian base,
 * the same purple/orange/teal radial blooms used across the hero + section
 * cards, a subtle dot grid (matching the demo's anchor pattern), and a few
 * ghost lines of type that read as a refracted page when the lens passes
 * over them.
 *
 * Kept deliberately restrained — the lens is 93x50, so the refracted copy
 * only needs to register as "page-like" at small scale, not be a full
 * pixel-perfect duplicate of the page.
 */
function PageScene() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
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
        backgroundPosition: '0 0, 0 0, 0 0, 0 0',
        overflow: 'hidden',
      }}
    >
      {/* Ghost type — a couple of dim headlines so the refracted copy reads
          as a page-with-content rather than a flat gradient. Low contrast
          on purpose (the lens's bend + sheen are the visual focus). */}
      <div
        style={{
          position: 'absolute',
          left: '6%',
          top: '38%',
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
        Unique perspectives,
      </div>
      <div
        style={{
          position: 'absolute',
          left: '6%',
          top: '52%',
          color: 'rgba(245, 245, 240, 0.14)',
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
          top: '20%',
          color: 'rgba(217, 122, 74, 0.22)',
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
          bottom: '14%',
          color: 'rgba(245, 245, 240, 0.10)',
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
 * A floating liquid-glass loupe that follows the cursor across the whole
 * page, modelled exactly on the playground at glass.samasante.com:
 *
 *   - <Glass refract={<PageScene />} pixelUnits behind="#0A0A0C" />
 *   - center={{x, y}} with motion values (snaps on first move, eases 0.3)
 *   - width / height / radius as static px (the user's spec)
 *
 * The lens is OPAQUE — it shows a refracted copy of the Scene, just like
 * the demo's loupe shows a refracted copy of its stage. To "see the page
 * through the glass", the Scene has to BE a page-like surface; the
 * library's `refract` path can't sample the live DOM.
 */
export function CursorGlass() {
  const x = useMemo(() => glassValue(0.5), []);
  const y = useMemo(() => glassValue(0.5), []);
  const targetRef = useRef({ x: 0.5, y: 0.5 });
  const visibleRef = useRef(false);
  // Skip on touch-only devices — a sticky loupe breaks scroll/tap.
  const enabledRef = useRef(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      enabledRef.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    }
  }, []);

  // rAF loop: ease the centre towards the cursor target every frame.
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
        optics={APPLE_OPTICS}
        center={{ x, y }}
        width={93}
        height={50}
        radius={74}
        style={{ position: 'absolute', inset: 0 }}
      />
    </div>
  );
}
