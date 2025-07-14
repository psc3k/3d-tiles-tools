import { PropertyTableProperty } from "../../structure";
import { ClassProperty } from "../../structure";
import { MetadataEntityModel } from "./MetadataEntityModel";
import { PropertyModel } from "./PropertyModel";
import { PropertyTableModel } from "./PropertyTableModel";
/**
 * Implementation of a `PropertyTableModel` that is backed by
 * `PropertyModel` instances.
 *
 * This implementation is only used internally, to represent
 * data from batch tables, and does not support property
 * semantics or enum types.
 *
 * @internal
 */
export declare class DefaultPropertyTableModel implements PropertyTableModel {
    /**
     * The number of rows of the table
     */
    private readonly numRows;
    /**
     * A mapping from property IDs to the `PropertyModel`
     * instances that provide the property values. These
     * are the "columns" of the table
     */
    private readonly propertyIdToModel;
    /**
     * A mapping from property IDs to the `ClassProperty`
     * instances that define the structure of the
     * properties
     */
    private readonly propertyIdToClassProperty;
    /**
     * Creates a new instance.
     *
     * @param numRows - The number of rows
     */
    constructor(numRows: number);
    /**
     * Adds the `ClassProperty` information for the specified
     * property to this table.
     *
     * @param propertyId - The property ID/name
     * @param classProperty - The class property
     */
    addClassProperty(propertyId: string, classProperty: ClassProperty): void;
    /**
     * Adds a property model (column) to this table
     *
     * @param propertyId - The property ID
     * @param propertyModel - The property model
     */
    addPropertyModel(propertyId: string, propertyModel: PropertyModel): void;
    /** {@inheritDoc PropertyTableModel.getPropertyNames} */
    getPropertyNames(): string[];
    /** {@inheritDoc PropertyTableModel.getCount} */
    getCount(): number;
    /** {@inheritDoc PropertyTableModel.getMetadataEntityModel} */
    getMetadataEntityModel(index: number): MetadataEntityModel;
    /** {@inheritDoc PropertyTableModel.getPropertyModel} */
    getPropertyModel(propertyId: string): PropertyModel | undefined;
    /** {@inheritDoc PropertyTableModel.getClassProperty} */
    getClassProperty(propertyId: string): ClassProperty | undefined;
    /** {@inheritDoc PropertyTableModel.getPropertyTableProperty} */
    getPropertyTableProperty(propertyId: string): PropertyTableProperty | undefined;
}
//# sourceMappingURL=DefaultPropertyTableModel.d.ts.map