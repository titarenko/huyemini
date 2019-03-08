export default class Config {
    private static current;
    readonly basePath: string;
    readonly baseUrl: string;
    readonly shotFiles: string;
    private constructor();
    static getCurrent(): Config;
    static fromFile(path: string): Config;
}
