/// <reference types="node" />
/// <reference types="node" />
import { B3dmFeatureTable } from "../../structure";
import { BatchTable } from "../../structure";
import { I3dmFeatureTable } from "../../structure";
import { CompositeTileData } from "./CompositeTileData";
import { TileData } from "./TileData";
import { TileDataLayout } from "./TileDataLayouts";
/**
 * Methods for handling 3D Tiles tile data.
 *
 * Methods for reading, creating, and writing data in
 * B3DM, I3DM, PNTS, and CMPT format.
 *
 * @internal
 */
export declare class TileFormats {
    /**
     * Returns whether the given buffer contains composite (CMPT) tile data.
     *
     * @param buffer - The buffer
     * @returns Whether the given buffer contains composite tile data
     */
    static isComposite(buffer: Buffer): boolean;
    /**
     * Reads a `CompositeTileData` object from the given buffer.
     *
     * The given buffer is assumed to contain valid tile data in CMPT
     * format. Whether the magic header of a buffer indicates CMPT
     * format can be checked with `isComposite`.
     *
     * @param buffer - The buffer
     * @returns The `CompositeTileData`
     * @throws TileFormatError If the given buffer did not contain
     * valid CMPT data.
     */
    static readCompositeTileData(buffer: Buffer): CompositeTileData;
    /**
     * Reads a `TileData` object from the given buffer.
     *
     * This method can be applied to a buffer that contains valid B3DM,
     * I3DM or PNTS data.
     *
     * @param buffer - The buffer
     * @returns The `TileData`
     * @throws TileFormatError If the given buffer did not contain
     * valid tile data.
     */
    static readTileData(buffer: Buffer): TileData;
    /**
     * Extracts a `TileData` object from the given buffer, based
     * on the given layout information.
     *
     * This method can be applied to a buffer that contains valid B3DM,
     * I3DM or PNTS data, with a tile data layout that was created
     * with the `TileDataLayouts.create` method.
     *
     * @param buffer - The buffer
     * @param tileDataLayout - The tile data layout
     * @returns The `TileData`
     * @internal
     */
    static extractTileData(buffer: Buffer, tileDataLayout: TileDataLayout): {
        header: {
            magic: string;
            version: number;
            gltfFormat: number | undefined;
        };
        featureTable: {
            json: any;
            binary: Buffer;
        };
        batchTable: {
            json: any;
            binary: Buffer;
        };
        payload: Buffer;
    };
    /**
     * Convenience method to collect all GLB (binary glTF) buffers from
     * the given tile data.
     *
     * This can be applied to B3DM and I3DM tile data, as well as CMPT
     * tile data. (For PNTS, it will return an empty array). When the
     * given tile data is a composite (CMPT) tile data, and recursively
     * collect the buffer from its inner tiles.
     *
     * The resulting buffers will not include any padding bytes that
     * may have been inserted to satisfy alignment requirements.
     *
     * @param tileDataBuffer - The tile data buffer
     * @param externalGlbResolver - The function that will be used for
     * resolving external GLB files from I3DMs
     * @returns The array of GLB buffers
     */
    static extractGlbBuffers(tileDataBuffer: Buffer, externalGlbResolver: (glbUri: string) => Promise<Buffer | undefined>): Promise<Buffer[]>;
    /**
     * Implementation for `extractGlbBuffers`, called recursively.
     *
     * @param tileDataBuffer - The tile data buffer
     * @param externalGlbResolver - The function that will be used for
     * resolving external GLB files from I3DMs
     * @param glbBuffers - The array of GLB buffers
     */
    private static extractGlbBuffersInternal;
    /**
     * Split the given (CMPT) tile data and return one buffer for each
     * of its inner tiles.
     *
     * If the given tile data is not CMPT data, it is returned directly.
     * If `recursive===true`, then any inner tile data that is encountered
     * and that also is CMPT data will be split and its elements added
     * to the list of results.
     *
     * @param tileDataBuffer - The tile data
     * @param recursive - Whether the tile data should be split recursively
     * @returns The inner tile data buffers
     */
    static splitCmpt(tileDataBuffer: Buffer, recursive: boolean): Promise<Buffer[]>;
    /**
     * Internal implementation for `splitCmpt`, called recursively
     *
     * @param tileDataBuffer - The tile data
     * @param recursive - Whether the tile data should be split recursively
     * @returns resultBuffers - The inner tile data buffers
     */
    private static splitCmptInternal;
    /**
     * Creates a Batched 3D Model (B3DM) `TileData` instance from
     * a buffer that is assumed to contain valid binary glTF (GLB)
     * data.
     *
     * @param glbData - The GLB data
     * @returns The `TileData`
     */
    static createDefaultB3dmTileDataFromGlb(glbData: Buffer): TileData;
    /**
     * Creates a Batched 3D Model (B3DM) `TileData` instance from
     * a buffer that is assumed to contain valid binary glTF (GLB)
     * data.
     *
     * @param glbData - The GLB data
     * @param featureTableJson - The feature table JSON
     * @param featureTableBinary - The feature table binary
     * @param batchTableJson - The batch table JSON
     * @param batchTableBinary - The batch table binary
     * @returns The `TileData`
     */
    static createB3dmTileDataFromGlb(glbData: Buffer, featureTableJson: B3dmFeatureTable | undefined, featureTableBinary: Buffer | undefined, batchTableJson: BatchTable | undefined, batchTableBinary: Buffer | undefined): TileData;
    /**
     * Creates an Instanced 3D Model (I3DM) `TileData` instance from
     * a buffer that is assumed to contain valid binary glTF (GLB)
     * data. The resulting tile data will represent a single instance,
     * namely exactly the given GLB object.
     *
     * @param glbData - The GLB data
     * @param featureTableJson - The feature table JSON
     * @param featureTableBinary - The feature table binary
     * @param batchTableJson - The batch table JSON
     * @param batchTableBinary - The batch table binary
     * @returns The `TileData`
     */
    static createDefaultI3dmTileDataFromGlb(glbData: Buffer): TileData;
    /**
     * Creates an Instanced 3D Model (I3DM) `TileData` instance from
     * a buffer that is assumed to contain valid binary glTF (GLB)
     * data.
     *
     * If no feature table information is given, then the resulting tile
     * data will represent a single instance, namely exactly the given
     * GLB object.
     *
     * @param glbData - The GLB data
     * @param featureTableJson - The feature table JSON
     * @param featureTableBinary - The feature table binary
     * @param batchTableJson - The batch table JSON
     * @param batchTableBinary - The batch table binary
     * @returns The `TileData`
     */
    static createI3dmTileDataFromGlb(glbData: Buffer, featureTableJson: I3dmFeatureTable | undefined, featureTableBinary: Buffer | undefined, batchTableJson: BatchTable | undefined, batchTableBinary: Buffer | undefined): TileData;
    /**
     * Creates a Composite Tile Data (CMPT) instance from the given
     * `TileData` instances.
     *
     * @param tileDatas - The `TileData` instances
     * @returns The `CompositeTileData`
     */
    static createCompositeTileData(tileDatas: TileData[]): CompositeTileData;
    /**
     * Creates a buffer from the given `TileData`.
     *
     * The resulting buffer will contain a representation of the
     * tile data that can directly be written to a file. The
     * method will ensure that the padding requirements for the
     * 3D Tiles tile formats are met.
     *
     * @param tileData - The `TileData`
     * @returns The buffer
     */
    static createTileDataBuffer(tileData: TileData): Buffer;
    /**
     * Creates a buffer from the given `CompositeTileData`.
     *
     * The resulting buffer will contain a representation of the
     * tile data that can directly be written to a file. The
     * method will ensure that the padding requirements for the
     * 3D Tiles tile formats are met.
     *
     * @param compositeTileData - The `CompositeTileData`
     * @returns The buffer
     */
    static createCompositeTileDataBuffer(compositeTileData: CompositeTileData): Buffer;
    /**
     * Returns the GLB data that is stored as tile payload
     * of the given tile.
     *
     * This will exclude any padding bytes that may beve been
     * inserted to satisfy the alignment requirements.
     *
     * This is applicable to B3DM tile data, and to I3DM
     * tile data that uses `header.gltfFormat===1` (where
     * the GLB data is stored directly as the payload).
     *
     * For I3DM data that uses a `header.gltfFormat` that may
     * not be `1`, the `obtainGlbPayload` method may be used.
     *
     * @param tileData - The tile data
     * @returns The GLB buffer from the tile data
     */
    static extractGlbPayload(tileData: TileData): Buffer;
    /**
     * Returns the GLB data that is stored as tile payload
     * of the given tile.
     *
     * This will exclude any padding bytes that may have been
     * inserted to satisfy the alignment requirements.
     *
     * This is applicable to B3DM and I3DM tile data. If the data
     * is an I3DM tile data that uses `header.gltfFormat===0`
     * (meaning that the payload is only a URI to an external
     * GLB file), then this data will be resolved using the
     * given resolver function.
     *
     * @param tileData - The tile data
     * @param externalGlbResolver - A function to resolve external
     * GLB files for I3DMs that use `header.gltfFormat===0`
     * @returns The GLB buffer from the tile data, or
     * `undefined` if the data was external data that could not
     * be resolved with the given function.
     */
    static obtainGlbPayload(tileData: TileData, externalGlbResolver: (glbUri: string) => Promise<Buffer | undefined>): Promise<Buffer | undefined>;
    /**
     * Remove any padding bytes at the end of a GLB buffer.
     *
     * The GLB data that was extracted as the `payload` of a `TileData`
     * may include padding bytes at the end, to satisfy the alignment
     * requirements of the 3D Tiles tile formats.
     *
     * If the given input is GLB data, then this method will strip
     * any padding bytes, by restricting the buffer to the length
     * that was obtained from the GLB header.
     *
     * If the given data is not GLB data, then the buffer is
     * returned, unmodified.
     *
     * @param input - The buffer, including possible padding
     * @returns The resulting buffer
     */
    private static stripGlbPaddingBytes;
}
//# sourceMappingURL=TileFormats.d.ts.map