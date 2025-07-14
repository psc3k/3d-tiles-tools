"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilesetStages = void 0;
const base_1 = require("../../base");
const base_2 = require("../../base");
const base_3 = require("../../base");
const ContentStages_1 = require("./ContentStages");
/**
 * Methods to create `TilesetStage` objects.
 *
 * @internal
 */
class TilesetStages {
    /**
     * Creates a tileset stage that performs the "gzip" operation
     *
     * @param includedContentTypes - The array of `ContentDataType` strings
     * that the operation should be applied to (or `undefined` if it should
     * be applied to all data types)
     * @returns The tileset stage
     */
    static createGzip(includedContentTypes) {
        const tilesetStage = {
            name: TilesetStages.TILESET_STAGE_GZIP,
            description: "Compresses each entry with GZIP",
            includedContentTypes: includedContentTypes,
        };
        return tilesetStage;
    }
    /**
     * Creates a content stage that performs the "ungzip" operation
     *
     * @returns The content stage
     */
    static createUngzip() {
        const contentStage = {
            name: TilesetStages.TILESET_STAGE_UNGZIP,
            description: "Uncompress each entry that was compressed with GZIP",
        };
        return contentStage;
    }
    /**
     * Creates a tileset stage that performs the "upgrade" operation
     *
     * @returns The tileset stage
     */
    static createUpgrade() {
        const tilesetStage = {
            name: TilesetStages.TILESET_STAGE_UPGRADE,
            description: "Upgrade the input tileset to the latest version",
        };
        return tilesetStage;
    }
    /**
     * Creates a tileset stage that performs the "combine" operation
     *
     * @returns The tileset stage
     */
    static createCombine() {
        const tilesetStage = {
            name: TilesetStages.TILESET_STAGE_COMBINE,
            description: "Combine all external tilesets into one",
        };
        return tilesetStage;
    }
    /**
     * Creates a tileset stage from the given parameters.
     *
     * @param name - The `name` of the tileset stage
     * @param description - The `description` of the tileset stage
     * @param contentStages - The content stages
     * @returns The tileset stage
     */
    static create(name, description, contentStages) {
        const tilesetStage = {
            name: name,
            description: description,
            contentStages: contentStages,
        };
        return tilesetStage;
    }
    /**
     * Creates a `TilesetStage` object from the given (untyped) JSON.
     *
     * @param tilesetStageJson - The JSON object
     * @returns The `TilesetStage` object
     * @throws DeveloperError When the input was not valid
     */
    static createTilesetStage(tilesetStageJson) {
        if (typeof tilesetStageJson === "string") {
            const tilesetStage = {
                name: tilesetStageJson,
                contentStages: [],
            };
            return tilesetStage;
        }
        if (!(0, base_1.defined)(tilesetStageJson.name)) {
            throw new base_2.DeveloperError("The tilesetStage JSON does not define a name");
        }
        let contentStages = undefined;
        if (tilesetStageJson.contentStages) {
            contentStages = [];
            for (const contentStageJson of tilesetStageJson.contentStages) {
                const contentStage = ContentStages_1.ContentStages.createContentStage(contentStageJson);
                contentStages.push(contentStage);
            }
        }
        const tilesetStage = {
            name: tilesetStageJson.name,
            contentStages: contentStages,
            includedContentTypes: tilesetStageJson.includedContentTypes,
            excludedContentTypes: tilesetStageJson.excludedContentTypes,
        };
        // Convert the (legacy) "tilesOnly" flag into
        // a set of included content types
        if (tilesetStageJson.tilesOnly === true) {
            tilesetStage.includedContentTypes = [
                base_3.ContentDataTypes.CONTENT_TYPE_B3DM,
                base_3.ContentDataTypes.CONTENT_TYPE_I3DM,
                base_3.ContentDataTypes.CONTENT_TYPE_PNTS,
                base_3.ContentDataTypes.CONTENT_TYPE_CMPT,
                base_3.ContentDataTypes.CONTENT_TYPE_VCTR,
                base_3.ContentDataTypes.CONTENT_TYPE_GEOM,
                base_3.ContentDataTypes.CONTENT_TYPE_GLB,
                base_3.ContentDataTypes.CONTENT_TYPE_GLTF,
            ];
        }
        return tilesetStage;
    }
}
exports.TilesetStages = TilesetStages;
/**
 * The `name` that identifies the "gzip" tileset stage
 */
TilesetStages.TILESET_STAGE_GZIP = "gzip";
/**
 * The `name` that identifies the "ungzip" tileset stage
 */
TilesetStages.TILESET_STAGE_UNGZIP = "ungzip";
/**
 * The `name` that identifies the "combine" tileset stage
 */
TilesetStages.TILESET_STAGE_COMBINE = "combine";
/**
 * The `name` that identifies the "upgrade" tileset stage
 */
TilesetStages.TILESET_STAGE_UPGRADE = "upgrade";
//# sourceMappingURL=TilesetStages.js.map