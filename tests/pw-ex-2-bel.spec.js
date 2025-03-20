const {test, expect} = require('@playwright/test');
const dotenv = require('dotenv').config({ override: true });

test('Propeller Login Page and Demo Sites Validation', async ({page})=> 
{
    await page.goto("https://app.api-staging.prpeller.com/login_e2e_tests/");

    //to select the login fields look at locators - css 
    await page.locator('#id_username').fill(process.env.USERNAME);
    await page.locator('#id_password').fill(process.env.PASSWORD);
    await  page.locator('#id_login_e2e_tests_key').fill(process.env.E2E_KEY);
    //click sign in button
    await page.locator("[value='Sign in']").click();
    //assertion for visibility of top nav bar
    await page.locator('#mothership').isVisible();
    //click on the demo sites
    await page.locator('text="Demo Sites"').click();
    await page.locator('[data-testid="site-chooser-galleryitemcontents-site-title"]').first().waitFor();
    //extract all site names and print in console
    const allSites = await page.locator('[data-testid="site-chooser-galleryitemcontents-site-title"]').allTextContents();
    allSites.sort();
    console.log(allSites);
    // validate expected Sites Names matches allSites
    expect(allSites).toEqual([
        'Commercial Build',
        'Creek',
        'Harbour Development',
        'Landfill',
        'Lidar',
        'Mid Size Road Job—64th Street',
        'Mine Site',
        'Road Construction',
        'Subdivision Build',
    ]);
    

});