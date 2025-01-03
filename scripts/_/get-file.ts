import { readFileSync } from 'node:fs'

export const getFile = (fileName: string) =>
  JSON.parse(readFileSync(fileName, 'utf-8'))
