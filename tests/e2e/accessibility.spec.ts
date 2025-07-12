import { test, expect } from "@playwright/test"

test.describe("Accessibility Tests", () => {
  test("homepage should be accessible", async ({ page }) => {
    await page.goto("/")

    const h1 = page.locator("h1")
    await expect(h1).toBeVisible()

    const images = page.locator("img")
    const imageCount = await images.count()

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute("alt")
      expect(alt).toBeTruthy()
    }

    const buttons = page.locator("button")
    const buttonCount = await buttons.count()

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i)
      const ariaLabel = await button.getAttribute("aria-label")
      const text = await button.textContent()

      expect(ariaLabel || text).toBeTruthy()
    }
  })

  test("keyboard navigation should work", async ({ page }) => {
    await page.goto("/")

    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab")

    await page.keyboard.press("Enter")

    await page.waitForTimeout(1000)
  })

  test("book cards should have proper ARIA attributes", async ({ page }) => {
    await page.goto("/shelf/5c6179511d2d140001899fcd")

    await page.waitForSelector('[data-testid="book-card"]', { timeout: 15000 })

    const firstBook = page.locator('[data-testid="book-card"]').first()

    await expect(firstBook).toBeVisible()

    const bookTitle = firstBook.locator("h3")
    await expect(bookTitle).toBeVisible()
  })

  test("modal should trap focus", async ({ page }) => {
    await page.goto("/shelf/5c6179511d2d140001899fcd")

    await page.waitForSelector('[data-testid="book-card"]', { timeout: 15000 })
    await page.locator('[data-testid="book-card"]').first().click()

    await page.waitForSelector('[role="dialog"]')

    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab")

    const focusedElement = page.locator(":focus")
    const modal = page.locator('[role="dialog"]')

    const isWithinModal = await focusedElement.evaluate(
      (el, modal) => {
        return modal.contains(el)
      },
      await modal.elementHandle(),
    )

    expect(isWithinModal).toBeTruthy()
  })
})
