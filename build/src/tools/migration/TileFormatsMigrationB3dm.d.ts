/// <reference types="node" />
/// <reference types="node" />
/**
 * Methods for converting B3DM tile data into GLB
 *
 * @internal
 */
export declare class TileFormatsMigrationB3dm {
    /**
     * Convert the given B3DM data into a glTF asset
     *
     * @param b3dmBuffer - The B3DM buffer
     * @param gltfUpAxis - The up-axis to assume for the glTF data in
     * the given B3DM, defaulting to "Y".
     * @returns The GLB buffer
     */
    static convertB3dmToGlb(b3dmBuffer: Buffer, gltfUpAxis: "X" | "Y" | "Z" | undefined): Promise<Buffer>;
}
//# sourceMappingURL=TileFormatsMigrationB3dm.d.ts.map