"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileFormatsMigrationPnts = void 0;
const tilesets_1 = require("../../tilesets");
const tilesets_2 = require("../../tilesets");
const tilesets_3 = require("../../tilesets");
const metadata_1 = require("../../metadata");
const GltfTransform_1 = require("../contentProcessing/GltfTransform");
const PntsPointClouds_1 = require("../pointClouds/PntsPointClouds");
const GltfTransformPointClouds_1 = require("../pointClouds/GltfTransformPointClouds");
const TileFormatsMigration_1 = require("./TileFormatsMigration");
const TileTableDataToStructuralMetadata_1 = require("./TileTableDataToStructuralMetadata");
const Ids_1 = require("./Ids");
const InstanceFeaturesUtils_1 = require("../gltfExtensionsUtils/InstanceFeaturesUtils");
const StructuralMetadataUtils_1 = require("../gltfExtensionsUtils/StructuralMetadataUtils");
const base_1 = require("../../base");
const logger = base_1.Loggers.get("migration");
/**
 * Methods for converting PNTS tile data into GLB
 *
 * @internal
 */
class TileFormatsMigrationPnts {
    /**
     * Convert the given PNTS data into a glTF asset
     *
     * @param pntsBuffer - The PNTS buffer
     * @returns The GLB buffer
     */
    static async convertPntsToGlb(pntsBuffer) {
        const tileData = tilesets_1.TileFormats.readTileData(pntsBuffer);
        const batchTable = tileData.batchTable.json;
        const batchTableBinary = tileData.batchTable.binary;
        const featureTable = tileData.featureTable.json;
        const featureTableBinary = tileData.featureTable.binary;
        if (TileFormatsMigration_1.TileFormatsMigration.DEBUG_LOG_FILE_CONTENT &&
            logger.isLevelEnabled("trace")) {
            logger.trace("Batch table:\n" + JSON.stringify(batchTable, null, 2));
            logger.trace("Feature table:\n" + JSON.stringify(featureTable, null, 2));
        }
        // Create a `ReadablePointCloud` that allows accessing
        // the PNTS data
        const pntsPointCloud = await PntsPointClouds_1.PntsPointClouds.create(featureTable, featureTableBinary, batchTable);
        // Check if the point cloud contains color information that may
        // require an alpha component (i.e. RGBA or CONSTANT_RGBA)
        const mayRequireAlpha = PntsPointClouds_1.PntsPointClouds.mayRequireAlpha(featureTable);
        // Create a glTF-Transform document+primitive that represent
        // the point cloud
        const gltfTransformPointCloud = GltfTransformPointClouds_1.GltfTransformPointClouds.build(pntsPointCloud, mayRequireAlpha);
        const document = gltfTransformPointCloud.document;
        const primitive = gltfTransformPointCloud.primitive;
        // Apply quantization to the point cloud, if the input positions
        // had been quantized, or the normals had been oct-encoded
        const hasQuantizedPositions = PntsPointClouds_1.PntsPointClouds.hasQuantizedPositions(featureTable);
        const hasOctEncodedNormals = PntsPointClouds_1.PntsPointClouds.hasOctEncodedNormals(featureTable);
        await GltfTransformPointClouds_1.GltfTransformPointClouds.applyQuantization(document, hasQuantizedPositions, hasOctEncodedNormals);
        // If the point cloud is batched, then convert any batch table
        // information into a property table
        if (featureTable.BATCH_LENGTH) {
            const numRows = featureTable.BATCH_LENGTH;
            const propertyTable = TileTableDataToStructuralMetadata_1.TileTableDataToStructuralMetadata.convertBatchTableToPropertyTable(document, batchTable, batchTableBinary, numRows);
            if (propertyTable) {
                const meshFeatures = primitive.getExtension("EXT_mesh_features");
                if (meshFeatures) {
                    const featureIds = meshFeatures.listFeatureIds();
                    for (const featureId of featureIds) {
                        featureId.setPropertyTable(propertyTable);
                    }
                }
            }
        }
        else {
            // The point cloud is not batched. Assign any batch table
            // information as per-point properties
            const externalProperties = TileFormatsMigrationPnts.computeExternalProperties(pntsPointCloud, batchTable);
            const numRows = featureTable.POINTS_LENGTH;
            TileTableDataToStructuralMetadata_1.TileTableDataToStructuralMetadata.assignPerPointProperties(document, primitive, batchTable, batchTableBinary, externalProperties, numRows);
        }
        // Create the GLB buffer
        const io = await GltfTransform_1.GltfTransform.getIO();
        if (TileFormatsMigration_1.TileFormatsMigration.DEBUG_LOG_FILE_CONTENT &&
            logger.isLevelEnabled("trace")) {
            const jsonDocument = await io.writeJSON(document);
            const json = jsonDocument.json;
            logger.trace("Output glTF JSON:\n" + JSON.stringify(json, null, 2));
            logger.trace("Metadata information:");
            logger.trace(InstanceFeaturesUtils_1.InstanceFeaturesUtils.createInstanceFeaturesInfoString(document));
            logger.trace(StructuralMetadataUtils_1.StructuralMetadataUtils.createStructuralMetadataInfoString(document));
        }
        const glb = await io.writeBinary(document);
        return Buffer.from(glb);
    }
    /**
     * Computes a mapping from property IDs to `PropertyModel` objects
     * for properties that are defined in the batch table, but not stored
     * in the batch table binary.
     *
     * Yeah, I'm looking at you, 3DTILES_draco_point_compression...
     *
     * The properties of the batch table that are draco-compressed
     * are actually read during the Draco decoding pass of the
     * feature table. The decoded values are stored as plain
     * attributes in the `ReadablePointCloud`. This method will
     * create `PropertyModel` objects for these attributes, so that
     * they can later be used for creating the accessors of the
     * attributes in the `EXT_structural_metadata` extension.
     *
     * @param pntsPointCloud - The point cloud that contains the PNTS data
     * @param batchTable - The batch table
     * @returns The mapping
     */
    static computeExternalProperties(pntsPointCloud, batchTable) {
        const externalPropertiesById = {};
        const dracoPropertyNames = tilesets_3.BatchTables.obtainDracoPropertyNames(batchTable);
        for (const propertyName of dracoPropertyNames) {
            const propertyValue = batchTable[propertyName];
            if (propertyValue) {
                if (tilesets_2.TileTableData.isBatchTableBinaryBodyReference(propertyValue)) {
                    const propertyId = Ids_1.Ids.sanitize(propertyName);
                    const attributeValues = pntsPointCloud.getAttributeValues(propertyId);
                    if (attributeValues) {
                        const propertyModel = new metadata_1.DefaultPropertyModel([
                            ...attributeValues,
                        ]);
                        externalPropertiesById[propertyId] = propertyModel;
                    }
                }
            }
        }
        return externalPropertiesById;
    }
}
exports.TileFormatsMigrationPnts = TileFormatsMigrationPnts;
//# sourceMappingURL=TileFormatsMigrationPnts.js.map