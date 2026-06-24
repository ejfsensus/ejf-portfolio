import { useEffect, useMemo, useRef } from 'react';
import { Glass, glassValue } from '@samasante/liquid-glass';

// Apple-ish preset (Option B): a balanced liquid-glass look with a clear
// chromatic fringe, soft inner glow, and a directional edge sheen. Tuned for
// a small cursor-following loupe over the page.
const APPLE_OPTICS = {
  strength: 0.08,
  depth: 0.75,
  curvature: 0.7,
  dispersion: 0.6,
  frost: 0.4,
  brightness: 0.12,
  specular: 1,
  sheen: 0.4,
  sheenAngle: 45,
  sheenWidth: 3,
  sheenFalloff: 1.5,
  glow: 0.18,
  glowSpread: 1,
  glowFalloff: 0.5,
  bend: 0,
  bendWidth: 0.16,
  splay: 0,
  clipToShape: true,
  softEdge: true,
  mapSize: 512,
};

/**
 * A floating liquid-glass loupe that follows the cursor across the whole page.
 * In Chrome/Edge it refracts the LIVE page beneath it; in Safari/Firefox it
 * still frosts + tints + edge-lights the underlying content. Lens geometry is
 * fixed (93 × 50, r=74 — a stadium/pill), only its centre animates.
 */
export function CursorGlass() {
  const x = useMemo(() => glassValue(0.5), []);
  const y = useMemo(() => glassValue(0.5), []);
  const targetRef = useRef({ x: 0.5, y: 0.5 });
  const visibleRef = useRef(false);
  // Lock off on touch-only devices — pointermove there is unreliable and
  // a sticky loupe ruins scroll/tap.
  const enabledRef = useRef(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      enabledRef.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    }
  }, []);

  // Animation loop: ease the centre towards the target every frame.
  useEffect(() => {
    if (!enabledRef.current) return;
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const cx = x.get();
      const cy = y.get();
      const tx = targetRef.current.x;
      const ty = targetRef.current.y;
      const ease = 0.2;
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
        // Snap on the first move so the lens appears under the cursor
        // instead of drifting in from the centre.
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
        // Keep the wrapper out of layout — it owns no size, the lens sits on
        // top of the page purely visually.
        contain: 'strict',
      }}
    >
      <Glass
        width={93}
        height={50}
        radius={74}
        center={{ x, y }}
        optics={APPLE_OPTICS}
      />
    </div>
  );
}
