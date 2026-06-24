import { useEffect, useRef } from 'react';
import { Glass } from '@samasante/liquid-glass';

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
 * A floating liquid-glass loupe that follows the cursor across the whole page.
 *
 * The lens is a fixed 93 x 50 (r=74) wrapper that we move with a CSS
 * `transform: translate3d()`. Inside the wrapper, a `<Glass>` in MATERIAL mode
 * applies the SVG displacement filter via `backdrop-filter: url()`. In Chrome
 * and Edge, that refracts the LIVE page beneath the lens (the demo's effect);
 * in Safari/Firefox the lens still frosts + tints + edge-lights the content
 * beneath it.
 *
 * Why a CSS transform and not the library's `center` motion value? Setting
 * `center` on `<Glass>` opts the engine into DOM mode, which applies the SVG
 * filter to the element's OWN pixels. With no children to bend, DOM mode only
 * shows the backdrop blur + tint veil (the "dark pill" look). Material mode
 * is what makes the live page refract.
 */
export function CursorGlass() {
  const ref = useRef<HTMLDivElement>(null);
  const enabledRef = useRef(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      enabledRef.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    }
  }, []);

  // rAF loop: ease the lens position towards the cursor target, then write the
  // transform directly to the wrapper. A pure transform keeps the backdrop
  // filter on the GPU layer so the lens re-rasterises per frame without
  // re-layout.
  useEffect(() => {
    if (!enabledRef.current) return;
    let raf = 0;
    let tx = -200, ty = -200, cx = -200, cy = -200;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (cx < -100) {
        // Snap on the first move so the loupe appears under the cursor
        // instead of drifting in from the screen centre.
        cx = tx;
        cy = ty;
        if (ref.current) {
          ref.current.style.transform = `translate3d(${cx - 46.5}px, ${cy - 25}px, 0)`;
        }
      }
    };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const ease = 0.3;
      const nx = cx + (tx - cx) * ease;
      const ny = cy + (ty - cy) * ease;
      if (Math.abs(nx - cx) > 0.05 || Math.abs(ny - cy) > 0.05) {
        cx = nx;
        cy = ny;
        if (ref.current) {
          ref.current.style.transform = `translate3d(${cx - 46.5}px, ${cy - 25}px, 0)`;
        }
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabledRef.current) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      data-cursor-glass=""
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 93,
        height: 50,
        borderRadius: 74,
        pointerEvents: 'none',
        zIndex: 60,
        transform: 'translate3d(-200px, -200px, 0)',
        willChange: 'transform',
        overflow: 'visible',
      }}
    >
      <Glass
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 74,
        }}
        optics={APPLE_OPTICS}
      >
        {/* Material mode requires a non-null child. A 1px zero-opacity marker
            keeps the lens in-flow without contributing any visible content. */}
        <span aria-hidden style={{ display: 'block', width: 1, height: 1, opacity: 0 }} />
      </Glass>
    </div>
  );
}
