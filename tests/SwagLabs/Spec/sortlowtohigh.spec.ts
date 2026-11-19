import { test, expect } from '../Fixtures/swaglabs.fixtures';

test("Verify product page can sort low to high successfully", async ({ loginPage, page }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")
    await expect(page.locator('[data-test="title"]')).toHaveText("Products")

    await page.locator('[data-test="product-sort-container"]').selectOption({ value: "lohi" })
    const prices = page.locator('[data-test="inventory-item-price"]')
    const pricesTexts = await prices.allTextContents()
    console.log(pricesTexts)

    const priceswithoutDollar = pricesTexts.map(price => price.replace("$", ""))
    console.log(priceswithoutDollar)

    const pricesnumber = priceswithoutDollar.map(price => parseFloat(price))
    console.log(pricesnumber)

    const sortedPrices = [...pricesnumber]
    sortedPrices.sort((a, b) => a - b)

    expect(pricesnumber).toEqual(sortedPrices)
})

test("Verify product page can sort high to low successfully", async ({ loginPage, page }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")
    await expect(page.locator('[data-test="title"]')).toHaveText("Products")

    await page.locator('[data-test="product-sort-container"]').selectOption({ value: "hilo" })
    const prices = page.locator('[data-test="inventory-item-price"]')
    const pricesTexts = await prices.allTextContents()
    console.log(pricesTexts)

    const priceswithoutDollar = pricesTexts.map(price => price.replace("$", ""))
    console.log(priceswithoutDollar)

    const pricesnumber = priceswithoutDollar.map(price => parseFloat(price))
    console.log(pricesnumber)

    const sortedPrices = [...pricesnumber]
    sortedPrices.sort((a, b) => b - a)

    expect(pricesnumber).toEqual(sortedPrices)
})

test("Verify products can be sorted by Name (A to Z)", async ({ loginPage, page }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")
    await expect(page.locator('[data-test="title"]')).toHaveText("Products")

    await page.locator('[data-test = "product-sort-container"]').selectOption({ value: "az" })
    const productName = page.locator('[data-test = "inventory-item-name"]')
    const productNameText = await productName.allTextContents()
    console.log(productNameText)

    const sortedName = [...productNameText]
    sortedName.sort()

    expect(productNameText).toEqual(sortedName)
})