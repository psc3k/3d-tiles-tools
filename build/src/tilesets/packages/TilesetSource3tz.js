"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilesetSource3tz = void 0;
const fs_1 = __importDefault(require("fs"));
const zlib_1 = __importDefault(require("zlib"));
const base_1 = require("../../base");
const TilesetError_1 = require("../tilesetData/TilesetError");
const ArchiveFunctions3tz_1 = require("./ArchiveFunctions3tz");
/**
 * Implementation of a TilesetSource based on a 3TZ file.
 *
 * @internal
 */
class TilesetSource3tz {
    /**
     * Default constructor
     */
    constructor() {
        this.fd = undefined;
        this.zipIndex = undefined;
    }
    getZipIndex() {
        return this.zipIndex;
    }
    /** {@inheritDoc TilesetSource.open} */
    async open(fullInputName) {
        if ((0, base_1.defined)(this.fd)) {
            throw new TilesetError_1.TilesetError("Source already opened");
        }
        this.fd = fs_1.default.openSync(fullInputName, "r");
        this.zipIndex = ArchiveFunctions3tz_1.ArchiveFunctions3tz.readZipIndex(this.fd);
    }
    /** {@inheritDoc TilesetSource.getKeys} */
    async getKeys() {
        if (!(0, base_1.defined)(this.fd) || !this.zipIndex) {
            throw new TilesetError_1.TilesetError("Source is not opened. Call 'open' first.");
        }
        return base_1.Iterables.makeAsync(TilesetSource3tz.createKeysIterable(this.fd, this.zipIndex));
    }
    static createKeysIterable(fd, zipIndex) {
        const iterable = {
            [Symbol.iterator]: function* () {
                for (let index = 0; index < zipIndex.length; index++) {
                    const entry = zipIndex[index];
                    const offset = entry.offset;
                    const fileName = ArchiveFunctions3tz_1.ArchiveFunctions3tz.readFileName(fd, offset);
                    yield fileName;
                }
            },
        };
        return iterable;
    }
    /** {@inheritDoc TilesetSource.getValue} */
    async getValue(key) {
        if (!(0, base_1.defined)(this.fd) || !this.zipIndex) {
            throw new TilesetError_1.TilesetError("Source is not opened. Call 'open' first.");
        }
        const entry = ArchiveFunctions3tz_1.ArchiveFunctions3tz.readEntry(this.fd, this.zipIndex, key);
        if (!entry) {
            return undefined;
        }
        if (entry.compression_method === 8) {
            // Indicating DEFLATE
            const inflatedData = zlib_1.default.inflateRawSync(entry.data);
            return inflatedData;
        }
        return entry.data;
    }
    /** {@inheritDoc TilesetSource.close} */
    async close() {
        if (!(0, base_1.defined)(this.fd) || !this.zipIndex) {
            throw new TilesetError_1.TilesetError("Source is not opened. Call 'open' first.");
        }
        fs_1.default.closeSync(this.fd);
        this.fd = undefined;
        this.zipIndex = undefined;
    }
}
exports.TilesetSource3tz = TilesetSource3tz;
//# sourceMappingURL=TilesetSource3tz.js.map