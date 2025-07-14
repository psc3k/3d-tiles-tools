"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilesetConverter = void 0;
const path_1 = __importDefault(require("path"));
const tilesets_1 = require("../../tilesets");
const tilesets_2 = require("../../tilesets");
const tilesets_3 = require("../../tilesets");
const tilesets_4 = require("../../tilesets");
const tilesets_5 = require("../../tilesets");
const base_1 = require("../../base");
const logger = base_1.Loggers.get("tilesetProcessing");
/**
 * Methods for converting tilesets between different storage formats.
 * (i.e. the file system, or 3D Tiles archives/packages).
 *
 * @internal
 */
class TilesetConverter {
    /**
     * Convert a source tileset to a target tileset.
     *
     * The source and target names can be
     * - The path to a tileset JSON file
     * - A directory that contains a `tileset.json` file
     * - A 3D Tiles package (with `.3tz` or `.3dtiles` extension)
     *
     * Package files are required to contain a `tileset.json` file for the
     * top-level tileset. When the source was a specific tileset JSON file,
     * then this file will be renamed to `tileset.json` if necessary for
     * writing it into a package (and if this causes a duplicate entry, then
     * an error will be thrown). Otherwise, it is expected that the source
     * contains a file that matches the required file for the output.
     *
     * @param tilesetSource - The tileset source
     * @param tilesetSourceJsonFileName - The name of the tileset JSON file
     * in the source
     * @param tilesetTarget - The tileset target
     * @param tilesetTargetJsonFileName - The name of the tileset JSON file
     * in the target
     * @returns A promise that resolves when the process is finished
     * @throws TilesetError If the requirements for the tileset JSON
     * file names (stated above) are not met.
     */
    static async convert(tilesetSourceName, tilesetSourceJsonFileName, tilesetTargetName, overwrite) {
        const inputExtension = path_1.default.extname(tilesetSourceName).toLowerCase();
        if (inputExtension === ".zip") {
            if (tilesetSourceJsonFileName === undefined) {
                tilesetSourceJsonFileName =
                    tilesets_4.Tilesets.determineTilesetJsonFileName(tilesetSourceName);
            }
            await tilesets_5.ZipToPackage.convert(tilesetSourceName, tilesetSourceJsonFileName, tilesetTargetName, overwrite);
            return;
        }
        if (tilesetSourceJsonFileName === undefined) {
            tilesetSourceJsonFileName =
                tilesets_4.Tilesets.determineTilesetJsonFileName(tilesetSourceName);
        }
        const tilesetTargetJsonFileName = tilesets_4.Tilesets.determineTilesetJsonFileName(tilesetTargetName);
        const tilesetSource = await tilesets_1.TilesetSources.createAndOpen(tilesetSourceName);
        const tilesetTarget = await tilesets_2.TilesetTargets.createAndBegin(tilesetTargetName, overwrite);
        try {
            await TilesetConverter.convertData(tilesetSource, tilesetSourceJsonFileName, tilesetTarget, tilesetTargetJsonFileName);
        }
        finally {
            await tilesetSource.close();
            await tilesetTarget.end();
        }
    }
    /**
     * Convert a source tileset to a target tileset.
     *
     * The specified source JSON file name will be assumed to be the
     * top-level tileset JSON file. It will be written into the
     * specified target JSON file. If this causes a duplicate entry, then
     * an error will be thrown.
     *
     * The caller is responsible for calling `open` on the given
     * source and `begin` on the given target before calling this
     * method, and `close` on the source and `end` on the target
     * after calling this method.
     *
     * @param tilesetSource - The tileset source
     * @param tilesetSourceJsonFileName - The name of the tileset JSON file
     * in the source
     * @param tilesetTarget - The tileset target
     * @param tilesetTargetJsonFileName - The name of the tileset JSON file
     * in the target
     * @returns A promise that resolves when the process is finished
     * @throws TilesetError If the requirements for the tileset JSON
     * file names (stated above) are not met.
     */
    static async convertData(tilesetSource, tilesetSourceJsonFileName, tilesetTarget, tilesetTargetJsonFileName) {
        const keys = await tilesetSource.getKeys();
        // This could be much shorter, but has to handle the case
        // that the source or target JSON file names do not match the
        // default/recommended case of being called `tileset.json`. It
        // has to keep track of whether the designated source name was
        // found, and the target that it may have been renamed to, and
        // keep track of whether this renaming caused a duplicate (e.g.
        // when the input contained `example.json` and `tileset.json`,
        // but `example.json` was said to be the top-level name in the
        // source and should be stored as `tileset.json` in the target)
        let tilesetSourceJsonFileNameWasFound = false;
        let causedDuplicate = false;
        for await (const key of keys) {
            const content = await tilesetSource.getValue(key);
            if (content) {
                if (key === tilesetSourceJsonFileName) {
                    tilesetSourceJsonFileNameWasFound = true;
                    if (tilesetSourceJsonFileName !== tilesetTargetJsonFileName) {
                        logger.debug(`Storing ${tilesetSourceJsonFileName} from source` +
                            `as ${tilesetTargetJsonFileName} in target`);
                    }
                    await tilesetTarget.addEntry(tilesetTargetJsonFileName, content);
                }
                else {
                    if (key === tilesetTargetJsonFileName) {
                        causedDuplicate = true;
                    }
                    await tilesetTarget.addEntry(key, content);
                }
            }
        }
        if (!tilesetSourceJsonFileNameWasFound) {
            throw new tilesets_3.TilesetError(`File ${tilesetSourceJsonFileName} was not found in source`);
        }
        if (causedDuplicate) {
            throw new tilesets_3.TilesetError(`The input tileset JSON file name ${tilesetSourceJsonFileName} ` +
                `becomes ${tilesetTargetJsonFileName} in the output, ` +
                `causing a duplicate entry`);
        }
    }
}
exports.TilesetConverter = TilesetConverter;
//# sourceMappingURL=TilesetConverter.js.map