import { type Page } from '@playwright/test'

export class ProductDetailPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async fillQuantity(quantity: string) {
        await this.page.locator('[id="quantity"]').fill(quantity)
    }

    async addToCart() {
        await this.page.locator('.product-information').getByRole('button', { name: 'Add to cart' }).click()
    }

    async viewCart() {
        await this.page.locator('.modal-content').getByRole('link', { name: 'View Cart' }).click()
    }
}