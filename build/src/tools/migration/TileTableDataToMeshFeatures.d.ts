import { Document } from "@gltf-transform/core";
import { Primitive } from "@gltf-transform/core";
import { Accessor } from "@gltf-transform/core";
import { MeshFeaturesFeatureId as FeatureId } from "../../gltf-extensions";
/**
 * Methods related to the conversion of legacy tile table data
 * to the `EXT_mesh_features` extension.
 *
 * @internal
 */
export declare class TileTableDataToMeshFeatures {
    /**
     * Convert the `_BATCHID` or `BATCHID` attribute in the given
     * primitive into an instance of the `ETX_mesh_features`
     * extension that is associated with this primitive, storing
     * the former batch ID attribute as a new `_FEATURE_ID_0` attribute.
     *
     * Note that this will set the former batch ID attributes
     * in the given primitive to `null`, but it will not dispose
     * the corresponding accessors. These have to be disposed
     * after all primitives have been processed.
     *
     * If the given primitive does not contain a batch ID attribute,
     * then a warning will be printed, and `undefined` will be
     * returned.
     *
     * @param document - The glTF-Transform document
     * @param primitive - The glTF-Transform primitive
     * @param batchIdToFeatureIdAccessor - A mapping from former
     * batch ID accessors to feature ID acccessors, to keep
     * track of the accessors that have already been converted
     * @returns The glTF-Transform `FeatureId` object that has
     * been created
     * @throws TileFormatError If the given primitive does not
     * contain a valid `_BATCHID` or `BATCHID` attribute.
     */
    static convertBatchIdToMeshFeatures(document: Document, primitive: Primitive, batchIdToFeatureIdAccessor: Map<Accessor, Accessor>): FeatureId | undefined;
}
//# sourceMappingURL=TileTableDataToMeshFeatures.d.ts.map