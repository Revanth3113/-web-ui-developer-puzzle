import { $, browser, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('Then: Reading completed action', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('java');
    await form.submit();
    const wantToRead = await $('[data-testing="wantToRead"]');
    await wantToRead.click();


    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    const readingCompleted = await $('[data-testing="readingCompleted"]');
    await readingCompleted.click();

    
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="finished"]'),
        'Finished'
      )
    );
  });  
  
  
});
