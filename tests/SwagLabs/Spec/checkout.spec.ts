import { test, expect } from '../Fixtures/swaglabs.fixtures';
import { CheckoutPage } from '../Pages/checkout.page';

test('Verify user can proceed from cart page to check out page', async ({ loginPage, page, inventoryPage, cartPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")

    await inventoryPage.addProductToCart("Sauce Labs Backpack")
    await inventoryPage.openCart()
    await expect(cartPage.getProduct("Sauce Labs Backpack")).toBeVisible()

    await cartPage.checkout()
    await expect(page.locator('[data-test="title"]')).toHaveText("Checkout: Your Information")

})

test('Verify user can fill checkout information successfully', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")

    await inventoryPage.addProductToCart("Sauce Labs Backpack")
    await inventoryPage.openCart()

    await cartPage.checkout()
    await checkoutPage.fillInformation("Thao", "Nguyen", "123456")
    await checkoutPage.clickContinueButton()
    await expect(page.locator('[data-test="title"]')).toHaveText("Checkout: Overview")
})

test('Verify product information is displayed correctly on overview page', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")

    await inventoryPage.addProductToCart("Sauce Labs Backpack")
    await inventoryPage.openCart()

    await cartPage.checkout()

    await checkoutPage.fillInformation("Thao", "Nguyen", "123456")
    await checkoutPage.clickContinueButton()

    await expect(checkoutPage.getProduct("Sauce Labs Backpack")).toBeVisible()
    await expect(checkoutPage.getProductPrice("Sauce Labs Backpack")).toHaveText("$29.99")
    await expect(checkoutPage.getProductQuantity("Sauce Labs Backpack")).toHaveText("1")
})

test('Verify user can complete an order successfully', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")

    await inventoryPage.addProductToCart("Sauce Labs Backpack")
    await inventoryPage.openCart()

    await cartPage.checkout()
    await checkoutPage.fillInformation("Miu", "Miu", "260899")
    await checkoutPage.clickContinueButton()
    await checkoutPage.clickFinishButton()

    await expect(page.locator('[data-test="title"]')).toHaveText("Checkout: Complete!")
    await expect(page.locator('[data-test="complete-header"]')).toHaveText("Thank you for your order!")
})

test('Verify error message when firstname is empty', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")

    await inventoryPage.addProductToCart("Sauce Labs Backpack")
    await inventoryPage.openCart()

    await cartPage.checkout()
    await checkoutPage.fillInformation("", "Nguyen", "123456")
    await checkoutPage.clickContinueButton()
    await expect(page.getByRole('heading', { name: "Error: First Name is required" })).toBeVisible()
})

test('Verify error message when postalCode is empty', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")

    await inventoryPage.addProductToCart("Sauce Labs Backpack")
    await inventoryPage.openCart()

    await cartPage.checkout()
    await checkoutPage.fillInformation("Thao", "Nguyen", "")
    await checkoutPage.clickContinueButton()
    await expect(page.getByRole('heading', { name: "Error: Postal Code is required" })).toBeVisible()
})

test('verify error message when last name is empty', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")

    await inventoryPage.addProductToCart("Sauce Labs Backpack")
    await inventoryPage.openCart()

    await cartPage.checkout()
    await checkoutPage.fillInformation("Thao", "", "123456")
    await checkoutPage.clickContinueButton()
    await expect(page.getByRole('heading', { name: "Error: Last Name is required" })).toBeVisible()
})

test('Verify user can cancel checkout and back to cart page', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")
    await inventoryPage.addProductToCart("Sauce Labs Onesie")
    await inventoryPage.openCart()
    await cartPage.checkout()
    await expect(page.locator('[data-test="title"]')).toHaveText("Checkout: Your Information")
    await checkoutPage.clickCancelCheckoutButton()
    await expect(page.locator('[data-test="title"]')).toHaveText("Your Cart")
    await expect(cartPage.getProduct("Sauce Labs Onesie")).toBeVisible()
})

test('Verify itemtotal price is calculated correctly on overview page', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")
    await inventoryPage.addProductToCart("Sauce Labs Backpack")
    await inventoryPage.addProductToCart("Sauce Labs Onesie")
    await inventoryPage.openCart()
    await cartPage.checkout()
    await checkoutPage.fillInformation("Thao", "Nguyen", "123456")
    await checkoutPage.clickContinueButton()
    await expect(checkoutPage.getProduct("Sauce Labs Backpack")).toBeVisible()
    await expect(checkoutPage.getProduct("Sauce Labs Onesie")).toBeVisible()

    const BackpackProduct = await checkoutPage.getPriceProductNumber("Sauce Labs Backpack")
    const OnesieProduct = await checkoutPage.getPriceProductNumber("Sauce Labs Onesie")
    const itemTotal = BackpackProduct + OnesieProduct

    console.log(BackpackProduct)
    console.log(OnesieProduct)
    console.log(itemTotal)

    const itemTotalActual = await page.locator('[data-test="subtotal-label"]').innerText()
    const itemTotalActualNumber = parseFloat(itemTotalActual.replace("Item total: $", ""))
    console.log(itemTotalActualNumber)

    expect(itemTotal).toEqual(itemTotalActualNumber)
})

test('Verify itemtotal price is calculated correctly on overview page_cach 2', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")
    await inventoryPage.addProductToCart("Sauce Labs Backpack")
    await inventoryPage.addProductToCart("Sauce Labs Onesie")
    await inventoryPage.openCart()
    await cartPage.checkout()
    await checkoutPage.fillInformation("Thao", "Nguyen", "123456")
    await checkoutPage.clickContinueButton()
    await expect(checkoutPage.getProduct("Sauce Labs Backpack")).toBeVisible()
    await expect(checkoutPage.getProduct("Sauce Labs Onesie")).toBeVisible()

    const priceTexts = await page.locator('[data-test="inventory-item-price"]').allTextContents()
    console.log(priceTexts)
    const priceNumbers = priceTexts.map(price => parseFloat(price.replace("$", "")))
    console.log(priceNumbers)

    const itemTotal = priceNumbers.reduce((sum, price) => sum + price, 0)
    console.log(itemTotal)
    const itemTotalExpected = `Item total: $${itemTotal}`
    console.log(itemTotalExpected)

    const itemTotalActual = page.locator('[data-test="subtotal-label"]')
    console.log(itemTotalActual)

    await expect(itemTotalActual).toHaveText(itemTotalExpected)

})

test('Verify total is displayed correctly on overview page', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")
    await inventoryPage.addProductToCart("Sauce Labs Backpack")
    await inventoryPage.addProductToCart("Sauce Labs Onesie")
    await inventoryPage.openCart()
    await cartPage.checkout()
    await checkoutPage.fillInformation("Thao", "Nguyen", "123456")
    await checkoutPage.clickContinueButton()
    const itemTotal = await checkoutPage.getItemTotal()
    console.log(itemTotal)
    const Tax = await checkoutPage.getTax()
    console.log(Tax)

    const total = (itemTotal + Tax).toFixed(2)
    console.log(total)

    const totalText = `Total: $${total}`
    console.log(totalText)

    const totalActual = page.locator('[data-test="total-label"]')

    await expect(totalActual).toHaveText(totalText)
})


