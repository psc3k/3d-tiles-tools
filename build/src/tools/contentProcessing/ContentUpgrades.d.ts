/// <reference types="node" />
/// <reference types="node" />
/**
 * Internal class containing functions to upgrade tile content data.
 *
 * For now, this covers the narrow case of B3DM and I3DM data where
 * the contained GLB should be upgraded from glTF 1.0 to glTF 2.0
 * with `gltf-pipeline`. (Specifically: This does not change the
 * type of the data itself)
 *
 * @internal
 */
export declare class ContentUpgrades {
    /**
     * For the given B3DM data buffer, extract the GLB, upgrade it
     * with `GltfUtilities.upgradeGlb`, create a new B3DM from the
     * result, and return it.
     *
     * @param inputBuffer - The input buffer
     * @param options - Options that will be passed to the
     * `gltf-pipeline` when the GLB is processed.
     * @param gltfUpAxis - The glTF up-axis, defaulting to "Y"
     * @returns The upgraded buffer
     */
    static upgradeB3dmGltf1ToGltf2(inputBuffer: Buffer, options: any, gltfUpAxis: "X" | "Y" | "Z" | undefined): Promise<Buffer>;
    /**
     * For the given I3DM data buffer, extract the GLB, upgrade it
     * with `GltfUtilities.upgradeGlb`, create a new B3DM from the
     * result, and return it.
     *
     * @param inputBuffer - The input buffer
     * @param options - Options that will be passed to the
     * `gltf-pipeline` when the GLB is processed.
     * @param gltfUpAxis - The glTF up-axis, defaulting to "Y"
     * @returns The upgraded buffer
     */
    static upgradeI3dmGltf1ToGltf2(inputBuffer: Buffer, options: any, gltfUpAxis: "X" | "Y" | "Z" | undefined): Promise<Buffer>;
}
//# sourceMappingURL=ContentUpgrades.d.ts.map