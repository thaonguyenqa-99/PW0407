import { test as base } from '@playwright/test'
import { TextboxPage } from '../Pages/textbox.page'

type myFixtures = {
    textboxPage: TextboxPage
};

export const test = base.extend<myFixtures>({
    textboxPage: async ({ page }, use) => {
        await use(new TextboxPage(page))
    }
})
export { expect } from '@playwright/test'