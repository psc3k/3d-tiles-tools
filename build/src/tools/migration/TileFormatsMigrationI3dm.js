"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileFormatsMigrationI3dm = void 0;
const core_1 = require("@gltf-transform/core");
const core_2 = require("@gltf-transform/core");
const functions_1 = require("@gltf-transform/functions");
const functions_2 = require("@gltf-transform/functions");
const functions_3 = require("@gltf-transform/functions");
const extensions_1 = require("@gltf-transform/extensions");
const base_1 = require("../../base");
const tilesets_1 = require("../../tilesets");
const tilesets_2 = require("../../tilesets");
const tilesets_3 = require("../../tilesets");
const tilesets_4 = require("../../tilesets");
const tilesets_5 = require("../../tilesets");
const gltf_extensions_1 = require("../../gltf-extensions");
const GltfTransform_1 = require("../contentProcessing/GltfTransform");
const TileFormatsMigration_1 = require("./TileFormatsMigration");
const TileTableDataToStructuralMetadata_1 = require("./TileTableDataToStructuralMetadata");
const GltfUpgrade_1 = require("./GltfUpgrade");
const InstanceFeaturesUtils_1 = require("../gltfExtensionsUtils/InstanceFeaturesUtils");
const StructuralMetadataUtils_1 = require("../gltfExtensionsUtils/StructuralMetadataUtils");
const base_2 = require("../../base");
const logger = base_2.Loggers.get("migration");
/**
 * Methods for converting I3DM tile data into GLB
 *
 * @internal
 */
class TileFormatsMigrationI3dm {
    /**
     * Convert the given I3DM data into a glTF asset
     *
     * @param i3dmBuffer - The I3DM buffer
     * @param externalResourceResolver - A function that will be used to resolve
     * external resources, like GLB data if the I3DM uses `header.gltfFormat=0`
     * (meaning that the payload is not GLB data, but only a GLB URI).
     * @param gltfUpAxis - The up-axis to assume for the glTF data in
     * the given B3DM, defaulting to "Y".
     * @returns The GLB buffer
     * @throws TileFormatError If the I3DM contained an external GLB URI
     * that could not resolved by the given resolver
     */
    static async convertI3dmToGlb(i3dmBuffer, externalResourceResolver, gltfUpAxis) {
        const tileData = tilesets_1.TileFormats.readTileData(i3dmBuffer);
        const batchTable = tileData.batchTable.json;
        const batchTableBinary = tileData.batchTable.binary;
        const featureTable = tileData.featureTable.json;
        const featureTableBinary = tileData.featureTable.binary;
        const numInstances = featureTable.INSTANCES_LENGTH;
        if (TileFormatsMigration_1.TileFormatsMigration.DEBUG_LOG_FILE_CONTENT &&
            logger.isLevelEnabled("trace")) {
            logger.trace("Batch table:\n" + JSON.stringify(batchTable, null, 2));
            logger.trace("Feature table:\n" + JSON.stringify(featureTable, null, 2));
        }
        // Obtain the GLB buffer for the tile data. With `gltfFormat===1`, it
        // is stored directly as the payload. Otherwise (with `gltfFormat===0`)
        // the payload is a URI that has to be resolved.
        const glbBuffer = await tilesets_1.TileFormats.obtainGlbPayload(tileData, externalResourceResolver);
        if (!glbBuffer) {
            throw new tilesets_2.TileFormatError(`Could not resolve external GLB from I3DM file`);
        }
        const document = await GltfUpgrade_1.GltfUpgrade.obtainDocument(glbBuffer, gltfUpAxis);
        const root = document.getRoot();
        const io = await GltfTransform_1.GltfTransform.getIO();
        if (TileFormatsMigration_1.TileFormatsMigration.DEBUG_LOG_FILE_CONTENT &&
            logger.isLevelEnabled("trace")) {
            const jsonDocument = await io.writeJSON(document);
            const json = jsonDocument.json;
            logger.trace("Input glTF JSON:\n" + JSON.stringify(json, null, 2));
        }
        // Flatten all nodes in the glTF asset. This will collapse
        // all nodes to essentially be "root nodes" in the scene.
        // The transforms of these nodes will be the identity matrix,
        // and their previous transforms will be baked into the meshes.
        const nodes = root.listNodes();
        for (const node of nodes) {
            (0, functions_2.clearNodeParent)(node);
            (0, functions_1.clearNodeTransform)(node);
        }
        document.setLogger(new core_2.Logger(core_2.Logger.Verbosity.WARN));
        await document.transform((0, functions_3.prune)());
        // Insert a single root node above the "flattened" nodes
        TileFormatsMigration_1.TileFormatsMigration.makeSingleRoot(document);
        // Compute the positions in world space (taking the RTC_CENTER
        // into account if it was present)
        const worldPositions = tilesets_3.TileTableDataI3dm.createWorldPositions(featureTable, featureTableBinary, numInstances);
        // Compute the center of all positions. This will later be
        // inserted as a translation of the root node, similar to
        // the RTC_CENTER, even if no RTC_CENTER was given explicitly
        const positionsCenter = tilesets_5.VecMath.computeMean3D(worldPositions);
        // Compute the translations, relative to the center,
        const translations = base_1.Iterables.map(worldPositions, (p) => {
            return tilesets_5.VecMath.subtract(p, positionsCenter);
        });
        // Compute the 4x4 rotation quaternions and scaling factors from
        // the I3DM data, and use this to compute the whole
        // instancing transforms as 4x4 matrices.
        const rotationQuaternions = tilesets_3.TileTableDataI3dm.createRotationQuaternions(featureTable, featureTableBinary, numInstances);
        const scales3D = tilesets_3.TileTableDataI3dm.createScales3D(featureTable, featureTableBinary, numInstances);
        const i3dmMatrices = tilesets_3.TileTableDataI3dm.createMatrices(translations, rotationQuaternions, scales3D, numInstances);
        const matrixZupToYup = tilesets_5.VecMath.createZupToYupPacked4();
        const matrixYupToZup = tilesets_5.VecMath.createYupToZupPacked4();
        // Compute the data for the instancing extension accessors
        // from the I3DM matrices, by decomposing them into their
        // TRS (translation, rotation, scale) components and putting
        // these into flat arrays.
        const translationsForAccessor = [];
        const rotationsForAccessor = [];
        const scalesForAccessor = [];
        for (const i3dmMatrix of i3dmMatrices) {
            // Convert the matrix into the right coordinate system
            const gltfMatrix = tilesets_5.VecMath.multiplyAll4([
                matrixZupToYup,
                i3dmMatrix,
                matrixYupToZup,
            ]);
            const trs = tilesets_5.VecMath.decomposeMatrixTRS(gltfMatrix);
            translationsForAccessor.push(...trs.t);
            rotationsForAccessor.push(...trs.r);
            scalesForAccessor.push(...trs.s);
        }
        // Create the glTF-Transform accessors containing the data
        // for the EXT_mesh_gpu_instancing extension
        const buffer = root.listBuffers()[0];
        const translationsAccessor = document.createAccessor();
        translationsAccessor.setArray(new Float32Array(translationsForAccessor));
        translationsAccessor.setType(core_1.Accessor.Type.VEC3);
        translationsAccessor.setBuffer(buffer);
        const rotationsAccessor = document.createAccessor();
        rotationsAccessor.setArray(new Float32Array(rotationsForAccessor));
        rotationsAccessor.setType(core_1.Accessor.Type.VEC4);
        rotationsAccessor.setBuffer(buffer);
        const scalesAccessor = document.createAccessor();
        scalesAccessor.setArray(new Float32Array(scalesForAccessor));
        scalesAccessor.setType(core_1.Accessor.Type.VEC3);
        scalesAccessor.setBuffer(buffer);
        // If there is a batch table, convert it into a property table
        // using the EXT_structural_metadata extension. This method
        // will convert the batch table into a metadata schema and
        // assign it to the document. It will return `undefined´ if
        // there is no batch table (or when no metadata schema can
        // be created from the batch table)
        const propertyTable = TileTableDataToStructuralMetadata_1.TileTableDataToStructuralMetadata.convertBatchTableToPropertyTable(document, batchTable, batchTableBinary, numInstances);
        // If the input data defines a BATCH_ID, then convert this into
        // the EXT_instance_features extension. If the input does
        // NOT define a BATCH_ID, but has a batch table (as indicated
        // by the propertyTable being defined), then create artificial
        // batch IDs, consisting of consecutive numbers.
        let featureIdComponentType = "UINT16";
        let batchIds = undefined;
        const batchId = featureTable.BATCH_ID;
        if (batchId) {
            const iterable = tilesets_3.TileTableDataI3dm.createBatchIds(featureTable, featureTableBinary);
            if (iterable) {
                batchIds = [...iterable];
            }
            const componentType = tilesets_4.TileTableData.obtainBatchIdComponentType(featureTable);
            if (componentType !== undefined) {
                featureIdComponentType = componentType;
            }
        }
        else if (propertyTable) {
            batchIds = [];
            for (let i = 0; i < numInstances; i++) {
                batchIds.push(i);
            }
        }
        // If there are batch IDs (either from the BATCH_ID, or created
        // as consecutive numbers for accessing the property table), then
        // use them to create a feature ID accessor that will be used
        // in the EXT_instance_features extension
        let extInstanceFeatures = undefined;
        let instanceFeaturesAccessor = undefined;
        let featureCount = 0;
        const featureIdAttributeNumber = 0;
        const featureIdAttributeName = `_FEATURE_ID_${featureIdAttributeNumber}`;
        if (batchIds) {
            extInstanceFeatures = document.createExtension(gltf_extensions_1.EXTInstanceFeatures);
            instanceFeaturesAccessor = document.createAccessor();
            instanceFeaturesAccessor.setBuffer(buffer);
            instanceFeaturesAccessor.setType(core_1.Accessor.Type.SCALAR);
            const batchIdsArray = [...batchIds];
            featureCount = new Set(batchIdsArray).size;
            if (featureIdComponentType === "UINT8") {
                instanceFeaturesAccessor.setArray(new Uint8Array(batchIdsArray));
            }
            else if (featureIdComponentType === "UINT16") {
                instanceFeaturesAccessor.setArray(new Uint16Array(batchIdsArray));
            }
            else if (featureIdComponentType === "UINT32") {
                instanceFeaturesAccessor.setArray(new Uint8Array(batchIdsArray));
            }
            else {
                throw new tilesets_2.TileFormatError(`Expected UINT8, UINT16 or UINT32 as the ` +
                    `BATCH_ID component type, but found ${featureIdComponentType}`);
            }
        }
        // Create the EXT_mesh_gpu_instancing extension in the document
        const extMeshGPUInstancing = document.createExtension(extensions_1.EXTMeshGPUInstancing);
        extMeshGPUInstancing.setRequired(true);
        // Assign the extension objects to each node that has a mesh
        // (always using the same accessors)
        const nodesWithMesh = root
            .listNodes()
            .filter((n) => n.getMesh() !== null);
        for (const node of nodesWithMesh) {
            // Assign the EXT_mesh_gpu_instancing extension object
            const meshGpuInstancing = extMeshGPUInstancing.createInstancedMesh();
            meshGpuInstancing.setAttribute("TRANSLATION", translationsAccessor);
            if (rotationsAccessor) {
                meshGpuInstancing.setAttribute("ROTATION", rotationsAccessor);
            }
            if (scalesAccessor) {
                meshGpuInstancing.setAttribute("SCALE", scalesAccessor);
            }
            if (instanceFeaturesAccessor) {
                meshGpuInstancing.setAttribute(featureIdAttributeName, instanceFeaturesAccessor);
            }
            node.setExtension("EXT_mesh_gpu_instancing", meshGpuInstancing);
            // If the input defined batch ID, then assign them using the
            // EXT_instance_features extension.
            if (instanceFeaturesAccessor && extInstanceFeatures) {
                // Create a `FeatureId` object. This object indicates that the IDs
                // are stored in the attribute `_FEATURE_ID_${attributeNumber}`
                const featureIdFromAttribute = extInstanceFeatures.createFeatureId();
                featureIdFromAttribute.setFeatureCount(featureCount);
                featureIdFromAttribute.setAttribute(featureIdAttributeNumber);
                if (propertyTable) {
                    featureIdFromAttribute.setPropertyTable(propertyTable);
                }
                // Create a `InstanceFeatures` object that contains the
                // created `FeatureID` objects, and store it as an
                // extension object in the `Node`
                const instanceFeatures = extInstanceFeatures.createInstanceFeatures();
                instanceFeatures.addFeatureId(featureIdFromAttribute);
                node.setExtension("EXT_instance_features", instanceFeatures);
            }
        }
        // Add the "positions center" that was previously subtracted
        // from the positions, as a translation of the root node of
        // the glTF.
        TileFormatsMigration_1.TileFormatsMigration.applyRtcCenter(document, positionsCenter);
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
exports.TileFormatsMigrationI3dm = TileFormatsMigrationI3dm;
//# sourceMappingURL=TileFormatsMigrationI3dm.js.map