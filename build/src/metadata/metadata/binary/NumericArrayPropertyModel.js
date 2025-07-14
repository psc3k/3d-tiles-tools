"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumericArrayPropertyModel = void 0;
const MetadataTypes_1 = require("../MetadataTypes");
const NumericBuffers_1 = require("./NumericBuffers");
const BinaryPropertyModels_1 = require("./BinaryPropertyModels");
/**
 * Implementation of a `PropertyModel` for numeric array types.
 *
 * This includes all types that have numeric component types,
 * i.e. the `SCALAR`, `VECn` and `MATn` types, and the
 * (binary, and therefore numeric) representation of `ENUM`.
 *
 * @internal
 */
class NumericArrayPropertyModel {
    constructor(type, valuesBuffer, componentType, arrayOffsetsBuffer, arrayOffsetType, count) {
        this.type = type;
        this.valuesBuffer = valuesBuffer;
        this.componentType = componentType;
        this.arrayOffsetsBuffer = arrayOffsetsBuffer;
        this.arrayOffsetType = arrayOffsetType;
        this.count = count;
    }
    /** {@inheritDoc PropertyModel.getPropertyValue} */
    getPropertyValue(index) {
        const type = this.type;
        const valuesBuffer = this.valuesBuffer;
        const componentType = this.componentType;
        const arrayOffsetsBuffer = this.arrayOffsetsBuffer;
        const arrayOffsetType = this.arrayOffsetType;
        const count = this.count;
        const componentCount = MetadataTypes_1.MetadataTypes.componentCountForType(type);
        const arraySlice = BinaryPropertyModels_1.BinaryPropertyModels.computeSlice(index, arrayOffsetsBuffer, arrayOffsetType, count);
        const arrayOffset = arraySlice.offset;
        const arrayLength = arraySlice.length;
        const result = Array(arrayLength);
        for (let i = 0; i < arrayLength; i++) {
            const n = arrayOffset + i;
            let element = undefined;
            if (type === "SCALAR" || type === "ENUM") {
                element = NumericBuffers_1.NumericBuffers.getNumericFromBuffer(valuesBuffer, n, componentType);
            }
            else {
                element = NumericBuffers_1.NumericBuffers.getNumericArrayFromBuffer(valuesBuffer, n, componentCount, componentType);
            }
            result[i] = element;
        }
        return result;
    }
}
exports.NumericArrayPropertyModel = NumericArrayPropertyModel;
//# sourceMappingURL=NumericArrayPropertyModel.js.map