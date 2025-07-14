/// <reference types="node" />
/// <reference types="node" />
import { PropertyModel } from "../PropertyModel";
import { BinaryPropertyTable } from "./BinaryPropertyTable";
/**
 * Methods related to `PropertyModel` instances that are created
 * from binary data.
 *
 * @internal
 */
export declare class BinaryPropertyModels {
    /**
     * Creates a `PropertyModel` for the specified property in the
     * given property table, based on the given binary metadata.
     *
     * This assumes that the input is structurally valid.
     *
     * This will determine the type of the property and access its
     * associated data (i.e. the required buffer views data) from
     * the given `BinaryMetadata`. For each type of property,
     * this will return a matching implementation of the
     * `PropertyModel` interface.
     *
     * @param propertyTable - The `PropertyTable`
     * @param binaryMetadata - The `BinaryMetadata`
     * @param propertyId - The property ID
     * @returns The `PropertyModel`
     * @throws MetadataError If the input data is not structurally
     * valid
     */
    static createPropertyModel(binaryPropertyTable: BinaryPropertyTable, propertyId: string): PropertyModel;
    /**
     * Internal method to create a `PropertyModel` based on all
     * the raw data elements that have been obtained from the
     * `BinaryPropertyTable` for a specific property.
     *
     * @param propertyId - The property ID
     * @param type - The type
     * @param componentType - The component type
     * @param isArray - Whether the property is an array
     * @param count - The count (array length)
     * @param valuesBufferViewData - The values data
     * @param arrayOffsetsBufferViewData - The array offsets data
     * @param arrayOffsetType - The array offsets type
     * @param stringOffsetsBufferViewData - The string offsets data
     * @param stringOffsetType - The string offsets type
     * @param enumValueType - The enum value type
     * @returns The `PropertyModel`
     * @throws MetadataError if the given data is inconsistent
     */
    static createPropertyModelInternal(propertyId: string, type: string, componentType: string | undefined, isArray: boolean, count: number | undefined, valuesBufferViewData: Buffer, arrayOffsetsBufferViewData: Buffer | undefined, arrayOffsetType: string, stringOffsetsBufferViewData: Buffer | undefined, stringOffsetType: string, enumValueType: string | undefined): PropertyModel;
    /**
     * Returns the 'slice' information that is given by an offsets
     * buffer or a fixed number.
     *
     * This returns `{ offset, length }` for the `arrayOffsets` or
     * `stringOffsets` of a property, for a given index.
     *
     * When the given `count` is defined, then the result will
     * just be `{ index * count, count }`.
     *
     * Otherwise, the result will be `{ offset, length }`, where `offset`
     * is the offset that is read from the given buffer at index `index`,
     * and `length` is `offset[index+1] - offset[index]`.
     *
     * @param index - The index
     * @param offsetsBuffer - The offsets
     * @param offsetType - The `componentType` for the offsets
     * @param count - The count
     * @returns The slice information
     * @throws MetadataError If both the `count` and the `offsetsBuffer`
     * are `undefined`.
     */
    static computeSlice(index: number, offsetsBuffer: Buffer | undefined, offsetType: string, count: number | undefined): {
        offset: number;
        length: number;
    };
}
//# sourceMappingURL=BinaryPropertyModels.d.ts.map