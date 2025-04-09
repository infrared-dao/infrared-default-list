import { type Address, isAddressEqual, type PublicClient } from 'viem'

import type { ProtocolsSchema } from '@/types/protocols'
import type { TokensSchema } from '@/types/tokens'

import { getFile } from './get-file'
import { getTokenName } from './get-token-name'
import { getTokenSymbol } from './get-token-symbol'
import { validateDecimals } from './validate-decimals'
import { validateImage } from './validate-image'

const validateSymbol = async ({
  errors,
  onChainSymbol,
  token,
}: {
  errors: Array<string>
  onChainSymbol: string
  token: TokensSchema['tokens'][number]
}) => {
  if (token.symbol !== onChainSymbol) {
    errors.push(
      `${token.symbol}’s symbol does not match the on-chain symbol ${onChainSymbol}`,
    )
  }
}

const validateName = async ({
  errors,
  onChainName,
  onChainSymbol,
  token,
  tokens,
}: {
  errors: Array<string>
  onChainName: string
  onChainSymbol: string
  token: TokensSchema['tokens'][number]
  tokens: TokensSchema['tokens']
}) => {
  if ('underlyingTokens' in token) {
    const underlyingTokens = token.underlyingTokens.map((underlyingToken) => {
      const foundToken = tokens.find(({ address }) =>
        isAddressEqual(address as Address, underlyingToken as Address),
      )

      if (!foundToken) {
        errors.push(
          `${token.name} does not have an underlying token for ${underlyingToken}`,
        )
      }
      return foundToken
    })

    const underlyingTokenSymbols = underlyingTokens
      .map((token) => (token && token.symbol) || 'FIX_MISSING_SYMBOL')
      .join('-')

    if (token.name !== underlyingTokenSymbols) {
      if (token.name !== onChainName && token.name !== onChainSymbol) {
        // exception for cases like bWBERA
        errors.push(`${token.name} does not match ${underlyingTokenSymbols}`)
      }
    }
  } else if (token.name !== onChainName && token.name !== onChainSymbol) {
    errors.push(`${token.name} does not match ${onChainName}`)
  }
}

const protocolsList: ProtocolsSchema = getFile('src/protocols.json')

const validateProtocol = ({
  errors,
  token,
}: {
  errors: Array<string>
  token: TokensSchema['tokens'][number]
}) => {
  if (!('protocol' in token)) {
    return
  }

  const protocol = protocolsList.protocols.find(
    ({ id }) => id === token.protocol,
  )

  if (!protocol) {
    errors.push(`${token.symbol} does not have a protocol (token validation)`)
  }
}

const validateMintUrl = ({
  errors,
  token,
}: {
  errors: Array<string>
  token: TokensSchema['tokens'][number]
}) => {
  if (!('mintUrl' in token) || !token.mintUrl) {
    return
  }

  if (token.protocol === 'bex') {
    const expectedMintUrl = `https://hub.berachain.com/pools/`
    if (!token.mintUrl.startsWith(expectedMintUrl)) {
      errors.push(
        `${token.symbol} mintUrl is incorrect. It should start with ${expectedMintUrl}`,
      )
    }
  } else if (token.protocol === 'dolomite') {
    const expectedMintUrl = `https://app.dolomite.io/balances`
    if (!token.mintUrl.startsWith(expectedMintUrl)) {
      errors.push(
        `${token.symbol} mintUrl is incorrect. It should be ${expectedMintUrl}`,
      )
    }
  } else if (token.protocol === 'kodiak') {
    const expectedMintUrl = `https://app.kodiak.finance/#/liquidity/pools/${token.address}?chain=berachain_mainnet`
    if (token.mintUrl !== expectedMintUrl) {
      errors.push(
        `${token.symbol} mintUrl is incorrect. It should be ${expectedMintUrl}`,
      )
    }
  }
}

export const validateTokenDetails = async ({
  errors,
  publicClient,
  tokens,
}: {
  errors: Array<string>
  publicClient: PublicClient
  tokens: TokensSchema['tokens']
}) => {
  const addresses = new Set<string>()

  for (const token of tokens) {
    const lowercasedAddress = token.address.toLowerCase()
    if (addresses.has(lowercasedAddress)) {
      errors.push(
        `Error in tokens: Duplicate token address found: ${token.address}`,
      )
    }
    addresses.add(lowercasedAddress)

    await validateDecimals({ errors, publicClient, token })
    await validateImage({
      errors,
      item: token,
      required: false,
      type: 'tokens',
    })
    await validateMintUrl({ errors, token })
    validateProtocol({ errors, token })

    const onChainSymbol = await getTokenSymbol({
      errors,
      publicClient,
      tokenAddress: token.address as Address,
    })
    const onChainName = await getTokenName({
      errors,
      publicClient,
      tokenAddress: token.address as Address,
    })

    await validateSymbol({ errors, onChainSymbol, token })
    await validateName({
      errors,
      onChainName,
      onChainSymbol,
      token,
      tokens,
    })
  }
}
