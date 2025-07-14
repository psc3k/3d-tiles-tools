/// <reference types="node" />
/// <reference types="node" />
import { I3dmFeatureTable } from "../../structure";
/**
 * Methods to access the data that is stored in the feature table
 * of I3DM.
 *
 * @internal
 */
export declare class TileTableDataI3dm {
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
    static createInstanceMatrices(featureTable: I3dmFeatureTable, featureTableBinary: Buffer, numInstances: number): number[][];
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
    static createMatrices(translations3D: Iterable<number[]>, rotationQuaternions: Iterable<number[]> | undefined, scales3D: Iterable<number[]> | undefined, numInstances: number): number[][];
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
    static createWorldPositions(featureTable: I3dmFeatureTable, featureTableBinary: Buffer, numInstances: number): Iterable<number[]>;
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
    static createRotationQuaternions(featureTable: I3dmFeatureTable, featureTableBinary: Buffer, numInstances: number): Iterable<number[]> | undefined;
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
    static createNormalsUp(featureTable: I3dmFeatureTable, binary: Buffer, numElements: number): Iterable<number[]> | undefined;
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
    private static createNormalsRight;
    /**
     * Create the normal data from the given data
     *
     * @param binary - The feature table binary
     * @param byteOffset - The byte offset
     * @param numElements - The number of elements
     * @returns The the iterable over the data
     */
    private static createNormalsFromBinary;
    /**
     * Create the oct-encoded normal data from the given data
     *
     * @param binary - The feature table binary
     * @param byteOffset - The byte offset
     * @param numElements - The number of elements
     * @returns The the iterable over the data
     */
    private static createShortOctEncodedNormalsFromBinary;
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
    static createScales3D(featureTable: I3dmFeatureTable, featureTableBinary: Buffer, numInstances: number): Iterable<number[]> | undefined;
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
    private static createScale;
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
    private static createNonUniformScale;
    /**
     * Create the BATCH_ID data from the given feature table data,
     * or undefined if there is no BATCH_ID information.
     *
     * @param featureTable - The PNTS feature table
     * @param binary - The feature table binary
     * @returns The batch IDs
     */
    static createBatchIds(featureTable: I3dmFeatureTable, binary: Buffer): Iterable<number> | undefined;
}
//# sourceMappingURL=TileTableDataI3dm.d.ts.map