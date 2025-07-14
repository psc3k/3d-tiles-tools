/// <reference types="node" />
/// <reference types="node" />
import { PntsFeatureTable } from "../../structure";
/**
 * Methods to access the data that is stored in the feature table
 * of PNTS.
 *
 * @internal
 */
export declare class TileTableDataPnts {
    /**
     * Create the normal data from the given feature table data.
     *
     * This will return the NORMAL or NORMAL_OCT16P data
     * as an iterable over 3D float arrays.
     *
     * @param featureTable - The PNTS feature table
     * @param binary - The feature table binary
     * @param numElements - The number of elements
     * @returns The the iterable over the data
     */
    static createNormals(featureTable: PntsFeatureTable, binary: Buffer, numElements: number): Iterable<number[]> | undefined;
    /**
     * Create the color data from the given feature table data.
     *
     * This will return the RGB or RGBA or RGB565 data
     * as an iterable over 4D float arrays, containing
     * the linear RGBA colors with components in [0.0, 1.0].
     *
     * @param featureTable - The PNTS feature table
     * @param binary - The feature table binary
     * @param numElements - The number of elements
     * @returns The the iterable over the data
     */
    static createNormalizedLinearColors(featureTable: PntsFeatureTable, binary: Buffer, numElements: number): Iterable<number[]> | undefined;
    /**
     * Obtain the global color data from the given feature table data.
     *
     * This will return the CONSTANT_RGBA value, as a 4D float array,
     * containing the linear RGBA color with components in [0.0, 1.0].
     *
     * @param featureTable - The PNTS feature table
     * @param binary - The feature table binary
     * @returns The global color
     */
    static createGlobalNormalizedLinearColor(featureTable: PntsFeatureTable, binary: Buffer): [number, number, number, number] | undefined;
    /**
     * Create the normal data from the given data
     *
     * @param binary - The feature table binary
     * @param byteOffset - The byte offset
     * @param numElements - The number of elements
     * @returns The the iterable over the data
     */
    static createNormalsFromBinary(binary: Buffer, byteOffset: number, numElements: number): Iterable<number[]>;
    /**
     * Create the oct-encoded normal data from the given data
     *
     * @param binary - The feature table binary
     * @param byteOffset - The byte offset
     * @param numElements - The number of elements
     * @returns The the iterable over the data
     */
    private static createByteOctEncodedNormalsFromBinary;
    /**
     * Create the RGB color data from the given data
     *
     * @param binary - The feature table binary
     * @param byteOffset - The byte offset
     * @param numElements - The number of elements
     * @returns The the iterable over the data
     */
    static createColorsStandardRGBFromBinary(binary: Buffer, byteOffset: number, numElements: number): Iterable<number[]>;
    /**
     * Create the RGBA color data from the given data
     *
     * @param binary - The feature table binary
     * @param byteOffset - The byte offset
     * @param numElements - The number of elements
     * @returns The the iterable over the data
     */
    static createColorsStandardRGBAFromBinary(binary: Buffer, byteOffset: number, numElements: number): Iterable<number[]>;
    /**
     * Create the RGB565 color data from the given data
     *
     * @param binary - The feature table binary
     * @param byteOffset - The byte offset
     * @param numElements - The number of elements
     * @returns The the iterable over the data
     */
    private static createColorsStandardRGB656FromBinary;
    /**
     * Create the BATCH_ID data from the given feature table data,
     * or undefined if there is no BATCH_ID information.
     *
     * @param featureTable - The PNTS feature table
     * @param binary - The feature table binary
     * @returns The batch IDs
     */
    static createBatchIds(featureTable: PntsFeatureTable, binary: Buffer): Iterable<number> | undefined;
}
//# sourceMappingURL=TileTableDataPnts.d.ts.map