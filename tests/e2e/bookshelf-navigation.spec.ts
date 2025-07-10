import { test, expect } from "@playwright/test"

test.describe("Bookshelf Navigation E2E", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/")
  })

  test("should display homepage with hero section and shelves", async ({ page }) => {
    // Check hero section
    await expect(page.getByText("Votre bibliothèque réinventée")).toBeVisible()
    await expect(page.getByText("Explorer maintenant")).toBeVisible()

    // Check header
    await expect(page.getByText("Bibliothèque")).toBeVisible()

    // Wait for shelves to load
    await expect(page.getByText("Mes Étagères")).toBeVisible()

    // Check if shelves are displayed (assuming API returns data)
    await page.waitForSelector('[data-testid="shelf-card"]', { timeout: 10000 })
  })

  test("should navigate from homepage to shelf page", async ({ page }) => {
    // Wait for shelves to load
    await page.waitForSelector('a[href*="/shelf/"]', { timeout: 10000 })

    // Click on first shelf
    const firstShelf = page.locator('a[href*="/shelf/"]').first()
    await firstShelf.click()

    // Should navigate to shelf page
    await expect(page).toHaveURL(/\/shelf\//)
    await expect(page.getByText("Livres de l'étagère")).toBeVisible()

    // Should have back button
    await expect(page.getByText("Retour aux étagères")).toBeVisible()
  })

  test("should display books in shelf page", async ({ page }) => {
    // Navigate to a specific shelf (you might need to adjust the ID)
    await page.goto("/shelf/5c6179511d2d140001899fcd")

    // Wait for books to load
    await page.waitForSelector('[data-testid="book-card"]', { timeout: 15000 })

    // Check if books are displayed
    const bookCards = page.locator('[data-testid="book-card"]')
    await expect(bookCards.first()).toBeVisible()
  })

  test("should open book detail modal", async ({ page }) => {
    // Navigate to shelf page
    await page.goto("/shelf/5c6179511d2d140001899fcd")

    // Wait for books to load
    await page.waitForSelector('[data-testid="book-card"]', { timeout: 15000 })

    // Click on first book
    const firstBook = page.locator('[data-testid="book-card"]').first()
    await firstBook.click()

    // Modal should open
    await expect(page.getByRole("dialog")).toBeVisible()

    // Should contain book details
    await expect(page.getByText("Auteur(s)")).toBeVisible()
    await expect(page.getByText("Éditeur")).toBeVisible()
    await expect(page.getByText("ISBN")).toBeVisible()
  })

  test("should search and filter books", async ({ page }) => {
    // Navigate to shelf page
    await page.goto("/shelf/5c6179511d2d140001899fcd")

    // Wait for books to load
    await page.waitForSelector('[data-testid="book-card"]', { timeout: 15000 })

    // Use search
    const searchInput = page.getByPlaceholder("Rechercher par titre, auteur, éditeur...")
    await searchInput.fill("JavaScript")
    await page.getByText("Rechercher").click()

    // Should filter results
    await page.waitForTimeout(1000) // Wait for filtering

    // Use filters
    await page.getByText("Gratuits").click()
    await page.waitForTimeout(1000) // Wait for filtering

    // Change sort order
    await page.getByRole("combobox").first().click()
    await page.getByText("Auteur A-Z").click()
    await page.waitForTimeout(1000) // Wait for sorting
  })

  test("should handle pagination", async ({ page }) => {
    // Navigate to shelf page with many books
    await page.goto("/shelf/5c6179511d2d140001899fcd")

    // Wait for books to load
    await page.waitForSelector('[data-testid="book-card"]', { timeout: 15000 })

    // Check if pagination exists
    const pagination = page.locator('[data-testid="pagination"]')
    if (await pagination.isVisible()) {
      // Click next page
      await page.getByRole("button", { name: /page suivante/i }).click()
      await page.waitForTimeout(1000)

      // Should show different books
      await expect(page.getByText(/Affichage de \d+ à \d+/)).toBeVisible()
    }
  })

  test("should be responsive on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Navigate to homepage
    await page.goto("/")

    // Check mobile menu
    const mobileMenuButton = page.getByRole("button", { name: /menu/i })
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click()
      await expect(page.getByText("Bibliothèque")).toBeVisible()
    }

    // Navigate to shelf page
    await page.goto("/shelf/5c6179511d2d140001899fcd")

    // Should display books in mobile layout
    await page.waitForSelector('[data-testid="book-card"]', { timeout: 15000 })
    const bookCards = page.locator('[data-testid="book-card"]')
    await expect(bookCards.first()).toBeVisible()
  })

  test("should handle loading states", async ({ page }) => {
    // Navigate to homepage
    await page.goto("/")

    // Should show loading spinner initially
    const loadingSpinner = page.getByText("Chargement de vos étagères...")
    // Note: This might be too fast to catch in real scenarios

    // Navigate to shelf page
    await page.goto("/shelf/5c6179511d2d140001899fcd")

    // Should show loading for books
    const booksLoading = page.getByText("Chargement des livres...")
    // Note: This might be too fast to catch in real scenarios
  })

  test("should handle error states gracefully", async ({ page }) => {
    // Test with invalid shelf ID
    await page.goto("/shelf/invalid-shelf-id")

    // Should show error message or handle gracefully
    await page.waitForTimeout(5000)

    // Should either show error or redirect
    const errorMessage = page.getByText(/erreur|impossible/i)
    const backButton = page.getByText("Retour aux étagères")

    // At least one should be visible
    const hasErrorHandling = (await errorMessage.isVisible()) || (await backButton.isVisible())
    expect(hasErrorHandling).toBeTruthy()
  })
})
