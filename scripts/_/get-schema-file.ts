import { readFileSync } from 'node:fs'

export const getSchemaFile = (schemaName: string): any =>
  JSON.parse(readFileSync(schemaName, 'utf-8'))
