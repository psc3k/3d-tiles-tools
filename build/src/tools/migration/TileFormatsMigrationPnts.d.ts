/// <reference types="node" />
/// <reference types="node" />
/**
 * Methods for converting PNTS tile data into GLB
 *
 * @internal
 */
export declare class TileFormatsMigrationPnts {
    /**
     * Convert the given PNTS data into a glTF asset
     *
     * @param pntsBuffer - The PNTS buffer
     * @returns The GLB buffer
     */
    static convertPntsToGlb(pntsBuffer: Buffer): Promise<Buffer>;
    /**
     * Computes a mapping from property IDs to `PropertyModel` objects
     * for properties that are defined in the batch table, but not stored
     * in the batch table binary.
     *
     * Yeah, I'm looking at you, 3DTILES_draco_point_compression...
     *
     * The properties of the batch table that are draco-compressed
     * are actually read during the Draco decoding pass of the
     * feature table. The decoded values are stored as plain
     * attributes in the `ReadablePointCloud`. This method will
     * create `PropertyModel` objects for these attributes, so that
     * they can later be used for creating the accessors of the
     * attributes in the `EXT_structural_metadata` extension.
     *
     * @param pntsPointCloud - The point cloud that contains the PNTS data
     * @param batchTable - The batch table
     * @returns The mapping
     */
    private static computeExternalProperties;
}
//# sourceMappingURL=TileFormatsMigrationPnts.d.ts.map