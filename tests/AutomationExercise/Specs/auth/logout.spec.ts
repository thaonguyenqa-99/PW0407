import { test, expect } from '../../Fixtures/AutomationExercise.fixtures'

test('Verify user can logout successfully', async ({ page, loginPage, homePage, logoutPage }) => {
    await homePage.goto()
    await homePage.clickSignUp_Login()
    await loginPage.fillInfoLogin('thaoongyn99@gmail.com', 'ntpt260899')
    await loginPage.clickLoginButton()
    await expect(page.getByText('Logged in as Thao Nguyen')).toBeVisible()
    await logoutPage.clickLogout()
    await expect(page.getByText('Logged in as Thao Nguyen')).toBeHidden()
})