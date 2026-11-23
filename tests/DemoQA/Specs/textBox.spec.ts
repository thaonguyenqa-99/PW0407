import { test, expect } from '../Fixtures/demoqa.fixtures';

test('submits all valid text box values', async ({ textBoxPage }) => {
    await textBoxPage.goto()
    await textBoxPage.fillForm({
        fullName: 'Demo User',
        email: 'demo.user@example.com',
        currentAddress: '123 Current Street',
        permanentAddress: '456 Permanent Avenue',
    })
    await textBoxPage.submit()

    await expect(textBoxPage.output).toBeVisible()
    await expect(textBoxPage.getResult('name')).toHaveText('Name:Demo User')
    await expect(textBoxPage.getResult('email')).toHaveText('Email:demo.user@example.com')
    await expect(textBoxPage.getResult('currentAddress')).toHaveText('Current Address :123 Current Street')
    await expect(textBoxPage.getResult('permanentAddress')).toHaveText('Permananet Address :456 Permanent Avenue')
})

test('rejects an invalid email address', async ({ textBoxPage }) => {
    await textBoxPage.goto()
    await textBoxPage.fillForm({
        fullName: 'Demo User',
        email: 'not-an-email',
        currentAddress: '',
        permanentAddress: '',
    })
    await textBoxPage.submit()

    await expect(textBoxPage.invalidEmailInput).toBeVisible()
    await expect(textBoxPage.output).toBeHidden()
})

test('does not display output when all fields are empty', async ({ textBoxPage }) => {
    await textBoxPage.goto()
    await textBoxPage.fillForm({
        fullName: '',
        email: '',
        currentAddress: '',
        permanentAddress: '',
    })
    await textBoxPage.submit()

    await expect(textBoxPage.output).toBeHidden()
})

test('submits valid values when optional address fields are empty', async ({ textBoxPage }) => {
    await textBoxPage.goto()
    await textBoxPage.fillForm({
        fullName: 'Demo User',
        email: 'demo.user@example.com',
        currentAddress: '',
        permanentAddress: '',
    })
    await textBoxPage.submit()

    await expect(textBoxPage.output).toBeVisible()
    await expect(textBoxPage.getResult('name')).toHaveText('Name:Demo User')
    await expect(textBoxPage.getResult('email')).toHaveText('Email:demo.user@example.com')
    await expect(textBoxPage.getResult('currentAddress')).toBeHidden()
    await expect(textBoxPage.getResult('permanentAddress')).toBeHidden()
})
