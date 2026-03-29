/** Takes a db patch update like { "character/gold": 100 } and applies it to the source object, like Player
 * It is used so we can write optimistic updates in the same format as the Firebase updates, and type less code
 */
export function dbPatchToObj<T extends Record<string, any>>(
  source: T,
  updates: Record<string, any>
): T {
  const result = structuredClone(source)

  for (const [path, value] of Object.entries(updates)) {
    const keys = path.split("/")
    let current: any = result

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]

      if (
        typeof current[key] !== "object" ||
        current[key] === null ||
        Array.isArray(current[key])
      ) {
        current[key] = {}
      }

      current = current[key]
    }

    const lastKey = keys[keys.length - 1]

    if (value === null) {
      delete current[lastKey]
    } else {
      current[lastKey] = value
    }
  }

  return result
}
