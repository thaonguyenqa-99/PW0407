import { test as base } from '@playwright/test';
import { TextBoxPage } from '../Pages/textBox.page';

type DemoQAPage = {
    textBoxPage: TextBoxPage;
}

export const test = base.extend<DemoQAPage>({
    textBoxPage: async ({ page }, use) => {
        await use(new TextBoxPage(page))
    },
})

export { expect } from '@playwright/test';
