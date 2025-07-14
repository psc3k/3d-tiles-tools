"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileTableDataI3dm = void 0;
const base_1 = require("../../base");
const TileTableData_1 = require("./TileTableData");
const VecMath_1 = require("./VecMath");
const AttributeCompression_1 = require("./AttributeCompression");
/**
 * Methods to access the data that is stored in the feature table
 * of I3DM.
 *
 * @internal
 */
class TileTableDataI3dm {
    /**
     * Create the matrices that describe the instancing transforms of
     * the given I3DM data.
     *
     * This will compute the matrices that combine the translation
     * (position), rotation, and scaling information that is obtained
     * from the given I3DM feature table data.
     *
     * @param featureTable - The feature table
     * @param featureTableBinary - The feature table binary
     * @param numInstances - The number of instances
     * @returns The matrices as an iterable over 16-element arrays
     */
    static createInstanceMatrices(featureTable, featureTableBinary, numInstances) {
        const translations = TileTableDataI3dm.createWorldPositions(featureTable, featureTableBinary, numInstances);
        const rotationQuaternions = TileTableDataI3dm.createRotationQuaternions(featureTable, featureTableBinary, numInstances);
        const scales3D = TileTableDataI3dm.createScales3D(featureTable, featureTableBinary, numInstances);
        const i3dmMatrices = TileTableDataI3dm.createMatrices(translations, rotationQuaternions, scales3D, numInstances);
        return i3dmMatrices;
    }
    /**
     * Compute the matrices that describe the transforms of the instances
     * based on the given translations, rotation quaternions, and scaling factors.
     *
     * Usually, the inputs for this method can be created with the
     * `createWorldPositions`, `createRotationQuaternions`, and
     * `createScales3D` methods of this class.
     *
     * In some cases, the positions may be modified before being passed to
     * this method. For example, when converting I3DM into a glTF asset
     * that uses `EXT_mesh_gpu_instancing` then the positions may be
     * made _relative_ to a certain center point whose translation is
     * then taken into account by assigning it to the root node of
     * the resulting glTF asset.
     *
     * @param translations3D - The translations as 3-element arrays
     * @param rotationQuaternions - The rotations as 4-element arrays
     * @param scales3D - The scaling factors as 3-element arrays
     * @param numInstances - The number of elements
     * @returns The matrices
     */
    static createMatrices(translations3D, rotationQuaternions, scales3D, numInstances) {
        const translationsArray = [...translations3D];
        let rotationQuaternionsArray;
        if (rotationQuaternions) {
            rotationQuaternionsArray = [...rotationQuaternions];
        }
        let scalesArray;
        if (scales3D) {
            scalesArray = [...scales3D];
        }
        const i3dmMatrices = [];
        for (let i = 0; i < numInstances; i++) {
            const translation = translationsArray[i];
            const rotationQuaternion = rotationQuaternionsArray
                ? rotationQuaternionsArray[i]
                : undefined;
            const scale = scalesArray ? scalesArray[i] : undefined;
            const i3dmMatrix = VecMath_1.VecMath.composeMatrixTRS(translation, rotationQuaternion, scale);
            i3dmMatrices.push(i3dmMatrix);
        }
        return i3dmMatrices;
    }
    /**
     * Create the world positions from the given feature table data.
     *
     * This will be the positions, as they are stored in the feature
     * table either as `POSITIONS` or `POSITIONS_QUANTIZED`, and
     * will include the RTC center (if it was defined by the
     * feature table).
     *
     * @param featureTable - The feature table
     * @param featureTableBinary - The feature table binary
     * @param numInstances - The number of instances
     * @returns The positions as an iterable over 3-element arrays
     */
    static createWorldPositions(featureTable, featureTableBinary, numInstances) {
        const positionsLocal = TileTableData_1.TileTableData.createPositions(featureTable, featureTableBinary, numInstances);
        let positions = positionsLocal;
        const quantization = TileTableData_1.TileTableData.obtainQuantizationOffsetScale(featureTable, featureTableBinary);
        if (quantization) {
            positions = base_1.Iterables.map(positions, (p) => {
                return VecMath_1.VecMath.add(p, quantization.offset);
            });
        }
        if (featureTable.RTC_CENTER) {
            const rtcCenter = TileTableData_1.TileTableData.obtainRtcCenter(featureTable.RTC_CENTER, featureTableBinary);
            positions = base_1.Iterables.map(positions, (p) => {
                return VecMath_1.VecMath.add(p, rtcCenter);
            });
        }
        return positions;
    }
    /**
     * Create the rotation quaternions from the given feature table data.
     *
     * This will compute the rotation quaternions either from
     * - the NORMAL_UP/NORMAL_RIGHT information
     * - the NORMAL_UP_OCT32P/NORMAL_RIGHT_OCT32P information
     * - the east-north-up orientation that is computed from
     *   the position data in the I3DM, if EAST_NORTH_UP=true
     *   in the given feature table
     *
     * If none of this information is present, `undefined` will be
     * returned.
     *
     * @param featureTable - The feature table
     * @param featureTableBinary - The feature table binary
     * @param numInstances - The number of instances
     * @returns The rotation quaternions as an iterable over 4-element arrays
     */
    static createRotationQuaternions(featureTable, featureTableBinary, numInstances) {
        const normalsUp = TileTableDataI3dm.createNormalsUp(featureTable, featureTableBinary, numInstances);
        const normalsRight = TileTableDataI3dm.createNormalsRight(featureTable, featureTableBinary, numInstances);
        if (normalsUp && normalsRight) {
            // Compute the rotation quaternions from the up- and right normals
            const rotationQuaternions = VecMath_1.VecMath.computeRotationQuaternions([...normalsUp], [...normalsRight]);
            return rotationQuaternions;
        }
        if (featureTable.EAST_NORTH_UP === true) {
            // Obtain the rotation matrices from the world positions
            // and convert them into quaternions
            const positions = TileTableDataI3dm.createWorldPositions(featureTable, featureTableBinary, numInstances);
            const rotationQuaternions = base_1.Iterables.map(positions, (p) => {
                const enu = VecMath_1.VecMath.computeEastNorthUpMatrix4(p);
                return VecMath_1.VecMath.matrix4ToQuaternion(enu);
            });
            return rotationQuaternions;
        }
        return undefined;
    }
    /**
     * Create the up-normal data from the given feature table data.
     *
     * This will return the NORMAL_UP or NORMAL_UP_OCT32P data
     * as an iterable over 3D float arrays.
     *
     * @param featureTable - The I3DM feature table
     * @param binary - The feature table binary
     * @param numElements - The number of elements
     * @returns The the iterable over the data
     */
    static createNormalsUp(featureTable, binary, numElements) {
        if (featureTable.NORMAL_UP) {
            const byteOffset = featureTable.NORMAL_UP.byteOffset;
            return TileTableDataI3dm.createNormalsFromBinary(binary, byteOffset, numElements);
        }
        if (featureTable.NORMAL_UP_OCT32P) {
            const byteOffset = featureTable.NORMAL_UP_OCT32P.byteOffset;
            const octEncodedNormals = TileTableDataI3dm.createShortOctEncodedNormalsFromBinary(binary, byteOffset, numElements);
            const normals = base_1.Iterables.map(octEncodedNormals, AttributeCompression_1.AttributeCompression.octDecode16);
            return normals;
        }
        return undefined;
    }
    /**
     * Create the right-normal data from the given feature table data.
     *
     * This will return the NORMAL_RIGHT or NORMAL_RIGHT_OCT32P data
     * as an iterable over 3D float arrays.
     *
     * @param featureTable - The I3DM feature table
     * @param binary - The feature table binary
     * @param numElements - The number of elements
     * @returns The the iterable over the data
     */
    static createNormalsRight(featureTable, binary, numElements) {
        if (featureTable.NORMAL_RIGHT) {
            const byteOffset = featureTable.NORMAL_RIGHT.byteOffset;
            return TileTableDataI3dm.createNormalsFromBinary(binary, byteOffset, numElements);
        }
        if (featureTable.NORMAL_RIGHT_OCT32P) {
            const byteOffset = featureTable.NORMAL_RIGHT_OCT32P.byteOffset;
            const octEncodedNormals = TileTableDataI3dm.createShortOctEncodedNormalsFromBinary(binary, byteOffset, numElements);
            const normals = base_1.Iterables.map(octEncodedNormals, AttributeCompression_1.AttributeCompression.octDecode16);
            return normals;
        }
        return undefined;
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
    static createShortOctEncodedNormalsFromBinary(binary, byteOffset, numElements) {
        const legacyType = "VEC2";
        const legacyComponentType = "UNSIGNED_SHORT";
        return TileTableData_1.TileTableData.createNumericArrayIterable(legacyType, legacyComponentType, binary, byteOffset, numElements);
    }
    /**
     * Create the (possibly non-uniform) scaling data from the given
     * feature table data, as 3-element arrays.
     *
     * This will either return the SCALE values (repeated 3 times),
     * or the SCALE_NON_UNIFORM values, or `undefined` if none
     * of this information is present.
     *
     * @param featureTable - The I3DM feature table
     * @param binary - The feature table binary
     * @param numElements - The number of elements
     * @returns The the iterable over the data
     */
    static createScales3D(featureTable, featureTableBinary, numInstances) {
        const scales = TileTableDataI3dm.createScale(featureTable, featureTableBinary, numInstances);
        if (scales) {
            const scales3D = base_1.Iterables.map(scales, (s) => [s, s, s]);
            return scales3D;
        }
        const scalesNonUniform = TileTableDataI3dm.createNonUniformScale(featureTable, featureTableBinary, numInstances);
        return scalesNonUniform;
    }
    /**
     * Create the uniform scaling data from the given feature
     * table data.
     *
     * This will return the SCALE data as an iterable over
     * numbers
     *
     * @param featureTable - The I3DM feature table
     * @param binary - The feature table binary
     * @param numElements - The number of elements
     * @returns The the iterable over the data
     */
    static createScale(featureTable, binary, numElements) {
        if (featureTable.SCALE) {
            const legacyType = "SCALAR";
            const legacyComponentType = "FLOAT";
            const byteOffset = featureTable.SCALE.byteOffset;
            return TileTableData_1.TileTableData.createNumericScalarIterable(legacyType, legacyComponentType, binary, byteOffset, numElements);
        }
        return undefined;
    }
    /**
     * Create the non-uniform scaling data from the given feature
     * table data.
     *
     * This will return the SCALE_NON_UNIFORM data as an
     * iterable over 3D float arrays.
     *
     * @param featureTable - The I3DM feature table
     * @param binary - The feature table binary
     * @param numElements - The number of elements
     * @returns The the iterable over the data
     */
    static createNonUniformScale(featureTable, binary, numElements) {
        if (featureTable.SCALE_NON_UNIFORM) {
            const byteOffset = featureTable.SCALE_NON_UNIFORM.byteOffset;
            const legacyType = "VEC3";
            const legacyComponentType = "FLOAT";
            return TileTableData_1.TileTableData.createNumericArrayIterable(legacyType, legacyComponentType, binary, byteOffset, numElements);
        }
        return undefined;
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
        const numPElements = featureTable.INSTANCES_LENGTH;
        const legacyComponentType = batchId.componentType ?? "UNSIGNED_SHORT";
        const batchIds = TileTableData_1.TileTableData.createBatchIdsFromBinary(binary, batchId.byteOffset, legacyComponentType, numPElements);
        return batchIds;
    }
}
exports.TileTableDataI3dm = TileTableDataI3dm;
//# sourceMappingURL=TileTableDataI3dm.js.map