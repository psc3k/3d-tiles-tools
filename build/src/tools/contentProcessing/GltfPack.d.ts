/// <reference types="node" />
/// <reference types="node" />
import { GltfPackOptions } from "./GltfPackOptions";
/**
 * Utility class for using gltfpack in the 3D Tiles tools
 *
 * @internal
 */
export declare class GltfPack {
    /**
     * Process the given input GLB data with gltfpack and the given
     * options, and return the result.
     *
     * @param inputGlb - The input GLB buffer
     * @param options - The options for gltfpack
     * @returns The processed buffer
     */
    static process(inputGlb: Buffer, options: GltfPackOptions): Promise<Buffer>;
    /**
     * Translate the given options into gltfpack command line arguments
     * @param options - The gltfpack options
     * @returns The command line arguments
     */
    private static createCommandLineArguments;
}
//# sourceMappingURL=GltfPack.d.ts.map