import { test, expect } from '../Fixtures/swaglabs.fixtures';

test("Login successfully with valid credential", async ({ loginPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "secret_sauce")
    await expect(await loginPage.page.locator('[data-test="title"]')).toHaveText("Products");
})

test("Login fail with invalid username", async ({ loginPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user!", "secret_sauce")
    await expect(loginPage.page.locator('[data-test="error"]')).toHaveText("Epic sadface: Username and password do not match any user in this service")
    await expect(loginPage.page.locator('[data-test = "error-button"]')).toBeVisible()
    await loginPage.page.locator('[data-test = "error-button"]').click()
    await expect(loginPage.page.locator('[data-test="error"]')).toBeHidden()
})

test("Login fail with empty username", async ({ loginPage }) => {
    await loginPage.goto()
    await loginPage.login("", "secret_sauce")
    await expect(loginPage.page.locator('[data-test="error"]')).toHaveText("Epic sadface: Username is required")
    await expect(loginPage.page.locator('[data-test = "error-button"]')).toBeVisible()
    await loginPage.page.locator('[data-test = "error-button"]').click()
    await expect(loginPage.page.locator('[data-test="error"]')).toBeHidden()
})

test("Login fail with empty password", async ({ loginPage }) => {
    await loginPage.goto()
    await loginPage.login("standard_user", "")
    await expect(loginPage.page.locator('[data-test="error"]')).toHaveText("Epic sadface: Password is required")
    await expect(loginPage.page.locator('[data-test = "error-button"]')).toBeVisible()
    await loginPage.page.locator('[data-test = "error-button"]').click()
    await expect(loginPage.page.locator('[data-test="error"]')).toBeHidden()
})

