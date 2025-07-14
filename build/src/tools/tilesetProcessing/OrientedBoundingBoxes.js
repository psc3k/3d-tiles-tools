"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrientedBoundingBoxes = void 0;
const cesium_1 = require("cesium");
const cesium_2 = require("cesium");
const cesium_3 = require("cesium");
const cesium_4 = require("cesium");
const dito_1 = require("./external/dito");
/**
 * Methods for computing oriented bounding boxes.
 *
 * @internal
 */
class OrientedBoundingBoxes {
    /**
     * Compute a bounding volume box for the given points.
     *
     * This will return the 12-element array that can be used
     * as the `boundingVolume.box` in a tileset JSON.
     *
     * @param points - The points, as 3-element arrays
     * @returns The bounding volume box
     */
    static fromPoints(points) {
        return OrientedBoundingBoxes.fromPointsDitoTs(points);
    }
    /**
     * Implementation of 'fromPoints' based on dito.ts
     *
     * @param points - The points, as 3-element arrays
     * @returns The bounding volume box
     */
    static fromPointsDitoTs(points) {
        const attribute = {
            data: points.flat(),
            size: 3,
            offsetIdx: 0,
            strideIdx: 3,
        };
        const obb = {
            center: new Float64Array(3),
            halfSize: new Float32Array(3),
            quaternion: new Float32Array(4),
        };
        (0, dito_1.computeOBB)(attribute, obb);
        const translation = cesium_3.Cartesian3.unpack([...obb.center]);
        const rotation = cesium_1.Quaternion.unpack([...obb.quaternion]);
        const scale = cesium_3.Cartesian3.unpack([...obb.halfSize].map((v) => v * 2));
        const matrix = cesium_2.Matrix4.fromTranslationQuaternionRotationScale(translation, rotation, scale, new cesium_2.Matrix4());
        const cesiumObb = cesium_4.OrientedBoundingBox.fromTransformation(matrix, undefined);
        const result = Array(12);
        cesium_4.OrientedBoundingBox.pack(cesiumObb, result, 0);
        return result;
    }
}
exports.OrientedBoundingBoxes = OrientedBoundingBoxes;
//# sourceMappingURL=OrientedBoundingBoxes.js.map