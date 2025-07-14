"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OctreeCoordinates = void 0;
const MortonOrder_1 = require("./MortonOrder");
const Octrees_1 = require("./Octrees");
/**
 * An implementation of `TreeCoordinates` for octrees
 *
 * @internal
 */
class OctreeCoordinates {
    constructor(level, x, y, z) {
        this.toString = () => {
            return `(level ${this.level}, (${this._x},${this._y},${this._z}))`;
        };
        this._level = level;
        this._x = x;
        this._y = y;
        this._z = z;
    }
    /** {@inheritDoc TreeCoordinates.level} */
    get level() {
        return this._level;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get z() {
        return this._z;
    }
    /** {@inheritDoc TreeCoordinates.parent} */
    parent() {
        if (this._level === 0) {
            return undefined;
        }
        const pLevel = this._level - 1;
        const px = this._x >> 1;
        const py = this._y >> 1;
        const pz = this._z >> 1;
        return new OctreeCoordinates(pLevel, px, py, pz);
    }
    /** {@inheritDoc TreeCoordinates.children} */
    children() {
        const nLevel = this._level + 1;
        const nX = this._x << 1;
        const nY = this._y << 1;
        const nZ = this._z << 1;
        const iterable = {
            [Symbol.iterator]: function* () {
                yield new OctreeCoordinates(nLevel, nX + 0, nY + 0, nZ + 0);
                yield new OctreeCoordinates(nLevel, nX + 1, nY + 0, nZ + 0);
                yield new OctreeCoordinates(nLevel, nX + 0, nY + 1, nZ + 0);
                yield new OctreeCoordinates(nLevel, nX + 1, nY + 1, nZ + 0);
                yield new OctreeCoordinates(nLevel, nX + 0, nY + 0, nZ + 1);
                yield new OctreeCoordinates(nLevel, nX + 1, nY + 0, nZ + 1);
                yield new OctreeCoordinates(nLevel, nX + 0, nY + 1, nZ + 1);
                yield new OctreeCoordinates(nLevel, nX + 1, nY + 1, nZ + 1);
            },
        };
        return iterable;
    }
    /** {@inheritDoc TreeCoordinates.descendants} */
    descendants(maxLevelInclusive, depthFirst) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const root = this;
        const resultIterable = {
            [Symbol.iterator]: function* () {
                const queue = [root];
                while (true) {
                    const element = depthFirst ? queue.pop() : queue.shift();
                    if (!element) {
                        break;
                    }
                    if (element.level < maxLevelInclusive) {
                        for (const c of element.children()) {
                            queue.push(c);
                        }
                    }
                    yield element;
                }
            },
        };
        return resultIterable;
    }
    /** {@inheritDoc TreeCoordinates.toArray} */
    toArray() {
        return [this.level, this.x, this.y, this.z];
    }
    /** {@inheritDoc TreeCoordinates.toIndex} */
    toIndex() {
        const offset = Octrees_1.Octrees.computeNumberOfNodesForLevels(this._level);
        return offset + this.toIndexInLevel();
    }
    /** {@inheritDoc TreeCoordinates.toIndexInLevel} */
    toIndexInLevel() {
        return MortonOrder_1.MortonOrder.encode3D(this._x, this._y, this._z);
    }
}
exports.OctreeCoordinates = OctreeCoordinates;
//# sourceMappingURL=OctreeCoordinates.js.map