import { browser } from 'protractor';

import { BalanceFormPage } from './balance-form.po';

describe('workspace-project BalanceForm', () => {
  let page: BalanceFormPage;

  beforeEach(() => {
    page = new BalanceFormPage();
  });

  it('should be created', () => {
    page.navigateTo();
  });

  it('form should be displayed, submit button should be disabled', () => {
    page.navigateTo();

    browser.wait(page.form().getWebElement());

    expect(page.form).toBeDefined();
    expect(page.submit().getAttribute('disabled')).toBeTruthy();
    expect(page.phoneNumber().getAttribute('value')).toBe('');
    expect(page.amount().getAttribute('value')).toBe('');
  });

  it('submit button should be enabled, when form is valid', () => {
    page.navigateTo();

    browser.wait(page.form().getWebElement());

    expect(page.submit().getAttribute('disabled')).toBeTruthy();

    page.phoneNumber().sendKeys('11111111111');
    page.amount().sendKeys(10);
    expect(page.submit().getAttribute('disabled')).toBeFalsy();
  });

  it('submit button should be disabled, when form is invalid', async () => {
    page.navigateTo();

    browser.wait(page.form().getWebElement());

    expect(page.submit().getAttribute('disabled')).toBeTruthy();

    await page.phoneNumber().sendKeys('1111111111');
    await page.amount().sendKeys(10);
    expect(page.submit().getAttribute('disabled')).toBeTruthy();
    browser.sleep(1000);

    await page.amount().clear();
    await page.amount().sendKeys(1001);
    expect(page.submit().getAttribute('disabled')).toBeTruthy();
    browser.sleep(1000);
    expect(page.message().getText()).toBe('Refill amount must be less than or equal 1000 RUB');

    await page.amount().clear();
    await page.amount().sendKeys(0);
    browser.sleep(1000);
    expect(page.message().getText()).toBe('Refill amount must be greater than or equal to 1 RUB');
  });

  it('check text masks', () => {
    page.navigateTo();

    browser.wait(page.form().getWebElement());

    page.phoneNumber().sendKeys('11111111111');
    expect(page.phoneNumber().getAttribute('value')).toBe('+1 (111) 111-11-11');

    page.amount().sendKeys(100.111);
    expect(page.amount().getAttribute('value')).toBe('100.11');
  });
});
