import { ResourceResolver } from "../../base";
import { Tileset } from "../../structure";
import { Schema } from "../../structure";
import { TilesetSource } from "../tilesetData/TilesetSource";
import { TraversedTile } from "./TraversedTile";
/**
 * Internal utility methods for tileset traversal, used for
 * the `TilesetTraverser` implementation.
 *
 * @internal
 */
export declare class TilesetTraversers {
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
    static createTraversedTilesIterable(tilesetSource: TilesetSource, tilesetJsonFileName: string, traverseExternalTilesets: boolean, depthFirst: boolean): Promise<AsyncIterable<TraversedTile>>;
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
    static createIterableFromTraversedTile(traversedRootTile: TraversedTile, traverseExternalTilesets: boolean, depthFirst: boolean): AsyncIterable<TraversedTile>;
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
    static createTraversedRootTile(tilesetSource: TilesetSource, tilesetJsonFileName: string): Promise<TraversedTile>;
    /**
     * Creates a traversed tile for the root tile of the given tileset from
     * the given tileset source.
     *
     * @param tilesetSource - The tileset source
     * @param tileset - The tileset from the tileset source
     * @returns The traversed tile
     */
    static createTraversedRootTileForTileset(tilesetSource: TilesetSource, tileset: Tileset): Promise<TraversedTile>;
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
    static createExternalTilesetRoots(baseUri: string, traversedTile: TraversedTile): Promise<TraversedTile[]>;
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
    private static resolveExternalTilesetContext;
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
    static resolveSchema(tileset: Tileset, resourceResolver: ResourceResolver): Promise<Schema | undefined>;
}
//# sourceMappingURL=TilesetTraversers.d.ts.map