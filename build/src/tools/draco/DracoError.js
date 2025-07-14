"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DracoError = void 0;
/**
 * An error that may be thrown to indicate that Draco
 * decoding failed.
 *
 * @internal
 */
class DracoError extends Error {
    constructor(message) {
        super(message);
        this.toString = () => {
            return `${this.name}: ${this.message}`;
        };
        // See https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes
        // #extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, DracoError.prototype);
    }
}
exports.DracoError = DracoError;
//# sourceMappingURL=DracoError.js.map