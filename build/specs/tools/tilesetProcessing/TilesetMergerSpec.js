"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const base_1 = require("../../../src/base");
const tools_1 = require("../../../src/tools");
const SpecHelpers_1 = require("../../SpecHelpers");
const SPECS_DATA_BASE_DIRECTORY = SpecHelpers_1.SpecHelpers.getSpecsDataBaseDirectory();
const overwrite = true;
describe("TilesetMerger", function () {
    afterEach(function () {
        SpecHelpers_1.SpecHelpers.forceDeleteDirectory(base_1.Paths.join(SPECS_DATA_BASE_DIRECTORY, "output/mergeTilesets"));
    });
    it("merges tilesets from directories into a single tileset directory", async function () {
        const inputDirectories = [
            base_1.Paths.join(SPECS_DATA_BASE_DIRECTORY, "mergeTilesets/basicMerge/TilesetA"),
            base_1.Paths.join(SPECS_DATA_BASE_DIRECTORY, "mergeTilesets/basicMerge/sub/TilesetA"),
        ];
        const outputDirectory = base_1.Paths.join(SPECS_DATA_BASE_DIRECTORY, "output/mergeTilesets/basicMerge");
        const outputFile = base_1.Paths.join(outputDirectory, "tileset.json");
        await tools_1.TilesetOperations.merge(inputDirectories, outputDirectory, overwrite);
        // Ensure that the output directory contains the expected files:
        // All files of the input, disambiguated for the same base name
        // (i.e. "TilesetA" and "TilesetA-0" - this is not specified,
        // but has to be assumed here)
        const actualRelativeFiles = SpecHelpers_1.SpecHelpers.collectRelativeFileNames(outputDirectory);
        actualRelativeFiles.sort();
        const expectedRelativeFiles = [
            "TilesetA-0/ll.b3dm",
            "TilesetA-0/lr.b3dm",
            "TilesetA-0/parent.b3dm",
            "TilesetA-0/tileset.json",
            "TilesetA-0/ul.b3dm",
            "TilesetA-0/ur.b3dm",
            "TilesetA/ll.b3dm",
            "TilesetA/lr.b3dm",
            "TilesetA/parent.b3dm",
            "TilesetA/tileset.json",
            "TilesetA/ul.b3dm",
            "TilesetA/ur.b3dm",
            "tileset.json",
        ];
        expect(actualRelativeFiles).toEqual(expectedRelativeFiles);
        // Ensure that the single 'tileset.json' contains the
        // proper content URIs for the external tilesets:
        const tilesetJsonBuffer = fs_1.default.readFileSync(outputFile);
        const tileset = JSON.parse(tilesetJsonBuffer.toString());
        const actualContentUris = await SpecHelpers_1.SpecHelpers.collectExplicitContentUris(tileset.root);
        actualContentUris.sort();
        const expectedContentUris = [
            "TilesetA-0/tileset.json",
            "TilesetA/tileset.json",
        ];
        expect(actualContentUris).toEqual(expectedContentUris);
    });
    it("merges tilesets from files into a single tileset file", async function () {
        const inputFiles = [
            base_1.Paths.join(SPECS_DATA_BASE_DIRECTORY, "mergeTilesets/basicMerge/TilesetA/tileset.json"),
            base_1.Paths.join(SPECS_DATA_BASE_DIRECTORY, "mergeTilesets/basicMerge/sub/TilesetA/tileset.json"),
        ];
        const outputDirectory = base_1.Paths.join(SPECS_DATA_BASE_DIRECTORY, "output/mergeTilesets/basicMerge");
        const outputFile = base_1.Paths.join(outputDirectory, "tileset.json");
        await tools_1.TilesetOperations.merge(inputFiles, outputFile, overwrite);
        // Ensure that the output directory contains the expected files:
        // All files of the input, disambiguated for the same base name
        // (i.e. "TilesetA" and "TilesetA-0" - this is not specified,
        // but has to be assumed here)
        const actualRelativeFiles = SpecHelpers_1.SpecHelpers.collectRelativeFileNames(outputDirectory);
        actualRelativeFiles.sort();
        const expectedRelativeFiles = [
            "TilesetA-0/ll.b3dm",
            "TilesetA-0/lr.b3dm",
            "TilesetA-0/parent.b3dm",
            "TilesetA-0/tileset.json",
            "TilesetA-0/ul.b3dm",
            "TilesetA-0/ur.b3dm",
            "TilesetA/ll.b3dm",
            "TilesetA/lr.b3dm",
            "TilesetA/parent.b3dm",
            "TilesetA/tileset.json",
            "TilesetA/ul.b3dm",
            "TilesetA/ur.b3dm",
            "tileset.json",
        ];
        expect(actualRelativeFiles).toEqual(expectedRelativeFiles);
        // Ensure that the single 'tileset.json' contains the
        // proper content URIs for the external tilesets:
        const tilesetJsonBuffer = fs_1.default.readFileSync(outputFile);
        const tileset = JSON.parse(tilesetJsonBuffer.toString());
        const actualContentUris = await SpecHelpers_1.SpecHelpers.collectExplicitContentUris(tileset.root);
        actualContentUris.sort();
        const expectedContentUris = [
            "TilesetA-0/tileset.json",
            "TilesetA/tileset.json",
        ];
        expect(actualContentUris).toEqual(expectedContentUris);
    });
    it("merges tilesets from directories into a single tileset in a directory for mergeJson", async function () {
        const inputDirectories = [
            base_1.Paths.join(SPECS_DATA_BASE_DIRECTORY, "mergeTilesets/basicMerge/TilesetA"),
            base_1.Paths.join(SPECS_DATA_BASE_DIRECTORY, "mergeTilesets/basicMerge/sub/TilesetA"),
        ];
        const outputDirectory = base_1.Paths.join(SPECS_DATA_BASE_DIRECTORY, "output/mergeTilesets/basicMerge");
        const outputFile = base_1.Paths.join(outputDirectory, "tileset.json");
        await tools_1.TilesetOperations.mergeJson(inputDirectories, outputDirectory, overwrite);
        // Ensure that the output directory contains the expected files:
        const actualRelativeFiles = SpecHelpers_1.SpecHelpers.collectRelativeFileNames(outputDirectory);
        actualRelativeFiles.sort();
        const expectedRelativeFiles = ["tileset.json"];
        expect(actualRelativeFiles).toEqual(expectedRelativeFiles);
        // Ensure that the single 'tileset.json' contains the
        // proper content URIs for the external tilesets:
        const tilesetJsonBuffer = fs_1.default.readFileSync(outputFile);
        const tileset = JSON.parse(tilesetJsonBuffer.toString());
        const actualContentUris = await SpecHelpers_1.SpecHelpers.collectExplicitContentUris(tileset.root);
        actualContentUris.sort();
        const expectedContentUris = [
            "../../../mergeTilesets/basicMerge/TilesetA/tileset.json",
            "../../../mergeTilesets/basicMerge/sub/TilesetA/tileset.json",
        ];
        expect(actualContentUris).toEqual(expectedContentUris);
    });
    it("merges tilesets from files into a single tileset file for mergeJson", async function () {
        const inputFiles = [
            base_1.Paths.join(SPECS_DATA_BASE_DIRECTORY, "mergeTilesets/basicMerge/TilesetA/tileset.json"),
            base_1.Paths.join(SPECS_DATA_BASE_DIRECTORY, "mergeTilesets/basicMerge/sub/TilesetA/tileset.json"),
        ];
        const outputDirectory = base_1.Paths.join(SPECS_DATA_BASE_DIRECTORY, "output/mergeTilesets/basicMerge");
        const outputFile = base_1.Paths.join(outputDirectory, "tileset.json");
        await tools_1.TilesetOperations.mergeJson(inputFiles, outputFile, overwrite);
        // Ensure that the output directory contains the expected files:
        const actualRelativeFiles = SpecHelpers_1.SpecHelpers.collectRelativeFileNames(outputDirectory);
        actualRelativeFiles.sort();
        const expectedRelativeFiles = ["tileset.json"];
        expect(actualRelativeFiles).toEqual(expectedRelativeFiles);
        // Ensure that the single 'tileset.json' contains the
        // proper content URIs for the external tilesets:
        const tilesetJsonBuffer = fs_1.default.readFileSync(outputFile);
        const tileset = JSON.parse(tilesetJsonBuffer.toString());
        const actualContentUris = await SpecHelpers_1.SpecHelpers.collectExplicitContentUris(tileset.root);
        actualContentUris.sort();
        const expectedContentUris = [
            "../../../mergeTilesets/basicMerge/TilesetA/tileset.json",
            "../../../mergeTilesets/basicMerge/sub/TilesetA/tileset.json",
        ];
        expect(actualContentUris).toEqual(expectedContentUris);
    });
    it("merges two implicit tilesets into a valid output tileset", async function () {
        // Regression test for https://github.com/CesiumGS/3d-tiles-tools/issues/157
        // The input tileset is the 'dummy' implicit tileset that is used for other
        // specs, and it is used TWICE - this doesn't make sense, but serves the
        // purpose a spec for merging two implicit tilesets
        const inputFiles = [
            base_1.Paths.join(SPECS_DATA_BASE_DIRECTORY, "/tilesetProcessing/implicitProcessing"),
            base_1.Paths.join(SPECS_DATA_BASE_DIRECTORY, "/tilesetProcessing/implicitProcessing"),
        ];
        const outputDirectory = base_1.Paths.join(SPECS_DATA_BASE_DIRECTORY, "output/mergeTilesets/mergeImplicit");
        const outputFile = base_1.Paths.join(outputDirectory, "tileset.json");
        await tools_1.TilesetOperations.mergeJson(inputFiles, outputFile, overwrite);
        // Ensure that the output directory contains the tileset JSON
        const actualRelativeFiles = SpecHelpers_1.SpecHelpers.collectRelativeFileNames(outputDirectory);
        expect(actualRelativeFiles.includes("tileset.json")).toBeTrue();
        // Ensure that the root of the resulting tileset has two children,
        // and none of them defines the 'implicitTiling' (because this is
        // defined in the roots of the external tilesets)
        const tilesetJsonBuffer = fs_1.default.readFileSync(outputFile);
        const tileset = JSON.parse(tilesetJsonBuffer.toString());
        const root = tileset.root;
        const children = root.children;
        expect(children.length).toBe(2);
        expect(children[0].implicitTiling).toBeUndefined();
        expect(children[1].implicitTiling).toBeUndefined();
    });
});
//# sourceMappingURL=TilesetMergerSpec.js.map