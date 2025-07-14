import { Tile } from "../../structure";
import { Tileset } from "../../structure";
import { Schema } from "../../structure";
import { TraversalCallback } from "../../tilesets";
import { TilesetProcessor } from "./TilesetProcessor";
import { TilesetEntryProcessor } from "./TilesetEntryProcessor";
/**
 * Implementation of a `TilesetProcessor` that offers methods for
 * common operations on tileset data.
 *
 * The operations are applied by callbacks on certain elements
 * of the tileset data:
 *
 * - All tiles (as `TraversedTile` instances)
 * - Explicit tiles (as `Tile` instances)
 * - The tileset (and its schema) itself
 *
 * The operations may involve modifications of the actual
 * `Tileset` object. The modified tileset object will be
 * written into the target when `end()` is called.
 *
 * @internal
 */
export declare class BasicTilesetProcessor extends TilesetProcessor {
    /**
     * Whether external tilesets should be processed transparently.
     *
     * When this is 'true', then the methods that process tile
     * content will also be applied to the contents of external
     * tilesets.
     */
    private readonly processExternalTilesets;
    /**
     * Creates a new instance
     *
     * @param processExternalTilesets - Whether external tilesets
     * should be processed.
     */
    constructor(processExternalTilesets?: boolean);
    /**
     * Overridden method from `TilesetProcessor` to save the
     * possibly modified tileset JSON in the target, finish
     * processing the source tileset and write all entries
     * that have not been processed yet into the target.
     *
     * @param close - Whether calling this should try to close
     * the source and target of the current context, defaulting
     * to `true`.
     * @returns A promise that resolves when the operation finished
     * @throws TilesetError When there was an error while processing
     * or storing the entries.
     */
    end(close?: boolean): Promise<void>;
    /**
     * Store the target tileset as the entry for the tileset
     * JSON in the current target.
     *
     * This will mark the source- and target tileset JSON name
     * as 'processed'
     *
     * @throws DeveloperError If `begin` was not called yet
     * @throws TilesetError When the input could not be processed
     */
    private storeTargetTileset;
    /**
     * Applies the given entry processor to each `TilesetEntry` that
     * has not yet been processed, except for the entry of the
     * main tileset JSON.
     *
     * @param entryProcessor - The entry processor
     * @returns A promise that resolves when the process is finished
     * @throws DeveloperError If `begin` was not called yet
     * @throws TilesetError When the input could not be processed
     */
    processAllEntries(entryProcessor: TilesetEntryProcessor): Promise<void>;
    /**
     * Apply the given callback to all `TraversedTile` instances
     * that result from traversing the tileset.
     *
     * @param callback - The callback.
     * @returns A promise that resolves when the process is finished
     * @throws DeveloperError If `begin` was not called yet
     * @throws TilesetError When an error is thrown during processing
     */
    forEachTile(callback: TraversalCallback): Promise<void>;
    /**
     * Apply the given callback to all `TraversedTile` instances
     * that result from traversing the tile hierarchy, starting
     * at the given tile.
     *
     * The given tile is assumed to be an explicit tile in the
     * current tileset.
     *
     * @param tileset - The tileset
     * @param tile - The tile where to start the traversal
     * @param callback - The callback
     * @returns A promise that resolves when the process is finished
     * @throws DeveloperError If `begin` was not called yet
     * @throws TilesetError When an error is thrown during processing
     */
    private forEachTileAt;
    /**
     * Apply the given callback to each tile that appears as `Tile`
     * object in the tileset JSON
     *
     * @param callback - The callback
     * @returns A promise that resolves when the process is finished
     * @throws DeveloperError If `begin` was not called yet
     * @throws TilesetError When an error is thrown during processing
     */
    forEachExplicitTile(callback: (tile: Tile) => Promise<void>): Promise<void>;
    /**
     * Apply the given callback to the `Tileset` and the metadata
     * schema.
     *
     * @param callback - The callback
     * @returns A promise that resolves when the process is finished,
     * and contains the tileset that should be written into the
     * target. This may be identical to the given input tileset.
     * @throws DeveloperError If `begin` was not called yet
     * @throws TilesetError When an error is thrown during processing
     */
    forTileset(callback: (tileset: Tileset, schema: Schema | undefined) => Promise<Tileset>): Promise<void>;
    /**
     * Process all entries that are tile content.
     *
     * This will process all tile content entries of the source tileset
     * with the given `TilesetEntryProcessor`. The given `uriProcessor`
     * will be used for updating the `key` (file name) of the entries,
     * as well as possible template URIs at the roots of implicit
     * tilesets.
     *
     * @param uriProcessor - The processor that updates keys and URIs
     * @param entryProcessor - The `TilesetEntryProcessor`
     * @returns A promise that resolves when the process is finished
     * @throws Error If one of the processing steps causes an error.
     */
    processTileContentEntries(uriProcessor: (uri: string) => string, entryProcessor: TilesetEntryProcessor): Promise<void>;
    /**
     * Process all entries that are tile content of any of the
     * tiles in the given tileset.
     *
     * This will process all tile content entries of the given tileset
     * with the given `TilesetEntryProcessor`. The given `uriProcessor`
     * will be used for updating the `key` (file name) of the entries,
     * as well as possible template URIs at the roots of implicit
     * tilesets.
     *
     * @param basePath - The path that the (relative) content URIs of
     * the given tileset are resolved against, in order to obtain the
     * full path for the content data. For the root tileset, this is
     * just the current directory, `"."`. For external tilesets, it
     * will be the directory that contained the tileset JSON file of
     * the external tileset.
     * @param tileset - The tileset
     * @param uriProcessor - The processor that updates keys and URIs
     * @param entryProcessor - The `TilesetEntryProcessor`
     * @returns A promise that resolves when the process is finished
     * @throws Error If one of the processing steps causes
     * an error.
     */
    private processTilesetTileContentEntries;
    /**
     * Process all entries that correspond to content of the given tile.
     *
     * The `tile.content.uri` or `tile.contents[i].uri` of the given tile
     * will be updated to reflect possible changes of the keys (file
     * names) that are performed by the `entryProcessor`.
     *
     * @param basePath - The base path (see processTilesetTileContentEntries)
     * @param tile - The tile
     * @param uriProcessor - The processor that updates keys and URIs
     * @param entryProcessor - The `TilesetEntryProcessor`
     * @returns A promise that resolves when the process is finished
     */
    private processExplicitTileContentEntries;
    /**
     * Process all entries that correspond to content of the given traversed tile.
     *
     * This determines the entries in the tileset source that represent
     * content of the given tile, calls `processEntries` on them,
     * and stores the resulting entries.
     *
     * @param basePath - The base path (see processTilesetTileContentEntries)
     * @param traversedTile - The traversed tile
     * @param uriProcessor - The processor that updates keys and URIs
     * @param entryProcessor - The `TilesetEntryProcessor`
     * @returns A promise that resolves when the process is finished
     */
    private processTraversedTileContentEntries;
    /**
     * Process all entries that correspond to the given contents.
     *
     * The method will return the "target names" of these contents - i.e.
     * the file names / uris that the contents have after being processed
     * with the given entry processor (and it will make sure that the
     * entry processor is only applied ONCE to each entry).
     *
     * If one of the contents is an external tileset, and the
     * `this.processExternalTilesets` flag is `true`, then the
     * method will call `processTilesetTileContentEntries`
     * on this tileset, to recursively handle the content entries
     * of the external tileset.
     *
     * @param basePath - The base path (see processTilesetTileContentEntries)
     * @param contents - The contents
     * @param uriProcessor - The processor that updates keys and URIs
     * @param entryProcessor - The `TilesetEntryProcessor`
     * @returns A promise that resolves when the process is finished,
     * containing the new names that the entries have after processing
     */
    private processContentEntries;
    /**
     * Process all entries that correspond to tile content of a tile
     * in the given tileset.
     *
     * This will traverse the tile hierarchy of the given tileset
     * and eventually apply the given entry processor to each tile
     * content. The JSON that is parsed from the given entry will
     * be modified, and the modified JSON (with possibly updated
     * content URIs) will be returned as the new entry for the
     * external tileset.
     *
     * @param basePath - The base path (see processTilesetTileContentEntries)
     * @param externalTilesetSourceEntry - The tileset entry that
     * contains the external tileset.
     * @param uriProcessor - The processor that updates keys and URIs
     * @param entryProcessor - The `TilesetEntryProcessor`
     * @returns A promise that resolves when the process is finished,
     * containing the new names that the entries have after processing
     * @throws Error If processing the external tileset causes an error
     */
    private processExternalTilesetContentEntries;
    /**
     * Returns an array with all contents of the give tile.
     *
     * @param contents - The contents
     * @returns A promise with the entries
     */
    private static getTileContents;
    /**
     * Update the content of the given tile to reflect the given URIs.
     *
     * When the given array is empty, then the `content` and `contents`
     * of the given tile will be deleted.
     *
     * When there is one element, then the `content` of the given tile will
     * receive this element as the content `uri`.
     *
     * When there are multiple elements, the tile will receive `contents`
     * where each content `uri` is one element of the array.
     *
     * @param tile - The tile
     * @param contentUris - The content URIs
     */
    static updateTileContent(tile: Tile, contentUris: string[]): void;
}
//# sourceMappingURL=BasicTilesetProcessor.d.ts.map