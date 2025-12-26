import { custom, pipe, string, transform } from 'valibot'
import { isAddress, isHex, type Address, type Hex } from 'viem'

const isBytes32 = (val: string): boolean => isHex(val) && val.length === 66

export const AddressSchema = pipe(
  string(),
  custom(
    (val) =>
      isAddress(val as string, { strict: false }) || isBytes32(val as string),
    'Enter a valid Address or bytes32',
  ),
  transform((val) => val.toLowerCase() as Address | Hex),
)
