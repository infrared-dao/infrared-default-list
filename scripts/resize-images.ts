import { glob } from 'glob'
import path from 'path'
import sharp from 'sharp'

import { ASSETS_FOLDER, PNG_FOLDER } from './constants'

const IMAGE_HEIGHT = 128
const IMAGE_WIDTH = 128

const resizeImages = async () => {
  const pngImages = await glob(`${PNG_FOLDER}/*.png`)

  pngImages
    .map((image) => path.basename(image))
    .forEach((image) => {
      sharp(`${PNG_FOLDER}/${image}`)
        .resize({
          height: IMAGE_HEIGHT,
          width: IMAGE_WIDTH,
        })
        .webp({ quality: 100 })
        .toFile(
          `${ASSETS_FOLDER}/${image
            .replace('.png', '.webp')
            .replace(/\s|_/g, '-')
            .toLowerCase()}`,
        )
    })
}

resizeImages()
