import { test, expect } from '@playwright/test';

test('verify username and link of image 1 visibility on hover', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');

    await page.getByRole('img', { name: 'User Avatar' }).nth(2).hover();

    await expect(page.getByRole('heading', { name: 'name: user3' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View profile' })).toBeVisible();
})