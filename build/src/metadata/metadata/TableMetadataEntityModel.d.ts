import { MetadataEntityModel } from "./MetadataEntityModel";
import { PropertyTableModel } from "./PropertyTableModel";
/**
 * Implementation of a `MetadataEntityModel` that is backed by an
 * arbitrary implementation of `PropertyTableModel`
 *
 * @internal
 */
export declare class TableMetadataEntityModel implements MetadataEntityModel {
    private readonly propertyTableModel;
    private readonly entityIndex;
    private readonly semanticToPropertyId;
    private readonly enumValueValueNames;
    constructor(propertyTableModel: PropertyTableModel, entityIndex: number, semanticToPropertyId: {
        [key: string]: string;
    }, enumValueValueNames: {
        [key: string]: {
            [key: number]: string;
        };
    });
    /** {@inheritDoc MetadataEntityModel.getPropertyValue} */
    getPropertyValue(propertyId: string): any;
    /** {@inheritDoc MetadataEntityModel.getPropertyValueBySemantic} */
    getPropertyValueBySemantic(semantic: string): any;
}
//# sourceMappingURL=TableMetadataEntityModel.d.ts.map