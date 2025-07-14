"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileFormatsMigrationCmpt = void 0;
const base_1 = require("../../base");
const base_2 = require("../../base");
const tilesets_1 = require("../../tilesets");
const GltfTransform_1 = require("../contentProcessing/GltfTransform");
const TileFormatsMigration_1 = require("./TileFormatsMigration");
const base_3 = require("../../base");
const logger = base_3.Loggers.get("migration");
/**
 * Methods for converting CMPT tile data into GLB
 *
 * @internal
 */
class TileFormatsMigrationCmpt {
    /**
     * Convert the given CMPT data into a glTF asset
     *
     * @param cmptBuffer - The CMPT buffer
     * @param externalResourceResolver - A function that will be used to resolve
     * external resources, like GLB data if the CMPT contains I3DM that use
     * `header.gltfFormat=0` (meaning that the payload is not GLB data,
     * but only a GLB URI).
     * @param gltfUpAxis - The glTF up-axis, defaulting to "Y"
     * @returns The GLB buffer
     * @throws TileFormatError If the CMPT contained I3DM with an external
     * GLB URI * that could not resolved by the given resolver
     */
    static async convertCmptToGlb(cmptBuffer, externalResourceResolver, gltfUpAxis) {
        const compositeTileData = tilesets_1.TileFormats.readCompositeTileData(cmptBuffer);
        const innerTileBuffers = compositeTileData.innerTileBuffers;
        const innerTileGlbs = [];
        for (const innerTileBuffer of innerTileBuffers) {
            const innerTileType = await base_1.ContentDataTypeRegistry.findType("", innerTileBuffer);
            if (innerTileType === base_2.ContentDataTypes.CONTENT_TYPE_PNTS) {
                logger.trace("Converting inner PNTS tile to GLB...");
                const innerTileGlb = await TileFormatsMigration_1.TileFormatsMigration.convertPntsToGlb(innerTileBuffer);
                innerTileGlbs.push(innerTileGlb);
            }
            else if (innerTileType === base_2.ContentDataTypes.CONTENT_TYPE_B3DM) {
                logger.trace("Converting inner B3DM tile to GLB...");
                const innerTileGlb = await TileFormatsMigration_1.TileFormatsMigration.convertB3dmToGlb(innerTileBuffer, gltfUpAxis);
                innerTileGlbs.push(innerTileGlb);
            }
            else if (innerTileType === base_2.ContentDataTypes.CONTENT_TYPE_I3DM) {
                logger.trace("Converting inner I3DM tile to GLB...");
                const innerTileGlb = await TileFormatsMigration_1.TileFormatsMigration.convertI3dmToGlb(innerTileBuffer, externalResourceResolver, gltfUpAxis);
                innerTileGlbs.push(innerTileGlb);
            }
            else if (innerTileType === base_2.ContentDataTypes.CONTENT_TYPE_CMPT) {
                logger.trace("Converting inner CMPT tile to GLB...");
                const innerTileGlb = await TileFormatsMigration_1.TileFormatsMigration.convertCmptToGlb(innerTileBuffer, externalResourceResolver, gltfUpAxis);
                innerTileGlbs.push(innerTileGlb);
            }
            else {
                logger.warn("Unknown type for inner tile of CMPT: " +
                    innerTileType +
                    " - ignoring");
            }
        }
        // Create a resolver for the "schemaUri" strings that could
        // be contained in the resulting GLBs. (There won't be any
        // schema URIs, because the migration will only ever create
        // schemas that are inlined, but the case has to be handled
        // by the generic glTF merging process nevertheless...)
        const schemaUriResolver = async (schemaUri) => {
            const schemaJsonBuffer = await externalResourceResolver(schemaUri);
            if (schemaJsonBuffer === undefined) {
                return undefined;
            }
            try {
                const schemaJson = JSON.parse(schemaJsonBuffer.toString());
                return schemaJson;
            }
            catch (e) {
                console.error("Could not parse schema from " + schemaUri);
                return undefined;
            }
        };
        const document = await GltfTransform_1.GltfTransform.merge(innerTileGlbs, schemaUriResolver);
        const io = await GltfTransform_1.GltfTransform.getIO();
        const glb = await io.writeBinary(document);
        return Buffer.from(glb);
    }
}
exports.TileFormatsMigrationCmpt = TileFormatsMigrationCmpt;
//# sourceMappingURL=TileFormatsMigrationCmpt.js.map