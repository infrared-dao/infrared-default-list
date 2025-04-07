import type { ProtocolsSchema } from '@/types/protocols'
import type { TokensSchema } from '@/types/tokens'
import type { ValidatorsSchema } from '@/types/validators'
import type { VaultsSchema } from '@/types/vaults'

export const checkForDuplicates = (
  list: VaultsSchema | ProtocolsSchema | TokensSchema | ValidatorsSchema,
  type: string,
  errors: Array<string>,
) => {
  if ('vaults' in list) {
    const beraRewardsVaults = new Set<string>()
    const vaultsList = list as VaultsSchema
    vaultsList.vaults.forEach((item) => {
      const lowerCasedBeraRewardsVaults = item.beraRewardsVault.toLowerCase()
      if (beraRewardsVaults.has(lowerCasedBeraRewardsVaults)) {
        errors.push(
          `Error in ${type}: Duplicate beraRewardsVault found: ${item.beraRewardsVault}`,
        )
      }
      beraRewardsVaults.add(lowerCasedBeraRewardsVaults)
    })
  } else if ('protocols' in list) {
    const ids = new Set<string>()
    const protocolsList = list as ProtocolsSchema
    protocolsList.protocols.forEach((item) => {
      if (ids.has(item.id)) {
        errors.push(`Error in ${type}: Duplicate protocol ID found: ${item.id}`)
      }
      ids.add(item.id)
    })
  } else if ('tokens' in list) {
    const addresses = new Set<string>()
    const tokensList = list as TokensSchema
    tokensList.tokens.forEach((item) => {
      const lowercasedAddress = item.address.toLowerCase()
      if (addresses.has(lowercasedAddress)) {
        errors.push(
          `Error in ${type}: Duplicate token address found: ${item.address}`,
        )
      }
      addresses.add(lowercasedAddress)
    })
  } else if ('validators' in list) {
    const ids = new Set<string>()
    const validatorsList = list as ValidatorsSchema
    validatorsList.validators.forEach((item) => {
      if (ids.has(item.id)) {
        errors.push(
          `Error in ${type}: Duplicate validator ID found: ${item.id}`,
        )
      }
      ids.add(item.id)
    })
  }
}
