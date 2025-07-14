"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilesetSourceResourceResolver = void 0;
const base_1 = require("../../base");
const base_2 = require("../../base");
/**
 * Implementation of a `ResourceResolver` based on a `TilesetSource`
 *
 * @internal
 */
class TilesetSourceResourceResolver {
    constructor(basePath, tilesetSource) {
        this._basePath = basePath;
        this._tilesetSource = tilesetSource;
    }
    /** {@inheritDoc ResourceResolver.resolveUri} */
    resolveUri(uri) {
        const resolved = base_1.Paths.join(this._basePath, uri);
        return resolved;
    }
    /** {@inheritDoc ResourceResolver.resolveData} */
    async resolveData(uri) {
        return this.resolveDataInternal(uri);
    }
    /** {@inheritDoc ResourceResolver.resolveDataPartial} */
    async resolveDataPartial(uri, maxBytes) {
        const buffer = await this.resolveDataInternal(uri);
        if (!buffer) {
            return undefined;
        }
        return buffer.subarray(0, maxBytes);
    }
    async resolveDataInternal(uri) {
        if (base_2.Uris.isDataUri(uri)) {
            const data = Buffer.from(uri.split(",")[1], "base64");
            return data;
        }
        if (base_2.Uris.isAbsoluteUri(uri)) {
            return undefined;
        }
        const localUri = this.resolveUri(uri);
        const value = await this._tilesetSource.getValue(localUri);
        if (!value) {
            return undefined;
        }
        return value;
    }
    /** {@inheritDoc ResourceResolver.derive} */
    derive(uri) {
        const resolved = base_1.Paths.join(this._basePath, decodeURIComponent(uri));
        const result = new TilesetSourceResourceResolver(resolved, this._tilesetSource);
        return result;
    }
}
exports.TilesetSourceResourceResolver = TilesetSourceResourceResolver;
//# sourceMappingURL=TilesetSourceResourceResolver.js.map