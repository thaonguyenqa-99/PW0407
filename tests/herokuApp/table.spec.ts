// import { test, expect } from '@playwright/test';

// test('Validate largest due person from table 1', async ({ page }) => {
//     await page.goto('https://the-internet.herokuapp.com/tables');

//     // Lấy tất cả các dòng của Table 1 (bỏ dòng header)
//     const rows = page.locator('#table1 tbody tr');
//     const rowCount = await rows.count();

//     let maxDue = 0;
//     let largestDuePerson = '';

//     for (let i = 0; i < rowCount; i++) {
//         const row = rows.nth(i);

//         const lastName = await row.locator('td').nth(0).textContent();
//         const firstName = await row.locator('td').nth(1).textContent();
//         const dueText = await row.locator('td').nth(3).textContent();

//         const due = Number(dueText?.replace('$', ''));

//         if (due > maxDue) {
//             maxDue = due;
//             largestDuePerson = `${lastName} ${firstName}`;
//         }
//     }

//     expect(largestDuePerson).toBe('Doe Jason');
// });

// test('verify max due person in table1', async ({ page }) => {
//     await page.goto('https://the-internet.herokuapp.com/tables');


//     const dueColumn = await page.locator("//table[@id='table1']/tbody/tr/td[4]");
//     // console.log(await dueColumn.count());
//     //loop through the due column and find the max due value
//     const dueValues = await dueColumn.evaluateAll((dues) => {
//         return dues.map((due) => {
//             const dueValue = parseFloat(due.textContent.replace('$', ''));
//             // console.log(dueValue);
//             return dueValue;
//         });
//     })
//     //find max value in dueValues array
//     console.log(dueValues);
//     const maxDueValue = Math.max(...dueValues);
//     console.log(maxDueValue);
//     const maxDueIndex = dueValues.indexOf(maxDueValue);
//     console.log(maxDueIndex);

//     const firstName = await page.locator(`//table[@id='table1']/tbody/tr[${maxDueIndex + 1}]/td[2]`).textContent();
//     const lastName = await page.locator(`//table[@id='table1']/tbody/tr[${maxDueIndex + 1}]/td[1]`).textContent();
//     console.log(firstName, lastName);
//     expect(`${lastName} ${firstName}`).toBe('Doe Jason');

// }) 

import { test, expect } from './Fixtures/heroku.fixtures';
import { RowData } from './pages/table.page';
// besiness logic flow
let table1Data: RowData[];
test.describe('Table1', () => {
    test.beforeEach(async ({ tablePage }) => {
        //focus table 1
        table1Data = await tablePage.getTableData(1);

        console.log('Table 1:', table1Data);
    });

    test('verify max due person', async ({ tablePage }) => {
        //The person who has largest due is "Doe Jacson"
        // expected is array because there could be multiple people with the same max due
        console.log('Max due person:', await tablePage.getMaxduePerson(table1Data));
        expect(await tablePage.getMaxduePerson(table1Data)).toStrictEqual(['Doe Jason']);
    })

    // test('verify min due person', async ({ tablePage }) => {
    //     expect(await tablePage.getMinduePerson(table1Data)).toStrictEqual(['Smith John', 'Conway Tim']);
    // })
});