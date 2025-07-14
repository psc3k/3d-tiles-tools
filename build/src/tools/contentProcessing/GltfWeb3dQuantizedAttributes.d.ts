/// <reference types="node" />
/// <reference types="node" />
/**
 * Utilities for removing WEB3D_quantized_attributes extension
 * from glTF 2.0 (!) data.
 *
 * NOTE: This class is exposing an anachronism: It takes glTF 2.0 data,
 * and removes the WEB3D_quantized_attributes extension, which actually
 * is a glTF 1.0 extension.
 * The functions here are applied to a buffer that was created by upgrading
 * a glTF 1.0 to 2.0 with `gltf-pipeline`: This will upgrade most of the
 * glTF to 2.0, but keep the WEB3D_quantized_attributes extension.
 *
 * @internal
 */
export declare class GltfWeb3dQuantizedAttributes {
    /**
     * Replaces accessors in the given GLB that had been quantized with
     * the WEB3D_quantized_attributes extension with accessors that are
     * dequantized.
     *
     * The given `decodeMatrices` contain one entry for each accessor
     * of the glTF. This entry is the `decodeMatrix` from the extension
     * object. If the respective accessor did not contain the
     * WEB3D_quantized_attributes extension, this entry is `undefined`.
     *
     * @param inputGlb - The input GLB buffer
     * @param decodeMatrices - The decode matrices for the accessors
     * @returns The resulting GLB
     */
    static replaceWeb3dQuantizedAttributesExtension(inputGlb: Buffer, decodeMatrices: (number[] | undefined)[]): Promise<Buffer>;
    /**
     * Transform the given document to replace all WEB3D_quantized_attributes
     * accessors with dequantized ones.
     *
     * The given `decodeMatrices` contain one entry for each accessor
     * of the glTF. This entry is the `decodeMatrix` from the extension
     * object. If the respective accessor did not contain the
     * WEB3D_quantized_attributes extension, this entry is `undefined`.
     *
     * Note that after this, the original accessors MIGHT become
     * unused. The glTF-Transform 'prune' function should be called
     * afterwards, to clean up the document.
     *
     * @param document - The glTF-Transform document
     */
    private static dequantizeAccessors;
    /**
     * Create a dequantized version of the given accessor, based on the
     * given decode matrix.
     *
     * The given accessor must have the type 'SCALAR', 'VEC2', 'VEC3',
     * or 'VEC4', and the decode matrix must have a length of
     * [2x2, 3x3, 4x4, 5x5], respectively. If this is not the case,
     * then an error message will be printed, and `undefined` will
     * be returned.
     *
     * @param document - The glTF-Transform document
     * @param quantizedAccessor - The quantized accessor
     * @param decodeMatrix - The decode matrix for the accessor
     * @returns The dequantized accessor
     */
    private static createDequantizedAccessor;
    /**
     * Dequantize the given accessor using the given offset and step size,
     * and return the result.
     *
     * @param document - The glTF-Transform document
     * @param quantizedAccessor - The quantized accessor
     * @param offset - The quantization offset
     * @param stepSize - The quantization step size
     * @returns The dequantized accessor
     */
    private static dequantizeAccessor;
    /**
     * Dequantize the given quantized value with the given offset and step
     * size.
     *
     * This just returns `offset + quantized * stepSize`, component-wise.
     * It assumes that all arrays have the same length.
     *
     * @param encoded - The quantized value
     * @param offset - The offset
     * @param stepSize - The step size
     * @returns The dequantized value
     */
    private static dequantize;
}
//# sourceMappingURL=GltfWeb3dQuantizedAttributes.d.ts.map