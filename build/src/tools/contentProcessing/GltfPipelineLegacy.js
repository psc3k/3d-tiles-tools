"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GltfPipelineLegacy = void 0;
const cesium_1 = require("cesium");
const cesium_2 = require("cesium");
const base_1 = require("../../base");
const base_2 = require("../../base");
const base_3 = require("../../base");
const tilesets_1 = require("../../tilesets");
/**
 * Methods and fragments ported from a legacy version of gltf-pipeline.
 * (Sorry, no more specific details here...)
 *
 * @internal
 */
class GltfPipelineLegacy {
    static async process(gltf) {
        let rtcPosition;
        const extensions = gltf.extensions;
        if (extensions) {
            // If it is used, extract the CesiumRTC extension and add it back after processing
            const cesiumRTC = extensions.CESIUM_RTC;
            if (cesiumRTC) {
                rtcPosition = cesium_1.Cartesian3.unpack(cesiumRTC.center);
            }
        }
        GltfPipelineLegacy.fixBatchIdSemantic(gltf);
        if (rtcPosition) {
            GltfPipelineLegacy.addCesiumRTC(gltf, {
                position: rtcPosition,
            });
        }
    }
    static addCesiumRTC(gltf, options) {
        options = (0, base_2.defaultValue)(options, {});
        const positionArray = [];
        const ellipsoid = (0, base_2.defaultValue)(options.ellipsoid, cesium_2.Ellipsoid.WGS84);
        let position = options.position;
        if (!(0, base_1.defined)(position)) {
            if ((0, base_1.defined)(options.longitude) &&
                (0, base_1.defined)(options.latitude) &&
                (0, base_1.defined)(options.height)) {
                position = cesium_1.Cartesian3.fromRadians(options.longitude, options.latitude, options.height, ellipsoid);
            }
            else {
                throw new base_3.DeveloperError("Either a position or lat/long/height must be provided");
            }
        }
        cesium_1.Cartesian3.pack(position, positionArray);
        let extensions = gltf.extensions;
        if (!(0, base_1.defined)(extensions)) {
            extensions = {};
            gltf.extensions = extensions;
        }
        extensions.CESIUM_RTC = {
            center: positionArray,
        };
        tilesets_1.Extensions.addExtensionRequired(gltf, "CESIUM_RTC");
    }
    static fixBatchIdSemantic(gltf) {
        const meshes = gltf.meshes;
        for (const meshId in meshes) {
            if (Object.prototype.hasOwnProperty.call(meshes, meshId)) {
                const primitives = meshes[meshId].primitives;
                const primitivesLength = primitives.length;
                for (let i = 0; i < primitivesLength; ++i) {
                    const attributes = primitives[i].attributes;
                    if (attributes.BATCHID) {
                        attributes._BATCHID = attributes.BATCHID;
                        delete attributes.BATCHID;
                    }
                }
            }
        }
        const techniques = gltf.techniques;
        for (const techniqueId in techniques) {
            if (Object.prototype.hasOwnProperty.call(techniques, techniqueId)) {
                const parameters = techniques[techniqueId].parameters;
                for (const parameterId in parameters) {
                    if (Object.prototype.hasOwnProperty.call(parameters, parameterId)) {
                        const parameter = parameters[parameterId];
                        if (parameter.semantic === "BATCHID") {
                            parameter.semantic = "_BATCHID";
                        }
                    }
                }
            }
        }
    }
}
exports.GltfPipelineLegacy = GltfPipelineLegacy;
//# sourceMappingURL=GltfPipelineLegacy.js.map