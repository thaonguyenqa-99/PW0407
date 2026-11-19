import { test, expect } from '../../Fixtures/AutomationExercise.fixtures'

test('Verify user can remove product from cart', async ({ page, homePage, cartPage, productsPage }) => {
    await homePage.goto()
    await homePage.viewProduct('Blue Top')
    await cartPage.addToCart()
    await productsPage.viewCart()
    const product = page.locator('#cart_info_table tbody tr').filter({ hasText: 'Blue Top' })
    await product.locator('.cart_quantity_delete').click({ force: true })
    await expect(product).toHaveCount(0)
})