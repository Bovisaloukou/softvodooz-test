"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Book } from "@/lib/types"
import { SlidersHorizontal, X } from "lucide-react"

interface BookFiltersProps {
  books: Book[]
  onFilterChange: (filters: BookFilters) => void
  activeFilters: BookFilters
}

export interface BookFilters {
  sortBy: "title" | "author" | "pages"
  showFreeOnly: boolean
  showAdultOnly: boolean | null // null = tous, true = adulte seulement, false = non-adulte seulement
  language: string | null
}

export function BookFilters({ books, onFilterChange, activeFilters }: BookFiltersProps) {
  const languages = Array.from(new Set(books.map((book) => book.language))).filter(Boolean)
  const hasActiveFilters = activeFilters.showFreeOnly || activeFilters.showAdultOnly !== null || activeFilters.language

  const resetFilters = () => {
    onFilterChange({
      sortBy: "title",
      showFreeOnly: false,
      showAdultOnly: null,
      language: null,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filtres :</span>
        </div>

        {/* Tri */}
        <Select
          value={activeFilters.sortBy}
          onValueChange={(value: BookFilters["sortBy"]) => onFilterChange({ ...activeFilters, sortBy: value })}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Titre A-Z</SelectItem>
            <SelectItem value="author">Auteur A-Z</SelectItem>
            <SelectItem value="pages">Nombre de pages</SelectItem>
          </SelectContent>
        </Select>

        {/* Langue */}
        <Select
          value={activeFilters.language || "all"}
          onValueChange={(value) => onFilterChange({ ...activeFilters, language: value === "all" ? null : value })}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Langue" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filtres rapides */}
        <div className="flex gap-2">
          <Badge
            variant={activeFilters.showFreeOnly ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onFilterChange({ ...activeFilters, showFreeOnly: !activeFilters.showFreeOnly })}
          >
            Gratuits
          </Badge>

          <Badge
            variant={activeFilters.showAdultOnly === true ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() =>
              onFilterChange({
                ...activeFilters,
                showAdultOnly: activeFilters.showAdultOnly === true ? null : true,
              })
            }
          >
            18+
          </Badge>
        </div>

        {/* Reset */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <X className="h-3 w-3 mr-1" />
            Réinitialiser
          </Button>
        )}
      </div>
    </div>
  )
}
