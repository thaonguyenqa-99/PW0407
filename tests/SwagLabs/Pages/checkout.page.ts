import { type Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async fillInformation(firstName: string, lastName: string, postalCode: string) {
        await this.page.getByPlaceholder('First Name').fill(firstName)
        await this.page.getByPlaceholder('Last Name').fill(lastName)
        await this.page.getByPlaceholder('Zip/Postal Code').fill(postalCode)
    }

    async clickContinueButton() {
        await this.page.getByRole('button', { name: 'Continue' }).click()
    }

    getProduct(productName: string) {
        return this.page.locator('[data-test="inventory-item"]').filter({ hasText: productName })
    }

    getProductPrice(productName: string) {
        const product = this.getProduct(productName)
        return product.locator('[data-test="inventory-item-price"]')
    }

    async getPriceProductNumber(productName: string) {
        const ProductText = await this.getProductPrice(productName).innerText()
        const ProductNumber = parseFloat(ProductText.replace("$", ""))
        return ProductNumber
    }

    async getItemTotal() {
        const iTemTotalText = await this.page.locator('[data-test="subtotal-label"]').innerText()
        const iTemTotalNumber = parseFloat(iTemTotalText.replace("Item total: $", ""))
        return iTemTotalNumber
    }

    async getTax() {
        const taxTest = await this.page.locator('[data-test="tax-label"]').innerText()
        const taxNumber = parseFloat(taxTest.replace("Tax: $", ""))
        return taxNumber
    }

    getProductQuantity(productName: string) {
        const product = this.getProduct(productName)
        return product.locator('[data-test="item-quantity"]')
    }

    async clickFinishButton() {
        await this.page.getByRole('button', { name: 'Finish' }).click()
    }

    async clickCancelCheckoutButton() {
        await this.page.getByRole('button', { name: 'Cancel' }).click()
    }

}
