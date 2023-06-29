/** Converts non nullable type objects to nullable.
 * Useful since the DB resets values with null, but outputs undefined to client
 */
type Nullable<T> = {
  [K in keyof T]: T[K] extends object ? Nullable<T[K]> | null : T[K] | null
}
