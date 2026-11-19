import { test, expect } from '../../Fixtures/AutomationExercise.fixtures'

test('Verify user can submit the Contact Us Form', async ({ page, homePage }) => {
    await homePage.goto()
    await homePage.gotoContactUs()
    await page.waitForLoadState('load')
    // await page.waitForFunction(() => {
    //     const form = document.querySelector('#contact-us-form')
    //     if (!form) return false

    //     const events = (window as any).jQuery?._data(form, 'events')
    //     return (events?.submit?.length ?? 0) > 0
    // })
    await expect(page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible()
    await page.getByPlaceholder('Name').fill('Thao')
    await page.locator('.contact-form').getByPlaceholder('Email').fill('thaoonguyn99@gmail.com')
    await page.getByPlaceholder('Subject').fill('Clothes')
    await page.getByPlaceholder('Your Message Here').fill('I want to return a product')
    await page.locator('input[name="upload_file"]').setInputFiles('test-data/uploads/fileUpload.jpg')


    page.once('dialog', async (dialog) => {
        await dialog.accept()
    })

    await page.locator('[data-qa="submit-button"]').click()

    await expect(page.locator('.status')).toHaveText(
        'Success! Your details have been submitted successfully.',
    )
    await page.locator('.contact-form').getByRole('link', { name: 'Home' }).click()
    await expect(page.getByRole('img', { name: 'Website for automation practice' })).toBeVisible()

})