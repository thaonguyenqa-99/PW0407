import { test, expect } from './Fixtures/heroku.fixtures';

test('Upload file successfully', async ({ uploadFilePage }) => {
    await uploadFilePage.goto();
    await uploadFilePage.uploadFile('test-data/sample.txt');
    await uploadFilePage.clickUploadButton();
    await expect(uploadFilePage.page.getByRole('heading', { name: 'File Uploaded!' })).toBeVisible();
    await expect(uploadFilePage.page.getByText('sample.txt')).toBeVisible();
})

