"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyModels = void 0;
/**
 * Utility methods related to `PropertyModel` instances
 *
 * @internal
 */
class PropertyModels {
    /**
     * Creates an iterable over the values of the given property model
     *
     * @param propertyModel - The property model
     * @param numElements - The number of elements
     * @returns The iterable
     */
    static createIterable(propertyModel, numElements) {
        const iterable = {
            [Symbol.iterator]: function* () {
                for (let index = 0; index < numElements; index++) {
                    const value = propertyModel.getPropertyValue(index);
                    yield value;
                }
            },
        };
        return iterable;
    }
    /**
     * Creates an iterable over the values of the given property
     * model, assuming that they are numeric arrays
     *
     * @param propertyModel - The property model
     * @param numElements - The number of elements
     * @returns The iterable
     */
    static createNumericArrayIterable(propertyModel, numElements) {
        const iterable = {
            [Symbol.iterator]: function* () {
                for (let index = 0; index < numElements; index++) {
                    const value = propertyModel.getPropertyValue(index);
                    yield value;
                }
            },
        };
        return iterable;
    }
    /**
     * Creates an iterable over the values of the given property
     * model, assuming that they are numeric scalars
     *
     * @param propertyModel - The property model
     * @param numElements - The number of elements
     * @returns The iterable
     */
    static createNumericScalarIterable(propertyModel, numElements) {
        const iterable = {
            [Symbol.iterator]: function* () {
                for (let index = 0; index < numElements; index++) {
                    const value = propertyModel.getPropertyValue(index);
                    yield value;
                }
            },
        };
        return iterable;
    }
}
exports.PropertyModels = PropertyModels;
//# sourceMappingURL=PropertyModels.js.map