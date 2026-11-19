import { test, expect } from '../../Fixtures/AutomationExercise.fixtures'

test('Verify user can place order and register while checkout successfully', async ({ page, homePage, registerPage }) => {
    await homePage.goto()
    const product = page.locator('.product-image-wrapper').filter({ hasText: 'Sleeveless Dress' })
    const hoverProduct = product.hover()
    await product.locator('.product-overlay .add-to-cart').click()
    await page.getByRole('link', { name: 'View Cart' }).click()
    await expect(page).toHaveURL('https://automationexercise.com/view_cart')
    await expect(page.locator('#cart_info_table')).toBeVisible()
    await page.locator('.container .check_out').click()
    await expect(page.locator('.modal-content')).toBeVisible()
    await page.getByRole('link', { name: 'Register / Login' }).click()
    await registerPage.FillInfoSignUp('Trung Le', `trung${Date.now()}@gmail.com`)
    await registerPage.clickSignUpButton()

    const user = {
        title: 'Mr.',
        password: 'trunglee96',
        day: '10',
        month: '8',
        year: '1996',
        firstName: 'Trung',
        lastName: 'Le',
        company: '123 Company',
        address1: '123 Nguyen Hue',
        address2: 'Apartment 01',
        country: 'Canada',
        state: 'AAA',
        city: 'NY city',
        zipcode: '123456',
        mobile: '05897624'
    }

    await registerPage.FillAccountInfo(user)
    await registerPage.clickCreateAccountButton()
    await registerPage.clickContinueButton()
    await expect(page.getByText('Logged in as Trung Le')).toBeVisible()
    await homePage.gotoCart()
    await page.locator('.container .check_out').click()
    await expect(page.getByRole('heading', { name: 'Address Details' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Review Your Order' })).toBeVisible()
    await expect(page.locator('.table')).toBeVisible()

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
    await expect(page.getByText('Logged in as Trung Le')).toBeHidden()

})