import { BinaryPropertyTable } from "../../metadata";
import { EXTStructuralMetadata } from "../../gltf-extensions";
import { StructuralMetadataPropertyTable as PropertyTable } from "../../gltf-extensions";
/**
 * Methods for creating `PropertyTable` objects for the glTF-Transform
 * implementation of the `EXT_structural_metadata` implementation.
 *
 * These methods are convenience methods for creating the property table
 * instances, as the actual 'model' classes of glTF-Transform.
 *
 * The implementation of the extension does not depend on this class.
 * It would be possible to create the PropertyTable objects by assigning
 * all properties and data manually and programmatically. But instead
 * of manually assigning things like tha `values/arrayOffsets/stringOffsets`
 * buffer data, this class allows to build the instance based on a
 * `BinaryPropertyTable`, which is the summary of the "raw" data that a
 * property table consists of, and can be built conveniently with the
 * `BinaryPropertyTableBuilder` class.
 *
 * The general usage pattern is
 * ```
 * // Build the BinaryPropertyTable:
 * const b = BinaryPropertyTableBuilder.create(schema, "exampleClass", "Name");
 * b.addProperty(..., ...);
 * const binaryPropertyTable = b.build();
 *
 * // Create a glTF-Transform PropertyTable object from
 * // the BinaryPropertyTable:
 * const propertyTable = StructuralMetadataPropertyTables.create(
 *   extStructuralMetadata,
 *   binaryPropertyTable
 * );
 * ```
 *
 * @internal
 */
export declare class StructuralMetadataPropertyTables {
    /**
     * Creates a new instance of a `PropertyTable`, based on the given input.
     *
     * @param extStructuralMetadata - The `EXTStructuralMetadata` object
     * that will be used for creating the instances of the 'model' classes
     * that are part of the glTF-Transform implementation of the
     * `EXT_structural_metadata` extension.
     * @param binaryPropertyTable - The `BinaryPropertyTable` that contains
     * all (raw) information that is required for building the property
     * table.
     * @throws MetadataError On errors (to be defined more precisely)
     */
    static create(extStructuralMetadata: EXTStructuralMetadata, binaryPropertyTable: BinaryPropertyTable): PropertyTable;
    /**
     * Creates a single `PropertyTableProperty`, to be put into the
     * glTF-Transform `PropertyTable` object, based on the given
     * input data.
     *
     * @param extStructuralMetadata - The `EXTStructuralMetdadata` for
     * creating the glTF-Transform model objects
     * @param binaryPropertyTable - The `BinaryPropertyTable` that
     * contains all the input data
     * @param propertyId - The ID (name) of the property
     * @returns The `PropertyTableProperty`
     * @throws MetadataError On errors (to be defined more precisely)
     */
    private static createPropertyTableProperty;
}
//# sourceMappingURL=StructuralMetadataPropertyTables.d.ts.map