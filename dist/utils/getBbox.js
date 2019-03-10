"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function getBbox(page, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        const element = yield page.$(selector);
        const initial = element && (yield element.boundingBox());
        if (!initial) {
            return null;
        }
        const style = JSON.parse(yield page.$eval(selector, el => JSON.stringify(getComputedStyle(el))));
        const shadow = getShadowBbox(initial, style);
        if (!shadow) {
            return initial;
        }
        return shadow;
    });
}
exports.default = getBbox;
function getShadowBbox(initial, style) {
    const value = style.boxShadow;
    if (!value) {
        return null;
    }
    const shadows = value
        .split(',')
        .filter(it => !it.includes('inset'))
        .map(s => s.match(/[-+]?\d*\.?\d+px/g))
        .filter(Boolean)
        .map(s => s.map(p => parseFloat(p)))
        .map(([x, y, blur, spread]) => ({ x, y, blur, spread }));
    if (!shadows.length) {
        return null;
    }
    const box = shadows.reduce((bbox, { x, y, blur, spread }) => {
        const addendum = blur + spread;
        return {
            left: Math.min(x - addendum, bbox.left),
            top: Math.min(y - addendum, bbox.top),
            right: Math.max(x + addendum, bbox.right),
            bottom: Math.max(y + addendum, bbox.bottom),
        };
    }, { left: 0, top: 0, right: 0, bottom: 0 });
    return {
        x: initial.x + box.left,
        y: initial.y + box.top,
        width: initial.width + box.right - box.left,
        height: initial.height + box.bottom - box.top,
    };
}
class Rect {
    constructor(r) {
        this.x = r.x;
        this.y = r.y;
        this.width = r.width;
        this.height = r.height;
    }
    get left() {
        return this.x;
    }
    get top() {
        return this.y;
    }
    get right() {
        return this.x + this.width;
    }
    get bottom() {
        return this.y + this.height;
    }
    extend(another) {
        const x = Math.min(this.x, another.x);
        const y = Math.min(this.y, another.y);
        const right = Math.max(this.right, another.right);
        const bottom = Math.max(this.bottom, another.bottom);
        return new Rect({
            x,
            y,
            width: right - x,
            height: bottom - y,
        });
    }
}
//# sourceMappingURL=getBbox.js.map