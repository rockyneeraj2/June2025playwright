import { test, expect } from '@playwright/test';

test('handle frame', async ({ page }) => {

    await page.goto("https://testpages.eviltester.com/pages/embedded-pages/frames/");

    //page.frames():
    let no_of_frames = page.frames();
    console.log(`no of frames : " ${no_of_frames.length}`);

    let frame2 = page.frame({url:'/frame-includes/middle.html'})

    // //interact with frames using name or url or locator or index
    // let frame1 = page.frame({ name: 'left' })

    // // frame1.waitForSelector("h1",{state:'visible'})
    // if (frame1) {
    //     const ele = await frame1.waitForSelector("h1", { state: 'visible' })
    //     const text = frame1.locator("h1");
    //     await expect(text).toHaveText("Left");

    // }
    // else {
    //     console.error(" the left named frame is not available");
    // }

});