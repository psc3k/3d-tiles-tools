import { Document } from "@gltf-transform/core";
/**
 * Utilities related to the glTF `EXT_instance_features` extension.
 *
 * @internal
 */
export declare class InstanceFeaturesUtils {
    /**
     * Creates an string representation of the `EXT_instance_features`
     * that is contained in the given glTF Transform document.
     *
     * The exact format and contents of this string is not specified
     *
     * @param document - The glTF Transform document
     * @returns The string
     */
    static createInstanceFeaturesInfoString(document: Document): string;
    private static createInstancesFeaturesString;
    private static createInstanceFeaturesString;
    private static createFeatureIdString;
}
//# sourceMappingURL=InstanceFeaturesUtils.d.ts.map