"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const tilesets_1 = require("../../../src/tilesets");
const tilesets_2 = require("../../../src/tilesets");
const tools_1 = require("../../../src/tools");
const SpecEntryProcessor_1 = require("./SpecEntryProcessor");
const SpecHelpers_1 = require("../../SpecHelpers");
const SPECS_DATA_BASE_DIRECTORY = SpecHelpers_1.SpecHelpers.getSpecsDataBaseDirectory();
const implicitInput = SPECS_DATA_BASE_DIRECTORY + "/tilesetProcessing/implicitProcessing";
const implicitOutput = SPECS_DATA_BASE_DIRECTORY + "/output/tilesetProcessing/implicitProcessing";
const overwrite = true;
/**
 * Tests that verify that the `forEach...` and `process...` methods
 * of the BasicTilesetProcessor visit and process the correct
 * elements on implicit tilesets
 */
describe("BasicTilesetProcessor on implicit input", function () {
    afterEach(function () {
        SpecHelpers_1.SpecHelpers.forceDeleteDirectory(SPECS_DATA_BASE_DIRECTORY + "/output/tilesetProcessing");
    });
    it("forEachExplicitTile covers all explicit tiles", async function () {
        const tilesetProcessor = new tools_1.BasicTilesetProcessor();
        await tilesetProcessor.begin(implicitInput, implicitOutput, overwrite);
        // There is only one explicit tile in the 'implicitProcessing' data
        const actualContentUris = [];
        await tilesetProcessor.forEachExplicitTile(async (tile) => {
            const contentUris = tilesets_1.Tiles.getContentUris(tile);
            actualContentUris.push(contentUris);
        });
        await tilesetProcessor.end();
        const expectedContentUris = [["content/content_{level}__{x}_{y}.glb"]];
        expect(actualContentUris).toEqual(expectedContentUris);
    });
    it("forEachTile covers all tiles", async function () {
        const tilesetProcessor = new tools_1.BasicTilesetProcessor();
        await tilesetProcessor.begin(implicitInput, implicitOutput, overwrite);
        const actualContentUris = [];
        await tilesetProcessor.forEachTile(async (traversedTile) => {
            const contentUris = traversedTile.getFinalContents().map((c) => c.uri);
            actualContentUris.push(contentUris);
            return true;
        });
        await tilesetProcessor.end();
        // Just check the number of content URIs from visited tiles:
        // - 1 for the implicit tiling root (with template URI as content URI)
        // - 1 for the root
        // - 4 for the tiles at level 1
        // - 4 for the tiles at level 2
        // - 12 for the tiles at level 3
        expect(actualContentUris.length).toEqual(22);
    });
    it("processTileContentEntries processes the tile content entries", async function () {
        const tilesetProcessor = new tools_1.BasicTilesetProcessor();
        await tilesetProcessor.begin(implicitInput, implicitOutput, overwrite);
        const specEntryProcessor = new SpecEntryProcessor_1.SpecEntryProcessor();
        await tilesetProcessor.processTileContentEntries(specEntryProcessor.processUri, specEntryProcessor.processEntry);
        await tilesetProcessor.end();
        const actualProcessedKeys = specEntryProcessor.processedKeys;
        // Just check the number of processed entries: It should be the same
        // as the number of tiles in the input
        // - 1 for the root
        // - 4 for the tiles at level 1
        // - 4 for the tiles at level 2
        // - 12 for the tiles at level 3
        expect(actualProcessedKeys.length).toEqual(21);
    });
    it("processTileContentEntries updates the content URIs", async function () {
        const tilesetProcessor = new tools_1.BasicTilesetProcessor();
        await tilesetProcessor.begin(implicitInput, implicitOutput, overwrite);
        const specEntryProcessor = new SpecEntryProcessor_1.SpecEntryProcessor();
        await tilesetProcessor.processTileContentEntries(specEntryProcessor.processUri, specEntryProcessor.processEntry);
        await tilesetProcessor.end();
        // Collect all content URIs from the output tileset
        const outputTilesetSource = await tilesets_2.TilesetSources.createAndOpen(implicitOutput);
        const outputTileset = await SpecHelpers_1.SpecHelpers.parseTileset(outputTilesetSource);
        const actualContentUris = await SpecHelpers_1.SpecHelpers.collectContentUris(outputTileset, outputTilesetSource);
        await outputTilesetSource.close();
        // Ensure that all content URIs have been updated
        for (const contentUri of actualContentUris) {
            expect(path_1.default.basename(contentUri).startsWith("PROCESSED")).toBeTrue();
        }
        // Ensure that the template URI was updated
        const templateUri = outputTileset.root.content?.uri;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(path_1.default.basename(templateUri).startsWith("PROCESSED")).toBeTrue();
    });
});
//# sourceMappingURL=ImplicitTilesetProcessorSpec.js.map