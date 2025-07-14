"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilesetSourceFs = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const base_1 = require("../../base");
const base_2 = require("../../base");
const TilesetError_1 = require("./TilesetError");
/**
 * Implementation of a TilesetSource based on a directory
 * in a file system
 *
 * @internal
 */
class TilesetSourceFs {
    /**
     * Default constructor
     */
    constructor() {
        this.fullInputName = undefined;
    }
    /** {@inheritDoc TilesetSource.open} */
    async open(fullInputName) {
        if (this.fullInputName) {
            throw new TilesetError_1.TilesetError("Source already opened");
        }
        if (base_1.Paths.isDirectory(fullInputName)) {
            this.fullInputName = fullInputName;
        }
        else {
            this.fullInputName = path_1.default.dirname(fullInputName);
        }
    }
    /** {@inheritDoc TilesetSource.getKeys} */
    async getKeys() {
        if (!this.fullInputName) {
            throw new TilesetError_1.TilesetError("Source is not opened. Call 'open' first.");
        }
        const files = base_2.Iterables.overFiles(this.fullInputName, true);
        const fullInputName = this.fullInputName;
        return base_2.Iterables.makeAsync(base_2.Iterables.map(files, (file) => base_1.Paths.relativize(fullInputName, file)));
    }
    /** {@inheritDoc TilesetSource.getValue} */
    async getValue(key) {
        if (!this.fullInputName) {
            throw new TilesetError_1.TilesetError("Source is not opened. Call 'open' first.");
        }
        const fullFileName = path_1.default.join(this.fullInputName, key);
        if (!fs_1.default.existsSync(fullFileName)) {
            return undefined;
        }
        try {
            const data = fs_1.default.readFileSync(fullFileName);
            return data;
        }
        catch (error) {
            return undefined;
        }
    }
    /** {@inheritDoc TilesetSource.close} */
    async close() {
        if (!this.fullInputName) {
            throw new TilesetError_1.TilesetError("Source is not opened. Call 'open' first.");
        }
        this.fullInputName = undefined;
    }
}
exports.TilesetSourceFs = TilesetSourceFs;
//# sourceMappingURL=TilesetSourceFs.js.map