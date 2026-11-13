export type StorageType = "local" | "session"

// Storage can be unavailable or throw (private windows, blocked site data),
// so reads fall back to null and failed writes are ignored
const getStorage = (type: StorageType) =>
  type === "local" ? localStorage : sessionStorage

export const getStorageItem = (type: StorageType, key: string) => {
  try {
    return getStorage(type).getItem(key)
  } catch {
    return null
  }
}

export const setStorageItem = (
  type: StorageType,
  key: string,
  value: string
) => {
  try {
    getStorage(type).setItem(key, value)
  } catch {
    // Nothing to do, the value just won't be remembered
  }
}
