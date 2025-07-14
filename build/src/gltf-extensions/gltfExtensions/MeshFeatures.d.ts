import { ExtensionProperty } from "@gltf-transform/core";
import { Texture } from "@gltf-transform/core";
import { TextureInfo } from "@gltf-transform/core";
import { IProperty } from "@gltf-transform/core";
import { PropertyType } from "@gltf-transform/core";
import { PropertyTable } from "./StructuralMetadata";
declare const NAME = "EXT_mesh_features";
interface IMeshFeatures extends IProperty {
    featureIds: FeatureId[];
}
interface IFeatureId extends IProperty {
    featureCount: number;
    nullFeatureId: number | null;
    label: string | null;
    attribute: FeatureIdAttribute | null;
    texture: FeatureIdTexture;
    propertyTable: PropertyTable;
}
type FeatureIdAttribute = number;
interface IFeatureIdTexture extends IProperty {
    channels: number[];
    texture: Texture;
    textureInfo: TextureInfo;
}
/**
 * Main model class of `EXT_mesh_features`
 *
 * @internal
 */
export declare class MeshFeatures extends ExtensionProperty<IMeshFeatures> {
    static EXTENSION_NAME: string;
    extensionName: typeof NAME;
    propertyType: "MeshFeatures";
    parentTypes: [PropertyType.PRIMITIVE];
    protected init(): void;
    protected getDefaults(): import("@gltf-transform/core").Nullable<IMeshFeatures> & {
        featureIds: never[];
    };
    listFeatureIds(): FeatureId[];
    addFeatureId(featureId: FeatureId): this;
    removeFeatureId(featureId: FeatureId): this;
}
/**
 * Implementation of a feature ID for `EXT_mesh_features`
 *
 * @internal
 */
export declare class FeatureId extends ExtensionProperty<IFeatureId> {
    static EXTENSION_NAME: string;
    extensionName: typeof NAME;
    propertyType: "FeatureId";
    parentTypes: ["MeshFeatures"];
    protected init(): void;
    protected getDefaults(): import("@gltf-transform/core").Nullable<IFeatureId> & {
        nullFeatureId: null;
        label: null;
        attribute: null;
        texture: null;
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
    getTexture(): FeatureIdTexture | null;
    setTexture(texture: FeatureIdTexture | null): this;
    getPropertyTable(): PropertyTable | null;
    setPropertyTable(propertyTable: PropertyTable | null): this;
}
/**
 * Implementation of a feature ID texture for `EXT_mesh_features`
 *
 * @internal
 */
export declare class FeatureIdTexture extends ExtensionProperty<IFeatureIdTexture> {
    static EXTENSION_NAME: string;
    extensionName: typeof NAME;
    propertyType: "FeatureIdTexture";
    parentTypes: ["FeatureId"];
    protected init(): void;
    protected getDefaults(): import("@gltf-transform/core").Nullable<IFeatureIdTexture> & {
        channels: number[];
        texture: null;
        textureInfo: TextureInfo;
    };
    getChannels(): number[];
    setChannels(channels: number[]): this;
    getTexture(): Texture | null;
    setTexture(texture: Texture | null): this;
    getTextureInfo(): TextureInfo | null;
}
export {};
//# sourceMappingURL=MeshFeatures.d.ts.map