import { test, expect } from '../Fixtures/demo.fixtures'
import { TextboxPage } from '../Pages/textbox.page'

test.beforeEach(async ({ textboxPage }) => {
    await textboxPage.goto()
})

test('Verify form submission with valid credentials', async ({ page, textboxPage }) => {
    await textboxPage.fillform('Thao Nguyen', 'thao123@gmail.com', 'ABC', 'DEF')
    await textboxPage.submit()
    await expect(page.locator('#output #name')).toContainText('Thao Nguyen')
    await expect(page.locator('#output #email')).toContainText('thao123@gmail.com')
    await expect(page.locator('#output #currentAddress')).toContainText('ABC')
    await expect(page.locator('#output #permanentAddress')).toContainText('DEF')
})

test('Verify form submission with invalid email', async ({ page, textboxPage }) => {
    await textboxPage.fillform('Thao Nguyen', 'thao', 'ABC', 'DEF')
    await textboxPage.submit()
    await expect(page.locator('#output')).toBeHidden()
    await expect(page.locator('#userEmail')).toHaveClass(/field-error/)
})

test('Verify form submission with some fields left empty', async ({ page, textboxPage }) => {
    await textboxPage.fillform('Thao Nguyen', '', '', '')
    await textboxPage.submit()
    await expect(page.locator('#output #name')).toContainText('Thao Nguyen')
})

test('Verify form submission with all fields left empty', async ({ page, textboxPage }) => {
    await textboxPage.fillform('', '', '', '')
    await textboxPage.submit()
    await expect(page.locator('#output')).toBeHidden()
})