const TAU = Math.PI * 2;

// A single half-twisted surface, woven from ink threads rather than diagram lines.
export function drawMobius(ctx, time, resolution = 600) {
  const tilt = 0.88 + Math.sin(time * 0.32) * 0.2;
  const turn = -0.55 + Math.sin(time * 0.23) * 0.22;
  const phase = time * 0.3;
  const point = (u, v) => {
    const width = 76 * (1 + 0.09 * Math.sin(u * 2 - time * 0.65));
    const twist = u / 2 + phase;
    const radius = 157 + v * width * Math.cos(twist);
    const x = radius * Math.cos(u);
    const y = radius * Math.sin(u);
    const z = v * width * Math.sin(twist);
    const yy = y * Math.cos(tilt) - z * Math.sin(tilt);
    const zz = y * Math.sin(tilt) + z * Math.cos(tilt);
    const perspective = 920 / (920 - zz);
    return {
      x: 300 + (x * Math.cos(turn) - yy * Math.sin(turn)) * perspective,
      y: 300 + (x * Math.sin(turn) + yy * Math.cos(turn)) * perspective,
      z: zz,
    };
  };
  const segments = 240;
  const threads = Math.round(Math.min(60, Math.max(28, resolution / 8)) / 2) * 2;
  const rows = Array.from({ length: segments + 1 }, (_, i) =>
    Array.from({ length: threads + 1 }, (_, j) => point(i / segments * TAU, j / threads * 2 - 1)));
  const strips = Array.from({ length: segments }, (_, i) => ({
    a: rows[i], b: rows[i + 1], depth: (rows[i][threads / 2].z + rows[i + 1][threads / 2].z) / 2,
  })).sort((a, b) => a.depth - b.depth);

  ctx.lineJoin = 'round';
  for (const { a, b, depth } of strips) {
    const shade = Math.round(239 - (depth + 180) / 360 * 9);
    ctx.fillStyle = `rgb(${shade},${shade},${shade - 7})`;
    ctx.beginPath();
    ctx.moveTo(a[0].x, a[0].y);
    for (const p of [a[threads], b[threads], b[0]]) ctx.lineTo(p.x, p.y);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    for (let j = 0; j <= threads; j++) {
      ctx.moveTo(a[j].x, a[j].y);
      ctx.lineTo(b[j].x, b[j].y);
    }
    ctx.strokeStyle = 'rgba(37,37,31,0.55)';
    ctx.lineWidth = 0.62;
    ctx.stroke();
  }
}
