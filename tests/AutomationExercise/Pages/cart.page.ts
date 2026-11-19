import { type Page } from '@playwright/test'

export class CartPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async addToCart() {
        await this.page.getByRole('button', { name: " Add to cart" }).click()
    }

    async Checkout() {
        await this.page.getByRole('link', { name: 'Proceed To Checkout' }).click()
    }


}