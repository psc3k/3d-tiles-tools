"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilesetTargets = void 0;
const path_1 = __importDefault(require("path"));
const TilesetTarget3tz_1 = require("../packages/TilesetTarget3tz");
const TilesetTarget3dtiles_1 = require("../packages/TilesetTarget3dtiles");
const TilesetError_1 = require("./TilesetError");
const TilesetTargetFs_1 = require("./TilesetTargetFs");
const base_1 = require("../../base");
const logger = base_1.Loggers.get("tilesetData");
/**
 * Methods related to `TilesetTarget` instances
 *
 * @internal
 */
class TilesetTargets {
    /**
     * Create a tileset target for the given name, and prepare
     * it to accept entries.
     *
     * This will call `TilesetTargets.create` with the extension
     * of the given name, and immediately call `begin(name)` on
     * the resulting target.
     *
     * @param name - The name
     * @param overwrite - Whether existing output files should be overwritten
     * @returns The `TilesetTarget`
     * @throws TilesetError If the output can not be opened
     */
    static async createAndBegin(name, overwrite) {
        let extension = path_1.default.extname(name).toLowerCase();
        if (extension === ".json") {
            extension = "";
            name = path_1.default.dirname(name);
        }
        const tilesetTarget = TilesetTargets.create(extension);
        if (!tilesetTarget) {
            throw new TilesetError_1.TilesetError(`Could not create tileset target for name ${name} with extension "${extension}"`);
        }
        await tilesetTarget.begin(name, overwrite);
        return tilesetTarget;
    }
    /**
     * Create a tileset target for the given name.
     *
     * The given name may have the extension `.3tz` or `.3dtiles`,
     * or no extension to indicate a directory.
     *
     * If the given name as the extension `.json`, then a target
     * for the directory that contains the given file is created.
     *
     * @param name - The name
     * @returns The `TilesetTarget`
     * @throws TilesetError If the output can not be opened
     */
    static createFromName(name) {
        let extension = path_1.default.extname(name).toLowerCase();
        if (extension === ".json") {
            extension = "";
            name = path_1.default.dirname(name);
        }
        const tilesetTarget = TilesetTargets.create(extension);
        if (!tilesetTarget) {
            throw new TilesetError_1.TilesetError(`Could not create tileset target for name ${name} with extension "${extension}"`);
        }
        return tilesetTarget;
    }
    /**
     * Creates a TilesetTarget, based on the given
     * file extension
     *
     * @param extension - The extension: '.3tz' or '.3dtiles'
     * or the empty string (for a directory)
     * @returns The TilesetTarget, or `undefined` if the
     * extension is invalid
     */
    static create(extension) {
        if (extension === ".3tz") {
            return new TilesetTarget3tz_1.TilesetTarget3tz();
        }
        if (extension === ".3dtiles") {
            return new TilesetTarget3dtiles_1.TilesetTarget3dtiles();
        }
        if (extension === "") {
            return new TilesetTargetFs_1.TilesetTargetFs();
        }
        logger.error("Unknown target type: " + extension);
        return undefined;
    }
}
exports.TilesetTargets = TilesetTargets;
//# sourceMappingURL=TilesetTargets.js.map