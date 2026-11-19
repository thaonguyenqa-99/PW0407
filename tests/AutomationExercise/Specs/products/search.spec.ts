import { test, expect } from '../../Fixtures/AutomationExercise.fixtures'

test('Verify user can search a product successfully', async ({ page, homePage, productsPage }) => {
    await homePage.goto()
    await homePage.gotoProductsPage()
    await productsPage.searchProduct('Sleeveless Dress')
    await expect(page.locator('.productinfo').getByText('Sleeveless Dress', { exact: true })).toBeVisible()
})

test('Verify search with a nonexistent product', async ({ page, homePage, productsPage }) => {
    await homePage.goto()
    await homePage.gotoProductsPage()
    await productsPage.searchProduct('xyznotfound987654')
    await expect(page.locator('.productinfo')).toHaveCount(0)
})

test('Verify user can search for products and add any product from the search results to the cart', async ({ page, homePage, loginPage, productsPage, cartPage }) => {
    await homePage.goto()
    await homePage.gotoProductsPage()
    await productsPage.searchProduct('Top')

    const products = page.locator('.product-image-wrapper')
    const count = await products.count()
    console.log(count)

    for (let i = 0; i < count; i++) {
        const product = products.nth(i)
        const productName = await product.locator('.productinfo p').innerText()
        console.log(productName)

        if (productName.includes('Top')) {
            continue
        }

        await product.getByRole('link', { name: 'View Product' }).click()
        const categoryName = await page.locator('.product-information p').filter({ hasText: 'Category' }).innerText()
        console.log(categoryName)

        expect(productName.includes('Top') || categoryName.includes('Top')).toBe(true)

        await page.goBack()
    }

    await productsPage.viewProduct('Blue Top')
    await productsPage.addProductTocart()
    await productsPage.viewCart()
    await page.locator('a.check_out').click()
    await page.locator('.modal-content').getByRole('link', { name: 'Register / Login' }).click()
    await loginPage.fillInfoLogin('thaoongyn99@gmail.com', 'ntpt260899')
    await homePage.gotoCart()
    await expect(page.locator('.table tbody tr')).toBeVisible()

})

