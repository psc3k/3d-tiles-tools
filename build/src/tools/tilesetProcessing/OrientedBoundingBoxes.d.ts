/**
 * Methods for computing oriented bounding boxes.
 *
 * @internal
 */
export declare class OrientedBoundingBoxes {
    /**
     * Compute a bounding volume box for the given points.
     *
     * This will return the 12-element array that can be used
     * as the `boundingVolume.box` in a tileset JSON.
     *
     * @param points - The points, as 3-element arrays
     * @returns The bounding volume box
     */
    static fromPoints(points: number[][]): number[];
    /**
     * Implementation of 'fromPoints' based on dito.ts
     *
     * @param points - The points, as 3-element arrays
     * @returns The bounding volume box
     */
    private static fromPointsDitoTs;
}
//# sourceMappingURL=OrientedBoundingBoxes.d.ts.map