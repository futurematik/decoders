import 'jest';
import { assertCond } from '../internal/assertCond';
import { ConditionFailure } from './predicate';
import { regexp } from './regexp';

describe('predicate', () => {
  it('accepts values if the regexp matches', () => {
    const decoder = regexp(/^test$/);

    const result = decoder('test');

    expect(result.ok).toBe(true);
    assertCond(result.ok);
    expect(result.value).toBe('test');
  });

  it('rejects values if the regexp does not match', () => {
    const decoder = regexp(/^nomatch$/);

    const result = decoder('test');

    expect(result.ok).toBe(false);
    assertCond(!result.ok);
    expect(result.error[0].id).toBe(ConditionFailure);
  });

  it('uses custom text and id if supplied', () => {
    const decoder = regexp(/^nomatch$/, 'text', 'FAIL');

    const result = decoder('test');

    expect(result.ok).toBe(false);
    assertCond(!result.ok);
    expect(result.error[0].id).toBe('FAIL');
    expect(result.error[0].text).toBe('text');
  });
});
