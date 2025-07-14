import { Document } from "@gltf-transform/core";
/**
 * Utilities related to the glTF `EXT_structural_metadata` extension.
 *
 * @internal
 */
export declare class StructuralMetadataUtils {
    /**
     * Creates an string representation of the `EXT_structural_metadata`
     * that is contained in the given glTF Transform document.
     *
     * The exact format and contents of this string is not specified
     *
     * @param document - The glTF Transform document
     * @returns The string
     */
    static createStructuralMetadataInfoString(document: Document): string;
    private static createStructuralMetadataString;
    private static createPropertyTableString;
    private static createPropertyTablePropertyValuesString;
    private static createPropertyTablePropertyString;
    private static createSchemaString;
    private static createClassString;
    private static createClassPropertyString;
    private static createMeshesMetadataString;
    private static createPrimitivesMetadataString;
    private static createMeshPrimitiveMetadataString;
    private static createPropertyTextureString;
    private static createPropertyTexturePropertyString;
    private static createPropertyAttributeString;
    private static createPropertyAttributePropertyString;
}
//# sourceMappingURL=StructuralMetadataUtils.d.ts.map