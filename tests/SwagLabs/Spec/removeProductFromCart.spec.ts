import { test, expect } from '../Fixtures/swaglabs.fixtures';

test('Verify user can remove a product from cart on Product page', async ({ loginPage, page }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")
    await expect(page.locator('[data-test="title"]')).toHaveText("Products")

    const backpackProduct = page.locator('[data-test = "inventory-item"]').filter({ hasText: "Sauce Labs Backpack" })
    await backpackProduct.getByRole('button', { name: "Add to cart" }).click()

    await expect(page.locator('[data-test = "shopping-cart-badge"]')).toHaveText("1")
    await expect(backpackProduct.getByRole('button', { name: "Remove" })).toBeVisible()

    await backpackProduct.getByRole('button', { name: "Remove" }).click()
    await expect(page.locator('[data-test = "shopping-cart-badge"]')).toBeHidden()
    await expect(backpackProduct.getByRole('button', { name: "Add to cart" })).toBeVisible()
})

test("Verify removing one product does not remove other products from cart", async ({ loginPage, page }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")
    await expect(page.locator('[data-test="title"]')).toHaveText("Products")

    const backpackProduct = page.locator('[data-test = "inventory-item"]').filter({ hasText: "Sauce Labs Backpack" })
    await backpackProduct.getByRole('button', { name: "Add to cart" }).click()
    await expect(page.locator('[data-test = "shopping-cart-badge"]')).toHaveText("1")
    await expect(backpackProduct.getByRole('button', { name: "Remove" })).toBeVisible()

    const bikenight = page.locator('[data-test = "inventory-item"]').filter({ hasText: "Sauce Labs Bike Light" })
    await bikenight.getByRole('button', { name: "Add to cart" }).click()
    await expect(page.locator('[data-test = "shopping-cart-badge"]')).toHaveText("2")
    await expect(backpackProduct.getByRole('button', { name: "Remove" })).toBeVisible()

    await backpackProduct.getByRole('button', { name: "Remove" }).click()
    await expect(page.locator('[data-test = "shopping-cart-badge"]')).toHaveText("1")
    await expect(backpackProduct.getByRole('button', { name: "Add to cart" })).toBeVisible()
    await expect(bikenight.getByRole('button', { name: "Remove" })).toBeVisible()
})

test('Verify remove Product from Cart Page', async ({ loginPage, page, inventoryPage, cartPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")

    await inventoryPage.addProductToCart("Sauce Labs Bike Light")
    await inventoryPage.openCart()

    await expect(cartPage.getProduct("Sauce Labs Bike Light")).toBeVisible()

    await cartPage.removeProduct("Sauce Labs Bike Light")
    await expect(cartPage.getProduct("Sauce Labs Bike Light")).toBeHidden()
})