/// <reference types="node" />
/// <reference types="node" />
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
export declare class ToolsMain {
    static b3dmToGlb(input: string, output: string, force: boolean): Promise<void>;
    static convertB3dmToGlb(input: string, output: string, force: boolean): Promise<void>;
    static convertPntsToGlb(input: string, output: string, force: boolean): Promise<void>;
    static convertI3dmToGlb(input: string, output: string, force: boolean): Promise<void>;
    static i3dmToGlb(input: string, output: string, force: boolean): Promise<void>;
    static cmptToGlb(input: string, output: string, force: boolean): Promise<void>;
    static splitCmpt(input: string, output: string, recursive: boolean, force: boolean): Promise<void>;
    private static determineFileExtension;
    static glbToB3dm(input: string, output: string, force: boolean): Promise<void>;
    static glbToI3dm(input: string, output: string, force: boolean): Promise<void>;
    static optimizeB3dm(input: string, output: string, force: boolean, options: any): Promise<void>;
    static optimizeI3dm(input: string, output: string, force: boolean, options: any): Promise<void>;
    static updateAlignment(input: string, output: string, force: boolean): void;
    static analyze(inputFileName: string, outputDirectoryName: string, force: boolean): void;
    static analyzeInternal(inputBaseName: string, inputBuffer: Buffer, outputDirectoryName: string, force: boolean): void;
    private static createGzipPipelineJson;
    static gzip(input: string, output: string, force: boolean, tilesOnly: boolean): Promise<void>;
    private static createUngzipPipelineJson;
    static ungzip(input: string, output: string, force: boolean): Promise<void>;
    static convert(input: string, inputTilesetJsonFileName: string | undefined, output: string, force: boolean): Promise<void>;
    static combine(input: string, output: string, force: boolean): Promise<void>;
    static upgrade(input: string, output: string, force: boolean, targetVersion: string, gltfUpgradeOptions: any): Promise<void>;
    static merge(inputs: string[], output: string, force: boolean): Promise<void>;
    static mergeJson(inputs: string[], output: string, force: boolean): Promise<void>;
    static pipeline(input: string, force: boolean): Promise<void>;
    static createTilesetJson(inputName: string, output: string, cartographicPositionDegrees: number[] | undefined, rotationDegrees: number[] | undefined, force: boolean): Promise<void>;
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
    private static createResolver;
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
    static canWrite(fileName: string, force: boolean): boolean;
    /**
     * Ensures that the specified file can be written, and throws
     * a `DeveloperError` otherwise.
     *
     * @param fileName - The file name
     * @param force The 'force' flag state from the command line
     * @returns Whether the file can be written
     * @throws DeveloperError When the file exists and `force` was `false`.
     */
    static ensureCanWrite(fileName: string, force: boolean): true;
}
//# sourceMappingURL=ToolsMain.d.ts.map