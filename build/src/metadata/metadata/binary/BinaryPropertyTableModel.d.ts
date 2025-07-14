import { ClassProperty } from "../../../structure";
import { PropertyTableProperty } from "../../../structure";
import { MetadataEntityModel } from "../MetadataEntityModel";
import { PropertyModel } from "../PropertyModel";
import { PropertyTableModel } from "../PropertyTableModel";
import { BinaryPropertyTable } from "./BinaryPropertyTable";
/**
 * Implementation of the `PropertyTableModel` interface that is backed
 * by binary data.
 *
 * @internal
 */
export declare class BinaryPropertyTableModel implements PropertyTableModel {
    /**
     * The structure containing the raw PropertyTable JSON object
     * and binary data of the property table
     */
    private readonly binaryPropertyTable;
    /**
     * A mapping from property IDs to the `PropertyModel`
     * instances that provide the property values. These
     * are the "columns" of the table
     */
    private readonly propertyIdToModel;
    /**
     * A mapping from 'semantic' strings to the 'propertyId'
     * strings of the properties that have the respective
     * semantic
     */
    private readonly semanticToPropertyId;
    constructor(binaryPropertyTable: BinaryPropertyTable);
    /** {@inheritDoc PropertyTableModel.getMetadataEntityModel} */
    getMetadataEntityModel(index: number): MetadataEntityModel;
    /** {@inheritDoc PropertyTableModel.getPropertyModel} */
    getPropertyModel(propertyId: string): PropertyModel | undefined;
    /** {@inheritDoc PropertyTableModel.getClassProperty} */
    getClassProperty(propertyId: string): ClassProperty | undefined;
    /** {@inheritDoc PropertyTableModel.getPropertyTableProperty} */
    getPropertyTableProperty(propertyId: string): PropertyTableProperty | undefined;
    getPropertyNames(): string[];
    getCount(): number;
}
//# sourceMappingURL=BinaryPropertyTableModel.d.ts.map