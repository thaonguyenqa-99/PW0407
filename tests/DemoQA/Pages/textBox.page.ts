import { type Page } from '@playwright/test';

type TextBoxFormData = {
    fullName: string;
    email: string;
    currentAddress: string;
    permanentAddress: string;
};

type TextBoxOutputField = 'name' | 'email' | 'currentAddress' | 'permanentAddress';

export class TextBoxPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async goto() {
        await this.page.goto('https://demoqa.com/text-box')
    }

    async fillForm({ fullName, email, currentAddress, permanentAddress }: TextBoxFormData) {
        await this.page.locator('#userName').fill(fullName)
        await this.page.locator('#userEmail').fill(email)
        await this.page.locator('#currentAddress').fill(currentAddress)
        await this.page.locator('#permanentAddress').fill(permanentAddress)
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Submit' }).click()
    }

    get emailInput() {
        return this.page.locator('#userEmail')
    }

    get invalidEmailInput() {
        return this.page.locator('#userEmail:invalid')
    }

    get output() {
        return this.page.locator('#output')
    }

    getResult(field: TextBoxOutputField) {
        return this.output.locator(`#${field}`)
    }
}
