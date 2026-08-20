import { test, expect } from './Fixtures/heroku.fixtures';
const fs = require('fs');
// make delete the downloaded file after the test is completed
test('verify download file successfully', async ({ downloadFilePage }) => {
    await downloadFilePage.goto();

    // Wait for the download process to complete and save the downloaded file somewhere.
    // adding time stamp to the filename to avoid overwriting files with the same name
    const download = await downloadFilePage.waitForDownload('Photo.jpeg');
    const dateTimeStamp = Date.now();
    await download.saveAs('test-data/downloads/' + dateTimeStamp + '_' + download.suggestedFilename());
    //verify the downloaded file exists in the specified location

    const filePath = 'test-data/downloads/' + dateTimeStamp + '_' + download.suggestedFilename();
    console.log('Downloaded file path:', filePath);
    expect(fs.existsSync(filePath)).toBeTruthy();
});