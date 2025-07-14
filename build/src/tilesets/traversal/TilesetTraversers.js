"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilesetTraversers = void 0;
const path_1 = __importDefault(require("path"));
const base_1 = require("../../base");
const base_2 = require("../../base");
const base_3 = require("../../base");
const base_4 = require("../../base");
const base_5 = require("../../base");
const TilesetSources_1 = require("../tilesetData/TilesetSources");
const TilesetSourceResourceResolver_1 = require("../tilesetData/TilesetSourceResourceResolver");
const ExplicitTraversedTile_1 = require("./ExplicitTraversedTile");
const TilesetSource3tz_1 = require("../packages/TilesetSource3tz");
const base_6 = require("../../base");
const logger = base_6.Loggers.get("traversal");
/**
 * Internal utility methods for tileset traversal, used for
 * the `TilesetTraverser` implementation.
 *
 * @internal
 */
class TilesetTraversers {
    /**
     * Creates an iterable over the traversed tile instances for the specified
     * tileset from the given tileset source.
     *
     * @param tilesetSource - The tileset source
     * @param tilesetJsonFileName - The tileset JSON file name
     * @param traverseExternalTilesets - Whether external tileset tiles
     * should be included in the result
     * @param depthFirst - Whether the iteration order should be depth-first
     * @returns The traversed tile iterable
     * @throws TilesetError If the given tileset source does not contain
     * a tileset JSON with the given name.
     */
    static async createTraversedTilesIterable(tilesetSource, tilesetJsonFileName, traverseExternalTilesets, depthFirst) {
        const traversedRootTile = await TilesetTraversers.createTraversedRootTile(tilesetSource, tilesetJsonFileName);
        return TilesetTraversers.createIterableFromTraversedTile(traversedRootTile, traverseExternalTilesets, depthFirst);
    }
    /**
     * Creates an iterable over the traversed tile instances that start at
     * the given traversed tile.
     *
     * @param traversedRootTile - The tile to start the traversal from
     * @param traverseExternalTilesets - Whether external tileset tiles
     * should be included in the result
     * @param depthFirst - Whether the iteration order should be depth-first
     * @returns The traversed tile iterable
     */
    static createIterableFromTraversedTile(traversedRootTile, traverseExternalTilesets, depthFirst) {
        const resultIterable = {
            [Symbol.asyncIterator]: () => {
                const stack = [traversedRootTile];
                return {
                    async next() {
                        const currentTraversedTile = depthFirst
                            ? stack.pop()
                            : stack.shift();
                        if (currentTraversedTile) {
                            const children = await currentTraversedTile.getChildren();
                            if (children.length === 0) {
                                if (traverseExternalTilesets) {
                                    // When there are no children, but external tilesets should
                                    // be traversed, determine the roots of external tilesets
                                    // and put them on the traversal stack
                                    const externalRoots = await TilesetTraversers.createExternalTilesetRoots(".", currentTraversedTile);
                                    stack.push(...externalRoots);
                                }
                            }
                            else {
                                stack.push(...children);
                            }
                            return { done: false, value: currentTraversedTile };
                        }
                        else {
                            return { done: true, value: undefined };
                        }
                    },
                };
            },
        };
        return resultIterable;
    }
    /**
     * Create a traversed tile for the root of the specified tileset from the
     * given tileset source.
     *
     * @param tilesetSource - The tileset source
     * @param tilesetJsonFileName - The tileset JSON file name
     * @returns The traversed tile
     * @throws TilesetError If the given tileset source does not contain
     * a tileset JSON with the given name.
     */
    static async createTraversedRootTile(tilesetSource, tilesetJsonFileName) {
        const tileset = await TilesetSources_1.TilesetSources.parseSourceValue(tilesetSource, tilesetJsonFileName);
        return TilesetTraversers.createTraversedRootTileForTileset(tilesetSource, tileset);
    }
    /**
     * Creates a traversed tile for the root tile of the given tileset from
     * the given tileset source.
     *
     * @param tilesetSource - The tileset source
     * @param tileset - The tileset from the tileset source
     * @returns The traversed tile
     */
    static async createTraversedRootTileForTileset(tilesetSource, tileset) {
        const resourceResolver = new TilesetSourceResourceResolver_1.TilesetSourceResourceResolver(".", tilesetSource);
        const schema = await TilesetTraversers.resolveSchema(tileset, resourceResolver);
        const root = tileset.root;
        const traversedTile = ExplicitTraversedTile_1.ExplicitTraversedTile.createRoot(tileset, root, schema, resourceResolver);
        return traversedTile;
    }
    /**
     * Create the nodes that are the roots of external tilesets
     * that are referred to by the given traversed tile.
     *
     * If the given tile does not have any contents or none of
     * them refers to a tileset, then an empty array is returned.
     *
     * @param baseUri - The URI against which content URI are resolved
     * in order to obtain an absolute URI. This is only used for the case
     * of package (3TZ or 3DTILES) content, to create a `TilesetSource`
     * from the absolute URI.
     * @param traversedTile - The `TraversedTile`
     * @returns The external tileset roots
     * @throws DataError If one of the external tilesets or
     * its associated files could not be resolved.
     */
    static async createExternalTilesetRoots(baseUri, traversedTile) {
        if (traversedTile.isImplicitTilesetRoot()) {
            return [];
        }
        const contents = traversedTile.getRawContents();
        if (contents.length === 0) {
            return [];
        }
        const resourceResolver = traversedTile.getResourceResolver();
        const externalRoots = [];
        for (const content of contents) {
            const contentUri = content.uri;
            // Try to obtain an external tileset from the content
            const externalTilesetContext = await TilesetTraversers.resolveExternalTilesetContext(baseUri, contentUri, resourceResolver);
            if (externalTilesetContext) {
                const externalTileset = externalTilesetContext.tileset;
                const externalResourceResolver = externalTilesetContext.resourceResolver;
                // If an external tileset was found, resolve its schema,
                // and create an explicit traversed tile for its root.
                const externalSchema = await TilesetTraversers.resolveSchema(externalTileset, externalResourceResolver);
                const externalRoot = new ExplicitTraversedTile_1.ExplicitTraversedTile(externalTileset, externalTileset.root, traversedTile.path + `/[external:${contentUri}]/root`, traversedTile.level + 1, traversedTile, externalSchema, externalResourceResolver);
                externalRoots.push(externalRoot);
            }
        }
        return externalRoots;
    }
    /**
     * Fetch the information that is required for creating the root
     * nodes of external tilesets from the given URI.
     *
     * If the given URI does not refer to an external tileset,
     * then `undefined` is returned.
     *
     * Otherwise, it will return the parsed `Tileset` object,
     * and the `ResourceResolver` that can be used to resolve
     * resources from this tileset.
     *
     * @param baseUri - The URI against which the given URI is resolved
     * in order to obtain an absolute URI. This is only used for the case
     * of package (3TZ or 3DTILES) content, to create a `TilesetSource`
     * from the absolute URI.
     * @param uri - The URI
     * @param resourceResolver - The `ResourceResolver`
     * @returns The tileset
     * @throws DataError If an external tileset could not be
     * resolved or parsed.
     */
    static async resolveExternalTilesetContext(baseUri, uri, resourceResolver) {
        const contentData = new base_2.LazyContentData(uri, resourceResolver);
        const contentDataType = await base_3.ContentDataTypeRegistry.findContentDataType(contentData);
        const isTileset = contentDataType === base_4.ContentDataTypes.CONTENT_TYPE_TILESET;
        // For external tileset JSON files, just return the parsed
        // tileset and a resource resolver that resolves against
        // the base directory of the tileset JSON file
        if (isTileset) {
            const externalTileset = await contentData.getParsedObject();
            const basePath = path_1.default.dirname(uri);
            const externalResourceResolver = resourceResolver.derive(basePath);
            const result = {
                tileset: externalTileset,
                resourceResolver: externalResourceResolver,
            };
            return result;
        }
        // For tileset packages, create a `TilesetSource`, extract
        // the `Tileset` object from its `tileset.json` file,
        // and return the `Tileset` and a resource resolver that
        // resolves against the tileset source.
        const isPackage = contentDataType === base_4.ContentDataTypes.CONTENT_TYPE_3TZ;
        if (isPackage) {
            const absoluteUri = base_5.Paths.join(baseUri, uri);
            const externalTilesetSource = new TilesetSource3tz_1.TilesetSource3tz();
            const tilesetJsonFileName = "tileset.json";
            // XXX TODO There is no matching 'close' call for this!
            try {
                await externalTilesetSource.open(absoluteUri);
            }
            catch (e) {
                logger.warn(`Could not open external tileset from ${absoluteUri} - ignoring`);
                return undefined;
            }
            let externalTileset;
            const tilesetJsonData = await externalTilesetSource.getValue(tilesetJsonFileName);
            if (!tilesetJsonData) {
                throw new base_1.DataError(`Could not resolve ${tilesetJsonFileName}`);
            }
            try {
                externalTileset = JSON.parse(tilesetJsonData.toString("utf-8"));
            }
            catch (e) {
                throw new base_1.DataError(`Could not parse tileset from ${tilesetJsonFileName}`);
            }
            if (!externalTileset) {
                throw new base_1.DataError(`Could not parse tileset from ${tilesetJsonFileName}`);
            }
            const externalResourceResolver = new TilesetSourceResourceResolver_1.TilesetSourceResourceResolver(".", externalTilesetSource);
            const result = {
                tileset: externalTileset,
                resourceResolver: externalResourceResolver,
            };
            return result;
        }
        return undefined;
    }
    /**
     * Resolve the `Schema` for the given tileset.
     *
     * This is either the `tileset.schema`, or the schema that is
     * obtained from the `tileset.schemaUri`, or `undefined` if
     * neither of them are present.
     *
     * @param tileset - The tileset
     * @param resourceResolver - The `ResourceResolver` for loading
     * the schema from the `schemaUri` if necessary
     * @returns The `Schema`, or `undefined` if there is none
     * @throws DataError If the schema from the `schemaUri`
     * could not be resolved or parsed.
     */
    static async resolveSchema(tileset, resourceResolver) {
        if (tileset.schema) {
            return tileset.schema;
        }
        if (tileset.schemaUri) {
            const uri = tileset.schemaUri;
            const schemaData = await resourceResolver.resolveData(uri);
            if (!schemaData) {
                throw new base_1.DataError(`Could not resolve ${uri}`);
            }
            try {
                const schema = JSON.parse(schemaData.toString("utf-8"));
                return schema;
            }
            catch (e) {
                throw new base_1.DataError(`Could not parse schema from ${uri}`);
            }
        }
        return undefined;
    }
}
exports.TilesetTraversers = TilesetTraversers;
//# sourceMappingURL=TilesetTraversers.js.map