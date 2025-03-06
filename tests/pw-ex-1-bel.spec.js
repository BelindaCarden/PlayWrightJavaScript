const {test, expect} = require('@playwright/test');


test('Browser Context Propeller Coordinates Converter Part 1',async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://tools.propelleraero.com/coordinates-converter/");
    //get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Coordinates Converter - Propeller");

    
    });