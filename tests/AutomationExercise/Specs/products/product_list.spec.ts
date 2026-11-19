import { test, expect } from '../../Fixtures/AutomationExercise.fixtures'

test('Verify user can navigate to ALL PRODUCTS page and PRODUCT DETAIL page', async ({ page, homePage, productsPage }) => {
    await homePage.goto()
    await homePage.gotoProductsPage()
    await expect(page.getByRole('heading', { name: 'All Products', exact: true })).toBeVisible()
    await expect(page.locator('.features_items')).toBeVisible()
    const firstProduct = page.locator('.features_items .product-image-wrapper').first()
    const firstProductName = await firstProduct.locator('.productinfo p').innerText()

    console.log(firstProductName)

    await productsPage.viewProduct(firstProductName)
    const productInfo = page.locator('.product-information')
    await expect(productInfo).toBeVisible()
    await expect(productInfo).toContainText(firstProductName)
    await expect(productInfo).toContainText('Category: Women > Tops')
    await expect(productInfo.locator('img[src="/static/images/product-details/rating.png"]')).toBeVisible()
    await expect(productInfo).toContainText('Rs. 500')
    await expect(productInfo.locator('[id="quantity"]')).toHaveValue('1')
    await expect(productInfo).toContainText('Availability: In Stock')
    await expect(productInfo).toContainText('Condition: New')
    await expect(productInfo).toContainText('Brand: Polo')
})