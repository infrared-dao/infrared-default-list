import { SVG, registerWindow } from '@svgdotjs/svg.js'
import { readdirSync, readFileSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { createSVGWindow } from 'svgdom'
import { parse } from 'valibot'
import { type Address, isAddressEqual } from 'viem'

import type { supportedChains } from '@/config/chains'
import {
  type DefaultListProtocol,
  DefaultListProtocolsSchema,
} from '@/schemas/protocols-schema'
import type {
  DefaultListToken,
  DefaultListTokens,
} from '@/schemas/tokens-schema'

import {
  IMAGE_GAP_BETWEEN,
  IMAGE_SIZE,
  IMAGE_WIDTH_2_TOKENS,
  IMAGE_WIDTH_3_TOKENS,
  IMAGE_WIDTH_4_TOKENS,
  PROTOCOLS_FOLDER,
  TOKENS_FOLDER,
} from './_/constants'
import { formatDataToJson } from './_/format-data-to-json'
import { getJsonFile } from './_/get-json-file'
import { isValidChain } from './_/is-valid-chain'

const folderPath = 'src/tokens'

const protocolsFile: { protocols: DefaultListProtocol } = getJsonFile({
  path: 'src/protocols.json',
})
const protocols = parse(DefaultListProtocolsSchema, protocolsFile.protocols)

const IMAGE_HEIGHT = IMAGE_SIZE
const PROTOCOL_IMAGE_SIZE = 64

const cleanFileName = (fileName: string) =>
  `${fileName
    .replace(/-\d+\.?\d*\%/, '')
    .replace('.', '-')
    .replace('₮', 't')
    .replace(/\s|_|\//g, '-')
    .toLowerCase()}`

const generateTokenImage = async ({
  token,
  tokens,
}: {
  token: DefaultListToken
  tokens: DefaultListTokens
}) => {
  if (
    'underlyingTokens' in token &&
    !!token.underlyingTokens &&
    !token.imageNotFromUnderlying
  ) {
    const window = createSVGWindow()
    const document = window.document
    registerWindow(window, document)

    const underLyingTokenImageFiles = token.underlyingTokens.map(
      (underlyingTokenAddress) => {
        const foundToken = tokens.find(({ address }) =>
          isAddressEqual(
            address.toLowerCase() as Address,
            underlyingTokenAddress.toLowerCase() as Address,
          ),
        )
        if (foundToken) {
          const imagePath = foundToken.image
          if (imagePath) {
            const imageFile = readFileSync(
              `${TOKENS_FOLDER}/${imagePath}`,
              'utf-8',
            )
            return imageFile.replaceAll('\n', '')
          }
          return undefined
        }
        return undefined
      },
    )
    if (underLyingTokenImageFiles) {
      // eslint-disable-next-line no-magic-numbers
      if (token.underlyingTokens.length === 1) {
        try {
          const protocol = protocols.find(({ id }) => id === token.protocol)
          const protocolImageFile = readFileSync(
            `${PROTOCOLS_FOLDER}/${protocol?.imageOnTop || protocol?.imageDark}`,
            'utf-8',
          )

          const combinedSVGs = SVG()
            .size(IMAGE_SIZE, IMAGE_HEIGHT)
            .add(SVG(underLyingTokenImageFiles[0]))
            .add(
              SVG(protocolImageFile)
                .size(PROTOCOL_IMAGE_SIZE, PROTOCOL_IMAGE_SIZE)
                .move(IMAGE_SIZE - PROTOCOL_IMAGE_SIZE, 0),
            )
            // @ts-expect-error false-positive - the types are very old
            .flatten()
            .svg()

          const fileName = cleanFileName(token.symbol)
          await writeFile(`${TOKENS_FOLDER}/${fileName}.svg`, `${combinedSVGs}`)
          return `${fileName}.svg`
        } catch (error) {
          console.error(token.name, error)
        }
        // eslint-disable-next-line no-magic-numbers
      } else if (token.underlyingTokens.length === 2) {
        try {
          const combinedSVGs = SVG()
            .size(IMAGE_WIDTH_2_TOKENS, IMAGE_HEIGHT)
            .add(SVG(underLyingTokenImageFiles[0]))
            .add(SVG(underLyingTokenImageFiles[1]).move(IMAGE_GAP_BETWEEN, 0))
            // @ts-expect-error false-positive - the types are very old
            .flatten()
            .svg()

          const fileName = cleanFileName(token.name)
          await writeFile(`${TOKENS_FOLDER}/${fileName}.svg`, `${combinedSVGs}`)
          return `${fileName}.svg`
        } catch (error) {
          console.error(token.name, error)
        }
        // eslint-disable-next-line no-magic-numbers
      } else if (token.underlyingTokens.length === 3) {
        try {
          const combinedSVGs = SVG()
            // eslint-disable-next-line no-magic-numbers
            .size(IMAGE_WIDTH_3_TOKENS, IMAGE_HEIGHT)
            .add(SVG(underLyingTokenImageFiles[0]))
            .add(SVG(underLyingTokenImageFiles[1]).move(IMAGE_GAP_BETWEEN, 0))
            .add(
              // eslint-disable-next-line no-magic-numbers
              SVG(underLyingTokenImageFiles[2]).move(IMAGE_GAP_BETWEEN * 2, 0),
            )
            // @ts-expect-error - the types are very old
            .flatten()
            .svg()

          const fileName = cleanFileName(token.name)
          await writeFile(`${TOKENS_FOLDER}/${fileName}.svg`, `${combinedSVGs}`)
          return `${fileName}.svg`
        } catch (error) {
          console.error(token.name, error)
        }
        // eslint-disable-next-line no-magic-numbers
      } else if (token.underlyingTokens.length === 4) {
        try {
          const combinedSVGs = SVG()
            // eslint-disable-next-line no-magic-numbers
            .size(IMAGE_WIDTH_4_TOKENS, IMAGE_HEIGHT)
            .add(SVG(underLyingTokenImageFiles[0]))
            .add(SVG(underLyingTokenImageFiles[1]).move(IMAGE_GAP_BETWEEN, 0))
            .add(
              // eslint-disable-next-line no-magic-numbers
              SVG(underLyingTokenImageFiles[2]).move(IMAGE_GAP_BETWEEN * 2, 0),
            )
            .add(
              // eslint-disable-next-line no-magic-numbers
              SVG(underLyingTokenImageFiles[3]).move(IMAGE_GAP_BETWEEN * 3, 0),
            )
            // @ts-expect-error - the types are very old
            .flatten()
            .svg()

          const fileName = cleanFileName(token.name)
          await writeFile(`${TOKENS_FOLDER}/${fileName}.svg`, `${combinedSVGs}`)
          return `${fileName}.svg`
        } catch (error) {
          console.error(token.name, error)
        }
      }
    }
  }
  return null
}

const generateTokenImagesByChain = async ({
  chain,
}: {
  chain: keyof typeof supportedChains
}) => {
  const path = `${folderPath}/${chain}.json`
  const tokens: { tokens: DefaultListTokens } = getJsonFile({
    chain,
    path,
  })
  const promisedTokenImages = tokens.tokens.map(
    async (token) =>
      await generateTokenImage({
        token,
        tokens: tokens.tokens,
      }),
  )
  const promisedTokenImagesResult = await Promise.all(promisedTokenImages)
  const tokensToWrite = tokens.tokens.map((token, index) => {
    if (promisedTokenImagesResult[index]) {
      return {
        ...token,
        image: promisedTokenImagesResult[index],
      }
    }
    return token
  })
  await writeFile(path, formatDataToJson({ data: { tokens: tokensToWrite } }))
}

const generateTokenImages = async () => {
  const promises = readdirSync(folderPath).map(async (file) => {
    const chain = file.replace('.json', '')

    if (!isValidChain(chain)) {
      throw new Error(`Unsupported chain: ${chain}`)
    }
    await generateTokenImagesByChain({ chain })
  })

  await Promise.all(promises)
}

await generateTokenImages()
