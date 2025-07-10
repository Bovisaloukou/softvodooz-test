"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookDetailModal } from "./book-detail-modal"
import type { Book } from "@/lib/types"
import { BookOpen, User, Globe, FileText, Hash, Calendar, ShoppingCart, Eye } from "lucide-react"
import { getBookPageCount, formatBookPrice, formatPublicationDate, canBuyBook, canSampleBook } from "@/lib/utils"

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  // Nettoyer la description HTML pour l'affichage
  const cleanDescription = book.description
    ?.replace(/<[^>]*>/g, "")
    ?.substring(0, 120)
    ?.concat("...")

  const pageCount = getBookPageCount(book)
  const price = formatBookPrice(book)
  const publicationDate = formatPublicationDate(book)

  return (
    <BookDetailModal book={book}>
      <Card className="hover-lift bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col cursor-pointer">
        <CardHeader className="pb-3">
          <div className="aspect-[3/4] relative mb-3 bg-muted rounded-xl overflow-hidden">
            {book.image ? (
              <>
                <img
                  src={book.image || "/placeholder.svg"}
                  alt={`Couverture de ${book.title}`}
                  className="object-cover w-full h-full"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    const fallback = target.nextElementSibling as HTMLElement
                    if (fallback) fallback.classList.remove("hidden")
                  }}
                />
                <div className="hidden absolute inset-0 flex items-center justify-center bg-muted">
                  <BookOpen className="h-12 w-12 text-muted-foreground" />
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <BookOpen className="h-12 w-12 text-muted-foreground" />
              </div>
            )}

            {/* Badges overlay */}
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              {pageCount && (
                <Badge variant="secondary" className="text-xs bg-black/70 text-white">
                  {pageCount}p
                </Badge>
              )}
              {price && (
                <Badge variant="secondary" className="text-xs bg-green-600/90 text-white font-semibold">
                  {price}
                </Badge>
              )}
            </div>

            {/* Actions overlay */}
            <div className="absolute bottom-2 left-2 flex gap-1">
              {canSampleBook(book) && (
                <Badge variant="outline" className="text-xs bg-white/90 text-gray-700 border-gray-300">
                  <Eye className="h-3 w-3 mr-1" />
                  Aperçu
                </Badge>
              )}
              {canBuyBook(book) && (
                <Badge variant="outline" className="text-xs bg-white/90 text-gray-700 border-gray-300">
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Achat
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-sm line-clamp-2 leading-tight text-gray-900" title={book.title}>
              {book.title}
            </h3>

            {book.authors && book.authors.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <User className="h-3 w-3 flex-shrink-0" />
                <span className="line-clamp-1" title={book.authors.map((a) => a.name).join(", ")}>
                  {book.authors.map((a) => a.name).join(", ")}
                </span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0 flex-1 flex flex-col justify-between space-y-3">
          {cleanDescription && (
            <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">{cleanDescription}</p>
          )}

          <div className="space-y-3">
            {/* Informations principales */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {book.language && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Globe className="h-3 w-3" />
                  <span className="uppercase">{book.language}</span>
                </div>
              )}

              {book.form && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <FileText className="h-3 w-3" />
                  <span className="uppercase">{book.form}</span>
                </div>
              )}

              {pageCount && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Hash className="h-3 w-3" />
                  <span>{pageCount} pages</span>
                </div>
              )}

              {publicationDate && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(book.publication_date! * 1000).getFullYear()}</span>
                </div>
              )}
            </div>

            {/* Badges et prix */}
            <div className="flex items-center gap-2 flex-wrap">
              {book.is_free && (
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                  Gratuit
                </Badge>
              )}

              {book.adult && (
                <Badge variant="outline" className="text-xs border-red-200 text-red-700">
                  18+
                </Badge>
              )}

              {price && !book.is_free && (
                <Badge variant="outline" className="text-xs font-semibold text-blue-700 border-blue-200">
                  {price}
                </Badge>
              )}
            </div>

            {/* Éditeur */}
            {book.publisher && (
              <div className="text-xs text-muted-foreground truncate">
                <span className="font-medium">Éditeur:</span> {book.publisher}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </BookDetailModal>
  )
}
