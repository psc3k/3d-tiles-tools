import { ClassProperty } from "../../structure";
/**
 * Methods to create `ClassProperty` objects from batch table properties.
 *
 * @internal
 */
export declare class BatchTableClassProperties {
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
    static createClassProperty(batchTablePropertyName: string, batchTablePropertyValue: any): ClassProperty;
}
//# sourceMappingURL=BatchTableClassProperties.d.ts.map