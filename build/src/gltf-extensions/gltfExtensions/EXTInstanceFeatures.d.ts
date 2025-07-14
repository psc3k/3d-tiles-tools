import { Extension } from "@gltf-transform/core";
import { ReaderContext } from "@gltf-transform/core";
import { WriterContext } from "@gltf-transform/core";
import { FeatureId } from "./InstanceFeatures";
import { InstanceFeatures } from "./InstanceFeatures";
/**
 * [`EXT_instance_features`](https://github.com/CesiumGS/glTF/blob/3d-tiles-next/extensions/2.0/Vendor/EXT_instance_features/)
 * defines a means of assigning identifiers to instances that are created with the `EXT_mesh_gpu_instancing` extension.
 *
 * Properties:
 * - {@link InstanceFeatures}
 * - {@link InstanceFeaturesFeatureId}
 *
 * @internal
 */
export declare class EXTInstanceFeatures extends Extension {
    readonly extensionName = "EXT_instance_features";
    static EXTENSION_NAME: string;
    createInstanceFeatures(): InstanceFeatures;
    createFeatureId(): FeatureId;
    read(context: ReaderContext): this;
    private readNode;
    private readFeatureId;
    write(context: WriterContext): this;
    private writeNode;
    private createFeatureIdDef;
}
//# sourceMappingURL=EXTInstanceFeatures.d.ts.map