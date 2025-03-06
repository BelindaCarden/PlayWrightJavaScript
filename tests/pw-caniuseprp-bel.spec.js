const {test, expect} = require('@playwright/test');


test('Page Context Can I Use Propeller',async ({page})=>
{
    await page.goto("https://caniuse.propelleraero.com/");
    //get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Can I use Propeller?");

    
    });