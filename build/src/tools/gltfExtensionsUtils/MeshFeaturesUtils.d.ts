import { Document } from "@gltf-transform/core";
/**
 * Utilities related to the glTF `EXT_mesh_features` extension.
 *
 * @internal
 */
export declare class MeshFeaturesUtils {
    /**
     * Creates an string representation of the `EXT_mesh_features`
     * that is contained in the given glTF Transform document.
     *
     * The exact format and contents of this string is not specified
     *
     * @param document - The glTF Transform document
     * @returns The string
     */
    static createMeshFeaturesInfoString(document: Document): string;
    private static createMeshesFeaturesString;
    private static createPrimitivesFeaturesString;
    private static createMeshFeaturesString;
    private static createFeatureIdString;
}
//# sourceMappingURL=MeshFeaturesUtils.d.ts.map