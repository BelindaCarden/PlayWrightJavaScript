const {test, expect} = require('@playwright/test');


test('Browser Context Propeller Coordinates Converter Part 2',async ({page})=>
{
    await page.goto("https://tools.propelleraero.com/coordinates-converter/");
    // add assertions for the Cookie Alert 
    // confirm visibility
    await expect(page.locator('#cookiescript_injected')).toBeVisible();
    //confirm strictly necessary checkbox checked by default
    await expect(page.locator('#cookiescript_category_strict')).toBeChecked();
    //click accept all button
    await page.locator('#cookiescript_accept').click();
    //Confirm its been hidden
    expect(page.locator('#cookiescript_injected')).toBeHidden();
   
    // switch Convert to Easting/Northing tab
    await page.locator(`[data-test-id="from-projected"]`).click();
    // enter coordinates
    // easting
    await page.getByRole('textbox').first().click(); 
    await page.getByRole('textbox').first().fill('3512224.362');
    // northing
    await page.getByRole('textbox').nth(1).click();
    await page.getByRole('textbox').nth(1).fill('5755385.819');
    // elevation
    await page.getByRole('textbox').nth(2).click();
    await page.getByRole('textbox').nth(2).fill('120.835');
    // select coordinate system
    await page.getByRole('textbox', { name: 'Type to search...' }).click();
    await page.getByRole('textbox', { name: 'Type to search...' }).fill('5683');
    await page.getByRole('option', { name: 'DB_REF / 3-degree Gauss-' }).click();
    // select vertical datum
    await page.locator('[data-test-id="from-vertical-datum"]').getByRole('textbox', { name: 'Type to search...' }).click();
    await page.locator('[data-test-id="from-vertical-datum"]').getByRole('textbox', { name: 'Type to search...' }).fill('7837');
    await page.getByRole('option', { name: 'DHHN2016 (DHHN2016) (EPSG' }).click();
    // add assertions for values on convert to panel
    // confirm easting
    expect(page.getByRole('textbox').first().inputValue()).resolves.toBe('3512224.362');
    //confirm northing
    expect(page.getByRole('textbox').nth(1).inputValue()).resolves.toBe('5755385.819');
    //confirm elevation
    expect(page.getByRole('textbox').nth(2).inputValue()).resolves.toBe('120.835');
    //confirm coordinate system
    await expect(page.getByRole('textbox', { name: 'Type to search...' }).nth(0).inputValue()).resolves.toBe('DB_REF / 3-degree Gauss-Kruger zone 3 (E-N) (EPSG 5683)');
    //confirm vertical dataum
    await expect(page.getByRole('textbox', { name: 'Type to search...' }).nth(1).inputValue()).resolves.toBe('DHHN2016 (DHHN2016) (EPSG 7837)');

    //click send us your feedback link to open page in new tab 
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Send us your feedback!' }).click();
    const page1 = await page1Promise;
    //assert page title
    await page1.waitForLoadState('domcontentloaded'); 
    await expect(page1).toHaveTitle('Coordinates Converter Feedback')
    //assert page url
    expect(page1).toHaveURL('https://propelleraero.typeform.com/to/GgCE12');


});