import { test, expect } from './Fixtures/heroku.fixtures';

test('Verify dropdown selection works correctly', async ({ dropdownPage }) => {
    await dropdownPage.goto();
    await dropdownPage.selectOption('1');
    await expect(dropdownPage.dropdown).toHaveValue('1');

    await dropdownPage.selectOption('2');
    await expect(dropdownPage.dropdown).toHaveValue('2');

})


// test('select multiple options successfully', async ({ page }) => {

//     await page.goto('https://qa-demo-site-ten.vercel.app/elements/dropdown')

//     await page.getByTestId('dropdown-multiple').selectOption(['Go', 'Java', 'Python']);
//     await expect(page.getByText('Selected: py, java, go')).toBeVisible();
// })

// test('deselect multiple options successfully', async ({ page }) => {

//     await page.goto('https://qa-demo-site-ten.vercel.app/elements/dropdown')

//     await page.getByTestId('dropdown-multiple').selectOption(['Go', 'Java', 'Python']);
//     await expect(page.getByText('Selected: py, java, go')).toBeVisible();

//     await page.getByTestId('dropdown-multiple').selectOption([]);
//     // await expect(page.getByRole('paragraph').last()).not.toBeVisible();
// })