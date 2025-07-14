"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringArrayPropertyModel = void 0;
const BinaryPropertyModels_1 = require("./BinaryPropertyModels");
const ArrayBuffers_1 = require("./ArrayBuffers");
/**
 * Implementation of a `PropertyModel` for string arrays
 *
 * @internal
 */
class StringArrayPropertyModel {
    constructor(valuesBuffer, arrayOffsetsBuffer, arrayOffsetType, stringOffsetsBuffer, stringOffsetType, count) {
        this.valuesBuffer = valuesBuffer;
        this.arrayOffsetsBuffer = arrayOffsetsBuffer;
        this.arrayOffsetType = arrayOffsetType;
        this.stringOffsetsBuffer = stringOffsetsBuffer;
        this.stringOffsetType = stringOffsetType;
        this.count = count;
    }
    /** {@inheritDoc PropertyModel.getPropertyValue} */
    getPropertyValue(index) {
        const valuesBuffer = this.valuesBuffer;
        const arrayOffsetsBuffer = this.arrayOffsetsBuffer;
        const arrayOffsetType = this.arrayOffsetType;
        const stringOffsetsBuffer = this.stringOffsetsBuffer;
        const stringOffsetType = this.stringOffsetType;
        const count = this.count;
        const arraySlice = BinaryPropertyModels_1.BinaryPropertyModels.computeSlice(index, arrayOffsetsBuffer, arrayOffsetType, count);
        const arrayOffset = arraySlice.offset;
        const arrayLength = arraySlice.length;
        const result = Array(arrayLength);
        for (let i = 0; i < arrayLength; i++) {
            const n = arrayOffset + i;
            const stringSlice = BinaryPropertyModels_1.BinaryPropertyModels.computeSlice(n, stringOffsetsBuffer, stringOffsetType, undefined);
            const stringOffset = stringSlice.offset;
            const stringLength = stringSlice.length;
            const arrayBuffer = ArrayBuffers_1.ArrayBuffers.fromBuffer(valuesBuffer);
            const element = StringArrayPropertyModel.decoder.decode(arrayBuffer.slice(stringOffset, stringOffset + stringLength));
            result[i] = element;
        }
        return result;
    }
}
exports.StringArrayPropertyModel = StringArrayPropertyModel;
// Implementation note:
// Either the `arrayOffsetsBuffer` or the `count` may be undefined.
// When `arrayOffsetsBuffer` is defined, then this indicates a
// variable-length array. When the `count` is defined, then this
// indicates a fixed-length array.
StringArrayPropertyModel.decoder = new TextDecoder();
//# sourceMappingURL=StringArrayPropertyModel.js.map