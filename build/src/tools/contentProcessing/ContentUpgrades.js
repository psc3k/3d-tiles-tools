"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentUpgrades = void 0;
const tilesets_1 = require("../../tilesets");
const GltfUtilities_1 = require("./GltfUtilities");
/**
 * Internal class containing functions to upgrade tile content data.
 *
 * For now, this covers the narrow case of B3DM and I3DM data where
 * the contained GLB should be upgraded from glTF 1.0 to glTF 2.0
 * with `gltf-pipeline`. (Specifically: This does not change the
 * type of the data itself)
 *
 * @internal
 */
class ContentUpgrades {
    /**
     * For the given B3DM data buffer, extract the GLB, upgrade it
     * with `GltfUtilities.upgradeGlb`, create a new B3DM from the
     * result, and return it.
     *
     * @param inputBuffer - The input buffer
     * @param options - Options that will be passed to the
     * `gltf-pipeline` when the GLB is processed.
     * @param gltfUpAxis - The glTF up-axis, defaulting to "Y"
     * @returns The upgraded buffer
     */
    static async upgradeB3dmGltf1ToGltf2(inputBuffer, options, gltfUpAxis) {
        const inputTileData = tilesets_1.TileFormats.readTileData(inputBuffer);
        const inputGlb = inputTileData.payload;
        let outputGlb = await GltfUtilities_1.GltfUtilities.upgradeGlb(inputGlb, options);
        // Replace the CESIUM_RTC extension with a translation
        // of the root node if necessary
        outputGlb = GltfUtilities_1.GltfUtilities.replaceCesiumRtcExtensionInGltf2Glb(outputGlb, gltfUpAxis);
        const outputTileData = tilesets_1.TileFormats.createB3dmTileDataFromGlb(outputGlb, inputTileData.featureTable.json, inputTileData.featureTable.binary, inputTileData.batchTable.json, inputTileData.batchTable.binary);
        const outputBuffer = tilesets_1.TileFormats.createTileDataBuffer(outputTileData);
        return outputBuffer;
    }
    /**
     * For the given I3DM data buffer, extract the GLB, upgrade it
     * with `GltfUtilities.upgradeGlb`, create a new B3DM from the
     * result, and return it.
     *
     * @param inputBuffer - The input buffer
     * @param options - Options that will be passed to the
     * `gltf-pipeline` when the GLB is processed.
     * @param gltfUpAxis - The glTF up-axis, defaulting to "Y"
     * @returns The upgraded buffer
     */
    static async upgradeI3dmGltf1ToGltf2(inputBuffer, options, gltfUpAxis) {
        const inputTileData = tilesets_1.TileFormats.readTileData(inputBuffer);
        const inputGlb = inputTileData.payload;
        let outputGlb = await GltfUtilities_1.GltfUtilities.upgradeGlb(inputGlb, options);
        // Replace the CESIUM_RTC extension with a translation
        // of the root node if necessary
        outputGlb = GltfUtilities_1.GltfUtilities.replaceCesiumRtcExtensionInGltf2Glb(outputGlb, gltfUpAxis);
        const outputTileData = tilesets_1.TileFormats.createI3dmTileDataFromGlb(outputGlb, inputTileData.featureTable.json, inputTileData.featureTable.binary, inputTileData.batchTable.json, inputTileData.batchTable.binary);
        const outputBuffer = tilesets_1.TileFormats.createTileDataBuffer(outputTileData);
        return outputBuffer;
    }
}
exports.ContentUpgrades = ContentUpgrades;
//# sourceMappingURL=ContentUpgrades.js.map