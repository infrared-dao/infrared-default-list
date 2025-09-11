import { readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { array, object, optional, parse } from 'valibot'
import {
  createPublicClient,
  createWalletClient,
  type Hex,
  isAddressEqual,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { berachain } from 'viem/chains'

import { AddressSchema } from '@/schemas/address-schema'
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

async function deployNewVaults(): Promise<void> {
  const filePath = join(process.cwd(), 'src/pol-vaults/mainnet.json')
  const fileContent = readFileSync(filePath, 'utf8')
  const polVaults = parse(
    array(
      object({
        ...DefaultListPolVaultSchema.entries,
        address: optional(AddressSchema),
      }),
    ),
    JSON.parse(fileContent).vaults,
  )
  const polVaultsWithoutAddress = polVaults.filter(
    (vault) => !('address' in vault),
  )

  console.log(
    `Found ${polVaultsWithoutAddress.length} vaults without an address`,
  )

  if (polVaultsWithoutAddress.length > 0) {
    console.log('Pol vaults without an address:')
    polVaultsWithoutAddress.forEach((vault, index) => {
      console.log(`${index + 1}. Slug: ${vault.slug}`)
      console.log(`   Deposit Token: ${vault.depositTokenAddress}`)
      console.log('')
    })

    const deployedVaults = await Promise.all(
      polVaultsWithoutAddress.map(async ({ depositTokenAddress, slug }) => {
        const { request, result } = await publicClient.simulateContract({
          abi: infraredMainnetAbi,
          account: deployerAccount,
          address: INFRARED_ADDRESS,
          args: [depositTokenAddress],
          functionName: 'registerVault',
        })
        await walletClient.writeContract(request)
        console.log(`Deployed new vault at: ${result} for ${slug}`)
        return result
      }),
    )

    const newVaults = polVaultsWithoutAddress.map(
      ({ beraRewardVault, depositTokenAddress, slug }, index) => ({
        address: deployedVaults[index],
        beraRewardVault,
        depositTokenAddress,
        slug,
      }),
    )

    const updatedPolVaults = polVaults.map((vault) => {
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
      resolve(process.cwd(), `./src/pol-vaults/mainnet.json`),
      `${JSON.stringify({ vaults: updatedPolVaults }, null, INDENTATION_SPACES)}\n`,
    )
    console.log('Finished writing to pol-vaults/mainnet.json')
  } else {
    console.log('No pol vaults found without an address')
  }
}

deployNewVaults()
