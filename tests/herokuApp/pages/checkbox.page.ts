import { type Page, type Locator } from '@playwright/test';

// export class CheckboxPage {
//     readonly page: Page;
//     readonly checkboxes: Locator;

//     constructor(page: Page) {
//         this.page = page;
//         this.checkboxes = page.getByRole('checkbox');
//     }

//     async goto() {
//         await this.page.goto('https://the-internet.herokuapp.com/checkboxes');
//     }

//     async checkCheckbox(index: number) {
//         await this.checkboxes.nth(index).check();
//     }

//     async uncheckCheckbox(index: number) {
//         await this.checkboxes.nth(index).uncheck();
//     }

//     async isCheckboxChecked(index: number): Promise<boolean> {
//         return await this.checkboxes.nth(index).isChecked();
//     }

//     async isCheckboxUnchecked(index: number): Promise<boolean> {
//         return !(await this.checkboxes.nth(index).isChecked());
//     }
// }

export class CheckboxPage {
    readonly page: Page;
    readonly checkbox1: Locator;
    readonly checkbox2: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkbox1 = page.getByRole('checkbox').first();
        this.checkbox2 = page.getByRole('checkbox').nth(1);
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/checkboxes');
    }

    async checkCheckbox(index: number) {
        if (index === 1) {
            await this.checkbox1.check();
        } else if (index === 2) {
            await this.checkbox2.check();
        }
    }

    async uncheckCheckbox(index: number) {
        if (index === 1) {
            await this.checkbox1.uncheck();
        } else if (index === 2) {
            await this.checkbox2.uncheck();
        }
    }

    async isCheckboxChecked(index: number): Promise<boolean> {
        if (index === 1) {
            return await this.checkbox1.isChecked();
        } else if (index === 2) {
            return await this.checkbox2.isChecked();
        }
        throw new Error(`Invalid checkbox index: ${index}`);
    }

    async isCheckboxUnchecked(index: number): Promise<boolean> {
        if (index === 1) {
            return !(await this.checkbox1.isChecked());
        } else if (index === 2) {
            return !(await this.checkbox2.isChecked());
        }
        throw new Error(`Invalid checkbox index: ${index}`);
    }
}
