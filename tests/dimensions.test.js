import test from 'node:test';
import assert from 'node:assert/strict';
import { DIMENSIONS, UI_COPY } from '../src/content.js';

test('the guide covers the source chapter’s eight dimensions in order', () => {
  assert.deepEqual(DIMENSIONS.map(d => d.id), ['storytelling', 'simplicity', 'intent', 'expressiveness', 'purity', 'sustainability', 'durability', 'creativity']);
});

for (const locale of ['zh', 'en', 'ja']) {
  test(`${locale}: all eight dimensions have a definition and an editorial example`, () => {
    assert.equal(UI_COPY[locale].dimensionNames.length, 8);
    for (const d of DIMENSIONS) {
      assert.ok(d.description?.[locale]?.length > 15, `${d.id} definition`);
      assert.ok(d.example?.[locale]?.length > 10, `${d.id} example`);
    }
    for (const key of ['dimensionIntro', 'dimensionExample', 'dimensionSource']) {
      assert.ok(UI_COPY[locale][key]?.length > 0, key);
    }
  });
}
