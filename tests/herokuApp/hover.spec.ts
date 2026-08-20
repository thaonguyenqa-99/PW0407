import { test, expect } from './Fixtures/heroku.fixtures';

test('verify username and link of image 1 visibility on hover', async ({ hoverPage }) => {
    await hoverPage.goto();
    await hoverPage.hoverUserAvatar(2);
    await expect(hoverPage.page.getByRole('heading', { name: 'name: user3' })).toBeVisible();
})

