import { test, expect } from '../../Fixtures/AutomationExercise.fixtures'

test('Verify user can view Brands product in Product page', async ({ page, homePage }) => {
    await homePage.goto()
    await homePage.gotoProductsPage()
    await expect(page.locator('.left-sidebar').getByRole('heading', { name: 'BRANDS' })).toBeVisible()
    await page.locator('.brands-name').getByRole('link', { name: "(6) POLO" }).click()
    await expect(page.getByRole('heading', { name: 'Brand - Polo Products' })).toBeVisible()
    const products = page.locator('.product-image-wrapper')
    expect(await products.count()).toBeGreaterThan(0)
})