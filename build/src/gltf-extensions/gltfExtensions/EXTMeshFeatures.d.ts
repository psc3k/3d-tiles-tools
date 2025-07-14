import { Extension } from "@gltf-transform/core";
import { ReaderContext } from "@gltf-transform/core";
import { WriterContext } from "@gltf-transform/core";
import { FeatureId } from "./MeshFeatures";
import { FeatureIdTexture } from "./MeshFeatures";
import { MeshFeatures } from "./MeshFeatures";
/**
 * [`EXT_mesh_features`](https://github.com/CesiumGS/glTF/tree/proposal-EXT_mesh_features/extensions/2.0/Vendor/EXT_mesh_features/)
 * defines a means of assigning identifiers to geometry and subcomponents of geometry within a glTF 2.0 asset.
 *
 * Properties:
 * - {@link MeshFeatures}
 * - {@link MeshFeaturesFeatureId}
 * - {@link FeatureIdTexture}
 *
 * ### Example
 *
 * ```typescript
 * const document = new Document();
 *
 * // Create an Extension attached to the Document.
 * const extMeshFeatures = document.createExtension(EXTMeshFeatures);
 *
 * // Define an array of IDs
 * const ids = [ 12, 23, 34, 45, 56, 78, 78, 89, 90 ];
 *
 * // Put the IDs into an `Accessor`
 * const buffer = document.createBuffer();
 * const accessor = document.createAccessor();
 * accessor.setBuffer(buffer);
 * accessor.setType(Accessor.Type.SCALAR);
 * accessor.setArray(new Int16Array(ids));
 *
 * // Create a mesh `Primitive`
 * const primitive = document.createPrimitive();
 *
 * // Set the IDs as one attribute of the `Primitive`
 * const attributeNumber = 2;
 * primitive.setAttribute(`_FEATURE_ID_${attributeNumber}`, accessor);
 *
 * // Create a `FeatureId` object. This object indicates that the IDs
 * // are stored in the attribute `_FEATURE_ID_${attributeNumber}`
 * const featureId = extMeshFeatures.createFeatureId();
 * featureId.setFeatureCount(new Set(ids).size);
 * featureId.setAttribute(attributeNumber);
 *
 * // Create a `MeshFeatures` object that contains the
 * // created `FeatureID`, and store it as an extension
 * // object in the `Primitive`
 * const meshFeatures = extMeshFeatures.createMeshFeatures();
 * meshFeatures.addFeatureId(featureId);
 * primitive.setExtension("EXT_mesh_features", meshFeatures);
 *
 * // Assign the `Primitive` to a `Mesh`
 * const mesh = document.createMesh();
 * mesh.addPrimitive(primitive);
 *
 * // Create an IO object and register the extension
 * const io = new NodeIO();
 * io.registerExtensions([EXTMeshFeatures]);
 *
 * // Write the document as JSON
 * const written = await io.writeJSON(document);
 * ```
 *
 * @internal
 */
export declare class EXTMeshFeatures extends Extension {
    readonly extensionName = "EXT_mesh_features";
    static EXTENSION_NAME: string;
    createMeshFeatures(): MeshFeatures;
    createFeatureId(): FeatureId;
    createFeatureIdTexture(): FeatureIdTexture;
    read(context: ReaderContext): this;
    private readPrimitive;
    private readFeatureId;
    private readFeatureIdTexture;
    write(context: WriterContext): this;
    private writePrimitive;
    private createFeatureIdDef;
}
//# sourceMappingURL=EXTMeshFeatures.d.ts.map