import { Decoder } from '../core/Decoder';
import { DecoderError, error, Result } from '../core/Result';

/**
 * Get the composite type of an array of decoders.
 *
 * @example
 *
 * ```typescript
 * type A = CombinedTypeOf<[Decoder<number>, Decoder<string>]>;
 *
 * // equivalent to
 * type B = Decoder<number|string>;
 * ```
 */
export type CombinedTypeOf<T> = T extends Decoder<infer X, infer Y>[]
  ? Decoder<X, Y>
  : never;

/**
 * Create a decoder which can succesfully decode an input value using one of the
 * supplie decoders. The decoders are invoked in the given order until one is
 * successful. If none are successful, the errors from all decoders are
 * concatenated and returned.
 *
 * @param options The possible decoders to try.
 *
 * @example
 * ```typescript
 * const choice = choose(number, string); // is a Decoder<number|string>;
 *
 * const result1 = choice(1); // = { ok: true, value: 1 }
 * const result2 = choice('hello'); // = { ok: true, value: 'hello' }
 *
 * // the `error` field will contain the errors of all decoders
 * const result3 = choice(false); // = { ok: false, error: [ ... ] }
 * ```
 *
 * @category Composite
 */
export function choose<T extends Decoder<unknown>[]>(
  ...options: T
): CombinedTypeOf<T> {
  if (options.length === 0) {
    throw new Error(`choose must have at least one option`);
  }
  const combined = (value: unknown): Result<unknown> => {
    const errors: DecoderError[] = [];

    for (const decoder of options) {
      const result = decoder(value);
      if (result.ok) {
        return result;
      }
      errors.push(...result.error);
    }

    return error(errors);
  };
  return combined as CombinedTypeOf<T>;
}
