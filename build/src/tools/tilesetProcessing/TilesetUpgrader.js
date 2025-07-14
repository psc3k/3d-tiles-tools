"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilesetUpgrader = void 0;
const base_1 = require("../../base");
const base_2 = require("../../base");
const base_3 = require("../../base");
const tilesets_1 = require("../../tilesets");
const tilesets_2 = require("../../tilesets");
const tilesets_3 = require("../../tilesets");
const TilesetObjectUpgrader_1 = require("./upgrade/TilesetObjectUpgrader");
const ContentUpgrades_1 = require("../contentProcessing/ContentUpgrades");
const GltfUtilities_1 = require("../contentProcessing/GltfUtilities");
const BasicTilesetProcessor_1 = require("./BasicTilesetProcessor");
const TileFormatsMigration_1 = require("../migration/TileFormatsMigration");
const base_4 = require("../../base");
const logger = base_4.Loggers.get("upgrade");
/**
 * A class for "upgrading" a tileset from a previous version to
 * a more recent version. The details of what that means exactly
 * are not (yet) specified.
 *
 * @internal
 */
class TilesetUpgrader {
    /**
     * Creates a new instance
     *
     * @param targetVersion - The target version - 1.0 or 1.1
     * @param gltfUpgradeOptions - Options that may be passed
     * to `gltf-pipeline` when GLB data in B3DM or I3DM is
     * supposed to be upgraded.
     * @throws DeveloperError If the version is neither 1.0 nor 1.1
     */
    constructor(targetVersion, gltfUpgradeOptions) {
        /**
         * Process the given content URI.
         *
         * The given URI may either be an actual content URI, or a
         * template URI. Depending on the upgrade options, this
         * may change the file extension in the URI.
         *
         * @param uri - The URI
         * @returns The processed URI
         */
        this.processContentUri = (uri) => {
            // Note: There is no way to establish a clear connection
            // between a URI and the type of the tile contents that
            // it refers to. A template URI that has NO extension
            // could even refer to a mix of different content types.
            // The following is a best-effort approach to change the
            // file extensions, if present, depending on the update
            // options that are enabled.
            if (this.upgradeOptions.upgradePntsToGlb) {
                if (base_1.Paths.hasExtension(uri, ".pnts")) {
                    return base_1.Paths.replaceExtension(uri, ".glb");
                }
            }
            if (this.upgradeOptions.upgradeB3dmToGlb) {
                if (base_1.Paths.hasExtension(uri, ".b3dm")) {
                    return base_1.Paths.replaceExtension(uri, ".glb");
                }
            }
            if (this.upgradeOptions.upgradeI3dmToGlb) {
                if (base_1.Paths.hasExtension(uri, ".i3dm")) {
                    return base_1.Paths.replaceExtension(uri, ".glb");
                }
            }
            if (this.upgradeOptions.upgradeCmptToGlb) {
                if (base_1.Paths.hasExtension(uri, ".cmpt")) {
                    return base_1.Paths.replaceExtension(uri, ".glb");
                }
            }
            return uri;
        };
        /**
         * Process the given tileset (content) entry, and return the result.
         *
         * @param sourceEntry - The source entry
         * @param type - The `ContentDataType` of the source entry
         * @returns The processed entry
         */
        this.processEntry = async (sourceEntry, type) => {
            // Some of the more complex upgrade operations (like B3DM to
            // glTF+Metadata) may fail for many reasons. Such a failure
            // should not cause the whole process to fail. Therefore,
            // this case is handled here by printing an error message
            // and returning the source data, hopefully producing a
            // tileset that is still valid:
            try {
                return await this.processEntryUnchecked(sourceEntry, type);
            }
            catch (error) {
                logger.error(`Failed to upgrade ${sourceEntry.key}: ${error}`);
                return sourceEntry;
            }
        };
        /**
         * Process the given tileset (content) entry, and return the result.
         *
         * @param sourceEntry - The source entry
         * @param type - The `ContentDataType` of the source entry
         * @returns The processed entry
         */
        this.processEntryUnchecked = async (sourceEntry, type) => {
            if (type === base_3.ContentDataTypes.CONTENT_TYPE_PNTS) {
                return this.processEntryPnts(sourceEntry);
            }
            else if (type === base_3.ContentDataTypes.CONTENT_TYPE_B3DM) {
                return this.processEntryB3dm(sourceEntry);
            }
            else if (type === base_3.ContentDataTypes.CONTENT_TYPE_I3DM) {
                return this.processEntryI3dm(sourceEntry);
            }
            else if (type === base_3.ContentDataTypes.CONTENT_TYPE_CMPT) {
                return this.processEntryCmpt(sourceEntry);
            }
            else if (type === base_3.ContentDataTypes.CONTENT_TYPE_GLTF) {
                return this.processEntryGltf(sourceEntry);
            }
            else if (type === base_3.ContentDataTypes.CONTENT_TYPE_GLB) {
                return this.processEntryGlb(sourceEntry);
            }
            else if (type == base_3.ContentDataTypes.CONTENT_TYPE_TILESET) {
                return this.processEntryTileset(sourceEntry);
            }
            logger.debug(`  No upgrade operation to perform for ${sourceEntry.key}`);
            return sourceEntry;
        };
        /**
         * Process the given tileset (content) entry that contains PNTS,
         * and return the result.
         *
         * @param sourceEntry - The source entry
         * @returns The processed entry
         */
        this.processEntryPnts = async (sourceEntry) => {
            const sourceKey = sourceEntry.key;
            const sourceValue = sourceEntry.value;
            let targetKey = sourceKey;
            let targetValue = sourceValue;
            if (this.upgradeOptions.upgradePntsToGlb) {
                logger.debug(`  Upgrading PNTS to GLB for ${sourceKey}`);
                targetKey = this.processContentUri(sourceKey);
                targetValue = await TileFormatsMigration_1.TileFormatsMigration.convertPntsToGlb(sourceValue);
            }
            else {
                logger.debug(`  Not upgrading ${sourceKey} (disabled via option)`);
            }
            const targetEntry = {
                key: targetKey,
                value: targetValue,
            };
            return targetEntry;
        };
        /**
         * Process the given tileset (content) entry that contains B3DM,
         * and return the result.
         *
         * @param sourceEntry - The source entry
         * @returns The processed entry
         */
        this.processEntryB3dm = async (sourceEntry) => {
            const sourceKey = sourceEntry.key;
            const sourceValue = sourceEntry.value;
            let targetKey = sourceKey;
            let targetValue = sourceValue;
            if (this.upgradeOptions.upgradeB3dmToGlb) {
                logger.debug(`  Upgrading B3DM to GLB for ${sourceKey}`);
                targetKey = this.processContentUri(sourceKey);
                targetValue = await TileFormatsMigration_1.TileFormatsMigration.convertB3dmToGlb(sourceValue, this.currentTilesetGltfUpAxis);
            }
            else if (this.upgradeOptions.upgradeB3dmGltf1ToGltf2) {
                logger.debug(`  Upgrading GLB in ${sourceKey}`);
                targetValue = await ContentUpgrades_1.ContentUpgrades.upgradeB3dmGltf1ToGltf2(sourceValue, this.gltfUpgradeOptions, this.currentTilesetGltfUpAxis);
            }
            else {
                logger.debug(`  Not upgrading ${sourceKey} (disabled via option)`);
            }
            const targetEntry = {
                key: targetKey,
                value: targetValue,
            };
            return targetEntry;
        };
        /**
         * Process the given tileset (content) entry that contains I3DM,
         * and return the result.
         *
         * @param sourceEntry - The source entry
         * @returns The processed entry
         */
        this.processEntryI3dm = async (sourceEntry) => {
            const sourceKey = sourceEntry.key;
            const sourceValue = sourceEntry.value;
            let targetKey = sourceKey;
            let targetValue = sourceValue;
            if (this.upgradeOptions.upgradeI3dmToGlb) {
                logger.debug(`  Upgrading I3DM to GLB for ${sourceKey}`);
                targetKey = this.processContentUri(sourceKey);
                // Define the resolver for external GLB files in I3DM files:
                // It will look up the entry using the 'tilesetProcessor'
                const externalGlbResolver = async (uri) => {
                    if (!this.tilesetProcessor) {
                        return undefined;
                    }
                    const externalGlbEntry = await this.tilesetProcessor.fetchSourceEntry(uri);
                    if (!externalGlbEntry) {
                        return undefined;
                    }
                    return externalGlbEntry.value;
                };
                targetValue = await TileFormatsMigration_1.TileFormatsMigration.convertI3dmToGlb(sourceValue, externalGlbResolver, this.currentTilesetGltfUpAxis);
            }
            else if (this.upgradeOptions.upgradeI3dmGltf1ToGltf2) {
                logger.debug(`  Upgrading GLB in ${sourceKey}`);
                targetValue = await ContentUpgrades_1.ContentUpgrades.upgradeI3dmGltf1ToGltf2(sourceValue, this.gltfUpgradeOptions, this.currentTilesetGltfUpAxis);
            }
            else {
                logger.debug(`  Not upgrading ${sourceKey} (disabled via option)`);
            }
            const targetEntry = {
                key: targetKey,
                value: targetValue,
            };
            return targetEntry;
        };
        /**
         * Process the given tileset (content) entry that contains CMPT,
         * and return the result.
         *
         * @param sourceEntry - The source entry
         * @returns The processed entry
         */
        this.processEntryCmpt = async (sourceEntry) => {
            const sourceKey = sourceEntry.key;
            const sourceValue = sourceEntry.value;
            let targetKey = sourceKey;
            let targetValue = sourceValue;
            if (this.upgradeOptions.upgradeCmptToGlb) {
                logger.debug(`  Upgrading CMPT to GLB for ${sourceKey}`);
                targetKey = this.processContentUri(sourceKey);
                // Define the resolver for resources like external GLB files
                // in CMPT files: It will look up the entry using the
                // 'tilesetProcessor'
                const externalResourceResolver = async (uri) => {
                    if (!this.tilesetProcessor) {
                        return undefined;
                    }
                    const externalGlbEntry = await this.tilesetProcessor.fetchSourceEntry(uri);
                    if (!externalGlbEntry) {
                        return undefined;
                    }
                    return externalGlbEntry.value;
                };
                targetValue = await TileFormatsMigration_1.TileFormatsMigration.convertCmptToGlb(sourceValue, externalResourceResolver, this.currentTilesetGltfUpAxis);
            }
            else {
                logger.debug(`  Not upgrading ${sourceKey} (disabled via option)`);
            }
            const targetEntry = {
                key: targetKey,
                value: targetValue,
            };
            return targetEntry;
        };
        /**
         * Process the given tileset (content) entry that contains glTF,
         * and return the result.
         *
         * @param sourceEntry - The source entry
         * @returns The processed entry
         */
        this.processEntryGltf = async (sourceEntry) => {
            const sourceKey = sourceEntry.key;
            const sourceValue = sourceEntry.value;
            const targetKey = sourceKey;
            let targetValue = sourceValue;
            if (this.upgradeOptions.upgradeCesiumRtcToRootTranslation) {
                logger.debug(`  Upgrading glTF for ${sourceKey}`);
                targetValue = GltfUtilities_1.GltfUtilities.replaceCesiumRtcExtensionInGltf2Json(sourceValue, this.currentTilesetGltfUpAxis);
            }
            else {
                logger.debug(`  Not upgrading ${sourceKey} (disabled via option)`);
            }
            const targetEntry = {
                key: targetKey,
                value: targetValue,
            };
            return targetEntry;
        };
        /**
         * Process the given tileset (content) entry that contains binary
         * glTF (GLB), and return the result.
         *
         * @param sourceEntry - The source entry
         * @returns The processed entry
         */
        this.processEntryGlb = async (sourceEntry) => {
            const sourceKey = sourceEntry.key;
            const sourceValue = sourceEntry.value;
            const targetKey = sourceKey;
            let targetValue = sourceValue;
            if (this.upgradeOptions.upgradeCesiumRtcToRootTranslation) {
                logger.debug(`  Upgrading GLB for ${sourceKey}`);
                targetValue = GltfUtilities_1.GltfUtilities.replaceCesiumRtcExtensionInGltf2Glb(sourceValue, this.currentTilesetGltfUpAxis);
            }
            else {
                logger.debug(`  Not upgrading ${sourceKey} (disabled via option)`);
            }
            const targetEntry = {
                key: targetKey,
                value: targetValue,
            };
            return targetEntry;
        };
        /**
         * Process the given tileset (content) entry that contains the
         * JSON of an external tileset, and return the result.
         *
         * @param sourceEntry - The source entry
         * @returns The processed entry
         */
        this.processEntryTileset = async (sourceEntry) => {
            const sourceKey = sourceEntry.key;
            const sourceValue = sourceEntry.value;
            const targetKey = sourceKey;
            let targetValue = sourceValue;
            if (this.upgradeOptions.upgradeExternalTilesets) {
                logger.debug(`  Upgrading external tileset in ${sourceKey}`);
                const externalTileset = JSON.parse(sourceValue.toString());
                await this.upgradeTileset(externalTileset);
                const externalTilesetJsonString = JSON.stringify(externalTileset, null, 2);
                const externalTilesetJsonBuffer = Buffer.from(externalTilesetJsonString);
                targetValue = externalTilesetJsonBuffer;
            }
            else {
                logger.debug(`  Not upgrading external tileset in ${sourceKey} (disabled via option)`);
            }
            const targetEntry = {
                key: targetKey,
                value: targetValue,
            };
            return targetEntry;
        };
        this.gltfUpgradeOptions = gltfUpgradeOptions;
        this.upgradeOptions = TilesetUpgrader.optionsFor(targetVersion);
    }
    /**
     * Creates pre-configured `TilesetUpgradeOptions` for the given
     * target version.
     *
     * @param version - The target version - 1.0 or 1.1
     * @returns The `TilesetUpgradeOptions`
     */
    static optionsFor(version) {
        if (version === "1.0") {
            const options = {
                upgradeExternalTilesets: true,
                upgradedAssetVersionNumber: "1.0",
                upgradeRefineCase: true,
                upgradeContentUrlToUri: true,
                upgradeEmptyChildrenToUndefined: true,
                upgradeGltfUpAxis: true,
                upgradeContentGltfExtensionDeclarations: false,
                upgradeB3dmGltf1ToGltf2: true,
                upgradeI3dmGltf1ToGltf2: true,
                upgradePntsToGlb: false,
                upgradeB3dmToGlb: false,
                upgradeI3dmToGlb: false,
                upgradeCmptToGlb: false,
                upgradeCesiumRtcToRootTranslation: true,
            };
            return options;
        }
        if (version === "1.1") {
            const options = {
                upgradeExternalTilesets: true,
                upgradedAssetVersionNumber: "1.1",
                upgradeRefineCase: true,
                upgradeContentUrlToUri: true,
                upgradeEmptyChildrenToUndefined: true,
                upgradeGltfUpAxis: true,
                upgradeContentGltfExtensionDeclarations: true,
                upgradeB3dmGltf1ToGltf2: false,
                upgradeI3dmGltf1ToGltf2: false,
                upgradePntsToGlb: true,
                upgradeB3dmToGlb: true,
                upgradeI3dmToGlb: true,
                upgradeCmptToGlb: true,
                upgradeCesiumRtcToRootTranslation: true,
            };
            return options;
        }
        throw new base_2.DeveloperError(`Invalid target version ${version} - ` +
            `only '1.0' and '1.1' are allowed`);
    }
    /**
     * Returns the value that is stored as the `tileset.asset.gltfUpAxis`
     * in the given tileset, in uppercase, or "Y" if this value is not
     * defined.
     *
     * The result should always be a string, "X", "Y", or "Z".
     *
     * @param tileset - The tileset
     * @returns The up axis
     */
    static getGltfUpAxis(tileset) {
        const asset = tileset.asset;
        const gltfUpAxis = asset?.gltfUpAxis ?? "Y";
        return gltfUpAxis.toUpperCase();
    }
    /**
     * Upgrade the specified source tileset, and write it to the given
     * target.
     *
     * @param tilesetSourceName - The tileset source name
     * @param tilesetTargetName - The tileset target name
     * @param overwrite - Whether the target should be overwritten if
     * it already exists
     * @returns A promise that resolves when the process is finished
     * @throws TilesetError When the input could not be processed,
     * or when the output already exists and `overwrite` was `false`.
     */
    async upgrade(tilesetSourceName, tilesetTargetName, overwrite) {
        const tilesetSourceJsonFileName = tilesets_1.Tilesets.determineTilesetJsonFileName(tilesetSourceName);
        const tilesetTargetJsonFileName = tilesets_1.Tilesets.determineTilesetJsonFileName(tilesetTargetName);
        const tilesetSource = await tilesets_2.TilesetSources.createAndOpen(tilesetSourceName);
        const tilesetTarget = await tilesets_3.TilesetTargets.createAndBegin(tilesetTargetName, overwrite);
        await this.upgradeData(tilesetSource, tilesetSourceJsonFileName, tilesetTarget, tilesetTargetJsonFileName);
        await tilesetSource.close();
        await tilesetTarget.end();
    }
    /**
     * Upgrade the specified source tileset, and write it to the given
     * target.
     *
     * The caller is responsible for calling `open` on the given
     * source and `begin` on the given target before calling this
     * method, and `close` on the source and `end` on the target
     * after calling this method.
     *
     * @param tilesetSourceName - The tileset source name
     * @param tilesetSourceJsonFileName - The name of the top-level
     * tileset JSON file in the source
     * @param tilesetTargetName - The tileset target name
     * @param tilesetTargetJsonFileName - The name of the top-level
     * tileset JSON file in the target
     * @returns A promise that resolves when the process is finished
     * @throws TilesetError When the input could not be processed,
     * or when the output already exists and `overwrite` was `false`.
     */
    async upgradeData(tilesetSource, tilesetSourceJsonFileName, tilesetTarget, tilesetTargetJsonFileName) {
        const processExternalTilesets = this.upgradeOptions.upgradeExternalTilesets;
        const tilesetProcessor = new BasicTilesetProcessor_1.BasicTilesetProcessor(processExternalTilesets);
        this.tilesetProcessor = tilesetProcessor;
        await tilesetProcessor.beginData(tilesetSource, tilesetSourceJsonFileName, tilesetTarget, tilesetTargetJsonFileName);
        // Perform the upgrade for the actual tileset object
        await tilesetProcessor.forTileset(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async (tileset, schema) => {
            await this.upgradeTileset(tileset);
            return tileset;
        });
        // Perform the updates for the tile contents
        await this.performContentUpgrades(tilesetProcessor);
        await tilesetProcessor.end(false);
        delete this.tilesetProcessor;
        delete this.currentTilesetGltfUpAxis;
    }
    /**
     * Perform the upgrade of the `Tileset` object, in place.
     *
     * @param tileset - The `Tileset` object
     */
    async upgradeTileset(tileset) {
        this.currentTilesetGltfUpAxis = TilesetUpgrader.getGltfUpAxis(tileset);
        const tilesetObjectUpgrader = new TilesetObjectUpgrader_1.TilesetObjectUpgrader(this.upgradeOptions);
        await tilesetObjectUpgrader.upgradeTilesetObject(tileset);
    }
    /**
     * Perform the upgrades of the tile contents, by processing all
     * content URIs with the `processContentUri`, and all content
     * values (files) with `processEntry`
     *
     * @param tilesetProcessor - The `BasicTilesetProcessor` that
     * will process the entries
     */
    async performContentUpgrades(tilesetProcessor) {
        await tilesetProcessor.processTileContentEntries(this.processContentUri, this.processEntry);
    }
}
exports.TilesetUpgrader = TilesetUpgrader;
//# sourceMappingURL=TilesetUpgrader.js.map