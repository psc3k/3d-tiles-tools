"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanPropertyModel = void 0;
const NumericBuffers_1 = require("./NumericBuffers");
/**
 * Implementation of a `PropertyModel` for booleans
 *
 * @internal
 */
class BooleanPropertyModel {
    constructor(valuesBuffer) {
        this.valuesBuffer = valuesBuffer;
    }
    /** {@inheritDoc PropertyModel.getPropertyValue} */
    getPropertyValue(index) {
        const valuesBuffer = this.valuesBuffer;
        const result = NumericBuffers_1.NumericBuffers.getBooleanFromBuffer(valuesBuffer, index);
        return result;
    }
}
exports.BooleanPropertyModel = BooleanPropertyModel;
//# sourceMappingURL=BooleanPropertyModel.js.map