"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanArrayPropertyModel = void 0;
const BinaryPropertyModels_1 = require("./BinaryPropertyModels");
const NumericBuffers_1 = require("./NumericBuffers");
/**
 * Implementation of a `PropertyModel` for boolean arrays
 *
 * @internal
 */
class BooleanArrayPropertyModel {
    constructor(valuesBuffer, arrayOffsetsBuffer, arrayOffsetType, count) {
        this.valuesBuffer = valuesBuffer;
        this.arrayOffsetsBuffer = arrayOffsetsBuffer;
        this.arrayOffsetType = arrayOffsetType;
        this.count = count;
    }
    /** {@inheritDoc PropertyModel.getPropertyValue} */
    getPropertyValue(index) {
        const valuesBuffer = this.valuesBuffer;
        const arrayOffsetsBuffer = this.arrayOffsetsBuffer;
        const arrayOffsetType = this.arrayOffsetType;
        const count = this.count;
        const arraySlice = BinaryPropertyModels_1.BinaryPropertyModels.computeSlice(index, arrayOffsetsBuffer, arrayOffsetType, count);
        const arrayOffset = arraySlice.offset;
        const arrayLength = arraySlice.length;
        const result = Array(arrayLength);
        for (let i = 0; i < arrayLength; i++) {
            const n = arrayOffset + i;
            const element = NumericBuffers_1.NumericBuffers.getBooleanFromBuffer(valuesBuffer, n);
            result[i] = element;
        }
        return result;
    }
}
exports.BooleanArrayPropertyModel = BooleanArrayPropertyModel;
//# sourceMappingURL=BooleanArrayPropertyModel.js.map