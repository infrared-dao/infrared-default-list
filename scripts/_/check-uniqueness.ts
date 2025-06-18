export const checkUniqueness = ({
  errors,
  fieldName,
  set,
  value,
}: {
  errors: Array<string>
  fieldName: string
  set: Set<string>
  value: string
}) => {
  if (set.has(value)) {
    errors.push(
      `Duplicate protocol found: ${value}. Protocol ${fieldName}s must be unique.`,
    )
  }
  set.add(value)
}
