// import { test, expect } from '@playwright/test';

// test('Login successful with valid credentials', async ({ page }) => {
//     await page.goto('https://the-internet.herokuapp.com/login');
//     await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
//     await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
//     await page.getByRole('button', { name: ' Login' }).click();
//     await expect(page.getByText('You logged into a secure area')).toBeVisible();
//     await expect(page.locator('h4')).toContainText('Welcome to the Secure Area. When you are done click logout below.');
// });

// test('Login fails with invalid credentials', async ({ page }) => {
//     await page.goto('https://the-internet.herokuapp.com/login');
//     await page.getByRole('textbox', { name: 'Username' }).fill('invaliduser');
//     await page.getByRole('textbox', { name: 'Password' }).fill('invalidpassword');
//     await page.getByRole('button', { name: ' Login' }).click();
//     await expect(page.getByText('Your username is invalid!')).toBeVisible();
// });


// test('Login fails with invalid username', async ({ page }) => {
//     await page.goto('https://the-internet.herokuapp.com/login');
//     await page.getByRole('textbox', { name: 'Username' }).fill('invaliduser');
//     await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
//     await page.getByRole('button', { name: ' Login' }).click();
//     await expect(page.getByText('Your username is invalid!')).toBeVisible();
// });

// test('Login fails with invalid password', async ({ page }) => {
//     await page.goto('https://the-internet.herokuapp.com/login');
//     await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
//     await page.getByRole('textbox', { name: 'Password' }).fill('invalidpassword');
//     await page.getByRole('button', { name: ' Login' }).click();
//     await expect(page.getByText('Your password is invalid!')).toBeVisible();
// });

// test('Login fails with empty username and password', async ({ page }) => {
//     await page.goto('https://the-internet.herokuapp.com/login');
//     await page.getByRole('button', { name: ' Login' }).click();
//     await expect(page.getByText('Your username is invalid!')).toBeVisible();
// });

import { test, expect } from './Fixtures/heroku.fixtures';

test.describe('happy paths', () => {
    test("login successful with valid credentials", {
        tag: ['@wip', '@smoke'], annotation: {
            type: 'issue',
            description: 'https://github.com/microsoft/playwright/issues/23180',
        },
    }, async ({ loginPage }) => {

        await loginPage.goto();
        await loginPage.submitForm('tomsmith', 'SuperSecretPassword!');

        await expect(await loginPage.getSuccessLoginMessage()).toBeVisible();
    });
})

test.describe('edge cases', () => {
    test("login fails with invalid credentials", async ({ loginPage }) => {

        await loginPage.goto();

        await loginPage.submitForm('tomsmith1', 'SuperSecretPassword!');
        await expect(await loginPage.invalidUsernameMessage()).toBeVisible();
    });

    test("login fails with invalid password", async ({ loginPage }) => {

        await loginPage.goto();

        await loginPage.submitForm('tomsmith', 'SuperSecretPassword!1');
        await expect(await loginPage.invalidPasswordMessage()).toBeVisible();
    });
})