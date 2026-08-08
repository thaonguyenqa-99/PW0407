import {test, expect } from './Fixtures/heroku.fixtures';

// test('Checkboxes : Check to a box',async ({checkboxPage}) => {
//     await checkboxPage.goto();

//     await checkboxPage.checkCheckbox(0);
//     await expect(checkboxPage.checkboxes.nth(0)).toBeChecked();
// });

// test('Checkboxes : Uncheck to a box',async ({checkboxPage}) => {
//     await checkboxPage.goto();

//     await checkboxPage.uncheckCheckbox(1);
//     await expect(checkboxPage.checkboxes.nth(1)).not.toBeChecked();
// });


test.describe('Checkboxes', () => {
    test('Check checkbox 1', async ({ checkboxPage }) => {
        await checkboxPage.goto();

        await checkboxPage.checkCheckbox(1);
        expect(await checkboxPage.isCheckboxChecked(1)).toBe(true);

        await checkboxPage.uncheckCheckbox(1);
        expect(await checkboxPage.isCheckboxChecked(1)).toBe(false);
    }); 

    test('Check checkbox 2', async ({ checkboxPage }) => {
        await checkboxPage.goto();

        await checkboxPage.uncheckCheckbox(2);
        expect(await checkboxPage.isCheckboxChecked(2)).toBe(false); 

        await checkboxPage.checkCheckbox(2);
        expect(await checkboxPage.isCheckboxChecked(2)).toBe(true);
    });
})

    




// import {test, expect} from '@playwright/test';

// test('TC02: Checkboxes : Check to a box',async ({page}) => {
//     await page.goto('https://the-internet.herokuapp.com/checkboxes')

//     // await page.getByRole('checkbox').first().check()
//     // await page.locator('#checkboxes input').first().check()
//     await page.locator('#checkboxes input:nth-child(1)').check()
//     // await page.locator('//*[@id="checkboxes"]/input[1]').check()
//     await expect(page.getByRole('checkbox').first()).toBeChecked();
    
//     // await page.getByRole('checkbox').last().check()
//     await page.locator('#checkboxes input:nth-child(3)').check()
//     await expect(page.getByRole('checkbox').last()).toBeChecked();
// });

