import { browser, by, element } from 'protractor';

export class RefillFormPage {
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
    return element(by.buttonText('Submit'));
  }

  message() {
    return element(by.tagName('mat-hint'));
  }
}
