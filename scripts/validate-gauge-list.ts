import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import type { Address } from 'viem'

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

type GaugeType = {
  [key: string]: {
    description: string
    name: string
  }
}
type Gauge = {
  beraRewardsVault: Address
  lpTokenAddress: Address
  logo?: string
  name: string
  protocol: string
  types: Array<string>
  underlyingTokens: Array<Address>
  url: string
}
type Protocol = {
  description: string
  id: string
  logo: string
  name: string
  url: string
}

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

  let gaugeList: {
    gauges: Array<Gauge>
    protocols: Array<Protocol>
    types: GaugeType
  }

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

  // Check if all logo files exist and have correct dimensions
  const assetsDir = path.join(__dirname, '../src/assets')
  for (const protocol of gaugeList.protocols) {
    const logoPath = path.join(assetsDir, protocol.logo)
    if (!existsSync(logoPath)) {
      errors.push(
        `Logo file "${protocol.logo}" not found for protocol "${protocol.name}"`,
      )
    } else if (path.extname(logoPath).toLowerCase() === '.png') {
      const isCorrectSize = await checkImageSize(logoPath)
      if (!isCorrectSize) {
        errors.push(
          `Logo file "${protocol.logo}" for protocol "${protocol.name}" is not 128x128 pixels`,
        )
      }
    }
  }
  for (const gauge of gaugeList.gauges) {
    if (gauge.logo) {
      const logoPath = path.join(assetsDir, gauge.logo)
      if (!existsSync(logoPath)) {
        errors.push(
          `Logo file "${gauge.logo}" not found for gauge "${gauge.name}"`,
        )
      } else if (path.extname(logoPath).toLowerCase() === '.png') {
        const isCorrectSize = await checkImageSize(logoPath)
        if (!isCorrectSize) {
          errors.push(
            `Logo file "${gauge.logo}" for gauge "${gauge.name}" is not 128x128 pixels`,
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
