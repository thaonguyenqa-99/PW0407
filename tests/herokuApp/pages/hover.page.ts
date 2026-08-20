import { type Locator, type Page } from '@playwright/test';

export class HoverPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/hovers');
    }

    async hoverUserAvatar(index: number) {
        await this.page.getByRole('img', { name: 'User Avatar' }).nth(index).hover()
    }

}