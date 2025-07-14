import { Tileset } from "../../../structure";
import { TilesetUpgradeOptions } from "./TilesetUpgradeOptions";
/**
 * A class for "upgrading" the `Tileset` object that was parsed from
 * a tileset JSON, from a previous version to a more recent version.
 * The details of what that means exactly are not (yet) specified.
 *
 * @internal
 */
export declare class TilesetObjectUpgrader {
    /**
     * The options for the upgrade.
     */
    private readonly upgradeOptions;
    /**
     * Creates a new instance
     *
     * @param upgradeOptions - The `TilesetUpgradeOptions`
     */
    constructor(upgradeOptions: TilesetUpgradeOptions);
    /**
     * Upgrades the given tileset, in place.
     *
     * @param tileset - The parsed tileset
     */
    upgradeTilesetObject(tileset: Tileset): Promise<void>;
    /**
     * Upgrade the `asset.version` number in the given tileset
     * to be the given target version
     *
     * @param tileset - The tileset
     * @param targetVersion - The target version
     */
    private upgradeAssetVersionNumber;
    /**
     * Upgrade the `url` property of each tile content to `uri`.
     *
     * This will examine each `tile.content` in the explicit representation
     * of the tile hierarchy in the given tileset. If any content does not
     * define a `uri`, but a (legacy) `url` property, then the `url` is
     * renamed to `uri`.
     *
     * @param tileset - The tileset
     */
    private upgradeEachContentUrlToUri;
    /**
     * If the given `Content` does not have a `uri` but uses the
     * legacy `url` property, then a message is logged, and the
     * `url` property is renamed to `uri`.
     *
     * @param content - The `Content`
     */
    private upgradeContentUrlToUri;
    /**
     * Upgrade each empty 'children' in any tile by deleting them and
     * causing the children to become 'undefined'
     *
     * @param tileset - The tileset
     */
    private upgradeEmptyChildrenToUndefined;
    /**
     * Upgrade the `refine` property of each tile to be written in
     * uppercase letters.
     *
     * @param tileset - The tileset
     */
    private upgradeRefineValues;
}
//# sourceMappingURL=TilesetObjectUpgrader.d.ts.map