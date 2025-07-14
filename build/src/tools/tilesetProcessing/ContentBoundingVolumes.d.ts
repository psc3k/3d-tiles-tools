/// <reference types="node" />
/// <reference types="node" />
/**
 * Methods to compute bounding volumes from tile content data.
 *
 * (The term "bounding volume box" refers to the 12-element
 * number arrays that are the `boundingVolume.box`)
 */
export declare class ContentBoundingVolumes {
    /**
     * Computes the bounding volume box from the given content data.
     *
     * The exact set of content data types that is supported by this
     * method is not specified (but it should include GLB and the
     * common 'legacy' content types).
     *
     * @param contentUri - The content URI
     * @param data - The content data
     * @param externalGlbResolver - The resolver for external GLBs in I3DMs
     * @returns The bounding volume box, or undefined if no bounding
     * volume box could be computed from the given content.
     * @throws Error if the I3DM referred to a GLB that could not be
     * resolved
     */
    static computeContentDataBoundingVolumeBox(contentUri: string, data: Buffer, externalGlbResolver: (glbUri: string) => Promise<Buffer | undefined>): Promise<number[] | undefined>;
    /**
     * Computes the bounding volume box of the given PNTS data
     *
     * @param pntsBuffer - The PNTS data buffer
     * @returns A promise to the bounding volume box
     */
    private static computeBoundingBoxFromPnts;
    /**
     * Computes the bounding volume box of the given B3DM data
     *
     * @param b3dmBuffer - The B3DM data buffer
     * @returns A promise to the bounding volume box
     */
    private static computeBoundingVolumeBoxFromB3dm;
    /**
     * Computes the bounding volume box of the given I3DM data
     *
     * @param i3dmBuffer - The I3DM data buffer
     * @param externalGlbResolver - The resolver for external GLB data from I3DMs
     * @returns A promise to the bounding volume box
     * @throws Error if the I3DM referred to a GLB that could not be
     * resolved
     */
    private static computeBoundingVolumeBoxFromI3dm;
    /**
     * Computes the bounding volume box of the given CMPT data
     *
     * @param cmptBuffer - The CMPT data buffer
     * @returns A promise to the bounding volume box
     */
    private static computeBoundingVolumeBoxFromCmpt;
    /**
     * Computes the bounding volume box of the given glTF asset.
     *
     * This will compute the bounding volume box of the default scene
     * (or the first scene of the asset). If there is no scene,
     * then a warning will be printed, and a unit cube bounding
     * box will be returned.
     *
     * @param glbBuffer - The buffer containing GLB data
     * @returns A promise to the bounding volume box
     */
    private static computeBoundingVolumeBoxFromGlb;
    /**
     * Computes the bounding volume box of the given glTF asset.
     *
     * This will compute the bounding volume box of the default scene
     * (or the first scene of the asset). If there is no scene,
     * then a warning will be printed, and a unit cube bounding
     * box will be returned.
     *
     * @param glbBuffer - The buffer containing GLB data
     * @returns A promise to the bounding volume box
     */
    static computeOrientedBoundingVolumeBoxFromGlb(glbBuffer: Buffer): Promise<number[]>;
    private static processVertexPositions;
    /**
     * Transforms the given 3D point with the given 4x4 matrix, writes
     * the result into the given target, and returns it. If no target
     * is given, then a new point will be created and returned.
     *
     * @param matrix - The 4x4 matrix
     * @param point - The 3D point
     * @param target - The target
     * @returns The result
     */
    private static transformPoint3D;
}
//# sourceMappingURL=ContentBoundingVolumes.d.ts.map