interface LogoMarkProps {
  size?: number;
  inverted?: boolean; // true = white shield on dark backgrounds
}

export function LogoMark({ size = 32, inverted = false }: LogoMarkProps) {
  const shield = inverted ? "#ffffff" : "#0a0a0a";
  const letter = inverted ? "#0a0a0a" : "#ffffff";
  const height = Math.round(size * (130 / 120));

  return (
    <svg width={size} height={height} viewBox="0 0 120 130" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 8 L110 28 L110 72 Q110 110 60 122 Q10 110 10 72 L10 28 Z" fill={shield} />
      <polygon points="52,24 68,24 36,94 20,94" fill={letter} />
      <polygon points="52,24 68,24 100,94 84,94" fill={letter} />
      <rect x="36" y="58" width="48" height="12" fill={letter} />
    </svg>
  );
}

interface LogoProps {
  size?: number;
  inverted?: boolean;
}

export function Logo({ size = 28, inverted = false }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark size={size} inverted={inverted} />
      <span
        className={`font-black tracking-tight leading-none ${inverted ? "text-white" : "text-black"}`}
        style={{ fontSize: size * 0.6 }}
      >
        AuthPlug
      </span>
    </span>
  );
}
