"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZipToPackage = void 0;
const node_stream_zip_1 = __importDefault(require("node-stream-zip"));
const base_1 = require("../../base");
const TilesetTargets_1 = require("../tilesetData/TilesetTargets");
const Tilesets_1 = require("../tilesets/Tilesets");
const TilesetError_1 = require("../tilesetData/TilesetError");
/**
 * Methods for converting ZIP files into 3D Tiles packages.
 *
 * @internal
 */
class ZipToPackage {
    /**
     * Writes the data from the given input file (which is assumed to be a plain
     * ZIP file) into a tileset target.
     *
     * The type of the output depends on the extension of the output file name:
     * If it is `.3tz`, then the output will be a 3TZ archive
     * If it is `.3dtiles`, then the output will be a 3DTILES package
     * If it is empty, then the output will be a directory
     *
     * @param inputFileName - The full input file name
     * @param inputTilesetJsonFileName - The name of the tileset JSON file that
     * is expected to be present in the ZIP. This will usually be
     * 'tileset.json', but can be overridden to use another JSON file as
     * the main tileset JSON file.
     * @param outputFileName - The full output file name
     * @param overwrite - Whether the output file should be overwritten
     * if it already exists
     * @throws TilesetError If the input did not contain the tileset JSON
     * file that was expected for the input or the output.
     */
    static async convert(inputFileName, inputTilesetJsonFileName, outputFileName, overwrite) {
        const zip = new node_stream_zip_1.default.async({ file: inputFileName });
        const tilesetTarget = await TilesetTargets_1.TilesetTargets.createAndBegin(outputFileName, overwrite);
        const outputTilesetJsonFileName = Tilesets_1.Tilesets.determineTilesetJsonFileName(outputFileName);
        let inputTilesetJsonFileNameWasFound = false;
        let outputTilesetJsonFileNameWasFound = false;
        // When a the output is a directory, then there
        // is no requirement for the output file name
        if (base_1.Paths.isDirectory(outputFileName)) {
            outputTilesetJsonFileNameWasFound = true;
        }
        const entries = await zip.entries();
        for (const entry of Object.values(entries)) {
            const e = entry;
            if (!e.isDirectory) {
                let key = e.name;
                const content = await zip.entryData(e.name);
                if (content) {
                    if (key === inputTilesetJsonFileName) {
                        inputTilesetJsonFileNameWasFound = true;
                        key = outputTilesetJsonFileName;
                    }
                    if (key === outputTilesetJsonFileName) {
                        outputTilesetJsonFileNameWasFound = true;
                    }
                    await tilesetTarget.addEntry(key, content);
                }
            }
        }
        await zip.close();
        await tilesetTarget.end();
        if (!inputTilesetJsonFileNameWasFound) {
            throw new TilesetError_1.TilesetError(`File ${inputFileName} did not contain a ${inputTilesetJsonFileName}`);
        }
        if (!outputTilesetJsonFileNameWasFound) {
            throw new TilesetError_1.TilesetError(`File ${inputFileName} did not contain a ${outputTilesetJsonFileName}`);
        }
    }
}
exports.ZipToPackage = ZipToPackage;
//# sourceMappingURL=ZipToPackage.js.map