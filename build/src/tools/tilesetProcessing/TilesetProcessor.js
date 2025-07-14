"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilesetProcessor = void 0;
const base_1 = require("../../base");
const base_2 = require("../../base");
const tilesets_1 = require("../../tilesets");
const TilesetProcessorContexts_1 = require("./TilesetProcessorContexts");
const base_3 = require("../../base");
const logger = base_3.Loggers.get("tilesetProcessing");
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
class TilesetProcessor {
    /**
     * Returns the `TilesetProcessorContext` that contains all
     * elements that are required for processing the tileset
     *
     * @returns The `TilesetProcessorContext`
     * @throws DeveloperError If `begin` was not called yet
     */
    getContext() {
        if (!this.context) {
            throw new base_1.DeveloperError("The processor was not initialized. Call 'begin' or 'beginData' first.");
        }
        return this.context;
    }
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
    async begin(tilesetSourceName, tilesetTargetName, overwrite) {
        if (this.context) {
            throw new tilesets_1.TilesetError("Processing has already begun");
        }
        this.context = await TilesetProcessorContexts_1.TilesetProcessorContexts.create(tilesetSourceName, tilesetTargetName, overwrite);
    }
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
    async beginData(tilesetSource, tilesetSourceJsonFileName, tilesetTarget, tilesetTargetJsonFileName) {
        if (this.context) {
            throw new tilesets_1.TilesetError("Processing has already begun");
        }
        this.context = await TilesetProcessorContexts_1.TilesetProcessorContexts.createFromData(tilesetSource, tilesetSourceJsonFileName, tilesetTarget, tilesetTargetJsonFileName);
    }
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
    async end(close) {
        const context = this.getContext();
        let pendingError = undefined;
        try {
            // Perform a no-op on all entries that have not yet
            // been marked as processed
            await this.processAllEntriesInternal(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            async (sourceEntry, type) => {
                return sourceEntry;
            });
        }
        catch (error) {
            pendingError = error;
        }
        // Always clean up by deleting the context
        delete this.context;
        const tryClose = close !== false;
        if (tryClose) {
            // Try to close the context, calling `close` on
            // the source and `end` on the target.
            try {
                await TilesetProcessorContexts_1.TilesetProcessorContexts.close(context);
            }
            catch (e) {
                if (!pendingError) {
                    pendingError = e;
                }
            }
        }
        if (pendingError) {
            throw pendingError;
        }
    }
    /**
     * Applies the given entry processor to each `TilesetEntry` that
     * has not yet been processed
     *
     * @param entryProcessor - The entry processor
     * @returns A promise that resolves when the process is finished
     * @throws DeveloperError If `begin` was not called yet
     * @throws TilesetError When the input could not be processed
     */
    async processAllEntriesInternal(entryProcessor) {
        const context = this.getContext();
        const tilesetSource = context.tilesetSource;
        const sourceKeys = await tilesetSource.getKeys();
        for await (const sourceKey of sourceKeys) {
            await this.processEntry(sourceKey, entryProcessor);
        }
    }
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
    async processEntry(sourceKey, entryProcessor) {
        if (this.isProcessed(sourceKey)) {
            return;
        }
        const sourceEntry = await this.fetchSourceEntry(sourceKey);
        if (!sourceEntry) {
            this.markAsProcessed(sourceKey);
            const message = `No ${sourceKey} found in input`;
            //throw new TilesetError(message);
            logger.warn(message);
            return;
        }
        const targetEntry = await this.processEntryInternal(sourceEntry, entryProcessor);
        this.markAsProcessed(sourceEntry.key);
        if (targetEntry) {
            this.putTargetKey(sourceEntry.key, targetEntry.key);
            this.markAsProcessed(targetEntry.key);
            await this.storeTargetEntries(targetEntry);
        }
    }
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
    async processEntryInternal(sourceEntry, entryProcessor) {
        const type = await base_2.ContentDataTypeRegistry.findType(sourceEntry.key, sourceEntry.value);
        logger.debug(`Processing source: ${sourceEntry.key} with type ${type}`);
        const targetEntry = await entryProcessor(sourceEntry, type);
        logger.debug(`        to target: ${targetEntry?.key}`);
        return targetEntry;
    }
    /**
     * Fetch the entry for the specified key from the current tileset
     * source. If there is no entry for the given key, then `undefined`
     * is returned.
     *
     * @param key - The key (file name)
     * @returns The object containing the entry and its type
     */
    async fetchSourceEntry(key) {
        const context = this.getContext();
        const tilesetSource = context.tilesetSource;
        const sourceKey = key;
        const sourceValue = await tilesetSource.getValue(sourceKey);
        if (!sourceValue) {
            logger.warn(`No input found for ${sourceKey}`);
            return undefined;
        }
        const sourceEntry = {
            key: sourceKey,
            value: sourceValue,
        };
        return sourceEntry;
    }
    /**
     * Store the given entries in the current target
     *
     * @param targetEntries - The target entries
     */
    async storeTargetEntries(...targetEntries) {
        const context = this.getContext();
        const tilesetTarget = context.tilesetTarget;
        for (const targetEntry of targetEntries) {
            await tilesetTarget.addEntry(targetEntry.key, targetEntry.value);
        }
    }
    /**
     * Mark a certain entry (file) as already having been processed,
     * and no longer be considered in subsequent steps.
     *
     * @param key - The key (file name)
     */
    markAsProcessed(key) {
        const context = this.getContext();
        context.processedKeys[key] = true;
    }
    /**
     * Returns whether the entry with the given key (file name) was
     * already processed.
     *
     * @param key - The key (file name)
     * @returns Whether the entry was already processed
     */
    isProcessed(key) {
        const context = this.getContext();
        return context.processedKeys[key] === true;
    }
    /**
     * Stores the new key (file name) that the the entry with the
     * given key received during processing.
     *
     * @param sourceKey - The key (file name)
     * @returns The target key, or `undefined`
     */
    putTargetKey(sourceKey, targetKey) {
        const context = this.getContext();
        context.targetKeys[sourceKey] = targetKey;
    }
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
    getTargetKey(sourceKey) {
        const context = this.getContext();
        return context.targetKeys[sourceKey];
    }
}
exports.TilesetProcessor = TilesetProcessor;
//# sourceMappingURL=TilesetProcessor.js.map