import { useEffect, useMemo, useRef } from 'react';
import { Glass, glassValue } from '@samasante/liquid-glass';

// Apple-ish preset tuned for the current 93x50 loupe. Low frost (1) keeps the
// backdrop blur a whisper so the live page reads through, while strong
// refraction + sheen + bend do the heavy visual lifting.
const APPLE_OPTICS = {
  // REFRACTION
  strength: 0.14,
  depth: 0.95,
  curvature: 0.5,
  dispersion: 0.2,
  // EDGE
  bend: 0.4,
  bendWidth: 0.07,
  // SHEEN
  sheen: 1.2,
  sheenWidth: 3.5,
  specular: 1.6,
  sheenAngle: 0,
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
 * A floating liquid-glass loupe that follows the cursor across the whole page.
 * In Chrome/Edge it refracts the LIVE page beneath it (the SVG filter chain);
 * in Safari/Firefox it still frosts + tints + edge-lights the underlying content
 * via the CSS `backdrop-filter` layer.
 *
 * The wrapper is a 100vw × 100vh fixed layer; the <Glass> fills it via
 * `position: absolute; inset: 0`, and the lens centre (a 0..1 motion value)
 * positions the 93 × 50 loupe within that field.
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
        width={93}
        height={50}
        radius={74}
        center={{ x, y }}
        optics={APPLE_OPTICS}
        unstable_lens={{
          tintColor: 'white',
          tintOpacity: 0.04,
          tintBlur: 0,
          restShadowOpacity: 1,
          edgeBias: 0.5,
        }}
        style={{ position: 'absolute', inset: 0 }}
      />
    </div>
  );
}
