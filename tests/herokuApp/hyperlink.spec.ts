// import { test, expect } from './Fixtures/heroku.fixtures';

// test('verify success on clicking hyperlink', async ({ page, hyperlinkPage }) => {
//     await hyperlinkPage.goto();

//     await hyperlinkPage.clickLinkStatusCode('200');
//     await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes/200');
//     await hyperlinkPage.clickHereLink();
//     await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes');

//     await hyperlinkPage.clickLinkStatusCode('301');
//     await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes/301');
//     await hyperlinkPage.clickHereLink();
//     await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes');

//     await hyperlinkPage.clickLinkStatusCode('404');
//     await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes/404');
//     await hyperlinkPage.clickHereLink();
//     await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes');

//     await hyperlinkPage.clickLinkStatusCode('500');
//     await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes/500');
//     await hyperlinkPage.clickHereLink();
//     await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes');

// })

import { test, expect } from './Fixtures/heroku.fixtures';

test('verify success on clicking hyperlink', async ({ page, hyperlinkPage }) => {
    await hyperlinkPage.goto();

    const statusCodes = ['200', '301', '404', '500'];

    for (const status of statusCodes) {
        await hyperlinkPage.clickLinkStatusCode(status);

        await expect(page).toHaveURL(
            `https://the-internet.herokuapp.com/status_codes/${status}`
        );

        await hyperlinkPage.clickHereLink();

        await expect(page).toHaveURL(
            'https://the-internet.herokuapp.com/status_codes'
        );
    }
});
