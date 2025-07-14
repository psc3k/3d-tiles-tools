import { TileContentProcessor } from "./TileContentProcessor";
/**
 * Methods to create `TileContentProcessor` instances that
 * process GLB data with `gltf-pipeline`.
 *
 * @internal
 */
export declare class TileContentProcessorsGltfPipeline {
    /**
     * Creates a `TileContentProcessor` that processes each GLB
     * tile content with `gltf-pipeline`.
     *
     * It will process each tile content that has the content
     * type `ContentDataTypes.CONTENT_TYPE_GLB`, by calling
     * the `gltf-pipeline` `processGlb` method with the input
     * content data and the given options.
     *
     * @param options - The options for `gltf-pipeline`
     * @returns The `TileContentProcessor`
     */
    static create(options: any): TileContentProcessor;
}
//# sourceMappingURL=TileContentProcessorsGltfPipeline.d.ts.map