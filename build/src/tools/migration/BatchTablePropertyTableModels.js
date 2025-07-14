"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchTablePropertyTableModels = void 0;
const tilesets_1 = require("../../tilesets");
const tilesets_2 = require("../../tilesets");
const metadata_1 = require("../../metadata");
const metadata_2 = require("../../metadata");
const BatchTableClassProperties_1 = require("./BatchTableClassProperties");
const Ids_1 = require("./Ids");
/**
 * Methods to create `PropertyTableModel` instances for batch table data
 *
 * @internal
 */
class BatchTablePropertyTableModels {
    /**
     * Creates a `PropertyTableModel` for the given batch table data.
     *
     * @param table - The table
     * @param binary - The binary data
     * @param externalProperties - External properties, i.e. property model
     * instances for properties of the batch table that are not stored in
     * the batch table binary. This is only required for the properties that
     * are encoded with the `3DTILES_draco_point_compression` extension,
     * where the actual data is stored in the feature table binary. These
     * models are accessed with property IDs.
     * @param numRows - The number of rows of the table
     * @returns The property table model
     * @throws TileFormatError If the table contained a property
     * that was neither found in the 'externalProperties', nor has
     * been a BatchTableBinaryBodyReference nor an array
     */
    static create(table, binary, externalProperties, numRows) {
        const propertyTableModel = new metadata_2.DefaultPropertyTableModel(numRows);
        const properties = Object.keys(table);
        for (const propertyName of properties) {
            if (propertyName === "extensions" || propertyName === "extras") {
                continue;
            }
            const propertyValue = table[propertyName];
            const propertyId = Ids_1.Ids.sanitize(propertyName);
            const classProperty = BatchTableClassProperties_1.BatchTableClassProperties.createClassProperty(propertyId, propertyValue);
            propertyTableModel.addClassProperty(propertyId, classProperty);
            const externalProperty = externalProperties[propertyId];
            if (externalProperty) {
                propertyTableModel.addPropertyModel(propertyId, externalProperty);
            }
            else if (tilesets_1.TileTableData.isBatchTableBinaryBodyReference(propertyValue)) {
                const legacyType = propertyValue.type;
                const legacyComponentType = propertyValue.componentType;
                const byteOffset = propertyValue.byteOffset;
                const propertyModel = tilesets_1.TileTableData.createNumericPropertyModel(legacyType, legacyComponentType, binary, byteOffset);
                propertyTableModel.addPropertyModel(propertyId, propertyModel);
            }
            else if (Array.isArray(propertyValue)) {
                const propertyModel = new metadata_1.DefaultPropertyModel(propertyValue);
                propertyTableModel.addPropertyModel(propertyId, propertyModel);
            }
            else {
                throw new tilesets_2.TileFormatError(`Property ${propertyId} was neither a binary body ` +
                    `reference nor an array`);
            }
        }
        return propertyTableModel;
    }
}
exports.BatchTablePropertyTableModels = BatchTablePropertyTableModels;
//# sourceMappingURL=BatchTablePropertyTableModels.js.map