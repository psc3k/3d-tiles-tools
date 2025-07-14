import { TreeCoordinates } from "./TreeCoordinates";
/**
 * An implementation of `TreeCoordinates` for octrees
 *
 * @internal
 */
export declare class OctreeCoordinates implements TreeCoordinates {
    private readonly _level;
    private readonly _x;
    private readonly _y;
    private readonly _z;
    constructor(level: number, x: number, y: number, z: number);
    /** {@inheritDoc TreeCoordinates.level} */
    get level(): number;
    get x(): number;
    get y(): number;
    get z(): number;
    /** {@inheritDoc TreeCoordinates.parent} */
    parent(): OctreeCoordinates | undefined;
    /** {@inheritDoc TreeCoordinates.children} */
    children(): Iterable<OctreeCoordinates>;
    /** {@inheritDoc TreeCoordinates.descendants} */
    descendants(maxLevelInclusive: number, depthFirst: boolean): Iterable<OctreeCoordinates>;
    /** {@inheritDoc TreeCoordinates.toArray} */
    toArray(): number[];
    /** {@inheritDoc TreeCoordinates.toIndex} */
    toIndex(): number;
    /** {@inheritDoc TreeCoordinates.toIndexInLevel} */
    toIndexInLevel(): number;
    toString: () => string;
}
//# sourceMappingURL=OctreeCoordinates.d.ts.map