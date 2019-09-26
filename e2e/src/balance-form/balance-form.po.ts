import { browser, by, element } from 'protractor';

export class BalanceFormPage {
  navigateTo() {
    return browser.get('/refill/1');
  }

  form() {
    return element(by.css('form'));
  }

  phoneNumber() {
    return element(by.css('#phoneNumber'));
  }

  amount() {
    return element(by.css('#amount'));
  }

  submit() {
    return element(by.css('.btn-primary'));
  }

  message() {
    return element(by.css('.form-text'));
  }

}
