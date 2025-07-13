import { existsSync } from 'node:fs'
import path from 'path'

import { ASSETS_FOLDER, IMAGE_SIZE } from './constants'
import { getFile } from './get-file'

const viewboxRegex = /viewBox="(\d+\s\d+\s\d+\s\d+)"/

export const validateImage = async ({
  customWidth,
  errors,
  folder,
  height = IMAGE_SIZE,
  identifier,
  identifier2,
  image,
  required,
  type,
  width = IMAGE_SIZE,
}: {
  customWidth?: boolean
  errors: Array<string>
  folder: string
  height?: number
  identifier: string
  identifier2?: string
  image: string | undefined
  required: boolean
  type: string
  width?: number
}) => {
  if (!image) {
    if (required) {
      errors.push(`${type} image file "${image}" not found for "${identifier}"`)
    }
    return
  }
  const expectedFileName = identifier
    .toLowerCase()
    .replace(/\s|_|\/|\./g, '-')
    .replace('₮', 't')
  const expectedFileName2 = identifier2
    ? identifier2
        .toLowerCase()
        .replace(/\s|_|\/|\./g, '-')
        .replace('₮', 't')
    : undefined
  if (
    (type === 'Protocol' &&
      image !== `${expectedFileName}.svg` &&
      image !== `${expectedFileName}-dark.svg` &&
      image !== `${expectedFileName}-light.svg`) ||
    (type === 'Token' &&
      image !== `${expectedFileName}.svg` &&
      image !== `${expectedFileName2}.svg`)
  ) {
    errors.push(
      `${type} image file "${image}" should use the name "${expectedFileName}.svg"${expectedFileName2 ? ` or "${expectedFileName2}.svg"` : ''}`,
    )
    return
  }
  const imagePath = path.join(`${ASSETS_FOLDER}/${folder}`, image)
  if (!existsSync(imagePath)) {
    errors.push(
      `${type} image file "${image}" not found for "${identifier}" at ${imagePath}`,
    )
  }
  const imageFile = getFile(imagePath)
  const imageViewbox = viewboxRegex.exec(imageFile)
  if (imageViewbox === null) {
    errors.push(
      `${type} image file "${image}" is missing a viewBox for "${identifier}" at ${imagePath}`,
    )
  } else {
    const [svgMinXString, svgMinYString, svgWidthString, svgHeightString] =
      imageViewbox[1].split(' ')
    const svgMinX = parseInt(svgMinXString)
    const svgMinY = parseInt(svgMinYString)
    const svgWidth = parseInt(svgWidthString)
    const svgHeight = parseInt(svgHeightString)

    if (svgMinX !== 0 || svgMinY !== 0) {
      errors.push(
        `${type} image file "${image}" must have a min-x of and min-y of 0 in the viewBox property (${imageViewbox[1]}) "${identifier}" at ${imagePath}`,
      )
    }
    if (height !== undefined && height !== svgHeight) {
      errors.push(
        `${type} image file "${image}" must have a height of ${height}px, not ${svgHeight}px for "${identifier}" at ${imagePath}`,
      )
    }
    if (width !== undefined && width !== svgWidth && !customWidth) {
      errors.push(
        `${type} image file "${image}" must have a width of ${width}px, not ${svgWidth}px for "${identifier}" at ${imagePath}`,
      )
    }
  }
}
