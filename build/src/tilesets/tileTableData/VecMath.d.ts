/**
 * Vector math utility functions.
 *
 * The main purpose of this class is to offer the Cesium vector math
 * functionality (for matrices and quaternions) in a form that operates
 * on plain number arrays, which are the common denominator between
 * Cesium (with its own classes like 'Matrix4') and glTF-Transform
 * (which uses internal/hidden type definitions like 'mat4')
 *
 * @internal
 */
export declare class VecMath {
    private static readonly upScratch;
    private static readonly rightScratch;
    private static readonly forwardScratch;
    private static readonly positionScratch0;
    private static readonly matrix3Scratch;
    private static readonly matrix4Scratch0;
    private static readonly matrix4Scratch1;
    private static readonly quaternionScratch;
    private static readonly cartesian3Scratch0;
    private static readonly cartesian3Scratch1;
    /**
     * Create a 4x4 Y-up-to-Z-up conversion matrix as a flat array
     *
     * @returns The matrix
     */
    static createYupToZupPacked4(): [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ];
    /**
     * Create a 4x4 Z-up-to-Y-up conversion matrix as a flat array
     *
     * @returns The matrix
     */
    static createZupToYupPacked4(): [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ];
    /**
     * Create a 4x4 X-up-to-Y-up conversion matrix as a flat array
     *
     * @returns The matrix
     */
    static createXupToYupPacked4(): [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ];
    /**
     * Compute the rotation quaternions that are implied by the
     * given up- and right-vectors.
     *
     * The vectors are given as 3-element arrays. The resulting
     * quaternions will be 4-element arrays.
     *
     * @param upVectors - The up-vectors
     * @param rightVectors - The right-vectors
     * @returns The rotation quaternions
     */
    static computeRotationQuaternions(upVectors: number[][], rightVectors: number[][]): number[][];
    /**
     * Compute the rotation quaternion that is implied by the
     * given up- and right-vector.
     *
     * The vectors are given as 3-element arrays. The resulting
     * quaternion will be a 4-element array.
     *
     * @param upPacked - The up-vector
     * @param rightPacked - The right-vector
     * @returns The quaternion
     */
    private static computeRotationQuaternion;
    /**
     * Compute the product of the given 4x4 matrices.
     *
     * Each input matrix and the result will be flat, 16 element arrays.
     *
     * @param matrices4Packed - The matrices
     * @returns The resulting matrix
     */
    static multiplyAll4(matrices4Packed: number[][]): number[];
    /**
     * Perform a component-wise addition of the given arrays, store
     * it in the given result array, and return the result.
     *
     * If no result array is given, then a new array will be
     * returned.
     *
     * @param a - The first array
     * @param b - The second array
     * @param result - The result array
     * @returns The result
     * @throws DeveloperError if the arrays have different lengths
     */
    static add(a: number[], b: number[], result?: number[]): number[];
    /**
     * Perform a component-wise subtraction of the given arrays, store
     * it in the given result array, and return the result.
     *
     * If no result array is given, then a new array will be
     * returned.
     *
     * @param a - The first array
     * @param b - The second array
     * @param result - The result array
     * @returns The result
     * @throws DeveloperError if the arrays have different lengths
     */
    static subtract(a: number[], b: number[], result?: number[]): number[];
    /**
     * Perform a component-wise multiplication of the given array,
     * with the given factor, store it in the given result array,
     * and return the result.
     *
     * If no result array is given, then a new array will be
     * returned.
     *
     * @param a - The array
     * @param factor - The factor
     * @param result - The result array
     * @returns The result
     * @throws DeveloperError if the arrays have different lengths
     */
    private static scale;
    /**
     * Computes the East-North-Up matrix for the given position.
     *
     * See `Cesium.Transforms.eastNorthUpToFixedFrame` for details.
     *
     * @param positionPacked - The position as a 3-element array
     * @returns The resulting matrix
     */
    static computeEastNorthUpMatrix4(positionPacked: number[]): number[];
    /**
     * Creates a quaternion from the rotation component of the given
     * 4x4 matrix.
     *
     * The matrix is a flat 16-element array, and the quaternion
     * is a 4-element array.
     *
     * @param matrix4Packed - The matrix
     * @returns The quaternion.
     */
    static matrix4ToQuaternion(matrix4Packed: number[]): number[];
    /**
     * Compose a matrix from the given translation, rotation quaternion,
     * and scaling factors.
     *
     * @param translation3D - The translation
     * @param rotationQuaternion - The rotation quaternion
     * @param scale3D - The scaling factors
     * @returns The matrix
     */
    static composeMatrixTRS(translation3D: number[], rotationQuaternion?: number[], scale3D?: number[]): number[];
    /**
     * Decompose a 4x4 matrix into translation, rotation quaternion,
     * and scaling factors.
     *
     * @param matrix4Packed - The matrix as a 16-element array
     * @returns An object containing the translation `t` as
     * a 3-element array, the rotation `r` as a quaternion in
     * a 4-element array, and the scaling factors `s` as a
     * 3-element array.
     */
    static decomposeMatrixTRS(matrix4Packed: number[]): {
        t: number[];
        r: number[];
        s: number[];
    };
    /**
     * Compute the mean of the given 3D points
     *
     * @param points - The input points
     * @returns The mean
     */
    static computeMean3D(points: Iterable<number[]>): number[];
}
//# sourceMappingURL=VecMath.d.ts.map