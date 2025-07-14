import { Schema } from "../../structure";
import { ClassProperty } from "../../structure";
import { MetadataEnum } from "../../structure";
import { BinaryEnumInfo } from "./binary/BinaryEnumInfo";
/**
 * Internal utilities related to metadata
 *
 * @internal
 */
export declare class MetadataUtilities {
    /**
     * Computes the `BianaryEnumInfo` that summarizes information
     * about the binary representation of `MetadataEnum` values
     * from the given schema.
     *
     * @param schema - The metadata `Schema`
     * @returns The `BinaryEnumInfo`
     */
    static computeBinaryEnumInfo(schema: Schema): BinaryEnumInfo;
    /**
     * Computes a mapping from enum type names to the `valueType` that
     * the respective `MetdataEnum` has (defaulting to `UINT16` if it
     * did not define one)
     *
     * @param schema - The metadata `Schema`
     * @returns The mapping from enum type names to enum value types
     */
    private static computeEnumValueTypes;
    /**
     * Computes the value type of the enum that is represented with
     * the given class property.
     *
     * This assumes that the given schema and class property are
     * structurally valid: If the class property is not an ENUM
     * property, or the schema does not define enums, then
     * `undefined` is returned.
     *
     * Otherwise, the `valueType` of the respective enum is returned
     * (defaulting to `UINT16` if it did not define one).
     *
     * @param schema - The metadata `Schema`
     * @param classProperty - The `ClassProperty`
     * @returns The enum value type, or `undefined`.
     */
    static computeEnumValueType(schema: Schema, classProperty: ClassProperty): string | undefined;
    /**
     * Computes a mapping from enum type names to the dictionaries
     * that map the enum values names to the enum value values.
     *
     * @param schema - The metadata `Schema`
     * @returns The mapping from enum type names to dictionaries
     */
    private static computeEnumValueNameValues;
    /**
     * Computes a mapping from enum values names to the enum value values
     * for the given metadata enum.
     *
     * @param metadataEnum - The metadata enum
     * @returns The mapping from enum value names to enum value values
     */
    static computeMetadataEnumValueNameValues(metadataEnum: MetadataEnum): {
        [key: string]: number;
    };
    /**
     * Computes a mapping from enum type names to the dictionaries
     * that map the enum value values to the enum value names.
     *
     * @param schema - The metadata `Schema`
     * @returns The mapping from enum type names to dictionaries
     */
    private static computeEnumValueValueNames;
    /**
     * Computes a mapping from enum value values to enum value names
     * for the given metadata enum.
     *
     * The name and comment look strange, but this is indeed the mapping from
     * `metadataEnum.values[i].value` to `metadataEnum.values[i].name` for
     * the given metadata enum.
     *
     * @param metadataEnum - The metadata enum
     * @returns The mapping from enum value values to enum value names.
     */
    static computeMetadataEnumValueValueNames(metadataEnum: MetadataEnum): {
        [key: number]: string;
    };
    /**
     * Internal method to obtain the names of enum values for the
     * given property.
     *
     * This tries to return the list of all
     * `schema.enums[classProperty.enumType].values[i].name`
     * values, returning the empty list if the property does not
     * have an enum type or any element is not defined.
     *
     * @param classProperty - The `ClassProperty`
     * @param schema - The `Schema`
     * @returns The enum value names
     */
    static obtainEnumValueNames(classProperty: ClassProperty, schema: Schema): string[];
}
//# sourceMappingURL=MetadataUtilities.d.ts.map