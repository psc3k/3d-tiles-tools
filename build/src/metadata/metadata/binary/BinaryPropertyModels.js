"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryPropertyModels = void 0;
const MetadataError_1 = require("../MetadataError");
const StringPropertyModel_1 = require("./StringPropertyModel");
const BooleanPropertyModel_1 = require("./BooleanPropertyModel");
const NumericPropertyModel_1 = require("./NumericPropertyModel");
const NumericArrayPropertyModel_1 = require("./NumericArrayPropertyModel");
const StringArrayPropertyModel_1 = require("./StringArrayPropertyModel");
const BooleanArrayPropertyModel_1 = require("./BooleanArrayPropertyModel");
const NumericBuffers_1 = require("./NumericBuffers");
/**
 * Methods related to `PropertyModel` instances that are created
 * from binary data.
 *
 * @internal
 */
class BinaryPropertyModels {
    /**
     * Creates a `PropertyModel` for the specified property in the
     * given property table, based on the given binary metadata.
     *
     * This assumes that the input is structurally valid.
     *
     * This will determine the type of the property and access its
     * associated data (i.e. the required buffer views data) from
     * the given `BinaryMetadata`. For each type of property,
     * this will return a matching implementation of the
     * `PropertyModel` interface.
     *
     * @param propertyTable - The `PropertyTable`
     * @param binaryMetadata - The `BinaryMetadata`
     * @param propertyId - The property ID
     * @returns The `PropertyModel`
     * @throws MetadataError If the input data is not structurally
     * valid
     */
    static createPropertyModel(binaryPropertyTable, propertyId) {
        // Implementation note:
        // It would be nice to do some of the sanity checks upfront (e.g.
        // checking that the string offsets have been defined properly
        // when the type is 'STRING'). But in order to exploit the
        // TypeScript definedness checks, and avoid the use of the
        // non-null-assertion '!', some checks have to be done right
        // before a certain value is used. It might be possible to
        // find a more "elegant" solution here, but it's unlikely
        // that the final, nested `if(isArray) { if (type===X) {}}`
        // check could be avoided.
        // Obtain the `ClassProperty`
        const binaryMetadata = binaryPropertyTable.binaryMetadata;
        const metadataClass = binaryMetadata.metadataClass;
        const classProperties = metadataClass.properties;
        if (!classProperties) {
            throw new MetadataError_1.MetadataError(`The class does not define any properties`);
        }
        const classProperty = classProperties[propertyId];
        if (!classProperty) {
            throw new MetadataError_1.MetadataError(`The class does not define property ${propertyId}`);
        }
        // Obtain the `PropertyTableProperty`
        const propertyTable = binaryPropertyTable.propertyTable;
        const propertyTableProperties = propertyTable.properties;
        if (!propertyTableProperties) {
            throw new MetadataError_1.MetadataError(`The property table does not define any properties`);
        }
        const propertyTableProperty = propertyTableProperties[propertyId];
        if (!propertyTableProperty) {
            throw new MetadataError_1.MetadataError(`The property table does not define property ${propertyId}`);
        }
        // Obtain the required buffers from the binary data:
        const binaryBufferData = binaryMetadata.binaryBufferData;
        const bufferViewsData = binaryBufferData.bufferViewsData;
        // Obtain the `values` buffer view data
        const valuesBufferViewIndex = propertyTableProperty.values;
        const valuesBufferViewData = bufferViewsData[valuesBufferViewIndex];
        // Obtain the `arrayOffsets` buffer view data
        const arrayOffsetsBufferViewIndex = propertyTableProperty.arrayOffsets;
        let arrayOffsetsBufferViewData = undefined;
        if (arrayOffsetsBufferViewIndex !== undefined) {
            arrayOffsetsBufferViewData = bufferViewsData[arrayOffsetsBufferViewIndex];
        }
        const arrayOffsetType = propertyTableProperty.arrayOffsetType ?? "UINT32";
        // Obtain the `stringOffsets` buffer view data
        const stringOffsetsBufferViewIndex = propertyTableProperty.stringOffsets;
        let stringOffsetsBufferViewData = undefined;
        if (stringOffsetsBufferViewIndex !== undefined) {
            stringOffsetsBufferViewData =
                bufferViewsData[stringOffsetsBufferViewIndex];
        }
        const stringOffsetType = propertyTableProperty.stringOffsetType ?? "UINT32";
        // Determine the `enumValueType` of the property
        const enumType = classProperty.enumType;
        let enumValueType = undefined;
        if (enumType !== undefined) {
            const binaryEnumInfo = binaryMetadata.binaryEnumInfo;
            const enumValueTypes = binaryEnumInfo.enumValueTypes;
            enumValueType = enumValueTypes[enumType] ?? "UINT16";
        }
        // Create the `PropertyModel` implementation that matches
        // the type of the property
        const type = classProperty.type;
        const componentType = classProperty.componentType;
        const count = classProperty.count;
        const isArray = classProperty.array === true;
        const propertyModel = BinaryPropertyModels.createPropertyModelInternal(propertyId, type, componentType, isArray, count, valuesBufferViewData, arrayOffsetsBufferViewData, arrayOffsetType, stringOffsetsBufferViewData, stringOffsetType, enumValueType);
        return propertyModel;
    }
    /**
     * Internal method to create a `PropertyModel` based on all
     * the raw data elements that have been obtained from the
     * `BinaryPropertyTable` for a specific property.
     *
     * @param propertyId - The property ID
     * @param type - The type
     * @param componentType - The component type
     * @param isArray - Whether the property is an array
     * @param count - The count (array length)
     * @param valuesBufferViewData - The values data
     * @param arrayOffsetsBufferViewData - The array offsets data
     * @param arrayOffsetType - The array offsets type
     * @param stringOffsetsBufferViewData - The string offsets data
     * @param stringOffsetType - The string offsets type
     * @param enumValueType - The enum value type
     * @returns The `PropertyModel`
     * @throws MetadataError if the given data is inconsistent
     */
    static createPropertyModelInternal(propertyId, type, componentType, isArray, count, valuesBufferViewData, arrayOffsetsBufferViewData, arrayOffsetType, stringOffsetsBufferViewData, stringOffsetType, enumValueType) {
        if (isArray) {
            if (type === "STRING") {
                if (!stringOffsetsBufferViewData) {
                    throw new MetadataError_1.MetadataError(`The property ${propertyId} is an array of strings, ` +
                        `but no string offsets have been defined`);
                }
                const propertyModel = new StringArrayPropertyModel_1.StringArrayPropertyModel(valuesBufferViewData, arrayOffsetsBufferViewData, arrayOffsetType, stringOffsetsBufferViewData, stringOffsetType, count);
                return propertyModel;
            }
            if (type === "BOOLEAN") {
                const propertyModel = new BooleanArrayPropertyModel_1.BooleanArrayPropertyModel(valuesBufferViewData, arrayOffsetsBufferViewData, arrayOffsetType, count);
                return propertyModel;
            }
            if (type === "ENUM") {
                if (!enumValueType) {
                    throw new MetadataError_1.MetadataError(`The property ${propertyId} is an enum, ` +
                        `but no enum value type has been defined`);
                }
                const propertyModel = new NumericArrayPropertyModel_1.NumericArrayPropertyModel(type, valuesBufferViewData, enumValueType, arrayOffsetsBufferViewData, arrayOffsetType, count);
                return propertyModel;
            }
            // The 'type' must be a numeric (array) type here
            if (componentType === undefined) {
                throw new MetadataError_1.MetadataError(`The property ${propertyId} is a numeric array, ` +
                    `but no component type has been defined`);
            }
            const propertyModel = new NumericArrayPropertyModel_1.NumericArrayPropertyModel(type, valuesBufferViewData, componentType, arrayOffsetsBufferViewData, arrayOffsetType, count);
            return propertyModel;
        }
        // The property must be a non-array property here:
        if (type === "STRING") {
            if (!stringOffsetsBufferViewData) {
                throw new MetadataError_1.MetadataError(`The property ${propertyId} has the type 'STRING', ` +
                    `but no string offsets have been defined`);
            }
            const propertyModel = new StringPropertyModel_1.StringPropertyModel(valuesBufferViewData, stringOffsetsBufferViewData, stringOffsetType);
            return propertyModel;
        }
        if (type === "BOOLEAN") {
            const propertyModel = new BooleanPropertyModel_1.BooleanPropertyModel(valuesBufferViewData);
            return propertyModel;
        }
        if (type === "ENUM") {
            if (!enumValueType) {
                throw new MetadataError_1.MetadataError(`The property ${propertyId} is an enum, ` +
                    `but no enum value type has been defined`);
            }
            const propertyModel = new NumericPropertyModel_1.NumericPropertyModel(type, valuesBufferViewData, enumValueType);
            return propertyModel;
        }
        // The property must be a (non-array) numeric property here
        if (componentType === undefined) {
            throw new MetadataError_1.MetadataError(`The property ${propertyId} is numeric, ` +
                `but no component type has been defined`);
        }
        const propertyModel = new NumericPropertyModel_1.NumericPropertyModel(type, valuesBufferViewData, componentType);
        return propertyModel;
    }
    /**
     * Returns the 'slice' information that is given by an offsets
     * buffer or a fixed number.
     *
     * This returns `{ offset, length }` for the `arrayOffsets` or
     * `stringOffsets` of a property, for a given index.
     *
     * When the given `count` is defined, then the result will
     * just be `{ index * count, count }`.
     *
     * Otherwise, the result will be `{ offset, length }`, where `offset`
     * is the offset that is read from the given buffer at index `index`,
     * and `length` is `offset[index+1] - offset[index]`.
     *
     * @param index - The index
     * @param offsetsBuffer - The offsets
     * @param offsetType - The `componentType` for the offsets
     * @param count - The count
     * @returns The slice information
     * @throws MetadataError If both the `count` and the `offsetsBuffer`
     * are `undefined`.
     */
    static computeSlice(index, offsetsBuffer, offsetType, count) {
        if (count !== undefined) {
            return {
                offset: index * count,
                length: count,
            };
        }
        if (!offsetsBuffer) {
            throw new MetadataError_1.MetadataError(`Neither the 'count' nor the offsets buffer have been defined`);
        }
        const offset = NumericBuffers_1.NumericBuffers.getNumericFromBuffer(offsetsBuffer, index, offsetType);
        const nextOffset = NumericBuffers_1.NumericBuffers.getNumericFromBuffer(offsetsBuffer, index + 1, offsetType);
        const length = Number(nextOffset) - Number(offset);
        return {
            offset: Number(offset),
            length: length,
        };
    }
}
exports.BinaryPropertyModels = BinaryPropertyModels;
//# sourceMappingURL=BinaryPropertyModels.js.map