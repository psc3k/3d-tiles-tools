"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMetadataEntityModel = void 0;
const MetadataValues_1 = require("./MetadataValues");
const MetadataError_1 = require("./MetadataError");
/**
 * Default implementation of a `MetadataEntityModel` that is backed
 * by the JSON representation of the metadata.
 *
 * (The JSON representation are just the `metadataEntity.properties`
 * from the input JSON)
 *
 * @internal
 */
class DefaultMetadataEntityModel {
    constructor(metadataClass, semanticToPropertyId, json) {
        this.metadataClass = metadataClass;
        this.semanticToPropertyId = semanticToPropertyId;
        this.json = json;
    }
    /** {@inheritDoc MetadataEntityModel.getPropertyValue} */
    getPropertyValue(propertyId) {
        const properties = this.metadataClass.properties;
        if (!properties) {
            throw new MetadataError_1.MetadataError(`Metadata class does not have any properties`);
        }
        const property = properties[propertyId];
        if (!property) {
            throw new MetadataError_1.MetadataError(`Metadata class does not have property ${propertyId}`);
        }
        const value = this.json[propertyId];
        const offset = this.json.offset;
        const scale = this.json.scale;
        return MetadataValues_1.MetadataValues.processValue(property, offset, scale, value);
    }
    /** {@inheritDoc MetadataEntityModel.getPropertyValueBySemantic} */
    getPropertyValueBySemantic(semantic) {
        const propertyId = this.semanticToPropertyId[semantic];
        if (propertyId === undefined) {
            return undefined;
        }
        return this.getPropertyValue(propertyId);
    }
}
exports.DefaultMetadataEntityModel = DefaultMetadataEntityModel;
//# sourceMappingURL=DefaultMetadataEntityModel.js.map