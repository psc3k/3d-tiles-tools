"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilesetStageExecutor = void 0;
const base_1 = require("../../base");
const base_2 = require("../../base");
const base_3 = require("../../base");
const ContentStageExecutor_1 = require("./ContentStageExecutor");
const PipelineError_1 = require("./PipelineError");
const TilesetStages_1 = require("./TilesetStages");
const BasicTilesetProcessor_1 = require("../tilesetProcessing/BasicTilesetProcessor");
const TilesetUpgrader_1 = require("../tilesetProcessing/TilesetUpgrader");
const TilesetCombiner_1 = require("../tilesetProcessing/TilesetCombiner");
const TilesetDataProcessor_1 = require("../tilesetProcessing/TilesetDataProcessor");
const base_4 = require("../../base");
const logger = base_4.Loggers.get("pipeline");
/**
 * Methods to execute `TilesetStage` objects.
 *
 * @internal
 */
class TilesetStageExecutor {
    /**
     * Executes the given `TilesetStage`.
     *
     * @param tilesetStage - The `TilesetStage` object
     * @param currentInput - The current input name, or a temporary
     * name for intermediate steps (see `Pipeline.input` for details)
     * @param currentOutput - The current output name, or a temporary
     * name for intermediate steps (see `Pipeline.input` for details)
     * @param overwrite - Whether outputs should be overwritten if
     * they already exist
     * @returns A promise that resolves when the process is finished
     * @throws PipelineError If one of the processing steps causes
     * an error.
     */
    static async executeTilesetStage(tilesetStage, currentInput, currentOutput, overwrite) {
        logger.debug(`  Executing tilesetStage : ${tilesetStage.name}`);
        logger.debug(`    currentInput:  ${currentInput}`);
        logger.debug(`    currentOutput: ${currentOutput}`);
        try {
            await TilesetStageExecutor.executeTilesetStageInternal(tilesetStage, currentInput, currentOutput, overwrite);
        }
        catch (e) {
            throw new PipelineError_1.PipelineError(`${e}`);
        }
    }
    /**
     * Implementation for `executeTilesetStage`.
     *
     * For details about the arguments, see `executeTilesetStage`.
     *
     * @param tilesetStage - The `TilesetStage` object
     * @param currentInput - The current input name
     * @param currentOutput - The current output name
     * @param overwrite - Whether outputs should be overwritten
     * @returns A promise that resolves when the process is finished
     * @throws Error If one of the processing steps causes
     * an error.
     */
    static async executeTilesetStageInternal(tilesetStage, currentInput, currentOutput, overwrite) {
        if (tilesetStage.name === TilesetStages_1.TilesetStages.TILESET_STAGE_GZIP) {
            const condition = base_2.ContentDataTypeChecks.createTypeCheck(tilesetStage.includedContentTypes, tilesetStage.excludedContentTypes);
            await TilesetStageExecutor.executeGzip(currentInput, currentOutput, overwrite, condition);
        }
        else if (tilesetStage.name === TilesetStages_1.TilesetStages.TILESET_STAGE_UNGZIP) {
            await TilesetStageExecutor.executeGunzip(currentInput, currentOutput, overwrite);
        }
        else if (tilesetStage.name === TilesetStages_1.TilesetStages.TILESET_STAGE_UPGRADE) {
            const gltfUpgradeOptions = undefined;
            const targetVersion = "1.1";
            const tilesetUpgrader = new TilesetUpgrader_1.TilesetUpgrader(targetVersion, gltfUpgradeOptions);
            await tilesetUpgrader.upgrade(currentInput, currentOutput, overwrite);
        }
        else if (tilesetStage.name === TilesetStages_1.TilesetStages.TILESET_STAGE_COMBINE) {
            const externalTilesetDetector = base_2.ContentDataTypeChecks.createIncludedCheck(base_3.ContentDataTypes.CONTENT_TYPE_TILESET);
            const tilesetCombiner = new TilesetCombiner_1.TilesetCombiner(externalTilesetDetector);
            await tilesetCombiner.combine(currentInput, currentOutput, overwrite);
        }
        else {
            await TilesetStageExecutor.executeTilesetContentStages(tilesetStage, currentInput, currentOutput, overwrite);
        }
    }
    /**
     * Performs the 'gzip' tileset stage with the given parameters.
     *
     * This will process all entries of the source tileset. The
     * data of entries that match the given condition will be
     * compressed with gzip. Other entries remain unaffected.
     *
     * @param currentInput - The current input name
     * @param currentOutput - The current output name
     * @param overwrite - Whether outputs should be overwritten
     * @param condition - The condition that was created from
     * the included- and excluded types that have been defined
     * in the `ContentStage`.
     * @returns A promise that resolves when the process is finished
     * @throws Error If one of the processing steps causes
     * an error.
     */
    static async executeGzip(currentInput, currentOutput, overwrite, condition) {
        const tilesetProcessor = new TilesetDataProcessor_1.TilesetDataProcessor();
        await tilesetProcessor.begin(currentInput, currentOutput, overwrite);
        // The entry processor receives the source entry, and
        // returns a target entry where the `value` is zipped
        // if the source entry matches the given condition.
        const entryProcessor = async (sourceEntry, type) => {
            let targetValue = sourceEntry.value;
            const shouldZip = condition(type);
            if (shouldZip) {
                targetValue = base_1.Buffers.gzip(sourceEntry.value);
            }
            const targetEntry = {
                key: sourceEntry.key,
                value: targetValue,
            };
            return targetEntry;
        };
        await tilesetProcessor.processAllEntries(entryProcessor);
        await tilesetProcessor.end();
    }
    /**
     * Performs the 'gunzip' tileset stage with the given parameters.
     *
     * This will process all entries of the source tileset. The
     * data of entries that is compressed with gzip will be
     * uncompressed. Other entries remain unaffected.
     *
     * @param currentInput - The current input name
     * @param currentOutput - The current output name
     * @param overwrite - Whether outputs should be overwritten
     * @returns A promise that resolves when the process is finished
     * @throws Error If one of the processing steps causes
     * an error.
     */
    static async executeGunzip(currentInput, currentOutput, overwrite) {
        const tilesetProcessor = new TilesetDataProcessor_1.TilesetDataProcessor();
        await tilesetProcessor.begin(currentInput, currentOutput, overwrite);
        // The entry processor receives the source entry, and
        // returns a target entry where the `value` is unzipped
        // (If the data was not zipped, then `Buffers.gunzip`
        // returns an unmodified result)
        const entryProcessor = async (sourceEntry, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        type) => {
            const targetEntry = {
                key: sourceEntry.key,
                value: base_1.Buffers.gunzip(sourceEntry.value),
            };
            return targetEntry;
        };
        await tilesetProcessor.processAllEntries(entryProcessor);
        await tilesetProcessor.end();
    }
    /**
     * Execute all `ContentStage` objects in the given `TilesetStage`.
     *
     * For details about the arguments, see `executeTilesetStage`.
     *
     * @param tilesetStage - The `TilesetStage` object
     * @param currentInput - The current input name
     * @param currentOutput - The current output name
     * @param overwrite - Whether outputs should be overwritten
     * @returns A promise that resolves when the process is finished
     * @throws Error If one of the processing steps causes
     * an error.
     */
    static async executeTilesetContentStages(tilesetStage, currentInput, currentOutput, overwrite) {
        try {
            const tilesetProcessor = new BasicTilesetProcessor_1.BasicTilesetProcessor();
            await tilesetProcessor.begin(currentInput, currentOutput, overwrite);
            const contentStages = tilesetStage.contentStages;
            if (contentStages) {
                for (let c = 0; c < contentStages.length; c++) {
                    const contentStage = contentStages[c];
                    const message = `    Executing contentStage ${c} of ` +
                        `${contentStages.length}: ${contentStage.name}`;
                    logger.debug(message);
                    await ContentStageExecutor_1.ContentStageExecutor.executeContentStage(contentStage, tilesetProcessor);
                }
                await tilesetProcessor.end();
            }
        }
        catch (e) {
            throw new PipelineError_1.PipelineError(`${e}`);
        }
    }
}
exports.TilesetStageExecutor = TilesetStageExecutor;
//# sourceMappingURL=TilesetStageExecutor.js.map