import { expect, type Locator, type Page } from '@playwright/test';

export class ScrollPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {

        await this.page.goto('https://the-internet.herokuapp.com/infinite_scroll')

    }

    async ScrollDown() {

        await this.page.mouse.wheel(0, 1000);
        await this.page.waitForTimeout(1000);
    }

}