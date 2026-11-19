import { type Page } from '@playwright/test'

export class LogoutPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async clickLogout() {
        await this.page.getByRole('link', { name: 'Logout' }).click()
    }


}