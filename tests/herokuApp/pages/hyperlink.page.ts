import { expect, type Locator, type Page } from '@playwright/test';

export class HyperlinkPage {
    readonly page: Page;
    readonly HereLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.HereLink = page.getByRole('link', { name: 'Here' });
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/status_codes');
    }

    async clickLinkStatusCode(status: string) {
        const linkStatusCode = this.page.getByRole('link', { name: status });
        await linkStatusCode.click();
    }

    async clickHereLink() {
        await this.HereLink.click();
    }

}
