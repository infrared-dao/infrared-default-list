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

import { transports } from './_/transports'

export const INDENTATION_SPACES = 2

const infraredFactoryAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_asset',
        type: 'address',
      },
    ],
    name: 'registerVault',
    outputs: [
      {
        internalType: 'contract IInfraredVault',
        name: 'vault',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

const InfraredFactoryAddress = '0xb71b3DaEA39012Fb0f2B14D2a9C86da9292fC126'

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
      console.log(`   Bera Reward Vault: ${vault.beraRewardVault}`)
      console.log('')
    })

    const deployedVaults = await Promise.all(
      polVaultsWithZeroAddress.map(async ({ depositTokenAddress }) => {
        const { result } = await publicClient.simulateContract({
          abi: infraredFactoryAbi,
          account: deployerAccount,
          address: InfraredFactoryAddress,
          args: [depositTokenAddress],
          functionName: 'registerVault',
        })
        console.log('simulated vault address', result)
        // await walletClient.writeContract(request) // TODO: uncomment this
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
  } else {
    console.log('No pol vaults found with address "NOT SURE"')
  }

  return polVaultsWithZeroAddress
}

deployNewVaults()
