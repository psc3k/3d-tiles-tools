/// <reference types="node" />
/// <reference types="node" />
import { Document } from "@gltf-transform/core";
import { Transform } from "@gltf-transform/core";
import { NodeIO } from "@gltf-transform/core";
/**
 * Utilities for using glTF-Transform in the 3D Tiles tools
 *
 * @internal
 */
export declare class GltfTransform {
    /**
     * The `gltf-transform` IO handler, initialized lazily and cached
     * in `getIO`.
     */
    private static io;
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
    static getIO(): Promise<NodeIO>;
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
    static process(inputGlb: Buffer, ...transforms: Transform[]): Promise<Buffer>;
    /**
     * Combine all scenes in the given document into one.
     *
     * This will take the first scene, declare it as the default scene,
     * attach the nodes from all other scenes to this one, and dispose
     * the other scenes.
     *
     * @param document - The glTF-Transform document
     */
    private static combineScenes;
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
    static merge(inputGlbBuffers: Buffer[], schemaUriResolver: (schemaUri: string) => Promise<any>): Promise<Document>;
}
//# sourceMappingURL=GltfTransform.d.ts.map