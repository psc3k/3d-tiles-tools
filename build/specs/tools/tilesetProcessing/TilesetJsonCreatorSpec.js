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
const sourceDir = SPECS_DATA_BASE_DIRECTORY + "/createTilesetJson/input/";
const targetDir = SPECS_DATA_BASE_DIRECTORY + "/createTilesetJson/output/";
const goldenDir = SPECS_DATA_BASE_DIRECTORY + "/createTilesetJson/golden/";
describe("TilesetJsonCreator", function () {
    afterEach(function () {
        SpecHelpers_1.SpecHelpers.forceDeleteDirectory(targetDir);
    });
    it("creates correct tileset JSON for batchedColors", async function () {
        const tilesetFileName = "batchedColors.json";
        const contentUri = "batchedColors.b3dm";
        const tileset = await tools_1.TilesetJsonCreator.createTilesetFromContents(sourceDir, [contentUri]);
        const outputJsonString = JSON.stringify(tileset, null, 2);
        base_1.Paths.ensureDirectoryExists(targetDir);
        fs_1.default.writeFileSync(base_1.Paths.resolve(targetDir, tilesetFileName), outputJsonString);
        fs_1.default.copyFileSync(base_1.Paths.resolve(sourceDir, contentUri), base_1.Paths.resolve(targetDir, contentUri));
        const goldenJsonString = fs_1.default
            .readFileSync(base_1.Paths.resolve(goldenDir, tilesetFileName))
            .toString();
        expect(outputJsonString).toEqual(goldenJsonString);
    });
    it("creates correct tileset JSON for compositeOfComposite", async function () {
        const tilesetFileName = "compositeOfComposite.json";
        const contentUri = "compositeOfComposite.cmpt";
        const tileset = await tools_1.TilesetJsonCreator.createTilesetFromContents(sourceDir, [contentUri]);
        const outputJsonString = JSON.stringify(tileset, null, 2);
        base_1.Paths.ensureDirectoryExists(targetDir);
        fs_1.default.writeFileSync(base_1.Paths.resolve(targetDir, tilesetFileName), outputJsonString);
        fs_1.default.copyFileSync(base_1.Paths.resolve(sourceDir, contentUri), base_1.Paths.resolve(targetDir, contentUri));
        const goldenJsonString = fs_1.default
            .readFileSync(base_1.Paths.resolve(goldenDir, tilesetFileName))
            .toString();
        expect(outputJsonString).toEqual(goldenJsonString);
    });
    it("creates correct tileset JSON for instancedOrientation", async function () {
        const tilesetFileName = "instancedOrientation.json";
        const contentUri = "instancedOrientation.i3dm";
        const tileset = await tools_1.TilesetJsonCreator.createTilesetFromContents(sourceDir, [contentUri]);
        const outputJsonString = JSON.stringify(tileset, null, 2);
        base_1.Paths.ensureDirectoryExists(targetDir);
        fs_1.default.writeFileSync(base_1.Paths.resolve(targetDir, tilesetFileName), outputJsonString);
        fs_1.default.copyFileSync(base_1.Paths.resolve(sourceDir, contentUri), base_1.Paths.resolve(targetDir, contentUri));
        const goldenJsonString = fs_1.default
            .readFileSync(base_1.Paths.resolve(goldenDir, tilesetFileName))
            .toString();
        expect(outputJsonString).toEqual(goldenJsonString);
    });
    it("creates correct tileset JSON for pointCloudRGB", async function () {
        const tilesetFileName = "pointCloudRGB.json";
        const contentUri = "pointCloudRGB.pnts";
        const tileset = await tools_1.TilesetJsonCreator.createTilesetFromContents(sourceDir, [contentUri]);
        const outputJsonString = JSON.stringify(tileset, null, 2);
        base_1.Paths.ensureDirectoryExists(targetDir);
        fs_1.default.writeFileSync(base_1.Paths.resolve(targetDir, tilesetFileName), outputJsonString);
        fs_1.default.copyFileSync(base_1.Paths.resolve(sourceDir, contentUri), base_1.Paths.resolve(targetDir, contentUri));
        const goldenJsonString = fs_1.default
            .readFileSync(base_1.Paths.resolve(goldenDir, tilesetFileName))
            .toString();
        expect(outputJsonString).toEqual(goldenJsonString);
    });
    it("creates correct tileset JSON for pointCloudQuantized", async function () {
        const tilesetFileName = "pointCloudQuantized.json";
        const contentUri = "pointCloudQuantized.pnts";
        const tileset = await tools_1.TilesetJsonCreator.createTilesetFromContents(sourceDir, [contentUri]);
        const outputJsonString = JSON.stringify(tileset, null, 2);
        base_1.Paths.ensureDirectoryExists(targetDir);
        fs_1.default.writeFileSync(base_1.Paths.resolve(targetDir, tilesetFileName), outputJsonString);
        fs_1.default.copyFileSync(base_1.Paths.resolve(sourceDir, contentUri), base_1.Paths.resolve(targetDir, contentUri));
        const goldenJsonString = fs_1.default
            .readFileSync(base_1.Paths.resolve(goldenDir, tilesetFileName))
            .toString();
        expect(outputJsonString).toEqual(goldenJsonString);
    });
    it("creates correct tileset JSON for plane-ds-p-n-32x32", async function () {
        const tilesetFileName = "plane-ds-p-n-32x32.json";
        const contentUri = "plane-ds-p-n-32x32.glb";
        const tileset = await tools_1.TilesetJsonCreator.createTilesetFromContents(sourceDir, [contentUri]);
        const outputJsonString = JSON.stringify(tileset, null, 2);
        base_1.Paths.ensureDirectoryExists(targetDir);
        fs_1.default.writeFileSync(base_1.Paths.resolve(targetDir, tilesetFileName), outputJsonString);
        fs_1.default.copyFileSync(base_1.Paths.resolve(sourceDir, contentUri), base_1.Paths.resolve(targetDir, contentUri));
        const goldenJsonString = fs_1.default
            .readFileSync(base_1.Paths.resolve(goldenDir, tilesetFileName))
            .toString();
        expect(outputJsonString).toEqual(goldenJsonString);
    });
});
//# sourceMappingURL=TilesetJsonCreatorSpec.js.map