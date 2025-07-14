import { Tileset } from "../../structure";
import { TilesetSource } from "../../tilesets";
import { TilesetTarget } from "../../tilesets";
/**
 * A class for "upgrading" a tileset from a previous version to
 * a more recent version. The details of what that means exactly
 * are not (yet) specified.
 *
 * @internal
 */
export declare class TilesetUpgrader {
    /**
     * The options for the upgrade.
     */
    private readonly upgradeOptions;
    /**
     * The options that may be passed to `gltf-pipeline` when
     * GLB data in B3DM or I3DM is supposed to be upgraded.
     */
    private readonly gltfUpgradeOptions;
    /**
     * The tileset processor that will perform the actual upgrade
     */
    private tilesetProcessor;
    /**
     * The value that was stored as the `tileset.asset.gltfUpAxis`
     * of the tileset that is currently being processed.
     */
    private currentTilesetGltfUpAxis;
    /**
     * Creates a new instance
     *
     * @param targetVersion - The target version - 1.0 or 1.1
     * @param gltfUpgradeOptions - Options that may be passed
     * to `gltf-pipeline` when GLB data in B3DM or I3DM is
     * supposed to be upgraded.
     * @throws DeveloperError If the version is neither 1.0 nor 1.1
     */
    constructor(targetVersion: string, gltfUpgradeOptions: any);
    /**
     * Creates pre-configured `TilesetUpgradeOptions` for the given
     * target version.
     *
     * @param version - The target version - 1.0 or 1.1
     * @returns The `TilesetUpgradeOptions`
     */
    private static optionsFor;
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
    private static getGltfUpAxis;
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
    upgrade(tilesetSourceName: string, tilesetTargetName: string, overwrite: boolean): Promise<void>;
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
    upgradeData(tilesetSource: TilesetSource, tilesetSourceJsonFileName: string, tilesetTarget: TilesetTarget, tilesetTargetJsonFileName: string): Promise<void>;
    /**
     * Perform the upgrade of the `Tileset` object, in place.
     *
     * @param tileset - The `Tileset` object
     */
    upgradeTileset(tileset: Tileset): Promise<void>;
    /**
     * Perform the upgrades of the tile contents, by processing all
     * content URIs with the `processContentUri`, and all content
     * values (files) with `processEntry`
     *
     * @param tilesetProcessor - The `BasicTilesetProcessor` that
     * will process the entries
     */
    private performContentUpgrades;
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
    private processContentUri;
    /**
     * Process the given tileset (content) entry, and return the result.
     *
     * @param sourceEntry - The source entry
     * @param type - The `ContentDataType` of the source entry
     * @returns The processed entry
     */
    private processEntry;
    /**
     * Process the given tileset (content) entry, and return the result.
     *
     * @param sourceEntry - The source entry
     * @param type - The `ContentDataType` of the source entry
     * @returns The processed entry
     */
    private processEntryUnchecked;
    /**
     * Process the given tileset (content) entry that contains PNTS,
     * and return the result.
     *
     * @param sourceEntry - The source entry
     * @returns The processed entry
     */
    private processEntryPnts;
    /**
     * Process the given tileset (content) entry that contains B3DM,
     * and return the result.
     *
     * @param sourceEntry - The source entry
     * @returns The processed entry
     */
    private processEntryB3dm;
    /**
     * Process the given tileset (content) entry that contains I3DM,
     * and return the result.
     *
     * @param sourceEntry - The source entry
     * @returns The processed entry
     */
    private processEntryI3dm;
    /**
     * Process the given tileset (content) entry that contains CMPT,
     * and return the result.
     *
     * @param sourceEntry - The source entry
     * @returns The processed entry
     */
    private processEntryCmpt;
    /**
     * Process the given tileset (content) entry that contains glTF,
     * and return the result.
     *
     * @param sourceEntry - The source entry
     * @returns The processed entry
     */
    private processEntryGltf;
    /**
     * Process the given tileset (content) entry that contains binary
     * glTF (GLB), and return the result.
     *
     * @param sourceEntry - The source entry
     * @returns The processed entry
     */
    private processEntryGlb;
    /**
     * Process the given tileset (content) entry that contains the
     * JSON of an external tileset, and return the result.
     *
     * @param sourceEntry - The source entry
     * @returns The processed entry
     */
    private processEntryTileset;
}
//# sourceMappingURL=TilesetUpgrader.d.ts.map