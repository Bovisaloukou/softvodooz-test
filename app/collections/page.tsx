"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"
import { useApi } from "@/hooks/use-api"
import { api } from "@/lib/api"
import { BookOpen, ArrowRight, Calendar, Library, Hash } from "lucide-react"

interface ShelfWithCount {
  id: string
  title: string
  slug: string
  last_modified: number
  user: { id: string; name: string; username: string; cover: string | null; image: string }
  bookCount: number | null
}

export default function CollectionsPage() {
  const { data: shelves, loading, error } = useApi(() => api.getBookshelves({ limit: 100 }))
  const [shelvesWithCounts, setShelvesWithCounts] = useState<ShelfWithCount[]>([])
  const [countsLoading, setCountsLoading] = useState(true)

  useEffect(() => {
    if (!shelves || shelves.length === 0) return

    const fetchCounts = async () => {
      setCountsLoading(true)
      const results = await Promise.all(
        shelves.map(async (shelf) => {
          try {
            const bookIds = await api.getShelfBooks(shelf.id, { limit: 100 })
            return { ...shelf, bookCount: bookIds.length }
          } catch {
            return { ...shelf, bookCount: null }
          }
        })
      )
      setShelvesWithCounts(results)
      setCountsLoading(false)
    }

    fetchCounts()
  }, [shelves])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <LoadingSpinner size="lg" text="Chargement des collections..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ErrorMessage
          title="Impossible de charger les collections"
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    )
  }

  const displayShelves = shelvesWithCounts.length > 0 ? shelvesWithCounts : (shelves || []).map(s => ({ ...s, bookCount: null }))
  const totalBooks = shelvesWithCounts.reduce((sum, s) => sum + (s.bookCount ?? 0), 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
            <Library className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Collections
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Toutes vos étagères et collections de livres.
          </p>
          {!countsLoading && shelvesWithCounts.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {displayShelves.length} collection(s) — {totalBooks} livre(s) au total
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayShelves.map((shelf) => (
            <Link key={shelf.id} href={`/shelf/${shelf.id}`} className="group">
              <Card className="hover-lift bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {shelf.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Créée par {shelf.user.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(shelf.last_modified * 1000).toLocaleDateString("fr-FR")}</span>
                    </div>
                    {shelf.bookCount !== null && (
                      <div className="flex items-center gap-1">
                        <Hash className="h-4 w-4" />
                        <span>{shelf.bookCount} livre(s)</span>
                      </div>
                    )}
                    {shelf.bookCount === null && countsLoading && (
                      <LoadingSpinner size="sm" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
