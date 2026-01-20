import{test, expect} from '@playwright/test'

test("Launch browser", async({page})=>{

    await page.goto("https://www.google.com/");
    let title =await page.title();
    console.log(title);
    expect(title).toBe("Google");
});