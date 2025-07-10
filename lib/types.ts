// Types basés sur les vraies données API avec attributs optionnels
export interface User {
  id: string
  name: string
  username: string
  cover: string | null
  image: string
}

export interface Bookshelf {
  id: string
  slug: string
  last_modified: number
  title: string
  user: User
}

export interface Author {
  id: string
  name: string
  slug: string
  role?: string // Rôle de l'auteur (A01, etc.)
}

export interface BookInfo {
  id: string
  slug: string
}

export interface BookSubjects {
  bisac: string[]
  clil: string[]
  thema?: string[] // Sujets thema
}

export interface BookCan {
  sample: boolean
  buy?: boolean // Capacité d'achat
}

export interface BookPrice {
  amount: number // Prix en centimes
  currency: string // Devise (USD, EUR, etc.)
  includes_taxes: boolean // Taxes incluses ou non
}

export interface BookExtents {
  pages?: number // Priorité 1
  gl_pages?: number // Priorité 2 (fallback)
  [key: string]: any // Pour d'autres propriétés d'extents possibles
}

export interface Book {
  id: string
  authors: Author[]
  book: BookInfo
  can: BookCan
  form: string
  language: string
  short_title: string
  title: string
  description: string
  isbn: string
  publisher: string
  /** Some API responses omit the `subjects` block entirely. */
  subjects?: BookSubjects
  tags: string[]
  image?: string // Optionnel car certains livres peuvent ne pas avoir d'image
  adult: boolean
  is_free: boolean
  extents?: BookExtents // Optionnel - contient le nombre de pages et autres infos
  price?: BookPrice // Prix avec devise et montant
  publication_date?: number // Date de publication (timestamp)
  rating?: number // Au cas où certains livres auraient une note
}

export interface PaginationParams {
  offset?: number
  limit?: number
}
