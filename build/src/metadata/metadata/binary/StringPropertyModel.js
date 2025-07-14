"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringPropertyModel = void 0;
const BinaryPropertyModels_1 = require("./BinaryPropertyModels");
const ArrayBuffers_1 = require("./ArrayBuffers");
/**
 * Implementation of a `PropertyModel` for strings
 *
 * @internal
 */
class StringPropertyModel {
    constructor(valuesBuffer, stringOffsetsBuffer, stringOffsetType) {
        this.valuesBuffer = valuesBuffer;
        this.stringOffsetsBuffer = stringOffsetsBuffer;
        this.stringOffsetType = stringOffsetType;
    }
    /** {@inheritDoc PropertyModel.getPropertyValue} */
    getPropertyValue(index) {
        const valuesBuffer = this.valuesBuffer;
        const stringOffsetsBuffer = this.stringOffsetsBuffer;
        const stringOffsetType = this.stringOffsetType;
        const stringSlice = BinaryPropertyModels_1.BinaryPropertyModels.computeSlice(index, stringOffsetsBuffer, stringOffsetType, undefined);
        const stringOffset = stringSlice.offset;
        const stringLength = stringSlice.length;
        const arrayBuffer = ArrayBuffers_1.ArrayBuffers.fromBuffer(valuesBuffer);
        const result = StringPropertyModel.decoder.decode(arrayBuffer.slice(stringOffset, stringOffset + stringLength));
        return result;
    }
}
exports.StringPropertyModel = StringPropertyModel;
StringPropertyModel.decoder = new TextDecoder();
//# sourceMappingURL=StringPropertyModel.js.map