import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'path'
import { fileURLToPath } from 'url'

import type { TokenListSchema } from '../src/types/token-list'
import { checkImageSize } from './_/check-image-size'
import { ASSETS_FOLDER } from './_/constants'
import { getErrorMessage } from './_/get-error-message'

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)

// @ts-expect-error hack fix for __dirname. See https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const schema = JSON.parse(
  readFileSync(
    path.join(__dirname, '../schema/token-list-schema.json'),
    'utf-8',
  ),
)

const validateTokenList = async ({ network }: { network: string }) => {
  const tokenListPath = path.join(
    __dirname,
    `../src/tokens/${network}/defaultTokenList.json`,
  )

  let tokenList: TokenListSchema

  try {
    tokenList = JSON.parse(readFileSync(tokenListPath, 'utf-8'))
  } catch (error) {
    console.error(
      `Error reading JSON files for network ${network}:`,
      getErrorMessage(error),
    )
    process.exit(1)
  }

  const errors: Array<string> = []

  // Validate the overall structure
  const validate = ajv.compile(schema)
  const valid = validate(tokenList)

  if (!valid) {
    validate.errors?.forEach((error) => {
      errors.push(
        `Error in token list: ${error.message} at ${error.instancePath}`,
      )
    })
  }

  // Check if all image files exist and have correct dimensions
  for (const token of tokenList.tokens) {
    const imagePath = path.join(`${ASSETS_FOLDER}/tokens`, token.image)
    if (!existsSync(imagePath)) {
      errors.push(
        `Image file "${token.image}" not found for token "${token.name}"`,
      )
    } else if (path.extname(imagePath).toLowerCase() === '.png') {
      const isCorrectSize = await checkImageSize(imagePath)
      if (!isCorrectSize) {
        errors.push(
          `Image file "${token.image}" for token "${token.name}" is not 128x128 pixels`,
        )
      }
    }
  }

  if (errors.length > 0) {
    console.error(`Validation failed for network ${network}:`)
    errors.forEach((error) => console.error(error))
    process.exit(1)
  }

  console.log(`Token validation successful for network: ${network}`)
}

// Run validation for all networks
const networksDir = path.join(__dirname, '../src/tokens')
readdirSync(networksDir).forEach(async (network) => {
  await validateTokenList({ network })
})
