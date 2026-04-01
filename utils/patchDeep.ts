type PlainObject = Record<string, unknown>

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export function patchDeep<T>(original: T, patch: DeepPartial<T>): T {
  if (!isPlainObject(original) || !isPlainObject(patch)) {
    return patch as T
  }

  let changed = false
  const result: PlainObject = { ...original }

  for (const key of Object.keys(patch)) {
    const patchValue = patch[key as keyof typeof patch]
    const originalValue = (original as PlainObject)[key]

    if (patchValue === undefined) {
      continue
    }

    let nextValue: unknown

    if (isPlainObject(originalValue) && isPlainObject(patchValue)) {
      nextValue = patchDeep(originalValue, patchValue)
    } else {
      nextValue = patchValue
    }

    if (nextValue !== originalValue) {
      result[key] = nextValue
      changed = true
    }
  }

  return (changed ? result : original) as T
}
