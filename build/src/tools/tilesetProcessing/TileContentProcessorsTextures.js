"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileContentProcessorsTextures = void 0;
const TileContentProcessorsGltfTransform_1 = require("./TileContentProcessorsGltfTransform");
const GltfTransformTextures_1 = require("../contentProcessing/GltfTransformTextures");
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
class TileContentProcessorsTextures {
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
    static encodeToKtx(etc1sOptions, uastcOptions) {
        const transform = GltfTransformTextures_1.GltfTransformTextures.createTransformTexturesToKtx(etc1sOptions, uastcOptions);
        return TileContentProcessorsGltfTransform_1.TileContentProcessorsGltfTransform.create(transform);
    }
}
exports.TileContentProcessorsTextures = TileContentProcessorsTextures;
//# sourceMappingURL=TileContentProcessorsTextures.js.map