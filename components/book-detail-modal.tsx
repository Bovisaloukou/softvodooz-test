"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Book } from "@/lib/types";
import {
  BookOpen,
  User,
  Globe,
  Hash,
  Building,
  FileText,
  BookMarked,
  Calendar,
  ShoppingCart,
  Eye,
  DollarSign,
  Tag,
} from "lucide-react";
import {
  getBookPageCount,
  formatBookPrice,
  formatPublicationDate,
  getAuthorRoleLabel,
  canBuyBook,
  canSampleBook,
} from "@/lib/utils";

interface BookDetailModalProps {
  book: Book;
  children: React.ReactNode;
}

export function BookDetailModal({ book, children }: BookDetailModalProps) {
  const [open, setOpen] = useState(false);

  const cleanDescription = book.description?.replace(/<[^>]*>/g, "");
  const pageCount = getBookPageCount(book);
  const price = formatBookPrice(book);
  const publicationDate = formatPublicationDate(book);
  const hasSubjects =
    (book.subjects?.bisac?.length ?? 0) > 0 ||
    (book.subjects?.thema?.length ?? 0) > 0 ||
    (book.subjects?.clil?.length ?? 0) > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{book.title}</DialogTitle>
          <DialogDescription className="text-lg">
            {book.authors.map((author, index) => (
              <span key={author.id}>
                {author.name}
                {getAuthorRoleLabel(author.role) && (
                  <span className="text-sm text-muted-foreground ml-1">
                    ({getAuthorRoleLabel(author.role)})
                  </span>
                )}
                {index < book.authors.length - 1 && ", "}
              </span>
            ))}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-8">
            <div className="flex gap-8">
              {/* Image du livre */}
              <div className="flex-shrink-0">
                <div className="w-48 aspect-[3/4] bg-muted rounded-xl overflow-hidden relative shadow-lg">
                  {book.image ? (
                    <img
                      src={book.image || "/placeholder.svg"}
                      alt={`Couverture de ${book.title}`}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <BookOpen className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}

                  {/* Badge pour les pages */}
                  {pageCount && (
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant="secondary"
                        className="text-sm bg-black/70 text-white"
                      >
                        {pageCount}p
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-4 space-y-2">
                  {canSampleBook(book) && (
                    <Button variant="outline" className="w-full bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      Lire un extrait
                    </Button>
                  )}
                  {canBuyBook(book) && price && (
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Acheter {price}
                    </Button>
                  )}
                  {book.is_free && (
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Lire gratuitement
                    </Button>
                  )}
                </div>
              </div>

              {/* Informations détaillées */}
              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  {/* Auteurs */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Auteur(s)</span>
                    </div>
                    <div className="pl-6 space-y-1">
                      {book.authors.map((author) => (
                        <div
                          key={author.id}
                          className="flex items-center gap-2"
                        >
                          <span>{author.name}</span>
                          {getAuthorRoleLabel(author.role) && (
                            <Badge variant="outline" className="text-xs">
                              {getAuthorRoleLabel(author.role)}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Éditeur */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Éditeur</span>
                    </div>
                    <div className="pl-6">{book.publisher}</div>
                  </div>

                  {/* ISBN */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">ISBN</span>
                    </div>
                    <div className="pl-6 font-mono text-xs">{book.isbn}</div>
                  </div>

                  {/* Langue */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Langue</span>
                    </div>
                    <div className="pl-6 uppercase">{book.language}</div>
                  </div>

                  {/* Pages */}
                  {pageCount && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <BookMarked className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">Pages</span>
                      </div>
                      <div className="pl-6">{pageCount} pages</div>
                    </div>
                  )}

                  {/* Format */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Format</span>
                    </div>
                    <div className="pl-6 uppercase">{book.form}</div>
                  </div>

                  {/* Date de publication */}
                  {publicationDate && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">Publication</span>
                      </div>
                      <div className="pl-6">{publicationDate}</div>
                    </div>
                  )}

                  {/* Prix */}
                  {price && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">Prix</span>
                      </div>
                      <div className="pl-6 font-semibold text-lg text-blue-600">
                        {price}
                      </div>
                    </div>
                  )}
                </div>

                {/* Badges */}
                <div className="flex gap-2 flex-wrap">
                  {book.is_free && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      Gratuit
                    </Badge>
                  )}
                  {book.adult && (
                    <Badge
                      variant="outline"
                      className="border-red-200 text-red-700"
                    >
                      18+
                    </Badge>
                  )}
                  <Badge variant="outline" className="uppercase">
                    {book.form}
                  </Badge>
                  {pageCount && (
                    <Badge variant="outline">{pageCount} pages</Badge>
                  )}
                  {canSampleBook(book) && (
                    <Badge
                      variant="outline"
                      className="text-blue-600 border-blue-200"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Aperçu disponible
                    </Badge>
                  )}
                  {canBuyBook(book) && (
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-200"
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Achat disponible
                    </Badge>
                  )}
                </div>

                {/* Sujets */}
                {hasSubjects && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Catégories</span>
                    </div>

                    <div className="pl-6 flex flex-wrap gap-1">
                      {book.subjects?.bisac?.map((s) => (
                        <Badge key={s} variant="outline" className="text-xs">
                          {s}
                        </Badge>
                      ))}

                      {book.subjects?.thema?.map((s) => (
                        <Badge
                          key={s}
                          variant="outline"
                          className="text-xs bg-blue-50 text-blue-700"
                        >
                          {s}
                        </Badge>
                      ))}

                      {book.subjects?.clil?.map((s) => (
                        <Badge
                          key={s}
                          variant="outline"
                          className="text-xs bg-purple-50 text-purple-700"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {cleanDescription && (
              <div className="space-y-3">
                <h4 className="text-lg font-semibold">Description</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cleanDescription}
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
