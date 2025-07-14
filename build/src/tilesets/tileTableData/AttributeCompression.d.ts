/**
 * Adapted from CesiumJS 'AttributeCompression' class:
 *
 * Methods for decoding (point cloud) attribute values that are
 * stored in compressed forms.
 *
 * @internal
 */
export declare class AttributeCompression {
    private static readonly octDecodeInRangeInternalResultScratch;
    /**
     * Decodes two 8-bit values that represent an oct-encoded normal
     * into a 3D (normalized) normal.
     *
     * @param input - The input values
     * @returns The resulting normal
     */
    static octDecode8(input: number[]): number[];
    /**
     * Decodes two 16-bit values that represent an oct-encoded normal
     * into a 3D (normalized) normal.
     *
     * @param input - The input values
     * @returns The resulting normal
     */
    static octDecode16(input: number[]): number[];
    private static octDecodeInRangeInternal;
}
//# sourceMappingURL=AttributeCompression.d.ts.map