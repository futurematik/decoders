import 'jest';
import { assertCond } from '../internal/assertCond';
import { ExpectedNumber, number } from './number';

describe('date', () => {
  it('decodes an integer', () => {
    const result = number(42);
    expect(result.ok).toBe(true);
    assertCond(result.ok);
    expect(result.value).toEqual(42);
  });

  it('decodes a float', () => {
    const result = number(3.1415);
    expect(result.ok).toBe(true);
    assertCond(result.ok);
    expect(result.value).toEqual(3.1415);
  });

  it('rejects strings', () => {
    const result = number('42');
    expect(result.ok).toBe(false);
    assertCond(!result.ok);
    expect(result.error[0].id).toBe(ExpectedNumber);
  });

  it('rejects NaN', () => {
    const result = number(0 / 0);
    expect(result.ok).toBe(false);
    assertCond(!result.ok);
    expect(result.error[0].id).toBe(ExpectedNumber);
  });

  it('rejects +Infinity', () => {
    const result = number(Number.POSITIVE_INFINITY);
    expect(result.ok).toBe(false);
    assertCond(!result.ok);
    expect(result.error[0].id).toBe(ExpectedNumber);
  });

  it('rejects -Infinity', () => {
    const result = number(Number.NEGATIVE_INFINITY);
    expect(result.ok).toBe(false);
    assertCond(!result.ok);
    expect(result.error[0].id).toBe(ExpectedNumber);
  });
});
