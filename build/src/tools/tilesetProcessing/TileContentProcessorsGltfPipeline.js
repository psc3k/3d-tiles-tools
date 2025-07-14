"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileContentProcessorsGltfPipeline = void 0;
const gltf_pipeline_1 = __importDefault(require("gltf-pipeline"));
const base_1 = require("../../base");
/**
 * Methods to create `TileContentProcessor` instances that
 * process GLB data with `gltf-pipeline`.
 *
 * @internal
 */
class TileContentProcessorsGltfPipeline {
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
    static create(options) {
        const tileContentProcessor = async (inputContentData, type) => {
            if (type !== base_1.ContentDataTypes.CONTENT_TYPE_GLB) {
                return inputContentData;
            }
            const result = await gltf_pipeline_1.default.processGlb(inputContentData, options);
            return result.glb;
        };
        return tileContentProcessor;
    }
}
exports.TileContentProcessorsGltfPipeline = TileContentProcessorsGltfPipeline;
//# sourceMappingURL=TileContentProcessorsGltfPipeline.js.map