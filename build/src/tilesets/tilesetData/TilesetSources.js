"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilesetSources = void 0;
const path_1 = __importDefault(require("path"));
const base_1 = require("../../base");
const TilesetSource3tz_1 = require("../packages/TilesetSource3tz");
const TilesetSource3dtiles_1 = require("../packages/TilesetSource3dtiles");
const TilesetError_1 = require("./TilesetError");
const TilesetSourceFs_1 = require("./TilesetSourceFs");
const base_2 = require("../../base");
const logger = base_2.Loggers.get("tilesetData");
/**
 * Methods related to `TilesetSource` instances
 *
 * @internal
 */
class TilesetSources {
    /**
     * Convenience method to create and open a tileset source for
     * the given name.
     *
     * This will call `TilesetSources.create` for the extension of
     * the given name, and immediately call `open(name)` on the
     * resulting source.
     *
     * @param name - The name
     * @returns The `TilesetSource`
     * @throws TilesetError If the input can not be opened
     */
    static async createAndOpen(name) {
        let extension = path_1.default.extname(name).toLowerCase();
        if (extension === ".json") {
            extension = "";
            name = path_1.default.dirname(name);
        }
        const tilesetSource = TilesetSources.create(extension);
        if (!tilesetSource) {
            throw new TilesetError_1.TilesetError(`Could not create tileset source for name ${name} with extension "${extension}"`);
        }
        await tilesetSource.open(name);
        return tilesetSource;
    }
    /**
     * Create a tileset source from a given (full) name.
     *
     * The given name may have the extension `.3tz`, `.3dtiles`,
     * or `.json`, or no extension to indicate a directory.
     *
     * If the given name as the extension `.json`, then a source
     * for the directory that contains the given file is created.
     *
     * @param name - The name
     * @returns The `TilesetSource`
     * @throws TilesetError If the input can not be opened
     */
    static createFromName(name) {
        let extension = path_1.default.extname(name).toLowerCase();
        if (extension === ".json") {
            extension = "";
            name = path_1.default.dirname(name);
        }
        const tilesetSource = TilesetSources.create(extension);
        if (!tilesetSource) {
            throw new TilesetError_1.TilesetError(`Could not create tileset source for name ${name} with extension "${extension}"`);
        }
        return tilesetSource;
    }
    /**
     * Creates a TilesetSource, based on the given
     * file extension
     *
     * @param extension - The extension: '.3tz' or '.3dtiles'
     * or the empty string (for a directory)
     * @returns The TilesetSource, or `undefined` if the extension
     * is invalid
     */
    static create(extension) {
        if (extension === ".3tz") {
            return new TilesetSource3tz_1.TilesetSource3tz();
        }
        if (extension === ".3dtiles") {
            return new TilesetSource3dtiles_1.TilesetSource3dtiles();
        }
        if (extension === "") {
            return new TilesetSourceFs_1.TilesetSourceFs();
        }
        logger.error("Unknown tileset source type: " + extension);
        return undefined;
    }
    /**
     * Parses the JSON from the value with the given key (file name),
     * and returns the parsed result.
     *
     * This handles the case that the input data may be compressed
     * with GZIP, and will uncompress the data if necessary.
     *
     * @param tilesetSource - The `TilesetSource`
     * @param key - The key (file name)
     * @returns The parsed result
     * @throws TilesetError If the source is not opened, the specified
     * entry cannot be found, or the entry data could not be unzipped
     * (if it was zipped), or it could not be parsed as JSON.
     */
    static async parseSourceValue(tilesetSource, key) {
        let value = await TilesetSources.getSourceValue(tilesetSource, key);
        if (base_1.Buffers.isGzipped(value)) {
            try {
                value = base_1.Buffers.gunzip(value);
            }
            catch (e) {
                const message = `Could not unzip ${key}: ${e}`;
                throw new TilesetError_1.TilesetError(message);
            }
        }
        try {
            const result = JSON.parse(value.toString());
            return result;
        }
        catch (e) {
            const message = `Could not parse ${key}: ${e}`;
            throw new TilesetError_1.TilesetError(message);
        }
    }
    /**
     * Obtains the value for the given key from the given tileset source,
     * throwing an error if the source is not opened, or when the
     * given key cannot be found.
     *
     * @param tilesetSource - The `TilesetSource`
     * @param key - The key (file name)
     * @returns The value (file contents)
     * @throws DeveloperError When the source is not opened
     * @throws TilesetError When the given key cannot be found
     */
    static async getSourceValue(tilesetSource, key) {
        const buffer = await tilesetSource.getValue(key);
        if (!buffer) {
            const message = `No ${key} found in input`;
            throw new TilesetError_1.TilesetError(message);
        }
        return buffer;
    }
    /**
     * Returns an iterable iterator over the entries of the given
     * tileset source.
     *
     * @param tilesetSource - The `TilesetSource`
     * @returns The iterator over the entries
     */
    static async getEntries(tilesetSource) {
        const keys = await tilesetSource.getKeys();
        const entries = base_1.Iterables.mapAsync(keys, async (k) => {
            const v = await tilesetSource.getValue(k);
            if (!v) {
                throw new TilesetError_1.TilesetError(`No value found for key ${k}`);
            }
            const e = {
                key: k,
                value: v,
            };
            return e;
        });
        return entries;
    }
}
exports.TilesetSources = TilesetSources;
//# sourceMappingURL=TilesetSources.js.map