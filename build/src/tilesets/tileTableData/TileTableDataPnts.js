"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileTableDataPnts = void 0;
const base_1 = require("../../base");
const TileTableData_1 = require("./TileTableData");
const AttributeCompression_1 = require("./AttributeCompression");
const Colors_1 = require("./Colors");
const TileFormatError_1 = require("../tileFormats/TileFormatError");
/**
 * Methods to access the data that is stored in the feature table
 * of PNTS.
 *
 * @internal
 */
class TileTableDataPnts {
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
    static createNormals(featureTable, binary, numElements) {
        if (featureTable.NORMAL) {
            const byteOffset = featureTable.NORMAL.byteOffset;
            return TileTableDataPnts.createNormalsFromBinary(binary, byteOffset, numElements);
        }
        if (featureTable.NORMAL_OCT16P) {
            const byteOffset = featureTable.NORMAL_OCT16P.byteOffset;
            const octEncodedNormals = TileTableDataPnts.createByteOctEncodedNormalsFromBinary(binary, byteOffset, numElements);
            const normals = base_1.Iterables.map(octEncodedNormals, AttributeCompression_1.AttributeCompression.octDecode8);
            return normals;
        }
        return undefined;
    }
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
    static createNormalizedLinearColors(featureTable, binary, numElements) {
        // According to the specification, the precedence for considering the
        // color information is RGBA, RGB, RGB565 (and later: CONSTANT_RGBA)
        if (featureTable.RGBA) {
            const byteOffset = featureTable.RGBA.byteOffset;
            const colorsStandardRGBA = TileTableDataPnts.createColorsStandardRGBAFromBinary(binary, byteOffset, numElements);
            const colorsNormalizedLinearRGBA = base_1.Iterables.map(colorsStandardRGBA, Colors_1.Colors.standardRGBAToNormalizedLinearRGBA);
            return colorsNormalizedLinearRGBA;
        }
        if (featureTable.RGB) {
            const byteOffset = featureTable.RGB.byteOffset;
            const colorsStandardRGB = TileTableDataPnts.createColorsStandardRGBFromBinary(binary, byteOffset, numElements);
            const colorsNormalizedLinearRGBA = base_1.Iterables.map(colorsStandardRGB, Colors_1.Colors.standardRGBToNormalizedLinearRGBA);
            return colorsNormalizedLinearRGBA;
        }
        if (featureTable.RGB565) {
            const byteOffset = featureTable.RGB565.byteOffset;
            const colorsStandardRGB565 = TileTableDataPnts.createColorsStandardRGB656FromBinary(binary, byteOffset, numElements);
            const colorsNormalizedLinearRGBA = base_1.Iterables.map(colorsStandardRGB565, Colors_1.Colors.standardRGB565ToNormalizedLinearRGBA);
            return colorsNormalizedLinearRGBA;
        }
        return undefined;
    }
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
    static createGlobalNormalizedLinearColor(featureTable, binary) {
        if (!featureTable.CONSTANT_RGBA) {
            return undefined;
        }
        const constantRGBA = TileTableData_1.TileTableData.obtainNumberArray(binary, featureTable.CONSTANT_RGBA, 4, "UNSIGNED_BYTE");
        const normalizedLinearRGBA = Colors_1.Colors.standardRGBAToNormalizedLinearRGBA(constantRGBA);
        return [
            normalizedLinearRGBA[0],
            normalizedLinearRGBA[1],
            normalizedLinearRGBA[2],
            normalizedLinearRGBA[3],
        ];
    }
    /**
     * Create the normal data from the given data
     *
     * @param binary - The feature table binary
     * @param byteOffset - The byte offset
     * @param numElements - The number of elements
     * @returns The the iterable over the data
     */
    static createNormalsFromBinary(binary, byteOffset, numElements) {
        const legacyType = "VEC3";
        const legacyComponentType = "FLOAT";
        return TileTableData_1.TileTableData.createNumericArrayIterable(legacyType, legacyComponentType, binary, byteOffset, numElements);
    }
    /**
     * Create the oct-encoded normal data from the given data
     *
     * @param binary - The feature table binary
     * @param byteOffset - The byte offset
     * @param numElements - The number of elements
     * @returns The the iterable over the data
     */
    static createByteOctEncodedNormalsFromBinary(binary, byteOffset, numElements) {
        const legacyType = "VEC2";
        const legacyComponentType = "UNSIGNED_BYTE";
        return TileTableData_1.TileTableData.createNumericArrayIterable(legacyType, legacyComponentType, binary, byteOffset, numElements);
    }
    /**
     * Create the RGB color data from the given data
     *
     * @param binary - The feature table binary
     * @param byteOffset - The byte offset
     * @param numElements - The number of elements
     * @returns The the iterable over the data
     */
    static createColorsStandardRGBFromBinary(binary, byteOffset, numElements) {
        const legacyType = "VEC3";
        const legacyComponentType = "UNSIGNED_BYTE";
        return TileTableData_1.TileTableData.createNumericArrayIterable(legacyType, legacyComponentType, binary, byteOffset, numElements);
    }
    /**
     * Create the RGBA color data from the given data
     *
     * @param binary - The feature table binary
     * @param byteOffset - The byte offset
     * @param numElements - The number of elements
     * @returns The the iterable over the data
     */
    static createColorsStandardRGBAFromBinary(binary, byteOffset, numElements) {
        const legacyType = "VEC4";
        const legacyComponentType = "UNSIGNED_BYTE";
        return TileTableData_1.TileTableData.createNumericArrayIterable(legacyType, legacyComponentType, binary, byteOffset, numElements);
    }
    /**
     * Create the RGB565 color data from the given data
     *
     * @param binary - The feature table binary
     * @param byteOffset - The byte offset
     * @param numElements - The number of elements
     * @returns The the iterable over the data
     */
    static createColorsStandardRGB656FromBinary(binary, byteOffset, numElements) {
        const legacyType = "SCALAR";
        const legacyComponentType = "UNSIGNED_SHORT";
        return TileTableData_1.TileTableData.createNumericScalarIterable(legacyType, legacyComponentType, binary, byteOffset, numElements);
    }
    /**
     * Create the BATCH_ID data from the given feature table data,
     * or undefined if there is no BATCH_ID information.
     *
     * @param featureTable - The PNTS feature table
     * @param binary - The feature table binary
     * @returns The batch IDs
     */
    static createBatchIds(featureTable, binary) {
        const batchId = featureTable.BATCH_ID;
        if (!batchId) {
            return undefined;
        }
        const batchLength = featureTable.BATCH_LENGTH;
        if (batchLength === undefined) {
            throw new TileFormatError_1.TileFormatError("Found BATCH_ID but no BATCH_LENGTH");
        }
        const numPoints = featureTable.POINTS_LENGTH;
        const legacyComponentType = batchId.componentType ?? "UNSIGNED_SHORT";
        const batchIds = TileTableData_1.TileTableData.createBatchIdsFromBinary(binary, batchId.byteOffset, legacyComponentType, numPoints);
        return batchIds;
    }
}
exports.TileTableDataPnts = TileTableDataPnts;
//# sourceMappingURL=TileTableDataPnts.js.map