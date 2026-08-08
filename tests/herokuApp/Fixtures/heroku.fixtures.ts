import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HorizontalSliderPage } from '../pages/horizontalSlider.page';
import { CheckboxPage } from '../pages/checkbox.page';
import { DropdownPage } from '../pages/dropdown.page';
import { HyperlinkPage } from '../pages/hyperlink.page';
import { UploadFilePage } from '../pages/uploadfile.page';

// Declare the types of your fixtures.
type HerokuPages = {
    loginPage: LoginPage;
    horizontalSliderPage: HorizontalSliderPage;
    checkboxPage: CheckboxPage;
    dropdownPage: DropdownPage;
    hyperlinkPage: HyperlinkPage;
    uploadFilePage: UploadFilePage;
};


export const test = base.extend<HerokuPages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    horizontalSliderPage: async ({ page }, use) => {
        await use(new HorizontalSliderPage(page));
    },

    checkboxPage: async ({ page }, use) => {
        await use(new CheckboxPage(page));
    },

    dropdownPage: async ({ page }, use) => {
        await use(new DropdownPage(page));
    },

    hyperlinkPage: async ({ page }, use) => {
        await use(new HyperlinkPage(page));
    },

    uploadFilePage: async ({ page }, use) => {
        await use(new UploadFilePage(page));
    },

});

export { expect } from '@playwright/test';