import { test, expect } from '../Fixtures/swaglabs.fixtures';

test("Verify add a product to cart successfully", async ({ loginPage, page }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")
    await expect(page.locator('[data-test="title"]')).toHaveText("Products");

    const backpackProduct = page.locator('[data-test = "inventory-item"]').filter({ hasText: "Sauce Labs Backpack" })
    await backpackProduct.getByRole('button', { name: "Add to cart" }).click()

    await expect(page.locator('[data-test = "shopping-cart-badge"]')).toHaveText("1")
    await expect(backpackProduct.getByRole('button', { name: "Remove" })).toBeVisible()

})

test('Verify product added from product page is displayed correctly in cart page', async ({ inventoryPage, cartPage, loginPage, page }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")
    await expect(page.locator('[data-test="title"]')).toHaveText("Products");

    await inventoryPage.addProductToCart("Sauce Labs Backpack")
    await inventoryPage.openCart()

    await expect(page.locator('[data-test="title"]')).toHaveText("Your Cart")
    await expect(cartPage.getProduct("Sauce Labs Backpack")).toBeVisible()

    await expect(cartPage.getProductPrice("Sauce Labs Backpack")).toHaveText("$29.99")
    await expect(cartPage.getRemoveButton("Sauce Labs Backpack")).toBeVisible()
})

test('Verify product quantity is displayed correctly in cart page after adding 3 product', async ({ page, loginPage, inventoryPage, cartPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")
    await inventoryPage.addProductToCart("Sauce Labs Backpack")
    await inventoryPage.addProductToCart("Sauce Labs Bike Light")
    await inventoryPage.addProductToCart("Sauce Labs Bolt T-Shirt")

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("3")

    await inventoryPage.openCart()
    const productQuantityLocator = page.locator('[data-test="inventory-item"]')
    const productQuantity = await productQuantityLocator.count()
    console.log(productQuantity)

    expect(productQuantity).toEqual(3)

    await cartPage.removeProduct("Sauce Labs Backpack")
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("2")
    const productQuantityAfterRemove = await productQuantityLocator.count()
    console.log(productQuantityAfterRemove)
    expect(productQuantityAfterRemove).toEqual(2)

    await expect(cartPage.getProduct("Sauce Labs Backpack")).toBeHidden()
    await expect(cartPage.getProduct("Sauce Labs Bike Light")).toBeVisible()
    await expect(cartPage.getProduct("Sauce Labs Bolt T-Shirt")).toBeVisible()

})

test('Verify product name is displayed correctly in cart page', async ({ page, loginPage, inventoryPage, cartPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")
    await inventoryPage.addProductToCart("Sauce Labs Backpack")
    await inventoryPage.addProductToCart("Sauce Labs Bike Light")
    await inventoryPage.addProductToCart("Sauce Labs Bolt T-Shirt")
    await inventoryPage.openCart()
    const expectedProduct = ["Sauce Labs Bolt T-Shirt", "Sauce Labs Backpack", "Sauce Labs Bike Light"]

    const expectedProductSort = [...expectedProduct].sort()
    console.log(expectedProduct)
    console.log(expectedProductSort)

    const productLocator = page.locator('[data-test="inventory-item-name"]')
    const actualProduct = await productLocator.allTextContents()
    console.log(actualProduct)

    const actualProductSort = [...actualProduct].sort()
    console.log(actualProductSort)

    expect(actualProductSort).toEqual(expectedProductSort)
})

test('Verify that the product price displayed on the cart page matches the product price displayed on the inventory page', async ({ page, loginPage, inventoryPage, cartPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")
    const inventoryPrice = await inventoryPage.getProductPrice("Sauce Labs Backpack").innerText()
    console.log(inventoryPrice)

    await inventoryPage.addProductToCart("Sauce Labs Backpack")
    await inventoryPage.openCart()
    const cartPrice = await cartPage.getProductPrice("Sauce Labs Backpack").innerText()
    console.log(cartPrice)

    expect(cartPrice).toEqual(inventoryPrice)
})

test('Verify that the prices of 3 products on the inventory page match those on the cart page', async ({ page, loginPage, inventoryPage, cartPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")

    const backpackProductPriceInventory = await inventoryPage.getProductPrice("Sauce Labs Backpack").innerText()
    const bikenightProductPriceInventory = await inventoryPage.getProductPrice("Sauce Labs Bike Light").innerText()
    const tshirtProductPriceInventory = await inventoryPage.getProductPrice("Sauce Labs Bolt T-Shirt").innerText()

    const productPriceInventory = [backpackProductPriceInventory, bikenightProductPriceInventory, tshirtProductPriceInventory]
    console.log(productPriceInventory)

    // const productPriceInventory = await page.locator('[data-test="inventory-item-price"]').allTextContents()
    // console.log(productPriceInventory)

    await inventoryPage.addProductToCart("Sauce Labs Backpack")
    await inventoryPage.addProductToCart("Sauce Labs Bike Light")
    await inventoryPage.addProductToCart("Sauce Labs Bolt T-Shirt")
    await inventoryPage.openCart()

    const backpackProductPriceCart = await cartPage.getProductPrice("Sauce Labs Backpack").innerText()
    const bikenightProductPriceCart = await cartPage.getProductPrice("Sauce Labs Bike Light").innerText()
    const tshirtProductPriceCart = await cartPage.getProductPrice("Sauce Labs Bolt T-Shirt").innerText()

    const productPriceCart = [backpackProductPriceCart, bikenightProductPriceCart, tshirtProductPriceCart]
    console.log(productPriceCart)

    expect(productPriceCart).toEqual(productPriceInventory)

})

test('Verify that the prices of 3 products on the inventory page match those on the cart page_cách 2', async ({ page, loginPage, inventoryPage, cartPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")

    const products = ["Sauce Labs Backpack", "Sauce Labs Bike Light", "Sauce Labs Bolt T-Shirt"]
    const pricesInventory: string[] = []
    for (const product of products) {
        const price = await inventoryPage.getProductPrice(product).innerText()
        pricesInventory.push(price)
    }
    console.log(pricesInventory)

    for (const product of products) {
        await inventoryPage.addProductToCart(product)
    }

    await inventoryPage.openCart()

    const pricesCart: string[] = []
    for (const product of products) {
        const price = await cartPage.getProductPrice(product).innerText()
        pricesCart.push(price)
    }
    console.log(pricesCart)

    expect(pricesCart).toEqual(pricesInventory)
})

test('Verify the prices and product names of three products on the cart page', async ({ page, loginPage, inventoryPage, cartPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")

    const products = ["Sauce Labs Backpack", "Sauce Labs Bike Light", "Sauce Labs Bolt T-Shirt"]
    const namePriceInventory: { name: string, price: string }[] = []
    for (const product of products) {
        const price = await inventoryPage.getProductPrice(product).innerText()
        const productInfo = {
            name: product,
            price: price,
        }
        namePriceInventory.push(productInfo)
    }
    console.log("products on Inventory Page: ", namePriceInventory)

    for (const product of products) {
        await inventoryPage.addProductToCart(product)
    }

    await inventoryPage.openCart()

    const namePriceCart: { name: string, price: string }[] = []
    for (const product of products) {
        const price = await cartPage.getProductPrice(product).innerText()
        const productInfo = {
            name: product,
            price: price
        }
        namePriceCart.push(productInfo)
    }
    console.log("products on Cart Page: ", namePriceCart)

    expect(namePriceCart).toEqual(namePriceInventory)

})

test('Verify product name and price in Cart match Inventory', async ({ loginPage, inventoryPage, cartPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")

    const products = ["Sauce Labs Backpack", "Sauce Labs Bike Light", "Sauce Labs Bolt T-Shirt"]
    const namePriceInventory: { name: string, price: string }[] = []
    for (const product of products) {
        const price = await inventoryPage.getProductPrice(product).innerText()
        const productInfo = {
            name: product,
            price: price,
        }
        namePriceInventory.push(productInfo)
    }
    console.log("products on Inventory Page: ", namePriceInventory)

    for (const product of products) {
        await inventoryPage.addProductToCart(product)
    }

    await inventoryPage.openCart()
    for (const productInfo of namePriceInventory) {
        const productNameCart = await cartPage.getProductName(productInfo.name).innerText()
        const productPriceCart = await cartPage.getProductPrice(productInfo.name).innerText()
        console.log(productNameCart)
        console.log(productPriceCart)
        expect(productInfo.name).toEqual(productNameCart)
        expect(productInfo.price).toEqual(productPriceCart)
    }
})

test('Verify cart page after removing one product', async ({ page, loginPage, inventoryPage, cartPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")

    const products = ["Sauce Labs Backpack", "Sauce Labs Bolt T-Shirt", "Sauce Labs Onesie"]
    const productInfoInventory: { name: string, price: string }[] = []
    for (const product of products) {
        const price = await inventoryPage.getProductPrice(product).innerText()
        const productInfo = {
            name: product,
            price: price
        }
        productInfoInventory.push(productInfo)
    }
    console.log("products on inventoryPage: ", productInfoInventory)

    for (const product of products) {
        await inventoryPage.addProductToCart(product)
    }

    await inventoryPage.openCart()

    await cartPage.removeProduct("Sauce Labs Backpack")

    await expect(cartPage.getProduct("Sauce Labs Backpack")).toBeHidden()

    const remainingProducts = productInfoInventory.filter(productInfo => productInfo.name !== "Sauce Labs Backpack")
    console.log("products on cart page after remove product: ", remainingProducts)

    for (const productInfo of remainingProducts) {
        const productNameCart = cartPage.getProductName(productInfo.name)
        const productPriceCart = await cartPage.getProductPrice(productInfo.name).innerText()
        await expect(productNameCart).toBeVisible()
        expect(productPriceCart).toEqual(productInfo.price)
    }
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("2")
})
