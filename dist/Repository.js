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
const Image_1 = __importDefault(require("./Image"));
class Repository {
    constructor(config, name) {
        this.config = config;
        this.name = name;
    }
    loadImage(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const path = `${this.config.basePath}/${this.name}/${name}`;
                yield fs_1.promises.access(path, fs_1.constants.R_OK);
                return new Image_1.default(path);
            }
            catch (error) {
                return null;
            }
        });
    }
    saveImage(name, image) {
        return image.move(`${this.config.basePath}/shots/${this.name}/${name}`);
    }
}
exports.default = Repository;
//# sourceMappingURL=Repository.js.map