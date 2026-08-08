import { test, expect } from '@playwright/test';
const fs = require('fs');
// make delete the downloaded file after the test is completed
test('verify download file successfully', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/download');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('link', { name: 'image.png' }).click();
    const download = await downloadPromise;

    // Wait for the download process to complete and save the downloaded file somewhere.
    // adding time stamp to the filename to avoid overwriting files with the same name
    const dateTimeStamp = Date.now();
    await download.saveAs('test-data/downloads/' + dateTimeStamp + '_' + download.suggestedFilename());
    //verify the downloaded file exists in the specified location

    const filePath = 'test-data/downloads/' + dateTimeStamp + '_' + download.suggestedFilename();
    console.log('Downloaded file path:', filePath);
    expect(fs.existsSync(filePath)).toBeTruthy();
});