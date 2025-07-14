"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KtxError = void 0;
/**
 * An error that may be thrown to indicate a problem with KTX encoding.
 *
 * @internal
 */
class KtxError extends Error {
    constructor(message) {
        super(message);
        this.toString = () => {
            return `${this.name}: ${this.message}`;
        };
        // See https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes
        // #extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, KtxError.prototype);
    }
}
exports.KtxError = KtxError;
//# sourceMappingURL=KtxError.js.map