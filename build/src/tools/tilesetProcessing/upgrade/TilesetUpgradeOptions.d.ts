/**
 * The options for the tileset upgrade. This is only used internally,
 * as a collection of flags to enable/disable certain parts
 * of the upgrade.
 *
 * The exact set of options (and how they may eventually
 * be exposed to the user) still have to be decided.
 *
 * @internal
 */
export type TilesetUpgradeOptions = {
    upgradeExternalTilesets: boolean;
    upgradedAssetVersionNumber: string;
    upgradeRefineCase: boolean;
    upgradeContentUrlToUri: boolean;
    upgradeEmptyChildrenToUndefined: true;
    upgradeGltfUpAxis: true;
    upgradeContentGltfExtensionDeclarations: boolean;
    upgradeB3dmGltf1ToGltf2: boolean;
    upgradeI3dmGltf1ToGltf2: boolean;
    upgradePntsToGlb: boolean;
    upgradeB3dmToGlb: boolean;
    upgradeI3dmToGlb: boolean;
    upgradeCmptToGlb: boolean;
    upgradeCesiumRtcToRootTranslation: boolean;
};
//# sourceMappingURL=TilesetUpgradeOptions.d.ts.map