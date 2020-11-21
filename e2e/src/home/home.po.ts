import { browser, by, element } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/home');
  }

  providers() {
    return element.all(by.tagName('app-provider-card'));
  }
}
