import { expect, type Locator, type Page } from '@playwright/test';

export class DragDropPage {
    readonly page: Page;
    readonly columns: Locator;

    constructor(page: Page) {
        this.page = page;
        this.columns = page.locator('[id^="column-"]');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/drag_and_drop')
    }

    async DragAndDrop(sourceIndex: number, TargetIndex: number) {

        await this.columns.nth(sourceIndex).dragTo(this.columns.nth(TargetIndex));
    }

}
