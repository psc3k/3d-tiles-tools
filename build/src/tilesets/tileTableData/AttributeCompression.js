"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeCompression = void 0;
const cesium_1 = require("cesium");
const cesium_2 = require("cesium");
/**
 * Adapted from CesiumJS 'AttributeCompression' class:
 *
 * Methods for decoding (point cloud) attribute values that are
 * stored in compressed forms.
 *
 * @internal
 */
class AttributeCompression {
    /**
     * Decodes two 8-bit values that represent an oct-encoded normal
     * into a 3D (normalized) normal.
     *
     * @param input - The input values
     * @returns The resulting normal
     */
    static octDecode8(input) {
        const rangeMax = 255;
        const result = AttributeCompression.octDecodeInRangeInternalResultScratch;
        const x = input[0];
        const y = input[1];
        AttributeCompression.octDecodeInRangeInternal(x, y, rangeMax, result);
        const array = Array(3);
        cesium_1.Cartesian3.pack(result, array, 0);
        return array;
    }
    /**
     * Decodes two 16-bit values that represent an oct-encoded normal
     * into a 3D (normalized) normal.
     *
     * @param input - The input values
     * @returns The resulting normal
     */
    static octDecode16(input) {
        const rangeMax = 65535;
        const result = AttributeCompression.octDecodeInRangeInternalResultScratch;
        const x = input[0];
        const y = input[1];
        AttributeCompression.octDecodeInRangeInternal(x, y, rangeMax, result);
        const array = Array(3);
        cesium_1.Cartesian3.pack(result, array, 0);
        return array;
    }
    static octDecodeInRangeInternal(x, y, rangeMax, result) {
        result.x = cesium_2.Math.fromSNorm(x, rangeMax);
        result.y = cesium_2.Math.fromSNorm(y, rangeMax);
        result.z = 1.0 - (Math.abs(result.x) + Math.abs(result.y));
        if (result.z < 0.0) {
            const oldVX = result.x;
            result.x = (1.0 - Math.abs(result.y)) * cesium_2.Math.signNotZero(oldVX);
            result.y = (1.0 - Math.abs(oldVX)) * cesium_2.Math.signNotZero(result.y);
        }
        return cesium_1.Cartesian3.normalize(result, result);
    }
}
exports.AttributeCompression = AttributeCompression;
AttributeCompression.octDecodeInRangeInternalResultScratch = new cesium_1.Cartesian3();
//# sourceMappingURL=AttributeCompression.js.map