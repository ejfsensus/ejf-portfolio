type Props = {
  hue: string;
  seed?: string;
  imageUrl?: string | null;
  alt?: string;
};

/**
 * Generative abstract prism artwork.
 * Swap-in ready: if `imageUrl` is provided, it renders that image instead.
 * The SVG light-field is deterministic per `seed`, so each product has its own signature.
 */
export function PrismArtefact({ hue, seed = 'a', imageUrl, alt }: Props) {
  if (imageUrl) {
    return (
      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-obsidian">
        <img src={imageUrl} alt={alt ?? ''} className="w-full h-full object-cover" />
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
