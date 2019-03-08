"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor(deserialized) {
        this.basePath = deserialized.basePath;
        this.baseUrl = deserialized.baseUrl;
        this.shotFiles = deserialized.shotFiles;
    }
    static getCurrent() {
        if (!this.current) {
            this.current = this.fromFile('./.shtrexel.config.js');
        }
        return this.current;
    }
    static fromFile(path) {
        return new Config(require(path));
    }
}
exports.default = Config;
//# sourceMappingURL=Config.js.map