import { readFileSync } from 'node:fs'

export const getFile = (schemaName: string) =>
  JSON.parse(readFileSync(schemaName, 'utf-8'))
