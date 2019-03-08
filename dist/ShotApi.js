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
const Image_1 = __importDefault(require("./Image"));
class ShotApi {
    constructor(config, session) {
        this.config = config;
        this.session = session;
    }
    goTo(relativeUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield this.session.getPage();
            yield page.goto(this.config.baseUrl + relativeUrl, { waitUntil: 'networkidle0' });
            return this;
        });
    }
    evaluate(fn, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield this.session.getPage();
            yield page.evaluate(fn, ...args);
            return this;
        });
    }
    takeScreenshot(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield this.session.getPage();
            const rect = yield page.evaluate(selector => {
                const element = document.querySelector(selector);
                return element
                    ? element.getBoundingClientRect()
                    : null;
            }, selector);
            if (!rect) {
                throw new Error(`cannot get boundaries of element by selector "${selector}"`);
            }
            const buffer = yield page.screenshot({ clip: rect });
            return Image_1.default.fromBuffer(buffer);
        });
    }
}
exports.default = ShotApi;
//# sourceMappingURL=ShotApi.js.map