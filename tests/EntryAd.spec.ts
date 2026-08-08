import { test, expect } from '@playwright/test';

test('Verify Entry Ad is displayed and can be closed successfully', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/entry_ad');
    await expect(page.getByText('THIS IS A MODAL WINDOW')).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByText('THIS IS A MODAL WINDOW')).not.toBeVisible();
});