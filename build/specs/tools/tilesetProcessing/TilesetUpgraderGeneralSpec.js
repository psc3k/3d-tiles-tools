"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../../../src/tools");
const SpecHelpers_1 = require("../../SpecHelpers");
const SPECS_DATA_BASE_DIRECTORY = SpecHelpers_1.SpecHelpers.getSpecsDataBaseDirectory();
const sourceDir = SPECS_DATA_BASE_DIRECTORY + "/upgradeTileset/general/input/";
const targetDir = SPECS_DATA_BASE_DIRECTORY + "/upgradeTileset/general/output/";
const goldenDir = SPECS_DATA_BASE_DIRECTORY + "/upgradeTileset/general/golden/";
describe("TilesetUpgrader General", function () {
    afterEach(function () {
        SpecHelpers_1.SpecHelpers.forceDeleteDirectory(targetDir);
    });
    it("properly upgrades tilesetWithB3dmWithGltf1", async function () {
        const testDirectoryName = "tilesetWithB3dmWithGltf1";
        const input = sourceDir + testDirectoryName;
        const output = targetDir + testDirectoryName;
        const golden = goldenDir + testDirectoryName;
        const overwrite = true;
        const targetVersion = "1.1";
        await tools_1.TilesetOperations.upgrade(input, output, overwrite, targetVersion, undefined);
        const difference = await SpecHelpers_1.SpecHelpers.computePackageDifference(output, golden);
        expect(difference).toBeUndefined();
    });
    it("properly upgrades tilesetWithB3dmWithGltf1WithWeb3dQuantizedAttributes", async function () {
        const testDirectoryName = "tilesetWithB3dmWithGltf1WithWeb3dQuantizedAttributes";
        const input = sourceDir + testDirectoryName;
        const output = targetDir + testDirectoryName;
        const golden = goldenDir + testDirectoryName;
        const overwrite = true;
        const targetVersion = "1.1";
        await tools_1.TilesetOperations.upgrade(input, output, overwrite, targetVersion, undefined);
        const difference = await SpecHelpers_1.SpecHelpers.computePackageDifference(output, golden);
        expect(difference).toBeUndefined();
    });
    it("properly upgrades tilesetWithB3dmWithGltf2WithCesiumRtc", async function () {
        const testDirectoryName = "tilesetWithB3dmWithGltf2WithCesiumRtc";
        const input = sourceDir + testDirectoryName;
        const output = targetDir + testDirectoryName;
        const golden = goldenDir + testDirectoryName;
        const overwrite = true;
        const targetVersion = "1.1";
        await tools_1.TilesetOperations.upgrade(input, output, overwrite, targetVersion, undefined);
        const difference = await SpecHelpers_1.SpecHelpers.computePackageDifference(output, golden);
        expect(difference).toBeUndefined();
    });
    it("properly upgrades tilesetWithContentUrls", async function () {
        const testDirectoryName = "tilesetWithContentUrls";
        const input = sourceDir + testDirectoryName;
        const output = targetDir + testDirectoryName;
        const golden = goldenDir + testDirectoryName;
        const overwrite = true;
        const targetVersion = "1.1";
        await tools_1.TilesetOperations.upgrade(input, output, overwrite, targetVersion, undefined);
        const difference = await SpecHelpers_1.SpecHelpers.computePackageDifference(output, golden);
        expect(difference).toBeUndefined();
    });
    it("properly upgrades tilesetWithExternalTilesetWithUrls", async function () {
        const testDirectoryName = "tilesetWithExternalTilesetWithUrls";
        const input = sourceDir + testDirectoryName;
        const output = targetDir + testDirectoryName;
        const golden = goldenDir + testDirectoryName;
        const overwrite = true;
        const targetVersion = "1.1";
        await tools_1.TilesetOperations.upgrade(input, output, overwrite, targetVersion, undefined);
        const difference = await SpecHelpers_1.SpecHelpers.computePackageDifference(output, golden);
        expect(difference).toBeUndefined();
    });
    it("properly upgrades tilesetWithGltf2GlbWithCesiumRtc", async function () {
        const testDirectoryName = "tilesetWithGltf2GlbWithCesiumRtc";
        const input = sourceDir + testDirectoryName;
        const output = targetDir + testDirectoryName;
        const golden = goldenDir + testDirectoryName;
        const overwrite = true;
        const targetVersion = "1.1";
        await tools_1.TilesetOperations.upgrade(input, output, overwrite, targetVersion, undefined);
        const difference = await SpecHelpers_1.SpecHelpers.computePackageDifference(output, golden);
        expect(difference).toBeUndefined();
    });
    it("properly upgrades tilesetWithGltf2WithCesiumRtc", async function () {
        const testDirectoryName = "tilesetWithGltf2WithCesiumRtc";
        const input = sourceDir + testDirectoryName;
        const output = targetDir + testDirectoryName;
        const golden = goldenDir + testDirectoryName;
        const overwrite = true;
        const targetVersion = "1.1";
        await tools_1.TilesetOperations.upgrade(input, output, overwrite, targetVersion, undefined);
        const difference = await SpecHelpers_1.SpecHelpers.computePackageDifference(output, golden);
        expect(difference).toBeUndefined();
    });
    it("properly upgrades tilesetWithI3dmWithGltf1", async function () {
        const testDirectoryName = "tilesetWithI3dmWithGltf1";
        const input = sourceDir + testDirectoryName;
        const output = targetDir + testDirectoryName;
        const golden = goldenDir + testDirectoryName;
        const overwrite = true;
        const targetVersion = "1.1";
        await tools_1.TilesetOperations.upgrade(input, output, overwrite, targetVersion, undefined);
        const difference = await SpecHelpers_1.SpecHelpers.computePackageDifference(output, golden);
        expect(difference).toBeUndefined();
    });
});
//# sourceMappingURL=TilesetUpgraderGeneralSpec.js.map