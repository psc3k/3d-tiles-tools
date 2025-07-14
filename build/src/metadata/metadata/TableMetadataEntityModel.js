"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableMetadataEntityModel = void 0;
const base_1 = require("../../base");
const MetadataValues_1 = require("./MetadataValues");
const MetadataError_1 = require("./MetadataError");
/**
 * Implementation of a `MetadataEntityModel` that is backed by an
 * arbitrary implementation of `PropertyTableModel`
 *
 * @internal
 */
class TableMetadataEntityModel {
    constructor(propertyTableModel, entityIndex, semanticToPropertyId, enumValueValueNames) {
        this.propertyTableModel = propertyTableModel;
        this.entityIndex = entityIndex;
        this.semanticToPropertyId = semanticToPropertyId;
        this.enumValueValueNames = enumValueValueNames;
    }
    /** {@inheritDoc MetadataEntityModel.getPropertyValue} */
    getPropertyValue(propertyId) {
        const propertyTableModel = this.propertyTableModel;
        const classProperty = propertyTableModel.getClassProperty(propertyId);
        if (!(0, base_1.defined)(classProperty)) {
            const message = `The class does not define a property ${propertyId}`;
            throw new MetadataError_1.MetadataError(message);
        }
        const propertyTableProperty = propertyTableModel.getPropertyTableProperty(propertyId);
        if (!(0, base_1.defined)(propertyTableProperty)) {
            const message = `The property table does not define a property ${propertyId}`;
            throw new MetadataError_1.MetadataError(message);
        }
        const propertyModel = propertyTableModel.getPropertyModel(propertyId);
        if (!propertyModel) {
            const message = `The property table does not ` +
                `define a property model for ${propertyId}`;
            throw new MetadataError_1.MetadataError(message);
        }
        // Obtain the raw property value from the property model
        const propertyValue = propertyModel.getPropertyValue(this.entityIndex);
        // If the property is an enum property, translate the (numeric)
        // property values into their string representation
        if (classProperty.type === "ENUM") {
            const enumType = classProperty.enumType;
            if (!(0, base_1.defined)(enumType)) {
                const message = `The class property ${propertyId} is has the type ` +
                    `'ENUM', but does not define an 'enumType'`;
                throw new MetadataError_1.MetadataError(message);
            }
            const enumValueValueNames = this.enumValueValueNames;
            const valueValueNames = enumValueValueNames[enumType];
            if (!(0, base_1.defined)(valueValueNames)) {
                const message = `The class property ${propertyId} is has the enum type ${enumType}, ` +
                    `but this enum type was not defined in the schema`;
                throw new MetadataError_1.MetadataError(message);
            }
            const processedValue = MetadataValues_1.MetadataValues.processNumericEnumValue(classProperty, valueValueNames, propertyValue);
            return processedValue;
        }
        const offsetOverride = propertyTableProperty.offset;
        const scaleOverride = propertyTableProperty.scale;
        const processedValue = MetadataValues_1.MetadataValues.processValue(classProperty, offsetOverride, scaleOverride, propertyValue);
        return processedValue;
    }
    /** {@inheritDoc MetadataEntityModel.getPropertyValueBySemantic} */
    getPropertyValueBySemantic(semantic) {
        const propertyId = this.semanticToPropertyId[semantic];
        if (!(0, base_1.defined)(propertyId)) {
            return undefined;
        }
        return this.getPropertyValue(propertyId);
    }
}
exports.TableMetadataEntityModel = TableMetadataEntityModel;
//# sourceMappingURL=TableMetadataEntityModel.js.map