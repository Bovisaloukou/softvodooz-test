import { api } from "@/lib/api"
import { jest } from "@jest/globals"

// Mock fetch
global.fetch = jest.fn()

describe("API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("getBookshelves", () => {
    it("should fetch bookshelves successfully", async () => {
      const mockShelves = [{ id: "1", title: "My Shelf", user: { name: "Test User" } }]
      ;(fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockShelves),
      })

      const result = await api.getBookshelves()

      expect(fetch).toHaveBeenCalledWith("https://api.glose.com/users/5a8411b53ed02c04187ff02a/shelves")
      expect(result).toEqual(mockShelves)
    })

    it("should handle pagination parameters", async () => {
      ;(fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([]),
      })

      await api.getBookshelves({ offset: 10, limit: 20 })

      expect(fetch).toHaveBeenCalledWith(
        "https://api.glose.com/users/5a8411b53ed02c04187ff02a/shelves?offset=10&limit=20",
      )
    })

    it("should throw error when API returns error status", async () => {
      ;(fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
      })

      await expect(api.getBookshelves()).rejects.toThrow("API Error: Not Found")
    })
  })

  describe("getShelfBooks", () => {
    it("should fetch shelf books successfully", async () => {
      const mockBookIds = ["book1", "book2"]
      ;(fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockBookIds),
      })

      const result = await api.getShelfBooks("shelf123")

      expect(fetch).toHaveBeenCalledWith("https://api.glose.com/shelves/shelf123/forms")
      expect(result).toEqual(mockBookIds)
    })
  })

  describe("getBookDetails", () => {
    it("should fetch book details successfully", async () => {
      const mockBook = {
        id: "book1",
        title: "Test Book",
        authors: [{ name: "Test Author" }],
      }
      ;(fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockBook),
      })

      const result = await api.getBookDetails("book1")

      expect(fetch).toHaveBeenCalledWith("https://api.glose.com/forms/book1")
      expect(result).toEqual(mockBook)
    })
  })

  it("should handle network errors", async () => {
    ;(fetch as jest.Mock).mockRejectedValue(new Error("Network error"))

    await expect(api.getBookshelves()).rejects.toThrow("Network error: Network error")
  })
})
