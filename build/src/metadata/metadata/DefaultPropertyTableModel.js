"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPropertyTableModel = void 0;
const MetadataError_1 = require("./MetadataError");
const TableMetadataEntityModel_1 = require("./TableMetadataEntityModel");
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
class DefaultPropertyTableModel {
    /**
     * Creates a new instance.
     *
     * @param numRows - The number of rows
     */
    constructor(numRows) {
        /**
         * A mapping from property IDs to the `PropertyModel`
         * instances that provide the property values. These
         * are the "columns" of the table
         */
        this.propertyIdToModel = {};
        /**
         * A mapping from property IDs to the `ClassProperty`
         * instances that define the structure of the
         * properties
         */
        this.propertyIdToClassProperty = {};
        this.numRows = numRows;
    }
    /**
     * Adds the `ClassProperty` information for the specified
     * property to this table.
     *
     * @param propertyId - The property ID/name
     * @param classProperty - The class property
     */
    addClassProperty(propertyId, classProperty) {
        this.propertyIdToClassProperty[propertyId] = classProperty;
    }
    /**
     * Adds a property model (column) to this table
     *
     * @param propertyId - The property ID
     * @param propertyModel - The property model
     */
    addPropertyModel(propertyId, propertyModel) {
        this.propertyIdToModel[propertyId] = propertyModel;
    }
    /** {@inheritDoc PropertyTableModel.getPropertyNames} */
    getPropertyNames() {
        return Object.keys(this.propertyIdToModel);
    }
    /** {@inheritDoc PropertyTableModel.getCount} */
    getCount() {
        return this.numRows;
    }
    /** {@inheritDoc PropertyTableModel.getMetadataEntityModel} */
    getMetadataEntityModel(index) {
        if (index < 0 || index >= this.numRows) {
            const message = `The index must be in [0,${this.numRows}), but is ${index}`;
            throw new MetadataError_1.MetadataError(message);
        }
        const semanticToPropertyId = {};
        const enumValueValueNames = {};
        const metadataEntityModel = new TableMetadataEntityModel_1.TableMetadataEntityModel(this, index, semanticToPropertyId, enumValueValueNames);
        return metadataEntityModel;
    }
    /** {@inheritDoc PropertyTableModel.getPropertyModel} */
    getPropertyModel(propertyId) {
        return this.propertyIdToModel[propertyId];
    }
    /** {@inheritDoc PropertyTableModel.getClassProperty} */
    getClassProperty(propertyId) {
        return this.propertyIdToClassProperty[propertyId];
    }
    /** {@inheritDoc PropertyTableModel.getPropertyTableProperty} */
    getPropertyTableProperty(propertyId) {
        if (!Object.keys(this.propertyIdToModel).includes(propertyId)) {
            return undefined;
        }
        // Note: The `PropertyTableProperty` is actually only
        // required for obtaining the offset/scale/normalized
        // information. The fact that a "dummy" property has
        // to be created here is related to
        // https://github.com/CesiumGS/3d-tiles/issues/650 :
        // Technically, it would be sufficient to have a method
        // like `getValueTransformForProperty(p)`...
        const propertyTableProperty = {
            values: -1,
        };
        return propertyTableProperty;
    }
}
exports.DefaultPropertyTableModel = DefaultPropertyTableModel;
//# sourceMappingURL=DefaultPropertyTableModel.js.map