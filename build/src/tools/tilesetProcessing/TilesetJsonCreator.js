"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilesetJsonCreator = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cesium_1 = require("cesium");
const cesium_2 = require("cesium");
const cesium_3 = require("cesium");
const cesium_4 = require("cesium");
const cesium_5 = require("cesium");
const cesium_6 = require("cesium");
const base_1 = require("../../base");
const BoundingVolumes_1 = require("./BoundingVolumes");
const ContentBoundingVolumes_1 = require("./ContentBoundingVolumes");
const base_2 = require("../../base");
const logger = base_2.Loggers.get("tilesetProcessing");
const DEFAULT_LEAF_GEOMETRIC_ERROR = 512;
const DEFAULT_TILESET_GEOMETRIC_ERROR = 4096;
/**
 * A class for creating `Tileset` JSON objects from tile content files.
 *
 * @internal
 */
class TilesetJsonCreator {
    // Implementation notes:
    //
    // The term "bounding volume box" refers to the 12-element number
    // arrays that are the `boundingVolume.box`.
    //
    // Nearly all functions of this class are 'private', and some of
    // them make assumptions about the structure of parts of the
    // tileset that only hold internally
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
    static async createTilesetFromContents(baseDir, contentUris) {
        const leafTiles = [];
        for (let i = 0; i < contentUris.length; i++) {
            const contentUri = contentUris[i];
            const leafTile = await TilesetJsonCreator.createLeafTileFromContent(baseDir, contentUri);
            if (leafTile) {
                leafTiles.push(leafTile);
            }
        }
        const tileset = TilesetJsonCreator.createTilesetFromLeafTiles(leafTiles);
        return tileset;
    }
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
    static async createLeafTileFromContent(baseDir, contentUri) {
        // Read the content data and determine its type
        const fileName = path_1.default.join(baseDir, contentUri);
        const data = fs_1.default.readFileSync(fileName);
        // Prepare the resolver for external GLBs in I3DM
        const externalGlbResolver = async (uri) => {
            const externalGlbUri = path_1.default.resolve(baseDir, uri);
            return fs_1.default.readFileSync(externalGlbUri);
        };
        const boundingVolumeBox = await ContentBoundingVolumes_1.ContentBoundingVolumes.computeContentDataBoundingVolumeBox(contentUri, data, externalGlbResolver);
        if (!boundingVolumeBox) {
            logger.warn(`Content data type of ${contentUri} is not supported.`);
            return undefined;
        }
        const boundingVolume = {
            box: boundingVolumeBox,
        };
        const geometricError = DEFAULT_LEAF_GEOMETRIC_ERROR;
        return TilesetJsonCreator.createLeafTile(boundingVolume, geometricError, contentUri);
    }
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
    static createTilesetFromLeafTiles(leafTiles) {
        const tilesetGeometricError = DEFAULT_TILESET_GEOMETRIC_ERROR;
        let root = undefined;
        if (leafTiles.length === 1) {
            root = leafTiles[0];
        }
        else {
            root = TilesetJsonCreator.createParentTile(leafTiles);
        }
        root.refine = "ADD";
        const tileset = {
            asset: {
                version: "1.1",
            },
            geometricError: tilesetGeometricError,
            root: root,
        };
        return tileset;
    }
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
    static computeTileBoundingVolumeBox(tile) {
        if (!tile.children || tile.children.length === 0) {
            return BoundingVolumes_1.BoundingVolumes.computeBoundingVolumeBoxFromBoundingVolume(tile.boundingVolume);
        }
        return TilesetJsonCreator.computeChildrenBoundingVolumeBox(tile.children);
    }
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
    static computeChildrenBoundingVolumeBox(children) {
        const childBoundingVolumeBoxes = [];
        for (const child of children) {
            const childBoundingVolumeBox = TilesetJsonCreator.computeTileBoundingVolumeBox(child);
            if (childBoundingVolumeBox !== undefined) {
                if (child.transform === undefined) {
                    childBoundingVolumeBoxes.push(childBoundingVolumeBox);
                }
                else {
                    const transformedChildBoundingVolumeBox = BoundingVolumes_1.BoundingVolumes.transformBoundingVolumeBox(childBoundingVolumeBox, child.transform);
                    childBoundingVolumeBoxes.push(transformedChildBoundingVolumeBox);
                }
            }
        }
        return BoundingVolumes_1.BoundingVolumes.computeUnionBoundingVolumeBox(childBoundingVolumeBoxes);
    }
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
    static createParentTile(children) {
        const geometricErrors = children.map((t) => t.geometricError);
        const maxGeometricError = Math.max(1, Math.max(...geometricErrors));
        const parentGeometricError = 2 * maxGeometricError;
        const parentBoundingVolumeBox = TilesetJsonCreator.computeChildrenBoundingVolumeBox(children);
        const tile = {
            boundingVolume: {
                box: parentBoundingVolumeBox,
            },
            geometricError: parentGeometricError,
            children: children,
        };
        return tile;
    }
    /**
     * Creates a leaf tile from the given data
     *
     * @param boundingVolume - The bounding volume
     * @param geometricError - The geometric error
     * @param contentUri - The content URI
     * @returns The tile
     */
    static createLeafTile(boundingVolume, geometricError, contentUri) {
        const tile = {
            boundingVolume: boundingVolume,
            geometricError: geometricError,
            content: {
                uri: contentUri,
            },
        };
        return tile;
    }
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
    static computeTransformFromCartographicPositionDegrees(cartographicPositionDegrees) {
        if (cartographicPositionDegrees.length < 2) {
            throw new base_1.DeveloperError(`Expected an array of at least length 2, but received an array ` +
                `of length ${cartographicPositionDegrees.length}: ${cartographicPositionDegrees}`);
        }
        const lonDegrees = cartographicPositionDegrees[0];
        const latDegrees = cartographicPositionDegrees[1];
        const height = cartographicPositionDegrees.length >= 3
            ? cartographicPositionDegrees[2]
            : 0.0;
        const cartographic = cesium_2.Cartographic.fromDegrees(lonDegrees, latDegrees, height);
        const cartesian = cesium_2.Cartographic.toCartesian(cartographic);
        const enuMatrix = cesium_6.Transforms.eastNorthUpToFixedFrame(cartesian);
        const transform = cesium_5.Matrix4.toArray(enuMatrix);
        return transform;
    }
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
    static computeTransformFromCartographicPositionAndRotationDegrees(cartographicPositionDegrees, rotationDegrees) {
        if (cartographicPositionDegrees.length < 2) {
            throw new base_1.DeveloperError(`Expected an array of at least length 2, but received an array ` +
                `of length ${cartographicPositionDegrees.length}: ${cartographicPositionDegrees}`);
        }
        const lonDegrees = cartographicPositionDegrees[0];
        const latDegrees = cartographicPositionDegrees[1];
        const height = cartographicPositionDegrees.length >= 3
            ? cartographicPositionDegrees[2]
            : 0.0;
        const headingDegrees = rotationDegrees[0];
        const pitchDegrees = rotationDegrees[1];
        const rollDegrees = rotationDegrees[2];
        const position = cesium_1.Cartesian3.fromDegrees(lonDegrees, latDegrees, height);
        const hpr = new cesium_3.HeadingPitchRoll(cesium_4.Math.toRadians(headingDegrees), cesium_4.Math.toRadians(pitchDegrees), cesium_4.Math.toRadians(rollDegrees));
        const orientation = cesium_6.Transforms.headingPitchRollQuaternion(position, hpr);
        const scale = new cesium_1.Cartesian3(1.0, 1.0, 1.0);
        const transform = cesium_5.Matrix4.fromTranslationQuaternionRotationScale(position, orientation, scale);
        const transformArray = cesium_5.Matrix4.toArray(transform);
        return transformArray;
    }
}
exports.TilesetJsonCreator = TilesetJsonCreator;
//# sourceMappingURL=TilesetJsonCreator.js.map