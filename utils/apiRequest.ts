type Method = "GET" | "POST" | "PUT" | "DELETE"

const apiRequest = async (url: string, data: any, method: Method = "GET") => {
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.error(`An error occurred while fetching the data from ${url}`)
    }

    const result = await response.json()

    return { data: result, status: response.status }
  } catch (error) {
    console.error(error)
  }
}

/** Posts and rejects on failure, so callers only ever get a successful response */
export const postOrThrow = async <T>(url: string, data: object): Promise<T> => {
  const response = await apiRequest(url, data, "POST")

  if (!response || response.data?.error) {
    throw new Error(response?.data?.error ?? "Something went wrong.")
  }

  return response.data
}

export default apiRequest
