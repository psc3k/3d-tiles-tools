/// <reference types="node" />
/// <reference types="node" />
/**
 * Methods for converting I3DM tile data into GLB
 *
 * @internal
 */
export declare class TileFormatsMigrationI3dm {
    /**
     * Convert the given I3DM data into a glTF asset
     *
     * @param i3dmBuffer - The I3DM buffer
     * @param externalResourceResolver - A function that will be used to resolve
     * external resources, like GLB data if the I3DM uses `header.gltfFormat=0`
     * (meaning that the payload is not GLB data, but only a GLB URI).
     * @param gltfUpAxis - The up-axis to assume for the glTF data in
     * the given B3DM, defaulting to "Y".
     * @returns The GLB buffer
     * @throws TileFormatError If the I3DM contained an external GLB URI
     * that could not resolved by the given resolver
     */
    static convertI3dmToGlb(i3dmBuffer: Buffer, externalResourceResolver: (uri: string) => Promise<Buffer | undefined>, gltfUpAxis: "X" | "Y" | "Z" | undefined): Promise<Buffer>;
}
//# sourceMappingURL=TileFormatsMigrationI3dm.d.ts.map