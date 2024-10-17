import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import type { GaugeListSchema } from '../src/types/gauge-list'
import { ASSETS_FOLDER } from './constants'
import { getErrorMessage } from './get-error-message'

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)

// @ts-expect-error hack fix for __dirname. See https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const schema = JSON.parse(
  readFileSync(
    path.join(__dirname, '../schema/gauge-list-schema.json'),
    'utf-8',
  ),
)

const checkImageSize = async (filePath: string) => {
  try {
    const metadata = await sharp(filePath).metadata()
    return metadata.width === 128 && metadata.height === 128
  } catch (error) {
    console.error(
      `Error checking image size for ${filePath}:`,
      getErrorMessage(error),
    )
    return false
  }
}

const validateGaugeList = async ({ network }: { network: string }) => {
  const gaugeListPath = path.join(
    __dirname,
    `../src/gauges/${network}/defaultGaugeList.json`,
  )

  let gaugeList: GaugeListSchema

  try {
    gaugeList = JSON.parse(readFileSync(gaugeListPath, 'utf-8'))
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
  const valid = validate(gaugeList)

  if (!valid) {
    validate.errors?.forEach((error) => {
      errors.push(
        `Error in gauge list: ${error.message} at ${error.instancePath}`,
      )
    })
  }

  // Check if all image files exist and have correct dimensions
  for (const protocol of gaugeList.protocols) {
    const imagePath = path.join(`${ASSETS_FOLDER}/protocols`, protocol.image)
    if (!existsSync(imagePath)) {
      errors.push(
        `Image file "${protocol.image}" not found for protocol "${protocol.name}"`,
      )
    } else if (path.extname(imagePath).toLowerCase() === '.png') {
      const isCorrectSize = await checkImageSize(imagePath)
      if (!isCorrectSize) {
        errors.push(
          `Image file "${protocol.image}" for protocol "${protocol.name}" is not 128x128 pixels`,
        )
      }
    }
  }
  for (const gauge of gaugeList.gauges) {
    if (gauge.image) {
      const imagePath = path.join(ASSETS_FOLDER, gauge.image)
      if (!existsSync(imagePath)) {
        errors.push(
          `Image file "${gauge.image}" not found for gauge "${gauge.name}"`,
        )
      } else if (path.extname(imagePath).toLowerCase() === '.png') {
        const isCorrectSize = await checkImageSize(imagePath)
        if (!isCorrectSize) {
          errors.push(
            `Image file "${gauge.image}" for gauge "${gauge.name}" is not 128x128 pixels`,
          )
        }
      }
    }
  }

  if (errors.length > 0) {
    console.error(`Validation failed for network ${network}:`)
    errors.forEach((error) => console.error(error))
    process.exit(1)
  }

  console.log(`Validation successful for network: ${network}`)
}

// Run validation for all networks
const networksDir = path.join(__dirname, '../src/gauges')
readdirSync(networksDir).forEach(async (network) => {
  await validateGaugeList({ network })
})
