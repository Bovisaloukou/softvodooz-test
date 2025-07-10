import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Book } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Récupère le nombre de pages d'un livre en priorisant 'pages' puis 'gl_pages'
 */
export function getBookPageCount(book: Book): number | null {
  if (book.extents?.pages) {
    return book.extents.pages
  }
  if (book.extents?.gl_pages) {
    return book.extents.gl_pages
  }
  return null
}

/**
 * Formate le prix d'un livre avec la devise
 */
export function formatBookPrice(book: Book): string | null {
  if (!book.price || book.is_free) {
    return null
  }

  const { amount, currency } = book.price
  const price = amount / 100 // Convertir les centimes en unité principale

  // Formatage selon la devise
  const formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: currency === "JPY" ? 0 : 2, // Yen n'a pas de décimales
  })

  return formatter.format(price)
}

/**
 * Formate la date de publication
 */
export function formatPublicationDate(book: Book): string | null {
  if (!book.publication_date) {
    return null
  }

  const date = new Date(book.publication_date * 1000) // Timestamp en secondes
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/**
 * Récupère le rôle de l'auteur en format lisible
 */
export function getAuthorRoleLabel(role?: string): string | null {
  if (!role) return null

  const roleMap: Record<string, string> = {
    A01: "Auteur",
    A02: "Co-auteur",
    A03: "Auteur principal",
    B01: "Éditeur",
    B02: "Co-éditeur",
    E07: "Narrateur",
    A12: "Illustrateur",
    A13: "Photographe",
    B06: "Traducteur",
  }

  return roleMap[role] || role
}

/**
 * Vérifie si un livre peut être acheté
 */
export function canBuyBook(book: Book): boolean {
  return book.can.buy === true && !book.is_free
}

/**
 * Vérifie si un livre a un échantillon disponible
 */
export function canSampleBook(book: Book): boolean {
  return book.can.sample === true
}
