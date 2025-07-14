import { ContentData } from "../../base";
import { TilesetSource } from "../../tilesets";
import { TilesetTarget } from "../../tilesets";
/**
 * A class for combining external tileset of a given tileset, to
 * create a new, combined tileset.
 *
 * @internal
 */
export declare class TilesetCombiner {
    /**
     * A predicate that is used to detect whether a given
     * content data refers to an external tileset.
     */
    private readonly externalTilesetDetector;
    /**
     * The file names of external tilesets, relative to the
     * root directory of the input tileset
     */
    private readonly externalTilesetFileNames;
    /**
     * The tileset source for the input
     */
    private tilesetSource;
    /**
     * The tileset target for the output.
     */
    private tilesetTarget;
    /**
     * Creates a new instance
     *
     * @param externalTilesetDetector - The predicate that is used to
     * detect whether something is an external tileset
     */
    constructor(externalTilesetDetector: (contentData: ContentData) => Promise<boolean>);
    /**
     * Combines ("inlines") the external tilesets that are referred to by
     * the given source tileset, and writes the result to the given target.
     *
     * @param tilesetSourceName - The tileset source name
     * @param tilesetTargetName - The tileset target name
     * @param overwrite - Whether the target should be overwritten if
     * it already exists
     * @returns A promise that resolves when the process is finished
     * @throws TilesetError When the input could not be processed,
     * or when the output already exists and `overwrite` was `false`.
     */
    combine(tilesetSourceName: string, tilesetTargetName: string, overwrite: boolean): Promise<void>;
    /**
     * Combines ("inlines") the external tilesets that are referred to by
     * the given source tileset, and writes the result to the given target.
     *
     * The caller is responsible for calling `open` on the given
     * source and `begin` on the given target before calling this
     * method, and `close` on the source and `end` on the target
     * after calling this method.
     *
     * @param tilesetSource - The tileset source
     * @param tilesetSourceJsonFileName - The name of the top-level
     * tileset JSON file in the source
     * @param tilesetTarget - The tileset target
     * @param tilesetTargetJsonFileName - The name of the top-level
     * tileset JSON file in the target
     * @returns A promise that resolves when the process is finished
     * @throws TilesetError When the input could not be processed,
     * or when the output already exists and `overwrite` was `false`.
     */
    combineData(tilesetSource: TilesetSource, tilesetSourceJsonFileName: string, tilesetTarget: TilesetTarget, tilesetTargetJsonFileName: string): Promise<void>;
    /**
     * Combines all external tilesets in the given source, and writes
     * the result into the given target.
     *
     * The caller is responsible for opening and closing the given
     * source and target.
     *
     * @param tilesetSource - The tileset source
     * @param tilesetSourceJsonFileName - The name of the top-level tileset in
     * the given source (usually `tileset.json`).
     * @param tilesetTarget - The tileset target
     * @param tilesetTargetJsonFileName - The name of the top-level tileset in
     * the given target (usually `tileset.json`).
     * @returns A promise that resolves when the process is finished.
     * @throws TilesetError When the input tileset file can not be
     * found
     * @throws TilesetError If `open` was not called on the
     * input, or `begin` was not called on the output.
     */
    private combineInternal;
    /**
     * Internal method to combine the given tileset.
     *
     * This is called with the source tileset, and then with every
     * external tileset that is encountered.
     *
     * The current directory is tracked as a directory relative to the
     * root of the original source tileset, leading to the directory
     * that contains the current tileset.
     *
     * @param currentDirectory - The current directory
     * @param tileset - The current tileset
     */
    private combineTilesetsInternal;
    /**
     * This is called for each (explicit) tile in the source tileset and
     * its external tilesets, and calls `combineContentInternal`
     * for each content, in order to process the external tilesets
     * that the contents may contain, and to update tile content URLs
     * for the combined output.
     *
     * @param currentDirectory - The current directory (see `combineTilesetsInternal`)
     * @param tile - The current tile
     */
    private combineTileInternal;
    /**
     * Processes an external tileset that was found during the traversal.
     * This will be called recursively on all external tilesets. It will
     * return the external tileset, AFTER it has itself been combined
     * by passing it to `combineTilesetsInternal`
     *
     * @param externalFileName - The full file name of the external tileset
     * @param externalFileBuffer - The buffer containing the JSON of the
     * external tileset
     * @returns The processed external tileset
     */
    private processExternalTileset;
    /**
     * This is called for each tile of the source tileset that has a single
     * content.
     *
     * If the content points to an external tileset, then
     * - The external tileset is 'combined' by calling `processExternalTileset`
     * - The properties of the given tile are replaced with the properties of
     *   the root of the (combined) external tileset.
     *
     * Otherwise, the URL of the content is updated to be relative to
     * the root of the resulting combined tileset.
     *
     * @param currentDirectory - The current directory (see `combineTilesetsInternal`)
     * @param tile - The current tile
     */
    private combineSingleContentInternal;
    /**
     * This is called for each tile of the source tileset that has multiple contents.
     *
     * It will process each content:
     *
     * If the content points to an external tileset, then
     * - The external tileset is 'combined' by calling `processExternalTileset`
     * - The root of this (combined) external tileset is added as a child to the give tile
     *
     * Otherwise, the URL of the content is updated to be relative to
     * the root of the resulting combined tileset.
     *
     * @param currentDirectory - The current directory (see `combineTilesetsInternal`)
     * @param tile - The current tile
     */
    private combineMultipleContentsInternal;
    /**
     * Returns the URI of the given content, handling the case that it
     * might be stored as the (legacy) `url` property.
     *
     * If the given content contains the (legacy) `url` property, then
     * it will be updated, in place: The `uri` property will be set to
     * the value of the `url` property, and the `url` property will
     * be deleted.
     *
     * @param content - The `Content`
     * @returns The content URI
     */
    private static obtainContentUri;
    /**
     * Copy all elements from the tileset source to the tileset target,
     * except for the ones that have been determined to be external
     * tilesets, and the one that has the given target name.
     *
     * This is supposed to be called when the `tilesetSource` and
     * `tilesetTarget` are defined, and BEFORE the entry for the
     * combined tileset JSON (with the given name) is added
     * to the target.
     *
     * @param tilesetTargetJsonFileName - The name of the target file
     * that will contain the combined tileset JSON
     */
    private copyResources;
}
//# sourceMappingURL=TilesetCombiner.d.ts.map