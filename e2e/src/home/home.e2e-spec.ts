import { browser } from 'protractor';

import { HomePage } from './home.po';

describe('workspace-project Home', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should be created', () => {
    page.navigateTo();
  });

  it('providers should be displayed', () => {
    page.navigateTo();
    browser.sleep(1000);

    browser.wait(page.providers().first().getWebElement());

    expect(page.providers()).toBeDefined();
    expect(page.providers().count()).toBe(3);
  });
});
