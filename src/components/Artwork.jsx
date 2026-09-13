import React, { useEffect, useRef } from 'react';
import { drawArtwork } from '../art/drawings';

export function Artwork({ kind = 'aesthetics', label, animated = false, paused = false }) {
  const ref = useRef(null);
  const time = useRef(0);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let visible = false;
    let last = 0;
    const draw = () => drawArtwork(ctx, kind, time.current, canvas.width, canvas.height);
    const animate = now => {
      if (!last) last = now;
      if (now - last >= 1000 / 30) {
        time.current += Math.min((now - last) / 1000, 0.1);
        last = now;
        draw();
      }
      frame = requestAnimationFrame(animate);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      last = 0;
      if (animated && !paused && visible && !document.hidden) frame = requestAnimationFrame(animate);
      else draw();
    };
    const resize = new ResizeObserver(() => {
      const size = Math.max(1, Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2)));
      canvas.width = size;
      canvas.height = size;
      draw();
    });
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    resize.observe(canvas);
    visibility.observe(canvas);
    document.addEventListener('visibilitychange', sync);
    draw();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      visibility.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [kind, animated, paused]);
  return <div className="artwork-frame">
    <canvas ref={ref} className="artwork" data-artwork={kind} role="img" aria-label={label} width="600" height="600" />
  </div>;
}
