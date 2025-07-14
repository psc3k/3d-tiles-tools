"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileFormatsMigrationB3dm = void 0;
const tilesets_1 = require("../../tilesets");
const tilesets_2 = require("../../tilesets");
const GltfTransform_1 = require("../contentProcessing/GltfTransform");
const TileTableDataToStructuralMetadata_1 = require("./TileTableDataToStructuralMetadata");
const TileTableDataToMeshFeatures_1 = require("./TileTableDataToMeshFeatures");
const TileFormatsMigration_1 = require("./TileFormatsMigration");
const GltfUpgrade_1 = require("./GltfUpgrade");
const InstanceFeaturesUtils_1 = require("../gltfExtensionsUtils/InstanceFeaturesUtils");
const StructuralMetadataUtils_1 = require("../gltfExtensionsUtils/StructuralMetadataUtils");
const base_1 = require("../../base");
const logger = base_1.Loggers.get("migration");
/**
 * Methods for converting B3DM tile data into GLB
 *
 * @internal
 */
class TileFormatsMigrationB3dm {
    /**
     * Convert the given B3DM data into a glTF asset
     *
     * @param b3dmBuffer - The B3DM buffer
     * @param gltfUpAxis - The up-axis to assume for the glTF data in
     * the given B3DM, defaulting to "Y".
     * @returns The GLB buffer
     */
    static async convertB3dmToGlb(b3dmBuffer, gltfUpAxis) {
        const tileData = tilesets_1.TileFormats.readTileData(b3dmBuffer);
        const batchTable = tileData.batchTable.json;
        const batchTableBinary = tileData.batchTable.binary;
        const featureTable = tileData.featureTable.json;
        const featureTableBinary = tileData.featureTable.binary;
        if (TileFormatsMigration_1.TileFormatsMigration.DEBUG_LOG_FILE_CONTENT &&
            logger.isLevelEnabled("trace")) {
            logger.trace("Batch table:\n" + JSON.stringify(batchTable, null, 2));
            logger.trace("Feature table:\n" + JSON.stringify(featureTable, null, 2));
        }
        const document = await GltfUpgrade_1.GltfUpgrade.obtainDocument(tileData.payload, gltfUpAxis);
        const root = document.getRoot();
        // If the feature table defines an `RTC_CENTER`, then insert
        // a new root node above each scene node, that carries the
        // RTC_CENTER as its translation
        if (featureTable.RTC_CENTER) {
            const rtcCenter = tilesets_2.TileTableData.obtainRtcCenter(featureTable.RTC_CENTER, featureTableBinary);
            TileFormatsMigration_1.TileFormatsMigration.applyRtcCenter(document, rtcCenter);
        }
        // If there are batches, then convert the batch table into
        // an `EXT_structural_metadata` property table, and convert
        // the `_BATCHID` attributes of the primitives into
        // `_FEATURE_ID_0` attributes
        const numRows = featureTable.BATCH_LENGTH;
        if (numRows > 0) {
            const propertyTable = TileTableDataToStructuralMetadata_1.TileTableDataToStructuralMetadata.convertBatchTableToPropertyTable(document, batchTable, batchTableBinary, numRows);
            const batchIdToFeatureIdAccessor = new Map();
            const meshes = root.listMeshes();
            for (const mesh of meshes) {
                const primitives = mesh.listPrimitives();
                for (const primitive of primitives) {
                    // Convert the `_BATCHID` attribute into a `_FEATURE_ID_0`
                    // attribute using the `EXT_mesh_features` extension
                    const featureId = TileTableDataToMeshFeatures_1.TileTableDataToMeshFeatures.convertBatchIdToMeshFeatures(document, primitive, batchIdToFeatureIdAccessor);
                    if (featureId && propertyTable) {
                        featureId.setPropertyTable(propertyTable);
                    }
                }
            }
            // Dispose all former batch ID accessors that have been
            // converted into feature ID accessors
            for (const batchIdAccessor of batchIdToFeatureIdAccessor.keys()) {
                batchIdAccessor.dispose();
            }
        }
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
        // Create the GLB buffer
        const glb = await io.writeBinary(document);
        return Buffer.from(glb);
    }
}
exports.TileFormatsMigrationB3dm = TileFormatsMigrationB3dm;
//# sourceMappingURL=TileFormatsMigrationB3dm.js.map