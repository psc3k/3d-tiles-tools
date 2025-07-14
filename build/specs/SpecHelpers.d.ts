/// <reference types="node" />
/// <reference types="node" />
import { Tile } from "../src/structure";
import { Tileset } from "../src/structure";
import { TilesetSource } from "../src/tilesets";
/**
 * Utility methods for the specs
 */
export declare class SpecHelpers {
    /**
     * Returns the directory that was defined as the
     * `SPECS_DATA_BASE_DIRECTORY` environment variable
     * in the jasmine helpers (or `./specs/data` by
     * default)
     *
     * @returns The specs data base directory
     */
    static getSpecsDataBaseDirectory(): string;
    /**
     * Reads a JSON file, parses it, and returns the result.
     * If the file cannot be read or parsed, then an error
     * message will be printed and `undefined` is returned.
     *
     * @param filePath - The path to the file
     * @returns The result or `undefined`
     */
    static readJsonUnchecked(filePath: string): any;
    /**
     * Returns whether two numbers are equal, up to a certain epsilon
     *
     * @param left - The first value
     * @param right - The second value
     * @param relativeEpsilon - The maximum inclusive delta for the relative tolerance test.
     * @param absoluteEpsilon - The maximum inclusive delta for the absolute tolerance test.
     * @returns Whether the values are equal within the epsilon
     */
    static equalsEpsilon(left: number, right: number, relativeEpsilon: number, absoluteEpsilon?: number): boolean;
    /**
     * A function for checking values for equality, taking into account the
     * possibility that the values are (potentially multi- dimensional)
     * arrays, and recursively comparing the elements in this case.
     * If the eventual elements are numbers, they are compared for
     * equality up to the given relative epsilon.
     *
     * This is ONLY used in the specs, to compare metadata values.
     *
     * @param a - The first element
     * @param b - The second element
     * @param epsilon - A relative epsilon
     * @returns Whether the objects are equal
     */
    static genericEquals(a: any, b: any, epsilon: number): boolean;
    /**
     * Returns the given byte length, padded if necessary to
     * be a multiple of 8
     *
     * @param byteLength - The byte length
     * @returns The padded byte length
     */
    static getPaddedByteLength(byteLength: number): number;
    /**
     * Forcefully deletes the given directory and all its contents
     * and subdirectories. Be careful.
     *
     * @param directory - The directory to delete
     */
    static forceDeleteDirectory(directory: string): void;
    /**
     * Returns an array that contains the names of all files in
     * the given directory and its subdirectories, relative to
     * the given directory (with `/` as the path separator),
     * in unspecified order.
     *
     * @param directory - The directory
     * @returns The relative file names
     */
    static collectRelativeFileNames(directory: string): string[];
    /**
     * Collect all content URIs that appear in the given tile or
     * any of its descendants, in unspecified order.
     *
     * @param startTile - The start tile
     * @returns A promise to all content URIs
     */
    static collectExplicitContentUris(startTile: Tile): Promise<string[]>;
    /**
     * Collect all content URIs that appear in the explicit tiles
     * of the specified tileset, in unspecified order
     *
     * @param tilesetFileName - The tileset file name
     * @returns A promise to all content URIs
     */
    static collectExplicitContentUrisFromFile(tilesetFileName: string): Promise<string[]>;
    /**
     * Collect all content URIs (excluding possible template URIs in
     * implicit tiling roots) that appear in the given tileset, in
     * unspecified order.
     *
     * @param tileset - The tileset
     * @param tilesetSource - The tileset source
     * @returns A promise to all content URIs
     */
    static collectContentUris(tileset: Tileset, tilesetSource: TilesetSource): Promise<string[]>;
    /**
     * Parse the tileset from the 'tileset.json' in the given source
     *
     * @param tilesetSource - The tileset source
     * @returns The tileset
     * @throws DeveloperError if the tileset could not be read
     */
    static parseTileset(tilesetSource: TilesetSource): Promise<Tileset>;
    /**
     * Returns whether the specified packages are equal.
     *
     * This means that they contain the same keys, and the
     * keys are mapped to the same values.
     *
     * @param nameA - The first package name
     * @param nameB - The second package name
     * @returns A string describing the difference, or `undefined`
     * if there is no difference.
     */
    static computePackageDifference(nameA: string, nameB: string): Promise<string | undefined>;
    /**
     * Returns whether the specified packages are equal.
     *
     * This means that they contain the same keys, and the
     * keys are mapped to the same values.
     *
     * Entries that end in `.json` will be parsed and strigified
     * for the comparison (to handle formatting differences),
     * whereas other entries will be treated as "binary", and
     * their values will be compared byte-wise.
     *
     * @param nameA - The first package name
     * @param tilesetSourceA - The first package
     * @param nameB - The second package name
     * @param tilesetSourceB - The second package
     * @returns A string describing the difference, or `undefined`
     * if there is no difference.
     */
    static computePackageDifferenceInternal(nameA: string, tilesetSourceA: TilesetSource, nameB: string, tilesetSourceB: TilesetSource): Promise<string | undefined>;
    /**
     * Computes the difference between two entries (with the same
     * key) in different packages.
     *
     * This usually compares the contents of the value buffers.
     * But for the case that the buffers contain (possibly zipped)
     * JSON data, it will check whether the JSON in both buffers
     * has the same structure, by parsing the JSON object and
     * serializing it again in the same way.
     *
     * @param key - The key
     * @param nameA - The name of the first package
     * @param valueA - The value for the key in the first package
     * @param nameB - The name of the second package
     * @param valueB - The value for the key in the second package
     * @returns A string describing the difference, or `undefined`
     * if there is no difference.
     */
    private static computeEntryDifference;
    /**
     * Create a JSON string from the given buffer, by parsing the
     * contents of the given buffer and serializing the parsed
     * result again.
     *
     * If the object cannot be parsed, then `undefined` is
     * returned.
     *
     * This is intended as a "normalization", to ignore details
     * like different indentations or line endings.
     *
     * @param buffer - The buffer
     * @returns The parsed and serialized object
     */
    static createJsonString(buffer: Buffer): string | undefined;
    /**
     * Compares two arrays of numbers lexicographically.
     *
     * When the arrays have different lengths, then the shorter
     * one will be "padded" with elements that are smaller than
     * all other elements in the other array.
     *
     * @param a - The first array
     * @param b - The second array
     * @returns The result of the comparison
     */
    private static compareNumbersLexicographically;
    /**
     * Sorts a 2D array of numbers lexicographically, in place.
     *
     * When two elements have different lengths, then the shorter
     * one will be "padded" with elements that are smaller than
     * all other elements in the other array.
     *
     * @param array - The array
     * @returns The array
     */
    static sortNumbersLexicographically(array: number[][]): number[][];
    /**
     * Compares two arrays of strings lexicographically.
     *
     * When the arrays have different lengths, then the shorter
     * one will be "padded" with elements that are smaller than
     * all other elements in the other array.
     *
     * @param a - The first array
     * @param b - The second array
     * @returns The result of the comparison
     */
    private static compareStringsLexicographically;
    /**
     * Sorts a 2D array of strings lexicographically, in place.
     *
     * When two elements have different lengths, then the shorter
     * one will be "padded" with elements that are smaller than
     * all other elements in the other array.
     *
     * @param array - The array
     * @returns The array
     */
    static sortStringsLexicographically(array: string[][]): string[][];
}
//# sourceMappingURL=SpecHelpers.d.ts.map