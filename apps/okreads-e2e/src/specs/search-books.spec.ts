import { $, $$, browser, ExpectedConditions } from 'protractor';
import { expect } from 'chai';

describe('When: Use the search feature', () => {
  it('Then: I should be able to search books by title', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const items = await $$('[data-testing="book-item"]');
    expect(items.length).to.be.greaterThan(1, 'At least one book');
  });

  it('Then: Testing Undo Action', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('angular');
    await form.submit();
    const wantToRead = await $('[data-testing="wantToRead"]');
    await wantToRead.click();

    const count = await $('[data-testing="count"]');
    expect(count.getText()).to.exist;
    
  });
});
