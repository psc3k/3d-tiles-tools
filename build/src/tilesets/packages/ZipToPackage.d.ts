/**
 * Methods for converting ZIP files into 3D Tiles packages.
 *
 * @internal
 */
export declare class ZipToPackage {
    /**
     * Writes the data from the given input file (which is assumed to be a plain
     * ZIP file) into a tileset target.
     *
     * The type of the output depends on the extension of the output file name:
     * If it is `.3tz`, then the output will be a 3TZ archive
     * If it is `.3dtiles`, then the output will be a 3DTILES package
     * If it is empty, then the output will be a directory
     *
     * @param inputFileName - The full input file name
     * @param inputTilesetJsonFileName - The name of the tileset JSON file that
     * is expected to be present in the ZIP. This will usually be
     * 'tileset.json', but can be overridden to use another JSON file as
     * the main tileset JSON file.
     * @param outputFileName - The full output file name
     * @param overwrite - Whether the output file should be overwritten
     * if it already exists
     * @throws TilesetError If the input did not contain the tileset JSON
     * file that was expected for the input or the output.
     */
    static convert(inputFileName: string, inputTilesetJsonFileName: string, outputFileName: string, overwrite: boolean): Promise<void>;
}
//# sourceMappingURL=ZipToPackage.d.ts.map