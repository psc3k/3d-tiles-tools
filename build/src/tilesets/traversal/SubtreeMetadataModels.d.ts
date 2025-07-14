import { Schema } from "../../structure";
import { BinarySubtreeData } from "../implicitTiling/BinarySubtreeData";
import { SubtreeInfo } from "../implicitTiling/SubtreeInfo";
import { SubtreeMetadataModel } from "./SubtreeMetadataModel";
/**
 * Methods to create `SubtreeMetadataModel` instances.
 *
 * @internal
 */
export declare class SubtreeMetadataModels {
    /**
     * Creates a `SubtreeMetadataModel` from the given data.
     *
     * This method receives...
     * - the `BinarySubtreeData` that contains the data that was read
     *   from a `subtree` file
     * - the `SubtreeInfo` that was already created from this binary
     *   data and the implicit tiling information, and which provides
     *   information about the tile- and content availability
     * - the actual metadata `Schema`
     *
     * It will create the `SubtreeMetadataModel`, which is a convenience
     * layer around the binary representation of the metadata that is
     * contained in the subtree: It contains...
     * - one `PropertyTableModel` for accessing the metadata that
     *   is associated with the available tiles
     * - one or more `PropertyTableModel` instances for accessing the
     *   metadata that is associated with each of the 'contents'
     *   that are available in the subtree
     *
     * @param binarySubtreeData - The `BinarySubtreeData`
     * @param subtreeInfo - The `SubtreeInfo`
     * @param schema - The metadata `Schema`
     * @returns The `SubtreeMetadataModel`
     * @throws MetadataError If the input was structurally invalid
     */
    static create(binarySubtreeData: BinarySubtreeData, subtreeInfo: SubtreeInfo, schema: Schema): SubtreeMetadataModel;
    /**
     * Computes the mapping of indices inside the availability
     * information to the number that says how many elements
     * have been available up to this index, if the element
     * at the respective index is available.
     *
     * Yes, that sounds complicated. But it is used for accessing
     * the metadata that is stored in the subtree (see the 3D Tiles
     * specification, "ImplicitTiling - Tile Metadata").
     *
     * Quote:
     * "If `i` available tiles occur before a particular tile, that
     * tile’s property values are stored at index `i` of each
     * property value array."
     *
     * This means that when the availability bitstream is
     * [1, 0, 1, 1, 0] then this method will return an array
     * [0, _, 1, 2, _].
     *
     * The value of the `_` entries will be set to `-1`.
     *
     * @param availabilityInfo - The `AvailabilityInfo`
     * @returns The index mapping
     */
    private static computeAvailabilityIndexingMapping;
}
//# sourceMappingURL=SubtreeMetadataModels.d.ts.map