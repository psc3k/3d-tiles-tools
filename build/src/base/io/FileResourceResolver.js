"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileResourceResolver = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Uris_1 = require("../base/Uris");
const Paths_1 = require("../base/Paths");
/**
 * Implementation of a `ResourceResolver` based on a file system.
 *
 * @internal (Instantiated by the `ResourceResolvers` class)
 */
class FileResourceResolver {
    constructor(basePath) {
        this._basePath = basePath;
    }
    /** {@inheritDoc ResourceResolver.resolveUri} */
    resolveUri(uri) {
        const resolved = Paths_1.Paths.join(this._basePath, decodeURIComponent(uri));
        return resolved;
    }
    /** {@inheritDoc ResourceResolver.resolveDataPartial} */
    async resolveDataPartial(uri, maxBytes) {
        if (Uris_1.Uris.isDataUri(uri)) {
            const data = Buffer.from(uri.split(",")[1], "base64");
            return data;
        }
        if (Uris_1.Uris.isAbsoluteUri(uri)) {
            return undefined;
        }
        const resolved = this.resolveUri(uri);
        try {
            const buffer = Buffer.alloc(maxBytes);
            const fd = fs_1.default.openSync(resolved, "r");
            fs_1.default.readSync(fd, buffer, 0, maxBytes, 0);
            fs_1.default.closeSync(fd);
            return buffer;
        }
        catch (error) {
            return undefined;
        }
    }
    /** {@inheritDoc ResourceResolver.resolveData} */
    async resolveData(uri) {
        if (Uris_1.Uris.isDataUri(uri)) {
            const data = Buffer.from(uri.split(",")[1], "base64");
            return data;
        }
        if (Uris_1.Uris.isAbsoluteUri(uri)) {
            return undefined;
        }
        const resolved = this.resolveUri(uri);
        if (!fs_1.default.existsSync(resolved)) {
            return undefined;
        }
        const data = fs_1.default.readFileSync(resolved);
        // See https://github.com/nodejs/node/issues/35351
        const actualData = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
        return Buffer.from(actualData);
    }
    /** {@inheritDoc ResourceResolver.derive} */
    derive(uri) {
        const resolved = path_1.default.join(this._basePath, decodeURIComponent(uri));
        return new FileResourceResolver(resolved);
    }
}
exports.FileResourceResolver = FileResourceResolver;
//# sourceMappingURL=FileResourceResolver.js.map