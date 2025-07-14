import { Tileset } from "../../structure";
/**
 * A class for creating `Tileset` JSON objects from tile content files.
 *
 * @internal
 */
export declare class TilesetJsonCreator {
    /**
     * Creates a tileset that uses the specified files as its
     * tile contents.
     *
     * Many details about the resulting tileset are intentionally
     * not specified.
     *
     * @param baseDir - The base directory against which the
     * content URIs are resolved
     * @param contentUris - The content URIs
     * @returns The tileset
     * @throws Error if content data could not be read
     */
    static createTilesetFromContents(baseDir: string, contentUris: string[]): Promise<Tileset>;
    /**
     * Creates a leaf tile with the specified tile content.
     *
     * The content data will be loaded from the specified file, given
     * as `<baseDir>/<contentUri>`. The content data type will be
     * determined.
     *
     * If the content data type is one of the supported types (which
     * are unspecified for now), then its bounding volume will be
     * computed, and used as the bounding volume of the resulting tile.
     *
     * If the content data type is not supported, then a warning
     * will be printed and `undefined` will be returned.
     *
     * @param baseDir - The base directory against which the
     * content URI is resolved
     * @param contentUri - The content URI
     * @returns The leaf tile
     * @throws Error if content data could not be read
     */
    private static createLeafTileFromContent;
    /**
     * Creates a tileset with the given leaf tiles.
     *
     * If there is only one leaf tile, then this will become
     * the root of the tileset. Otherwise, the tileset root
     * will have the given tiles as its children.
     *
     * @param leafTiles - The leaf tiles
     * @returns The tileset
     */
    private static createTilesetFromLeafTiles;
    /**
     * Computes a bounding volume box for the given tile
     *
     * If the tile does not have children, then this will return
     * a bounding volume box that is created from the bounding
     * volume of the given tile.
     *
     * Otherwise, it will compute the bounding volumes of the
     * children, transform each of them with the child transform,
     * and return the union of these transformed child bounding
     * volumes.
     *
     * @param tile - The tile
     * @param parentTransform - The transform of the parent tile,
     * as a 16-element array
     * @returns The bounding volume box
     */
    private static computeTileBoundingVolumeBox;
    /**
     * Compute the bounding box for a tile with the given children.
     *
     * This will compute the bounding volumes of the children,
     * transform each of them with the child transform, and
     * return the union of these transformed child bounding
     * volumes.
     *
     * @param children - The children
     * @returns The bounding volume box
     */
    private static computeChildrenBoundingVolumeBox;
    /**
     * Creates a parent tile for the given child tiles.
     *
     * It will compute the bounding volume box of the parent tile
     * from the bounding volume boxes of the children, and a
     * suitable (but unspecified) geometric error for the parent tile.
     *
     * @param children - The children
     * @returns The parent tile
     */
    private static createParentTile;
    /**
     * Creates a leaf tile from the given data
     *
     * @param boundingVolume - The bounding volume
     * @param geometricError - The geometric error
     * @param contentUri - The content URI
     * @returns The tile
     */
    private static createLeafTile;
    /**
     * Computes the transform for a tile to place it at the given cartographic
     * position.
     *
     * The given position is either (longitudeDegrees, latitudeDegrees)
     * or (longitudeDegrees, latitudeDegrees, heightMeters). The returned
     * array will be that of a 4x4 matrix in column-major order.
     *
     * @param cartographicPositionDegrees - The cartographic position
     * @returns The transform
     * @throws DeveloperError If the given array has a length smaller than 2
     */
    static computeTransformFromCartographicPositionDegrees(cartographicPositionDegrees: number[]): number[];
    /**
     * Computes the transform for a tile to place it at the given cartographic
     * position and rotation.
     *
     * The given position is either (longitudeDegrees, latitudeDegrees)
     * or (longitudeDegrees, latitudeDegrees, heightMeters). The rotation is
     * (headingDegrees, pitchDegrees, rollDegrees).
     *
     * @param cartographicPositionDegrees - The cartographic position
     * @param rotationDegrees - The rotation in degrees
     * @returns The transform
     * @throws DeveloperError If the given array has a length smaller than 2
     */
    static computeTransformFromCartographicPositionAndRotationDegrees(cartographicPositionDegrees: number[], rotationDegrees: number[]): number[];
}
//# sourceMappingURL=TilesetJsonCreator.d.ts.map