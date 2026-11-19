import { type Page, type Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    getProduct(productName: string) {
        return this.page.locator('[data-test = "inventory-item"]').filter({ hasText: productName })
    }

    getProductName(productName: string) {
        const product = this.getProduct(productName)
        return product.locator(('[data-test="inventory-item-name"]'))
    }


    getallProduct() {
        return this.page.locator('[data-test="inventory-item"]')
    }

    getProductPrice(productName: string) {
        const product = this.getProduct(productName)
        const productPrice = product.locator('[data-test="inventory-item-price"]')
        return productPrice
    }


    async addProductToCart(productName: string) {
        const product = this.getProduct(productName)
        await product.getByRole('button', { name: "Add to cart" }).click()
    }

    async openCart() {
        await this.page.locator('[data-test="shopping-cart-link"]').click()
    }

}