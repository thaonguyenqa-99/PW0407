import { test, expect } from './Fixtures/heroku.fixtures';

test('verify scolling to the bottom of the page', async ({ scrollPage }) => {

    await scrollPage.goto();

    for (let i = 0; i < 5; i++) {
        await scrollPage.ScrollDown();
    }

})

