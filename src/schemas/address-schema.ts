import { custom, pipe, string, transform } from 'valibot'
import { isAddress, type Address } from 'viem'

export const AddressSchema = pipe(
  string(),
  custom(
    (val) => isAddress(val as string, { strict: false }),
    'Enter a valid Address',
  ),
  transform((val) => val.toLowerCase() as Address),
)
