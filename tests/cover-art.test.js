import test from 'node:test';
import assert from 'node:assert/strict';
import { isDeepStrictEqual } from 'node:util';
import { drawArtwork } from '../src/art/drawings.js';

function record(kind, time, resolution = 600) {
  const commands = [];
  const ctx = new Proxy({}, {
    get: (_, method) => (...args) => commands.push([method, ...args]),
    set: () => true,
  });
  drawArtwork(ctx, kind, time, resolution, resolution);
  return commands;
}

test('chapter one shares the approved abstract cover artwork', () => {
  assert.ok(isDeepStrictEqual(record('mobius', 0), record('aesthetics', 0)), 'Chapter one must also use the ribbon');
});

test('the ribbon remains visually distinct from the other nine chapters', () => {
  const cover = record('mobius', 0);
  for (const kind of ['narrative', 'simplicity', 'intent', 'expressiveness', 'purity', 'failure', 'sustainability', 'durability', 'creativity']) {
    assert.ok(!isDeepStrictEqual(cover, record(kind, 0)), kind);
  }
});

test('cover geometry remains finite, within its canvas and text-free', () => {
  for (const time of [0, 1, 12, 60]) {
    const commands = record('mobius', time);
    const points = commands.filter(([method]) => ['moveTo', 'lineTo'].includes(method));
    assert.ok(points.length > 1000);
    for (const [, x, y] of points) {
      assert.ok(Number.isFinite(x) && Number.isFinite(y));
      assert.ok(x > 15 && x < 585 && y > 15 && y < 585);
    }
    assert.ok(!commands.some(([method]) => /Text/.test(method)));
  }
});

test('ribbon moves over time and replays deterministically when paused', () => {
  assert.deepEqual(record('mobius', 1), record('mobius', 1));
  assert.notDeepEqual(record('mobius', 0), record('mobius', 1));
});

test('small canvases use fewer threads to avoid dense visual noise', () => {
  assert.ok(record('mobius', 0, 280).length < record('mobius', 0, 600).length);
});
