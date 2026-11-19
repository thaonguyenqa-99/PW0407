import { type Page, type Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    getProduct(productName: string) {
        return this.page.locator('[data-test="inventory-item"]').filter({ hasText: productName })
    }

    getProductName(productName: string) {
        const product = this.getProduct(productName)
        return product.locator(('[data-test="inventory-item-name"]'))
    }

    getProductPrice(productName: string) {
        const product = this.getProduct(productName)
        return product.locator('[data-test="inventory-item-price"]')
    }

    getRemoveButton(productName: string) {
        const product = this.getProduct(productName)
        return product.getByRole('button', { name: 'Remove' })
    }

    async removeProduct(productName: string) {
        await this.getRemoveButton(productName).click()
    }

    async checkout() {
        await this.page.getByRole('button', { name: 'Checkout' }).click()
    }


}
