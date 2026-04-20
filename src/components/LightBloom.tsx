type Props = {
  className?: string;
  intensity?: number;
  hue?: 'indigo' | 'ember' | 'prism' | 'mix';
};

export function LightBloom({ className = '', intensity = 0.55, hue = 'mix' }: Props) {
  const a =
    hue === 'indigo'
      ? '#2B2A63'
      : hue === 'ember'
      ? '#D97A4A'
      : hue === 'prism'
      ? '#3FB8B0'
      : '#2B2A63';
  const b = hue === 'mix' ? '#D97A4A' : a;

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute rounded-full"
        style={{
          width: 520,
          height: 520,
          top: '-10%',
          left: '20%',
          filter: 'blur(80px)',
          opacity: intensity,
          background: `radial-gradient(circle, ${a} 0%, transparent 70%)`,
          animation: 'drift1 22s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 460,
          height: 460,
          bottom: '-15%',
          right: '10%',
          filter: 'blur(80px)',
          opacity: intensity,
          background: `radial-gradient(circle, ${b} 0%, transparent 70%)`,
          animation: 'drift2 28s ease-in-out infinite alternate',
        }}
      />
    </div>
  );
}
