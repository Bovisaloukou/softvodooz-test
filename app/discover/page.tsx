"use client"

import { useState, useEffect } from "react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"
import { BooksGrid } from "@/components/books-grid"
import { useApi } from "@/hooks/use-api"
import { api } from "@/lib/api"
import { Compass } from "lucide-react"

export default function DiscoverPage() {
  const { data: shelves, loading: shelvesLoading, error: shelvesError } = useApi(() => api.getBookshelves({ limit: 100 }))
  const [allBookIds, setAllBookIds] = useState<string[]>([])
  const [loadingBooks, setLoadingBooks] = useState(true)
  const [booksError, setBooksError] = useState<string | null>(null)

  useEffect(() => {
    if (!shelves || shelves.length === 0) return

    const fetchAllBookIds = async () => {
      setLoadingBooks(true)
      setBooksError(null)
      try {
        const results = await Promise.all(
          shelves.map((shelf) => api.getShelfBooks(shelf.id, { limit: 100 }))
        )
        const uniqueIds = [...new Set(results.flat())]
        setAllBookIds(uniqueIds)
      } catch (err) {
        setBooksError(err instanceof Error ? err.message : "Erreur lors du chargement des livres")
      } finally {
        setLoadingBooks(false)
      }
    }

    fetchAllBookIds()
  }, [shelves])

  const loading = shelvesLoading || loadingBooks
  const error = shelvesError || booksError

  if (loading && allBookIds.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <LoadingSpinner size="lg" text="Chargement de tous les livres..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ErrorMessage
          title="Impossible de charger les livres"
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
            <Compass className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Découvrir
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explorez l'ensemble des livres de toutes vos étagères en un seul endroit.
          </p>
          {allBookIds.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {allBookIds.length} livre(s) disponible(s) dans {shelves?.length} étagère(s)
            </p>
          )}
        </div>

        <BooksGrid bookIds={allBookIds} />
      </div>
    </div>
  )
}
