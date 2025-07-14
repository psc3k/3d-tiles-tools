/// <reference types="node" />
/// <reference types="node" />
import { PntsFeatureTable } from "../../structure";
import { BatchTable } from "../../structure";
import { ReadablePointCloud } from "./ReadablePointCloud";
/**
 * Methods to create `ReadablePointCloud` instances from PNTS data
 *
 * @internal
 */
export declare class PntsPointClouds {
    /**
     * Create a `ReadablePointCloud` from the given PNTS data.
     *
     * This will internally take care of the specific representations
     * of data that PNTS can contain, and always return the data in
     * the form that is described in the `ReadablePointCloud` interface.
     *
     * For example, it will decode quantized positions, oct-encoded
     * normals, and the different color representations, and possible
     * Draco compression, and return the plain, uncompressed data.
     *
     * @param featureTable - The PNTS feature table
     * @param featureTableBinary - The PNTS feature table binary
     * @param batchTable - The PNTS batch table
     * @returns A promise to the `ReadablePointCloud`
     */
    static create(featureTable: PntsFeatureTable, featureTableBinary: Buffer, batchTable: BatchTable): Promise<ReadablePointCloud>;
    /**
     * Returns whether the color information of the point cloud with the
     * given PNTS feature table MAY require an alpha component.
     *
     * This is true for RGBA or CONSTANT_RGBA point clouds, and
     * false otherwise.
     *
     * @param featureTable - The PNTS feature table
     * @returns Whether the point cloud may require an alpha component
     */
    static mayRequireAlpha(featureTable: PntsFeatureTable): boolean;
    /**
     * Returns whether the point cloud has quantzized positions
     *
     * @param featureTable - The PNTS feature table
     * @returns Whether the point cloud has quantized positions
     */
    static hasQuantizedPositions(featureTable: PntsFeatureTable): boolean;
    /**
     * Returns whether the point cloud has oct-encoded normals
     *
     * @param featureTable - The PNTS feature table
     * @returns Whether the point cloud normals are oct-encoded
     */
    static hasOctEncodedNormals(featureTable: PntsFeatureTable): boolean;
    /**
     * If the given feature table defines the 3DTILES_draco_point_compression
     * extension, then decode that data and return it as a `DracoDecoderResult`.
     *
     * The decoded result will include possible draco-encoded properties from
     * the batch table.
     *
     * @param featureTable - The PNTS feature table
     * @param featureTableBinary - The feature table binary
     * @param batchTable - The batch table
     * @returns The `DracoDecoderResult`, or `undefined`
     */
    private static obtainDracoDecodedAttributes;
    /**
     * Go through all attributes in the given `DracoDecoderResult`,
     * and assign them as attributes to the given point cloud.
     *
     * @param pointCloud - The (default) point cloud to assign the attributes to
     * @param numPoints - The number of points
     * @param dracoDecoderResult - The `DracoDecoderResult` that contains the
     * decoded attributes
     * @param batchTable - The batch table
     */
    private static assignDracoDecodedAttributes;
}
//# sourceMappingURL=PntsPointClouds.d.ts.map