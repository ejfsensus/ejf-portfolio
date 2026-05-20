import { useEffect, useRef, useState } from 'react';

type Props = {
  hue: string;
  seed?: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  alt?: string;
  videoDelayMs?: number;
};

function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.replace('/', '') || null;
    }
    const v = parsed.searchParams.get('v');
    if (v) return v;
    const parts = parsed.pathname.split('/');
    const i = parts.findIndex((p) => p === 'embed' || p === 'shorts');
    if (i >= 0 && parts[i + 1]) return parts[i + 1];
    return null;
  } catch {
    return null;
  }
}

/**
 * Generative abstract prism artwork.
 * Swap-in ready: if `imageUrl` is provided, it renders that image instead.
 * If `videoUrl` is provided, the image swaps to a muted autoplay YouTube embed
 * 5 s after the card becomes visible. Honors prefers-reduced-motion.
 */
export function PrismArtefact({
  hue,
  seed = 'a',
  imageUrl,
  videoUrl,
  alt,
  videoDelayMs = 5000,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoId = videoUrl ? extractYouTubeId(videoUrl) : null;
  const embedSrc = videoId
    ? (() => {
        const origin =
          typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : '';
        const params = [
          'autoplay=1',
          'mute=1',
          'controls=0',
          'playsinline=1',
          'rel=0',
          'modestbranding=1',
          origin ? `origin=${origin}` : '',
        ]
          .filter(Boolean)
          .join('&');
        return `https://www.youtube.com/embed/${videoId}?${params}`;
      })()
    : '';

  useEffect(() => {
    if (!videoId || !imageUrl) return;
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const host = window.location.hostname;
    const isSandboxedPreview =
      host.includes('webcontainer') || host.includes('local-credentialless');
    if (isSandboxedPreview) return;

    const el = containerRef.current;
    if (!el) return;

    let timeoutId: number | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && timeoutId === undefined) {
            timeoutId = window.setTimeout(() => setShowVideo(true), videoDelayMs);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [videoId, imageUrl, videoDelayMs]);

  if (imageUrl) {
    return (
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-obsidian"
      >
        <img
          src={imageUrl}
          alt={alt ?? ''}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            showVideo ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {videoId && showVideo && !videoFailed && (
          <IframeWithFallback
            src={embedSrc}
            title={alt ? `${alt} demo video` : 'Product demo video'}
            onFail={() => setVideoFailed(true)}
          />
        )}
      </div>
    );
  }

  const code = seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const r1 = 40 + (code % 40);
  const r2 = 30 + ((code * 3) % 50);
  const cx1 = 25 + (code % 40);
  const cy1 = 30 + ((code * 7) % 30);
  const cx2 = 55 + ((code * 5) % 25);
  const cy2 = 55 + ((code * 11) % 25);
  const rot = (code * 13) % 360;

  const gradId = `grad-${seed}`;
  const gradId2 = `grad2-${seed}`;

  return (
    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-obsidian">
      <svg viewBox="0 0 100 62" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={hue} stopOpacity="0.9" />
            <stop offset="100%" stopColor={hue} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={gradId2} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F4F1EC" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#F4F1EC" stopOpacity="0" />
          </radialGradient>
          <filter id={`blur-${seed}`}>
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <rect width="100" height="62" fill="#0A0A0C" />
        <g filter={`url(#blur-${seed})`}>
          <circle cx={cx1} cy={cy1} r={r1} fill={`url(#${gradId})`} />
          <circle cx={cx2} cy={cy2} r={r2} fill={`url(#${gradId2})`} />
        </g>
        <g transform={`rotate(${rot} 50 31)`} opacity="0.45">
          <line x1="-20" y1="31" x2="120" y2="31" stroke={hue} strokeWidth="0.25" />
          <line x1="-20" y1="20" x2="120" y2="20" stroke="#F4F1EC" strokeOpacity="0.1" strokeWidth="0.2" />
          <line x1="-20" y1="42" x2="120" y2="42" stroke="#F4F1EC" strokeOpacity="0.1" strokeWidth="0.2" />
        </g>
      </svg>
      <div
        aria-hidden
        className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full"
        style={{
          background: `radial-gradient(circle, ${hue} 0%, transparent 70%)`,
          filter: 'blur(30px)',
          opacity: 0.55,
        }}
      />
    </div>
  );
}

function IframeWithFallback({
  src,
  title,
  onFail,
}: {
  src: string;
  title: string;
  onFail: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (!loaded) onFail();
    }, 4000);
    return () => window.clearTimeout(t);
  }, [loaded, onFail]);
  return (
    <iframe
      title={title}
      src={src}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      onLoad={() => setLoaded(true)}
      onError={onFail}
      className="absolute inset-0 w-full h-full border-0"
    />
  );
}
