import assert from 'node:assert/strict';
import test from 'node:test';
import { validateReview } from './validation.ts';

const now = 2_000_000;
const valid = {
  name: '  Jane   Doe  ',
  role: 'Founder',
  rating: 5,
  text: 'A thoughtful and useful collaboration.',
  website: '',
  startedAt: now - 5000
};

test('normalizes and accepts valid reviews', () => {
  const result = validateReview(valid, now);
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.review.name, 'Jane Doe');
});

test('silently catches honeypot submissions', () => {
  const result = validateReview({ ...valid, website: 'spam.example' }, now);
  assert.deepEqual(result, { ok: false, error: 'Accepted.', silent: true });
});

test('rejects instant, short, and link-heavy reviews', () => {
  assert.equal(validateReview({ ...valid, startedAt: now - 500 }, now).ok, false);
  assert.equal(validateReview({ ...valid, text: 'Too short' }, now).ok, false);
  assert.equal(validateReview({ ...valid, text: 'See https://a.test and https://b.test now.' }, now).ok, false);
});

