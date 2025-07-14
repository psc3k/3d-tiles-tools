"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VecMath = void 0;
const cesium_1 = require("cesium");
const cesium_2 = require("cesium");
const cesium_3 = require("cesium");
const cesium_4 = require("cesium");
const cesium_5 = require("cesium");
const cesium_6 = require("cesium");
const base_1 = require("../../base");
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
class VecMath {
    /**
     * Create a 4x4 Y-up-to-Z-up conversion matrix as a flat array
     *
     * @returns The matrix
     */
    static createYupToZupPacked4() {
        return [1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1];
    }
    /**
     * Create a 4x4 Z-up-to-Y-up conversion matrix as a flat array
     *
     * @returns The matrix
     */
    static createZupToYupPacked4() {
        return [1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1];
    }
    /**
     * Create a 4x4 X-up-to-Y-up conversion matrix as a flat array
     *
     * @returns The matrix
     */
    static createXupToYupPacked4() {
        return [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }
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
    static computeRotationQuaternions(upVectors, rightVectors) {
        const n = upVectors.length;
        const quaternions = [];
        for (let i = 0; i < n; i++) {
            const up = upVectors[i];
            const right = rightVectors[i];
            const quaternion = VecMath.computeRotationQuaternion(up, right);
            quaternions.push(quaternion);
        }
        return quaternions;
    }
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
    static computeRotationQuaternion(upPacked, rightPacked) {
        const up = VecMath.upScratch;
        const right = VecMath.rightScratch;
        const forward = VecMath.forwardScratch;
        const matrix3 = VecMath.matrix3Scratch;
        const quaternion = VecMath.quaternionScratch;
        cesium_5.Cartesian3.unpack(upPacked, 0, up);
        cesium_5.Cartesian3.unpack(rightPacked, 0, right);
        cesium_5.Cartesian3.cross(right, up, forward);
        cesium_5.Cartesian3.normalize(forward, forward);
        cesium_3.Matrix3.setColumn(matrix3, 0, right, matrix3);
        cesium_3.Matrix3.setColumn(matrix3, 1, up, matrix3);
        cesium_3.Matrix3.setColumn(matrix3, 2, forward, matrix3);
        cesium_6.Quaternion.fromRotationMatrix(matrix3, quaternion);
        const result = cesium_6.Quaternion.pack(quaternion, Array(4));
        return result;
    }
    /**
     * Compute the product of the given 4x4 matrices.
     *
     * Each input matrix and the result will be flat, 16 element arrays.
     *
     * @param matrices4Packed - The matrices
     * @returns The resulting matrix
     */
    static multiplyAll4(matrices4Packed) {
        const matrix0 = VecMath.matrix4Scratch0;
        const matrix1 = VecMath.matrix4Scratch1;
        cesium_4.Matrix4.clone(cesium_4.Matrix4.IDENTITY, matrix0);
        for (let i = 0; i < matrices4Packed.length; i++) {
            const matrixPacked = matrices4Packed[i];
            cesium_4.Matrix4.unpack(matrixPacked, 0, matrix1);
            cesium_4.Matrix4.multiply(matrix0, matrix1, matrix0);
        }
        const result = cesium_4.Matrix4.pack(matrix0, Array(16));
        return result;
    }
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
    static add(a, b, result) {
        if (a.length !== b.length) {
            throw new base_1.DeveloperError("Arrays have different lengths");
        }
        if (result != undefined) {
            if (a.length !== result.length) {
                throw new base_1.DeveloperError("Arrays have different lengths");
            }
        }
        else {
            result = Array(a.length);
        }
        for (let i = 0; i < a.length; i++) {
            result[i] = a[i] + b[i];
        }
        return result;
    }
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
    static subtract(a, b, result) {
        if (a.length !== b.length) {
            throw new base_1.DeveloperError("Arrays have different lengths");
        }
        if (result != undefined) {
            if (a.length !== result.length) {
                throw new base_1.DeveloperError("Arrays have different lengths");
            }
        }
        else {
            result = Array(a.length);
        }
        for (let i = 0; i < a.length; i++) {
            result[i] = a[i] - b[i];
        }
        return result;
    }
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
    static scale(a, factor, result) {
        if (result != undefined) {
            if (a.length !== result.length) {
                throw new base_1.DeveloperError("Arrays have different lengths");
            }
        }
        else {
            result = Array(a.length);
        }
        for (let i = 0; i < a.length; i++) {
            result[i] = a[i] * factor;
        }
        return result;
    }
    /**
     * Computes the East-North-Up matrix for the given position.
     *
     * See `Cesium.Transforms.eastNorthUpToFixedFrame` for details.
     *
     * @param positionPacked - The position as a 3-element array
     * @returns The resulting matrix
     */
    static computeEastNorthUpMatrix4(positionPacked) {
        const position = VecMath.positionScratch0;
        const matrix4 = VecMath.matrix4Scratch0;
        cesium_5.Cartesian3.unpack(positionPacked, 0, position);
        cesium_1.Transforms.eastNorthUpToFixedFrame(position, cesium_2.Ellipsoid.WGS84, matrix4);
        const result = cesium_4.Matrix4.pack(matrix4, Array(16));
        return result;
    }
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
    static matrix4ToQuaternion(matrix4Packed) {
        const matrix3 = VecMath.matrix3Scratch;
        const matrix4 = VecMath.matrix4Scratch0;
        const quaternion = VecMath.quaternionScratch;
        cesium_4.Matrix4.unpack(matrix4Packed, 0, matrix4);
        cesium_4.Matrix4.getMatrix3(matrix4, matrix3);
        cesium_6.Quaternion.fromRotationMatrix(matrix3, quaternion);
        const result = cesium_6.Quaternion.pack(quaternion, new Array(4));
        return result;
    }
    /**
     * Compose a matrix from the given translation, rotation quaternion,
     * and scaling factors.
     *
     * @param translation3D - The translation
     * @param rotationQuaternion - The rotation quaternion
     * @param scale3D - The scaling factors
     * @returns The matrix
     */
    static composeMatrixTRS(translation3D, rotationQuaternion, scale3D) {
        const result = VecMath.matrix4Scratch0;
        const matrix = VecMath.matrix4Scratch1;
        const matrix3 = VecMath.matrix3Scratch;
        const quaternion = VecMath.quaternionScratch;
        const cartesian3 = VecMath.cartesian3Scratch0;
        cesium_5.Cartesian3.unpack(translation3D, 0, cartesian3);
        cesium_4.Matrix4.fromTranslation(cartesian3, result);
        if (rotationQuaternion) {
            cesium_6.Quaternion.unpack(rotationQuaternion, 0, quaternion);
            cesium_3.Matrix3.fromQuaternion(quaternion, matrix3);
            cesium_4.Matrix4.fromRotation(matrix3, matrix);
            cesium_4.Matrix4.multiply(result, matrix, result);
        }
        if (scale3D) {
            cesium_5.Cartesian3.unpack(scale3D, 0, cartesian3);
            cesium_4.Matrix4.fromScale(cartesian3, matrix);
            cesium_4.Matrix4.multiply(result, matrix, result);
        }
        const resultArray = cesium_4.Matrix4.pack(result, Array(16));
        return resultArray;
    }
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
    static decomposeMatrixTRS(matrix4Packed) {
        const matrix4 = VecMath.matrix4Scratch0;
        const translation = VecMath.cartesian3Scratch0;
        const matrix3 = VecMath.matrix3Scratch;
        const quaternion = VecMath.quaternionScratch;
        const scale = VecMath.cartesian3Scratch1;
        cesium_4.Matrix4.unpack(matrix4Packed, 0, matrix4);
        cesium_4.Matrix4.getTranslation(matrix4, translation);
        cesium_4.Matrix4.getRotation(matrix4, matrix3);
        cesium_6.Quaternion.fromRotationMatrix(matrix3, quaternion);
        cesium_4.Matrix4.getScale(matrix4, scale);
        const t = cesium_5.Cartesian3.pack(translation, Array(3));
        const r = cesium_6.Quaternion.pack(quaternion, Array(4));
        const s = cesium_5.Cartesian3.pack(scale, Array(3));
        return {
            t: t,
            r: r,
            s: s,
        };
    }
    /**
     * Compute the mean of the given 3D points
     *
     * @param points - The input points
     * @returns The mean
     */
    static computeMean3D(points) {
        let count = 0;
        const result = [0, 0, 0];
        for (const point of points) {
            VecMath.add(result, point, result);
            count++;
        }
        if (count > 0) {
            VecMath.scale(result, 1.0 / count, result);
        }
        return result;
    }
}
exports.VecMath = VecMath;
// Scratch variables for the implementation
VecMath.upScratch = new cesium_5.Cartesian3();
VecMath.rightScratch = new cesium_5.Cartesian3();
VecMath.forwardScratch = new cesium_5.Cartesian3();
VecMath.positionScratch0 = new cesium_5.Cartesian3();
VecMath.matrix3Scratch = new cesium_3.Matrix3();
VecMath.matrix4Scratch0 = new cesium_4.Matrix4();
VecMath.matrix4Scratch1 = new cesium_4.Matrix4();
VecMath.quaternionScratch = new cesium_6.Quaternion();
VecMath.cartesian3Scratch0 = new cesium_5.Cartesian3();
VecMath.cartesian3Scratch1 = new cesium_5.Cartesian3();
//# sourceMappingURL=VecMath.js.map