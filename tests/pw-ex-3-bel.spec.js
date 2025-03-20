const {test, expect} = require('@playwright/test');


test('Browser Context Propeller Coordinates Converter Part 1',async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://tools.propelleraero.com/coordinates-converter/");
    // add assertions for the Cookie Alert 
    // confirm visibility

    //confirm strictly necessary checkbox checked by default


    //click accept all button


    //Confirm its been hidden


});