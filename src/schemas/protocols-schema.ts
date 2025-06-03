import {
  array,
  type InferOutput,
  nonEmpty,
  object,
  optional,
  pipe,
  string,
  url,
} from 'valibot'

export const DefaultListProtocolSchema = object({
  description: string(),
  id: string(),
  imageDark: string(),
  imageLight: string(),
  name: string(),
  prefix: optional(string()),
  url: pipe(string(), nonEmpty('Please enter a url'), url()),
})
export type DefaultListProtocol = InferOutput<typeof DefaultListProtocolSchema>

export const DefaultListProtocolsSchema = array(DefaultListProtocolSchema)
export type DefaultListProtocols = InferOutput<
  typeof DefaultListProtocolsSchema
>
