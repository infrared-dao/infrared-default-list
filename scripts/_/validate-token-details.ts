import type { Address, PublicClient } from 'viem'

import type { ProtocolsSchema } from '@/types/protocols'
import type { TokensSchema } from '@/types/tokens'

import { delay } from './delay'
import { getFile } from './get-file'
import { getTokenSymbol } from './get-token-symbol'
import { validateDecimals } from './validate-decimals'
import { validateImage } from './validate-image'
import { validateSymbol } from './validate-symbol'

const RPC_REQUESTS_PER_SECOND = 10
const ONE_SECOND = 1000

interface Counter {
  value: number
}

const validateName = async ({
  errors,
  publicClient,
  rpcLookupCount,
  token,
}: {
  errors: Array<string>
  publicClient: PublicClient
  rpcLookupCount: Counter
  token: TokensSchema['tokens'][number]
}) => {
  const tokenSymbol = await getTokenSymbol({
    errors,
    publicClient,
    tokenAddress: token.address as Address,
  })

  if (token.name !== tokenSymbol) {
    if ('underlyingTokens' in token) {
      const symbols = await Promise.all(
        token.underlyingTokens.map(async (underlyingToken) => {
          rpcLookupCount.value += 1
          if (rpcLookupCount.value % RPC_REQUESTS_PER_SECOND === 0) {
            await delay(ONE_SECOND)
          }
          return await getTokenSymbol({
            errors,
            publicClient,
            tokenAddress: underlyingToken as Address,
          })
        }),
      )
      const underlyingTokenSymbols = symbols.join('-')

      if (token.name !== underlyingTokenSymbols) {
        rpcLookupCount.value += 1
        if (rpcLookupCount.value % RPC_REQUESTS_PER_SECOND === 0) {
          await delay(ONE_SECOND)
        }

        errors.push(
          `${token.name} does not match ${tokenSymbol} or ${underlyingTokenSymbols}`,
        )
      }
    } else {
      errors.push(`${token.name} does not match ${tokenSymbol}`)
    }
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
    errors.push(`${token.name} does not have a protocol (token validation)`)
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
  const rpcLookupCount = { value: 0 }

  for (const token of tokens) {
    await validateName({ errors, publicClient, rpcLookupCount, token })
    validateProtocol({ errors, token })
    await validateSymbol({ errors, publicClient, token })
    await validateDecimals({ errors, publicClient, token })
    await validateImage({
      errors,
      item: token,
      required: false,
      type: 'tokens',
    })
  }
}
