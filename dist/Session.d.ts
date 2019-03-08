import * as puppeteer from 'puppeteer';
export default class Session {
    private browser;
    private page;
    getPage(): Promise<puppeteer.Page>;
}
