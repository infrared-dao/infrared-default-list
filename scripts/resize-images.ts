import { glob } from 'glob'
import path from 'path'
import sharp from 'sharp'

import {
  PROTOCOLS_FOLDER,
  PROTOCOLS_ORIGINAL_FOLDER,
  TOKENS_FOLDER,
  TOKENS_ORIGINAL_FOLDER,
} from './_/constants'

const IMAGE_HEIGHT = 128
const IMAGE_WIDTH = 128

const cleanFileName = (fileName: string) =>
  `${fileName.replace('.png', '.webp').replace(/\s|_/g, '-').toLowerCase()}`

const resizeFolder = async ({
  newFolder,
  originalFolder,
}: {
  newFolder: string
  originalFolder: string
}) => {
  const pngs = await glob(`${originalFolder}/*.png`)
  pngs
    .map((image) => path.basename(image))
    .forEach((image) => {
      sharp(`${originalFolder}/${image}`)
        .resize({
          height: IMAGE_HEIGHT,
          width: IMAGE_WIDTH,
        })
        .webp({ quality: 100 })
        .toFile(cleanFileName(`${newFolder}/${image}`))
    })
  console.log(`resized all pngs in ${originalFolder}`)
}

const resizeImages = () => {
  resizeFolder({
    newFolder: PROTOCOLS_FOLDER,
    originalFolder: PROTOCOLS_ORIGINAL_FOLDER,
  })
  resizeFolder({
    newFolder: TOKENS_FOLDER,
    originalFolder: TOKENS_ORIGINAL_FOLDER,
  })
}

resizeImages()
