import { Schema } from "../../../structure";
import { BinaryPropertyTable } from "./BinaryPropertyTable";
/**
 * A class for building `BinaryPropertyTable` objects
 * from property values that are given as arrays.
 *
 * @internal
 */
export declare class BinaryPropertyTableBuilder {
    /**
     * Creates a new instance.
     *
     * @param schema - The metadata schema
     * @param propertyTableClass - The class name of the resulting
     * property table, i.e. the name of one class in the schema
     * @param propertyTableName - A name for the property table
     * @returns The builder
     * @throws MetadataError If the given schema does not contain
     * the specified class.
     */
    static create(schema: Schema, propertyTableClass: string, propertyTableName: string): BinaryPropertyTableBuilder;
    /**
     * The schema that contains the class for which the property
     * table is built, and possible enum definitions that may be
     * required for resolving the binary representation of enum
     * values.
     */
    private readonly schema;
    /**
     * The class for which the property table is built
     */
    private readonly propertyTableClass;
    /**
     * A name for the property table
     */
    private readonly propertyTableName;
    /**
     * The data type with which array offsets will be stored
     * (this is the default and not modifiable for now)
     */
    private readonly arrayOffsetType;
    /**
     * The data type with which string offsets will be stored
     * (this is the default and not modifiable for now)
     */
    private readonly stringOffsetType;
    /**
     * The count (number of rows) of the property table.
     *
     * This is `undefined` until the first property is
     * added. Afterwards, it will be used to ensure that
     * all properties receive the same number of values
     */
    private count;
    /**
     * The `PropertyTableProperty` objects for all properties
     * for which values have been added.
     */
    private readonly propertyTableProperties;
    /**
     * Collects the binary representations (i.e. the buffer views
     * data) of the properties that are added.
     */
    private readonly createdBufferViewsData;
    /**
     * Private constructor, called from `create`.
     *
     * @param schema - The metadata schema
     * @param propertyTableClass - The class name of the resulting
     * property table, i.e. the name of one class in the schema
     * @param propertyTableName - A name for the property table
     * @returns The builder
     * @throws MetadataError If the given schema does not contain
     * the specified class.
     */
    private constructor();
    /**
     * Adds a single property to the property table.
     *
     * @param propertyName - The name of the property
     * @param propertyValues - The property values
     * @returns This builder
     * @throws MetadataError If a property with the given
     * name does not exist in the class that this table
     * is built for, or when the length of the given array
     * is different than the length of an array that was
     * given for a previous property.
     */
    addProperty(propertyName: string, propertyValues: any[]): this;
    /**
     * Adds a set of properties to the property table.
     *
     * Property names that do not appear in the class that the
     * table is built for will be ignored.
     *
     * @param properties - A dictionary that maps property names
     * to values
     * @returns This builder
     * @throws MetadataError If the length of any given array
     * is different than the length of any other array, or
     * an array that was given for a previous property.
     */
    addProperties(properties: {
        [key: string]: any[];
    }): this;
    /**
     * Build the property table from the data of all properties
     * that have been added.
     *
     * @returns The property table
     * @throws MetadataError If no property values have been given
     * for any of the properties of the class that the table is
     * built for
     */
    build(): BinaryPropertyTable;
    /**
     * Returns the `MetadataClass` that the table is built for
     *
     * @returns The metadata class
     * @throws MetadataError If the schema does not contain the class
     */
    private getClass;
    /**
     * Returns the property names of the `MetadataClass` that the
     * table is built for
     *
     * @returns The metadata class property names
     * @throws MetadataError If the schema does not contain the class
     */
    private getClassPropertyNames;
    /**
     * Returns the `ClassProperty` for the given propery name from
     * the `MetadataClass` that the table is built for
     *
     * @param propertyName - The property names
     * @returns The metadata class property names
     * @throws MetadataError If the schema does not contain the class,
     * or the class does not contain the specified property
     */
    private getClassProperty;
}
//# sourceMappingURL=BinaryPropertyTableBuilder.d.ts.map