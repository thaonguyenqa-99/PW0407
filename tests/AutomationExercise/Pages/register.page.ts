import { type Page } from '@playwright/test'

export class RegisterPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async FillInfoSignUp(name: string, email: string) {
        await this.page.getByPlaceholder('name').fill(name)
        await this.page.locator('.signup-form').getByPlaceholder('Email Address').fill(email)
    }

    async clickSignUpButton() {
        await this.page.getByRole('button', { name: 'Signup' }).click()
    }

    async FillAccountInfo(user: any) {
        await this.page.getByRole('radio', { name: user.title }).check()
        await this.page.getByLabel('Password').fill(user.password)
        await this.page.locator('[id="days"]').selectOption(user.day)
        await this.page.locator('[id="months"]').selectOption(user.month)
        await this.page.locator('[id="years"]').selectOption(user.year)
        await this.page.locator('[id="newsletter"]').check()
        await this.page.locator('[id="optin"]').check()
        await this.page.getByLabel('First name').fill(user.firstName)
        await this.page.getByLabel('Last name').fill(user.lastName)
        await this.page.locator('[id="company"]').fill(user.company)
        await this.page.locator('[id="address1"]').fill(user.address1)
        await this.page.locator('[id="address2"]').fill(user.address2)
        await this.page.locator('[id="country"]').selectOption(user.country)
        await this.page.getByLabel('State').fill(user.state)
        await this.page.getByLabel('City').fill(user.city)
        await this.page.locator('#zipcode').fill(user.zipcode)
        await this.page.getByLabel('Mobile Number').fill(user.mobile)
    }

    async clickCreateAccountButton() {
        await this.page.getByRole('button', { name: 'Create Account' }).click()
    }

    async clickContinueButton() {
        await this.page.getByRole('link', { name: 'Continue' }).click()
    }
}