"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileContentProcessorsGltfpack = void 0;
const base_1 = require("../../base");
const GltfPack_1 = require("../contentProcessing/GltfPack");
/**
 * Methods to create `TileContentProcessor` instances that
 * process GLB data with `gltfpack`.
 *
 * @internal
 */
class TileContentProcessorsGltfpack {
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
    static create(options) {
        const tileContentProcessor = async (inputContentData, type) => {
            if (type !== base_1.ContentDataTypes.CONTENT_TYPE_GLB) {
                return inputContentData;
            }
            return GltfPack_1.GltfPack.process(inputContentData, options);
        };
        return tileContentProcessor;
    }
}
exports.TileContentProcessorsGltfpack = TileContentProcessorsGltfpack;
//# sourceMappingURL=TileContentProcessorsGltfpack.js.map