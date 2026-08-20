import { expect, type Locator, type Page } from '@playwright/test';

export class DownloadFilePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/download');
    }

    async waitForDownload(filename: string) {
        const downloadPromise = this.page.waitForEvent('download');
        await this.page.getByRole('link', { name: filename }).click();
        const download = await downloadPromise;
        return download;
    }
}