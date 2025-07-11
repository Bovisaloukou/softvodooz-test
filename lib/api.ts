import type { Bookshelf, Book, PaginationParams } from "./types"

const API_BASE_URL = "https://api.glose.com"
const USER_ID = "5a8411b53ed02c04187ff02a"

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)

    if (!response.ok) {
      throw new ApiError(response.status, `API Error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new Error(`Network error: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export const api = {
  async getBookshelves(params?: PaginationParams): Promise<Bookshelf[]> {
    const searchParams = new URLSearchParams()
    if (params?.offset) searchParams.set("offset", params.offset.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())

    const query = searchParams.toString() ? `?${searchParams.toString()}` : ""
    return fetchApi<Bookshelf[]>(`/users/${USER_ID}/shelves${query}`)
  },

  async getShelfBooks(shelfId: string, params?: PaginationParams): Promise<string[]> {
    const searchParams = new URLSearchParams()
    if (params?.offset) searchParams.set("offset", params.offset.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())

    const query = searchParams.toString() ? `?${searchParams.toString()}` : ""
    return fetchApi<string[]>(`/shelves/${shelfId}/forms${query}`)
  },

  async getBookDetails(formId: string): Promise<Book> {
    return fetchApi<Book>(`/forms/${formId}`)
  },
}
