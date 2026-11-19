import { test, expect } from '../../Fixtures/AutomationExercise.fixtures'

test('Verify user can add product to cart', async ({ page, homePage, productsPage }) => {
    await homePage.goto()
    await homePage.gotoProductsPage()
    const firstProd = page.locator('.product-image-wrapper').nth(0)
    await firstProd.hover()
    await firstProd.locator('.product-overlay .add-to-cart').click()
    await expect(page.locator('.modal-content')).toBeVisible()
    await page.getByRole('button', { name: 'Continue Shopping' }).click()
    const secProduct = page.locator('.product-image-wrapper').nth(1)
    await secProduct.hover()
    await secProduct.locator('.product-overlay .add-to-cart').click()
    await page.getByRole('link', { name: 'View Cart' }).click()
    const firstProduct = page.locator('#product-1')
    const secondProduct = page.locator('#product-2')
    await expect(firstProduct.locator('.cart_description')).toContainText('Blue Top')
    await expect(secondProduct.locator('.cart_description')).toContainText('Men Tshirt')
    await expect(firstProduct.locator('.cart_price')).toHaveText('Rs. 500')
    await expect(firstProduct.locator('.cart_quantity')).toHaveText('1')
    await expect(firstProduct.locator('.cart_total')).toHaveText('Rs. 500')

    await expect(secondProduct.locator('.cart_price')).toHaveText('Rs. 400')
    await expect(secondProduct.locator('.cart_quantity')).toHaveText('1')
    await expect(secondProduct.locator('.cart_total')).toHaveText('Rs. 400')
})

test('Verify user can add product to cart from Recommended item', async ({ page, homePage }) => {
    await homePage.goto()
    await page.locator('.recommended_items').scrollIntoViewIfNeeded()
    await expect(page.getByRole('heading', { name: 'recommended items' })).toBeVisible()
    await page.locator('.recommended_items').locator('[data-product-id="1"]').click()
    await page.getByRole('link', { name: 'View Cart' }).click()
    await expect(page.locator('#cart_info_table').locator('#product-1')).toContainText('Blue Top');
})
