"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsMain = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const base_1 = require("../base");
const base_2 = require("../base");
const base_3 = require("../base");
const base_4 = require("../base");
const base_5 = require("../base");
const tilesets_1 = require("../tilesets");
const tilesets_2 = require("../tilesets");
const tilesets_3 = require("../tilesets");
const tools_1 = require("../tools");
const tools_2 = require("../tools");
const tools_3 = require("../tools");
const tools_4 = require("../tools");
const tools_5 = require("../tools");
const tools_6 = require("../tools");
const tools_7 = require("../tools");
const tools_8 = require("../tools");
const base_6 = require("../base");
const base_7 = require("../base");
const logger = base_7.Loggers.get("CLI");
/**
 * Functions that directly correspond to the command line functionality.
 *
 * The functions that directly operate on individual files (tile content),
 * like `cmptToGlb`, will just read the input data, perform the operation,
 * and write the output data.
 *
 * The "simple" tileset operations (like `combine` or `merge`) are
 * implemented based on the utility functions in the `Tilesets` class.
 *
 * Some operations (like `gzip`) are implemented by creating the
 * preliminary JSON representation of the processing pipeline, then
 * creating a `Pipeline` object from that, and executing that pipeline.
 */
class ToolsMain {
    static async b3dmToGlb(input, output, force) {
        logger.debug(`Executing b3dmToGlb`);
        logger.debug(`  input: ${input}`);
        logger.debug(`  output: ${output}`);
        logger.debug(`  force: ${force}`);
        ToolsMain.ensureCanWrite(output, force);
        const inputBuffer = fs_1.default.readFileSync(input);
        const inputTileData = tilesets_1.TileFormats.readTileData(inputBuffer);
        const outputBuffer = tilesets_1.TileFormats.extractGlbPayload(inputTileData);
        fs_1.default.writeFileSync(output, outputBuffer);
        logger.debug(`Executing b3dmToGlb DONE`);
    }
    static async convertB3dmToGlb(input, output, force) {
        logger.debug(`Executing convertB3dmToGlb`);
        logger.debug(`  input: ${input}`);
        logger.debug(`  output: ${output}`);
        logger.debug(`  force: ${force}`);
        ToolsMain.ensureCanWrite(output, force);
        const inputBuffer = fs_1.default.readFileSync(input);
        const gltfUpAxis = "Y";
        const outputBuffer = await tools_6.TileFormatsMigration.convertB3dmToGlb(inputBuffer, gltfUpAxis);
        fs_1.default.writeFileSync(output, outputBuffer);
        logger.debug(`Executing convertB3dmToGlb DONE`);
    }
    static async convertPntsToGlb(input, output, force) {
        logger.debug(`Executing convertPntsToGlb`);
        logger.debug(`  input: ${input}`);
        logger.debug(`  output: ${output}`);
        logger.debug(`  force: ${force}`);
        ToolsMain.ensureCanWrite(output, force);
        const inputBuffer = fs_1.default.readFileSync(input);
        const outputBuffer = await tools_6.TileFormatsMigration.convertPntsToGlb(inputBuffer);
        fs_1.default.writeFileSync(output, outputBuffer);
        logger.debug(`Executing convertPntsToGlb DONE`);
    }
    static async convertI3dmToGlb(input, output, force) {
        logger.debug(`Executing convertI3dmToGlb`);
        logger.debug(`  input: ${input}`);
        logger.debug(`  output: ${output}`);
        logger.debug(`  force: ${force}`);
        ToolsMain.ensureCanWrite(output, force);
        const inputBuffer = fs_1.default.readFileSync(input);
        // Prepare the resolver for external GLBs in I3DM
        const externalGlbResolver = ToolsMain.createResolver(input);
        const gltfUpAxis = "Y";
        const outputBuffer = await tools_6.TileFormatsMigration.convertI3dmToGlb(inputBuffer, externalGlbResolver, gltfUpAxis);
        fs_1.default.writeFileSync(output, outputBuffer);
        logger.debug(`Executing convertI3dmToGlb DONE`);
    }
    static async i3dmToGlb(input, output, force) {
        logger.debug(`Executing i3dmToGlb`);
        logger.debug(`  input: ${input}`);
        logger.debug(`  output: ${output}`);
        logger.debug(`  force: ${force}`);
        ToolsMain.ensureCanWrite(output, force);
        const inputBuffer = fs_1.default.readFileSync(input);
        const inputTileData = tilesets_1.TileFormats.readTileData(inputBuffer);
        // Prepare the resolver for external GLBs in I3DM
        const externalGlbResolver = ToolsMain.createResolver(input);
        const outputBuffer = await tilesets_1.TileFormats.obtainGlbPayload(inputTileData, externalGlbResolver);
        if (!outputBuffer) {
            throw new tilesets_3.TileFormatError(`Could not resolve external GLB from I3DM file`);
        }
        fs_1.default.writeFileSync(output, outputBuffer);
        logger.debug(`Executing i3dmToGlb DONE`);
    }
    static async cmptToGlb(input, output, force) {
        logger.debug(`Executing cmptToGlb`);
        logger.debug(`  input: ${input}`);
        logger.debug(`  output: ${output}`);
        logger.debug(`  force: ${force}`);
        const inputBuffer = fs_1.default.readFileSync(input);
        const externalGlbResolver = ToolsMain.createResolver(input);
        const glbBuffers = await tilesets_1.TileFormats.extractGlbBuffers(inputBuffer, externalGlbResolver);
        const glbsLength = glbBuffers.length;
        const glbPaths = Array(glbsLength);
        if (glbsLength === 0) {
            throw new base_2.DeveloperError(`No glbs found in ${input}.`);
        }
        else if (glbsLength === 1) {
            glbPaths[0] = output;
        }
        else {
            const prefix = base_1.Paths.replaceExtension(output, "");
            for (let i = 0; i < glbsLength; ++i) {
                glbPaths[i] = `${prefix}_${i}.glb`;
            }
        }
        for (let i = 0; i < glbsLength; i++) {
            const glbPath = glbPaths[i];
            ToolsMain.ensureCanWrite(glbPath, force);
            const glbBuffer = glbBuffers[i];
            fs_1.default.writeFileSync(glbPath, glbBuffer);
        }
        logger.debug(`Executing cmptToGlb DONE`);
    }
    static async splitCmpt(input, output, recursive, force) {
        logger.debug(`Executing splitCmpt`);
        logger.debug(`  input: ${input}`);
        logger.debug(`  output: ${output}`);
        logger.debug(`  recursive: ${recursive}`);
        logger.debug(`  force: ${force}`);
        const inputBuffer = fs_1.default.readFileSync(input);
        const outputBuffers = await tilesets_1.TileFormats.splitCmpt(inputBuffer, recursive);
        for (let i = 0; i < outputBuffers.length; i++) {
            const outputBuffer = outputBuffers[i];
            const prefix = base_1.Paths.replaceExtension(output, "");
            const extension = await ToolsMain.determineFileExtension(outputBuffer);
            const outputPath = `${prefix}_${i}.${extension}`;
            ToolsMain.ensureCanWrite(outputPath, force);
            fs_1.default.writeFileSync(outputPath, outputBuffer);
        }
        logger.debug(`Executing splitCmpt DONE`);
    }
    static async determineFileExtension(data) {
        const type = await base_6.ContentDataTypeRegistry.findType("", data);
        switch (type) {
            case base_5.ContentDataTypes.CONTENT_TYPE_B3DM:
                return "b3dm";
            case base_5.ContentDataTypes.CONTENT_TYPE_I3DM:
                return "i3dm";
            case base_5.ContentDataTypes.CONTENT_TYPE_PNTS:
                return "pnts";
            case base_5.ContentDataTypes.CONTENT_TYPE_CMPT:
                return "cmpt";
        }
        logger.warn("Could not determine type of inner tile");
        return "UNKNOWN";
    }
    static async glbToB3dm(input, output, force) {
        logger.debug(`Executing glbToB3dm`);
        logger.debug(`  input: ${input}`);
        logger.debug(`  output: ${output}`);
        logger.debug(`  force: ${force}`);
        ToolsMain.ensureCanWrite(output, force);
        const inputBuffer = fs_1.default.readFileSync(input);
        const outputTileData = tilesets_1.TileFormats.createDefaultB3dmTileDataFromGlb(inputBuffer);
        const outputBuffer = tilesets_1.TileFormats.createTileDataBuffer(outputTileData);
        fs_1.default.writeFileSync(output, outputBuffer);
        logger.debug(`Executing glbToB3dm DONE`);
    }
    static async glbToI3dm(input, output, force) {
        logger.debug(`Executing glbToI3dm`);
        logger.debug(`  input: ${input}`);
        logger.debug(`  output: ${output}`);
        logger.debug(`  force: ${force}`);
        ToolsMain.ensureCanWrite(output, force);
        const inputBuffer = fs_1.default.readFileSync(input);
        const outputTileData = tilesets_1.TileFormats.createDefaultI3dmTileDataFromGlb(inputBuffer);
        const outputBuffer = tilesets_1.TileFormats.createTileDataBuffer(outputTileData);
        fs_1.default.writeFileSync(output, outputBuffer);
        logger.debug(`Executing glbToI3dm DONE`);
    }
    static async optimizeB3dm(input, output, force, options) {
        logger.debug(`Executing optimizeB3dm`);
        logger.debug(`  input: ${input}`);
        logger.debug(`  output: ${output}`);
        logger.debug(`  force: ${force}`);
        logger.debug(`  options: ${JSON.stringify(options)}`);
        ToolsMain.ensureCanWrite(output, force);
        const inputBuffer = fs_1.default.readFileSync(input);
        const outputBuffer = await tools_1.ContentOps.optimizeB3dmBuffer(inputBuffer, options);
        fs_1.default.writeFileSync(output, outputBuffer);
        logger.debug(`Executing optimizeB3dm DONE`);
    }
    static async optimizeI3dm(input, output, force, options) {
        logger.debug(`Executing optimizeI3dm`);
        logger.debug(`  input: ${input}`);
        logger.debug(`  output: ${output}`);
        logger.debug(`  force: ${force}`);
        logger.debug(`  options: ${JSON.stringify(options)}`);
        ToolsMain.ensureCanWrite(output, force);
        const inputBuffer = fs_1.default.readFileSync(input);
        const outputBuffer = await tools_1.ContentOps.optimizeI3dmBuffer(inputBuffer, options);
        fs_1.default.writeFileSync(output, outputBuffer);
        logger.debug(`Executing optimizeI3dm DONE`);
    }
    static updateAlignment(input, output, force) {
        logger.debug(`Executing updateAlignment`);
        logger.debug(`  input: ${input}`);
        logger.debug(`  output: ${output}`);
        logger.debug(`  force: ${force}`);
        ToolsMain.ensureCanWrite(output, force);
        const inputBuffer = fs_1.default.readFileSync(input);
        const outputBuffer = tools_1.ContentOps.updateAlignment(inputBuffer);
        fs_1.default.writeFileSync(output, outputBuffer);
        logger.debug(`Executing updateAlignment DONE`);
    }
    static analyze(inputFileName, outputDirectoryName, force) {
        logger.info(`Analyzing ${inputFileName}`);
        logger.info(`writing results to ${outputDirectoryName}`);
        const inputBaseName = path_1.default.basename(inputFileName);
        const inputBuffer = fs_1.default.readFileSync(inputFileName);
        ToolsMain.analyzeInternal(inputBaseName, inputBuffer, outputDirectoryName, force);
        logger.info(`Analyzing ${inputFileName} DONE`);
    }
    static analyzeInternal(inputBaseName, inputBuffer, outputDirectoryName, force) {
        // A function to create a JSON string from an
        // object. The formatting will be controlled
        // via a command line flag in the future.
        const doFormatJson = true;
        const stringify = (input) => {
            if (doFormatJson) {
                return JSON.stringify(input, null, 2);
            }
            return JSON.stringify(input);
        };
        // A function to write a JSON string to a file, if
        // the JSON string does not represent an empty
        // object, and if the file can be written.
        const writeJsonFileOptional = (jsonString, fileName) => {
            if (jsonString === "{}") {
                return;
            }
            if (!ToolsMain.canWrite(fileName, force)) {
                logger.error(`Cannot write ${fileName}`);
                return;
            }
            logger.info(`Writing ${fileName}`);
            fs_1.default.writeFileSync(fileName, Buffer.from(jsonString));
        };
        // A function to write a buffer to a file, if
        // the buffer is not empty, and if the file
        // can be written.
        const writeFileOptional = (buffer, fileName) => {
            if (buffer.length === 0) {
                return;
            }
            if (!ToolsMain.canWrite(fileName, force)) {
                logger.error(`Cannot write ${fileName}`);
                return;
            }
            logger.info(`Writing ${fileName}`);
            fs_1.default.writeFileSync(fileName, buffer);
        };
        // Read the buffer and its magic header
        const magic = base_3.Buffers.getMagicString(inputBuffer, 0);
        if (magic === "b3dm" || magic === "i3dm" || magic === "pnts") {
            // Handle the basic legacy tile formats
            const tileDataLayout = tilesets_2.TileDataLayouts.create(inputBuffer);
            const tileData = tilesets_1.TileFormats.extractTileData(inputBuffer, tileDataLayout);
            // Create the JSON strings for the layout information,
            // feature table, batch table, and the GLB JSON
            const layoutJsonString = stringify(tileDataLayout);
            const featureTableJsonString = stringify(tileData.featureTable.json);
            const batchTableJsonString = stringify(tileData.batchTable.json);
            let glbJsonString = "{}";
            if (tileData.payload.length !== 0) {
                const glbJsonBuffer = tools_2.GltfUtilities.extractJsonFromGlb(tileData.payload);
                glbJsonString = glbJsonBuffer.toString();
            }
            if (doFormatJson) {
                const glbJson = JSON.parse(glbJsonString);
                glbJsonString = stringify(glbJson);
            }
            // Determine the output file names. They are files in the
            // output directory, prefixed with the name of the input
            // file, and with suffixes that indicate the actual contents
            const outputBaseName = base_1.Paths.resolve(outputDirectoryName, inputBaseName);
            const layoutFileName = outputBaseName + ".layout.json";
            const featureTableJsonFileName = outputBaseName + ".featureTable.json";
            const batchTableJsonFileName = outputBaseName + ".batchTable.json";
            const glbFileName = outputBaseName + ".glb";
            const glbJsonFileName = outputBaseName + ".glb.json";
            // Write all output files
            base_1.Paths.ensureDirectoryExists(outputDirectoryName);
            writeJsonFileOptional(layoutJsonString, layoutFileName);
            writeFileOptional(tileData.payload, glbFileName);
            writeJsonFileOptional(featureTableJsonString, featureTableJsonFileName);
            writeJsonFileOptional(batchTableJsonString, batchTableJsonFileName);
            writeJsonFileOptional(glbJsonString, glbJsonFileName);
        }
        else if (magic === "cmpt") {
            // Handle composite tiles
            const compositeTileData = tilesets_1.TileFormats.readCompositeTileData(inputBuffer);
            const n = compositeTileData.innerTileBuffers.length;
            for (let i = 0; i < n; i++) {
                const innerTileDataBuffer = compositeTileData.innerTileBuffers[i];
                const innerTileBaseName = `${inputBaseName}.inner[${i}]`;
                ToolsMain.analyzeInternal(innerTileBaseName, innerTileDataBuffer, outputDirectoryName, force);
            }
        }
        else if (magic === "glTF") {
            // Handle GLB files
            let glbJsonString = "{}";
            const glbJsonBuffer = tools_2.GltfUtilities.extractJsonFromGlb(inputBuffer);
            glbJsonString = glbJsonBuffer.toString();
            if (doFormatJson) {
                const glbJson = JSON.parse(glbJsonString);
                glbJsonString = stringify(glbJson);
            }
            const outputBaseName = base_1.Paths.resolve(outputDirectoryName, inputBaseName);
            const glbJsonFileName = outputBaseName + ".glb.json";
            base_1.Paths.ensureDirectoryExists(outputDirectoryName);
            writeJsonFileOptional(glbJsonString, glbJsonFileName);
        }
    }
    static createGzipPipelineJson(input, output, tilesOnly) {
        let includedContentTypes = undefined;
        const excludedContentTypes = undefined;
        if (tilesOnly === true) {
            includedContentTypes = [
                base_5.ContentDataTypes.CONTENT_TYPE_B3DM,
                base_5.ContentDataTypes.CONTENT_TYPE_I3DM,
                base_5.ContentDataTypes.CONTENT_TYPE_PNTS,
                base_5.ContentDataTypes.CONTENT_TYPE_CMPT,
                base_5.ContentDataTypes.CONTENT_TYPE_VCTR,
                base_5.ContentDataTypes.CONTENT_TYPE_GEOM,
                base_5.ContentDataTypes.CONTENT_TYPE_GLB,
                base_5.ContentDataTypes.CONTENT_TYPE_GLTF,
            ];
        }
        const tilesetStageJson = {
            name: "gzip",
            includedContentTypes: includedContentTypes,
            excludedContentTypes: excludedContentTypes,
        };
        const pipelineJson = {
            input: input,
            output: output,
            tilesetStages: [tilesetStageJson],
        };
        return pipelineJson;
    }
    static async gzip(input, output, force, tilesOnly) {
        ToolsMain.ensureCanWrite(output, force);
        const pipelineJson = ToolsMain.createGzipPipelineJson(input, output, tilesOnly);
        const pipeline = tools_4.Pipelines.createPipeline(pipelineJson);
        await tools_3.PipelineExecutor.executePipeline(pipeline, force);
    }
    static createUngzipPipelineJson(input, output) {
        const contentStageJson = {
            name: "ungzip",
        };
        const pipelineJson = {
            input: input,
            output: output,
            tilesetStages: [
                {
                    name: "ungzip",
                    contentStages: [contentStageJson],
                },
            ],
        };
        return pipelineJson;
    }
    static async ungzip(input, output, force) {
        ToolsMain.ensureCanWrite(output, force);
        const pipelineJson = ToolsMain.createUngzipPipelineJson(input, output);
        const pipeline = tools_4.Pipelines.createPipeline(pipelineJson);
        await tools_3.PipelineExecutor.executePipeline(pipeline, force);
    }
    static async convert(input, inputTilesetJsonFileName, output, force) {
        ToolsMain.ensureCanWrite(output, force);
        await tools_7.TilesetConverter.convert(input, inputTilesetJsonFileName, output, force);
    }
    static async combine(input, output, force) {
        ToolsMain.ensureCanWrite(output, force);
        await tools_5.TilesetOperations.combine(input, output, force);
    }
    static async upgrade(input, output, force, targetVersion, gltfUpgradeOptions) {
        logger.debug(`Executing upgrade`);
        logger.debug(`  input: ${input}`);
        logger.debug(`  output: ${output}`);
        logger.debug(`  force: ${force}`);
        logger.debug(`  targetVersion: ${targetVersion}`);
        logger.debug(`  gltfUpgradeOptions: ${JSON.stringify(gltfUpgradeOptions)}`);
        ToolsMain.ensureCanWrite(output, force);
        await tools_5.TilesetOperations.upgrade(input, output, force, targetVersion, gltfUpgradeOptions);
        logger.debug(`Executing upgrade DONE`);
    }
    static async merge(inputs, output, force) {
        logger.debug(`Executing merge`);
        logger.debug(`  inputs: ${inputs}`);
        logger.debug(`  output: ${output}`);
        logger.debug(`  force: ${force}`);
        ToolsMain.ensureCanWrite(output, force);
        await tools_5.TilesetOperations.merge(inputs, output, force);
        logger.debug(`Executing merge DONE`);
    }
    static async mergeJson(inputs, output, force) {
        logger.debug(`Executing mergeJson`);
        logger.debug(`  inputs: ${inputs}`);
        logger.debug(`  output: ${output}`);
        logger.debug(`  force: ${force}`);
        ToolsMain.ensureCanWrite(output, force);
        await tools_5.TilesetOperations.mergeJson(inputs, output, force);
        logger.debug(`Executing merge DONE`);
    }
    static async pipeline(input, force) {
        logger.debug(`Executing pipeline`);
        logger.debug(`  input: ${input}`);
        logger.debug(`  force: ${force}`);
        const pipelineJsonBuffer = fs_1.default.readFileSync(input);
        const pipelineJson = JSON.parse(pipelineJsonBuffer.toString());
        const pipeline = tools_4.Pipelines.createPipeline(pipelineJson);
        await tools_3.PipelineExecutor.executePipeline(pipeline, force);
        logger.debug(`Executing pipeline DONE`);
    }
    static async createTilesetJson(inputName, output, cartographicPositionDegrees, rotationDegrees, force) {
        logger.debug(`Executing createTilesetJson`);
        logger.debug(`  inputName: ${inputName}`);
        logger.debug(`  output: ${output}`);
        logger.debug(`  force: ${force}`);
        ToolsMain.ensureCanWrite(output, force);
        let baseDir = inputName;
        let contentUris = [];
        if (!base_1.Paths.isDirectory(inputName)) {
            baseDir = path_1.default.dirname(inputName);
            const contentUri = path_1.default.basename(inputName);
            contentUris = [contentUri];
        }
        else {
            const recurse = true;
            const allFiles = base_4.Iterables.overFiles(inputName, recurse);
            contentUris = [...allFiles].map((fileName) => base_1.Paths.relativize(inputName, fileName));
        }
        logger.info(`Creating tileset JSON with content URIs: ${contentUris}`);
        const tileset = await tools_8.TilesetJsonCreator.createTilesetFromContents(baseDir, contentUris);
        if (cartographicPositionDegrees !== undefined &&
            rotationDegrees !== undefined) {
            logger.info(`Creating tileset at cartographic position: ` +
                `${cartographicPositionDegrees} (in degrees) and rotation: ` +
                `${rotationDegrees} (in degrees)`);
            const transform = tools_8.TilesetJsonCreator.computeTransformFromCartographicPositionAndRotationDegrees(cartographicPositionDegrees, rotationDegrees);
            tileset.root.transform = transform;
        }
        else if (cartographicPositionDegrees !== undefined) {
            logger.info(`Creating tileset at cartographic position: ` +
                `${cartographicPositionDegrees} (in degrees)`);
            const transform = tools_8.TilesetJsonCreator.computeTransformFromCartographicPositionDegrees(cartographicPositionDegrees);
            tileset.root.transform = transform;
        }
        const tilesetJsonString = JSON.stringify(tileset, null, 2);
        const outputDirectory = path_1.default.dirname(output);
        base_1.Paths.ensureDirectoryExists(outputDirectory);
        fs_1.default.writeFileSync(output, Buffer.from(tilesetJsonString));
        logger.debug(`Executing createTilesetJson DONE`);
    }
    /**
     * Creates a function that can resolve URIs relative to
     * the given input file.
     *
     * The function will resolve relative URIs against the
     * base directory of the given input file name, and
     * return the corresponding file data. If the data
     * cannot be read, then the function will print an
     * error message and return  `undefined`.
     *
     * @param input - The input file name
     * @returns The resolver function
     */
    static createResolver(input) {
        const baseDir = path_1.default.dirname(input);
        const resolver = async (uri) => {
            const externalGlbUri = path_1.default.resolve(baseDir, uri);
            try {
                return fs_1.default.readFileSync(externalGlbUri);
            }
            catch (error) {
                logger.error(`Could not resolve ${uri} against ${baseDir}`);
            }
        };
        return resolver;
    }
    /**
     * Returns whether the specified file can be written.
     *
     * This is the case when `force` is `true`, or when it does not
     * exist yet.
     *
     * @param fileName - The file name
     * @param force The 'force' flag state from the command line
     * @returns Whether the file can be written
     */
    static canWrite(fileName, force) {
        if (force) {
            return true;
        }
        if (!fs_1.default.existsSync(fileName)) {
            return true;
        }
        return false;
    }
    /**
     * Ensures that the specified file can be written, and throws
     * a `DeveloperError` otherwise.
     *
     * @param fileName - The file name
     * @param force The 'force' flag state from the command line
     * @returns Whether the file can be written
     * @throws DeveloperError When the file exists and `force` was `false`.
     */
    static ensureCanWrite(fileName, force) {
        if (ToolsMain.canWrite(fileName, force)) {
            return true;
        }
        throw new base_2.DeveloperError(`File ${fileName} already exists. Specify -f or --force to overwrite existing files.`);
    }
}
exports.ToolsMain = ToolsMain;
//# sourceMappingURL=ToolsMain.js.map