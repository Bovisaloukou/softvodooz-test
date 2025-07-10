"use client"

import { useState, useEffect } from "react"

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>(apiCall: () => Promise<T>, dependencies: any[] = []): UseApiState<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let isCancelled = false

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }))
        const result = await apiCall()

        if (!isCancelled) {
          setState({ data: result, loading: false, error: null })
        }
      } catch (error) {
        if (!isCancelled) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error.message : "Une erreur est survenue",
          })
        }
      }
    }

    fetchData()

    return () => {
      isCancelled = true
    }
  }, dependencies)

  return state
}
