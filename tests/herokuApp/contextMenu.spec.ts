import { test, expect } from './Fixtures/heroku.fixtures';

test("verify context menu popup", async ({ contextMenuPage }) => {
    await contextMenuPage.goto();
    await contextMenuPage.ContextMenuPopup();
})
