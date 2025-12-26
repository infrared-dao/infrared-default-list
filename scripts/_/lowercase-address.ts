import { type Address, isAddress, isAddressEqual } from 'viem'

import { BERA_TOKEN_ADDRESS } from './constants'

export const lowercaseAddress = (address: Address) => {
  // Handle 32-byte pool IDs (e.g., PancakeSwap Infinity)
  if (!isAddress(address)) {
    return address.toLowerCase() as Address
  }
  if (isAddressEqual(address, BERA_TOKEN_ADDRESS)) {
    return BERA_TOKEN_ADDRESS
  }
  return address.toLowerCase() as Address
}
