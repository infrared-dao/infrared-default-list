import {
  vectorize,
  ColorMode,
  PathSimplifyMode,
  Hierarchical,
} from '@neplex/vectorizer'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'path'

import { ASSETS_FOLDER } from './_/constants'

const file = process.argv[2]

const convertToSVG = async () => {
  if (!file) {
    throw new Error('No file provided')
  }
  const src = await readFile(file)

  const svg = await vectorize(src, {
    // @ts-expect-error TS2748: Cannot access ambient const enums when isolatedModules is enabled
    colorMode: ColorMode.Color,
    colorPrecision: 6,
    cornerThreshold: 60,
    filterSpeckle: 4,
    // @ts-expect-error TS2748: Cannot access ambient const enums when isolatedModules is enabled
    hierarchical: Hierarchical.Stacked,
    layerDifference: 5,
    lengthThreshold: 5,
    maxIterations: 2,
    // @ts-expect-error TS2748: Cannot access ambient const enums when isolatedModules is enabled
    mode: PathSimplifyMode.Spline,
    pathPrecision: 5,
    spliceThreshold: 45,
  })

  await writeFile(
    `${ASSETS_FOLDER}/${path.basename(file).replace('.png', '.svg')}`,
    svg,
  )
}

convertToSVG()
