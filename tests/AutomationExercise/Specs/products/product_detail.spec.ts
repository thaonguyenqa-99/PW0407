import { test, expect } from '../../Fixtures/AutomationExercise.fixtures'

test('Verify product information detail are displayed correctly', async ({ page, homePage, productsPage, productDetailPage }) => {
    await homePage.goto()
    await homePage.gotoProductsPage()
    await productsPage.viewProduct('Men Tshirt')
    const productInfo = page.locator('.product-information')
    await expect(productInfo).toContainText('Men Tshirt')
    await expect(productInfo).toContainText('Category: Men > Tshirts')
    await expect(productInfo.locator('img[src="/static/images/product-details/rating.png"]')).toBeVisible()
    await expect(productInfo).toContainText('Rs. 400')
    await expect(productInfo.locator('[id="quantity"]')).toHaveValue('1')
    await expect(productInfo).toContainText('Availability: In Stock')
    await expect(productInfo).toContainText('Condition: New')
    await expect(productInfo).toContainText('Brand: H&M')
})

test('Verify product name and price match between Products and Product Detail pages', async ({ page, homePage, productsPage }) => {
    await homePage.goto()
    await homePage.gotoProductsPage()
    const productName = await productsPage.getProductName('Blue Top')
    const productPrice = await productsPage.getProductPrice('Blue Top')
    await productsPage.viewProduct('Blue Top')
    const productNameDetail = await page.locator('.product-information').locator('h2').innerText()
    console.log(productNameDetail)
    const productPriceDetail = await page.locator('.product-information').locator('span>span').innerText()
    console.log(productPriceDetail)

    expect(productName).toBe(productNameDetail)
    expect(productPrice).toBe(productPriceDetail)
})


test('Verify user can change product quantity', async ({ page, homePage, productsPage, productDetailPage }) => {
    await homePage.goto()
    await homePage.gotoProductsPage()
    await productsPage.viewProduct('Blue Top')
    await page.locator('[id="quantity"]').fill('4')
    await productDetailPage.addToCart()
    await productDetailPage.viewCart()
    const product = page.locator('#cart_items').filter({ hasText: 'Blue Top' })
    await expect(product.locator('.cart_quantity')).toHaveText('4')
})

test('Verify the defaultproduct quantity is 1', async ({ page, homePage, productsPage, productDetailPage }) => {
    await homePage.goto()
    await homePage.gotoProductsPage()
    await productsPage.viewProduct('Blue Top')
    await expect(page.locator('[id="quantity"]')).toHaveValue('1')
    await productDetailPage.addToCart()
    await productDetailPage.viewCart()
    const product = page.locator('#cart_items').filter({ hasText: 'Blue Top' })
    await expect(product.locator('.cart_quantity')).toHaveText('1')
})

test('Verify a product cannot be added to cart with quantity 0', async ({ page, homePage, productsPage, productDetailPage }) => {
    await homePage.goto()
    await homePage.gotoProductsPage()
    await productsPage.viewProduct('Blue Top')
    await productDetailPage.fillQuantity('0')
    await productDetailPage.addToCart()
    await productDetailPage.viewCart()
    await expect(page.locator('#cart_info_table tbody tr').filter({ hasText: 'Blue Top' })).toHaveCount(0)
})

test('Verify a product cannot be added to cart with a negative quantity', async ({ page, homePage, productsPage, productDetailPage }) => {
    await homePage.goto()
    await homePage.gotoProductsPage()
    await productsPage.viewProduct('Blue Top')
    await productDetailPage.fillQuantity('-5')
    await productDetailPage.addToCart()
    await productDetailPage.viewCart()
    await expect(page.locator('#cart_info_table tbody tr').filter({ hasText: 'Blue Top' })).toHaveCount(0)
})

