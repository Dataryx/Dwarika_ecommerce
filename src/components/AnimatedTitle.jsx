import React from 'react';

export default function AnimatedTitle({ className = '' }) {
  const text = 'Dwarika Collection';
  const words = text.split(' ');

  return (
    <div className={`w-full py-8 ${className}`}>
      <h2 className="animated-title mx-auto text-center font-extrabold tracking-tight">
        {words.map((w, wi) => (
          <span key={wi} className="word inline-flex mx-2">
            {w.split('').map((ch, i) => (
              <span
                key={i}
                className="char inline-block"
                style={{ animationDelay: `${i * 0.06 + wi * 0.35}s` }}
              >
                {ch}
              </span>
            ))}
          </span>
        ))}
      </h2>

      <style>{`
        .animated-title { font-size: clamp(2rem, 6vw, 3.6rem); line-height: 1; }
        .animated-title { background: linear-gradient(90deg, #b78300 0%, #ffd166 45%, #f0c24a 70%); -webkit-background-clip: text; background-clip: text; color: transparent; filter: drop-shadow(0 6px 12px rgba(183,131,0,0.08)); }
        .word { display: inline-flex; gap: 0.06em; }
        .char { display: inline-block; transform: translateY(18px) rotateX(8deg); opacity: 0; will-change: transform, opacity; animation: reveal 520ms cubic-bezier(.2,.9,.25,1) forwards; }
        @keyframes reveal { to { transform: translateY(0) rotateX(0); opacity: 1; } }

        /* subtle shimmer */
        .animated-title::after {
          content: '';
          position: absolute;
          left: 0; right: 0; top: 0; bottom: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 45%, transparent 75%);
          mix-blend-mode: screen;
          transform: translateX(-120%);
          animation: shimmer 3.6s linear infinite;
          pointer-events: none;
        }
        @keyframes shimmer { 0% { transform: translateX(-120%); } 100% { transform: translateX(120%); } }

        /* small responsive tweaks */
        @media (min-width: 768px) { .animated-title { font-size: 4rem; } }
      `}</style>
    </div>
  );
}
