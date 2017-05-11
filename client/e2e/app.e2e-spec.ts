import { InboxPage } from './app.po';

describe('inbox App', () => {
  let page: InboxPage;

  beforeEach(() => {
    page = new InboxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
