import { test, expect } from './Fixtures/heroku.fixtures';

test('verify success drag and drop', async ({ dragdropPage }) => {
    await dragdropPage.goto();
    await dragdropPage.DragAndDrop(0, 1);
    await expect(dragdropPage.columns.nth(0)).toContainText('B');
    await expect(dragdropPage.columns.nth(1)).toContainText('A');
})

