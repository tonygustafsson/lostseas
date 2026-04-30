/** Capitalizes the first letter of a string */
export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

/** Converts aVarLikeThis to "A var like this" */
export const snakeCaseToTitleCase = (str: string) =>
  str
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .replace(/^./, (c) => c.toUpperCase())
