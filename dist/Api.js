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
const tape_1 = __importDefault(require("tape"));
const ShotApi_1 = __importDefault(require("./ShotApi"));
const Config_1 = __importDefault(require("./Config"));
const Session_1 = __importDefault(require("./Session"));
const Repository_1 = __importDefault(require("./Repository"));
function shot(subjectName, callback) {
    tape_1.default(subjectName, function (t) {
        return __awaiter(this, void 0, void 0, function* () {
            t.plan(1);
            const config = Config_1.default.getCurrent();
            const repository = new Repository_1.default(config, subjectName);
            const session = new Session_1.default();
            const shot = yield callback(new ShotApi_1.default(config, session));
            yield session.close();
            const name = new Date().getTime().toString();
            repository.saveImage(name, shot);
            const reference = yield repository.loadImage('reference');
            if (reference) {
                const difference = yield reference.compareTo(shot);
                if (difference) {
                    yield repository.saveImage(name + '-difference', difference);
                    t.fail('shot does not match reference');
                }
                else {
                    t.pass('shot is equal to reference');
                }
            }
            else {
                t.pass('no reference yet');
            }
        });
    });
}
exports.shot = shot;
//# sourceMappingURL=Api.js.map