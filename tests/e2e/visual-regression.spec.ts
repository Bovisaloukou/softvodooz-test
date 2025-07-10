import { test, expect } from "@playwright/test"

test.describe("Visual Regression Tests", () => {
  test("homepage visual test", async ({ page }) => {
    await page.goto("/")

    // Wait for content to load
    await page.waitForSelector("h1", { timeout: 10000 })

    // Take screenshot
    await expect(page).toHaveScreenshot("homepage.png")
  })

  test("shelf page visual test", async ({ page }) => {
    await page.goto("/shelf/5c6179511d2d140001899fcd")

    // Wait for books to load
    await page.waitForSelector('[data-testid="book-card"]', { timeout: 15000 })

    // Take screenshot
    await expect(page).toHaveScreenshot("shelf-page.png")
  })

  test("book modal visual test", async ({ page }) => {
    await page.goto("/shelf/5c6179511d2d140001899fcd")

    // Wait for books and click first one
    await page.waitForSelector('[data-testid="book-card"]', { timeout: 15000 })
    await page.locator('[data-testid="book-card"]').first().click()

    // Wait for modal
    await page.waitForSelector('[role="dialog"]')

    // Take screenshot
    await expect(page).toHaveScreenshot("book-modal.png")
  })

  test("mobile homepage visual test", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto("/")

    // Wait for content
    await page.waitForSelector("h1", { timeout: 10000 })

    // Take screenshot
    await expect(page).toHaveScreenshot("homepage-mobile.png")
  })
})
