import { PropertyModel } from "./PropertyModel";
/**
 * Utility methods related to `PropertyModel` instances
 *
 * @internal
 */
export declare class PropertyModels {
    /**
     * Creates an iterable over the values of the given property model
     *
     * @param propertyModel - The property model
     * @param numElements - The number of elements
     * @returns The iterable
     */
    static createIterable(propertyModel: PropertyModel, numElements: number): Iterable<any>;
    /**
     * Creates an iterable over the values of the given property
     * model, assuming that they are numeric arrays
     *
     * @param propertyModel - The property model
     * @param numElements - The number of elements
     * @returns The iterable
     */
    static createNumericArrayIterable(propertyModel: PropertyModel, numElements: number): Iterable<number[]>;
    /**
     * Creates an iterable over the values of the given property
     * model, assuming that they are numeric scalars
     *
     * @param propertyModel - The property model
     * @param numElements - The number of elements
     * @returns The iterable
     */
    static createNumericScalarIterable(propertyModel: PropertyModel, numElements: number): Iterable<number>;
}
//# sourceMappingURL=PropertyModels.d.ts.map