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
const getBbox_1 = __importDefault(require("./utils/getBbox"));
class ShotApi {
    constructor(config, session) {
        this.config = config;
        this.session = session;
        this.queue = Promise.resolve();
    }
    enqueue(action) {
        this.queue = this.queue.then(() => __awaiter(this, void 0, void 0, function* () { return action(yield this.session.getPage()); }));
        return this;
    }
    goTo(relativeUrl) {
        return this.enqueue(page => page.goto(this.config.baseUrl + relativeUrl, { waitUntil: 'networkidle0' }));
    }
    mouseDown(selector) {
        return this.enqueue((page) => __awaiter(this, void 0, void 0, function* () {
            const bbox = yield getBbox_1.default(page, selector);
            if (bbox) {
                const x = bbox.x + bbox.width / 2;
                const y = bbox.y + bbox.height / 2;
                yield page.mouse.move(x, y);
                yield page.mouse.down();
            }
        }));
    }
    hover(selector) {
        return this.enqueue((page) => __awaiter(this, void 0, void 0, function* () {
            yield page.hover(selector);
        }));
    }
    takeScreenshot(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.queue;
            const page = yield this.session.getPage();
            const bbox = yield getBbox_1.default(page, selector);
            if (!bbox) {
                throw new Error(`cannot get bbox of element by selector "${selector}"`);
            }
            const buffer = yield page.screenshot({ clip: bbox });
            return Image_1.default.fromBuffer(buffer);
        });
    }
}
exports.default = ShotApi;
//# sourceMappingURL=ShotApi.js.map