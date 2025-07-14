import { Document } from "@gltf-transform/core";
import { Primitive } from "@gltf-transform/core";
import { ReadablePointCloud } from "./ReadablePointCloud";
/**
 * An internal interface representing a point cloud with
 * glTF-Transform structures.
 *
 * @internal
 */
export interface GltfTransformPointCloud {
    /**
     * The actual document that represents the point cloud
     */
    document: Document;
    /**
     * The one and only primitive that contains the point data
     */
    primitive: Primitive;
}
/**
 * Methods to create glTF representations of point clouds
 *
 * @internal
 */
export declare class GltfTransformPointClouds {
    /**
     * Creates a point cloud representation, based on glTF-Transform,
     * from the given `ReadablePointCloud` input.
     *
     * Many details about the result are intentionally not
     * specified. It is supposed to be "just a point cloud".
     *
     * However, some details depend on the given parameters:
     *
     * When `mayRequireAlpha` is `false`, then a point cloud with RGB colors
     * and an OPAQUE alpha mode material will be created.
     * Otherwise, the implementation will still check thea actual colors: If
     * any of them has a non-1.0 alpha component, then it will create a
     * point cloud with a BLEND alpha mode material and RGBA colors.
     *
     * @param readablePointCloud - The `ReadablePointCloud`
     * @param mayRequireAlpha - Whether the point cloud may
     * require an alpha component for its colors.
     * @returns The GltfTransformPointCloud
     * @throws TileFormatError If the input data does not
     * at least contain a `POSITION` attribute.
     */
    static build(readablePointCloud: ReadablePointCloud, mayRequireAlpha: boolean): GltfTransformPointCloud;
    /**
     * Returns whether the given colors require an alpha component.
     *
     * This takes normalized linear colors with RGBA components
     * (given as a flat array), and returns whether the alpha
     * component of any of these colors is not 1.0.
     *
     * @param normalizedColorsRGBA - The colors
     * @returns Whether the colors require an alpha component
     */
    private static doesRequireAlpha;
    /**
     * If the given point cloud contains attributes that match
     * the pattern `"_FEATURE_ID_<x>"` with `<x>` being a
     * number, then these attributes will be stored in the
     * mesh primitive using the `EXT_mesh_features` extension.
     *
     * @param readablePointCloud - The `ReadablePointCloud`
     * @param document - The glTF-Transform document
     * @param buffer - The glTF-Transform buffer
     * @param primitive - The glTF-Transform primitive
     * @param propertyTable - An optional property table
     * to assign to the feature IDs
     */
    private static assignFeatureIdAttributes;
    /**
     * Applies the glTF-Transform `quantize` operation to the given
     * document (if either argument is `true`).
     *
     * This will perform a quantization of the positions and normals,
     * depending on the arguments, with an unspecified number of bits,
     * and add the `KHR_mesh_quantization` extension as a required
     * extension to the document.
     *
     * @param document - The document
     * @param quantizePositions - Whether positions are quantized
     * @param quantizeNormals - Whether normals are quantized
     * @returns A promise that resolves when the operation is finished
     */
    static applyQuantization(document: Document, quantizePositions: boolean, quantizeNormals: boolean): Promise<void>;
}
//# sourceMappingURL=GltfTransformPointClouds.d.ts.map