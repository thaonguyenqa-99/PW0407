import { type Page } from '@playwright/test'

export class ProductsPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async searchProduct(keyword: string) {
        await this.page.getByPlaceholder('Search Product').fill(keyword)
        await this.page.locator('#submit_search').click()
    }

    getProduct(productName: string) {
        return this.page.locator('.productinfo').filter({ hasText: productName })
    }

    async getProductName(productName: string) {
        const product = this.getProduct(productName)
        const productname = await product.locator('p').innerText()
        return productname
    }

    async getProductPrice(productName: string) {
        const product = this.getProduct(productName)
        const productPrice = await product.locator('h2').innerText()
        return productPrice
    }

    async viewProduct(productName: string) {
        const product = this.page.locator('.product-image-wrapper').filter({ hasText: productName })
        await product.locator('.choose').getByRole('link', { name: 'View Product' }).click()
    }

    async addProductTocart() {
        await this.page.getByRole('button', { name: 'Add to cart' }).click()
    }

    async viewCart() {
        await this.page.getByRole('link', { name: 'View Cart' }).click()
    }

}