import { Decoder } from '../core/Decoder';
import { invalid, ok } from '../core/Result';

/**
 * The error identifier returned by [[is]] on failure.
 */
export const ExpectedSpecificValue = 'EXPECTED_SPECIFIC_VALUE';

/**
 * Creates a predicate which allows only the given value(s).
 *
 * @param options The values allowed.
 */
export function is<T>(...options: T[]): Decoder<T> {
  return (value) =>
    options.includes(value as T)
      ? ok(value as T)
      : invalid(ExpectedSpecificValue, 'expected specific value');
}
