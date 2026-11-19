import { test, expect } from '../../Fixtures/AutomationExercise.fixtures'

test('Verify user can add review on product', async ({ page, homePage, productsPage }) => {
    await homePage.goto()
    await homePage.gotoProductsPage()
    await expect(page.getByRole('heading', { name: 'ALL PRODUCTS' })).toBeVisible()
    await productsPage.viewProduct('Blue Top')
    await expect(page.getByRole('link', { name: 'WRITE YOUR REVIEW' })).toBeVisible()
    await page.getByPlaceholder('Your Name').fill('Thao Nguyen')
    await page.locator('#review-form').getByPlaceholder('Email Address').fill('thaoongyn99@gmail.com')
    await page.getByPlaceholder('Add Review Here!').fill('Your product is good')
    await page.getByRole('button', { name: 'Submit' }).click()
    await expect(page.getByText('Thank you for your review')).toBeVisible()
})