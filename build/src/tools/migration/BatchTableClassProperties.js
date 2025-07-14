"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchTableClassProperties = void 0;
const tilesets_1 = require("../../tilesets");
const tilesets_2 = require("../../tilesets");
const TypeDetection_1 = require("./TypeDetection");
/**
 * Methods to create `ClassProperty` objects from batch table properties.
 *
 * @internal
 */
class BatchTableClassProperties {
    /**
     * Returns a `ClassProperty` that describes the given batch table
     * property.
     *
     * The `type`, `componentType`, `array` and `count` properties
     * of the class property will be set based on some unspecified
     * guesses. If no suitable type information can be obtained
     * from the given values, then a class property with the
     * type `STRING` will be returned.
     *
     * @param batchTablePropertyName - The property name
     * @param batchTablePropertyValue - The property value
     * @returns The `ClassProperty`
     * @throws TileFormatError If the given value is neither
     * a BatchTableBinaryBodyReference nor a numeric array
     */
    static createClassProperty(batchTablePropertyName, batchTablePropertyValue) {
        let type;
        let componentType;
        let array = false;
        let count = undefined;
        if (tilesets_2.TileTableData.isBatchTableBinaryBodyReference(batchTablePropertyValue)) {
            type = tilesets_2.TileTableData.convertLegacyTypeToType(batchTablePropertyValue.type);
            componentType = tilesets_2.TileTableData.convertLegacyComponentTypeToComponentType(batchTablePropertyValue.componentType);
        }
        else if (Array.isArray(batchTablePropertyValue)) {
            const commonType = TypeDetection_1.TypeDetection.computeCommonType(batchTablePropertyValue);
            if (commonType === undefined) {
                type = "STRING";
            }
            else {
                type = commonType;
                if (commonType !== "STRING" && commonType !== "BOOLEAN") {
                    componentType = TypeDetection_1.TypeDetection.computeCommonComponentType(batchTablePropertyValue);
                }
            }
            array = TypeDetection_1.TypeDetection.containsOnlyArrays(batchTablePropertyValue);
            if (array) {
                count = TypeDetection_1.TypeDetection.computeCommonArrayLegth(batchTablePropertyValue);
            }
        }
        else {
            throw new tilesets_1.TileFormatError(`Batch table JSON property ${batchTablePropertyName} was ` +
                `not a binary body reference and not an array`);
        }
        const classProperty = {
            name: batchTablePropertyName,
            description: `Generated from ${batchTablePropertyName}`,
            type: type,
            componentType: componentType,
            enumType: undefined,
            array: array,
            count: count,
            normalized: false,
            offset: undefined,
            scale: undefined,
            max: undefined,
            min: undefined,
            required: true,
            noData: undefined,
            default: undefined,
            semantic: undefined,
        };
        return classProperty;
    }
}
exports.BatchTableClassProperties = BatchTableClassProperties;
//# sourceMappingURL=BatchTableClassProperties.js.map