import { TilesetSource } from "../../tilesets";
import { TilesetTarget } from "../../tilesets";
import { TilesetEntry } from "../../tilesets";
import { TilesetEntryProcessor } from "./TilesetEntryProcessor";
import { TilesetProcessorContext } from "./TilesetProcessorContext";
/**
 * A base class for classes that can process tilesets.
 *
 * This class offers the infrastructure for opening a `TilesetSource`
 * and a `TilesetTarget`, and performing operations on the
 * `TilesetEntry` objects.
 *
 * Subclasses can access the `TilesetProcessorContext`, which
 * contains the parsed tileset and its schema, and can offer
 * predefined sets of more specialized operations.
 *
 * @internal
 */
export declare abstract class TilesetProcessor {
    /**
     * The context that was created in `begin`
     */
    private context;
    /**
     * Returns the `TilesetProcessorContext` that contains all
     * elements that are required for processing the tileset
     *
     * @returns The `TilesetProcessorContext`
     * @throws DeveloperError If `begin` was not called yet
     */
    protected getContext(): TilesetProcessorContext;
    /**
     * Prepare processing the given tileset source and writing
     * the results into the given tileset target.
     *
     * @param tilesetSourceName - The tileset source name
     * @param tilesetTargetName - The tileset target name
     * @param overwrite - Whether the target should be overwritten if
     * it already exists
     * @returns A promise that resolves when this processor has been
     * initialized
     * @throws TilesetError When 'begin' or 'beginData' was already
     * called, when the input could not be opened, or when the output
     * already exists and `overwrite` was `false`.
     */
    begin(tilesetSourceName: string, tilesetTargetName: string, overwrite: boolean): Promise<void>;
    /**
     * Prepare processing the given tileset source and writing
     * the results into the given tileset target.
     *
     * The caller is responsible for calling `open` on the given
     * source and `begin` on the given target before calling this
     * method.
     *
     * The `close` and `end` method of the given source and target
     * will be called when calling `end(close?:boolean)` on this
     * processor and passing in either `undefined` or `true`.
     *
     * @param tilesetSourceName - The tileset source name
     * @param tilesetSourceJsonFileName - The name of the top-level
     * tileset JSON file in the source
     * @param tilesetTargetName - The tileset target name
     * @param tilesetTargetJsonFileName - The name of the top-level
     * tileset JSON file in the target
     * @returns A promise that resolves when this processor has been
     * initialized
     * @throws TilesetError When 'begin' or 'beginData' was already
     * called, or when the input could not be opened.
     */
    beginData(tilesetSource: TilesetSource, tilesetSourceJsonFileName: string, tilesetTarget: TilesetTarget, tilesetTargetJsonFileName: string): Promise<void>;
    /**
     * Finish processing the source tileset and write all entries
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
     * Applies the given entry processor to each `TilesetEntry` that
     * has not yet been processed
     *
     * @param entryProcessor - The entry processor
     * @returns A promise that resolves when the process is finished
     * @throws DeveloperError If `begin` was not called yet
     * @throws TilesetError When the input could not be processed
     */
    protected processAllEntriesInternal(entryProcessor: TilesetEntryProcessor): Promise<void>;
    /**
     * Process the specified entry.
     *
     * If the entry with the specified key was already processed,
     * then this method does nothing.
     *
     * Otherwise, the specified entry will be looked up in the tileset
     * source, and passed to the given entry processor, together with
     * its type information.
     *
     * The resulting target entry (if any) will be stored in the
     * tileset target, and both the source and the target will
     * be marked as 'processed'
     *
     * @param sourceKey - The key (file name) of the entry
     * @param entryProcessor - The `TilesetEntryProcessor` that will
     * be called to process the actual entry.
     * @returns A promise that resolves when the process is finished
     * @throws DeveloperError When the source or target is not opened
     * @throws TilesetError When the input could not be processed
     */
    processEntry(sourceKey: string, entryProcessor: TilesetEntryProcessor): Promise<void>;
    /**
     * Process the given source entry, and return the processed result.
     *
     * This will determine the content type of the given entry, and pass
     * it together with its type information to the `entryProcessor`.
     *
     * This will *not* store the returned target entry in the tileset
     * target. To do so, `storeTargetEntries` has to be called with
     * the result.
     *
     * @param sourceEntry - The source entry
     * @param entryProcessor - The `TilesetEntryProcessor`
     * @returns The target entry
     */
    private processEntryInternal;
    /**
     * Fetch the entry for the specified key from the current tileset
     * source. If there is no entry for the given key, then `undefined`
     * is returned.
     *
     * @param key - The key (file name)
     * @returns The object containing the entry and its type
     */
    fetchSourceEntry(key: string): Promise<TilesetEntry | undefined>;
    /**
     * Store the given entries in the current target
     *
     * @param targetEntries - The target entries
     */
    storeTargetEntries(...targetEntries: TilesetEntry[]): Promise<void>;
    /**
     * Mark a certain entry (file) as already having been processed,
     * and no longer be considered in subsequent steps.
     *
     * @param key - The key (file name)
     */
    markAsProcessed(key: string): void;
    /**
     * Returns whether the entry with the given key (file name) was
     * already processed.
     *
     * @param key - The key (file name)
     * @returns Whether the entry was already processed
     */
    isProcessed(key: string): boolean;
    /**
     * Stores the new key (file name) that the the entry with the
     * given key received during processing.
     *
     * @param sourceKey - The key (file name)
     * @returns The target key, or `undefined`
     */
    protected putTargetKey(sourceKey: string, targetKey: string): void;
    /**
     * Returns the new key (file name) that the the entry with the
     * given key received during processing.
     *
     * When this is `undefined`, then this may either mean that
     * the entry was removed during processing, or that it has
     * not been processed yet. The latter can be checked with
     * `isProcessed`.
     *
     * @param sourceKey - The key (file name)
     * @returns The target key, or `undefined`
     */
    protected getTargetKey(sourceKey: string): string | undefined;
}
//# sourceMappingURL=TilesetProcessor.d.ts.map