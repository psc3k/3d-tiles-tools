/// <reference types="node" />
/// <reference types="node" />
/**
 * Methods for extracting `number`- or `bigint` values or arrays thereof
 * from `Buffer` objects
 *
 * @internal
 */
export declare class NumericBuffers {
    /**
     * Obtains a single number or bigint from the given buffer,
     * at the given index, based on the given component type.
     *
     * @param buffer - The buffer
     * @param index - The index
     * @param componentType - The component type, e.g `FLOAT32` or `UINT16`
     * @returns The number or bigint
     * @throws MetadataError If the given `componentType` is not valid
     */
    static getNumericFromBuffer(buffer: Buffer, index: number, componentType: string): number | bigint;
    /**
     * Obtains an array of number or bigint values from the given buffer,
     * starting at the given index, based on the given component type.
     *
     * @param buffer - The buffer
     * @param index - The index
     * @param arrayLength - The length of the array, in number of elements
     * @param componentType - The component type, e.g `FLOAT32` or `UINT16`
     * @returns The number or bigint array
     * @throws MetadataError If the given `componentType` is not valid
     */
    static getNumericArrayFromBuffer(buffer: Buffer, index: number, arrayLength: number, componentType: string): (number | bigint)[];
    /**
     * Obtains a typed array of number or bigint values from the given buffer,
     * starting at the given index, based on the given component type.
     *
     * @param buffer - The buffer
     * @param index - The index
     * @param arrayLength - The length of the array, in number of elements
     * @param componentType - The component type, e.g `FLOAT32` or `UINT16`
     * @returns The number or bigint typed array
     * @throws MetadataError If the given `componentType` is not valid
     */
    private static getTypedArrayFromBuffer;
    /**
     * Returns an array that contains the `number`- or `bigint` values
     * that are stored in the given buffer
     *
     * @param buffer - The buffer
     * @param componentType - The component type
     * @returns The number or bigint array
     * @throws MetadataError If the given `componentType` is not valid
     */
    static getNumericBufferAsArray(buffer: Buffer, componentType: string): any;
    /**
     * Returns a boolean value from the specified buffer, at the specified
     * bit index
     *
     * @param buffer - The buffer
     * @param index - The bit index
     * @returns The boolean value
     */
    static getBooleanFromBuffer(buffer: Buffer, index: number): boolean;
}
//# sourceMappingURL=NumericBuffers.d.ts.map