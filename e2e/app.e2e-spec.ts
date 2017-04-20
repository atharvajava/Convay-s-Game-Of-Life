import { CGOLPage } from './app.po';

describe('cgol App', () => {
  let page: CGOLPage;

  beforeEach(() => {
    page = new CGOLPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
