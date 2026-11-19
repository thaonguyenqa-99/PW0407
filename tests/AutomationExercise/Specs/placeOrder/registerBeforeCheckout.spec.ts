import { test, expect } from '../../Fixtures/AutomationExercise.fixtures'

test('Verify that a registered user can succesfully place an order', async ({ page, homePage, registerPage, cartPage, productsPage }) => {
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

    await homePage.viewProduct('Blue Top')
    await cartPage.addToCart()
    await page.getByRole('link', { name: 'View Cart' }).click()
    await expect(page.locator('#cart_info_table')).toBeVisible()
    await page.locator('.container .check_out').click()
    await expect(page.getByRole('heading', { name: 'Address Details' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Review Your Order' })).toBeVisible()
    await expect(page.locator('#cart_info')).toBeVisible()

    await page.locator('[name="message"]').fill('Nhanh giùm cái')
    await page.getByRole('link', { name: 'Place Order' }).click()

    await expect(page.getByRole('heading', { name: 'Payment' })).toBeVisible()
    await page.locator('input[name="name_on_card"]').fill('Thao Nguyen')
    await page.locator('input[name="card_number"]').fill('123456789')
    await page.locator('input[name="cvc"]').fill('ex.311')
    await page.locator('input[name="expiry_month"]').fill('08')
    await page.locator('input[name="expiry_year"]').fill('2030')
    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click()

    await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible()
    await homePage.deleteAccount()
    await expect(page.getByRole('heading', { name: 'Account Deleted!', exact: true })).toBeVisible()
    await page.getByRole('link', { name: 'Continue' }).click()
    await expect(page.getByText('Logged in as Phuong Thao')).toBeHidden()
})