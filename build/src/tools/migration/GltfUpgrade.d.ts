/// <reference types="node" />
/// <reference types="node" />
import { Document } from "@gltf-transform/core";
/**
 * Methods for obtaining a valid glTF-Transform document from
 * inputs that may contain legacy data.
 *
 * @internal
 */
export declare class GltfUpgrade {
    /**
     * Obtain a glTF-Transform document from the given GLB buffer.
     *
     * This is intended for cases where the input may contain various
     * forms of "legacy" data, and where it may be necessary to
     * preprocess the input or postprocess the document, in order
     * to obtain a valid glTF 2.0 document.
     *
     * The preprocessing steps that may be applied to the buffer are:
     *
     * - glTF 1.0 data will be upgraded to glTF 2.0 with gltf-pipeline
     *
     * - The CESIUM_RTC extension will be converted into a translation
     *   of a (newly inserted) root node of the document. Note that
     *   this is done for both glTF 1.0 and glTF 2.0.
     *
     * The postprocessing steps that may be applied to the document are:
     * - Decode oct-encoded normals into the standard representation
     *   (for details, see `octDecode2DNormals`)
     * - Decode compressed 3D texture coordinates into 2D
     *   (for details, see `decode3DTexCoords`)
     * - Apply the up-axis conversion: When the given gltfUpAxis is not
     *   ("Y" or undefined), then a new root node will be inserted into
     *   the resulting document, compensating for the specified up-axis
     *   convention, and ensuring the Y-axis convention that is specified
     *   for glTF 2.0.
     *
     * @param glb The GLB buffer
     * @param gltfUpAxis - The glTF up-axis, defaulting to "Y"
     * @returns A promise to the glTF-Transform `Document`
     */
    static obtainDocument(glb: Buffer, gltfUpAxis: "X" | "Y" | "Z" | undefined): Promise<Document>;
    /**
     * Check each mesh primitive in the given document, to see if it
     * contains a VEC2/BYTE or VEC2/SHORT accessor for the NORMAL.
     * If it does, then this accessor will be replaced by one that
     * contains the decoded 3D normals.
     *
     * (Note that the old accessors might become unused by that.
     * The document should afterwards be cleaned up with
     * glTF-Transform 'prune()')
     *
     * @param document - The glTF-Transform document
     */
    private static octDecode2DNormals;
    /**
     * Decode the oct-encoded (2D) normals from the given accessor, and
     * return the result as a new accessor.
     *
     * @param document - The glTF-Transform document
     * @param encodedAccessor - The (VEC2) accessor containing the
     * oct-encoded 2D normal data
     * @param range - The decoding range: 255 for BYTE, 65535 for SHORT
     * @returns The decoded (VEC3/FLOAT) accessor.
     */
    private static octDecodeAccessor;
    /**
     * Oct-decode the given 2D normal from the given value range into
     * a 3D normal.
     *
     * @param encoded - The encoded normal as a 2-element array
     * @param range - The decoding range: 255 for BYTE, 65535 for SHORT
     * @returns The decoded normal as a 3-element array
     */
    private static octDecode;
    /**
     * Check each mesh primitive in the given document, to see if it
     * contains a VEC3/BYTE or VEC3/SHORT accessor for the TEXCOORD_X.
     * If it does, then this accessor will be replaced by one that
     * contains the decoded 2D texture coordinates.
     *
     * (Note that the old accessors might become unused by that.
     * The document should afterwards be cleaned up with
     * glTF-Transform 'prune()')
     *
     * @param document - The glTF-Transform document
     */
    private static decode3DTexCoords;
    /**
     * Decode the encoded (3D) texture coordinates from the given accessor, and
     * return the result as a new accessor.
     *
     * @param document - The glTF-Transform document
     * @param encodedAccessor - The (VEC3) accessor containing the
     * encoded 3D texture coordinate data
     * @param range - The decoding range: 127 for BYTE, 32767 for SHORT
     * @returns The decoded (VEC2/FLOAT) accessor.
     */
    private static decodeTexCoordAccessor;
    /**
     * Decode the given 3D texture coordinates from the given value
     * range into 2D texture coordinates
     *
     * @param encoded - The encoded coordinates as a 3-element array
     * @param range - The decoding range: 127 for BYTE, 32767 for SHORT
     * @returns The decoded texture coordinates as a 2-element array
     */
    private static decodeTexCoord;
}
//# sourceMappingURL=GltfUpgrade.d.ts.map