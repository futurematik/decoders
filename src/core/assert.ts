import { Decoder } from './Decoder';
import { DecodingAssertError } from './DecodingAssertError';

/**
 * Successfully decode the value or throw a [[DecoderError]].
 *
 * @param decoder The decoder to use.
 * @param value The value to decode.
 */
export function assert<Out, In>(decoder: Decoder<Out, In>, value: In): Out {
  const result = decoder(value);
  if (!result.ok) {
    throw new DecodingAssertError(result.error);
  }
  return result.value;
}
