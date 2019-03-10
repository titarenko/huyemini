import Config from './Config';
import Session from './Session';
import Image from './Image';
declare class ShotApi {
    private config;
    private session;
    private queue;
    constructor(config: Config, session: Session);
    private enqueue;
    goTo(relativeUrl: string): ShotApi;
    mouseDown(selector: string): ShotApi;
    hover(selector: string): ShotApi;
    takeScreenshot(selector: string): Promise<Image>;
}
export default ShotApi;
