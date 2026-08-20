import { test, expect } from './Fixtures/heroku.fixtures';

test('Verify Entry Ad is displayed and can be closed successfully', async ({ entryAdPage }) => {
    await entryAdPage.goto();
    await entryAdPage.getPopup();
    await entryAdPage.clickClosebutton();
    await entryAdPage.PopupClose();
});