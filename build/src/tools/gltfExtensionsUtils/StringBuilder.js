"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringBuilder = void 0;
/**
 * Internal utility class to build formatted strings
 *
 * @internal
 */
class StringBuilder {
    constructor() {
        this.s = "";
        this.indentation = 2;
        this.indent = 0;
    }
    increaseIndent() {
        this.indent += this.indentation;
    }
    decreaseIndent() {
        this.indent -= this.indentation;
    }
    addLine(...args) {
        this.s += " ".repeat(this.indent);
        for (const arg of args) {
            this.s += `${arg}`;
        }
        this.s += "\n";
    }
    toString() {
        return this.s;
    }
}
exports.StringBuilder = StringBuilder;
//# sourceMappingURL=StringBuilder.js.map