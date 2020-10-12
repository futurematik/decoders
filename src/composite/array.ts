import { Decoder } from '../core/Decoder';
import { error, invalid, ok, Result } from '../core/Result';

/**
 * Error identifier returned when [[array]] fails.
 */
export const ExpectedArray = 'EXPECTED_ARRAY';

/**
 * Create a [[Decoder]] which can decode an array, using the given [[Decoder]] 
 * to decode each element.
 * 
 * @param elem The [[Decoder]] to use to decode the elements.
 */
export function array<T>(elem: Decoder<T>): Decoder<T[]> {
  return (value: unknown): Result<T[]> =>
    Array.isArray(value)
      ? value
        .map(elem)
        .reduce(
          (a: Result<T[]>, x: Result<T>): Result<T[]> =>
            a.ok && x.ok
              ? ok([...a.value, x.value])
              : !a.ok && !x.ok
                ? error([...a.error, ...x.error])
                : a,
          ok<T[]>([]),
        )
      : invalid(ExpectedArray, 'expected array');
}
