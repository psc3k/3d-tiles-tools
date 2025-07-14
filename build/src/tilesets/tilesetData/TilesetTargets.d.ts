import { TilesetTarget } from "./TilesetTarget";
/**
 * Methods related to `TilesetTarget` instances
 *
 * @internal
 */
export declare class TilesetTargets {
    /**
     * Create a tileset target for the given name, and prepare
     * it to accept entries.
     *
     * This will call `TilesetTargets.create` with the extension
     * of the given name, and immediately call `begin(name)` on
     * the resulting target.
     *
     * @param name - The name
     * @param overwrite - Whether existing output files should be overwritten
     * @returns The `TilesetTarget`
     * @throws TilesetError If the output can not be opened
     */
    static createAndBegin(name: string, overwrite: boolean): Promise<TilesetTarget>;
    /**
     * Create a tileset target for the given name.
     *
     * The given name may have the extension `.3tz` or `.3dtiles`,
     * or no extension to indicate a directory.
     *
     * If the given name as the extension `.json`, then a target
     * for the directory that contains the given file is created.
     *
     * @param name - The name
     * @returns The `TilesetTarget`
     * @throws TilesetError If the output can not be opened
     */
    static createFromName(name: string): TilesetTarget;
    /**
     * Creates a TilesetTarget, based on the given
     * file extension
     *
     * @param extension - The extension: '.3tz' or '.3dtiles'
     * or the empty string (for a directory)
     * @returns The TilesetTarget, or `undefined` if the
     * extension is invalid
     */
    static create(extension: string): TilesetTarget | undefined;
}
//# sourceMappingURL=TilesetTargets.d.ts.map