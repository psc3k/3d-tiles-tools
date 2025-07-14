"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureId = exports.InstanceFeatures = void 0;
const core_1 = require("@gltf-transform/core");
const core_2 = require("@gltf-transform/core");
const NAME = "EXT_mesh_features";
//============================================================================
//============================================================================
// The actual model classes
// (See `MeshFeatures` for details about the concepts)
//
/**
 * Main model class for `EXT_instance_features`
 *
 * @internal
 */
class InstanceFeatures extends core_1.ExtensionProperty {
    init() {
        this.extensionName = NAME;
        this.propertyType = "InstanceFeatures";
        this.parentTypes = [core_2.PropertyType.NODE];
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            featureIds: [],
        });
    }
    listFeatureIds() {
        return this.listRefs("featureIds");
    }
    addFeatureId(featureId) {
        return this.addRef("featureIds", featureId);
    }
    removeFeatureId(featureId) {
        return this.removeRef("featureIds", featureId);
    }
}
exports.InstanceFeatures = InstanceFeatures;
InstanceFeatures.EXTENSION_NAME = NAME;
/**
 * Implementation of a feature ID for `EXT_instance_features`
 *
 * @internal
 */
class FeatureId extends core_1.ExtensionProperty {
    init() {
        this.extensionName = NAME;
        this.propertyType = "FeatureId";
        this.parentTypes = ["InstanceFeatures"];
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            nullFeatureId: null,
            label: null,
            attribute: null,
            propertyTable: null,
        });
    }
    getFeatureCount() {
        return this.get("featureCount");
    }
    setFeatureCount(featureCount) {
        return this.set("featureCount", featureCount);
    }
    getNullFeatureId() {
        return this.get("nullFeatureId");
    }
    setNullFeatureId(nullFeatureId) {
        return this.set("nullFeatureId", nullFeatureId);
    }
    getLabel() {
        return this.get("label");
    }
    setLabel(label) {
        return this.set("label", label);
    }
    getAttribute() {
        return this.get("attribute");
    }
    setAttribute(attribute) {
        return this.set("attribute", attribute);
    }
    getPropertyTable() {
        return this.getRef("propertyTable");
    }
    setPropertyTable(propertyTable) {
        return this.setRef("propertyTable", propertyTable);
    }
}
exports.FeatureId = FeatureId;
FeatureId.EXTENSION_NAME = NAME;
//# sourceMappingURL=InstanceFeatures.js.map