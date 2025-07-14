import { ExtensionProperty } from "@gltf-transform/core";
import { IProperty } from "@gltf-transform/core";
import { PropertyType } from "@gltf-transform/core";
import { PropertyTable } from "./StructuralMetadata";
declare const NAME = "EXT_mesh_features";
interface IInstanceFeatures extends IProperty {
    featureIds: FeatureId[];
}
interface IFeatureId extends IProperty {
    featureCount: number;
    nullFeatureId: number | null;
    label: string | null;
    attribute: FeatureIdAttribute | null;
    propertyTable: PropertyTable;
}
type FeatureIdAttribute = number;
/**
 * Main model class for `EXT_instance_features`
 *
 * @internal
 */
export declare class InstanceFeatures extends ExtensionProperty<IInstanceFeatures> {
    static EXTENSION_NAME: string;
    extensionName: typeof NAME;
    propertyType: "InstanceFeatures";
    parentTypes: [PropertyType.NODE];
    protected init(): void;
    protected getDefaults(): import("@gltf-transform/core").Nullable<IInstanceFeatures> & {
        featureIds: never[];
    };
    listFeatureIds(): FeatureId[];
    addFeatureId(featureId: FeatureId): this;
    removeFeatureId(featureId: FeatureId): this;
}
/**
 * Implementation of a feature ID for `EXT_instance_features`
 *
 * @internal
 */
export declare class FeatureId extends ExtensionProperty<IFeatureId> {
    static EXTENSION_NAME: string;
    extensionName: typeof NAME;
    propertyType: "FeatureId";
    parentTypes: ["InstanceFeatures"];
    protected init(): void;
    protected getDefaults(): import("@gltf-transform/core").Nullable<IFeatureId> & {
        nullFeatureId: null;
        label: null;
        attribute: null;
        propertyTable: null;
    };
    getFeatureCount(): number;
    setFeatureCount(featureCount: number): this;
    getNullFeatureId(): number | null;
    setNullFeatureId(nullFeatureId: number | null): this;
    getLabel(): string | null;
    setLabel(label: string | null): this;
    getAttribute(): FeatureIdAttribute | null;
    setAttribute(attribute: FeatureIdAttribute | null): this;
    getPropertyTable(): PropertyTable | null;
    setPropertyTable(propertyTable: PropertyTable | null): this;
}
export {};
//# sourceMappingURL=InstanceFeatures.d.ts.map