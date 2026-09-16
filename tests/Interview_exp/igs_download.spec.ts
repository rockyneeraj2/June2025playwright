import {test} from '@playwright/test'

//A good real-world example is GitHub, where clicking a release/download link triggers a file download.
// The key Playwright method is page.waitForEvent('download').

test('download',async ({page})=>{

    await page.goto("https://demoqa.com/upload-download");

    // Start waiting for the download BEFORE clicking
    const downloadPromise = await page.waitForEvent('download')

    await page.locator("#downloadButton").click();

      const download = await downloadPromise;

    console.log('File name:', download.suggestedFilename());

    await download.saveAs(
        `downloads/${download.suggestedFilename()}`
    );


});