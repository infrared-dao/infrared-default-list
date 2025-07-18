import type { DefaultListIVault } from '@/schemas/ivaults-schema'

import { lowercaseAddress } from './lowercase-address'

export const cleanIVault = ({
  iVault,
}: {
  iVault: DefaultListIVault
}): DefaultListIVault => ({
  ...iVault,
  beraRewardVault: iVault.beraRewardVault
    ? lowercaseAddress(iVault.beraRewardVault)
    : undefined,
  depositTokenAddress: lowercaseAddress(iVault.depositTokenAddress),
})
