"use client"

import { BookCard } from "./book-card"
import { LoadingSpinner } from "./loading-spinner"
import { SearchBar } from "./search-bar"
import { BookFilters } from "./book-filters"
import { Pagination } from "./pagination"
import { useBooks } from "@/hooks/use-books"
import { useBookSearchAndFilters } from "@/hooks/use-book-search-and-filters"
import { usePagination } from "@/hooks/use-pagination"
import { BookOpen, Search } from "lucide-react"

interface BooksGridProps {
  bookIds: string[]
}

export function BooksGrid({ bookIds }: BooksGridProps) {
  const { books, loading, error, loadedCount } = useBooks(bookIds)
  const { searchQuery, setSearchQuery, filters, setFilters, processedBooks, totalResults } =
    useBookSearchAndFilters(books)

  const { currentPage, totalPages, itemsPerPage, paginatedData, totalItems, setCurrentPage, setItemsPerPage } =
    usePagination({
      data: processedBooks,
      initialItemsPerPage: 24,
    })

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">{error}</p>
      </div>
    )
  }

  if (loading && books.length === 0) {
    return <LoadingSpinner size="lg" text="Chargement des livres..." />
  }

  if (books.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Aucun livre trouvé</h3>
        <p className="text-muted-foreground">Impossible de charger les détails des livres.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Barre de recherche et filtres */}
      {books.length > 0 && (
        <div className="space-y-4">
          <SearchBar onSearch={setSearchQuery} placeholder="Rechercher par titre, auteur, éditeur..." />

          <BookFilters books={books} onFilterChange={setFilters} activeFilters={filters} />

          {/* Résumé des résultats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              {searchQuery || filters.showFreeOnly || filters.showAdultOnly !== null || filters.language ? (
                <span>
                  {totalResults} résultat(s) trouvé(s)
                  {searchQuery && ` pour "${searchQuery}"`}
                </span>
              ) : (
                <span>{totalResults} livre(s) au total</span>
              )}
            </div>

            {loading && (
              <div className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                <span>
                  Chargement... {loadedCount}/{bookIds.length}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grille de livres paginée */}
      {paginatedData.length > 0 ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {paginatedData.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </>
      ) : searchQuery && !loading ? (
        <div className="text-center py-12">
          <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Aucun résultat</h3>
          <p className="text-muted-foreground">Aucun livre ne correspond à votre recherche "{searchQuery}"</p>
        </div>
      ) : null}
    </div>
  )
}
