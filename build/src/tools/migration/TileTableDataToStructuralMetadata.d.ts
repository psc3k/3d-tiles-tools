/// <reference types="node" />
/// <reference types="node" />
import { Document } from "@gltf-transform/core";
import { Primitive } from "@gltf-transform/core";
import { BatchTable } from "../../structure";
import { StructuralMetadataPropertyTable as PropertyTable } from "../../gltf-extensions";
import { PropertyModel } from "../../metadata";
/**
 * Methods to transfer information from (legacy) batch table data
 * into glTF assets, using the `EXT_structural_metadata` extension.
 *
 * @internal
 */
export declare class TileTableDataToStructuralMetadata {
    /**
     * Assigns the data from the given batch table to the (single)
     * mesh primitive that represents a point cloud, by converting
     * the batch table columns into vertex attributes.
     *
     * If the given batch table does not contain any properties
     * that can be expressed as vertex attributes, then nothing
     * is done.
     *
     * @param document - The glTF-Transform document
     * @param primitive - The glTF-Transform mesh primitive
     * @param batchTable - The `BatchTable`
     * @param batchTableBinary - The batch table binary
     * @param externalProperties - External properties. These are property
     * model instances for properties of the batch table that are not
     * stored in the batch table binary, and accessed with the property ID.
     * @param numRows - The number of rows (POINTS_LENGTH) of the table
     */
    static assignPerPointProperties(document: Document, primitive: Primitive, batchTable: BatchTable, batchTableBinary: Buffer, externalProperties: {
        [key: string]: PropertyModel;
    }, numRows: number): void;
    /**
     * Converts the data from the given batch table into a
     * `EXT_structural_metadata` property table.
     *
     * This will create a metadata schema from the given batch
     * table, create the top-level `EXT_structural_metadata`
     * extension object that contains the schema definition
     * and the property table definition.
     *
     * @param document - The glTF-Transform document
     * @param batchTable - The `BatchTable`
     * @param batchTableBinary - The batch table binary
     * @param numRows - The number of rows (BATCH_LENGTH) of the table
     * @returns The property table
     */
    static convertBatchTableToPropertyTable(document: Document, batchTable: BatchTable, batchTableBinary: Buffer, numRows: number): PropertyTable | undefined;
    /**
     * Process values from an arbitrarily-typed property, so that the
     * resulting values can be stored as a STRING-typed property in
     * the binary representation of a property table.
     *
     * Any `null` and `undefined` elements will remain `null`
     * or `undefined`, respectively.
     * For array values, this method will be applied recursively to
     * the elements.
     * For object-typed values, the JSON representation of the
     * elements will be returned.
     * For other types, the string representation of the elements
     * will be returned.
     *
     * @param values - The input values
     * @returns The resulting values
     */
    private static processAny;
}
//# sourceMappingURL=TileTableDataToStructuralMetadata.d.ts.map