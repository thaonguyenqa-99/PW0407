import { Page } from '@playwright/test'

export class TextboxPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async goto() {
        await this.page.goto('https://demoqa.com/text-box')
    }

    async fillform(fullName: string, email: string, currentAddress: string, permanentAddress: string) {
        await this.page.getByPlaceholder('Full Name').fill(fullName)
        await this.page.getByPlaceholder('name@example.com').fill(email)
        await this.page.getByPlaceholder('Current Address').fill(currentAddress)
        await this.page.locator('#permanentAddress').fill(permanentAddress)
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Submit' }).click()
    }
}

