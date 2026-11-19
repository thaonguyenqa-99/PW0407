import { test, expect } from '../Fixtures/swaglabs.fixtures';

test("product page display successfully", async ({ loginPage, page }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")
    await expect(page.locator('[data-test="title"]')).toHaveText("Products");
    await expect(page.locator('.app_logo')).toHaveText("Swag Labs")

})

test('Verify that the products have prices greater than $10 ', async ({ page, loginPage, inventoryPage, cartPage, }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")

    const products = await inventoryPage.getallProduct().allTextContents()
    const productsInfoInventory: { name: string, price: string }[] = []
    for (const product of products) {
        const productName = await inventoryPage.getProductName(product).innerText()
        const productPrice = await inventoryPage.getProductPrice(product).innerText()
        console.log(productName)
        console.log(productPrice)
        const productInfo = {
            name: productName,
            price: productPrice
        }

        productsInfoInventory.push(productInfo)
    }
    console.log("all products on inventory: ", productsInfoInventory)
    const checkProductGreaterThan10 = productsInfoInventory.filter(productInfo => parseFloat(productInfo.price.replace("$", "")) > 10)
    console.log(checkProductGreaterThan10)

    for (const productInfo of checkProductGreaterThan10) {
        const price = productInfo.price
        const priceNumber = parseFloat(price.replace("$", ""))
        console.log(priceNumber)
        expect(priceNumber).toBeGreaterThan(10)
    }
})