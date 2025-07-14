import { TreeCoordinates } from "./TreeCoordinates";
/**
 * An implementation of `TreeCoordinates` for octrees
 *
 * @internal
 */
export declare class QuadtreeCoordinates implements TreeCoordinates {
    private readonly _level;
    private readonly _x;
    private readonly _y;
    constructor(level: number, x: number, y: number);
    /** {@inheritDoc TreeCoordinates.level} */
    get level(): number;
    get x(): number;
    get y(): number;
    /** {@inheritDoc TreeCoordinates.parent} */
    parent(): QuadtreeCoordinates | undefined;
    /** {@inheritDoc TreeCoordinates.children} */
    children(): Iterable<QuadtreeCoordinates>;
    /** {@inheritDoc TreeCoordinates.descendants} */
    descendants(maxLevelInclusive: number, depthFirst: boolean): Iterable<QuadtreeCoordinates>;
    /** {@inheritDoc TreeCoordinates.toArray} */
    toArray(): number[];
    /** {@inheritDoc TreeCoordinates.toIndex} */
    toIndex(): number;
    /** {@inheritDoc TreeCoordinates.toIndexInLevel} */
    toIndexInLevel(): number;
    toString: () => string;
}
//# sourceMappingURL=QuadtreeCoordinates.d.ts.map