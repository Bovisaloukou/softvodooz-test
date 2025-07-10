import { api } from "@/lib/api"

// Integration tests with real API calls (can be run against staging/test environment)
describe("API Integration Tests", () => {
  // These tests can be skipped in CI if no test API is available
  const skipIfNoTestEnv = process.env.TEST_API_URL ? test : test.skip

  skipIfNoTestEnv("should fetch real bookshelves", async () => {
    const shelves = await api.getBookshelves({ limit: 5 })

    expect(Array.isArray(shelves)).toBe(true)
    if (shelves.length > 0) {
      expect(shelves[0]).toHaveProperty("id")
      expect(shelves[0]).toHaveProperty("title")
      expect(shelves[0]).toHaveProperty("user")
    }
  })

  skipIfNoTestEnv("should fetch books from shelf", async () => {
    // First get shelves
    const shelves = await api.getBookshelves({ limit: 1 })

    if (shelves.length > 0) {
      const bookIds = await api.getShelfBooks(shelves[0].id, { limit: 3 })

      expect(Array.isArray(bookIds)).toBe(true)

      if (bookIds.length > 0) {
        // Test fetching book details
        const book = await api.getBookDetails(bookIds[0])

        expect(book).toHaveProperty("id")
        expect(book).toHaveProperty("title")
        expect(book).toHaveProperty("authors")
        expect(Array.isArray(book.authors)).toBe(true)
      }
    }
  })

  skipIfNoTestEnv("should handle API errors gracefully", async () => {
    // Test with invalid shelf ID
    await expect(api.getShelfBooks("invalid-id")).rejects.toThrow()

    // Test with invalid book ID
    await expect(api.getBookDetails("invalid-id")).rejects.toThrow()
  })
})
