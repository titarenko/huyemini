/// <reference types="node" />
export default class Image {
    private path;
    constructor(path: string);
    readonly name: string;
    move(newPath: string): Promise<void>;
    /**
     * @param another image to compare current image to
     * @returns difference image or null if current image is identical to another one
     */
    compareTo(another: Image): Promise<Image | null>;
    private load;
    private static fromPng;
    static fromBuffer(buffer: Buffer): Promise<Image>;
    private static getRandomPath;
}
