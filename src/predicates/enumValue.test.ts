import 'jest';
import { assertCond } from '../internal/assertCond';
import { enumValue } from './enumValue';

enum TestStringEnum {
  One = 'one',
  Two = 'two',
  Three = 'three',
}

enum TestIntEnum {
  One = 1,
  Two,
  Three,
}

describe('enumValue', () => {
  it('decodes a string enum', () => {
    const decoder = enumValue(TestStringEnum);
    const result = decoder('three');
    expect(result.ok).toBe(true);
    assertCond(result.ok);
    expect(result.value).toEqual(TestStringEnum.Three);
  });

  it('decodes an integer enum', () => {
    const decoder = enumValue(TestIntEnum);
    const result = decoder(2);
    expect(result.ok).toBe(true);
    assertCond(result.ok);
    expect(result.value).toEqual(TestIntEnum.Two);
  });
});
