import { expect, type Locator, type Page } from '@playwright/test';

export class ContextMenuPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/context_menu');
    }

    async ContextMenuPopup() {
        this.page.on('dialog', async dialog => {
            await dialog.accept();
        });
        await this.page.locator('#hot-spot').click({ button: 'right' });

    }
}