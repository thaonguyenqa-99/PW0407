import { test, expect } from '../../Fixtures/AutomationExercise.fixtures'

test('Verify user can login with valid credentails', async ({ page, homePage, loginPage }) => {
    await homePage.goto()
    await homePage.clickSignUp_Login()
    await loginPage.fillInfoLogin('thaoongyn99@gmail.com', 'ntpt260899')
    await loginPage.clickLoginButton()
    await expect(page.getByText('Logged in as Thao Nguyen')).toBeVisible()
})

test('Verify user cannot login with invalid credentials', async ({ page, homePage, loginPage }) => {
    await homePage.goto()
    await homePage.clickSignUp_Login()
    await loginPage.fillInfoLogin('invalidemail@gmail.com', 'invalidPW')
    await loginPage.clickLoginButton()
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible()
})


