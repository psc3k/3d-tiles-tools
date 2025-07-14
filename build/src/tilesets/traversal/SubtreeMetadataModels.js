"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubtreeMetadataModels = void 0;
const base_1 = require("../../base");
const metadata_1 = require("../../metadata");
const metadata_2 = require("../../metadata");
const metadata_3 = require("../../metadata");
/**
 * Methods to create `SubtreeMetadataModel` instances.
 *
 * @internal
 */
class SubtreeMetadataModels {
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
    static create(binarySubtreeData, subtreeInfo, schema) {
        const subtree = binarySubtreeData.subtree;
        const binaryBufferStructure = binarySubtreeData.binaryBufferStructure;
        const binaryBufferData = binarySubtreeData.binaryBufferData;
        // Obtain the structural information about the schema that
        // is required for creating the property table models
        const propertyTableModels = [];
        const binaryEnumInfo = metadata_2.MetadataUtilities.computeBinaryEnumInfo(schema);
        const propertyTables = subtree.propertyTables;
        if (propertyTables) {
            const classes = schema.classes ?? {};
            for (const propertyTable of propertyTables) {
                const classId = propertyTable.class;
                const metadataClass = classes[classId];
                if (!metadataClass) {
                    throw new metadata_1.MetadataError(`The property table refers to class ${classId}, ` +
                        `but the schema does not define this class`);
                }
                // Create the `BinaryPropertyTable` for each property table,
                // which contains everything that is required for creating
                // the binary PropertyTableModel
                const binaryMetadata = {
                    metadataClass: metadataClass,
                    binaryEnumInfo: binaryEnumInfo,
                    binaryBufferStructure: binaryBufferStructure,
                    binaryBufferData: binaryBufferData,
                };
                const binaryPropertyTable = {
                    propertyTable: propertyTable,
                    binaryMetadata: binaryMetadata,
                };
                const propertyTableModel = new metadata_3.BinaryPropertyTableModel(binaryPropertyTable);
                propertyTableModels.push(propertyTableModel);
            }
        }
        // Obtain the property table model that is pointed to
        // by subtree.tileMetadata
        let tileMetadataModel = undefined;
        if ((0, base_1.defined)(subtree.tileMetadata)) {
            tileMetadataModel = propertyTableModels[subtree.tileMetadata];
            if (!tileMetadataModel) {
                throw new metadata_1.MetadataError(`The subtree tileMetadata refers to property ` +
                    `table ${subtree.tileMetadata}, but the subtree only ` +
                    `defines ${propertyTableModels.length} property tables`);
            }
        }
        // Obtain the property table models that are pointed to
        // by subtree.contentMetadata
        const contentMetadataModels = [];
        if (subtree.contentMetadata) {
            for (const contentMetadata of subtree.contentMetadata) {
                const contentMetadataModel = propertyTableModels[contentMetadata];
                if (!contentMetadataModel) {
                    throw new metadata_1.MetadataError(`The subtree contentMetadata refers to property ` +
                        `table ${contentMetadata}, but the subtree only ` +
                        `defines ${propertyTableModels.length} property tables`);
                }
            }
        }
        // Compute the mapping from (available) tiles to the indices
        // of their metadata (i.e. the row index in the property table
        // that contains the metadata for the respective tile)
        const tileAvailabilityInfo = subtreeInfo.tileAvailabilityInfo;
        const tileMetadataIndexMapping = SubtreeMetadataModels.computeAvailabilityIndexingMapping(tileAvailabilityInfo);
        // Compute the mapping from (available) contents to the indices
        // of their metadata (i.e. the row index in the property table
        // that contains the metadata for the respective content)
        const contentMetadataIndexMappings = [];
        const contentAvailabilityInfos = subtreeInfo.contentAvailabilityInfos;
        for (const contentAvailabilityInfo of contentAvailabilityInfos) {
            const contentMetadataIndexMapping = SubtreeMetadataModels.computeAvailabilityIndexingMapping(contentAvailabilityInfo);
            contentMetadataIndexMappings.push(contentMetadataIndexMapping);
        }
        const subtreeMetadataModel = {
            schema: schema,
            tileMetadataModel: tileMetadataModel,
            tileIndexMapping: tileMetadataIndexMapping,
            contentMetadataModels: contentMetadataModels,
            contentIndexMappings: contentMetadataIndexMappings,
        };
        return subtreeMetadataModel;
    }
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
    static computeAvailabilityIndexingMapping(availabilityInfo) {
        const n = availabilityInfo.length;
        const indexMapping = new Array(n);
        let index = 0;
        for (let i = 0; i < n; i++) {
            const available = availabilityInfo.isAvailable(i);
            if (available) {
                indexMapping[i] = index;
                index++;
            }
            else {
                indexMapping[i] = -1;
            }
        }
        return indexMapping;
    }
}
exports.SubtreeMetadataModels = SubtreeMetadataModels;
//# sourceMappingURL=SubtreeMetadataModels.js.map