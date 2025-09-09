import { readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { parse } from 'valibot'
import {
  createPublicClient,
  createWalletClient,
  type Hex,
  isAddressEqual,
  zeroAddress,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { berachain } from 'viem/chains'

import {
  type DefaultListPolVault,
  DefaultListPolVaultsSchema,
} from '@/schemas/pol-vaults-schema'

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

async function deployNewVaults(): Promise<Array<DefaultListPolVault>> {
  const filePath = join(process.cwd(), 'src/pol-vaults/mainnet.json')
  const fileContent = readFileSync(filePath, 'utf8')
  const polVaults = parse(
    DefaultListPolVaultsSchema,
    JSON.parse(fileContent).vaults,
  )

  const polVaultsWithZeroAddress = polVaults.filter((vault) =>
    isAddressEqual(vault.address, zeroAddress),
  )

  console.log(
    `Found ${polVaultsWithZeroAddress.length} vaults with zero address`,
  )

  if (polVaultsWithZeroAddress.length > 0) {
    console.log('Pol vaults with "NOT SURE" address:')
    polVaultsWithZeroAddress.forEach((vault, index) => {
      console.log(`${index + 1}. Slug: ${vault.slug}`)
      console.log(`   Deposit Token: ${vault.depositTokenAddress}`)
      console.log('')
    })

    const deployedVaults = await Promise.all(
      polVaultsWithZeroAddress.map(async ({ depositTokenAddress, slug }) => {
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

    const newVaults = polVaultsWithZeroAddress.map(
      ({ beraRewardVault, depositTokenAddress, slug }, index) => ({
        address: deployedVaults[index],
        beraRewardVault,
        depositTokenAddress,
        slug,
      }),
    )

    const updatedPolVaults = polVaults.map((vault) => {
      if (isAddressEqual(vault.address, zeroAddress)) {
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
    console.log('No pol vaults found with address "NOT SURE"')
  }

  return polVaultsWithZeroAddress
}

deployNewVaults()
