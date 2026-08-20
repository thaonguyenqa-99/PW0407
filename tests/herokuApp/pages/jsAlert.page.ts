import { expect, type Locator, type Page } from '@playwright/test';

export class JsAlertPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    }

    async acceptJsAlert() {
        this.page.on('dialog', async dialog => {
            await dialog.accept();
        });
        await this.page.getByRole('button', { name: 'Click for JS Alert' }).click();
    }

    async acceptJsConfirm() {
        this.page.on('dialog', async dialog => {
            await dialog.accept();
        });
        await this.page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    }

    async cancelJsConfirm() {
        this.page.on('dialog', async dialog => {
            await dialog.dismiss();
        });
        await this.page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    }

    async enterTextInJsPrompt(text: string) {
        this.page.on('dialog', async dialog => {
            await dialog.accept(text);
        });
        await this.page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    }
}

