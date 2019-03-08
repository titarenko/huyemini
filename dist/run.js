"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const Config_1 = __importDefault(require("./Config"));
function run() {
    const config = Config_1.default.getCurrent();
    const files = glob_1.default.sync(config.shotFiles);
    files.forEach(f => require(f));
}
run();
//# sourceMappingURL=run.js.map