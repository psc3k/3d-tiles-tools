"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryPropertyTableModel = void 0;
const BinaryPropertyModels_1 = require("./BinaryPropertyModels");
const TableMetadataEntityModel_1 = require("../TableMetadataEntityModel");
const MetadataEntityModels_1 = require("../MetadataEntityModels");
const MetadataError_1 = require("../MetadataError");
/**
 * Implementation of the `PropertyTableModel` interface that is backed
 * by binary data.
 *
 * @internal
 */
class BinaryPropertyTableModel {
    constructor(binaryPropertyTable) {
        /**
         * A mapping from property IDs to the `PropertyModel`
         * instances that provide the property values. These
         * are the "columns" of the table
         */
        this.propertyIdToModel = {};
        this.binaryPropertyTable = binaryPropertyTable;
        // Initialize the `PropertyModel` instances for
        // the property table properties
        const propertyTable = binaryPropertyTable.propertyTable;
        const propertyTableProperties = propertyTable.properties;
        if (propertyTableProperties) {
            for (const propertyId of Object.keys(propertyTableProperties)) {
                const propertyModel = BinaryPropertyModels_1.BinaryPropertyModels.createPropertyModel(binaryPropertyTable, propertyId);
                this.propertyIdToModel[propertyId] = propertyModel;
            }
        }
        const binaryMetadata = binaryPropertyTable.binaryMetadata;
        const metadataClass = binaryMetadata.metadataClass;
        this.semanticToPropertyId =
            MetadataEntityModels_1.MetadataEntityModels.computeSemanticToPropertyIdMapping(metadataClass);
    }
    /** {@inheritDoc PropertyTableModel.getMetadataEntityModel} */
    getMetadataEntityModel(index) {
        const binaryPropertyTable = this.binaryPropertyTable;
        const propertyTable = binaryPropertyTable.propertyTable;
        const count = propertyTable.count;
        if (index < 0 || index >= count) {
            const message = `The index must be in [0,${count}), but is ${index}`;
            throw new MetadataError_1.MetadataError(message);
        }
        const semanticToPropertyId = this.semanticToPropertyId;
        const binaryMetadata = binaryPropertyTable.binaryMetadata;
        const binaryEnumInfo = binaryMetadata.binaryEnumInfo;
        const enumValueValueNames = binaryEnumInfo.enumValueValueNames;
        const metadataEntityModel = new TableMetadataEntityModel_1.TableMetadataEntityModel(this, index, semanticToPropertyId, enumValueValueNames);
        return metadataEntityModel;
    }
    /** {@inheritDoc PropertyTableModel.getPropertyModel} */
    getPropertyModel(propertyId) {
        return this.propertyIdToModel[propertyId];
    }
    /** {@inheritDoc PropertyTableModel.getClassProperty} */
    getClassProperty(propertyId) {
        const binaryPropertyTable = this.binaryPropertyTable;
        const binaryMetadata = binaryPropertyTable.binaryMetadata;
        const metadataClass = binaryMetadata.metadataClass;
        const classProperties = metadataClass.properties;
        if (!classProperties) {
            return undefined;
        }
        return classProperties[propertyId];
    }
    /** {@inheritDoc PropertyTableModel.getPropertyTableProperty} */
    getPropertyTableProperty(propertyId) {
        const binaryPropertyTable = this.binaryPropertyTable;
        const propertyTable = binaryPropertyTable.propertyTable;
        const propertyTableProperties = propertyTable.properties;
        if (!propertyTableProperties) {
            return undefined;
        }
        return propertyTableProperties[propertyId];
    }
    getPropertyNames() {
        return Object.keys(this.propertyIdToModel);
    }
    getCount() {
        const binaryPropertyTable = this.binaryPropertyTable;
        const propertyTable = binaryPropertyTable.propertyTable;
        return propertyTable.count;
    }
}
exports.BinaryPropertyTableModel = BinaryPropertyTableModel;
//# sourceMappingURL=BinaryPropertyTableModel.js.map