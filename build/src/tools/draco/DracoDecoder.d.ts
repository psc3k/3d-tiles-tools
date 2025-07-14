/// <reference types="node" />
/// <reference types="node" />
import { DracoDecoderResult } from "./DracoDecoderResult";
/**
 * A thin wrapper around Draco, tailored for decompressing
 * point cloud data.
 *
 * @internal
 */
export declare class DracoDecoder {
    /**
     * Creates a new instance of a `DracoDecoder`
     *
     * @returns The promise to the instance
     */
    static create(): Promise<DracoDecoder>;
    /**
     * The internal `DecoderModule` that serves as the
     * basis for instantiation of Draco objects
     */
    private decoderModule;
    /**
     * Private constructor. Instantiation via `create` method.
     *
     * @param decoderModule - The decoder module
     */
    private constructor();
    /**
     * Decodes the given attributes from the given draco-encoded buffer.
     *
     * The given buffer is assumed to contain Draco POINT_CLOUD data, with
     * the attribute data for the attributes in the given dictionary.
     *
     * @param properties - The mapping from property names (like
     * `POSITION`) to IDs
     * @param binary - The binary data to to decode from
     * @returns The decoded data for each attribute, and information
     * about its structure
     * @throws DracoError If the data could not be decoded
     */
    decodePointCloud(properties: {
        [key: string]: number;
    }, binary: Buffer): DracoDecoderResult;
    private decodeQuantizedDracoTypedArray;
    private decodeDracoTypedArray;
    private decodeAttribute;
}
//# sourceMappingURL=DracoDecoder.d.ts.map