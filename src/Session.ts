import puppeteer from 'puppeteer'

export default class Session {
  private browser: puppeteer.Browser
  private page: puppeteer.Page

  async getPage(): Promise<puppeteer.Page> {
    if (!this.browser) {
      this.browser = await puppeteer.launch();
    }
    if (!this.page) {
      this.page = await this.browser.newPage();
    }
    return this.page;
  }
}
