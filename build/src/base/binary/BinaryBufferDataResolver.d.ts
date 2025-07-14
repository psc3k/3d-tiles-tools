/// <reference types="node" />
/// <reference types="node" />
import { ResourceResolver } from "../io/ResourceResolver";
import { BinaryBufferData } from "./BinaryBufferData";
import { BinaryBufferStructure } from "./BinaryBufferStructure";
/**
 * A class for resolving binary buffer data.
 *
 * @internal
 */
export declare class BinaryBufferDataResolver {
    /**
     * Resolves the buffer data that is defined in the given structure.
     *
     * It receives a `BinaryBufferStructure` that contains the
     * `BufferObject` and `BufferView` definitions, resolves the
     * data from the buffer URIs using the given resource resolver,
     * and returns a `BinaryBufferData` that contains the actual
     * binary buffer data.
     *
     * If any of the given buffer views uses the `EXT_meshopt_compression`
     * glTF extension, then this data will be decompressed.
     *
     * The given `binaryBuffer` will be used as the buffer data
     * for any buffer that does not have a URI and that is not
     * a meshopt fallback buffer (intended for binary subtree files)
     *
     * @param binaryBufferStructure - The `BinaryBufferStructure`
     * @param binaryBuffer - The optional binary buffer
     * @param resourceResolver - The `ResourceResolver`
     * @returns The `BinaryBufferData`
     * @throws BinaryDataError If the data could not be resolved
     */
    static resolve(binaryBufferStructure: BinaryBufferStructure, binaryBuffer: Buffer | undefined, resourceResolver: ResourceResolver): Promise<BinaryBufferData>;
    /**
     * Resolve the data for the specified buffer from the given structure.
     *
     * This will...
     * - resolve the buffer URI if it is present
     * - return a zero-filled buffer if the specified buffer is a
     *   meshopt fallback buffer
     * - return the given binary buffer otherwise
     *
     * @param binaryBufferStructure - Tbe `BinaryBufferStructure`
     * @param binaryBuffer - The optional binary buffer
     * @param bufferIndex - The index of the buffer to resolve
     * @param resourceResolver - The `ResourceResolver` that will be
     * used for resolving buffer URIs
     * @returns The `Buffer` containing the data for the specified
     * buffer.
     * @throws BinaryDataError If the buffer data cannot be resolved
     */
    private static resolveBufferData;
    /**
     * Resolve the data for the given buffer view against the given
     * buffers data.
     *
     * This will slice out the data for the buffer view from the
     * data that corresponds to its `buffer`.
     *
     * If the given buffer view uses the `EXT_meshopt_compression`
     * glTF extension, then its data will be uncompressed into
     * the appropriate slice of the uncompressed buffer, and this
     * slice will be returned.
     *
     * @param buffersData - The buffers data
     * @param bufferView - The `BufferView` object
     * @returns The `Buffer` for the buffer view
     */
    private static resolveBufferViewData;
    /**
     * Decode the meshopt-compressed data for a buffer view that contained
     * the given `EXT_meshopt_compression` extension object.
     *
     * The returned uncompressed buffer view will be a slice/subarray
     * of the given uncompressed buffer.
     *
     * @param compressedBufferData - The buffer containing the compressed
     * data that the extension object refers to
     * @param uncompressedBufferData - The buffer for the uncompressed
     * data. This may be a "fallback" buffer that was created when
     * initializing the `buffersData` array.
     * @param bufferView - The buffer view that contained the extension
     * @param meshopt - The extension object
     * @returns The decoded buffer (view) data
     */
    private static decodeMeshopt;
    /**
     * Returns whether the given buffer is a "fallback" buffer for the
     * `EXT_meshopt_compression` extension.
     *
     * This is the case when it is either itself marked with
     * an `EXT_meshopt_compression` extension object that
     * defines `fallback: true`, or when it is referred to by
     * a buffer view that defines the `EXT_meshopt_compression`
     * extension.
     *
     * @param binaryBufferStructure - The BinaryBufferStructure
     * @param bufferIndex - The buffer index
     * @returns Whether the given buffer is a fallback buffer
     */
    private static isMeshoptFallbackBuffer;
}
//# sourceMappingURL=BinaryBufferDataResolver.d.ts.map