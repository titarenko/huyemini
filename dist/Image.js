"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const os_1 = require("os");
const pngjs_1 = require("pngjs");
const pixelmatch_1 = __importDefault(require("pixelmatch"));
const path_1 = require("path");
class Image {
    constructor(path) {
        if (!path.endsWith('.png')) {
            path += '.png';
        }
        this.path = path;
    }
    get name() {
        return path_1.parse(this.path).name;
    }
    move(newPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!newPath.endsWith('.png')) {
                newPath += '.png';
            }
            yield fs_1.promises.rename(this.path, newPath);
            this.path = newPath;
        });
    }
    /**
     * @param another image to compare current image to
     * @returns difference image or null if current image is identical to another one
     */
    compareTo(another) {
        return __awaiter(this, void 0, void 0, function* () {
            const [png, anotherPng] = yield Promise.all([this.load(), another.load()]);
            const differencePng = new pngjs_1.PNG({ width: png.width, height: png.height });
            const mismatchedPixels = pixelmatch_1.default(png.data, anotherPng.data, differencePng.data, differencePng.width, differencePng.height, { threshold: 0.1 });
            return mismatchedPixels > 0
                ? Image.fromPng(differencePng)
                : null;
        });
    }
    load() {
        return new Promise((resolve, reject) => {
            fs_1.createReadStream(this.path)
                .pipe(new pngjs_1.PNG())
                .on('error', reject)
                .on('parsed', resolve);
        });
    }
    static fromPng(png) {
        const path = this.getRandomPath();
        return new Promise(resolve => {
            png
                .pack()
                .pipe(fs_1.createWriteStream(path))
                .on('close', () => resolve(new Image(path)));
        });
    }
    static fromBuffer(buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = this.getRandomPath();
            yield fs_1.promises.writeFile(path, buffer);
            return new Image(path);
        });
    }
    static getRandomPath() {
        const time = new Date().getTime().toString();
        const random = Math.random().toString(36).substring(2);
        return `${os_1.tmpdir()}/shtrexel-${time}-${random}.png`;
    }
}
exports.default = Image;
//# sourceMappingURL=Image.js.map