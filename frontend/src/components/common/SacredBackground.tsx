import React, { useMemo } from 'react';

/**
 * SacredBackground
 * Premium solid Chandan Silk (#F4ECE1) canvas with an authentic Vedic Puja sanctum vibe:
 * - Balanced Top-Right and Top-Left sacred blooming Lotus & Kolam watermarks
 * - Radiant antique temple-gold lines (#C29B38 / #B8860B) at the ideal 10.5% – 11.5% visibility
 * - Crisp 1.15px architectural strokes for clearly defined sacred lotus petals
 * - Rising sacred Havan & Diya golden embers drifting with serene meditative motion
 * - 100% Solid foundation (zero gradients), zero CSS grids
 */
export const SacredBackground: React.FC = () => {
  // Deterministic particle configurations for warm golden diya sparks / havan embers
  const particles = useMemo(() => {
    return [
      { id: 1, left: '4%', size: 3.5, duration: 18, delay: 0, opacity: 0.7 },
      { id: 2, left: '11%', size: 4.5, duration: 22, delay: 3, opacity: 0.8 },
      { id: 3, left: '19%', size: 3, duration: 16, delay: 1, opacity: 0.65 },
      { id: 4, left: '27%', size: 5, duration: 24, delay: 6, opacity: 0.85 },
      { id: 5, left: '36%', size: 3.5, duration: 19, delay: 4, opacity: 0.7 },
      { id: 6, left: '46%', size: 4.5, duration: 21, delay: 2, opacity: 0.8 },
      { id: 7, left: '54%', size: 3, duration: 17, delay: 7, opacity: 0.7 },
      { id: 8, left: '63%', size: 5.5, duration: 26, delay: 5, opacity: 0.9 },
      { id: 9, left: '72%', size: 3.5, duration: 18, delay: 8, opacity: 0.75 },
      { id: 10, left: '81%', size: 4.5, duration: 23, delay: 10, opacity: 0.85 },
      { id: 11, left: '89%', size: 3, duration: 15, delay: 12, opacity: 0.65 },
      { id: 12, left: '95%', size: 4, duration: 20, delay: 11, opacity: 0.75 },
      { id: 13, left: '15%', size: 3.5, duration: 21, delay: 9, opacity: 0.7 },
      { id: 14, left: '76%', size: 4, duration: 17, delay: 4, opacity: 0.8 },
    ];
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10 bg-[#F4ECE1]"
    >
      {/* 1. Top-Right Grand Blooming Sacred Lotus Mandala (Kamal Mandala - Clockwise Meditative Drift) */}
      <div className="absolute -top-24 -right-24 md:-top-32 md:-right-32 w-105 h-105 md:w-150 md:h-150 opacity-[0.115] text-[#C29B38] animate-spin-mandala-cw">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full stroke-current fill-none"
          strokeWidth="1.15"
        >
          {/* Central Bindu and Sacred Core */}
          <circle cx="200" cy="200" r="4.5" className="fill-current" />
          <circle cx="200" cy="200" r="14" strokeWidth="1" />
          <circle cx="200" cy="200" r="26" strokeDasharray="2 3" strokeWidth="1" />
          <circle cx="200" cy="200" r="38" strokeWidth="1" />

          {/* Layer 1: 8 Inner Blooming Lotus Petals */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={`lotus-inner-${i}`} transform={`rotate(${i * 45} 200 200)`}>
              <path
                d="M 200 150 C 212 168 210 186 200 200 C 190 186 188 168 200 150 Z"
                strokeWidth="1.1"
              />
              <circle cx="200" cy="145" r="2" className="fill-current" />
            </g>
          ))}

          {/* Layer 2: 8 Intermediate Lotus Petals (Offset) */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={`lotus-mid-${i}`} transform={`rotate(${i * 45 + 22.5} 200 200)`}>
              <path
                d="M 200 110 C 220 140 216 172 200 200 C 184 172 180 140 200 110 Z"
                strokeWidth="1.15"
              />
              <path
                d="M 200 200 Q 200 155 200 115"
                strokeWidth="0.75"
                strokeDasharray="2 3"
              />
            </g>
          ))}

          {/* Layer 3: 16 Outer Sacred Lotus Petals */}
          {Array.from({ length: 16 }).map((_, i) => (
            <g key={`lotus-outer-${i}`} transform={`rotate(${i * 22.5} 200 200)`}>
              <path
                d="M 200 62 C 224 105 220 152 200 196 C 180 152 176 105 200 62 Z"
                strokeWidth="1.15"
              />
              <circle cx="200" cy="55" r="2.5" className="fill-current" />
            </g>
          ))}

          {/* Outer Auspicious Scalloped Perimeter */}
          <circle cx="200" cy="200" r="168" strokeWidth="1" />
          <circle cx="200" cy="200" r="175" strokeDasharray="3 5" strokeWidth="1" />
          <circle cx="200" cy="200" r="184" strokeWidth="1.1" />

          {/* Scalloped Floral Aura Arches (Chandrakala) */}
          {Array.from({ length: 32 }).map((_, i) => (
            <path
              key={`scallop-top-${i}`}
              d="M 191 16 C 196 9 204 9 209 16"
              transform={`rotate(${i * 11.25} 200 200)`}
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      {/* 2. Top-Left Sacred Temple Kolam / Mangal Alpana (Counter-Clockwise Meditative Drift) */}
      <div className="absolute -top-20 -left-20 md:-top-28 md:-left-28 w-96 h-96 md:w-140 md:h-140 opacity-[0.11] text-[#C29B38] animate-spin-mandala-ccw">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full stroke-current fill-none"
          strokeWidth="1.1"
        >
          {/* Central Sacred Core */}
          <circle cx="200" cy="200" r="4" className="fill-current" />
          <circle cx="200" cy="200" r="18" strokeWidth="1" />
          <circle cx="200" cy="200" r="36" strokeDasharray="2 4" strokeWidth="1" />

          {/* 8-Fold Interlocking Sacred Kolam Curves */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={`kolam-loop-${i}`} transform={`rotate(${i * 45} 200 200)`}>
              <path
                d="M 200 130 C 230 115 238 158 200 200 C 162 158 170 115 200 130 Z"
                strokeWidth="1.1"
              />
              <circle cx="200" cy="122" r="2.5" className="fill-current" />
            </g>
          ))}

          {/* 8-Fold Radiating Paisley / Mango Motif Outlines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={`kolam-paisley-${i}`} transform={`rotate(${i * 45 + 22.5} 200 200)`}>
              <path
                d="M 200 75 C 232 112 226 158 200 200 C 174 158 168 112 200 75 Z"
                strokeWidth="1.15"
              />
              <path
                d="M 200 75 Q 214 54 200 42 Q 186 54 200 75"
                strokeWidth="0.9"
              />
            </g>
          ))}

          {/* Dainty Sacred Concentric Rings */}
          <circle cx="200" cy="200" r="162" strokeWidth="1" />
          <circle cx="200" cy="200" r="172" strokeDasharray="2 5" strokeWidth="1" />
          <circle cx="200" cy="200" r="182" strokeWidth="1.1" />

          {/* Kolam Edge Pearls */}
          {Array.from({ length: 24 }).map((_, i) => (
            <circle
              key={`kolam-pearl-${i}`}
              cx="200"
              cy="18"
              r="2.5"
              transform={`rotate(${i * 15} 200 200)`}
              className="fill-current"
            />
          ))}
        </svg>
      </div>

      {/* 3. Middle-Right Auspicious Solar Lotus Wheel */}
      <div className="hidden md:block absolute top-1/2 -right-28 md:-right-36 w-88 h-88 md:w-120 md:h-120 opacity-[0.095] text-[#C29B38] animate-spin-mandala-cw">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full stroke-current fill-none"
          strokeWidth="1.05"
        >
          <circle cx="200" cy="200" r="4.5" className="fill-current" />
          <circle cx="200" cy="200" r="28" strokeWidth="1" />
          <circle cx="200" cy="200" r="50" strokeDasharray="2 4" strokeWidth="1" />
          <circle cx="200" cy="200" r="160" strokeWidth="1" />
          <circle cx="200" cy="200" r="172" strokeDasharray="3 5" strokeWidth="1" />

          {/* 12-Petal Traditional Temple Lotus */}
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={`right-lotus-${i}`} transform={`rotate(${i * 30} 200 200)`}>
              <path
                d="M 200 68 C 224 110 218 156 200 200 C 182 156 176 110 200 68 Z"
                strokeWidth="1.1"
              />
              <circle cx="200" cy="60" r="2" className="fill-current" />
            </g>
          ))}
        </svg>
      </div>

      {/* 4. Bottom-Left Auspicious Mangal Kolam */}
      <div className="hidden lg:block absolute -bottom-28 -left-24 w-84 h-84 md:w-115 md:h-115 opacity-[0.095] text-[#C29B38] animate-spin-mandala-cw">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full stroke-current fill-none"
          strokeWidth="1.05"
        >
          <circle cx="200" cy="200" r="3.5" className="fill-current" />
          <circle cx="200" cy="200" r="25" strokeWidth="1" />
          <circle cx="200" cy="200" r="155" strokeWidth="1" />
          <circle cx="200" cy="200" r="166" strokeDasharray="3 5" strokeWidth="1" />
          <circle cx="200" cy="200" r="176" strokeWidth="1.1" />

          {/* 8-Fold Auspicious Petals */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={`bot-lotus-${i}`} transform={`rotate(${i * 45} 200 200)`}>
              <path
                d="M 200 72 C 226 115 220 160 200 200 C 180 160 174 115 200 72 Z"
                strokeWidth="1.1"
              />
              <path
                d="M 200 132 C 216 154 212 176 200 200 C 188 176 184 154 200 132 Z"
                strokeWidth="0.8"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* 5. Rising Golden Diya Sparks / Havan Kund Embers */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: p.left,
              bottom: '-20px',
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: '#F59E0B',
              boxShadow: '0 0 8px #F59E0B, 0 0 16px #D97706, 0 0 24px rgba(245, 158, 11, 0.3)',
              animation: `float-diya-sparkle ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
              opacity: p.opacity,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SacredBackground;

