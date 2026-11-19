import { type Page } from '@playwright/test'

export class HomePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async goto() {
        await this.page.goto('https://automationexercise.com/')
    }

    async clickSignUp_Login() {
        await this.page.getByRole('link', { name: 'Signup / Login' }).click()
    }

    async gotoProductsPage() {
        await this.page.getByRole('link', { name: 'Products' }).click()
    }

    async gotoContactUs() {
        await this.page.getByRole('link', { name: 'Contact Us' }).click()
    }

    async gotoTestCase() {
        await this.page.locator('.nav').getByRole('link', { name: 'Test Cases' }).click()
    }

    async scrollDownFooter() {
        await this.page.locator('#footer').scrollIntoViewIfNeeded()
    }

    async gotoCart() {
        await this.page.getByRole('link', { name: 'Cart' }).click()
    }

    async viewProduct(productName: string) {
        const product = this.page.locator('.product-image-wrapper').filter({ hasText: productName })
        await product.getByRole('link', { name: 'View Product' }).click()
    }

    async deleteAccount() {
        await this.page.getByRole('link', { name: 'Delete Account' }).click()
    }
}