"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnzippingResourceResolver = void 0;
const zlib_1 = __importDefault(require("zlib"));
const Buffers_1 = require("../base/Buffers");
/**
 * Implementation of a `ResourceResolver` that obtains the resource
 * data from a delegate, and unzips the data if necessary.
 *
 * @internal (Instantiated by the `ResourceResolvers` class)
 */
class UnzippingResourceResolver {
    constructor(delegate) {
        this._delegate = delegate;
    }
    /** {@inheritDoc ResourceResolver.resolveUri} */
    resolveUri(uri) {
        return this._delegate.resolveUri(uri);
    }
    /** {@inheritDoc ResourceResolver.resolveData} */
    async resolveData(uri) {
        const delegateData = await this._delegate.resolveData(uri);
        if (delegateData === undefined) {
            return undefined;
        }
        const isGzipped = Buffers_1.Buffers.isGzipped(delegateData);
        if (!isGzipped) {
            return delegateData;
        }
        const data = zlib_1.default.gunzipSync(delegateData);
        return data;
    }
    /** {@inheritDoc ResourceResolver.resolveDataPartial} */
    async resolveDataPartial(uri, maxBytes) {
        const partialDelegateData = await this._delegate.resolveDataPartial(uri, maxBytes);
        if (partialDelegateData === undefined) {
            return undefined;
        }
        const isGzipped = Buffers_1.Buffers.isGzipped(partialDelegateData);
        if (!isGzipped) {
            return partialDelegateData;
        }
        const fullDelegateData = await this._delegate.resolveData(uri);
        if (fullDelegateData === undefined) {
            return undefined;
        }
        const data = zlib_1.default.gunzipSync(fullDelegateData);
        return data;
    }
    /** {@inheritDoc ResourceResolver.derive} */
    derive(uri) {
        return new UnzippingResourceResolver(this._delegate.derive(uri));
    }
}
exports.UnzippingResourceResolver = UnzippingResourceResolver;
//# sourceMappingURL=UnzippingResourceResolver.js.map