import { test, expect } from './Fixtures/heroku.fixtures';

test('accept js alert dialog', async ({ jsAlertPage }) => {
    await jsAlertPage.goto();
    await jsAlertPage.acceptJsAlert();
})

test('accept js confirm dialog', async ({ jsAlertPage }) => {
    await jsAlertPage.goto();
    await jsAlertPage.acceptJsConfirm();

    await expect(jsAlertPage.page.getByText('You clicked: Ok')).toBeVisible();
})

test('cancel js confirm dialog', async ({ jsAlertPage }) => {
    await jsAlertPage.goto();
    await jsAlertPage.cancelJsConfirm();

    await expect(jsAlertPage.page.getByText('You clicked: Cancel')).toBeVisible();
})

test('enter text in js prompt dialog', async ({ jsAlertPage }) => {
    await jsAlertPage.goto();
    await jsAlertPage.enterTextInJsPrompt('Hello World');

    await expect(jsAlertPage.page.getByText('You entered: Hello World')).toBeVisible();
})

