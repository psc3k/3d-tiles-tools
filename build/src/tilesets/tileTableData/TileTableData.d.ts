/// <reference types="node" />
/// <reference types="node" />
import { PropertyModel } from "../../metadata";
import { BatchTableBinaryBodyReference } from "../../structure";
import { BinaryBodyOffset } from "../../structure";
import { I3dmFeatureTable } from "../../structure";
import { PntsFeatureTable } from "../../structure";
/**
 * Methods to access the data that is stored in batch- or feature tables
 * of the legacy tile formats in a generic form.
 *
 * @internal
 */
export declare class TileTableData {
    /**
     * Create the position data from the given feature table data.
     *
     * This will return the POSITION or POSITION_QUANTIZED data
     * as an iterable over 3D float arrays. The actual positions
     * of the returned will be relative to the position
     * that is returned by `obtainGlobalPosition`
     *
     * @param featureTable - The feature table
     * @param binary - The feature table binary
     * @param numPositions - The number of positions
     * @returns The the iterable over the data
     * @throws TileFormatError If the given feature table contains
     * neither a POSITION nor a POSITION_QUANTIZED
     */
    static createPositions(featureTable: PntsFeatureTable | I3dmFeatureTable, binary: Buffer, numPositions: number): Iterable<number[]>;
    /**
     * Create the position data from the given data
     *
     * @param binary - The feature table binary
     * @param byteOffset - The byte offset
     * @param numPositions - The number of positions
     * @returns The the iterable over the data
     */
    static createPositionsFromBinary(binary: Buffer, byteOffset: number, numPositions: number): Iterable<number[]>;
    /**
     * Create the quantized positions data from the given data
     *
     * @param binary - The feature table binary
     * @param byteOffset - The byte offset
     * @param numPositions - The number of positions
     * @returns The the iterable over the data
     */
    private static createQuantizedPositionsFromBinary;
    /**
     * Obtain the quantization information from the given PNTS-
     * or I3DM feature table.
     *
     * If the feature table does not contain QUANTIZED_VOLUME_OFFSET
     * or QUANTIZED_VOLUME_SCALE, then `undefined` is returned.
     * Otherwise, the offset and scale are returned.
     *
     * @param featureTable - The feature table
     * @param featureTableBinary - The feature table binary
     * @returns The quantization information
     */
    static obtainQuantizationOffsetScale(featureTable: PntsFeatureTable | I3dmFeatureTable, featureTableBinary: Buffer): {
        offset: number[];
        scale: number[];
    } | undefined;
    /**
     * Obtains the translation that is implied by the given `RTC_CENTER`
     * property of a feature table
     *
     * @param rtcCenter - The `RTC_CENTER` property
     * @param binary - The binary blob of the feature table
     * @returns The `RTC_CENTER` value
     */
    static obtainRtcCenter(rtcCenter: BinaryBodyOffset | number[], binary: Buffer): [number, number, number];
    /**
     * Returns the "global position" that is implied by the given feature table.
     *
     * This position will include the RTC_CENTER (if present) and the
     * quantization offset (if present), and will be `undefined` if
     * neither of them is present.
     *
     * @param featureTable - The feature table
     * @param featureTableBinary - The feature tabel binary
     * @returns The global position
     */
    static obtainGlobalPosition(featureTable: PntsFeatureTable | I3dmFeatureTable, featureTableBinary: Buffer): [number, number, number] | undefined;
    /**
     * Create the batch ID data from the given data
     *
     * @param binary - The feature table binary
     * @param byteOffset - The byte offset
     * @param legacyComponentType - The (legacy) component type
     * (e.g. "UNSIGNED_BYTE" - not "UINT8")
     * @param numPoints - The number of points
     * @returns The iterable over the result values
     */
    static createBatchIdsFromBinary(binary: Buffer, byteOffset: number, legacyComponentType: string, numPoints: number): Iterable<number>;
    /**
     * Obtains the data from a batch- or feature table property,
     * as an array of numbers.
     *
     * @param binary - The binary blob of the table
     * @param property - The property value. If this is a number
     * array, then it is returned directly. Otherwise, if it
     * is a binary body reference, then the corresponding
     * values from the buffer will be read and returned
     * as an array of numbers
     * @param length - The length (in number of elements) of
     * the property
     * @param componentType - The component type, e.g `FLOAT32` or `UINT16`
     * @returns The property values as an array of numbers
     */
    static obtainNumberArray(binary: Buffer, property: number[] | BinaryBodyOffset, length: number, componentType: string): number[];
    /**
     * Returns whether the given object is a `BinaryBodyOffset`
     *
     * @param p - The object
     * @returns Whether it is a `BinaryBodyOffset`
     */
    private static isBinaryBodyOffset;
    /**
     * Returns whether the given object is a `BatchTableBinaryBodyReference`
     *
     * @param p - The object
     * @returns Whether it is a `BatchTableBinaryBodyReference`
     */
    static isBatchTableBinaryBodyReference(p: any): p is BatchTableBinaryBodyReference;
    /**
     * Creates an iterable over the values that are stored in the
     * given batch- or feature table data, assuming that they are
     * numeric arrays
     *
     * @param legacyType - The legacy type, e.g. `VEC2`
     * @param legacyComponentType - The legacy component type,
     * e.g. `UNSIGNED_SHORT`
     * @param binary - The binary blob of the table
     * @param byteOffset - The offset inside the binary blob
     * where the values start
     * @param numElements - The number of elements
     * @returns The iterable
     */
    static createNumericArrayIterable(legacyType: string, legacyComponentType: string, binary: Buffer, byteOffset: number, numElements: number): Iterable<number[]>;
    /**
     * Creates an iterable over the values that are stored in the
     * given batch- or feature table data, assuming that they are
     * numeric scalars
     *
     * @param legacyType - The legacy type, e.g. `SCALAR`
     * @param legacyComponentType - The legacy component type,
     * e.g. `UNSIGNED_SHORT`
     * @param binary - The binary blob of the table
     * @param byteOffset - The offset inside the binary blob
     * where the values start
     * @param numElements - The number of elements
     * @returns The iterable
     */
    static createNumericScalarIterable(legacyType: string, legacyComponentType: string, binary: Buffer, byteOffset: number, numElements: number): Iterable<number>;
    /**
     * Createa a `PropertyModel` instance that is backed by
     * the numeric data of a batch- or feature table
     *
     * @param legacyType - The legacy type, e.g. `VEC2`
     * @param legacyComponentType - The legacy component type,
     * e.g. `UNSIGNED_SHORT`
     * @param binary - The binary blob of the table
     * @param byteOffset - The byte offset
     * @returns The property model
     */
    static createNumericPropertyModel(legacyType: string, legacyComponentType: string, binary: Buffer, byteOffset: number): PropertyModel;
    /**
     * Creates a function that receives a 3D point and returns a 3D
     * point, applying the dequantization of
     * ```
     * POSITION = POSITION_QUANTIZED * QUANTIZED_VOLUME_SCALE / 65535.0 + QUANTIZED_VOLUME_OFFSET
     * ```
     * as described in the specification.
     *
     * @param volumeOffset - The volume offset
     * @param volumeScale - The volume scale
     * @returns The dequantization function
     */
    private static createDequantization;
    /**
     * Obtain the component type of the BATCH_ID data (if present).
     * This will be a string like `"UINT8"` or `"FLOAT32"`.
     *
     * @param featureTable - The feature table
     * @returns The BATCH_ID component type
     */
    static obtainBatchIdComponentType(featureTable: PntsFeatureTable | I3dmFeatureTable): string | undefined;
    /**
     * Converts the given "legacy" type to a metadata type.
     *
     * Note that this is usually a no-op, but clearly separating
     * between the "legacy" type and the "new" type is important,
     * e.g. when the "new" types are represented as an `enum` in
     * the future.
     *
     * @param legacyType - The legacy type (e.g. `VEC2`)
     * @returns The type (e.g. `VEC2`)
     * @throws TileFormatError If the input type is invalid
     */
    static convertLegacyTypeToType(legacyType: string): "SCALAR" | "VEC2" | "VEC3" | "VEC4";
    /**
     * Converts the given "legacy" component type to a metadata component type.
     *
     * This will do the standard conversions, e.g. of
     * - `BYTE` to `INT8`
     * - `FLOAT` to `FLOAT32`
     * - `UNSIGNED_SHORT` to `UINT16`
     * - etc
     *
     * @param legacyType - The legacy component type
     * @returns The component type
     * @throws TileFormatError If the input type is invalid
     */
    static convertLegacyComponentTypeToComponentType(legacyComponentType: string): "INT8" | "UINT8" | "INT16" | "UINT16" | "INT32" | "UINT32" | "FLOAT32" | "FLOAT64";
}
//# sourceMappingURL=TileTableData.d.ts.map