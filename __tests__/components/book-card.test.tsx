import type React from "react"
import { render, screen } from "@testing-library/react"
import { BookCard } from "@/components/book-card"
import type { Book } from "@/lib/types"
import jest from "jest" // Import jest to fix the undeclared variable error

// Mock du modal component
jest.mock("@/components/book-detail-modal", () => ({
  BookDetailModal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

const mockBook: Book = {
  id: "1",
  title: "Test Book Title",
  authors: [
    { id: "1", name: "John Doe", slug: "john-doe" },
    { id: "2", name: "Jane Smith", slug: "jane-smith" },
  ],
  description: "This is a test book description with <b>HTML</b> tags.",
  language: "en",
  publisher: "Test Publisher",
  isbn: "978-0123456789",
  is_free: true,
  adult: false,
  form: "ebook",
  book: { id: "1", slug: "test-book" },
  can: { sample: true },
  subjects: { bisac: [], clil: [] },
  tags: [],
  image: "https://example.com/book-cover.jpg",
  extents: { gl_pages: 250 },
}

describe("BookCard", () => {
  it("should render book title", () => {
    render(<BookCard book={mockBook} />)

    expect(screen.getByText("Test Book Title")).toBeInTheDocument()
  })

  it("should render authors", () => {
    render(<BookCard book={mockBook} />)

    expect(screen.getByText("John Doe, Jane Smith")).toBeInTheDocument()
  })

  it("should render cleaned description", () => {
    render(<BookCard book={mockBook} />)

    // HTML tags should be stripped
    expect(screen.getByText(/This is a test book description with HTML tags/)).toBeInTheDocument()
  })

  it("should render page count badge", () => {
    render(<BookCard book={mockBook} />)

    expect(screen.getByText("250p")).toBeInTheDocument()
  })

  it("should render language", () => {
    render(<BookCard book={mockBook} />)

    expect(screen.getByText("EN")).toBeInTheDocument()
  })

  it("should render form type", () => {
    render(<BookCard book={mockBook} />)

    expect(screen.getByText("EBOOK")).toBeInTheDocument()
  })

  it("should render free badge when book is free", () => {
    render(<BookCard book={mockBook} />)

    expect(screen.getByText("Gratuit")).toBeInTheDocument()
  })

  it("should render adult badge when book is adult", () => {
    const adultBook = { ...mockBook, adult: true }
    render(<BookCard book={adultBook} />)

    expect(screen.getByText("18+")).toBeInTheDocument()
  })

  it("should render publisher", () => {
    render(<BookCard book={mockBook} />)

    expect(screen.getByText("Test Publisher")).toBeInTheDocument()
  })

  it("should render book image with alt text", () => {
    render(<BookCard book={mockBook} />)

    const image = screen.getByAltText("Couverture de Test Book Title")
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute("src", "https://example.com/book-cover.jpg")
  })

  it("should render fallback icon when no image", () => {
    const bookWithoutImage = { ...mockBook, image: undefined }
    render(<BookCard book={bookWithoutImage} />)

    // Should render BookOpen icon as fallback
    expect(screen.getByTestId("book-open-icon") || screen.getByRole("img")).toBeInTheDocument()
  })

  it("should handle book without pages", () => {
    const bookWithoutPages = { ...mockBook, extents: undefined }
    render(<BookCard book={bookWithoutPages} />)

    // Should not crash and not show page count
    expect(screen.queryByText(/p$/)).not.toBeInTheDocument()
  })
})
