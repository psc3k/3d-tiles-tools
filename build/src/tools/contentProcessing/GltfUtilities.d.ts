/// <reference types="node" />
/// <reference types="node" />
/**
 * Internal utility methods related to glTF/GLB data.
 *
 * @internal
 */
export declare class GltfUtilities {
    /**
     * Upgrades the binary glTF (GLB) data in the given buffer.
     *
     * The exact pre- and postconditions of this is are intentionally
     * not specified. But it is mainly used for updating a limited
     * subset of glTF 1.0 binary data to glTF 2.0.
     *
     * @param glbBuffer - The buffer containing the GLB
     * @param options - Options for the upgrade that are passed to
     * `gltf-pipeline`
     * @returns A promise that resolves with the upgraded GLB.
     */
    static upgradeGlb(glbBuffer: Buffer, options: any): Promise<Buffer>;
    /**
     * Obtains the `version` field value from the header in the given GLB buffer.
     *
     * @param glbBuffer - The GLB buffer
     * @returns The glTF version
     * @throws TileFormatError If the buffer does not contain enough bytes
     * for a glTF header
     */
    static getGltfVersion(glbBuffer: Buffer): number;
    /**
     * Extract the JSON- and binary part from the given GLB buffer.
     *
     * The given buffer may contain glTF 2.0 binary data, or glTF 1.0
     * binary data.
     *
     * Note that this does NOT convert the input data. It only extracts
     * the data, as-it-is.
     *
     * @param glbBuffer - The buffer containing the GLB
     * @returns The JSON- and binary data buffers
     * @throws TileFormatError If the input does not contain valid GLB data.
     */
    static extractDataFromGlb(glbBuffer: Buffer): {
        jsonData: Buffer;
        binData: Buffer;
    };
    /**
     * Internal method for `extractDataFromGlb`, covering glTF 1.0.
     *
     * @param glbBuffer - The buffer containing the GLB
     * @returns The JSON- and binary data buffers
     * @throws TileFormatError If the input does not contain valid GLB data.
     */
    private static extractDataFromGlb1;
    /**
     * Internal method for `extractDataFromGlb`, covering glTF 2.0.
     *
     * @param glbBuffer - The buffer containing the GLB
     * @returns The JSON- and binary data buffers
     * @throws TileFormatError If the input does not contain valid GLB data.
     */
    private static extractDataFromGlb2;
    /**
     * Extract the JSON part from the given GLB buffer and return it
     * as a buffer.
     *
     * The given buffer may contain glTF 2.0 binary data, or glTF 1.0
     * binary data.
     *
     * Note that this does NOT convert the input data. It only extracts
     * the data, as-it-is.
     *
     * @param glbBuffer - The buffer containing the GLB
     * @returns The JSON buffer
     * @throws TileFormatError If the input does not contain valid GLB data.
     */
    static extractJsonFromGlb(glbBuffer: Buffer): Buffer;
    /**
     * Creates a glTF 2.0 binary (GLB) buffer from the given JSON and
     * binary chunk data.
     *
     * This is the reverse of `extractDataFromGlb2`.
     *
     * This is a low-level function for turning JSON- and binary chunk
     * data into a GLB buffer. The caller is responsible for making sure
     * that the given JSON matches the given BIN data (for example, that
     * the given JSON does not involve a buffer byte offset that does
     * not fit the given buffer data)
     *
     * @param jsonData - The JSON data
     * @param binData - The binary chunk data
     * @returns The GLB data
     */
    static createGlb2FromData(jsonData: Buffer, binData: Buffer): Buffer;
    /**
     * Given an input buffer containing a binary glTF asset, optimize it
     * using gltf-pipeline with the provided options.
     *
     * This method also performs a few updates of certain legacy
     * features that are specific for the GLB data that is part
     * of I3DM and B3DM. Details are not specified here.
     *
     * @param glbBuffer - The buffer containing the binary glTF.
     * @param options - Options specifying custom gltf-pipeline behavior.
     * @returns A promise that resolves to the optimized binary glTF.
     */
    static optimizeGlb(glbBuffer: Buffer, options: any): Promise<Buffer>;
    /**
     * Given an input buffer containing a binary glTF asset, remove
     * its use of the `CESIUM_RTC` extension by inserting new nodes
     * (above the former root nodes) that contain the RTC center as
     * their translation.
     *
     * @param glbBuffer - The buffer containing the binary glTF.
     * @param gltfUpAxis - The glTF up-axis, defaulting to "Y"
     * @returns A promise that resolves to the resulting binary glTF.
     *
     * @deprecated This uses `gltf-pipeline` to replace the CESIUM_RTC
     * extension, is only applicable to GLB data, and may affect the
     * structure of the GLB in a way that is hard to predict. Use
     * the `replaceCesiumRtcExtensionInGltf2Glb` function or the
     * `replaceCesiumRtcExtensionInGltf` to perform this operation
     * only when necessary, and without other side effects
     */
    static replaceCesiumRtcExtension(glbBuffer: Buffer, gltfUpAxis: "X" | "Y" | "Z" | undefined): Promise<Buffer>;
    /**
     * Replaces the `CESIUM_RTC` extension in the given glTF 2.0 GLB data.
     *
     * If the given glTF does NOT use the `CESIUM_RTC` extension, then
     * the given buffer will be returned unmodified.
     *
     * Otherwise, this will insert a new parent node above each root node
     * of a scene. These new parent nodes will have a `translation`
     * that is derived taken from the `CESIUM_RTC` `center`,
     * possibly adjusted to take the up-axis of the glTF into account.
     *
     * The `CESIUM_RTC` extension object and its used/required
     * usage declarations will be removed.
     *
     * @param glb - The GLB data
     * @param gltfUpAxis - The glTF up-axis, defaulting to "Y"
     * @returns The buffer with the updated glTF data, or the
     * given input buffer if the glTF did not use CESIUM_RTC
     */
    static replaceCesiumRtcExtensionInGltf2Glb(glb: Buffer, gltfUpAxis: "X" | "Y" | "Z" | undefined): Buffer;
    /**
     * Replaces the `CESIUM_RTC` extension in the given glTF 2.0 JSON data.
     *
     * If the given glTF does NOT use the `CESIUM_RTC` extension, then
     * the given buffer will be returned unmodified.
     *
     * Otherwise, this will insert a new parent node above each root node
     * of a scene. These new parent nodes will have a `translation`
     * that is derived taken from the `CESIUM_RTC` `center`,
     * possibly adjusted to take the up-axis of the glTF into account.
     *
     * The `CESIUM_RTC` extension object and its used/required
     * usage declarations will be removed.
     *
     * @param gltfJsonBuffer - The glTF JSON buffer
     * @param gltfUpAxis - The glTF up-axis, defaulting to "Y"
     * @returns The buffer with the updated glTF JSON data, or the
     * given input buffer if the glTF did not use CESIUM_RTC
     */
    static replaceCesiumRtcExtensionInGltf2Json(gltfJsonBuffer: Buffer, gltfUpAxis: "X" | "Y" | "Z" | undefined): Buffer;
    /**
     * Replaces the `CESIUM_RTC` extension in the given glTF 2.0 JSON object.
     *
     * If the given glTF does NOT use the `CESIUM_RTC` extension, then
     * nothing will be done.
     *
     * Otherwise, this will insert a new parent node above each root node
     * of a scene. These new parent nodes will have a `translation`
     * that is derived taken from the `CESIUM_RTC` `center`,
     * possibly adjusted to take the up-axis of the glTF into account.
     *
     * The `CESIUM_RTC` extension object and its used/required
     * usage declarations will be removed.
     *
     * @param gltf - The glTF 2.0 JSON object
     * @param gltfUpAxis - The glTF up-axis, defaulting to "Y"
     */
    static replaceCesiumRtcExtensionInGltf(gltf: any, gltfUpAxis: "X" | "Y" | "Z" | undefined): void;
    /**
     * Given an input buffer containing a binary glTF 2.0 asset, remove
     * its use of the `WEB3D_quantized_attributes` extension.
     *
     * See `GltfWeb3dQuantizedAttributes` for further notes about
     * the context where this is used.
     *
     * @param glbBuffer - The buffer containing the binary glTF.
     * @returns A promise that resolves to the resulting binary glTF.
     */
    static replaceWeb3dQuantizedAttributesExtension(glbBuffer: Buffer): Promise<Buffer>;
}
//# sourceMappingURL=GltfUtilities.d.ts.map