"use client"

import { useState, useMemo } from "react"
import type { Book } from "@/lib/types"
import type { BookFilters } from "@/components/book-filters"
import { getBookPageCount } from "@/lib/utils"

export function useBookSearchAndFilters(books: Book[]) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<BookFilters>({
    sortBy: "title",
    showFreeOnly: false,
    showAdultOnly: null,
    language: null,
  })

  const processedBooks = useMemo(() => {
    let result = [...books]

    // Appliquer la recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter((book) => {
        return (
          book.title.toLowerCase().includes(query) ||
          book.authors.some((author) => author.name.toLowerCase().includes(query)) ||
          book.description?.toLowerCase().includes(query) ||
          book.publisher?.toLowerCase().includes(query) ||
          book.isbn?.toLowerCase().includes(query)
        )
      })
    }

    // Appliquer les filtres
    if (filters.showFreeOnly) {
      result = result.filter((book) => book.is_free)
    }

    if (filters.showAdultOnly !== null) {
      result = result.filter((book) => book.adult === filters.showAdultOnly)
    }

    if (filters.language) {
      result = result.filter((book) => book.language === filters.language)
    }

    // Appliquer le tri
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "author":
          const authorA = a.authors[0]?.name || ""
          const authorB = b.authors[0]?.name || ""
          return authorA.localeCompare(authorB)
        case "pages":
          const pagesA = getBookPageCount(a) || 0
          const pagesB = getBookPageCount(b) || 0
          return pagesB - pagesA // Décroissant
        default:
          return 0
      }
    })

    return result
  }, [books, searchQuery, filters])

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    processedBooks,
    totalResults: processedBooks.length,
  }
}
