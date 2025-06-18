import { parse } from 'valibot'
import { type Address, isAddressEqual, type PublicClient } from 'viem'

import {
  type DefaultListProtocol,
  DefaultListProtocolsSchema,
} from '@/schemas/protocols-schema'
import type {
  DefaultListToken,
  DefaultListTokens,
} from '@/schemas/tokens-schema'

import { checkUniqueness } from './check-uniqueness'
import { getJsonFile } from './get-json-file'
import { getTokenName } from './get-token-name'
import { getTokenSymbol } from './get-token-symbol'
import { validateDecimals } from './validate-decimals'
import { validateTokenImage } from './validate-token-image'

const protocolsFile: { protocols: DefaultListProtocol } = getJsonFile({
  path: 'src/protocols.json',
})
const protocols = parse(DefaultListProtocolsSchema, protocolsFile.protocols)

const validateSymbol = ({
  errors,
  onChainSymbol,
  token,
}: {
  errors: Array<string>
  onChainSymbol: string
  token: DefaultListToken
}) => {
  if (token.symbol !== onChainSymbol) {
    errors.push(
      `${token.symbol}’s symbol does not match the on-chain symbol ${onChainSymbol}`,
    )
  }
}

const validateName = ({
  errors,
  onChainName,
  onChainSymbol,
  token,
  tokens,
}: {
  errors: Array<string>
  onChainName: string
  onChainSymbol: string
  token: DefaultListToken
  tokens: DefaultListTokens
}) => {
  if ('underlyingTokens' in token && !!token.underlyingTokens) {
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
        // onChainSymbol for cases like bWBERA

        if ('protocol' in token) {
          const protocol = protocols.find(({ id }) => id === token.protocol)
          const expectedTokenNames = [
            `${protocol?.prefix ? protocol?.prefix : ''}${underlyingTokenSymbols}`,
            token.name.replace(protocol?.name || '', ''),
          ]

          if (!expectedTokenNames.includes(token.name)) {
            errors.push(
              `${token.name} does not match ${expectedTokenNames.join(' or ')} or ${underlyingTokenSymbols}`,
            )
          }
        }
      }
    }
  } else if (token.name !== onChainName && token.name !== onChainSymbol) {
    errors.push(`${token.name} does not match ${onChainName}`)
  }
}

const validateProtocol = ({
  errors,
  token,
}: {
  errors: Array<string>
  token: DefaultListToken
}) => {
  if (!('protocol' in token)) {
    return
  }

  const protocol = protocols.find(({ id }) => id === token.protocol)

  if (!protocol) {
    errors.push(`${token.symbol} does not have a protocol (token validation)`)
  }
}

const validateMintUrl = ({
  errors,
  token,
}: {
  errors: Array<string>
  token: DefaultListToken
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
  addresses,
  errors,
  publicClient,
  token,
  tokens,
}: {
  addresses: Set<string>
  errors: Array<string>
  publicClient: PublicClient
  token: DefaultListToken
  tokens: DefaultListTokens
}) => {
  const lowercasedAddress = token.address.toLowerCase()
  checkUniqueness({
    errors,
    fieldName: 'address',
    set: addresses,
    value: lowercasedAddress,
  })

  await validateDecimals({ errors, publicClient, token })
  await validateTokenImage({
    errors,
    token,
  })
  validateMintUrl({ errors, token })
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

  validateSymbol({ errors, onChainSymbol, token })
  validateName({
    errors,
    onChainName,
    onChainSymbol,
    token,
    tokens,
  })
}
