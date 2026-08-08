import { test, expect } from '@playwright/test';

test('accept js alert dialog', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async (dialog) => {
        await dialog.accept();
    });

    await page.getByRole('button', { name: 'Click for JS Alert' }).click();
    await expect(page.getByText('You successfully clicked an alert')).toBeVisible();
})

test('accept js confirm dialog', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async (dialog) => {
        await dialog.accept();
    });

    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await expect(page.getByText('You clicked: Ok')).toBeVisible();
})

test('cancel js confirm dialog', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    // use for dismiss ads dialog
    page.on('dialog', async (dialog) => {
        await dialog.dismiss();
    });

    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await expect(page.getByText('You clicked: Cancel')).toBeVisible();
})

test('accept js prompt dialog', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    // use for dismiss ads dialog
    page.on('dialog', async (dialog) => {
        await dialog.accept('hello');
    });

    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    await expect(page.getByText('You entered: hello')).toBeVisible();
})