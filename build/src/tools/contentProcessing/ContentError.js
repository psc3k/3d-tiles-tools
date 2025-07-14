"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentError = void 0;
/**
 * An error that may be thrown to indicate that processing
 * tile content failed (possible caused by a call to an
 * external library)
 *
 * @internal
 */
class ContentError extends Error {
    constructor(message) {
        super(message);
        this.toString = () => {
            return `${this.name}: ${this.message}`;
        };
        // See https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes
        // #extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, ContentError.prototype);
    }
}
exports.ContentError = ContentError;
//# sourceMappingURL=ContentError.js.map