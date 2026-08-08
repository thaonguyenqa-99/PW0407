import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/login');
    }

    async submitForm(username: string, password: string) {
        await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' })
            .fill(password);
        await this.page.getByRole('button').click();
    }

    async getSuccessLoginMessage(): Promise<Locator> {
        return this.page.getByText('You logged into a secure area');
    }

    async invalidUsernameMessage(): Promise<Locator> {
        return this.page.getByText('Your username is invalid!')
    }

    async invalidPasswordMessage(): Promise<Locator> {
        return this.page.getByText('Your password is invalid!')
    }
}