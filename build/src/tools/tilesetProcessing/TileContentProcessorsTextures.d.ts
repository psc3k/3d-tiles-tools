import { KtxEtc1sOptions } from "../../ktx";
import { KtxUastcOptions } from "../../ktx";
import { TileContentProcessor } from "./TileContentProcessor";
/**
 * Methods to create `TileContentProcessor` instances that
 * process the textures of GLB tile content.
 *
 * Implementation note:
 * The implementation is based on glTF-Transform, but this is
 * not visible in the interface.
 *
 * @internal
 */
export declare class TileContentProcessorsTextures {
    /**
     * Creates a `TileContentProcessor` that encodes all textures
     * in GLB tile content to KTX.
     *
     * It will process each tile content that has the content
     * type `ContentDataTypes.CONTENT_TYPE_GLB`, and convert
     * the textures to KTX, using the given encoding options.
     *
     * Further details about the behavior are intentionally not
     * specified here.
     *
     * @param etc1sOptions - The options for ETC1S compression
     * @param uastcOptions - The options for UASTC compression
     * @returns The `TileContentProcessor`
     */
    static encodeToKtx(etc1sOptions: KtxEtc1sOptions, uastcOptions: KtxUastcOptions): TileContentProcessor;
}
//# sourceMappingURL=TileContentProcessorsTextures.d.ts.map