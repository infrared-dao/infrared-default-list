import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  rmSync,
  existsSync,
} from 'fs'
import { resolve } from 'path'

const INDENTATION_SPACES = 2

const assetTypes = ['tokens', 'vaults', 'validators']

// Process asset types
for (const assetType of assetTypes) {
  const srcDir = resolve(process.cwd(), `./src/${assetType}`)
  const distDir = resolve(process.cwd(), `./output/${assetType}`)

  // Skip if source directory doesn't exist
  if (!existsSync(srcDir)) {
    console.log(`Skipping ${assetType} - source directory does not exist`)
    continue
  }

  // Remove existing dist directory if it exists
  if (existsSync(distDir)) {
    rmSync(distDir, { force: true, recursive: true })
  }

  // Create the dist directory
  mkdirSync(distDir, { recursive: true })

  // Get all JSON files in the source directory
  const jsonFiles = readdirSync(srcDir).filter((file) => file.endsWith('.json'))

  for (const jsonFile of jsonFiles) {
    const jsonPath = resolve(srcDir, jsonFile)
    const tsPath = resolve(distDir, jsonFile.replace('.json', '.ts'))

    const jsonContent = readFileSync(jsonPath, 'utf-8')
    const data = JSON.parse(jsonContent)

    const tsContent = `export const ${assetType} = ${JSON.stringify(data[assetType], null, INDENTATION_SPACES)}`

    writeFileSync(tsPath, tsContent)
    console.log(`Converted ${assetType}/${jsonFile} to TypeScript`)
  }
}

// Process Protocols
const srcPath = resolve(process.cwd(), `./src/protocols.json`)
const distPath = resolve(process.cwd(), `./output/protocols.ts`)

const jsonContent = readFileSync(srcPath, 'utf-8')
const data = JSON.parse(jsonContent)

const tsContent = `export const protocols = ${JSON.stringify(data.protocols, null, INDENTATION_SPACES)}`

writeFileSync(distPath, tsContent)
console.log(`Converted protocols.json to TypeScript`)
