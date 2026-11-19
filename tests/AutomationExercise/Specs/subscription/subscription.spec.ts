import { test, expect } from '../../Fixtures/AutomationExercise.fixtures'

test('Verify user can subscribe email address on the home page', async ({ page, homePage }) => {
    await homePage.goto()
    await homePage.scrollDownFooter()
    await expect(page.getByRole('heading', { name: 'Subscription', exact: true })).toBeVisible()
    await page.getByPlaceholder('Your email address').fill('thaoongyn99@gmail.com')
    await page.locator('#subscribe').click()
    await expect(page.locator('.alert-success')).toHaveText('You have been successfully subscribed!')
})

test('Verify user can subscribe email adress on the cart page', async ({ page, homePage }) => {
    await homePage.goto()
    await homePage.gotoCart()
    // await page.locator('#footer').scrollIntoViewIfNeeded()
    await homePage.scrollDownFooter()
    await expect(page.getByRole('heading', { name: 'Subscription', exact: true })).toBeVisible()
    await page.getByPlaceholder('Your email address').fill('thaoongyn99@gmail.com')
    await page.locator('#subscribe').click()
    await expect(page.locator('.alert-success')).toHaveText('You have been successfully subscribed!')
})