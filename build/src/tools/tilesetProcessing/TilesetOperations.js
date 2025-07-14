"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilesetOperations = void 0;
const base_1 = require("../../base");
const base_2 = require("../../base");
const TilesetCombiner_1 = require("./TilesetCombiner");
const TilesetMerger_1 = require("./TilesetMerger");
const TilesetUpgrader_1 = require("./TilesetUpgrader");
/**
 * Convenience methods for executing the `combine`, `merge`, and
 * `upgrade` functions on tilesets.
 *
 * @internal
 */
class TilesetOperations {
    /**
     * Performs the `combine` command line operation.
     *
     * @param tilesetSourceName - The tileset source name
     * @param tilesetTargetName - The tileset target name
     * @param overwrite - Whether the target should be overwritten if
     * it already exists
     * @returns A promise that resolves when the process is finished
     * @throws TilesetError When the input could not be processed,
     * or when the output already exists and `overwrite` was `false`.
     */
    static async combine(tilesetSourceName, tilesetTargetName, overwrite) {
        const externalTilesetDetector = base_1.ContentDataTypeChecks.createIncludedCheck(base_2.ContentDataTypes.CONTENT_TYPE_TILESET);
        const tilesetCombiner = new TilesetCombiner_1.TilesetCombiner(externalTilesetDetector);
        await tilesetCombiner.combine(tilesetSourceName, tilesetTargetName, overwrite);
    }
    /**
     * Performs the `merge` command line operation.
     *
     * @param tilesetSourceName - The tileset source name
     * @param tilesetTargetName - The tileset target name
     * @param overwrite - Whether the target should be overwritten if
     * it already exists
     * @returns A promise that resolves when the process is finished
     * @throws TilesetError When the input could not be processed,
     * or when the output already exists and `overwrite` was `false`.
     */
    static async merge(tilesetSourceNames, tilesetTargetName, overwrite) {
        const tilesetMerger = new TilesetMerger_1.TilesetMerger();
        await tilesetMerger.merge(tilesetSourceNames, tilesetTargetName, overwrite);
    }
    /**
     * Performs the `mergeJson` command line operation.
     *
     * @param tilesetSourceName - The tileset source name
     * @param tilesetTargetName - The tileset target name
     * @param overwrite - Whether the target should be overwritten if
     * it already exists
     * @returns A promise that resolves when the process is finished
     * @throws TilesetError When the input could not be processed,
     * or when the output already exists and `overwrite` was `false`.
     */
    static async mergeJson(tilesetSourceNames, tilesetTargetName, overwrite) {
        const tilesetMerger = new TilesetMerger_1.TilesetMerger();
        await tilesetMerger.mergeJson(tilesetSourceNames, tilesetTargetName, overwrite);
    }
    /**
     * Performs the `upgrade` command line operation.
     *
     * @param tilesetSourceName - The tileset source name
     * @param tilesetTargetName - The tileset target name
     * @param overwrite - Whether the target should be overwritten if
     * it already exists
     * @param targetVersion - The target version - 1.0 or 1.1
     * @param gltfUpgradeOptions - Options that may be passed
     * to `gltf-pipeline` when GLB data in B3DM or I3DM is
     * supposed to be upgraded.
     * @returns A promise that resolves when the process is finished
     * @throws TilesetError When the input could not be processed,
     * or when the output already exists and `overwrite` was `false`.
     */
    static async upgrade(tilesetSourceName, tilesetTargetName, overwrite, targetVersion, gltfUpgradeOptions) {
        const tilesetUpgrader = new TilesetUpgrader_1.TilesetUpgrader(targetVersion, gltfUpgradeOptions);
        await tilesetUpgrader.upgrade(tilesetSourceName, tilesetTargetName, overwrite);
    }
    /**
     * Performs the `upgrade` operation directly on a tileset
     *
     * @param tileset - The tileset
     * @param targetVersion - The target version - 1.0 or 1.1
     * @returns A promise that resolves when the process is finished
     * @throws TilesetError When the input could not be processed
     */
    static async upgradeTileset(tileset, targetVersion) {
        const gltfUpgradeOptions = undefined;
        const tilesetUpgrader = new TilesetUpgrader_1.TilesetUpgrader(targetVersion, gltfUpgradeOptions);
        await tilesetUpgrader.upgradeTileset(tileset);
    }
}
exports.TilesetOperations = TilesetOperations;
//# sourceMappingURL=TilesetOperations.js.map