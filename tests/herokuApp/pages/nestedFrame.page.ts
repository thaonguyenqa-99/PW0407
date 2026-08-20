import { expect, type Locator, type Page } from '@playwright/test';

export class NestedFramePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/nested_frames');
    }

    async getLeftText() {
        const leftText = await this.page
            .frameLocator('frame[name="frame-top"]')
            .frameLocator('frame[name="frame-left"]')
            .locator('body')
            .evaluate((body) => body.textContent);
        return leftText;
    }

    async getMiddleText() {
        const middleText = await this.page
            .frameLocator('frame[name="frame-top"]')
            .frameLocator('frame[name="frame-middle"]')
            .locator('#content')
            .evaluate((body) => body.textContent);
        return middleText;
    }

    async getRightText() {
        const rightText = await this.page
            .frameLocator('frame[name="frame-top"]')
            .frameLocator('frame[name="frame-right"]')
            .locator('body')
            .evaluate((body) => body.textContent);
        return rightText;
    }

    async getBottomText() {
        const bottomText = await this.page
            .frameLocator('frame[name="frame-bottom"]')
            .locator('body')
            .evaluate((body) => body.textContent);
        return bottomText;
    }


}


