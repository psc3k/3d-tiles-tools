"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPropertyModel = void 0;
/**
 * Default implementation of a `PropertyModel` that is
 * backed by untyped JSON data.
 *
 * @internal
 */
class DefaultPropertyModel {
    constructor(data) {
        this.data = data;
    }
    /** {@inheritDoc PropertyModel.getPropertyValue} */
    getPropertyValue(index) {
        return this.data[index];
    }
}
exports.DefaultPropertyModel = DefaultPropertyModel;
//# sourceMappingURL=DefaultPropertyModel.js.map