import { Extension } from "@gltf-transform/core";
import { PropertyType } from "@gltf-transform/core";
import { ReaderContext } from "@gltf-transform/core";
import { WriterContext } from "@gltf-transform/core";
import { Class } from "./StructuralMetadata";
import { ClassProperty } from "./StructuralMetadata";
import { ElementStructuralMetadata } from "./StructuralMetadata";
import { Enum } from "./StructuralMetadata";
import { EnumValue } from "./StructuralMetadata";
import { MeshPrimitiveStructuralMetadata } from "./StructuralMetadata";
import { PropertyAttribute } from "./StructuralMetadata";
import { PropertyAttributeProperty } from "./StructuralMetadata";
import { PropertyTable } from "./StructuralMetadata";
import { PropertyTableProperty } from "./StructuralMetadata";
import { PropertyTexture } from "./StructuralMetadata";
import { PropertyTextureProperty } from "./StructuralMetadata";
import { Schema } from "./StructuralMetadata";
import { StructuralMetadata } from "./StructuralMetadata";
/**
 * The type of a metadata class property
 *
 * @internal
 */
export type ClassPropertyType = "SCALAR" | "VEC2" | "VEC3" | "VEC4" | "MAT2" | "MAT3" | "MAT4" | "STRING" | "BOOLEAN" | "ENUM";
/**
 * The component type of a metadata class property
 *
 * @internal
 */
export type ClassPropertyComponentType = "INT8" | "UINT8" | "INT16" | "UINT16" | "INT32" | "UINT32" | "INT64" | "UINT64" | "FLOAT32" | "FLOAT64";
/**
 * The value type of a metadata enum
 *
 * @internal
 */
export type EnumValueType = "INT8" | "UINT8" | "INT16" | "UINT16" | "INT32" | "UINT32" | "INT64" | "UINT64";
/**
 * The type of the string- or array offsets for a property table property
 *
 * @internal
 */
export type PropertyTablePropertyOffsetType = "UINT8" | "UINT16" | "UINT32" | "UINT64";
interface SchemaDef {
    id: string;
    name?: string;
    description?: string;
    version?: string;
    classes?: {
        [key: string]: ClassDef;
    };
    enums?: {
        [key: string]: EnumDef;
    };
}
interface ClassDef {
    name?: string;
    description?: string;
    properties?: {
        [key: string]: ClassPropertyDef;
    };
}
type NumericValue = number | number[] | number[][];
type NoDataValue = number | string | number[] | string[] | number[][];
type AnyValue = number | string | boolean | number[] | string[] | boolean[] | number[][];
interface ClassPropertyDef {
    name?: string;
    description?: string;
    type: ClassPropertyType;
    componentType?: ClassPropertyComponentType;
    enumType?: string;
    array?: boolean;
    count?: number;
    normalized?: boolean;
    offset?: NumericValue;
    scale?: NumericValue;
    max?: NumericValue;
    min?: NumericValue;
    required?: boolean;
    noData?: NoDataValue;
    default?: AnyValue;
}
interface EnumDef {
    name?: string;
    description?: string;
    valueType?: EnumValueType;
    values: EnumValueDef[];
}
interface EnumValueDef {
    name: string;
    description?: string;
    value: number;
}
/**
 * [`EXT_structural_metadata`](https://github.com/CesiumGS/glTF/tree/proposal-EXT_structural_metadata/extensions/2.0/Vendor/EXT_structural_metadata/)
 * defines a means of storing structured metadata within a glTF 2.0 asset.
 *
 * @internal
 */
export declare class EXTStructuralMetadata extends Extension {
    readonly extensionName = "EXT_structural_metadata";
    static EXTENSION_NAME: string;
    readonly prewriteTypes: PropertyType[];
    createStructuralMetadata(): StructuralMetadata;
    createSchema(): Schema;
    createClass(): Class;
    createClassProperty(): ClassProperty;
    createEnum(): Enum;
    createEnumValue(): EnumValue;
    createPropertyTable(): PropertyTable;
    createPropertyTableProperty(): PropertyTableProperty;
    createPropertyTexture(): PropertyTexture;
    createPropertyTextureProperty(): PropertyTextureProperty;
    createPropertyAttribute(): PropertyAttribute;
    createPropertyAttributeProperty(): PropertyAttributeProperty;
    createElementStructuralMetadata(): ElementStructuralMetadata;
    createMeshPrimitiveStructuralMetadata(): MeshPrimitiveStructuralMetadata;
    createSchemaFrom(schemaDef: SchemaDef): Schema;
    createClassFrom(classDef: ClassDef): Class;
    createClassPropertyFrom(classPropertyDef: ClassPropertyDef): ClassProperty;
    createEnumFrom(enumDef: EnumDef): Enum;
    createEnumValueFrom(enumValueDef: EnumValueDef): EnumValue;
    read(context: ReaderContext): this;
    private createTopLevelStructuralMetadata;
    private readStructuralMetadata;
    private readSchema;
    private readClass;
    private readClassProperty;
    private readEnum;
    private readEnumValue;
    private readPropertyTexture;
    private readPropertyTextureProperty;
    private readPropertyTable;
    private readPropertyTableProperty;
    private readPropertyAttribute;
    private readPropertyAttributeProperty;
    private readPrimitive;
    private readNode;
    /**
     * Obtains the data of the buffer view with the given index,
     * based on the current reader context.
     *
     * This will internally resolve the buffer of the specified
     * buffer view, and return the slice of the buffer data
     * that corresponds to the buffer view.
     *
     * @param context - The reader context
     * @param bufferViewIndex - The buffer view index
     * @returns The buffer view data
     */
    private static obtainBufferViewData;
    write(context: WriterContext): this;
    private writePrimitive;
    private writeNode;
    private createStructuralMetadataDef;
    private createSchemaDef;
    private createClassDef;
    private createClassPropertyDef;
    private createEnumDef;
    private createEnumValueDef;
    private createPropertyTableDef;
    private createPropertyTablePropertyDef;
    private createPropertyTextureDef;
    private createPropertyTexturePropertyDef;
    private createPropertyAttributeDef;
    private createPropertyAttributePropertyDef;
    /**
     * Perform the operations that are required before writing
     * a glTF document when it contains this extension.
     *
     * This extension defines `prewriteTypes = [PropertyType.BUFFER];`
     * to prepare the buffer data that contains the buffer view data
     * that otherwise is not referenced (because property tables are
     * directly referring to buffer views, and not via accessors)
     */
    prewrite(context: WriterContext, propertyType: PropertyType): this;
    /**
     * Prepares writing a document that contains this extension.
     *
     * This will collect all buffer views that are referred to by the
     * property tables, and store them as "otherBufferViews" of
     * the writer context (for the main buffer), to make sure
     * that they are part of the buffer when it is eventually
     * written in Writer.ts.
     *
     * @param context - The writer context
     * @returns The deep void of space
     */
    private _prewriteBuffers;
    /**
     * Obtain the "otherBufferViews" for the main buffer from the given
     * context, creating them if they did not exist yet.
     *
     * @param context - The writer context
     * @returns The other buffer views
     */
    private obtainOtherBufferViews;
}
export {};
//# sourceMappingURL=EXTStructuralMetadata.d.ts.map