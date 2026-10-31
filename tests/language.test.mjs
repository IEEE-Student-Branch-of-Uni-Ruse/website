import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveLanguage, getBrowserLanguage } from '../src/utils/language.ts';

test('resolves browser languages in preference order, including regional variants', () => {
  assert.equal(resolveLanguage(['de-DE', 'bg-BG', 'en-US'], ['en', 'bg'], 'en'), 'bg');
  assert.equal(resolveLanguage(['EN-us'], ['en', 'bg'], 'bg'), 'en');
  assert.equal(resolveLanguage(['pt-BR'], ['pt', 'pt-BR'], 'en'), 'pt-BR');
});
test('falls back when no supported language matches', () => {
  assert.equal(resolveLanguage(['fr-FR'], ['en', 'bg'], 'en'), 'en');
  assert.equal(resolveLanguage([], ['en'], 'en'), 'en');
  assert.equal(getBrowserLanguage(['en'], 'en'), 'en');
});
