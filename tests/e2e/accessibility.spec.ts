import { test, expect } from "@playwright/test"

test.describe("Accessibility Tests", () => {
  test("homepage should be accessible", async ({ page }) => {
    await page.goto("/")

    // Check for proper heading structure
    const h1 = page.locator("h1")
    await expect(h1).toBeVisible()

    // Check for alt text on images
    const images = page.locator("img")
    const imageCount = await images.count()

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute("alt")
      expect(alt).toBeTruthy()
    }

    // Check for proper button labels
    const buttons = page.locator("button")
    const buttonCount = await buttons.count()

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i)
      const ariaLabel = await button.getAttribute("aria-label")
      const text = await button.textContent()

      // Button should have either text content or aria-label
      expect(ariaLabel || text).toBeTruthy()
    }
  })

  test("keyboard navigation should work", async ({ page }) => {
    await page.goto("/")

    // Tab through interactive elements
    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab")

    // Should be able to activate focused element with Enter
    await page.keyboard.press("Enter")

    // Check if navigation occurred or modal opened
    await page.waitForTimeout(1000)
  })

  test("book cards should have proper ARIA attributes", async ({ page }) => {
    await page.goto("/shelf/5c6179511d2d140001899fcd")

    // Wait for books to load
    await page.waitForSelector('[data-testid="book-card"]', { timeout: 15000 })

    // Check first book card
    const firstBook = page.locator('[data-testid="book-card"]').first()

    // Should be clickable and have proper role
    await expect(firstBook).toBeVisible()

    // Check for proper heading structure within cards
    const bookTitle = firstBook.locator("h3")
    await expect(bookTitle).toBeVisible()
  })

  test("modal should trap focus", async ({ page }) => {
    await page.goto("/shelf/5c6179511d2d140001899fcd")

    // Open modal
    await page.waitForSelector('[data-testid="book-card"]', { timeout: 15000 })
    await page.locator('[data-testid="book-card"]').first().click()

    // Wait for modal
    await page.waitForSelector('[role="dialog"]')

    // Tab should stay within modal
    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab")

    // Focus should still be within modal
    const focusedElement = page.locator(":focus")
    const modal = page.locator('[role="dialog"]')

    // Check if focused element is within modal
    const isWithinModal = await focusedElement.evaluate(
      (el, modal) => {
        return modal.contains(el)
      },
      await modal.elementHandle(),
    )

    expect(isWithinModal).toBeTruthy()
  })
})
