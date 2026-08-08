import { test, expect } from '@playwright/test';

test('verify scolling to the bottom of the page', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/infinite_scroll');

    for (let i = 0; i < 5; i++) {

        await page.mouse.wheel(0, 1000);
        //sleep for 1 second to allow the page to load new content
        await page.waitForTimeout(1000);
    }
})