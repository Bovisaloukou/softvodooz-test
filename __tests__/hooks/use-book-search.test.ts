import { renderHook, act } from "@testing-library/react"
import { useBookSearchAndFilters } from "@/hooks/use-book-search-and-filters"
import type { Book } from "@/lib/types"

const mockBooks: Book[] = [
  {
    id: "1",
    title: "JavaScript: The Good Parts",
    authors: [{ id: "1", name: "Douglas Crockford", slug: "douglas-crockford" }],
    description: "A book about JavaScript",
    language: "en",
    publisher: "O'Reilly",
    isbn: "978-0596517748",
    is_free: true,
    adult: false,
    form: "ebook",
    book: { id: "1", slug: "js-good-parts" },
    can: { sample: true },
    subjects: { bisac: [], clil: [] },
    tags: [],
    extents: { gl_pages: 176 },
  },
  {
    id: "2",
    title: "Clean Code",
    authors: [{ id: "2", name: "Robert Martin", slug: "robert-martin" }],
    description: "A book about writing clean code",
    language: "fr",
    publisher: "Prentice Hall",
    isbn: "978-0132350884",
    is_free: false,
    adult: false,
    form: "paperback",
    book: { id: "2", slug: "clean-code" },
    can: { sample: false },
    subjects: { bisac: [], clil: [] },
    tags: [],
    extents: { gl_pages: 464 },
  },
]

describe("useBookSearchAndFilters", () => {
  it("should return all books initially", () => {
    const { result } = renderHook(() => useBookSearchAndFilters(mockBooks))

    expect(result.current.processedBooks).toHaveLength(2)
    expect(result.current.totalResults).toBe(2)
    expect(result.current.searchQuery).toBe("")
  })

  it("should filter books by search query", () => {
    const { result } = renderHook(() => useBookSearchAndFilters(mockBooks))

    act(() => {
      result.current.setSearchQuery("JavaScript")
    })

    expect(result.current.processedBooks).toHaveLength(1)
    expect(result.current.processedBooks[0].title).toBe("JavaScript: The Good Parts")
    expect(result.current.totalResults).toBe(1)
  })

  it("should filter books by author name", () => {
    const { result } = renderHook(() => useBookSearchAndFilters(mockBooks))

    act(() => {
      result.current.setSearchQuery("Robert")
    })

    expect(result.current.processedBooks).toHaveLength(1)
    expect(result.current.processedBooks[0].title).toBe("Clean Code")
  })

  it("should filter free books only", () => {
    const { result } = renderHook(() => useBookSearchAndFilters(mockBooks))

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        showFreeOnly: true,
      })
    })

    expect(result.current.processedBooks).toHaveLength(1)
    expect(result.current.processedBooks[0].is_free).toBe(true)
  })

  it("should filter by language", () => {
    const { result } = renderHook(() => useBookSearchAndFilters(mockBooks))

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        language: "fr",
      })
    })

    expect(result.current.processedBooks).toHaveLength(1)
    expect(result.current.processedBooks[0].language).toBe("fr")
  })

  it("should sort books by title", () => {
    const { result } = renderHook(() => useBookSearchAndFilters(mockBooks))

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        sortBy: "title",
      })
    })

    expect(result.current.processedBooks[0].title).toBe("Clean Code")
    expect(result.current.processedBooks[1].title).toBe("JavaScript: The Good Parts")
  })

  it("should sort books by pages (descending)", () => {
    const { result } = renderHook(() => useBookSearchAndFilters(mockBooks))

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        sortBy: "pages",
      })
    })

    expect(result.current.processedBooks[0].extents?.gl_pages).toBe(464)
    expect(result.current.processedBooks[1].extents?.gl_pages).toBe(176)
  })
})
