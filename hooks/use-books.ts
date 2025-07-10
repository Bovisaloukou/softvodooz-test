"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import type { Book } from "@/lib/types"

interface UseBooksState {
  books: Book[]
  loading: boolean
  error: string | null
  loadedCount: number
}

export function useBooks(bookIds: string[]): UseBooksState {
  const [state, setState] = useState<UseBooksState>({
    books: [],
    loading: true,
    error: null,
    loadedCount: 0,
  })

  useEffect(() => {
    if (!bookIds.length) {
      setState({ books: [], loading: false, error: null, loadedCount: 0 })
      return
    }

    let isCancelled = false
    const loadedBooks: Book[] = []

    const loadBooks = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }))

        // Charger les livres par batch pour éviter de surcharger l'API
        const batchSize = 5
        for (let i = 0; i < bookIds.length; i += batchSize) {
          if (isCancelled) break

          const batch = bookIds.slice(i, i + batchSize)
          const batchPromises = batch.map((id) => api.getBookDetails(id))

          try {
            const batchResults = await Promise.allSettled(batchPromises)

            batchResults.forEach((result, index) => {
              if (result.status === "fulfilled") {
                loadedBooks.push(result.value)
              } else {
                console.warn(`Failed to load book ${batch[index]}:`, result.reason)
              }
            })

            if (!isCancelled) {
              setState((prev) => ({
                ...prev,
                books: [...loadedBooks],
                loadedCount: loadedBooks.length,
                loading: i + batchSize >= bookIds.length ? false : true,
              }))
            }

            // Petite pause entre les batches pour ne pas surcharger l'API
            if (i + batchSize < bookIds.length) {
              await new Promise((resolve) => setTimeout(resolve, 100))
            }
          } catch (error) {
            console.warn(`Batch error for books ${i}-${i + batchSize}:`, error)
          }
        }

        if (!isCancelled) {
          setState((prev) => ({ ...prev, loading: false }))
        }
      } catch (error) {
        if (!isCancelled) {
          setState({
            books: [],
            loading: false,
            error: error instanceof Error ? error.message : "Erreur lors du chargement des livres",
            loadedCount: 0,
          })
        }
      }
    }

    loadBooks()

    return () => {
      isCancelled = true
    }
  }, [bookIds])

  return state
}
