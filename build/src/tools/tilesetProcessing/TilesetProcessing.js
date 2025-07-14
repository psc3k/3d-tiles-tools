"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilesetProcessing = void 0;
const tilesets_1 = require("../../tilesets");
/**
 * Internal utility methods for the tileset processing
 *
 * @internal
 */
class TilesetProcessing {
    /**
     * Resolve the `Schema` for the given tileset.
     *
     * This is either the `tileset.schema`, or the schema that is
     * obtained from the `tileset.schemaUri`, or `undefined` if
     * neither of them are present.
     *
     * @param tilesetSource - The `TilesetSource`
     * @param tileset - The tileset
     * @returns The `Schema`, or `undefined` if there is none
     * @throws DeveloperError If the source is not opened
     * @throws TilesetError If the schema from the `schemaUri`
     * could not be resolved or parsed.
     */
    static async resolveSchema(tilesetSource, tileset) {
        if (tileset.schema) {
            return tileset.schema;
        }
        if (tileset.schemaUri) {
            const schema = await tilesets_1.TilesetSources.parseSourceValue(tilesetSource, tileset.schemaUri);
            return schema;
        }
        return undefined;
    }
}
exports.TilesetProcessing = TilesetProcessing;
//# sourceMappingURL=TilesetProcessing.js.map