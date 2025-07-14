/// <reference types="node" />
/// <reference types="node" />
/**
 * Methods for converting CMPT tile data into GLB
 *
 * @internal
 */
export declare class TileFormatsMigrationCmpt {
    /**
     * Convert the given CMPT data into a glTF asset
     *
     * @param cmptBuffer - The CMPT buffer
     * @param externalResourceResolver - A function that will be used to resolve
     * external resources, like GLB data if the CMPT contains I3DM that use
     * `header.gltfFormat=0` (meaning that the payload is not GLB data,
     * but only a GLB URI).
     * @param gltfUpAxis - The glTF up-axis, defaulting to "Y"
     * @returns The GLB buffer
     * @throws TileFormatError If the CMPT contained I3DM with an external
     * GLB URI * that could not resolved by the given resolver
     */
    static convertCmptToGlb(cmptBuffer: Buffer, externalResourceResolver: (uri: string) => Promise<Buffer | undefined>, gltfUpAxis: "X" | "Y" | "Z" | undefined): Promise<Buffer>;
}
//# sourceMappingURL=TileFormatsMigrationCmpt.d.ts.map