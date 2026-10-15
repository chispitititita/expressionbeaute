import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'symbol' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
  lightText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'horizontal',
  size = 'md',
  lightText = false,
}) => {
  // Height configurations
  const heightMap = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
  };

  const textColor = lightText ? '#FFFFFF' : '#320F22';
  const subtitleColor = lightText ? '#FFD9DF' : '#524347';

  // 16 Petals calculation for SVG daisy
  const numPetals = 16;
  const radius = 38;
  const cx = 50;
  const cy = 50;
  const petals = Array.from({ length: numPetals }, (_, i) => {
    const angle = (i * 360) / numPetals;
    return angle;
  });

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Flower Emblem SVG */}
      <svg
        viewBox="0 0 100 100"
        className={`${heightMap[size]} w-auto aspect-square flex-shrink-0 drop-shadow-xs`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer Circular Medallion */}
        <circle cx={cx} cy={cy} r={radius + 8} fill="#D98A80" stroke="#320F22" strokeWidth="2.5" />
        <circle cx={cx} cy={cy} r={radius + 5.5} fill="#E2948C" />

        {/* 16 Daisy Petals */}
        <g stroke="#320F22" strokeWidth="1.8" strokeLinejoin="round">
          {petals.map((angle) => (
            <ellipse
              key={angle}
              cx={cx}
              cy={cy - 22}
              rx="6.5"
              ry="16"
              fill="#FFF0F4"
              transform={`rotate(${angle} ${cx} ${cy})`}
            />
          ))}
        </g>

        {/* Inner Golden Core */}
        <circle
          cx={cx}
          cy={cy}
          r="13.5"
          fill="#DF9732"
          stroke="#320F22"
          strokeWidth="2.2"
        />
        {/* Inner Core Highlight Gradient/Shine */}
        <circle cx={cx - 3.5} cy={cy - 4} r="3" fill="#FFFFFF" fillOpacity="0.85" />
        <circle cx={cx + 3} cy={cy + 3} r="1.5" fill="#C57E22" />
      </svg>

      {/* Typography Lockup */}
      {variant !== 'symbol' && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className="font-display font-extrabold tracking-[0.14em] text-sm sm:text-base uppercase"
            style={{ color: textColor }}
          >
            Expression
          </span>
          <span
            className="font-body font-semibold tracking-[0.24em] text-[9px] sm:text-[10px] uppercase mt-1 flex items-center gap-1.5"
            style={{ color: subtitleColor }}
          >
            <span>Beauté</span>
            <span className="w-1 h-1 rounded-full bg-[#954832] inline-block" />
            <span>2026</span>
          </span>
        </div>
      )}
    </div>
  );
};
