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

    return result
  } catch (error) {
    console.error(error)
  }
}

export default apiRequest
