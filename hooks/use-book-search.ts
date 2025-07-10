"use client"

import { useState, useMemo } from "react"
import type { Book } from "@/lib/types"

export function useBookSearch(books: Book[]) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) {
      return books
    }

    const query = searchQuery.toLowerCase().trim()

    return books.filter((book) => {
      // Recherche dans le titre
      if (book.title.toLowerCase().includes(query)) {
        return true
      }

      // Recherche dans les auteurs
      if (book.authors.some((author) => author.name.toLowerCase().includes(query))) {
        return true
      }

      // Recherche dans la description
      if (book.description?.toLowerCase().includes(query)) {
        return true
      }

      // Recherche dans l'éditeur
      if (book.publisher?.toLowerCase().includes(query)) {
        return true
      }

      // Recherche dans l'ISBN
      if (book.isbn?.toLowerCase().includes(query)) {
        return true
      }

      return false
    })
  }, [books, searchQuery])

  return {
    searchQuery,
    setSearchQuery,
    filteredBooks,
    hasResults: filteredBooks.length > 0,
    totalResults: filteredBooks.length,
  }
}
