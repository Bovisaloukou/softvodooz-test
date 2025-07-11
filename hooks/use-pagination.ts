"use client"

import { useState, useMemo } from "react"

interface UsePaginationProps<T> {
  data: T[]
  initialItemsPerPage?: number
}

interface UsePaginationReturn<T> {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  paginatedData: T[]
  totalItems: number
  setCurrentPage: (page: number) => void
  setItemsPerPage: (itemsPerPage: number) => void
  goToFirstPage: () => void
  goToLastPage: () => void
  goToNextPage: () => void
  goToPreviousPage: () => void
}

export function usePagination<T>({ data, initialItemsPerPage = 24 }: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)

  const totalItems = data.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }, [data, currentPage, itemsPerPage])

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(validPage)
  }

  const goToFirstPage = () => handlePageChange(1)
  const goToLastPage = () => handlePageChange(totalPages)
  const goToNextPage = () => handlePageChange(currentPage + 1)
  const goToPreviousPage = () => handlePageChange(currentPage - 1)

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData,
    totalItems,
    setCurrentPage: handlePageChange,
    setItemsPerPage: handleItemsPerPageChange,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
  }
}
