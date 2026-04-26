import { memo } from 'react';

// ─── Star data generated once at module load — never recomputed ───────────────
// Moved out of the component entirely (previously inside useMemo) so React
// never even touches this on re-renders; the array is truly static.
const STARS = Array.from({ length: 200 }, (_, i) => ({
  id:           i,
  left:         Math.random() * 100,
  size:         Math.random() * 2 + 0.5,
  twinkleDur:   (Math.random() * 3 + 2).toFixed(1),
  twinkleDelay: (Math.random() * 5).toFixed(1),
  driftDur:     (Math.random() * 35 + 20).toFixed(1),
  driftDelay:   -(Math.random() * 35).toFixed(1),
  bright:       Math.random() > 0.85,
}));

export const StarField = memo(function StarField() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Deep space gradient */}
    


      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,70,85,.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,70,85,.028) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Stars */}
      {STARS.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.left}%`,
            top: 0,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: '50%',
            background: s.bright ? '#ffffff' : '#a8c8f0',
            boxShadow: s.bright ? `0 0 ${s.size * 3}px rgba(200,220,255,.8)` : 'none',
            animation: `drift ${s.driftDur}s linear ${s.driftDelay}s infinite, twinkle ${s.twinkleDur}s ease-in-out ${s.twinkleDelay}s infinite`,
          }}
        />
      ))}

      {/* Scanline overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,.055) 3px, rgba(0,0,0,.055) 4px)',
      }} />
    </div>
  );
});
