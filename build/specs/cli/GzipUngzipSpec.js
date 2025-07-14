"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const ToolsMain_1 = require("../../src/cli/ToolsMain");
const SpecHelpers_1 = require("../SpecHelpers");
const simpleTileset = "./specs/data/gzipUngzip/simpleTileset";
const simpleTilesetGzip = "./specs/data/gzipUngzip/simpleTileset-gzip";
const simpleTilesetGzipTilesOnly = "./specs/data/gzipUngzip/simpleTileset-gzip-tilesOnly";
const outputBase = "./specs/data/output/gzipUngzip/";
const overwrite = true;
/**
 * Tests for the the 'gzip' and 'ungzip' command line operations.
 *
 * NOTE: This calls the functions from the `ToolsMain` class,
 * which represent the command line functionality. The actual
 * operations ('gzip' and 'ungzip') are internally already
 * mapped to specific 'pipelines'. The pipeline implementation
 * in general, and right approach and level of granularity for
 * testing pipelines are not yet finalized. Right now, these
 * tests serve as "integration level"/"black box" tests that
 * just perform the operations on input directories, and
 * compare the resulting output to the expected directory
 * contents.
 */
describe("The gzip and ungzip command line operations", function () {
    afterEach(function () {
        SpecHelpers_1.SpecHelpers.forceDeleteDirectory(outputBase);
    });
    it("generates the 'simpleTileset-gzip' when running 'gzip' on the 'simpleTileset'", async function () {
        const tilesOnly = false;
        const outputSimpleTilesetGzip = path_1.default.join(outputBase, "simpleTileset-gzip");
        await ToolsMain_1.ToolsMain.gzip(simpleTileset, outputSimpleTilesetGzip, overwrite, tilesOnly);
        const difference = await SpecHelpers_1.SpecHelpers.computePackageDifference(simpleTilesetGzip, outputSimpleTilesetGzip);
        expect(difference).toBeUndefined();
    });
    it("generates the 'simpleTileset-gzip-tilesOnly' when running 'gzip' on the 'simpleTileset' with 'tilesOnly' being 'true'", async function () {
        const tilesOnly = true;
        const outputSimpleTilesetGzipTilesOnly = path_1.default.join(outputBase, "simpleTileset-gzip-tilesOnly");
        await ToolsMain_1.ToolsMain.gzip(simpleTileset, outputSimpleTilesetGzipTilesOnly, overwrite, tilesOnly);
        const difference = await SpecHelpers_1.SpecHelpers.computePackageDifference(simpleTilesetGzipTilesOnly, outputSimpleTilesetGzipTilesOnly);
        expect(difference).toBeUndefined();
    });
    it("generates the 'simpleTileset' when running 'ungzip' on the 'simpleTileset-gzip'", async function () {
        const outputSimpleTilesetFromGzip = path_1.default.join(outputBase, "simpleTileset-from-gzip");
        await ToolsMain_1.ToolsMain.ungzip(simpleTilesetGzip, outputSimpleTilesetFromGzip, overwrite);
        const difference = await SpecHelpers_1.SpecHelpers.computePackageDifference(simpleTileset, outputSimpleTilesetFromGzip);
        expect(difference).toBeUndefined();
    });
    it("generates the 'simpleTileset' when running 'ungzip' on the 'simpleTileset-gzip-tilesOnly'", async function () {
        const outputSimpleTilesetFromGzipTilesOnly = path_1.default.join(outputBase, "simpleTileset-from-gzip-tilesOnly");
        await ToolsMain_1.ToolsMain.ungzip(simpleTilesetGzipTilesOnly, outputSimpleTilesetFromGzipTilesOnly, overwrite);
        const difference = await SpecHelpers_1.SpecHelpers.computePackageDifference(simpleTileset, outputSimpleTilesetFromGzipTilesOnly);
        expect(difference).toBeUndefined();
    });
});
//# sourceMappingURL=GzipUngzipSpec.js.map