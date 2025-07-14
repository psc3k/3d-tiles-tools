import { BoundingVolume } from "../../structure";
/**
 * Utility methods for bounding volume computations.
 *
 * This class is mainly supposed to be used in the TilesetJsonCreator.
 *
 * The term "bounding volume box" refers to the 12-element number
 * arrays that are the `boundingVolume.box`.
 *
 * @internal
 */
export declare class BoundingVolumes {
    /**
     * Creates a bounding volume box for the unit cube
     *
     * @returns The bounding volume box
     */
    static createUnitCubeBoundingVolumeBox(): number[];
    /**
     * Compute a bounding volume box for the given points.
     *
     * @param points - The points, as 3-element arrays
     * @returns The bounding volume box
     */
    static createBoundingVolumeBoxFromPoints(points: number[][]): number[];
    /**
     * Computes an array containing the 8 corners of the given
     * bounding volume box.
     *
     * @param boundingVolumeBox - The bounding volume box
     * @returns The corners, as 3-element arrays
     */
    static computeBoundingVolumeBoxCorners(boundingVolumeBox: number[]): number[][];
    /**
     * Creates a bounding volume box from the given minimum and maximum point
     * of an axis-aligned bounding box.
     *
     * @param min - The minimum, as a 3-element array
     * @param max - The minimum, as a 3-element array
     * @returns The bounding volume box
     */
    static createBoundingVolumeBoxFromMinMax(min: number[], max: number[]): number[];
    /**
     * Creates a bounding box for a tileset- or tile bounding volume.
     *
     * This is the center- and half-axis representation of the
     * `boundingVolume.box` that is described at
     * https://github.com/CesiumGS/3d-tiles/tree/main/specification#box,
     * computed from the minimum- and maximum point of an axis-aligned
     * bounding box.
     *
     * @param minX - The minimum x
     * @param minY - The minimum y
     * @param minZ - The minimum z
     * @param maxX - The maximum x
     * @param maxY - The maximum y
     * @param maxZ - The maximum z
     * @returns The `boundingVolume.box`
     */
    private static createBoundingVolumeBox;
    /**
     * Translate the given bounding volume box by the given amount
     *
     * @param boundingVolumeBox - The bounding volume box
     * @param translation - The translation, as a 3-element array
     * @returns The translated bounding volume box
     */
    static translateBoundingVolumeBox(boundingVolumeBox: number[], translation: number[]): number[];
    /**
     * Transforms the given bounding volume box with the given 4x4 transform
     * matrix, and returns the result.
     *
     * @param boundingVolumeBox - The bounding volume box
     * @param transform - The transform, as a 16-element array
     * @returns The transformed bounding volume box
     */
    static transformBoundingVolumeBox(boundingVolumeBox: number[], transform: number[]): number[];
    /**
     * Compute the bounding volume box from the given bounding volume
     *
     * If the bounding volume does not contain a `box`, `region`, or `sphere`,
     * then `undefined` will be returned.
     *
     * @param boundingVolume - The bounding volume
     * @returns The bounding volume box
     */
    static computeBoundingVolumeBoxFromBoundingVolume(boundingVolume: BoundingVolume): number[] | undefined;
    /**
     * Compute a bounding volume box from the given bounding region,
     * using the default WGS84 ellipsoid.
     *
     * @param region - The region, as a 6-element array
     * @returns - The bounding volume box
     */
    private static computeBoundingVolumeBoxFromRegion;
    /**
     * Compute a bounding volume box from the given bounding sphere
     *
     * @param sphere - The sphere, as a 4-element array (center+radius)
     * @returns - The bounding volume box
     */
    private static computeBoundingVolumeBoxFromSphere;
    /**
     * Computes the union of the given boundingVolumeBoxes.
     *
     * If the given array is empty, then then a unit cube bounding
     * volume box will be returned.
     *
     * @param boundingVolumeBoxes - The bounding volume boxes
     * @returns The union volume box
     */
    static computeUnionBoundingVolumeBox(boundingVolumeBoxes: Iterable<number[]>): number[];
}
//# sourceMappingURL=BoundingVolumes.d.ts.map