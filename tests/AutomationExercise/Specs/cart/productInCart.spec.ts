import { test, expect } from '../../Fixtures/AutomationExercise.fixtures'

test('Verify Product Quantity in cart', async ({ page, homePage, productDetailPage }) => {
    await homePage.goto()
    await homePage.viewProduct('Sleeveless Dress')
    await expect(page.locator('.product-information')).toContainText('Sleeveless Dress')
    await productDetailPage.fillQuantity('4')
    await productDetailPage.addToCart()
    await productDetailPage.viewCart()
    const productAdded = page.locator('#cart_info_table tbody tr').filter({ hasText: 'Sleeveless Dress' })
    await expect(productAdded.locator('.cart_quantity')).toHaveText('4')
})