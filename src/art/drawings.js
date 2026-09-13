import { drawMobius } from './mobius.js';

// Original parametric drawings. Coordinates are independent of display resolution.
const TAU = Math.PI * 2;
const stroke = (ctx, points, opacity = 0.48, width = 0.7) => {
  ctx.beginPath();
  points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
  ctx.strokeStyle = `rgba(37, 37, 31, ${opacity})`;
  ctx.lineWidth = width;
  ctx.stroke();
};
const sample = (count, fn) => Array.from({ length: count + 1 }, (_, i) => fn(i / count));
const project = (x, y, z, angle = -0.48) => {
  const a = x * Math.cos(angle) - z * Math.sin(angle);
  const b = x * Math.sin(angle) + z * Math.cos(angle);
  return [300 + a, 300 + y * 0.8 - b * 0.44];
};

const drawings = {
  mobius: drawMobius,
  aesthetics: drawMobius,
  narrative(ctx, t) {
    for (let i = 0; i < 66; i++) {
      stroke(ctx, sample(140, p => {
        const x = 70 + p * 460;
        const spread = (i - 32.5) * 3;
        return [x, 300 + Math.sin(p * TAU - 0.8 + t * 0.8) * 95 + spread * (0.6 + 0.65 * Math.sin(p * Math.PI + t * 0.35) ** 2)];
      }), 0.48, 0.72);
    }
  },
  simplicity(ctx, t) {
    for (let i = 0; i < 58; i++) {
      stroke(ctx, sample(140, p => {
        const fade = (1 - p) ** 2;
        return [75 + p * 450, 130 + i * 5.8 + fade * (Math.sin(p * 22 + i * 0.19 + t * 1.1) * 70 + Math.cos(p * 12 - i * 0.2 - t * 0.6) * 30)];
      }), 0.48, 0.75);
    }
  },
  intent(ctx, t) {
    for (let plane = 0; plane < 2; plane++) {
      for (let i = 0; i <= 26; i++) {
        for (let face = 0; face < 3; face++) {
          stroke(ctx, sample(40, p => {
            const a = (i / 26 - 0.5) * 255;
            const b = (p - 0.5) * 255;
            const c = 127.5;
            const xyz = face === 0 ? [a, b, c] : face === 1 ? [c, a, b] : [b, -c, a];
            if (plane) [xyz[0], xyz[2]] = [xyz[2], xyz[0]];
            return project(...xyz, -0.55 + t * 0.38);
          }), 0.36, 0.65);
        }
      }
    }
  },
  expressiveness(ctx, t) {
    for (let side = -1; side <= 1; side += 2) {
      for (let r = 8; r < 180; r += 3.7) {
        stroke(ctx, sample(160, p => {
          const a = p * TAU;
          return [300 + side * (61 + Math.sin(t * 0.85) * 35) + r * Math.cos(a), 300 + side * Math.sin(t * 0.6) * 22 + r * Math.sin(a)];
        }), 0.55, 0.65);
      }
    }
  },
  purity(ctx, t) {
    for (let i = 0; i < 62; i++) {
      const r = 25 + i * 3;
      stroke(ctx, sample(180, p => {
        const a = p * TAU;
        const wave = Math.sin(a * 3 + t * 1.1 + i * 0.13) * 12 + Math.sin(t * 0.8 - i * 0.18) * 6;
        return [300 + (r + wave) * Math.cos(a), 300 + (r + wave) * Math.sin(a)];
      }), 0.52, 0.7);
    }
  },
  failure(ctx, t) {
    for (let i = 0; i < 64; i++) {
      const y = 105 + i * 6.1;
      stroke(ctx, sample(160, p => {
        const x = 70 + p * 460;
        const distance = Math.exp(-(((x - 300 - Math.sin(t * 0.8) * 36) / 75) ** 2));
        const side = i < 32 ? -1 : 1;
        return [x, y + side * distance * (95 - Math.abs(i - 31.5) * 2.7) * (1 + Math.sin(t * 1.1) * 0.3)];
      }), 0.5, 0.75);
    }
  },
  sustainability(ctx, t) {
    for (let i = 1; i < 1800; i++) {
      const a = i * 2.3999632297 + t * 0.24;
      const baseRadius = Math.sqrt(i / 1800) * 214;
      const r = baseRadius * (1 + 0.08 * Math.sin(t * 1.2 - baseRadius * 0.035));
      const x = 300 + Math.cos(a) * r;
      const y = 300 + Math.sin(a) * r;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(a);
      ctx.beginPath();
      ctx.ellipse(0, 0, 1.1 + r / 90, 0.55 + r / 220, 0, 0, TAU);
      ctx.strokeStyle = 'rgba(37,37,31,0.65)';
      ctx.lineWidth = 0.7;
      ctx.stroke();
      ctx.restore();
    }
  },
  durability(ctx, t) {
    for (let i = 0; i < 65; i++) {
      stroke(ctx, sample(130, p => {
        const peak = Math.exp(-(((p - 0.53 - Math.sin(t * 0.65) * 0.07) / 0.24) ** 2));
        const texture = Math.sin(p * 29 + i * 0.11 + t * 1.2) * 12;
        return [75 + p * 450, 250 + i * 3.2 - peak * (130 - i * 1.4 + Math.sin(t * 0.9) * 22) + texture];
      }), 0.55, 0.75);
    }
  },
  creativity(ctx, t) {
    for (let i = 0; i < 72; i++) {
      stroke(ctx, sample(200, p => {
        const a = p * TAU;
        const r = 70 + i * 1.7 + (24 + i * 0.3) * Math.sin(a * 5 + t * 1.1 + i * 0.014);
        return [300 + r * Math.cos(a), 300 + r * Math.sin(a)];
      }), 0.34, 0.7);
    }
  },
};

export function drawArtwork(ctx, kind, time, width, height) {
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.scale(width / 600, height / 600);
  (drawings[kind] || drawings.aesthetics)(ctx, time, width);
  ctx.restore();
}
