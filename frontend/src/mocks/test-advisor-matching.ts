import { matchPuja } from '../lib/advisorMatching';
import { AdvisorQuery } from '../types/advisor';
import { resetMockDb } from './data';

function runAdvisorTests() {
  console.log('\n--- STARTING ADVISOR MATCHING ENGINE SRS §6 SCENARIO TESTS ---\n');
  resetMockDb();

  let passed = 0;
  let total = 0;

  function assert(condition: boolean, message: string) {
    total += 1;
    if (!condition) {
      console.error(`  ❌ FAILED: ${message}`);
      throw new Error(`Advisor test failure: ${message}`);
    }
    console.log(`  ✓ ${message}`);
    passed += 1;
  }

  // Scenario 1: "I just bought a new flat" -> Griha Pravesh-type match
  const q1: AdvisorQuery = {
    id: 'test-q1',
    rawInput: 'I just bought a new flat',
    matchedEntryIds: [],
    scores: [],
    timestamp: new Date().toISOString(),
  };
  const res1 = matchPuja(q1);
  assert(res1.matches !== undefined && res1.matches.length > 0, 'Scenario 1 returns matches');
  assert(
    res1.matches![0].entry.category === 'life-event' &&
      res1.matches![0].entry.name.toLowerCase().includes('griha pravesh'),
    'Scenario 1 top match is Griha Pravesh life-event puja'
  );

  // Scenario 2: "My exams are coming up and I'm anxious" -> Saraswati / success-oriented puja
  const q2: AdvisorQuery = {
    id: 'test-q2',
    rawInput: "My exams are coming up and I'm anxious",
    matchedEntryIds: [],
    scores: [],
    timestamp: new Date().toISOString(),
  };
  const res2 = matchPuja(q2);
  assert(res2.matches !== undefined && res2.matches.length > 0, 'Scenario 2 returns matches');
  assert(
    res2.matches![0].entry.category === 'life-event' &&
      res2.matches![0].entry.name.toLowerCase().includes('saraswati'),
    'Scenario 2 top match is Saraswati academic life-event puja'
  );

  // Scenario 3: "Recurring bad luck, nothing is working out" -> Dosha-nivaran category
  const q3: AdvisorQuery = {
    id: 'test-q3',
    rawInput: 'Recurring bad luck, nothing is working out',
    matchedEntryIds: [],
    scores: [],
    timestamp: new Date().toISOString(),
  };
  const res3 = matchPuja(q3);
  assert(res3.matches !== undefined && res3.matches.length > 0, 'Scenario 3 returns matches');
  assert(
    res3.matches![0].entry.category === 'dosha-nivaran',
    'Scenario 3 top match is in dosha-nivaran category'
  );

  // Scenario 4: "Starting a new business next month" -> Business/prosperity puja
  const q4: AdvisorQuery = {
    id: 'test-q4',
    rawInput: 'Starting a new business next month',
    matchedEntryIds: [],
    scores: [],
    timestamp: new Date().toISOString(),
  };
  const res4 = matchPuja(q4);
  assert(res4.matches !== undefined && res4.matches.length > 0, 'Scenario 4 returns matches');
  assert(
    res4.matches![0].entry.category === 'business',
    'Scenario 4 top match is in business category'
  );

  // Scenario 5: "It's my father's death anniversary" -> Shraddha/ancestral rites
  const q5: AdvisorQuery = {
    id: 'test-q5',
    rawInput: "It's my father's death anniversary",
    matchedEntryIds: [],
    scores: [],
    timestamp: new Date().toISOString(),
  };
  const res5 = matchPuja(q5);
  assert(res5.matches !== undefined && res5.matches.length > 0, 'Scenario 5 returns matches');
  assert(
    res5.matches![0].entry.category === 'ancestral',
    'Scenario 5 top match is in ancestral category'
  );

  // Scenario 6: "Planning my daughter's wedding" -> Marriage-related puja
  const q6: AdvisorQuery = {
    id: 'test-q6',
    rawInput: "Planning my daughter's wedding",
    matchedEntryIds: [],
    scores: [],
    timestamp: new Date().toISOString(),
  };
  const res6 = matchPuja(q6);
  assert(res6.matches !== undefined && res6.matches.length > 0, 'Scenario 6 returns matches');
  assert(
    res6.matches![0].entry.name.toLowerCase().includes('vivah') ||
      res6.matches![0].entry.intentTags.includes('wedding'),
    'Scenario 6 top match is marriage/vivah related puja'
  );

  // Scenario 7: Vague input ("I don't know, just bless my family") -> graceful fallback suggestion
  const q7: AdvisorQuery = {
    id: 'test-q7',
    rawInput: "I don't know, just bless my family",
    matchedEntryIds: [],
    scores: [],
    timestamp: new Date().toISOString(),
  };
  const res7 = matchPuja(q7);
  assert(res7.matches !== undefined && res7.matches.length > 0, 'Scenario 7 returns matches');
  assert(
    res7.scores[0] < 0.35 && res7.reasons![0].toLowerCase().includes('general'),
    'Scenario 7 provides graceful fallback suggestion with descriptive reason'
  );

  // Scenario 8: Conflicting/multi-intent input -> top-3 ranked list showing genuine score separation
  const q8: AdvisorQuery = {
    id: 'test-q8',
    rawInput: 'Starting a new business retail shop in a new flat but also facing bad luck and debts',
    matchedEntryIds: [],
    scores: [],
    timestamp: new Date().toISOString(),
  };
  const res8 = matchPuja(q8);
  assert(res8.matches !== undefined && res8.matches.length === 3, 'Scenario 8 returns 3 ranked matches');
  assert(
    res8.scores[0] > res8.scores[1] && res8.scores[1] > res8.scores[2],
    'Scenario 8 demonstrates genuine score separation across top 3 without ties'
  );

  console.log(`\n🎉 ALL ${passed}/${total} ADVISOR MATCHING ENGINE TESTS PASSED!\n`);
}

runAdvisorTests();
