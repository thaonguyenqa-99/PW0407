import { test, expect } from '@playwright/test';

test('verify success drag and drop', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

    await page.locator('#column-a').dragTo(page.locator('#column-b'))

    await page
        .locator('#column-a')
        .getByRole("banner")
        .evaluate((banner) => banner.textContent)
        .then((text) => {
            expect(text).toContain('B');
        });

    await page
        .locator('#column-b')
        .getByRole("banner")
        .evaluate((banner) => banner.textContent)
        .then((text) => {
            expect(text).toContain('A');
        });
})