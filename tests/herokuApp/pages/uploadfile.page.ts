import { expect, type Locator, type Page } from '@playwright/test';

export class UploadFilePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/upload');
    }

    async uploadFile(filePath: string) {
        await this.page.getByRole('button', { name: 'Choose File' }).setInputFiles(filePath);
    }

    async clickUploadButton() {
        await this.page.getByRole('button', { name: 'Upload' }).click();
    }
}