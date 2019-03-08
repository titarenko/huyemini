import Config from './Config';
import Image from './Image';
export default class Repository {
    private config;
    private name;
    constructor(config: Config, name: string);
    loadImage(name: string): Promise<Image | null>;
    saveImage(name: string, image: Image): Promise<void>;
}
