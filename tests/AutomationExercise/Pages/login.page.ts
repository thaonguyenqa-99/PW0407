import { type Page } from '@playwright/test'

export class LoginPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async fillInfoLogin(email: string, password: string) {
        await this.page.locator('.login-form').getByPlaceholder('Email Address').fill(email)
        await this.page.getByPlaceholder('Password').fill(password)
    }

    async clickLoginButton() {
        await this.page.getByRole('button', { name: 'Login' }).click()
    }
}