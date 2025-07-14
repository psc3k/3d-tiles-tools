"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GltfTransform = void 0;
const draco3d_1 = __importDefault(require("draco3d"));
const meshoptimizer_1 = require("meshoptimizer");
const meshoptimizer_2 = require("meshoptimizer");
const core_1 = require("@gltf-transform/core");
const core_2 = require("@gltf-transform/core");
const core_3 = require("@gltf-transform/core");
const functions_1 = require("@gltf-transform/functions");
const functions_2 = require("@gltf-transform/functions");
const extensions_1 = require("@gltf-transform/extensions");
const gltf_extensions_1 = require("../../gltf-extensions");
const gltf_extensions_2 = require("../../gltf-extensions");
const gltf_extensions_3 = require("../../gltf-extensions");
const StructuralMetadataMerger_1 = require("../gltfExtensionsUtils/StructuralMetadataMerger");
/**
 * Utilities for using glTF-Transform in the 3D Tiles tools
 *
 * @internal
 */
class GltfTransform {
    /**
     * Returns the `gltf-transform` `NodeIO` instance, preconfigured
     * for the use in the 3D Tiles Tools.
     *
     * (E.g. it will be configured to handle the all extensions that
     * are known in glTF-Transform, as well as EXT_mesh_features and
     * EXT_structural_metadata, and have draco- and meshopt
     * encoders/decoders)
     *
     * @returns - The `NodeIO` instance
     */
    static async getIO() {
        if (GltfTransform.io) {
            return GltfTransform.io;
        }
        const io = new core_3.NodeIO();
        io.registerExtensions(extensions_1.ALL_EXTENSIONS).registerDependencies({
            "draco3d.decoder": await draco3d_1.default.createDecoderModule(),
            "draco3d.encoder": await draco3d_1.default.createEncoderModule(),
            "meshopt.decoder": meshoptimizer_1.MeshoptDecoder,
            "meshopt.encoder": meshoptimizer_2.MeshoptEncoder,
        });
        // Note: The order of these calls matters. The EXTMeshFeatures and
        // EXTInstanceFeatures depend on the EXTStructuralMetadata, because
        // they may refer to PropertyTable objects via their FeatureId.
        // So the EXTStructuralMetadata has to be read first.
        io.registerExtensions([gltf_extensions_1.EXTStructuralMetadata]);
        io.registerExtensions([gltf_extensions_2.EXTMeshFeatures]);
        io.registerExtensions([gltf_extensions_3.EXTInstanceFeatures]);
        GltfTransform.io = io;
        return io;
    }
    /**
     * Calls `gltf-transform` on a GLB buffer and returns the transformed
     * buffer.
     *
     * It will read the GLB data, apply the `transform` call to the
     * resulting `Document` (using the given `Transform` instances),
     * and return a GLB buffer that was crated from the transformed
     * document.
     *
     * @param transforms - The `gltf-transform` `Transform` instances
     * @returns The function
     */
    static async process(inputGlb, ...transforms) {
        const io = await GltfTransform.getIO();
        const document = await io.readBinary(inputGlb);
        await document.transform(...transforms);
        const outputGlb = await io.writeBinary(document);
        return Buffer.from(outputGlb);
    }
    /**
     * Combine all scenes in the given document into one.
     *
     * This will take the first scene, declare it as the default scene,
     * attach the nodes from all other scenes to this one, and dispose
     * the other scenes.
     *
     * @param document - The glTF-Transform document
     */
    static async combineScenes(document) {
        const root = document.getRoot();
        const scenes = root.listScenes();
        if (scenes.length > 0) {
            const combinedScene = scenes[0];
            root.setDefaultScene(combinedScene);
            for (let s = 1; s < scenes.length; s++) {
                const otherScene = scenes[s];
                const children = otherScene.listChildren();
                for (const child of children) {
                    combinedScene.addChild(child);
                    otherScene.removeChild(child);
                }
                otherScene.dispose();
            }
        }
        document.setLogger(new core_2.Logger(core_2.Logger.Verbosity.WARN));
        await document.transform((0, functions_1.prune)());
    }
    /**
     * Creates a single glTF Transform document from the given GLB buffers.
     *
     * This will create a document with a single scene that contains all
     * nodes that have been children of any scene in the given input
     * GLBs.
     *
     * @param inputGlbBuffers - The buffers containing GLB data
     * @param schemaUriResolver - A function that can resolve the `schemaUri`
     * and return the metadata schema JSON object
     * @returns The merged document
     */
    static async merge(inputGlbBuffers, schemaUriResolver) {
        // Create one document from each buffer and merge them
        const io = await GltfTransform.getIO();
        const mergedDocument = new core_1.Document();
        for (const inputGlbBuffer of inputGlbBuffers) {
            const inputDocument = await io.readBinary(inputGlbBuffer);
            await StructuralMetadataMerger_1.StructuralMetadataMerger.mergeDocumentsWithStructuralMetadata(mergedDocument, inputDocument, schemaUriResolver);
        }
        // Combine all scenes into one
        await GltfTransform.combineScenes(mergedDocument);
        await mergedDocument.transform((0, functions_2.unpartition)());
        const root = mergedDocument.getRoot();
        const asset = root.getAsset();
        asset.generator = "glTF-Transform";
        return mergedDocument;
    }
}
exports.GltfTransform = GltfTransform;
//# sourceMappingURL=GltfTransform.js.map