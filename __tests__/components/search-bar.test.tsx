import { render, screen, fireEvent } from "@testing-library/react"
import { SearchBar } from "@/components/search-bar"
import jest from "jest"

describe("SearchBar", () => {
  const mockOnSearch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should render with placeholder text", () => {
    render(<SearchBar onSearch={mockOnSearch} />)

    expect(screen.getByPlaceholderText("Rechercher des livres...")).toBeInTheDocument()
  })

  it("should render with custom placeholder", () => {
    render(<SearchBar onSearch={mockOnSearch} placeholder="Custom placeholder" />)

    expect(screen.getByPlaceholderText("Custom placeholder")).toBeInTheDocument()
  })

  it("should call onSearch when form is submitted", () => {
    render(<SearchBar onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText("Rechercher des livres...")
    const button = screen.getByText("Rechercher")

    fireEvent.change(input, { target: { value: "test query" } })
    fireEvent.click(button)

    expect(mockOnSearch).toHaveBeenCalledWith("test query")
  })

  it("should call onSearch when Enter is pressed", () => {
    render(<SearchBar onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText("Rechercher des livres...")

    fireEvent.change(input, { target: { value: "test query" } })
    fireEvent.submit(input.closest("form")!)

    expect(mockOnSearch).toHaveBeenCalledWith("test query")
  })

  it("should trim whitespace from search query", () => {
    render(<SearchBar onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText("Rechercher des livres...")

    fireEvent.change(input, { target: { value: "  test query  " } })
    fireEvent.submit(input.closest("form")!)

    expect(mockOnSearch).toHaveBeenCalledWith("test query")
  })

  it("should show clear button when there is text", () => {
    render(<SearchBar onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText("Rechercher des livres...")

    // Initially no clear button
    expect(screen.queryByRole("button", { name: /clear/i })).not.toBeInTheDocument()

    fireEvent.change(input, { target: { value: "test" } })

    // Clear button should appear
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("should clear input and call onSearch with empty string when clear button is clicked", () => {
    render(<SearchBar onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText("Rechercher des livres...")

    fireEvent.change(input, { target: { value: "test" } })

    const clearButton = screen.getAllByRole("button")[0] // First button is clear, second is search
    fireEvent.click(clearButton)

    expect(input).toHaveValue("")
    expect(mockOnSearch).toHaveBeenCalledWith("")
  })

  it("should disable search button when input is empty", () => {
    render(<SearchBar onSearch={mockOnSearch} />)

    const searchButton = screen.getByText("Rechercher")

    expect(searchButton).toBeDisabled()

    const input = screen.getByPlaceholderText("Rechercher des livres...")
    fireEvent.change(input, { target: { value: "test" } })

    expect(searchButton).not.toBeDisabled()
  })
})
