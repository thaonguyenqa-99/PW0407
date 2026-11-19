import { test, expect } from '../../Fixtures/AutomationExercise.fixtures'

test('Verify user can view category products in homepage', async ({ page, homePage }) => {
    await homePage.goto()
    await expect(page.locator('.left-sidebar').getByRole('heading', { name: 'CATEGORY' })).toBeVisible()
    const womenCategory = page.getByRole('heading', { name: " WOMEN" })
    await womenCategory.locator('.badge').click()
    await page.locator('#Women').getByRole('link', { name: 'Dress' }).click()
    await expect(page.getByRole('heading', { name: 'Women - Dress Products' })).toBeVisible()
    const products = page.locator('.productinfo')
    const count = await products.count()
    console.log(count)
    for (let i = 0; i < count; i++) {
        await expect(products.nth(i)).toContainText('Dress')
    }
})