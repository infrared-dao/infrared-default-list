import { readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { array, type InferOutput, object, optional, parse } from 'valibot'
import {
  createPublicClient,
  createWalletClient,
  type Hex,
  isAddressEqual,
  zeroAddress,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { berachain } from 'viem/chains'

import { AddressSchema } from '@/schemas/address-schema'
import { DefaultListIVaultSchema } from '@/schemas/ivaults-schema'
import { DefaultListPolVaultSchema } from '@/schemas/pol-vaults-schema'

import { INDENTATION_SPACES, INFRARED_ADDRESS } from './_/constants'
import { infraredMainnetAbi } from './_/infrared-abi'
import { transports } from './_/transports'

const publicClient = createPublicClient({
  chain: berachain,
  transport: transports[berachain.id],
})

const walletClient = createWalletClient({
  chain: berachain,
  transport: transports[berachain.id],
})
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY as Hex

const deployerAccount = privateKeyToAccount(`0x${DEPLOYER_PRIVATE_KEY}`)

const IVaultsWithoutAddressSchema = array(
  object({
    ...DefaultListIVaultSchema.entries,
    address: optional(AddressSchema),
  }),
)
export type IVaultsWithoutAddress = InferOutput<
  typeof IVaultsWithoutAddressSchema
>
const PolVaultsWithoutAddressSchema = array(
  object({
    ...DefaultListPolVaultSchema.entries,
    address: optional(AddressSchema),
  }),
)
export type PolVaultsWithoutAddress = InferOutput<
  typeof PolVaultsWithoutAddressSchema
>

const checkAndDeploy = async ({
  type,
  vaults,
  vaultsWithoutAddress,
}: {
  type: 'ivaults' | 'pol-vaults'
  vaults: IVaultsWithoutAddress | PolVaultsWithoutAddress
  vaultsWithoutAddress: IVaultsWithoutAddress | PolVaultsWithoutAddress
}) => {
  if (vaultsWithoutAddress.length > 0) {
    console.log(
      `Found ${vaultsWithoutAddress.length} ${type} without an address`,
    )
    console.log(`${type} without an address:`)
    vaultsWithoutAddress.forEach((vault, index) => {
      console.log(`${index + 1}. Slug: ${vault.slug}`)
      console.log(`   Deposit Token: ${vault.depositTokenAddress}`)
      console.log('')
    })

    const newVaults = await Promise.all(
      vaultsWithoutAddress.map(async (vault) => {
        // Check if there already is a vault for this deposit token
        const existingVaultAddress = await publicClient.readContract({
          abi: infraredMainnetAbi,
          address: INFRARED_ADDRESS,
          args: [vault.depositTokenAddress],
          functionName: 'vaultRegistry',
        })

        // Vaultregistry returns zeroAddress if there is no vault for this deposit token
        if (isAddressEqual(existingVaultAddress, zeroAddress)) {
          // Deploy a new vault if there is no vault for this deposit token
          const { request, result } = await publicClient.simulateContract({
            abi: infraredMainnetAbi,
            account: deployerAccount,
            address: INFRARED_ADDRESS,
            args: [vault.depositTokenAddress],
            functionName: 'registerVault',
          })
          await walletClient.writeContract(request)
          console.log(`Deployed new vault at: ${result} for ${vault.slug}`)
          return {
            ...vault,
            address: result.toLowerCase(),
          }
        }

        // Vaultregistry returns the vault address if there is a vault for this deposit token
        console.log(
          `Vault ${vault.slug} already deployed at ${existingVaultAddress}`,
        )
        return {
          ...vault,
          address: existingVaultAddress.toLowerCase(),
        }
      }),
    )

    const updatedVaults = vaults.map((vault) => {
      if (!('address' in vault)) {
        return newVaults.find((newVault) =>
          isAddressEqual(
            newVault.depositTokenAddress,
            vault.depositTokenAddress,
          ),
        )
      }
      return vault
    })

    writeFileSync(
      resolve(process.cwd(), `./src/${type}/mainnet.json`),
      `${JSON.stringify({ vaults: updatedVaults }, null, INDENTATION_SPACES)}\n`,
    )
    console.log(`Finished writing to ${type}/mainnet.json`)
  } else {
    console.log(`No ${type} found without an address`)
  }
}

const deployNewVaults = async () => {
  const iVaultsFilePath = join(process.cwd(), 'src/ivaults/mainnet.json')
  const iVaultsFileContent = readFileSync(iVaultsFilePath, 'utf8')
  const iVaults = parse(
    IVaultsWithoutAddressSchema,
    JSON.parse(iVaultsFileContent).vaults,
  )
  const iVaultsWithoutAddress = iVaults.filter((vault) => !('address' in vault))

  checkAndDeploy({
    type: 'ivaults',
    vaults: iVaults,
    vaultsWithoutAddress: iVaultsWithoutAddress,
  })

  const polVaultsFilePath = join(process.cwd(), 'src/pol-vaults/mainnet.json')
  const polVaultsFileContent = readFileSync(polVaultsFilePath, 'utf8')
  const polVaults = parse(
    PolVaultsWithoutAddressSchema,
    JSON.parse(polVaultsFileContent).vaults,
  )
  const polVaultsWithoutAddress = polVaults.filter(
    (vault) => !('address' in vault),
  )

  checkAndDeploy({
    type: 'pol-vaults',
    vaults: polVaults,
    vaultsWithoutAddress: polVaultsWithoutAddress,
  })
}

deployNewVaults()
