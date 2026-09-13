import test from 'node:test';
import assert from 'node:assert/strict';
import * as content from '../src/content.js';

test('first-time and invalid language preferences default to English', () => {
  assert.equal(typeof content.resolveLocale, 'function');
  for (const value of [undefined, null, '', 'fr', {}, 123]) {
    assert.equal(content.resolveLocale(value), 'en');
  }
});

test('valid saved language preferences are respected', () => {
  assert.equal(typeof content.resolveLocale, 'function');
  for (const locale of ['zh', 'en', 'ja']) {
    assert.equal(content.resolveLocale(locale), locale);
  }
});
