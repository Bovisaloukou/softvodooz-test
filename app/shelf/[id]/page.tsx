"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"
import { BooksGrid } from "@/components/books-grid"
import { useApi } from "@/hooks/use-api"
import { api } from "@/lib/api"
import { ArrowLeft, BookOpen } from "lucide-react"

export default function ShelfPage() {
  const params = useParams()
  const shelfId = params.id as string

  const { data: bookIds, loading, error } = useApi(() => api.getShelfBooks(shelfId, { limit: 50 }), [shelfId])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <LoadingSpinner size="lg" text="Chargement des livres..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="space-y-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux étagères
            </Button>
          </Link>
          <ErrorMessage
            title="Impossible de charger les livres"
            message={error}
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    )
  }

  if (!bookIds || bookIds.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="space-y-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux étagères
            </Button>
          </Link>
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Étagère vide</h2>
            <p className="text-muted-foreground">Cette étagère ne contient aucun livre pour le moment.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux étagères
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Livres de l'étagère</h1>
          <p className="text-muted-foreground">{bookIds.length} livre(s) dans cette étagère</p>
        </div>

        <BooksGrid bookIds={bookIds} />
      </div>
    </div>
  )
}
