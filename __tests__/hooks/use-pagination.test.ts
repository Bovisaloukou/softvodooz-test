import { renderHook, act } from "@testing-library/react"
import { usePagination } from "@/hooks/use-pagination"

const mockData = Array.from({ length: 50 }, (_, i) => ({ id: i, name: `Item ${i}` }))

describe("usePagination", () => {
  it("should initialize with correct default values", () => {
    const { result } = renderHook(() => usePagination({ data: mockData }))

    expect(result.current.currentPage).toBe(1)
    expect(result.current.itemsPerPage).toBe(24)
    expect(result.current.totalPages).toBe(3) // 50 items / 24 per page = 3 pages
    expect(result.current.totalItems).toBe(50)
    expect(result.current.paginatedData).toHaveLength(24)
  })

  it("should initialize with custom itemsPerPage", () => {
    const { result } = renderHook(() => usePagination({ data: mockData, initialItemsPerPage: 10 }))

    expect(result.current.itemsPerPage).toBe(10)
    expect(result.current.totalPages).toBe(5) // 50 items / 10 per page = 5 pages
    expect(result.current.paginatedData).toHaveLength(10)
  })

  it("should change page correctly", () => {
    const { result } = renderHook(() => usePagination({ data: mockData }))

    act(() => {
      result.current.setCurrentPage(2)
    })

    expect(result.current.currentPage).toBe(2)
    expect(result.current.paginatedData).toHaveLength(24)
    expect(result.current.paginatedData[0]).toEqual({ id: 24, name: "Item 24" })
  })

  it("should handle last page with fewer items", () => {
    const { result } = renderHook(() => usePagination({ data: mockData }))

    act(() => {
      result.current.setCurrentPage(3) // Last page
    })

    expect(result.current.currentPage).toBe(3)
    expect(result.current.paginatedData).toHaveLength(2) // 50 - (2 * 24) = 2 items
  })

  it("should reset to page 1 when changing items per page", () => {
    const { result } = renderHook(() => usePagination({ data: mockData }))

    act(() => {
      result.current.setCurrentPage(2)
    })

    expect(result.current.currentPage).toBe(2)

    act(() => {
      result.current.setItemsPerPage(10)
    })

    expect(result.current.currentPage).toBe(1)
    expect(result.current.itemsPerPage).toBe(10)
  })

  it("should not allow invalid page numbers", () => {
    const { result } = renderHook(() => usePagination({ data: mockData }))

    act(() => {
      result.current.setCurrentPage(0) // Invalid
    })

    expect(result.current.currentPage).toBe(1)

    act(() => {
      result.current.setCurrentPage(999) // Too high
    })

    expect(result.current.currentPage).toBe(3) // Max page
  })
})
