"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceFeaturesUtils = void 0;
const StringBuilder_1 = require("./StringBuilder");
/**
 * Utilities related to the glTF `EXT_instance_features` extension.
 *
 * @internal
 */
class InstanceFeaturesUtils {
    /**
     * Creates an string representation of the `EXT_instance_features`
     * that is contained in the given glTF Transform document.
     *
     * The exact format and contents of this string is not specified
     *
     * @param document - The glTF Transform document
     * @returns The string
     */
    static createInstanceFeaturesInfoString(document) {
        const sb = new StringBuilder_1.StringBuilder();
        const nodes = document.getRoot().listNodes();
        InstanceFeaturesUtils.createInstancesFeaturesString(sb, nodes);
        return sb.toString();
    }
    static createInstancesFeaturesString(sb, nodes) {
        sb.addLine("Nodes");
        for (let n = 0; n < nodes.length; n++) {
            sb.increaseIndent();
            sb.addLine("Node ", n, " of ", nodes.length);
            const node = nodes[n];
            sb.increaseIndent();
            const meshGpuInstancing = node.getExtension("EXT_mesh_gpu_instancing");
            const instanceFeatures = node.getExtension("EXT_instance_features");
            if (!meshGpuInstancing) {
                sb.addLine("(no EXT_mesh_gpu_instancing)");
            }
            if (!instanceFeatures) {
                sb.addLine("(no EXT_instance_features)");
            }
            if (meshGpuInstancing && instanceFeatures) {
                InstanceFeaturesUtils.createInstanceFeaturesString(sb, meshGpuInstancing, instanceFeatures);
            }
            sb.decreaseIndent();
            sb.decreaseIndent();
        }
    }
    static createInstanceFeaturesString(sb, meshGpuInstancing, instanceFeatures) {
        sb.addLine("EXT_instance_features:");
        sb.increaseIndent();
        sb.addLine("featureIds:");
        const featureIds = instanceFeatures.listFeatureIds();
        for (let f = 0; f < featureIds.length; f++) {
            sb.increaseIndent();
            sb.addLine("Feature ID ", f, " of ", featureIds.length);
            const featureId = featureIds[f];
            sb.increaseIndent();
            InstanceFeaturesUtils.createFeatureIdString(sb, featureId, meshGpuInstancing);
            sb.decreaseIndent();
            sb.decreaseIndent();
        }
        sb.decreaseIndent();
    }
    static createFeatureIdString(sb, featureId, meshGpuInstancing) {
        sb.addLine("featureCount: ", featureId.getFeatureCount());
        sb.addLine("attribute: ", featureId.getAttribute());
        const attributeNumber = featureId.getAttribute();
        if (attributeNumber !== undefined) {
            const attribute = `_FEATURE_ID_${attributeNumber}`;
            const featureIdAccessor = meshGpuInstancing.getAttribute(attribute);
            if (featureIdAccessor) {
                sb.addLine(attribute, " values: ", featureIdAccessor.getArray());
            }
            else {
                sb.addLine(attribute, " values: ", "ERROR: NOT FOUND!");
            }
        }
    }
}
exports.InstanceFeaturesUtils = InstanceFeaturesUtils;
//# sourceMappingURL=InstanceFeaturesUtils.js.map