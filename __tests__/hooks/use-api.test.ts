import { renderHook, waitFor } from "@testing-library/react"
import { useApi } from "@/hooks/use-api"
import jest from "jest" // Import jest to declare the variable

// Mock d'une fonction API
const mockApiCall = jest.fn()

describe("useApi", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should return loading state initially", () => {
    mockApiCall.mockImplementation(() => new Promise(() => {})) // Promise qui ne se résout jamais

    const { result } = renderHook(() => useApi(mockApiCall))

    expect(result.current.loading).toBe(true)
    expect(result.current.data).toBe(null)
    expect(result.current.error).toBe(null)
  })

  it("should return data when API call succeeds", async () => {
    const mockData = { id: "1", title: "Test Book" }
    mockApiCall.mockResolvedValue(mockData)

    const { result } = renderHook(() => useApi(mockApiCall))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toEqual(mockData)
    expect(result.current.error).toBe(null)
  })

  it("should return error when API call fails", async () => {
    const mockError = new Error("API Error")
    mockApiCall.mockRejectedValue(mockError)

    const { result } = renderHook(() => useApi(mockApiCall))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toBe(null)
    expect(result.current.error).toBe("API Error")
  })

  it("should refetch when dependencies change", async () => {
    mockApiCall.mockResolvedValue({ data: "first" })

    const { result, rerender } = renderHook(({ dep }) => useApi(mockApiCall, [dep]), { initialProps: { dep: "first" } })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(mockApiCall).toHaveBeenCalledTimes(1)

    // Change dependency
    mockApiCall.mockResolvedValue({ data: "second" })
    rerender({ dep: "second" })

    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledTimes(2)
    })
  })
})
