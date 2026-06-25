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

// A "page scene" the lens refracts. The demo's loupe copies the page (dot
// grid + content) and refracts that copy through the SVG filter — that's
// what makes the page-bend look work cross-browser (the `refract` prop
// routes the SVG filter at a copy, so it's not Blink-only like
// `backdrop-filter: url()`). For the portfolio we mirror the hero's
// gradients + dark base — the loupe then refracts a page-like surface
// as it follows the cursor.
function PageScene() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        background: '#0A0A0C',
        backgroundImage: [
          // Hero purple bloom (top-right)
          'radial-gradient(50% 50% at 80% 20%, rgba(43, 42, 99, 0.55) 0%, transparent 60%)',
          // Hero orange bloom (bottom-left)
          'radial-gradient(40% 40% at 10% 90%, rgba(217, 122, 74, 0.32) 0%, transparent 60%)',
          // Subtle teal sheen (centre, very faint)
          'radial-gradient(60% 60% at 50% 50%, rgba(63, 184, 176, 0.10) 0%, transparent 70%)',
        ].join(', '),
      }}
    />
  );
}

/**
 * A floating liquid-glass loupe that follows the cursor across the whole
 * page, modelled on the playground at glass.samasante.com.
 *
 * The lens is 93 x 50 (r=74). It refracts a copy of <PageScene> via the
 * library's `refract` + `pixelUnits` path (the same mode the demo uses) so
 * the SVG displacement filter is applied cross-browser, not Blink-only.
 * The wrapper is a 100vw x 100vh fixed layer with `position: absolute;
 * inset: 0` on the <Glass>, and the lens centre (a 0..1 motion value)
 * positions the loupe within that field.
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
