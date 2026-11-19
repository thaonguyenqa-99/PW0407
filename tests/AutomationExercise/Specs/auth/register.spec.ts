import { test, expect } from '../../Fixtures/AutomationExercise.fixtures'

test('Verify new user can register an account successfully', async ({ page, homePage, registerPage }) => {
    await homePage.goto()
    await homePage.clickSignUp_Login()
    await registerPage.FillInfoSignUp('Phuong Thao', `thao${Date.now()}@gmail.com`)
    await registerPage.clickSignUpButton()
    await expect(page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible()

    const user = {
        title: 'Mrs',
        password: 'ntpt260899',
        day: '26',
        month: '8',
        year: '1999',
        firstName: 'Thao',
        lastName: 'Nguyen',
        company: 'ABC Company',
        address1: '123 Nguyen Hue',
        address2: 'Apartment 01',
        country: 'India',
        state: 'AAA',
        city: 'India city',
        zipcode: '123456',
        mobile: '05897624'
    }

    await registerPage.FillAccountInfo(user)
    await registerPage.clickCreateAccountButton()
    await expect(page.getByRole('heading', { name: 'Account Created!' })).toBeVisible()
    await registerPage.clickContinueButton()
    await expect(page.getByText('Logged in as Phuong Thao')).toBeVisible()
})

test('Register user with existing email', async ({ page, homePage, registerPage }) => {
    await homePage.goto()
    await homePage.clickSignUp_Login()
    await registerPage.FillInfoSignUp('Thao Nguyen', 'thaoongyn99@gmail.com')
    await registerPage.clickSignUpButton()
    await expect(page.getByText('Email Address already exist!', { exact: true })).toBeVisible()
})
