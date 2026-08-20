import { test as base } from '@playwright/test';

import { LoginPage } from '../pages/login.page';
import { HorizontalSliderPage } from '../pages/horizontalSlider.page';
import { CheckboxPage } from '../pages/checkbox.page';
import { DropdownPage } from '../pages/dropdown.page';
import { HyperlinkPage } from '../pages/hyperlink.page';
import { UploadFilePage } from '../pages/uploadfile.page';
import { DownloadFilePage } from '../pages/downloadfile.page';
import { NestedFramePage } from '../pages/nestedFrame.page';
import { JsAlertPage } from '../pages/jsAlert.page';
import { HoverPage } from '../pages/hover.page';
import { ScrollPage } from '../pages/scroll.page';
import { DragDropPage } from '../pages/drad_drop.page';
import { ContextMenuPage } from '../pages/contextMenu.page';
import { TablePage } from '../pages/table.page';
import { EntryAdPage } from '../pages/EntryAd.page';

// Declare the types of your fixtures.
type HerokuPages = {
    loginPage: LoginPage;
    horizontalSliderPage: HorizontalSliderPage;
    checkboxPage: CheckboxPage;
    dropdownPage: DropdownPage;
    hyperlinkPage: HyperlinkPage;
    uploadFilePage: UploadFilePage;
    downloadFilePage: DownloadFilePage;
    nestedFramePage: NestedFramePage;
    jsAlertPage: JsAlertPage;
    hoverPage: HoverPage;
    scrollPage: ScrollPage;
    dragdropPage: DragDropPage;
    contextMenuPage: ContextMenuPage;
    tablePage: TablePage;
    entryAdPage: EntryAdPage;

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

    downloadFilePage: async ({ page }, use) => {
        await use(new DownloadFilePage(page));
    },

    nestedFramePage: async ({ page }, use) => {
        await use(new NestedFramePage(page));
    },

    jsAlertPage: async ({ page }, use) => {
        await use(new JsAlertPage(page));
    },

    hoverPage: async ({ page }, use) => {
        await use(new HoverPage(page));
    },

    scrollPage: async ({ page }, use) => {
        await use(new ScrollPage(page));
    },

    dragdropPage: async ({ page }, use) => {
        await use(new DragDropPage(page));
    },

    contextMenuPage: async ({ page }, use) => {
        await use(new ContextMenuPage(page));
    },

    tablePage: async ({ page }, use) => {
        await use(new TablePage(page));
    },

    entryAdPage: async ({ page }, use) => {
        await use(new EntryAdPage(page));
    }

});

export { expect } from '@playwright/test';