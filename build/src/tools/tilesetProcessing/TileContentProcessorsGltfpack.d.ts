import { TileContentProcessor } from "./TileContentProcessor";
import { GltfPackOptions } from "../contentProcessing/GltfPackOptions";
/**
 * Methods to create `TileContentProcessor` instances that
 * process GLB data with `gltfpack`.
 *
 * @internal
 */
export declare class TileContentProcessorsGltfpack {
    /**
     * Creates a `TileContentProcessor` that processes each GLB
     * tile content with `gltfpack`.
     *
     * It will process each tile content that has the content
     * type `ContentDataTypes.CONTENT_TYPE_GLB`, by calling
     * `gltfpack` with the given options.
     *
     * @param options - The options for `gltfpack`
     * @returns The `TileContentProcessor`
     */
    static create(options: GltfPackOptions): TileContentProcessor;
}
//# sourceMappingURL=TileContentProcessorsGltfpack.d.ts.map