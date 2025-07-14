"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumericPropertyModel = void 0;
const NumericBuffers_1 = require("./NumericBuffers");
const MetadataTypes_1 = require("../MetadataTypes");
/**
 * Implementation of a `PropertyModel` for numeric types.
 *
 * This includes all types that have numeric component types,
 * i.e. the `SCALAR`, `VECn` and `MATn` types, and the
 * (binary, and therefore numeric) representation of `ENUM`.
 *
 * @internal
 */
class NumericPropertyModel {
    constructor(type, valuesBuffer, componentType) {
        this.type = type;
        this.valuesBuffer = valuesBuffer;
        this.componentType = componentType;
    }
    /** {@inheritDoc PropertyModel.getPropertyValue} */
    getPropertyValue(index) {
        const valuesBuffer = this.valuesBuffer;
        const componentType = this.componentType;
        const type = this.type;
        if (type === "SCALAR" || type === "ENUM") {
            return NumericBuffers_1.NumericBuffers.getNumericFromBuffer(valuesBuffer, index, componentType);
        }
        const componentCount = MetadataTypes_1.MetadataTypes.componentCountForType(type);
        return NumericBuffers_1.NumericBuffers.getNumericArrayFromBuffer(valuesBuffer, index, componentCount, componentType);
    }
}
exports.NumericPropertyModel = NumericPropertyModel;
//# sourceMappingURL=NumericPropertyModel.js.map