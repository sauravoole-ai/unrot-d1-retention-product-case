import test from 'node:test';
import assert from 'node:assert/strict';

import {
  decodeProof,
  promptStrength,
  restorePrototypeState,
  scoreQuiz,
  sharePayload
} from '../unrot-v4-clean-deploy/core.mjs';

const defaults = {
  step: 'lesson',
  track: 'guided',
  builder: {
    name: 'Job Search Assistant',
    role: 'You are a career assistant.',
    context: 'I am looking for an internship.',
    task: 'Suggest one next step.'
  }
};

test('restorePrototypeState preserves required builder fields from defaults', () => {
  const restored = restorePrototypeState({
    step: 'configure',
    track: 'challenge',
    builder: { name: 'My AI Assistant' }
  }, defaults);

  assert.deepEqual(restored, {
    step: 'configure',
    track: 'challenge',
    builder: {
      name: 'My AI Assistant',
      role: 'You are a career assistant.',
      context: 'I am looking for an internship.',
      task: 'Suggest one next step.'
    }
  });
});

test('restorePrototypeState falls back when stored data is not an object', () => {
  const restored = restorePrototypeState('outdated saved state', defaults);

  assert.deepEqual(restored, defaults);
  assert.notEqual(restored, defaults);
  assert.notEqual(restored.builder, defaults.builder);
});

test('scoreQuiz accepts browser form values and assigns the highest builder tier', () => {
  const result = scoreQuiz('beginner', { q0: '1', q1: '1', q2: '0', q3: '0', q4: '1' });

  assert.deepEqual(result, {
    score: 5,
    total: 5,
    tier: { level: 3, label: 'Independent Builder', mode: 'Advanced challenge' }
  });
});

test('promptStrength rewards complete, specific builder inputs', () => {
  const result = promptStrength({
    role: 'r'.repeat(90),
    context: 'c'.repeat(90),
    task: 't'.repeat(90)
  });

  assert.deepEqual(result, { percent: 100, label: 'Strong structure' });
});

test('decodeProof rejects malformed proof tokens', () => {
  assert.equal(decodeProof('not-a-valid-proof'), null);
});

test('sharePayload keeps proof links anchored to the clean prototype URL', () => {
  const payload = sharePayload({
    id: 'UNROT-AIB-000001',
    title: 'AI Builder · Level 1',
    build: 'Study Assistant'
  }, 'https://example.test/prototype#old-proof');

  assert.match(payload.url, /^https:\/\/example\.test\/prototype#proof=/);
  assert.match(payload.text, /Study Assistant/);
});
