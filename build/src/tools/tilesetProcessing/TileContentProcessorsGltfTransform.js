"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileContentProcessorsGltfTransform = void 0;
const base_1 = require("../../base");
const GltfTransform_1 = require("../contentProcessing/GltfTransform");
/**
 * Methods to create `TileContentProcessor` instances that
 * process GLB data with `gltf-Transform`.
 *
 * @internal
 */
class TileContentProcessorsGltfTransform {
    /**
     * Creates a `TileContentProcessor` that processes each GLB
     * tile content with `gltf-Transform`.
     *
     * It will process each tile content that has the content
     * type `ContentDataTypes.CONTENT_TYPE_GLB`, by calling
     * the `gltf-Transform` 'transform' method with the
     * input content data, applying the given transforms.
     *
     * @param transforms - The `gltf-Transform` `Transform` instances
     * @returns The `TileContentProcessor`
     */
    static create(...transforms) {
        const tileContentProcessor = async (inputContentData, type) => {
            if (type !== base_1.ContentDataTypes.CONTENT_TYPE_GLB) {
                return inputContentData;
            }
            return GltfTransform_1.GltfTransform.process(inputContentData, ...transforms);
        };
        return tileContentProcessor;
    }
}
exports.TileContentProcessorsGltfTransform = TileContentProcessorsGltfTransform;
//# sourceMappingURL=TileContentProcessorsGltfTransform.js.map