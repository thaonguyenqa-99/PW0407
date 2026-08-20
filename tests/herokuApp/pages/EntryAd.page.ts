import { expect, type Locator, type Page } from '@playwright/test';

export class EntryAdPage {
    readonly page: Page;
    readonly modal: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modal = page.getByText('THIS IS A MODAL WINDOW');
        this.closeButton = page.getByRole("button", { name: 'Close' });
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/entry_ad');
    }

    async getPopup() {
        await expect(this.modal).toBeVisible();
    }


    async clickClosebutton() {
        await this.closeButton.click();
    }
    async PopupClose() {
        await expect(this.modal).not.toBeVisible();
    }
}
