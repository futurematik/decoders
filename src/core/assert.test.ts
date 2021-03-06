import 'jest';
import { assertCond } from '../internal/assertCond';
import { mockDecoder, mockFailDecoder } from '../internal/mockDecoder';
import { assert } from './assert';
import { DecodingAssertError } from './DecodingAssertError';

describe('assert', () => {
  it('calls the original decoder', () => {
    const value = Symbol();
    const decoder = mockDecoder(value);

    const input = Symbol();
    const result = assert(decoder, input);

    expect(result).toBe(value);
    expect(decoder).toHaveBeenCalledTimes(1);
    expect(decoder.mock.calls[0][0]).toBe(input);
  });

  it('it throws DecodingAssertError on failure', () => {
    const decoder = mockFailDecoder(1);
    const input = Symbol();

    let thrownError: unknown;
    try {
      assert(decoder, input);
    } catch (err) {
      thrownError = err;
    }

    expect(thrownError).toBeInstanceOf(DecodingAssertError);
    assertCond(thrownError instanceof DecodingAssertError);
    expect(thrownError.errors).toEqual([
      { id: 'FAIL1', text: 'text1', field: 'field1' },
    ]);
  });
});
