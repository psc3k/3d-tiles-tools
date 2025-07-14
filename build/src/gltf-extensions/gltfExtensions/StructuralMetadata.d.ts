import { ExtensionProperty } from "@gltf-transform/core";
import { Texture } from "@gltf-transform/core";
import { TextureInfo } from "@gltf-transform/core";
import { IProperty } from "@gltf-transform/core";
import { PropertyType } from "@gltf-transform/core";
import { ClassPropertyType } from "./EXTStructuralMetadata";
import { ClassPropertyComponentType } from "./EXTStructuralMetadata";
import { EnumValueType } from "./EXTStructuralMetadata";
import { PropertyTablePropertyOffsetType } from "./EXTStructuralMetadata";
declare const NAME = "EXT_structural_metadata";
interface IStructuralMetadata extends IProperty {
    schema: Schema;
    schemaUri: string | null;
    propertyTables: PropertyTable[];
    propertyTextures: PropertyTexture[];
    propertyAttributes: PropertyAttribute[];
}
interface ISchema extends IProperty {
    id: string;
    objectName: string | null;
    description: string | null;
    version: string | null;
    classes: {
        [key: string]: Class;
    };
    enums: {
        [key: string]: Enum;
    };
}
interface IClass extends IProperty {
    objectName: string | null;
    description: string | null;
    properties: {
        [key: string]: ClassProperty;
    };
}
interface IClassProperty extends IProperty {
    objectName: string | null;
    description: string | null;
    type: ClassPropertyType;
    componentType: ClassPropertyComponentType | null;
    enumType: string | null;
    array: boolean;
    count: number | null;
    normalized: boolean;
    offset: any;
    scale: any;
    max: any;
    min: any;
    required: boolean;
    noData: any;
    default: any;
}
interface IEnum extends IProperty {
    objectName: string | null;
    description: string | null;
    valueType: EnumValueType;
    values: EnumValue[];
}
interface IEnumValue extends IProperty {
    objectName: string;
    description: string | null;
    value: number;
}
interface IPropertyTable extends IProperty {
    objectName: string | null;
    class: string;
    count: number;
    properties: {
        [key: string]: PropertyTableProperty;
    };
}
interface IPropertyTableProperty extends IProperty {
    values: Uint8Array;
    arrayOffsets: Uint8Array;
    stringOffsets: Uint8Array;
    arrayOffsetType: PropertyTablePropertyOffsetType;
    stringOffsetType: PropertyTablePropertyOffsetType;
    offset: any;
    scale: any;
    max: any;
    min: any;
}
interface IPropertyTexture extends IProperty {
    objectName: string | null;
    class: string;
    properties: {
        [key: string]: PropertyTextureProperty;
    };
}
interface IPropertyTextureProperty extends IProperty {
    channels: number[];
    offset: any;
    scale: any;
    max: any;
    min: any;
    texture: Texture;
    textureInfo: TextureInfo;
}
interface IPropertyAttribute extends IProperty {
    objectName: string | null;
    class: string;
    properties: {
        [key: string]: PropertyAttributeProperty;
    };
}
interface IPropertyAttributeProperty extends IProperty {
    attribute: string;
    offset: any;
    scale: any;
    max: any;
    min: any;
}
interface IElementStructuralMetadata extends IProperty {
    propertyTable: PropertyTable;
    index: number | null;
}
interface IMeshPrimitiveStructuralMetadata extends IProperty {
    propertyTextures: PropertyTexture[];
    propertyAttributes: PropertyAttribute[];
}
/**
 * Main model class for `EXT_structural_metadata`
 *
 * @internal
 */
export declare class StructuralMetadata extends ExtensionProperty<IStructuralMetadata> {
    static EXTENSION_NAME: string;
    extensionName: typeof NAME;
    propertyType: "StructuralMetadata";
    parentTypes: [PropertyType.ROOT];
    protected init(): void;
    protected getDefaults(): import("@gltf-transform/core").Nullable<IStructuralMetadata> & {
        schema: null;
        schemaUri: null;
        propertyTables: never[];
        propertyTextures: never[];
        propertyAttributes: never[];
    };
    getSchema(): Schema | null;
    setSchema(schema: Schema | null): this;
    getSchemaUri(): string | null;
    setSchemaUri(schemaUri: string | null): this;
    listPropertyTables(): PropertyTable[];
    addPropertyTable(propertyTable: PropertyTable): this;
    removePropertyTable(propertyTable: PropertyTable): this;
    listPropertyTextures(): PropertyTexture[];
    addPropertyTexture(propertyTexture: PropertyTexture): this;
    removePropertyTexture(propertyTexture: PropertyTexture): this;
    listPropertyAttributes(): PropertyAttribute[];
    addPropertyAttribute(propertyAttribute: PropertyAttribute): this;
    removePropertyAttribute(propertyAttribute: PropertyAttribute): this;
}
/**
 * Implementation of a metadata schema for `EXT_structural_metadata`
 *
 * @internal
 */
export declare class Schema extends ExtensionProperty<ISchema> {
    static EXTENSION_NAME: string;
    extensionName: typeof NAME;
    propertyType: "Schema";
    parentTypes: ["StructuralMetadata"];
    protected init(): void;
    protected getDefaults(): import("@gltf-transform/core").Nullable<ISchema> & {
        objectName: null;
        description: null;
        version: null;
        classes: {};
        enums: {};
    };
    getId(): string;
    setId(name: string): this;
    getObjectName(): string | null;
    setObjectName(name: string | null): this;
    getDescription(): string | null;
    setDescription(description: string | null): this;
    getVersion(): string | null;
    setVersion(version: string | null): this;
    setClass(key: string, value: Class | null): this;
    getClass(key: string): Class | null;
    listClassKeys(): string[];
    listClassValues(): Class[];
    setEnum(key: string, value: Enum | null): this;
    getEnum(key: string): Enum | null;
    listEnumKeys(): string[];
    listEnumValues(): Enum[];
}
/**
 * Implementation of a metadata class for `EXT_structural_metadata`
 *
 * @internal
 */
export declare class Class extends ExtensionProperty<IClass> {
    static EXTENSION_NAME: string;
    extensionName: typeof NAME;
    propertyType: "Class";
    parentTypes: ["Schema"];
    protected init(): void;
    protected getDefaults(): import("@gltf-transform/core").Nullable<IClass> & {
        objectName: null;
        description: null;
        properties: {};
    };
    getObjectName(): string | null;
    setObjectName(name: string | null): this;
    getDescription(): string | null;
    setDescription(description: string | null): this;
    setProperty(key: string, value: ClassProperty | null): this;
    getProperty(key: string): ClassProperty | null;
    listPropertyKeys(): string[];
    listPropertyValues(): ClassProperty[];
}
/**
 * Implementation of a metadata class property for `EXT_structural_metadata`
 *
 * @internal
 */
export declare class ClassProperty extends ExtensionProperty<IClassProperty> {
    static EXTENSION_NAME: string;
    extensionName: typeof NAME;
    propertyType: "ClassProperty";
    parentTypes: ["Class"];
    protected init(): void;
    protected getDefaults(): import("@gltf-transform/core").Nullable<IClassProperty> & {
        objectName: null;
        description: null;
        componentType: null;
        enumType: null;
        array: null;
        count: null;
        normalized: null;
        offset: null;
        scale: null;
        max: null;
        min: null;
        required: null;
        noData: null;
        default: null;
    };
    getObjectName(): string | null;
    setObjectName(name: string | null): this;
    getDescription(): string | null;
    setDescription(description: string | null): this;
    getType(): ClassPropertyType;
    setType(type: ClassPropertyType): this;
    getComponentType(): ClassPropertyComponentType | null;
    setComponentType(componentType: ClassPropertyComponentType | null): this;
    getEnumType(): string | null;
    setEnumType(enumType: string | null): this;
    getArray(): boolean;
    setArray(array: boolean): this;
    getCount(): number | null;
    setCount(count: number | null): this;
    getNormalized(): boolean;
    setNormalized(normalized: boolean): this;
    getOffset(): any;
    setOffset(offset: any): this;
    getScale(): any;
    setScale(scale: any): this;
    getMax(): any;
    setMax(max: any): this;
    getMin(): any;
    setMin(min: any): this;
    getRequired(): boolean;
    setRequired(required: boolean): this;
    getNoData(): any;
    setNoData(noData: any): this;
    getDefault(): any;
    setDefault(defaultValue: any): this;
}
/**
 * Implementation of a metadata enum for `EXT_structural_metadata`
 *
 * @internal
 */
export declare class Enum extends ExtensionProperty<IEnum> {
    static EXTENSION_NAME: string;
    extensionName: typeof NAME;
    propertyType: "Enum";
    parentTypes: ["Schema"];
    protected init(): void;
    protected getDefaults(): import("@gltf-transform/core").Nullable<IEnum> & {
        objectName: null;
        description: null;
        valueType: string;
        values: never[];
    };
    getObjectName(): string | null;
    setObjectName(name: string | null): this;
    getDescription(): string | null;
    setDescription(description: string | null): this;
    getValueType(): EnumValueType;
    setValueType(valueType: EnumValueType): this;
    listValues(): EnumValue[];
    addEnumValue(enumValue: EnumValue): this;
    removeEnumValue(enumValue: EnumValue): this;
}
/**
 * Implementation of a metadata enum value for `EXT_structural_metadata`
 *
 * @internal
 */
export declare class EnumValue extends ExtensionProperty<IEnumValue> {
    static EXTENSION_NAME: string;
    extensionName: typeof NAME;
    propertyType: "EnumValue";
    parentTypes: ["Enum"];
    protected init(): void;
    protected getDefaults(): import("@gltf-transform/core").Nullable<IEnumValue> & {
        description: null;
    };
    getObjectName(): string;
    setObjectName(name: string): this;
    getDescription(): string | null;
    setDescription(description: string | null): this;
    getValue(): number;
    setValue(value: number): this;
}
/**
 * Implementation of a property table for `EXT_structural_metadata`
 *
 * @internal
 */
export declare class PropertyTable extends ExtensionProperty<IPropertyTable> {
    static EXTENSION_NAME: string;
    extensionName: typeof NAME;
    propertyType: "PropertyTable";
    parentTypes: ["StructuralMetadata"];
    protected init(): void;
    protected getDefaults(): import("@gltf-transform/core").Nullable<IPropertyTable> & {
        objectName: null;
        properties: {};
    };
    getObjectName(): string | null;
    setObjectName(name: string | null): this;
    getClass(): string;
    setClass(className: string): this;
    getCount(): number;
    setCount(count: number): this;
    setProperty(key: string, value: PropertyTableProperty | null): this;
    getProperty(key: string): PropertyTableProperty | null;
    listPropertyKeys(): string[];
    listPropertyValues(): PropertyTableProperty[];
}
/**
 * Implementation of a property table property for `EXT_structural_metadata`
 *
 * @internal
 */
export declare class PropertyTableProperty extends ExtensionProperty<IPropertyTableProperty> {
    static EXTENSION_NAME: string;
    extensionName: typeof NAME;
    propertyType: "PropertyTableProperty";
    parentTypes: ["PropertyTable"];
    protected init(): void;
    protected getDefaults(): import("@gltf-transform/core").Nullable<IPropertyTableProperty> & {
        arrayOffsets: null;
        stringOffsets: null;
        arrayOffsetType: null;
        stringOffsetType: null;
        offset: null;
        scale: null;
        max: null;
        min: null;
    };
    getValues(): Uint8Array;
    setValues(values: Uint8Array): this;
    getArrayOffsets(): Uint8Array | null;
    setArrayOffsets(arrayOffsets: Uint8Array): this;
    getStringOffsets(): Uint8Array | null;
    setStringOffsets(stringOffsets: Uint8Array): this;
    getArrayOffsetType(): PropertyTablePropertyOffsetType;
    setArrayOffsetType(arrayOffsetType: PropertyTablePropertyOffsetType): this;
    getStringOffsetType(): PropertyTablePropertyOffsetType;
    setStringOffsetType(stringOffsetType: PropertyTablePropertyOffsetType): this;
    getOffset(): any;
    setOffset(offset: any): this;
    getScale(): any;
    setScale(scale: any): this;
    getMax(): any;
    setMax(max: any): this;
    getMin(): any;
    setMin(min: any): this;
}
/**
 * Implementation of a property texture for `EXT_structural_metadata`
 *
 * @internal
 */
export declare class PropertyTexture extends ExtensionProperty<IPropertyTexture> {
    static EXTENSION_NAME: string;
    extensionName: typeof NAME;
    propertyType: "PropertyTexture";
    parentTypes: ["StructuralMetadata"];
    protected init(): void;
    protected getDefaults(): import("@gltf-transform/core").Nullable<IPropertyTexture> & {
        objectName: null;
        properties: {};
    };
    getObjectName(): string | null;
    setObjectName(name: string | null): this;
    getClass(): string;
    setClass(_class: string): this;
    setProperty(key: string, value: PropertyTextureProperty | null): this;
    getProperty(key: string): PropertyTextureProperty | null;
    listPropertyKeys(): string[];
    listPropertyValues(): PropertyTextureProperty[];
}
/**
 * Implementation of a property texture property for `EXT_structural_metadata`
 *
 * @internal
 */
export declare class PropertyTextureProperty extends ExtensionProperty<IPropertyTextureProperty> {
    static EXTENSION_NAME: string;
    extensionName: typeof NAME;
    propertyType: "PropertyTextureProperty";
    parentTypes: ["PropertyTexture"];
    protected init(): void;
    protected getDefaults(): import("@gltf-transform/core").Nullable<IPropertyTextureProperty> & {
        channels: number[];
        texture: null;
        textureInfo: TextureInfo;
        offset: null;
        scale: null;
        max: null;
        min: null;
    };
    getChannels(): number[];
    setChannels(channels: number[]): this;
    getTexture(): Texture | null;
    setTexture(texture: Texture | null): this;
    getTextureInfo(): TextureInfo | null;
    getOffset(): any;
    setOffset(offset: any): this;
    getScale(): any;
    setScale(scale: any): this;
    getMax(): any;
    setMax(max: any): this;
    getMin(): any;
    setMin(min: any): this;
}
/**
 * Implementation of a property attribute for `EXT_structural_metadata`
 *
 * @internal
 */
export declare class PropertyAttribute extends ExtensionProperty<IPropertyAttribute> {
    static EXTENSION_NAME: string;
    extensionName: typeof NAME;
    propertyType: "PropertyAttribute";
    parentTypes: ["StructuralMetadata"];
    protected init(): void;
    protected getDefaults(): import("@gltf-transform/core").Nullable<IPropertyAttribute> & {
        objectName: null;
        properties: {};
    };
    getObjectName(): string | null;
    setObjectName(name: string | null): this;
    getClass(): string;
    setClass(_class: string): this;
    setProperty(key: string, value: PropertyAttributeProperty | null): this;
    getProperty(key: string): PropertyAttributeProperty | null;
    listPropertyKeys(): string[];
    listPropertyValues(): PropertyAttributeProperty[];
}
/**
 * Implementation of a property attribute property for `EXT_structural_metadata`
 *
 * @internal
 */
export declare class PropertyAttributeProperty extends ExtensionProperty<IPropertyAttributeProperty> {
    static EXTENSION_NAME: string;
    extensionName: typeof NAME;
    propertyType: "PropertyAttributeProperty";
    parentTypes: ["PropertyAttribute"];
    protected init(): void;
    protected getDefaults(): import("@gltf-transform/core").Nullable<IPropertyAttributeProperty> & {
        offset: null;
        scale: null;
        max: null;
        min: null;
    };
    getAttribute(): string;
    setAttribute(attribute: string): this;
    getOffset(): any;
    setOffset(offset: any): this;
    getScale(): any;
    setScale(scale: any): this;
    getMax(): any;
    setMax(max: any): this;
    getMin(): any;
    setMin(min: any): this;
}
/**
 * Implementation of a metadata entity for `EXT_structural_metadata`
 *
 * @internal
 */
export declare class ElementStructuralMetadata extends ExtensionProperty<IElementStructuralMetadata> {
    static EXTENSION_NAME: string;
    extensionName: typeof NAME;
    propertyType: "ElementStructuralMetadata";
    parentTypes: [PropertyType.NODE];
    protected init(): void;
    protected getDefaults(): import("@gltf-transform/core").Nullable<IElementStructuralMetadata>;
    getPropertyTable(): PropertyTable | null;
    setPropertyTable(propertyTable: PropertyTable | null): this;
    getIndex(): number | null;
    setIndex(index: number | null): this;
}
/**
 * Implementation of a structural metadata in a mesh primitive `EXT_structural_metadata`
 *
 * @internal
 */
export declare class MeshPrimitiveStructuralMetadata extends ExtensionProperty<IMeshPrimitiveStructuralMetadata> {
    static EXTENSION_NAME: string;
    extensionName: typeof NAME;
    propertyType: "MeshPrimitiveStructuralMetadata";
    parentTypes: [PropertyType.PRIMITIVE];
    protected init(): void;
    protected getDefaults(): import("@gltf-transform/core").Nullable<IMeshPrimitiveStructuralMetadata> & {
        propertyTextures: never[];
        propertyAttributes: never[];
    };
    listPropertyTextures(): PropertyTexture[];
    addPropertyTexture(propertyTexture: PropertyTexture): this;
    removePropertyTexture(propertyTexture: PropertyTexture): this;
    listPropertyAttributes(): PropertyAttribute[];
    addPropertyAttribute(propertyAttribute: PropertyAttribute): this;
    removePropertyAttribute(propertyAttribute: PropertyAttribute): this;
}
export {};
//# sourceMappingURL=StructuralMetadata.d.ts.map