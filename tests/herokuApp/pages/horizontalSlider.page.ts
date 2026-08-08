import { type Locator, type Page } from '@playwright/test';

export class HorizontalSliderPage {
    readonly page: Page;
    readonly slider: Locator;
    readonly range: Locator;

    constructor(page: Page) {
        this.page = page;
        this.slider = page.getByRole('slider');
        this.range = page.locator('#range');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/horizontal_slider');
    }

    async setSlider(value: number) {
        let sliderValue = Number(await this.range.innerText());

        while (sliderValue < value) {
            await this.slider.press('ArrowRight');
            sliderValue = Number(await this.range.innerText());
        }
    }

    async getSliderValue(): Promise<number> {
        return Number(await this.range.innerText());
    }
}