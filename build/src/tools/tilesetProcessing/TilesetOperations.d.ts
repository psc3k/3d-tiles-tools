import { Tileset } from "../../structure";
/**
 * Convenience methods for executing the `combine`, `merge`, and
 * `upgrade` functions on tilesets.
 *
 * @internal
 */
export declare class TilesetOperations {
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
    static combine(tilesetSourceName: string, tilesetTargetName: string, overwrite: boolean): Promise<void>;
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
    static merge(tilesetSourceNames: string[], tilesetTargetName: string, overwrite: boolean): Promise<void>;
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
    static mergeJson(tilesetSourceNames: string[], tilesetTargetName: string, overwrite: boolean): Promise<void>;
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
    static upgrade(tilesetSourceName: string, tilesetTargetName: string, overwrite: boolean, targetVersion: string, gltfUpgradeOptions: any): Promise<void>;
    /**
     * Performs the `upgrade` operation directly on a tileset
     *
     * @param tileset - The tileset
     * @param targetVersion - The target version - 1.0 or 1.1
     * @returns A promise that resolves when the process is finished
     * @throws TilesetError When the input could not be processed
     */
    static upgradeTileset(tileset: Tileset, targetVersion: string): Promise<void>;
}
//# sourceMappingURL=TilesetOperations.d.ts.map