import * as puppeteer from 'puppeteer';
import Config from './Config';
import Session from './Session';
import Image from './Image';
declare class ShotApi {
    private config;
    private session;
    constructor(config: Config, session: Session);
    goTo(relativeUrl: string): Promise<ShotApi>;
    evaluate(fn: puppeteer.EvaluateFn, ...args: puppeteer.SerializableOrJSHandle[]): Promise<ShotApi>;
    takeScreenshot(selector: string): Promise<Image>;
}
export default ShotApi;
