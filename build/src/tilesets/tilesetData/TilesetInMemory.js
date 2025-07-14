"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilesetInMemory = void 0;
const TilesetError_1 = require("./TilesetError");
const base_1 = require("../../base");
/**
 * Implementation of a TilesetSource and TilesetTarget that
 * stores the data in memory.
 *
 * This is mainly intended for tests and debugging.
 *
 * @internal
 */
class TilesetInMemory {
    /**
     * Default constructor
     */
    constructor() {
        /**
         * The mapping from keys to the actual data
         */
        this.dataMap = {};
        this.sourceIsOpen = false;
        this.targetIsOpen = false;
        this.overwrite = false;
    }
    /** {@inheritDoc TilesetSource.open} */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async open(fullInputName) {
        if (this.sourceIsOpen) {
            throw new TilesetError_1.TilesetError("Source already opened");
        }
        this.sourceIsOpen = true;
    }
    /** {@inheritDoc TilesetSource.getKeys} */
    async getKeys() {
        if (!this.sourceIsOpen) {
            throw new TilesetError_1.TilesetError("Source is not opened. Call 'open' first.");
        }
        return base_1.Iterables.makeAsync(Object.keys(this.dataMap));
    }
    /** {@inheritDoc TilesetSource.getValue} */
    async getValue(key) {
        if (!this.sourceIsOpen) {
            throw new TilesetError_1.TilesetError("Source is not opened. Call 'open' first.");
        }
        return this.dataMap[key];
    }
    /** {@inheritDoc TilesetSource.close} */
    async close() {
        if (!this.sourceIsOpen) {
            throw new TilesetError_1.TilesetError("Source is not opened. Call 'open' first.");
        }
        this.sourceIsOpen = false;
    }
    /** {@inheritDoc TilesetTarget.begin} */
    async begin(fullOutputName, overwrite) {
        if (this.targetIsOpen) {
            throw new TilesetError_1.TilesetError("Target already opened");
        }
        this.targetIsOpen = true;
        this.overwrite = overwrite;
    }
    /** {@inheritDoc TilesetTarget.addEntry} */
    async addEntry(key, content) {
        if (!this.targetIsOpen) {
            throw new TilesetError_1.TilesetError("Target is not opened. Call 'begin' first.");
        }
        if (this.dataMap[key]) {
            if (!this.overwrite) {
                throw new TilesetError_1.TilesetError("Entry already exists: " + key);
            }
        }
        this.dataMap[key] = content;
    }
    /** {@inheritDoc TilesetTarget.end} */
    async end() {
        if (!this.targetIsOpen) {
            throw new TilesetError_1.TilesetError("Target is not opened. Call 'begin' first.");
        }
        this.targetIsOpen = false;
        this.overwrite = false;
    }
}
exports.TilesetInMemory = TilesetInMemory;
//# sourceMappingURL=TilesetInMemory.js.map