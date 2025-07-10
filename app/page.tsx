"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"
import { Pagination } from "@/components/pagination"
import { HeroSection } from "@/components/hero-section"
import { useApi } from "@/hooks/use-api"
import { usePagination } from "@/hooks/use-pagination"
import { api } from "@/lib/api"
import { BookOpen, User, Calendar, ArrowRight, Sparkles } from "lucide-react"

export default function HomePage() {
  const { data: allShelves, loading, error } = useApi(() => api.getBookshelves({ limit: 100 }))

  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData: shelves,
    totalItems,
    setCurrentPage,
    setItemsPerPage,
  } = usePagination({
    data: allShelves || [],
    initialItemsPerPage: 12,
  })

  if (loading) {
    return (
      <div className="min-h-screen">
        <HeroSection />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <LoadingSpinner size="lg" text="Chargement de vos étagères..." />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <HeroSection />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <ErrorMessage
            title="Impossible de charger les étagères"
            message={error}
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    )
  }

  if (!allShelves || allShelves.length === 0) {
    return (
      <div className="min-h-screen">
        <HeroSection />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Aucune étagère trouvée</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Vous n'avez pas encore d'étagères dans votre bibliothèque. Commencez par en créer une !
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Shelves Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Vos collections
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Mes <span className="text-gradient">Étagères</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez vos collections de livres organisées par étagères
            </p>
            {allShelves.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-6 text-gray-500">
                <User className="h-4 w-4" />
                <span>Bibliothèque de {allShelves[0].user.name}</span>
              </div>
            )}
          </div>

          {/* Shelves Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
            {shelves.map((shelf, index) => (
              <Link key={shelf.id} href={`/shelf/${shelf.id}`} className="group">
                <Card
                  className={`hover-lift bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 stagger-item`}
                >
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
                    <CardDescription className="text-gray-600">Créée par {shelf.user.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>Modifiée le {new Date(shelf.last_modified * 1000).toLocaleDateString("fr-FR")}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="animate-fade-in-up">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
